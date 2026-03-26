import { GREEN } from "@/constant";


export default function StatusBadge({ status }) {
  const isOpen = status === "Open";
  return (
    <span
      className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg"
      style={{
        background: isOpen ? GREEN : "#ef4444",
        color: "#fff",
        letterSpacing: "0.04em",
      }}
    >
      {status}
    </span>
  );
}