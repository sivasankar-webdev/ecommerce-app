import { GREEN } from "@/constant";
import { useState } from "react";
import Widget from "../widget";
import { CATEGORIES } from "../data";


/* ══════════════════════════════════════
   SIDEBAR: CATEGORIES
══════════════════════════════════════ */
export default function CategoriesWidget({ visible }) {
  const [active, setActive] = useState(null);
  return (
    <Widget title="Categories" delay={0.15} visible={visible}>
      <div className="flex flex-col gap-2">
        {CATEGORIES.map(cat => {
          const [hov,setHov] = useState(false);
          const isActive = active===cat;
          return (
            <div key={cat}
              onClick={()=>setActive(isActive?null:cat)}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              className="px-4 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer"
              style={{
                background: isActive?GREEN:hov?"#f0f5e8":"#f5f6f2",
                color:      isActive?"#fff":hov?GREEN:"#374151",
                border:     `1.5px solid ${isActive?GREEN:hov?GREEN:"transparent"}`,
                transform:  hov&&!isActive?"translateX(4px)":"translateX(0)",
                transition: "all .22s cubic-bezier(.16,1,.3,1)",
              }}>
              {cat}
            </div>
          );
        })}
      </div>
    </Widget>
  );
}