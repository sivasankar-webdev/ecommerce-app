import { DARK } from "@/constant";

export default function Widget({ title, delay, visible, children }) {
  return (
    <div className="rounded-2xl bg-white p-5"
      style={{
        border:"1.5px solid #e5e7eb", boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?`t1bdRight .55s cubic-bezier(.16,1,.3,1) ${delay}s both`:"none",
      }}>
      {title && (
        <>
          <h3 className="font-extrabold text-[17px] mb-1" style={{color:DARK}}>{title}</h3>
          <hr style={{borderColor:"#f1f5f9",margin:"10px 0 12px"}}/>
        </>
      )}
      {children}
    </div>
  );
}