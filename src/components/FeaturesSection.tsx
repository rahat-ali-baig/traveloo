// components/FeaturesSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  side: "left" | "right";
}

const features: Feature[] = [
  {
    id: 1,
    title: "Journey Planning",
    description: "Personalized itineraries crafted by travel experts to match your dreams and budget.",
    icon: "🗺️",
    side: "left",
  },
  {
    id: 2,
    title: "Mountain Trekking",
    description: "Guided expeditions through breathtaking mountain trails with safety equipment.",
    icon: "⛰️",
    side: "right",
  },
  {
    id: 3,
    title: "Local Culture",
    description: "Immerse yourself in authentic local traditions, cuisine, and community experiences.",
    icon: "🏺",
    side: "left",
  },
  {
    id: 4,
    title: "Night Camping",
    description: "Cozy campfires, starry skies, and comfortable tents under the mountain stars.",
    icon: "🏕️",
    side: "right",
  },
  {
    id: 5,
    title: "Wildlife Safari",
    description: "Encounter exotic wildlife in their natural habitat with expert guides.",
    icon: "🦁",
    side: "left",
  },
  {
    id: 6,
    title: "Luxury Lodges",
    description: "Handpicked accommodations offering comfort with spectacular mountain views.",
    icon: "🏨",
    side: "right",
  },
  {
    id: 7,
    title: "24/7 Support",
    description: "Round-the-clock assistance to ensure your journey is smooth and memorable.",
    icon: "🎒",
    side: "left",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mountainRef = useRef<THREE.Group | THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f7ed);
    scene.fog = new THREE.FogExp2(0xf0f7ed, 0.008);
    sceneRef.current = scene;

    // Camera - better distance for full mountain view
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 1.5, 6);
    camera.lookAt(0, 0.5, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(500, 500);
    renderer.setClearColor(0xf0f7ed, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasContainerRef.current.innerHTML = "";
    canvasContainerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff5e0, 1.3);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0xa8e6cf, 0.5);
    fillLight.position.set(-3, 2, 4);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0xffe0b2, 0.4);
    backLight.position.set(0, 2, -5);
    scene.add(backLight);

    const rimLight = new THREE.PointLight(0xffffff, 0.5);
    rimLight.position.set(3, 3, -3);
    scene.add(rimLight);

    const warmLight = new THREE.PointLight(0xffaa66, 0.3);
    warmLight.position.set(2, 1, 4);
    scene.add(warmLight);

    // Ground plane for shadows
    const groundPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.ShadowMaterial({ opacity: 0.3, color: 0x000000, transparent: true, side: THREE.DoubleSide })
    );
    groundPlane.rotation.x = -Math.PI / 2;
    groundPlane.position.y = -1;
    groundPlane.receiveShadow = true;
    scene.add(groundPlane);

    // Load OBJ mountain with proper material mapping
    const loader = new OBJLoader();
    loader.load(
      "/3d/mountains.obj",
      (obj) => {
        mountainRef.current = obj;

        // Adjust scale and position
        obj.scale.set(0.4, 0.4, 0.4);
        obj.position.set(0, -0.8, 0);

        // Apply different materials based on mesh name or index
        let meshIndex = 0;
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Assign different colors based on mesh index or name
            let materialColor: number;
            let emissiveColor: number = 0x000000;
            let emissiveIntensity = 0;
            let roughness = 0.4;
            
            // Check mesh name or use index for variety
            const meshName = child.name?.toLowerCase() || "";
            
            if (meshName.includes("snow") || meshIndex === 0 || meshIndex === 1) {
              // Snow caps - white
              materialColor = 0xf0f0f0;
              emissiveColor = 0xffffff;
              emissiveIntensity = 0.05;
              roughness = 0.2;
            } else if (meshName.includes("tree") || meshName.includes("forest") || (meshIndex >= 2 && meshIndex <= 3)) {
              // Trees / Forest - deep green
              materialColor = 0x4a8c3f;
              emissiveColor = 0x1a4a0f;
              emissiveIntensity = 0.08;
              roughness = 0.5;
            } else if (meshName.includes("rock") || meshName.includes("stone") || meshIndex === 4) {
              // Rocks / Brown areas
              materialColor = 0x8B6914;
              emissiveColor = 0x3a2a0a;
              emissiveIntensity = 0.03;
              roughness = 0.6;
            } else {
              // Default mountain terrain - green/brown mix
              materialColor = 0x6B8E23;
              emissiveColor = 0x2d4a1a;
              emissiveIntensity = 0.06;
              roughness = 0.45;
            }
            
            child.material = new THREE.MeshStandardMaterial({
              color: materialColor,
              emissive: emissiveColor,
              emissiveIntensity: emissiveIntensity,
              roughness: roughness,
              metalness: 0.05,
              flatShading: false,
            });
            
            meshIndex++;
          }
        });

        scene.add(obj);
      },
      undefined,
      (error) => {
        console.error("Error loading mountain OBJ:", error);
        // Create detailed fallback mountain with varied colors
        const group = new THREE.Group();
        
        // Brown rock base
        const rockMat = new THREE.MeshStandardMaterial({ color: 0x8B6914, roughness: 0.6 });
        const baseGeo = new THREE.CylinderGeometry(1.8, 2.2, 0.8, 8);
        const base = new THREE.Mesh(baseGeo, rockMat);
        base.position.set(0, -0.6, 0);
        base.castShadow = true;
        group.add(base);
        
        // Main mountain - green
        const greenMat = new THREE.MeshStandardMaterial({ color: 0x6B8E23, roughness: 0.4, emissive: 0x2d4a1a, emissiveIntensity: 0.05 });
        const mainPeak = new THREE.Mesh(new THREE.ConeGeometry(1.3, 1.8, 32), greenMat);
        mainPeak.position.set(0, 0.1, 0);
        mainPeak.castShadow = true;
        group.add(mainPeak);
        
        // Left peak - brown/dirt
        const brownMat = new THREE.MeshStandardMaterial({ color: 0x8B5A2B, roughness: 0.5 });
        const leftPeak = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.3, 32), brownMat);
        leftPeak.position.set(-1.1, -0.2, 0.5);
        leftPeak.castShadow = true;
        group.add(leftPeak);
        
        // Right peak - green
        const rightPeak = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.3, 32), greenMat);
        rightPeak.position.set(1.1, -0.2, -0.3);
        rightPeak.castShadow = true;
        group.add(rightPeak);
        
        // Snow cap - white
        const snowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, emissive: 0xffffff, emissiveIntensity: 0.05 });
        const snowCap = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.5, 32), snowMat);
        snowCap.position.set(0, 0.9, 0);
        group.add(snowCap);
        
        // Trees (small green cones)
        const treeMat = new THREE.MeshStandardMaterial({ color: 0x3a7a2a, roughness: 0.3 });
        const treePositions = [
          [-0.8, -0.3, 1.2], [0.9, -0.3, 1.1], [-1.2, -0.4, 0], [1.3, -0.4, -0.2],
          [-0.3, -0.2, 1.5], [0.5, -0.2, 1.4], [-1.4, -0.5, -0.8], [1.4, -0.5, -0.9]
        ];
        treePositions.forEach(pos => {
          const tree = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.4, 8), treeMat);
          tree.position.set(pos[0], pos[1], pos[2]);
          tree.castShadow = true;
          group.add(tree);
        });
        
        // Rocks
        const rockSmallMat = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.7 });
        for (let i = 0; i < 30; i++) {
          const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.08), rockSmallMat);
          rock.position.set(
            (Math.random() - 0.5) * 2.5,
            -0.5 + Math.random() * 0.6,
            (Math.random() - 0.5) * 2
          );
          rock.scale.set(1, Math.random() * 0.5 + 0.3, 1);
          rock.castShadow = true;
          group.add(rock);
        }
        
        group.position.set(0, -0.6, 0);
        group.scale.set(0.9, 0.9, 0.9);
        scene.add(group);
        mountainRef.current = group;
      }
    );

    // Animation loop
    const animate = () => {
      if (mountainRef.current && cameraRef.current) {
        const scrollProgress = ScrollTrigger.getAll()[1]?.progress || 0;
        mountainRef.current.rotation.y = scrollProgress * Math.PI * 1.2;
        mountainRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.05;
        mountainRef.current.position.y = -0.6 + Math.sin(Date.now() * 0.0008) * 0.015;
      }

      if (cameraRef.current) {
        cameraRef.current.lookAt(0, 0.4, 0);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current && canvasContainerRef.current) {
        const width = canvasContainerRef.current.clientWidth;
        const height = canvasContainerRef.current.clientHeight;
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener("resize", handleResize);
    setTimeout(handleResize, 100);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement?.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const cards = cardsContainerRef.current?.children;
    if (!cards || cards.length === 0) return;

    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger === sectionRef.current) st.kill();
    });

    Array.from(cards).forEach((card, idx) => {
      const isLeft = features[idx].side === "left";

      gsap.set(card, {
        x: isLeft ? -500 : 500,
        opacity: 0,
        rotationY: isLeft ? -30 : 30,
        scale: 0.8,
      });

      ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        end: "center 60%",
        scrub: 0.5,
        onEnter: () => {
          gsap.to(card, {
            x: 0,
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(0.6)",
          });
          setActiveIndex(idx);
        },
        onLeaveBack: () => {
          gsap.to(card, {
            x: isLeft ? -500 : 500,
            opacity: 0,
            rotationY: isLeft ? -30 : 30,
            scale: 0.8,
            duration: 0.5,
          });
        },
      });
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        if (mountainRef.current) {
          mountainRef.current.rotation.y = progress * Math.PI * 1.2;
        }
        if (cameraRef.current) {
          cameraRef.current.position.x = (progress - 0.5) * 0.2;
          cameraRef.current.position.y = 1.5 + Math.sin(progress * Math.PI) * 0.1;
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 px-4 md:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0f7ed 0%, #e5f0e0 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: "linear-gradient(135deg, #2d5a27, #6BAF92)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your Journey, Our Expertise
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From dawn treks to starlit camps, every moment is crafted for wonder
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          <div ref={cardsContainerRef} className="flex-1 space-y-6">
            {features.map((feature, idx) => (
              <div
                key={feature.id}
                className={`feature-card ${feature.side === "left" ? "lg:mr-auto" : "lg:ml-auto"} w-full max-w-md`}
                style={{
                  background: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(16px)",
                  borderRadius: "28px",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, #6BAF92, #2d5a27)",
                      }}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: "#2d5a27" }}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="h-0.5 transition-all duration-500 rounded-b-full"
                  style={{
                    background: "linear-gradient(90deg, #6BAF92, #2d5a27)",
                    width: activeIndex === idx ? "100%" : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          <div
            ref={canvasContainerRef}
            className="flex-1 w-full min-h-[450px] md:min-h-[550px] lg:min-h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(107, 175, 146, 0.05)",
              borderRadius: "32px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .feature-card {
          transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }

        .feature-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.45);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 1024px) {
          .feature-card {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
}