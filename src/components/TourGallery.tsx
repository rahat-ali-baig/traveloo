"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip);

interface TourGalleryProps {
  images?: string[];
}

const defaultImages = [
  "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1589551627804-7b7ea27e0598?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1587502537745-84fc86c82ab0?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1613400367293-b959f1c0d44c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1642511550322-92a8803e5e9a?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1642505335393-fddc6a395ad9?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1630594170996-57e9e63c3c2c?w=800&h=800&fit=crop",
];

export default function TourGallery({ images = defaultImages }: TourGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const galleryElement = galleryRef.current;
    const wrapElement = wrapRef.current;
    
    if (!galleryElement || !wrapElement) return;

    // Kill any existing contexts
    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    // Create new context
    ctxRef.current = gsap.context(() => {
      const galleryItems = galleryElement.querySelectorAll(".gallery__item");
      
      // Reset to initial state
      galleryElement.classList.remove("gallery--final");
      
      // Get initial state
      const initialState = Flip.getState(galleryItems);
      
      // Add final class to get target layout
      galleryElement.classList.add("gallery--final");
      
      // Get final state
      const finalState = Flip.getState(galleryItems);
      
      // Revert to initial layout
      galleryElement.classList.remove("gallery--final");
      
      // Create Flip animation
      const flipAnimation = Flip.from(initialState, {
        targets: galleryItems,
        duration: 1.2,
        ease: "expo.inOut",
        scale: true,
        absolute: true,
        simple: true,
        onComplete: () => {
          galleryElement.classList.add("gallery--final");
        }
      });
      
      // Create ScrollTrigger timeline
      ScrollTrigger.create({
        trigger: galleryElement,
        start: "top center",
        end: "bottom center",
        scrub: 1.5,
        pin: wrapElement,
        anticipatePin: 1,
        onUpdate: (self) => {
          flipAnimation.progress(self.progress);
        },
        onLeaveBack: () => {
          galleryElement.classList.remove("gallery--final");
          flipAnimation.progress(0);
        }
      });
      
    }, galleryElement);

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      {/* Gallery Section */}
      <div ref={wrapRef} className="gallery-wrap">
        <div ref={galleryRef} className="gallery gallery--bento">
          {images.map((img, idx) => (
            <div key={idx} className="gallery__item">
              <img src={img} alt={`Tour destination ${idx + 1}`} loading="lazy" />
              <div className="gallery__overlay">
                <span className="gallery__number">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="section">
        <h2>Discover Pakistan's Hidden Gems</h2>
        <p>
          From the majestic peaks of the Karakoram to the serene valleys of Hunza,
          Pakistan offers some of the world's most breathtaking landscapes. Our
          curated tours take you off the beaten path to experience the true beauty
          and hospitality of this incredible region.
        </p>
        <p>
          Whether you're an adventure seeker looking to trek to K2 base camp, a
          culture enthusiast wanting to explore ancient Buddhist heritage, or
          someone simply seeking peace in nature's finest settings, we have the
          perfect journey for you.
        </p>
        <p>
          The Northern Areas of Pakistan are home to some of the highest peaks on
          Earth, including K2, Nanga Parbat, and Gasherbrum. The region offers
          unparalleled trekking opportunities, vibrant local cultures, and
          landscapes that will leave you speechless.
        </p>
        <p>
          Our experienced local guides ensure your safety while sharing insights
          into the rich history and traditions of the mountain communities. From
          the colorful festivals of Gilgit to the tranquil lakes of Swat, every
          destination tells a unique story.
        </p>
        <p>
          Join thousands of satisfied travelers who have discovered the magic of
          Pakistan with us. We handle all logistics, permits, and accommodations,
          allowing you to focus entirely on creating unforgettable memories.
        </p>
        <p>
          Sustainable tourism is at the heart of what we do. We work closely with
          local communities to ensure that your visit benefits the region
          economically while preserving its natural and cultural heritage for
          generations to come.
        </p>
        <p>
          Ready to embark on the adventure of a lifetime? Contact our travel
          specialists today to customize your perfect Pakistan itinerary. From
          family-friendly excursions to hardcore mountaineering expeditions, we
          cater to all skill levels and interests.
        </p>
        <p>
          Don't just take our word for it — our verified reviews from real
          travelers speak volumes about the quality of our services. Every booking
          is protected, every operator is vetted, and every journey is crafted
          with care.
        </p>
      </div>

      <style jsx>{`
        .gallery-wrap {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }

        .gallery {
          position: relative;
          width: 100%;
          height: 100%;
          flex: none;
        }

        .gallery__item {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.3);
          transition: box-shadow 0.3s ease;
          cursor: pointer;
        }

        .gallery__item:hover {
          box-shadow: 0 25px 45px -12px rgba(0, 0, 0, 0.4);
        }

        .gallery__item img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          transition: transform 0.5s ease;
        }

        .gallery__item:hover img {
          transform: scale(1.08);
        }

        .gallery__overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery__item:hover .gallery__overlay {
          opacity: 1;
        }

        .gallery__number {
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          font-family: monospace;
        }

        /* Bento Grid Layout - Initial State */
        .gallery--bento {
          display: grid;
          gap: 1.2vh;
          grid-template-columns: repeat(3, 32vw);
          grid-template-rows: repeat(4, 22vh);
          justify-content: center;
          align-content: center;
        }

        /* Final State - Expanded on scroll */
        .gallery--final.gallery--bento {
          grid-template-columns: repeat(3, 90vw);
          grid-template-rows: repeat(4, 23vh);
          gap: 1.2vh;
        }

        /* Grid Item Positions */
        .gallery--bento .gallery__item:nth-child(1) {
          grid-area: 1 / 1 / 3 / 2;
        }

        .gallery--bento .gallery__item:nth-child(2) {
          grid-area: 1 / 2 / 2 / 3;
        }

        .gallery--bento .gallery__item:nth-child(3) {
          grid-area: 2 / 2 / 4 / 3;
        }

        .gallery--bento .gallery__item:nth-child(4) {
          grid-area: 1 / 3 / 3 / 4;
        }

        .gallery--bento .gallery__item:nth-child(5) {
          grid-area: 3 / 1 / 4 / 2;
        }

        .gallery--bento .gallery__item:nth-child(6) {
          grid-area: 3 / 3 / 5 / 4;
        }

        .gallery--bento .gallery__item:nth-child(7) {
          grid-area: 4 / 1 / 5 / 2;
        }

        .gallery--bento .gallery__item:nth-child(8) {
          grid-area: 4 / 2 / 5 / 3;
        }

        /* Content Section */
        .section {
          padding: 4rem 6rem;
          background: linear-gradient(to bottom, #ffffff, #f8fafc);
        }

        .section h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #065f46, #10b981);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .section p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #334155;
          margin-bottom: 1.25rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .gallery-wrap {
            height: 70vh;
          }

          .gallery--bento {
            gap: 0.8vh;
            grid-template-columns: repeat(3, 31vw);
            grid-template-rows: repeat(4, 16vh);
          }

          .gallery--final.gallery--bento {
            grid-template-columns: repeat(3, 88vw);
            grid-template-rows: repeat(4, 17vh);
          }

          .section {
            padding: 2rem 1.5rem;
          }

          .section h2 {
            font-size: 1.8rem;
          }

          .section p {
            font-size: 1rem;
          }

          .gallery__item {
            border-radius: 16px;
          }
        }

        @media (max-width: 480px) {
          .gallery-wrap {
            height: 60vh;
          }

          .gallery--bento {
            gap: 0.6vh;
            grid-template-columns: repeat(3, 30vw);
            grid-template-rows: repeat(4, 14vh);
          }

          .gallery--final.gallery--bento {
            grid-template-columns: repeat(3, 86vw);
            grid-template-rows: repeat(4, 15vh);
          }

          .gallery__item {
            border-radius: 12px;
          }
        }
      `}</style>
    </>
  );
}