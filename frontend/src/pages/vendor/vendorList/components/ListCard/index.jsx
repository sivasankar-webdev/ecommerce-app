import { GREEN } from "@/constant";
import { useState } from "react";
import StatusBadge from "../badge";
import { ArrowIcon, PhoneIcon, PinIcon } from "../icons";
import Stars from "../stars";


export default function ListCard({ vendor, index, visible }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row gap-0"
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        boxShadow:  hov ? `0 12px 40px rgba(98,157,35,0.15)` : "0 2px 8px rgba(0,0,0,0.05)",
        transform:  hov ? "translateX(6px)" : "translateX(0)",
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        animation:  visible ? `vendorIn .55s cubic-bezier(.16,1,.3,1) ${index * 0.08}s both` : "none",
        opacity:    visible ? undefined : 0,
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center sm:w-44 flex-shrink-0 bg-gray-50 p-6"
        style={{ borderRight: "1px solid #f0f0f0" }}>
        <img src={vendor.logo} alt={vendor.name}
          className="max-h-16 max-w-full object-contain transition-transform duration-500"
          style={{ transform: hov ? "scale(1.08)" : "scale(1)" }}
          //onError={e => { e.target.src = `https://via.placeholder.com/120x60/${GREEN.slice(1)}/fff?text=${encodeURIComponent(vendor.name.slice(0,4).toUpperCase())}`; }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col sm:flex-row flex-1 gap-4 p-5 items-start sm:items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-extrabold text-gray-900 text-[16px]">{vendor.name}</h3>
            <StatusBadge status={vendor.status}/>
          </div>
          <Stars rating={vendor.rating}/>
          <div className="flex items-start gap-2 text-[13px] text-gray-500">
            <span style={{ color: GREEN, marginTop:"1px" }}><PinIcon/></span>
            <span>{vendor.address}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-gray-500">
            <span style={{ color: GREEN }}><PhoneIcon/></span>
            <span>{vendor.phone}</span>
          </div>
        </div>

        <button
          className="flex items-center gap-2 px-5 py-2.5 text-white text-[14px] font-bold rounded-xl transition-all duration-200 flex-shrink-0"
          style={{ background: hov ? "#4e7e1a" : GREEN, boxShadow: hov ? `0 4px 16px rgba(98,157,35,0.35)` : "none" }}
        >
          Visit Store <ArrowIcon/>
        </button>
      </div>
    </div>
  );
}