import { useState, useEffect, useRef } from "react";
import { POST } from "./components/data";
import { ArticleBody, ArticleFooter, AuthorCard, CommentsSection, HeroImage, SampleImages } from "./components/CommentSection";
import SearchWidget from "./components/SearchWidget";
import CategoriesWidget from "./components/categories";
import LatestPostsWidget from "./components/LatestPost";
import TagsWidget from "./components/tags";

/* ══════════════════════════════════════
   KEYFRAMES — injected once
══════════════════════════════════════ */
const STYLE_ID = "t1bd-styles";
const CSS = `
  @keyframes t1bdFadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes t1bdLeft {
    from { opacity:0; transform:translateX(-22px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes t1bdRight {
    from { opacity:0; transform:translateX(22px); }
    to   { opacity:1; transform:translateX(0); }
  }
`;

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function BlogDetail({ post = POST }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(()=>{
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement("style");
    s.id=STYLE_ID; s.textContent=CSS;
    document.head.appendChild(s);
  },[]);

  useEffect(()=>{
    const obs=new IntersectionObserver(
      ([e])=>{ if(e.isIntersecting){ setVisible(true); obs.disconnect(); } },
      { threshold:0.04 }
    );
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  return (
    <section ref={ref} className="w-full py-8 md:py-12"
      style={{fontFamily:"'Barlow',sans-serif",background:"#f8f9f4"}}>
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        {/*
          Responsive:
            Mobile (<lg)  : stacked — content top, aside below
            lg+           : content (flex-[2]) | aside (300px) side by side
        */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ══ MAIN CONTENT ══ */}
          <div className="w-full lg:flex-[2] flex flex-col gap-6">
            <HeroImage    visible={visible}/>
            <ArticleBody  visible={visible}/>
            <SampleImages visible={visible}/>
            <ArticleFooter visible={visible}/>
            <AuthorCard   visible={visible}/>
            <CommentsSection visible={visible}/>
          </div>

          {/* ══ RIGHT ASIDE ══ */}
          <aside className="w-full lg:w-[300px] xl:w-[320px] flex-shrink-0 flex flex-col gap-5">
            <SearchWidget      visible={visible}/>
            <CategoriesWidget  visible={visible}/>
            <LatestPostsWidget visible={visible}/>
            <TagsWidget        visible={visible}/>
          </aside>

        </div>
      </div>
    </section>
  );
}
