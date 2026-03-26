import { useState } from "react";
import { COMMENTS, POST } from "../data";
import { DARK, GREEN } from "@/constant";
import FormField from "../field";

/* ── 1. Hero image ── */
export const HeroImage = ({ visible }) => {
  const [hov, setHov] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        height:"clamp(220px,30vw,440px)",
        border:"1.5px solid #e5e7eb",
        boxShadow:"0 2px 16px rgba(0,0,0,0.07)",
        opacity:visible?1:0,
        animation:visible?"t1bdLeft .6s cubic-bezier(.16,1,.3,1) .05s both":"none",
      }}>
      <img src={POST.heroImage} alt={POST.title}
        className="w-full h-full object-cover"
        style={{transform:hov?"scale(1.04)":"scale(1)",transition:"transform .5s cubic-bezier(.16,1,.3,1)"}}
        //onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/1200x440/f0f5e8/629d23?text=Blog";}}
        loading="lazy"/>
    </div>
  );
}

/* ── 2. Title + main paras + quote ── */
export const ArticleBody = ({ visible }) => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-5"
      style={{
        border:"1.5px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?"t1bdFadeUp .6s cubic-bezier(.16,1,.3,1) .12s both":"none",
      }}>
      {/* Meta */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5 text-[16px]" style={{color:"#6b7280"}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {POST.date}
        </span>
        <span className="flex items-center gap-1.5 text-[16px]" style={{color:"#6b7280"}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
          </svg>
          {POST.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-extrabold leading-snug"
        style={{fontSize:" 30px clamp(1.2rem,2.8vw,1.8rem)",color:DARK}}>
        {POST.title}
      </h1>

      <p className="text-[16px] leading-relaxed" style={{color:"#4b5563"}}>{POST.para1}</p>
      <p className="text-[16px] leading-relaxed" style={{color:"#4b5563"}}>{POST.para2}</p>

      {/* Pull quote */}
      <blockquote className="px-6 py-5 rounded-xl"
        style={{background:"#f8faf3",borderLeft:`4px solid ${GREEN}`}}>
        <p className="text-[20px] font-semibold leading-relaxed italic" style={{color:DARK}}>
          {POST.quote}
        </p>
      </blockquote>

      <p className="text-[16px] leading-relaxed" style={{color:"#4b5563"}}>{POST.para3}</p>
    </div>
  );
}

/* ── 3. Sample images ── */
export const SampleImages = ({ visible }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      style={{
        opacity:visible?1:0,
        animation:visible?"t1bdFadeUp .6s cubic-bezier(.16,1,.3,1) .18s both":"none",
      }}>
      {POST.sampleImages.map((img,i)=>{
        const [hov,setHov] = useState(false);
        return (
          <div key={i} className="rounded-2xl overflow-hidden"
            onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
            style={{
              height:"clamp(180px,22vw,280px)",
              border:`1.5px solid ${hov?GREEN:"#e5e7eb"}`,
              boxShadow:hov?"0 12px 32px rgba(98,157,35,0.15)":"0 2px 10px rgba(0,0,0,0.05)",
              transform:hov?"translateY(-3px)":"translateY(0)",
              transition:"all .3s cubic-bezier(.16,1,.3,1)",
            }}>
            <img src={img} alt={`sample-${i}`}
              className="w-full h-full object-cover"
              style={{transform:hov?"scale(1.06)":"scale(1)",transition:"transform .45s cubic-bezier(.16,1,.3,1)"}}
              //onError={e=>{e.target.onerror=null;e.target.src=`https://placehold.co/600x280/f0f5e8/629d23?text=Image+${i+1}`;}}
              loading="lazy"/>
          </div>
        );
      })}
    </div>
  );
}

/* ── 4. Last para + tags + social ── */
export const ArticleFooter = ({ visible }) => {
  const socials = [
    { label:"f",  color:"#1877f2" },
    { label:"t",  color:"#1da1f2" },
    { label:"ig", color:"#e1306c" },
    { label:"dr", color:"#ea4c89" },
  ];
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-5"
      style={{
        border:"1.5px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?"t1bdFadeUp .6s cubic-bezier(.16,1,.3,1) .22s both":"none",
      }}>
      <p className="text-[14px] leading-relaxed" style={{color:"#4b5563"}}>{POST.para4}</p>

      <hr style={{borderColor:"#f1f5f9"}}/>

      {/* Tags + Social row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-[13px]" style={{color:DARK}}>Tags</span>
          {POST.postTags.map(tag=>{
            const [hov,setHov] = useState(false);
            return (
              <span key={tag}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                className="px-3 py-1 rounded-lg text-[11px] font-semibold cursor-pointer"
                style={{
                  background:hov?GREEN:"#fff",
                  color:hov?"#fff":"#374151",
                  border:`1.5px solid ${hov?GREEN:"#e5e7eb"}`,
                  transform:hov?"translateY(-2px)":"translateY(0)",
                  transition:"all .2s cubic-bezier(.16,1,.3,1)",
                }}>
                {tag}
              </span>
            );
          })}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-[12px] uppercase tracking-wide" style={{color:"#374151"}}>Social Icon</span>
          {socials.map(s=>{
            const [hov,setHov]=useState(false);
            return (
              <div key={s.label}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold cursor-pointer"
                style={{
                  background:hov?s.color:"#f5f6fa",
                  color:hov?"#fff":"#374151",
                  border:`1.5px solid ${hov?s.color:"#e5e7eb"}`,
                  transform:hov?"translateY(-3px) scale(1.1)":"translateY(0) scale(1)",
                  transition:"all .22s cubic-bezier(.16,1,.3,1)",
                }}>
                {s.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── 5. Author card ── */
export const AuthorCard = ({ visible }) => {
  const [hov, setHov] = useState(false);
  const author = POST.author;
  const socials = [
    {label:"dr",color:"#ea4c89"},
    {label:"f", color:"#1877f2"},
    {label:"ig",color:"#e1306c"},
  ];
  return (
    <div
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="flex items-start gap-5 p-6 md:p-7 rounded-2xl"
      style={{
        background:"#f8faf3",
        border:`1.5px solid ${hov?GREEN:"#e5e7eb"}`,
        boxShadow:hov?"0 10px 28px rgba(98,157,35,0.12)":"0 2px 10px rgba(0,0,0,0.04)",
        transform:hov?"translateY(-2px)":"translateY(0)",
        transition:"all .3s cubic-bezier(.16,1,.3,1)",
        opacity:visible?1:0,
        animation:visible?"t1bdFadeUp .6s cubic-bezier(.16,1,.3,1) .28s both":"none",
      }}>
      {/* Avatar */}
      <div className="flex-shrink-0 rounded-full overflow-hidden"
        style={{
          width:90,height:90,
          border:`3px solid ${hov?GREEN:"#e5e7eb"}`,
          transition:"border-color .3s",
          boxShadow:hov?"0 4px 16px rgba(98,157,35,0.22)":"none",
        }}>
        <img src={author.avatar} alt={author.name}
          className="w-full h-full object-cover"
          style={{transform:hov?"scale(1.08)":"scale(1)",transition:"transform .35s"}}
          //onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/90x90/f0f5e8/629d23?text=A";}}
          />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div>
          <p className="text-[12px]" style={{color:"#9ca3af"}}>Author</p>
          <p className="font-extrabold text-[16px]" style={{color:GREEN}}>{author.name}</p>
        </div>
        <p className="text-[13px] leading-relaxed" style={{color:"#6b7280"}}>{author.bio}</p>
        <div className="flex items-center gap-2 mt-1">
          {socials.map(s=>{
            const [sh,setSh]=useState(false);
            return (
              <div key={s.label}
                onMouseEnter={()=>setSh(true)} onMouseLeave={()=>setSh(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold cursor-pointer"
                style={{
                  background:sh?s.color:"#fff",
                  color:sh?"#fff":"#374151",
                  border:`1.5px solid ${sh?s.color:"#e5e7eb"}`,
                  transform:sh?"translateY(-3px) scale(1.12)":"translateY(0) scale(1)",
                  transition:"all .22s cubic-bezier(.16,1,.3,1)",
                }}>
                {s.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── 6. Comments + Add Review ── */
export const CommentsSection = ({ visible }) => {
  const [form, setForm] = useState({name:"",email:"",msg:""});
  const [hovBtn, setHovBtn] = useState(false);
  const setF = k => e => setForm(p=>({...p,[k]:e.target.value}));

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-6"
      style={{
        border:"1.5px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?"t1bdFadeUp .6s cubic-bezier(.16,1,.3,1) .34s both":"none",
      }}>

      {/* Comment count */}
      <h2 className="font-extrabold" style={{fontSize:"clamp(1.2rem,2.5vw,1.5rem)",color:DARK}}>
        {String(COMMENTS.length).padStart(2,"0")} Comments
      </h2>

      {/* Comment rows */}
      <div className="flex flex-col">
        {COMMENTS.map((c,i)=>(
          <CommentRow key={c.id} comment={c} last={i===COMMENTS.length-1}/>
        ))}
      </div>

      <hr style={{borderColor:"#f1f5f9"}}/>

      {/* Add a Review form */}
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="font-extrabold" style={{fontSize:"clamp(1.1rem,2vw,1.4rem)",color:DARK}}>Add a Review</h2>
          <p className="text-[13px] mt-1" style={{color:"#9ca3af"}}>Your email address will not be published. Required fields are marked*</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Full Name"     placeholder="Full name"     value={form.name}  onChange={setF("name")}/>
          <FormField label="Email Address" type="email" placeholder="Email address" value={form.email} onChange={setF("email")}/>
        </div>
        <FormField label="Message" as="textarea" placeholder="Write your comment..." value={form.msg} onChange={setF("msg")}/>

        <button
          onMouseEnter={()=>setHovBtn(true)} onMouseLeave={()=>setHovBtn(false)}
          className="self-start px-8 py-3 rounded-xl font-bold text-white text-[14px]"
          style={{
            background:  hovBtn?GREEN2:GREEN,
            boxShadow:   hovBtn?"0 8px 24px rgba(98,157,35,0.40)":"0 2px 8px rgba(98,157,35,0.18)",
            transform:   hovBtn?"translateY(-2px) scale(1.03)":"translateY(0) scale(1)",
            transition:  "all .25s cubic-bezier(.16,1,.3,1)",
            border:"none",cursor:"pointer",fontFamily:"'Barlow',sans-serif",
          }}>
          Post Comment
        </button>
      </div>
    </div>
  );
}

function CommentRow({ comment, last }) {
  const [hov,setHov] = useState(false);
  const [repHov,setRepHov] = useState(false);
  return (
    <div
      className="flex gap-4 py-5"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        borderBottom:last?"none":"1px solid #f1f5f9",
        marginLeft:comment.indent?"clamp(24px,6vw,80px)":"0",
        background:hov?"#fafef6":"transparent",
        borderRadius:8,
        transition:"background .2s",
      }}>
      <img src={comment.avatar} alt={comment.name}
        className="flex-shrink-0 rounded-xl object-cover"
        style={{
          width:"clamp(56px,8vw,90px)",height:"clamp(56px,8vw,90px)",
          border:`2px solid ${hov?GREEN:"#e5e7eb"}`,
          transition:"border-color .2s",
        }}
        //onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/90x90/f0f5e8/629d23?text=A";}}
        />
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[12px]" style={{color:"#9ca3af"}}>{comment.date}</p>
            <p className="font-extrabold text-[14px]" style={{color:DARK}}>{comment.name}</p>
          </div>
          <button
            onMouseEnter={()=>setRepHov(true)} onMouseLeave={()=>setRepHov(false)}
            className="text-[12px] font-bold tracking-widest"
            style={{
              color:repHov?GREEN2:GREEN,
              background:"none",border:"none",cursor:"pointer",
              fontFamily:"'Barlow',sans-serif",
              transform:repHov?"scale(1.08)":"scale(1)",
              transition:"all .18s",
            }}>
            REPLAY
          </button>
        </div>
        <p className="text-[13px] leading-relaxed" style={{color:"#4b5563"}}>{comment.text}</p>
      </div>
    </div>
  );
}