import { GREEN } from "@/constant";
import { useState, useEffect, useRef } from "react";
import { STORES } from "./components/data";
import StoreCard from "./components/StoreCard";

/* ═══════════════════════════════════════════════════
   SCROLL ANIMATION HOOK
═══════════════════════════════════════════════════ */
function useInView(threshold = 0.08) {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

/* ═══════════════════════════════════════════════════
   STORES PAGE — main export
═══════════════════════════════════════════════════ */
export default function StoresPage({
  stores        = STORES,
  heroImage     = "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1400&q=80",
  heroTitle     = "Visit Our Stores",
  heroDesc      = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium mollis ex, vel interdum augue faucibus sit amet. Proin tempor purus ac suscipit...",
}) {
  const [heroRef,   heroVis]   = useInView(0.05);
  const [cardsRef,  cardsVis]  = useInView(0.05);
  const [heroImgErr, setHeroImgErr] = useState(false);

  /* Inject keyframes + font */
  useEffect(() => {
    if (document.getElementById("st1-styles")) return;
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.id = "st1-styles";
    s.textContent = `
      @keyframes stHeroIn {
        from { opacity:0; transform:translateX(-32px); }
        to   { opacity:1; transform:translateX(0);     }
      }
      @keyframes stCardIn {
        from { opacity:0; transform:translateY(28px) scale(0.98); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
      @keyframes stHeadIn {
        from { opacity:0; transform:translateY(16px); }
        to   { opacity:1; transform:translateY(0);    }
      }
      @keyframes stImgZoom {
        from { transform:scale(1.06); }
        to   { transform:scale(1);    }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <div className="w-full bg-white" style={{ fontFamily:"'Barlow', sans-serif" }}>

      {/* ══════════════════════════════════════════════
          HERO BANNER — full width, text over image left
      ══════════════════════════════════════════════ */}
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(220px, 28vw, 380px)" }}
      >
        {/* Background image */}
        {!heroImgErr ? (
          <img
            src={heroImage}
            alt="Visit Our Stores"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ animation: heroVis ? "stImgZoom 1.4s ease forwards" : "none" }}
            onError={() => setHeroImgErr(true)}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background:"linear-gradient(135deg,#111,#1a3d1a)" }}
          />
        )}

        {/* Dark overlay — stronger on left for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:"linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        {/* Text content */}
        <div className="relative z-10 h-full flex items-center">
          <div
            className="mx-auto px-6 md:px-10 lg:px-12 w-full"
            style={{
              opacity:   heroVis ? 1 : 0,
              animation: heroVis ? "stHeroIn .7s cubic-bezier(.16,1,.3,1) both" : "none",
            }}
          >
            <h1
              className="font-extrabold text-white leading-tight mb-3"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
            >
              {heroTitle}
            </h1>
            <p
              className="text-white/75 leading-relaxed max-w-md"
              style={{ fontSize: "clamp(0.82rem, 1.3vw, 1rem)" }}
            >
              {heroDesc}
            </p>
          </div>
        </div>

        {/* Green accent line at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(to right, ${GREEN}, transparent)` }}
        />
      </div>

      {/* ══════════════════════════════════════════════
          STORES SECTION
      ══════════════════════════════════════════════ */}
      <div
        ref={cardsRef}
        className="mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16"
      >
        {/* Section heading */}
        <div
          className="text-center mb-10"
          style={{
            opacity:   cardsVis ? 1 : 0,
            animation: cardsVis ? "stHeadIn .5s ease both" : "none",
          }}
        >
          <h2
            className="font-extrabold text-gray-900 mb-2"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
          >
            Our Store Locations
          </h2>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-0.5 w-10 rounded-full" style={{ background: GREEN }}/>
            <div className="w-2 h-2 rounded-full" style={{ background: GREEN }}/>
            <div className="h-0.5 w-10 rounded-full" style={{ background: GREEN }}/>
          </div>
        </div>

        {/* Store cards — stacked one by one (1 col always) */}
        <div className="flex flex-col gap-6">
          {stores.map((store, i) => (
            <StoreCard
              key={store.id}
              store={store}
              index={i}
              visible={cardsVis}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
