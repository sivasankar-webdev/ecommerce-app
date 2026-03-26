import { GREEN, GREEN_DARK, GREEN_PALE } from "@/constant";
import { useState } from "react";
import Stars from "../stars";
import { ArrowIcon, PhoneIcon, PinIcon } from "../icons";
import { Link } from "react-router-dom";


export default function ListCard({ vendor, index, visible }) {
  const [hov, setHov] = useState(false);
  const to = `/vendors/detail?id=${vendor.id}`;
  const isOpen = vendor.status === "Open";

  return (
    <div
      className="flex items-center gap-5 bg-white rounded-xl p-5 transition-all duration-300"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        boxShadow:  hov ? `0 8px 28px rgba(98,157,35,0.12)` : "0 1px 4px rgba(0,0,0,0.04)",
        transform:  hov ? "translateX(6px)" : "translateX(0)",
        opacity:    visible ? 1 : 0,
        animation:  visible
          ? `vgCardIn .5s cubic-bezier(.16,1,.3,1) ${index * 0.06}s both`
          : "none",
      }}
    >
      {/* Logo */}
      <div
        className="flex-shrink-0 w-24 h-20 rounded-xl flex items-center justify-center overflow-hidden transition-colors duration-300"
        style={{ background: hov ? GREEN_PALE : "#f9fafb", border: "1px solid #e5e7eb" }}
      >
        <img
          src={vendor.logo}
          alt={vendor.name}
          className="object-contain w-full h-full p-2 transition-transform duration-400"
          style={{ transform: hov ? "scale(1.08)" : "scale(1)" }}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-bold text-gray-900 text-[15px]" style={{ color: hov ? GREEN : undefined }}>
            {vendor.name}
          </h3>
          <span
            className="text-[11px] font-extrabold px-2 py-0.5 rounded-md"
            style={{ background: isOpen ? GREEN : "#ef4444", color:"#fff" }}
          >
            {vendor.status}
          </span>
        </div>
        <Stars rating={vendor.rating}/>
        <div className="flex items-start gap-1.5 text-gray-400">
          <span className="mt-0.5" style={{ color:GREEN }}><PinIcon/></span>
          <p className="text-[13px] truncate">{vendor.address}</p>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <span style={{ color:GREEN }}><PhoneIcon/></span>
          <p className="text-[13px]">{vendor.phone}</p>
        </div>
      </div>

      {/* Visit Store */}
      <Link
        to={to}
        className="group flex-shrink-0 hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-bold text-[13px] text-white transition-all duration-200"
        style={{
          background: hov ? GREEN_DARK : GREEN,
          boxShadow:  hov ? "0 4px 14px rgba(98,157,35,0.3)" : "none",
        }}
      >
        Visit Store <ArrowIcon/>
      </Link>
    </div>
  );
}