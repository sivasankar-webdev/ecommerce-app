import { GREEN } from "@/constant";
import Widget from "../widget";
import { TAGS } from "../data";
import { useState } from "react";


export default function TagsWidget({ visible }) {
  return (
    <Widget title="Tags" delay={0.29} visible={visible}>
      <div className="flex flex-wrap gap-2">
        {TAGS.map(tag => {
          const [hov,setHov] = useState(false);
          return (
            <span key={tag}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              className="px-3 py-1.5 rounded-lg text-[12px] font-semibold cursor-pointer"
              style={{
                background: hov?GREEN:"#fff",
                color:      hov?"#fff":"#374151",
                border:     `1.5px solid ${hov?GREEN:"#e5e7eb"}`,
                transform:  hov?"translateY(-2px)":"translateY(0)",
                transition: "all .2s cubic-bezier(.16,1,.3,1)",
              }}>
              {tag}
            </span>
          );
        })}
      </div>
    </Widget>
  );
}
