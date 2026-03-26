import { LATEST_POSTS } from "../data";
import { GREEN, DARK } from "@/constant";
import Widget from "../widget";
import { useState } from "react";


export default function LatestPostsWidget({ visible }) {
  return (
    <Widget title="Latest Post" delay={0.22} visible={visible}>
      <div className="flex flex-col">
        {LATEST_POSTS.map((p,i) => {
          const [hov,setHov] = useState(false);
          return (
            <div key={p.id}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              className="flex items-center gap-3 py-3 cursor-pointer"
              style={{
                borderBottom:i===LATEST_POSTS.length-1?"none":"1px solid #f1f5f9",
                transform:hov?"translateX(4px)":"translateX(0)",
                transition:"transform .22s cubic-bezier(.16,1,.3,1)",
              }}>
              <div className="flex-shrink-0 rounded-xl overflow-hidden" style={{width:60,height:60}}>
                <img src={p.image} alt={p.title}
                  className="w-full h-full object-cover"
                  style={{transform:hov?"scale(1.1)":"scale(1)",transition:"transform .35s"}}
                  //onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/60x60/f0f5e8/629d23?text=P";}}
                  loading="lazy"/>
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="flex items-center gap-1.5 text-[11px]" style={{color:"#9ca3af"}}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {p.date}
                </span>
                <p className="font-bold text-[13px] leading-snug"
                  style={{color:hov?GREEN:DARK,transition:"color .2s"}}>{p.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Widget>
  );
}