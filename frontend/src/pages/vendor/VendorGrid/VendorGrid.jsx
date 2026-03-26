import { useState, useEffect, useRef } from "react";
import { GREEN, GREEN_DARK, GREEN_PALE } from "@/constant";
import { SORT_OPTIONS, VENDORS } from "../vendorList/components/data";
import { GridViewIcon, ListViewIcon, SearchIcon } from "./components/icons";
import ViewToggleBtn from "./components/button";
import GridCard from "./components/GridCard";
import ListCard from "./components/ListCard";

export default function Theme1VendorGrid({ vendors = VENDORS }) {
  const [query,   setQuery]   = useState("");
  const [sort,    setSort]    = useState("latest");
  const [view,    setView]    = useState("grid");   // "grid" | "list"
  const [visible, setVisible] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const ref = useRef(null);
  const sortRef = useRef(null);

  /* Scroll trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Close sort dropdown on outside click */
  useEffect(() => {
    const fn = e => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* Keyframes */
  useEffect(() => {
    if (document.getElementById("vg1-styles")) return;
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.id = "vg1-styles";
    s.textContent = `
      @keyframes vgCardIn {
        from { opacity:0; transform:translateY(22px) scale(0.97); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
      @keyframes vgHeadIn {
        from { opacity:0; transform:translateY(16px); }
        to   { opacity:1; transform:translateY(0);    }
      }
      @keyframes vgDropIn {
        from { opacity:0; transform:translateY(-8px); }
        to   { opacity:1; transform:translateY(0);    }
      }
    `;
    document.head.appendChild(s);
  }, []);

  /* Filter + sort */
  const filtered = vendors
    .filter(v =>
      v.name.toLowerCase().includes(query.toLowerCase()) ||
      v.phone.includes(query)
    )
    .sort((a, b) => {
      if (sort === "latest")  return new Date(b.joined) - new Date(a.joined);
      if (sort === "oldest")  return new Date(a.joined) - new Date(b.joined);
      if (sort === "rating")  return b.rating - a.rating;
      if (sort === "name_az") return a.name.localeCompare(b.name);
      if (sort === "name_za") return b.name.localeCompare(a.name);
      if (sort === "open")    return a.status === "Open" ? -1 : 1;
      return 0;
    });

  const sortLabel = SORT_OPTIONS.find(o => o.value === sort)?.label ?? "Sort By Latest";
  const listToLink = "/vendor";
  const gridToLink = "/vendor-grid";

  return (
    <div
      className="w-full py-10 md:py-14 bg-white min-h-screen"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8" ref={ref}>

        {/* ══════════════════════════════════════════
            HEADER — title + search bar
        ══════════════════════════════════════════ */}
        <div
          className="flex flex-col items-center gap-5 mb-10"
          style={{
            opacity:   visible ? 1 : 0,
            animation: visible ? "vgHeadIn .5s ease both" : "none",
          }}
        >
          <h1
            className="font-extrabold text-gray-900 text-center"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}
          >
            Vendors List
          </h1>

          {/* Search bar — matches screenshot 1 */}
          <div className="flex w-full max-w-2xl rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search vendors (by name or ID)..."
              className="flex-1 px-5 py-3.5 text-[14px] text-gray-700 placeholder-gray-400 outline-none bg-white"
            />
            <button
              className="flex items-center gap-2 px-6 py-3.5 text-white font-bold text-[14px] transition-all duration-200 flex-shrink-0"
              style={{ background: GREEN }}
              onMouseEnter={e => e.currentTarget.style.background = GREEN_DARK}
              onMouseLeave={e => e.currentTarget.style.background = GREEN}
            >
              Search <SearchIcon/>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            TOOLBAR — results count + sort + grid/list toggle
        ══════════════════════════════════════════ */}
        <div
          className="flex items-center justify-between gap-4 mb-6 flex-wrap"
          style={{
            opacity:   visible ? 1 : 0,
            animation: visible ? "vgHeadIn .5s ease .1s both" : "none",
          }}
        >
          {/* Results count */}
          <p className="text-[14px] text-gray-500 font-medium">
            Showing{" "}
            <span className="font-bold text-gray-800">
              1–{Math.min(filtered.length, 12)}
            </span>{" "}
            of <span className="font-bold text-gray-800">{filtered.length}</span> results
          </p>

          {/* Sort + view toggle */}
          <div className="flex items-center gap-3">

            {/* Sort dropdown */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setSortOpen(p => !p)}
                className="flex items-center gap-2 text-[13px] font-semibold text-gray-700 border border-gray-200 rounded-lg px-4 py-2 bg-white transition-all duration-200 hover:border-green-400"
              >
                Sort: {sortLabel}
                <svg className={`w-3.5 h-3.5 transition-transform ${sortOpen ? "rotate-180":""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {sortOpen && (
                <div
                  className="absolute top-full right-0 mt-1.5 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-30 overflow-hidden"
                  style={{ animation: "vgDropIn .15s ease both" }}
                >
                  <div className="h-0.5" style={{ background: GREEN }}/>
                  {SORT_OPTIONS.map(o => (
                    <button
                      key={o.value}
                      onClick={() => { setSort(o.value); setSortOpen(false); }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] text-left transition-colors"
                      style={{
                        background: sort === o.value ? GREEN_PALE : "transparent",
                        color:      sort === o.value ? GREEN      : "#374151",
                        fontWeight: sort === o.value ? "700"      : "400",
                      }}
                    >
                      {o.label}
                      {sort === o.value && (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid / List toggle */}
            <ViewToggleBtn active={view === "grid"} onClick={() => setView("grid")}>
              <GridViewIcon/>
            </ViewToggleBtn>
            <ViewToggleBtn active={view === "list"} onClick={() => setView("list")}>
              <ListViewIcon/>
            </ViewToggleBtn>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            VENDOR CARDS
            Grid: 4 cols × 3 rows = 12 cards desktop
            List: full-width rows
        ══════════════════════════════════════════ */}
        {filtered.length > 0 ? (
          view === "grid" ? (
            /*
              Grid responsive:
                Mobile  (<sm) : 1 col
                sm–md         : 2 cols
                md–lg         : 3 cols
                lg+           : 4 cols  (matches screenshot — 4×3)
            */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.slice(0, 12).map((v, i) => (
                <GridCard key={v.id} vendor={v} index={i} visible={visible}/>
              ))}
            </div>
          ) : (
            /* List view — 1 col full-width rows */
            <div className="flex flex-col gap-4">
              {filtered.map((v, i) => (
                <ListCard key={v.id} vendor={v} index={i} visible={visible}/>
              ))}
            </div>
          )
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="text-5xl">🔍</div>
            <p className="font-bold text-gray-700 text-[18px]">No vendors found</p>
            <p className="text-gray-400 text-[14px]">Try a different search term</p>
            <button
              onClick={() => setQuery("")}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-[14px] transition-all"
              style={{ background: GREEN }}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════
            NAVIGATION LINKS — switch between grid/list pages
        ══════════════════════════════════════════ */}
        {/* <div className="flex items-center justify-center gap-4 mt-10 pt-8 border-t border-gray-100">
          <Link
            to={useThemeLink("/vendor")}
            className="text-[13px] font-semibold transition-colors"
            style={{ color: GREEN }}
          >
            ← Vendor List
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            to={useThemeLink("/vendor-detail")}
            className="text-[13px] font-semibold transition-colors"
            style={{ color: GREEN }}
          >
            Vendor Details →
          </Link>
        </div> */}

      </div>
    </div>
  );
}
