import { useState, useEffect, useRef } from "react";
import { ALL_POSTS } from "./data";
import Pagination from "./Pagination";
import BlogCard from "./BlogCard";

/* ══════════════════════════════════════
   KEYFRAMES — injected once
══════════════════════════════════════ */
const STYLE_ID = "t1bp-styles";
const CSS = `
  @keyframes t1bpFadeUp {
    from { opacity:0; transform:translateY(22px) scale(0.97); }
    to   { opacity:1; transform:translateY(0)    scale(1);    }
  }
  @keyframes t1bpIn {
    from { opacity:0; transform:translateY(-10px); }
    to   { opacity:1; transform:translateY(0); }
  }
`;

const PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(ALL_POSTS.length / PER_PAGE);

export default function BlogPage() {
  const [page,    setPage]    = useState(1);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  /* inject keyframes once */
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  /* intersection observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* scroll to top of section on page change */
  const handlePageChange = p => {
    setPage(p);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pagePosts = ALL_POSTS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section
      ref={ref}
      className="w-full py-8 md:py-12"
      style={{ fontFamily: "'Barlow', sans-serif", background: "#f8f9f4" }}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">

        {/*
          Responsive grid:
            Mobile (<sm)  : 1 col
            sm  (640px+)  : 2 col
            lg  (1024px+) : 4 col  ← matches screenshots
        */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
            gap: "clamp(14px, 2.5vw, 24px)",
          }}
        >
          {pagePosts.map((post, i) => (
            <BlogCard
              key={post.id}
              post={post}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          current={page}
          total={TOTAL_PAGES}
          onChange={handlePageChange}
        />

      </div>
    </section>
  );
}
