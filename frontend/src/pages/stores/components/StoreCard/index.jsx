import { GREEN } from "@/constant";
import { useState } from "react";
import { PinSvg } from "../icons";


/* ═══════════════════════════════════════════════════
   STORE CARD
═══════════════════════════════════════════════════ */
export default function StoreCard({ store, index, visible }) {
  const [hov, setHov] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  /* Fallback gradient when image fails */
  const fallbackBgs = [
    "linear-gradient(135deg,#1a3d1a,#629d23)",
    "linear-gradient(135deg,#1a3060,#2563eb)",
    "linear-gradient(135deg,#3d1a1a,#e53935)",
  ];

  return (
    <div
      className="w-full rounded-2xl overflow-hidden bg-white transition-all duration-300"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        boxShadow:  hov
          ? `0 16px 40px rgba(98,157,35,0.16)`
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform:  hov ? "translateY(-6px)" : "translateY(0)",
        opacity:    visible ? 1 : 0,
        animation:  visible
          ? `stCardIn .6s cubic-bezier(.16,1,.3,1) ${index * 0.13}s both`
          : "none",
      }}
    >
      {/*
        Row layout:
          Desktop (sm+)  : image left | middle info | right hours
          Mobile (<sm)   : stacked top→bottom
      */}
      <div className="flex flex-col sm:flex-row">

        {/* ── IMAGE col ── */}
        <div
          className="flex-shrink-0 overflow-hidden"
          style={{
            width:     "clamp(180px, 38%, 280px)",
            minHeight: "clamp(200px, 24vw, 320px)",
          }}
        >
          {!imgErr ? (
            <img
              src={store.image}
              alt={store.name}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{
                minHeight: "clamp(200px, 24vw, 320px)",
                transform: hov ? "scale(1.06)" : "scale(1)",
              }}
              onError={() => setImgErr(true)}
              loading="lazy"
            />
          ) : (
            <div
              className="w-full flex items-center justify-center text-white text-4xl"
              style={{
                background: fallbackBgs[index % fallbackBgs.length],
                minHeight:  "clamp(200px, 24vw, 320px)",
              }}
            >
              🏪
            </div>
          )}
        </div>

        {/* ── MIDDLE: pin + name + address + contact ── */}
        <div
          className="flex flex-col justify-center gap-4 px-7 py-8 flex-1 transition-colors duration-300"
          style={{ background: hov ? "#fafdfb" : "#fff" }}
        >
          {/* Green pin circle */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300"
            style={{
              background: GREEN,
              transform:  hov ? "scale(1.12) rotate(-5deg)" : "scale(1) rotate(0deg)",
              boxShadow:  hov ? `0 4px 16px rgba(98,157,35,0.4)` : "none",
            }}
          >
            <PinSvg/>
          </div>

          {/* Store name */}
          <div>
            <h3
              className="font-extrabold text-[16px] md:text-[18px] leading-tight transition-colors duration-200"
              style={{ color: hov ? GREEN : "#111827" }}
            >
              {store.name}
            </h3>
            <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">
              {store.address}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1">
            <a
              href={`tel:${store.contact.replace(/\s/g,"")}`}
              className="text-[13px] font-semibold transition-colors"
              style={{ color: hov ? GREEN : "#374151" }}
            >
              {store.contact}
            </a>
            <a
              href={`mailto:${store.email}`}
              className="text-[13px] transition-colors"
              style={{ color: hov ? GREEN : "#6b7280" }}
            >
              {store.email}
            </a>
          </div>
        </div>

        {/* ── RIGHT: Open Hours ── */}
        <div
          className="flex flex-col gap-3 px-7 py-8 flex-shrink-0 transition-colors duration-300"
          style={{
            background:  hov ? "#f4f9ef" : "#f9fafb",
            borderLeft:  "1.5px solid #f0f0f0",
            minWidth:    "clamp(160px, 22%, 230px)",
          }}
        >
          <h4 className="font-extrabold text-gray-900 text-[15px] mb-1">Open Hours</h4>
          <div className="flex flex-col gap-1.5">
            {store.hours.map((h, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <span className="text-[12px] font-semibold text-gray-500 w-8 flex-shrink-0">
                  {h.day}:
                </span>
                <span
                  className="text-[12px] flex-1"
                  style={{ color: h.off ? "#dc2626" : "#4b5563" }}
                >
                  {h.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
