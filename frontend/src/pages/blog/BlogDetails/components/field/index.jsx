import { useState } from "react";
import { GREEN } from "@/constant";

export default function FormField({ label, type="text", placeholder, value, onChange, as }) {
  const [focused,setFocused] = useState(false);
  const base = {
    width:"100%",padding:"12px 14px",borderRadius:"10px",
    border:`1.5px solid ${focused?GREEN:"#d1d5db"}`,outline:"none",
    fontSize:"14px",color:"#1f2937",background:"#fff",
    fontFamily:"'Barlow',sans-serif",transition:"border-color .2s,box-shadow .2s",
    boxShadow:focused?"0 0 0 3px rgba(98,157,35,0.12)":"none",
    resize:as==="textarea"?"vertical":undefined,
    minHeight:as==="textarea"?"130px":undefined,
  };
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{fontSize:"13px",fontWeight:700,color:"#374151"}}>{label}</label>
      {as==="textarea"
        ? <textarea placeholder={placeholder} value={value} onChange={onChange}
            onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={base}/>
        : <input type={type} placeholder={placeholder} value={value} onChange={onChange}
            onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={base}/>
      }
    </div>
  );
}