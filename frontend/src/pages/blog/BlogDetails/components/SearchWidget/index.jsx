import { useState  } from "react";
import { GREEN } from "@/constant";
import Widget from "../widget";


/* ══════════════════════════════════════
   SIDEBAR: SEARCH
══════════════════════════════════════ */
export default function SearchWidget({ visible }) {
  const [q, setQ]         = useState("");
  const [focused, setFoc] = useState(false);
  const [hovBtn, setHov]  = useState(false);
  return (
    <Widget delay={0.08} visible={visible}>
      <div className="flex rounded-xl overflow-hidden"
        style={{border:`1.5px solid ${focused?GREEN:"#e5e7eb"}`,transition:"border-color .2s"}}>
        <input type="text" value={q} onChange={e=>setQ(e.target.value)}
          onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
          placeholder="Search Here"
          className="flex-1 px-4 py-3 outline-none text-[13px]"
          style={{fontFamily:"'Barlow',sans-serif",color:"#374151",background:"#f9fafb"}}/>
        <button onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
          className="px-4 flex items-center justify-center"
          style={{background:hovBtn?GREEN2:GREEN,transition:"background .2s",border:"none",cursor:"pointer"}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
      </div>
    </Widget>
  );
}