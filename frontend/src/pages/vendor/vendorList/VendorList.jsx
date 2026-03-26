import { useState, useEffect, useRef } from "react";
import { GREEN } from "@/constant";
import { VENDORS } from "./components/data";
import { GridIcon, ListIcon, SearchIcon } from "./components/icons";
import SortDropdown from "./components/sort";
import GridCard from "./components/GridCard";

export default function VendorList({
  vendors = VENDORS,
  title   = "Vendors List",
}) {
  const [search,   setSearch]   = useState("");
  const [sort,     setSort]     = useState("latest");
  const [view,     setView]     = useState("grid"); // "grid" | "list"
  const [visible,  setVisible]  = useState(false);
  const ref = useRef(null);

  /* Scroll trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Keyframes */
  useEffect(() => {
    if (document.getElementById("vendor-list-styles")) return;
    const s = document.createElement("style");
    s.id = "vendor-list-styles";
    s.textContent = `
      @keyframes vendorIn {
        from { opacity:0; transform:translateY(24px) scale(0.97); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
      @keyframes vendorHeadIn {
        from { opacity:0; transform:translateY(16px); }
        to   { opacity:1; transform:translateY(0);    }
      }
      @keyframes vendorDropIn {
        from { opacity:0; transform:translateY(-6px); }
        to   { opacity:1; transform:translateY(0);    }
      }
    `;
    document.head.appendChild(s);
  }, []);

  /* Filter */
  const filtered = vendors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.phone.includes(search)
  );

  /* Sort */
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "latest":  return new Date(b.joined) - new Date(a.joined);
      case "oldest":  return new Date(a.joined) - new Date(b.joined);
      case "rating":  return b.rating - a.rating;
      case "name_az": return a.name.localeCompare(b.name);
      case "name_za": return b.name.localeCompare(a.name);
      case "open":    return a.status === "Open" ? -1 : 1;
      default:        return 0;
    }
  });

  return (
    <section
      ref={ref}
      className="w-full bg-white py-10 md:py-16 px-4 md:px-6 lg:px-8"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="max-w-screen-xl mx-auto">

        {/* ── Page heading + search ── */}
        <div
          className="text-center mb-8"
          style={{ animation: visible ? "vendorHeadIn .5s ease both" : "none", opacity: visible ? undefined : 0 }}
        >
          <h1
            className="font-extrabold text-gray-900 mb-5"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
          >
            {title}
          </h1>

          {/* Search bar */}
          <div className="flex max-w-2xl mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search vendors (by name or ID)..."
              className="flex-1 px-5 py-3.5 text-[14px] text-gray-700 placeholder-gray-400 outline-none"
            />
            <button
              className="flex items-center gap-2 px-6 py-3.5 text-white font-bold text-[14px] transition-all hover:opacity-90 active:scale-95 flex-shrink-0"
              style={{ background: GREEN }}
            >
              <SearchIcon/> Search
            </button>
          </div>
        </div>

        {/* ── Toolbar: results count + sort + view toggle ── */}
        <div
          className="flex items-center justify-between flex-wrap gap-3 mb-6 py-3 border-b border-gray-100"
          style={{ animation: visible ? "vendorHeadIn .5s ease .1s both" : "none", opacity: visible ? undefined : 0 }}
        >
          {/* Results count */}
          <p className="text-[14px] text-gray-500 font-medium">
            Showing <strong className="text-gray-800">1–{sorted.length}</strong> of{" "}
            <strong className="text-gray-800">{sorted.length}</strong> results
          </p>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <SortDropdown value={sort} onChange={setSort}/>

            {/* View toggle */}
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              {[
                { key:"grid", icon:<GridIcon/> },
                { key:"list", icon:<ListIcon/> },
              ].map(({ key, icon }) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className="p-2.5 transition-all duration-200"
                  style={{
                    background: view === key ? GREEN : "#fff",
                    color:      view === key ? "#fff" : "#9ca3af",
                  }}
                  title={key === "grid" ? "Grid view" : "List view"}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Vendor cards ── */}
        {sorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-400 font-semibold text-[16px]">No vendors found for "{search}"</p>
            <button onClick={() => setSearch("")}
              className="mt-4 px-5 py-2 text-sm font-bold text-white rounded-xl"
              style={{ background: GREEN }}>
              Clear Search
            </button>
          </div>
        ) : view === "grid" ? (
          /*
            Grid view responsive:
              mobile  : 1 col
              sm      : 2 cols
              lg      : 3 cols
              xl      : 4 cols  (matches screenshot — 4 per row)
          */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sorted.map((v, i) => (
              <GridCard key={v.id} vendor={v} index={i} visible={visible}/>
            ))}
          </div>
        ) : (
          /*
            List view responsive:
              mobile  : 1 col  (stacked full-width)
              md      : 2 col  (matches screenshot — 2 wide cards per row)
          */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sorted.map((v, i) => (
              <ListCard key={v.id} vendor={v} index={i} visible={visible}/>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
