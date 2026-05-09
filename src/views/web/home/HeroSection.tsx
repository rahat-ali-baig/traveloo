"use client";

import PrimaryButton from "@/components/core/PrimaryButton";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const vertexShaderSource = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

#define PI 3.14159265359
#define TAU 6.28318530718
#define MAX_STEPS 80
#define MAX_DIST 50.0
#define SURF_DIST 0.001

float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

float sdOctahedron(vec3 p, float s) {
  p = abs(p);
  float m = p.x + p.y + p.z - s;
  vec3 q;
  if (3.0 * p.x < m) q = p.xyz;
  else if (3.0 * p.y < m) q = p.yzx;
  else if (3.0 * p.z < m) q = p.zxy;
  else return m * 0.57735027;
  float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);
  return length(vec3(q.x, q.y - s + k, q.z - k));
}

float sdTriPrism(vec3 p, vec2 h) {
  vec3 q = abs(p);
  return max(q.z - h.y, max(q.x * 0.866025 + p.y * 0.5, -p.y) - h.x * 0.5);
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float smax(float a, float b, float k) {
  return -smin(-a, -b, k);
}

float map(vec3 p) {
  vec2 m = (uMouse - 0.5) * 2.5;
  p.xy += m * 0.4;
  p.xz *= rot(uTime * 0.12);
  p.xy *= rot(uTime * 0.08);

  vec3 p1 = p;
  p1.yz *= rot(uTime * 0.15);

  float coreDistort = sin(p1.x * 3.0 + uTime) * sin(p1.y * 3.0 + uTime) * sin(p1.z * 3.0 + uTime) * 0.1;
  float core = sdOctahedron(p1, 1.6) + coreDistort;

  vec3 p2 = p1;
  p2.xy *= rot(PI * 0.25 + uTime * 0.2);
  float prism = sdTriPrism(p2, vec2(1.4, 2.0));
  core = smax(core, -prism, 0.2);

  float d = core;
  float kBlend = 0.2 + 0.15 * (0.5 + 0.5 * sin(uTime * 1.5));

  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float angle = fi * TAU / 4.0 + uTime * 0.3;
    float radius = 3.0 + 0.3 * sin(uTime * 0.4 + fi);
    vec3 pos = vec3(cos(angle) * radius, sin(angle * 0.7) * 1.0, sin(angle) * radius);
    vec3 po = p - pos;
    po.xy *= rot(uTime * 0.5 + fi);
    float satDistort = sin(po.x * 5.0 + fi) * sin(po.y * 5.0 + fi) * sin(po.z * 5.0 + fi) * 0.05;
    float satellite = sdOctahedron(po, 0.4) + satDistort;
    d = smin(d, satellite, kBlend);
  }

  return d;
}

vec3 getNormal(vec3 p) {
  vec2 e = vec2(0.001, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

float raymarch(vec3 ro, vec3 rd) {
  float t = 0.0;
  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);
    if (abs(d) < SURF_DIST || t > MAX_DIST) break;
    t += d * 0.7;
  }
  return t;
}

vec3 getBackground(vec3 rd) {
  float stars = 0.0;
  vec3 p = rd * 100.0;
  float h = hash(dot(p, vec3(12.9898, 78.233, 54.53)));
  if (h > 0.98) stars = pow(h - 0.98, 10.0) * 20.0;

  vec3 nebula = vec3(0.0);
  nebula += vec3(0.02, 0.23, 0.13) * pow(max(0.0, sin(rd.x * 2.0 + uTime * 0.1)), 3.0) * 0.8;
  nebula += vec3(0.35, 0.24, 0.08) * pow(max(0.0, sin(rd.y * 2.5 + uTime * 0.05)), 3.0) * 0.35;

  return vec3(stars) + nebula;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
  vec2 m = (uMouse - 0.5) * 0.5;

  vec3 ro = vec3(m.x * 2.0, m.y * 2.0, 5.5);
  vec3 rd = normalize(vec3(uv, -1.0));
  rd.xy *= rot(m.x * 0.2);
  rd.yz *= rot(m.y * 0.2);

  float t = raymarch(ro, rd);
  vec3 color = vec3(0.0);

  if (t < MAX_DIST) {
    vec3 p = ro + rd * t;
    vec3 normal = getNormal(p);
    vec3 viewDir = normalize(ro - p);
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
    float ior = 1.5;
    vec3 refractDir = refract(rd, normal, 1.0 / ior);

    if (length(refractDir) > 0.0) {
      float t2 = raymarch(p - normal * 0.01, refractDir);
      if (t2 < MAX_DIST) {
        vec3 p2 = p - normal * 0.01 + refractDir * t2;
        vec3 normal2 = getNormal(p2);
        vec3 r = refract(refractDir, -normal2, ior - 0.2);
        vec3 g = refract(refractDir, -normal2, ior);
        vec3 b = refract(refractDir, -normal2, ior + 0.2);
        vec3 bgR = getBackground(r) * vec3(0.8, 1.4, 0.8);
        vec3 bgG = getBackground(g) * vec3(0.7, 1.5, 0.9);
        vec3 bgB = getBackground(b) * vec3(1.35, 1.05, 0.6);
        color = vec3(bgR.x, bgG.y, bgB.z);
        color = pow(color, vec3(0.7)) * 5.0;
      } else {
        color = getBackground(refractDir) * 2.0;
      }
    }

    vec3 lightDir = normalize(vec3(1.0, 1.0, -1.0));
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 150.0);
    color += spec * vec3(1.0, 1.0, 1.0) * 3.5;
    color += fresnel * vec3(0.45, 1.0, 0.62) * 1.5;
    color += pow(1.0 - abs(dot(viewDir, normal)), 4.0) * vec3(0.72, 0.9, 0.65) * 0.7;
  } else {
    color = getBackground(rd);
  }

  float vignette = 1.0 - length(uv) * 0.42;
  vignette = smoothstep(0.3, 1.0, vignette);
  color *= vignette;
  color = pow(color, vec3(0.88));
  color *= 1.12;

  gl_FragColor = vec4(color, 1.0);
}
`;

const createShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
) => {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

const STATS = [
  { number: "200+", label: "Verified Companies" },
  { number: "50+", label: "Destinations" },
  { number: "10K+", label: "Travellers" },
  { number: "4.8★", label: "Avg. Rating" },
];

const HeroSection = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    const uTime = gl.getUniformLocation(program, "uTime");
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const positionLocation = gl.getAttribLocation(program, "position");

    const positionBuffer = gl.createBuffer();
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    const startTime = performance.now();
    let animationFrame = 0;

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = (event.clientX - rect.left) / rect.width;
      mouse.targetY = 1 - (event.clientY - rect.top) / rect.height;
    };

    const render = () => {
      const currentTime = (performance.now() - startTime) * 0.001;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform1f(uTime, currentTime);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);

      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrame = requestAnimationFrame(render);
    };

    resizeCanvas();
    render();

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* WebGL canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Enhanced vignette overlay for better text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_50%,rgba(0,0,0,0.85)_100%)]" />

      {/* Side fade overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[26%] bg-linear-to-r from-black/75 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[26%] bg-linear-to-l from-black/75 to-transparent" />



      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <div className="max-w-5xl px-4 sm:px-6">
          {/* Eyebrow - glassy reflection */}
          <p className="mb-6 flex items-center justify-center gap-3 font-montserrat text-xs font-medium uppercase tracking-[0.5em]">
            <span className="block h-px w-7 bg-linear-to-r from-transparent via-white/40 to-transparent" />
            <span className="bg-linear-to-r from-white/40 via-white/80 to-white/40 bg-clip-text text-transparent">
              Pakistan&apos;s Travel Marketplace
            </span>
            <span className="block h-px w-7 bg-linear-to-r from-transparent via-white/40 to-transparent" />
          </p>

          {/* Main title - glassy metallic effect */}
          <h1 className="relative px-2 ">
            <span className="font-greatvibes text-[clamp(2.5rem,7vw,7rem)] font-semibold leading-[1.05] tracking-tight">
              <span className="bg-linear-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                Plan Trips.{" "}
              </span>
              <em className="bg-linear-to-b from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text font-light not-italic text-transparent">
                Trust People.
              </em>{" "}
              <span className="bg-linear-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                Book with Confidence.
              </span>
            </span>
          </h1>

          {/* Body copy - glassy light text */}
          <p className="mx-auto mt-6 max-w-2xl font-sans text-[clamp(1rem,1.8vw,1.2rem)] font-light leading-[1.9]">
            <span className="bg-linear-to-r from-white/60 via-white/80 to-white/60 bg-clip-text text-transparent">
              Safar connects Pakistani travelers with verified tour companies —
              replacing scattered DMs, negotiated prices, and zero accountability
              with a single trusted platform.
            </span>
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton onClick={() => router.push("/destinations")}>
              Explore Destinations
            </PrimaryButton>
            <PrimaryButton onClick={() => router.push("/guide")}>
              Plan Journey
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Stats bar - glassy cards */}
      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-7 whitespace-nowrap rounded-2xl bg-white/5 px-8 py-4 backdrop-blur-md sm:gap-12">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-7 sm:gap-12">
            <div className="text-center">
              <div className="bg-linear-to-b from-white to-white/60 bg-clip-text font-serif text-[21px] font-semibold leading-none text-transparent sm:text-[24px]">
                {stat.number}
              </div>
              <div className="mt-1.5 font-sans text-[8.5px] uppercase tracking-[0.32em] text-white/40">
                {stat.label}
              </div>
            </div>
            {i < STATS.length - 1 && (
              <div className="h-7 w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />
            )}
          </div>
        ))}
      </div>

      {/* Scroll indicator - glassy */}
      <div className="absolute bottom-9 right-6 z-10 flex flex-col items-center gap-2">
        <div className="h-10 w-px animate-pulse bg-linear-to-b from-emerald-400/60 to-transparent" />
        <span
          className="font-sans text-[8px] uppercase tracking-[0.34em] text-white/30"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .glass-stats {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

// "use client";

// import { MouseEvent, useEffect, useRef } from "react";
// import PrimaryButton from "../../../components/core/PrimaryButton";
// import { useRouter } from "next/navigation";

// const vertexShaderSource = `
// attribute vec2 position;

// void main() {
//   gl_Position = vec4(position, 0.0, 1.0);
// }
// `;

// const fragmentShaderSource = `
// precision highp float;

// uniform float uTime;
// uniform vec2 uResolution;
// uniform vec2 uMouse;

// #define PI 3.14159265359
// #define TAU 6.28318530718
// #define MAX_STEPS 80
// #define MAX_DIST 50.0
// #define SURF_DIST 0.001

// float hash(float n) {
//   return fract(sin(n) * 43758.5453123);
// }

// mat2 rot(float a) {
//   float s = sin(a);
//   float c = cos(a);
//   return mat2(c, -s, s, c);
// }

// float sdOctahedron(vec3 p, float s) {
//   p = abs(p);
//   float m = p.x + p.y + p.z - s;
//   vec3 q;
//   if (3.0 * p.x < m) q = p.xyz;
//   else if (3.0 * p.y < m) q = p.yzx;
//   else if (3.0 * p.z < m) q = p.zxy;
//   else return m * 0.57735027;

//   float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);
//   return length(vec3(q.x, q.y - s + k, q.z - k));
// }

// float sdTriPrism(vec3 p, vec2 h) {
//   vec3 q = abs(p);
//   return max(q.z - h.y, max(q.x * 0.866025 + p.y * 0.5, -p.y) - h.x * 0.5);
// }

// float smin(float a, float b, float k) {
//   float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
//   return mix(b, a, h) - k * h * (1.0 - h);
// }

// float smax(float a, float b, float k) {
//   return -smin(-a, -b, k);
// }

// float map(vec3 p) {
//   vec2 m = (uMouse - 0.5) * 2.5;
//   p.xy += m * 0.4;
//   p.xz *= rot(uTime * 0.12);
//   p.xy *= rot(uTime * 0.08);

//   vec3 p1 = p;
//   p1.yz *= rot(uTime * 0.15);

//   float coreDistort = sin(p1.x * 3.0 + uTime) * sin(p1.y * 3.0 + uTime) * sin(p1.z * 3.0 + uTime) * 0.1;
//   float core = sdOctahedron(p1, 1.6) + coreDistort;

//   vec3 p2 = p1;
//   p2.xy *= rot(PI * 0.25 + uTime * 0.2);
//   float prism = sdTriPrism(p2, vec2(1.4, 2.0));
//   core = smax(core, -prism, 0.2);

//   float d = core;
//   float kBlend = 0.2 + 0.15 * (0.5 + 0.5 * sin(uTime * 1.5));

//   for (int i = 0; i < 4; i++) {
//     float fi = float(i);
//     float angle = fi * TAU / 4.0 + uTime * 0.3;
//     float radius = 3.0 + 0.3 * sin(uTime * 0.4 + fi);

//     vec3 pos = vec3(cos(angle) * radius, sin(angle * 0.7) * 1.0, sin(angle) * radius);
//     vec3 po = p - pos;
//     po.xy *= rot(uTime * 0.5 + fi);

//     float satDistort = sin(po.x * 5.0 + fi) * sin(po.y * 5.0 + fi) * sin(po.z * 5.0 + fi) * 0.05;
//     float satellite = sdOctahedron(po, 0.4) + satDistort;
//     d = smin(d, satellite, kBlend);
//   }

//   return d;
// }

// vec3 getNormal(vec3 p) {
//   vec2 e = vec2(0.001, 0.0);
//   return normalize(vec3(
//     map(p + e.xyy) - map(p - e.xyy),
//     map(p + e.yxy) - map(p - e.yxy),
//     map(p + e.yyx) - map(p - e.yyx)
//   ));
// }

// float raymarch(vec3 ro, vec3 rd) {
//   float t = 0.0;
//   for (int i = 0; i < MAX_STEPS; i++) {
//     vec3 p = ro + rd * t;
//     float d = map(p);
//     if (abs(d) < SURF_DIST || t > MAX_DIST) break;
//     t += d * 0.7;
//   }
//   return t;
// }

// vec3 getBackground(vec3 rd) {
//   float stars = 0.0;
//   vec3 p = rd * 100.0;
//   float h = hash(dot(p, vec3(12.9898, 78.233, 54.53)));
//   if (h > 0.98) stars = pow(h - 0.98, 10.0) * 20.0;

//   vec3 nebula = vec3(0.0);
//   nebula += vec3(0.02, 0.23, 0.13) * pow(max(0.0, sin(rd.x * 2.0 + uTime * 0.1)), 3.0) * 0.8;
//   nebula += vec3(0.35, 0.24, 0.08) * pow(max(0.0, sin(rd.y * 2.5 + uTime * 0.05)), 3.0) * 0.35;

//   return vec3(stars) + nebula;
// }

// void main() {
//   vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
//   vec2 m = (uMouse - 0.5) * 0.5;

//   vec3 ro = vec3(m.x * 2.0, m.y * 2.0, 5.5);
//   vec3 rd = normalize(vec3(uv, -1.0));
//   rd.xy *= rot(m.x * 0.2);
//   rd.yz *= rot(m.y * 0.2);

//   float t = raymarch(ro, rd);
//   vec3 color = vec3(0.0);

//   if (t < MAX_DIST) {
//     vec3 p = ro + rd * t;
//     vec3 normal = getNormal(p);
//     vec3 viewDir = normalize(ro - p);
//     float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
//     float ior = 1.5;
//     vec3 refractDir = refract(rd, normal, 1.0 / ior);

//     if (length(refractDir) > 0.0) {
//       float t2 = raymarch(p - normal * 0.01, refractDir);
//       if (t2 < MAX_DIST) {
//         vec3 p2 = p - normal * 0.01 + refractDir * t2;
//         vec3 normal2 = getNormal(p2);
//         vec3 r = refract(refractDir, -normal2, ior - 0.2);
//         vec3 g = refract(refractDir, -normal2, ior);
//         vec3 b = refract(refractDir, -normal2, ior + 0.2);
//         vec3 bgR = getBackground(r) * vec3(0.8, 1.4, 0.8);
//         vec3 bgG = getBackground(g) * vec3(0.7, 1.5, 0.9);
//         vec3 bgB = getBackground(b) * vec3(1.35, 1.05, 0.6);
//         color = vec3(bgR.x, bgG.y, bgB.z);
//         color = pow(color, vec3(0.7)) * 5.0;
//       } else {
//         color = getBackground(refractDir) * 2.0;
//       }
//     }

//     vec3 lightDir = normalize(vec3(1.0, 1.0, -1.0));
//     vec3 halfDir = normalize(lightDir + viewDir);
//     float spec = pow(max(dot(normal, halfDir), 0.0), 150.0);
//     color += spec * vec3(1.0, 1.0, 1.0) * 3.5;
//     color += fresnel * vec3(0.45, 1.0, 0.62) * 1.5;
//     color += pow(1.0 - abs(dot(viewDir, normal)), 4.0) * vec3(0.72, 0.9, 0.65) * 0.7;
//   } else {
//     color = getBackground(rd);
//   }

//   float vignette = 1.0 - length(uv) * 0.42;
//   vignette = smoothstep(0.3, 1.0, vignette);
//   color *= vignette;
//   color = pow(color, vec3(0.88));
//   color *= 1.12;

//   gl_FragColor = vec4(color, 1.0);
// }
// `;

// const createShader = (
//   gl: WebGLRenderingContext,
//   type: number,
//   source: string,
// ) => {
//   const shader = gl.createShader(type);
//   if (!shader) return null;

//   gl.shaderSource(shader, source);
//   gl.compileShader(shader);

//   if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//     console.error("Shader compile error:", gl.getShaderInfoLog(shader));
//     gl.deleteShader(shader);
//     return null;
//   }

//   return shader;
// };

// const createProgram = (
//   gl: WebGLRenderingContext,
//   vertexShader: WebGLShader,
//   fragmentShader: WebGLShader,
// ) => {
//   const program = gl.createProgram();
//   if (!program) return null;

//   gl.attachShader(program, vertexShader);
//   gl.attachShader(program, fragmentShader);
//   gl.linkProgram(program);

//   if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
//     console.error("Program link error:", gl.getProgramInfoLog(program));
//     gl.deleteProgram(program);
//     return null;
//   }

//   return program;
// };

// const HeroSection = () => {
//   const router = useRouter();
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const gl = canvas.getContext("webgl");
//     if (!gl) return;

//     const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
//     const fragmentShader = createShader(
//       gl,
//       gl.FRAGMENT_SHADER,
//       fragmentShaderSource,
//     );

//     if (!vertexShader || !fragmentShader) return;

//     const program = createProgram(gl, vertexShader, fragmentShader);
//     if (!program) return;

//     const uTime = gl.getUniformLocation(program, "uTime");
//     const uResolution = gl.getUniformLocation(program, "uResolution");
//     const uMouse = gl.getUniformLocation(program, "uMouse");
//     const positionLocation = gl.getAttribLocation(program, "position");
//     const positionBuffer = gl.createBuffer();
//     const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
//     const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
//     const startTime = performance.now();
//     let animationFrame = 0;

//     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

//     const resizeCanvas = () => {
//       canvas.width = canvas.clientWidth * window.devicePixelRatio;
//       canvas.height = canvas.clientHeight * window.devicePixelRatio;
//       gl.viewport(0, 0, canvas.width, canvas.height);
//     };

//     const handleMouseMove = (event: globalThis.MouseEvent) => {
//       const rect = canvas.getBoundingClientRect();
//       mouse.targetX = (event.clientX - rect.left) / rect.width;
//       mouse.targetY = 1 - (event.clientY - rect.top) / rect.height;
//     };

//     const render = () => {
//       const currentTime = (performance.now() - startTime) * 0.001;
//       mouse.x += (mouse.targetX - mouse.x) * 0.05;
//       mouse.y += (mouse.targetY - mouse.y) * 0.05;

//       gl.clearColor(0, 0, 0, 1);
//       gl.clear(gl.COLOR_BUFFER_BIT);
//       gl.useProgram(program);
//       gl.uniform1f(uTime, currentTime);
//       gl.uniform2f(uResolution, canvas.width, canvas.height);
//       gl.uniform2f(uMouse, mouse.x, mouse.y);

//       gl.enableVertexAttribArray(positionLocation);
//       gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//       gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
//       gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

//       animationFrame = requestAnimationFrame(render);
//     };

//     resizeCanvas();
//     render();

//     window.addEventListener("resize", resizeCanvas);
//     canvas.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       cancelAnimationFrame(animationFrame);
//       window.removeEventListener("resize", resizeCanvas);
//       canvas.removeEventListener("mousemove", handleMouseMove);
//       gl.deleteBuffer(positionBuffer);
//       gl.deleteProgram(program);
//       gl.deleteShader(vertexShader);
//       gl.deleteShader(fragmentShader);
//     };
//   }, []);

//   return (
//     <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-black">
//       <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.14)_38%,rgba(0,0,0,0.82)_100%)]" />

//       <div className="pointer-events-none relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20">
//         <div className="max-w-6xl px-4 sm:px-6">
//           <p className="mb-4 font-sans text-[10px] font-light uppercase tracking-[0.42em] text-white/82 sm:mb-5 sm:text-xs md:text-sm">
//             Curated journeys for curious souls
//           </p>

//           <h1 className="prism-title font-sans text-[clamp(3rem,10vw,11rem)] font-black tracking-normal leading-[1.1] sm:text-[clamp(3.5rem,12vw,11rem)]">
//             Safarly
//           </h1>

//           <p className="mx-auto mt-4 max-w-2xl px-2 font-sans text-sm font-light leading-7 text-white/78 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
//             Explore hidden valleys, ancient coastlines, and luminous routes
//             shaped around wonder.
//           </p>

//           <div className="pointer-events-auto mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-5">
//             <PrimaryButton onClick={() => router.push("/destinations")}>
//               Discover
//             </PrimaryButton>
//             <PrimaryButton onClick={() => router.push("/guide")}>
//               Plan Journey
//             </PrimaryButton>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
