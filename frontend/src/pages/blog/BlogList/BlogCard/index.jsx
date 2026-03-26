import { useState } from "react";
import { GREEN, GREEN_DARK as GREEN2, DARK } from "@/constant";
import { ALL_POSTS } from "../data";

/* ══════════════════════════════════════
   BLOG CARD
══════════════════════════════════════ */
export default function BlogCard({ post, index, visible }) {
  const [hov,    setHov]    = useState(false);
  const [btnHov, setBtnHov] = useState(false);

  const PER_PAGE = 4;

  return (
    <article
      className="flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        boxShadow:  hov
          ? "0 16px 40px rgba(98,157,35,0.15)"
          : "0 2px 10px rgba(0,0,0,0.05)",
        transform:  hov ? "translateY(-6px)" : "translateY(0)",
        transition: "all .32s cubic-bezier(.16,1,.3,1)",
        opacity:    visible ? 1 : 0,
        animation:  visible
          ? `t1bpFadeUp .55s cubic-bezier(.16,1,.3,1) ${(index % PER_PAGE) * 0.1}s both`
          : "none",
      }}
    >
      {/* Image */}
      <div className="overflow-hidden"
        style={{ height: "clamp(160px, 18vw, 210px)" }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          style={{
            transform:  hov ? "scale(1.07)" : "scale(1)",
            transition: "transform .5s cubic-bezier(.16,1,.3,1)",
          }}
          //onError={e => { e.target.onerror=null; e.target.src="https://placehold.co/600x210/f0f5e8/629d23?text=Blog"; }}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-4 md:p-5 flex-1">

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-[16px]" style={{ color:"#6b7280" }}>
            {/* Clock icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {post.date}
          </span>
          <span className="flex items-center gap-1.5 text-[16px]" style={{ color:"#6b7280" }}>
            {/* Folder icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-bold leading-snug flex-1"
          style={{
            fontSize:   "clamp(13px, 1.5vw, 18px)",
            color:      hov ? GREEN : DARK,
            transition: "color .22s",
          }}
        >
          {post.title}
        </h3>

        {/* Read Details button */}
        <button
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
          className="self-start flex items-center gap-2 px-5 py-2.5 rounded-md font-bold text-white text-[16px] mt-1"
          style={{
            background:  btnHov ? GREEN2 : GREEN,
            boxShadow:   btnHov
              ? "0 6px 20px rgba(98,157,35,0.40)"
              : "0 2px 8px rgba(98,157,35,0.20)",
            transform:   btnHov ? "translateY(-2px) scale(1.04)" : "translateY(0) scale(1)",
            transition:  "all .25s cubic-bezier(.16,1,.3,1)",
            border:      "none", cursor:"pointer",
            fontFamily:  "'Barlow',sans-serif",
          }}
        >
          Read Details
          {/* Circle plus icon */}
          <span
            className="flex items-center justify-center rounded-full text-[13px] font-bold"
            style={{
              width: 20, height: 20,
              background: "rgba(255,255,255,0.25)",
              lineHeight: 1,
            }}
          >+</span>
        </button>

      </div>
    </article>
  );
}