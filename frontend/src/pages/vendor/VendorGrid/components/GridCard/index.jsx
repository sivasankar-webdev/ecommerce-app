import { GREEN, GREEN_DARK, GREEN_PALE } from "@/constant";
import { useState } from "react";
import Stars from "../stars";
import { ArrowIcon, PhoneIcon, PinIcon } from "../icons";
import { Link } from "react-router-dom";


export default function GridCard({ vendor, index, visible }) {
  const [hov, setHov] = useState(false);
  const to = `/vendors/detail?id=${vendor.id}`;
  const isOpen = vendor.status === "Open";

  return (
    <div
      className="flex flex-col bg-white rounded-xl overflow-hidden"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        boxShadow:  hov
          ? `0 10px 32px rgba(98,157,35,0.15)`
          : "0 1px 6px rgba(0,0,0,0.05)",
        transform:  hov ? "translateY(-6px)" : "translateY(0)",
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        opacity:    visible ? 1 : 0,
        animation:  visible
          ? `vgCardIn .55s cubic-bezier(.16,1,.3,1) ${(index % 4) * 0.07 + Math.floor(index / 4) * 0.1}s both`
          : "none",
      }}
    >
      {/* ── Logo area ── */}
      <div
        className="flex items-center justify-center bg-gray-50 overflow-hidden transition-all duration-500"
        style={{
          height:     "clamp(110px, 12vw, 150px)",
          background: hov ? GREEN_PALE : "#f9fafb",
        }}
      >
        <img
          src={vendor.logo}
          alt={vendor.name}
          className="object-contain transition-transform duration-500"
          style={{
            maxHeight: "75%",
            maxWidth:  "75%",
            transform: hov ? "scale(1.08)" : "scale(1)",
          }}
          loading="lazy"
          // onError={e => {
          //   e.target.src = `https://via.placeholder.com/160x100/${isOpen ? "629d23" : "9ca3af"}/fff?text=${encodeURIComponent(vendor.name.slice(0,4))}`;
          // }}
        />
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col gap-3 p-5 flex-1">

        {/* Name + status badge */}
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3
            className="font-extrabold text-gray-900 text-[24px] leading-tight transition-colors duration-200"
            style={{ color: hov ? GREEN : "#111827" }}
          >
            {vendor.name}
          </h3>
          <span
            className="flex-shrink-0 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md"
            style={{
              background: isOpen ? GREEN : "#ef4444",
              color: "#fff",
            }}
          >
            {vendor.status}
          </span>
        </div>

        {/* Stars */}
        <Stars rating={vendor.rating}/>

        {/* Address */}
        <div className="flex items-start gap-2 text-gray-500">
          <span className="mt-0.5" style={{ color: GREEN }}><PinIcon/></span>
          <p className="text-[13px] leading-snug">{vendor.address}</p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 text-gray-500">
          <span style={{ color: GREEN }}><PhoneIcon/></span>
          <p className="text-[13px]">{vendor.phone}</p>
        </div>

        {/* Visit Store — full width, pushes to bottom */}
        <div className="mt-auto pt-1">
          <Link
            to={to}
            className="group flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-bold text-[14px] text-white transition-all duration-200"
            style={{
              background: hov ? GREEN_DARK : GREEN,
              boxShadow:  hov ? `0 4px 16px rgba(98,157,35,0.35)` : "none",
              transform:  hov ? "scale(1.02)" : "scale(1)",
            }}
          >
            Visit Store <ArrowIcon/>
          </Link>
        </div>
      </div>
    </div>
  );
}