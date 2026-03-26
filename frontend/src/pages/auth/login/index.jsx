import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { GREEN, GREEN_DARK, GREEN_PALE } from "@/constant";
import { FacebookIcon, FarmLogo, GoogleIcon } from "./components/icons";
import { Field } from "./components/field";
import SocialBtn from "./components/button";
import { LoadingOverlay } from "./components/popup";

/* ═══════════════════════════════════════════════════
   LOGIN PAGE — main export
═══════════════════════════════════════════════════ */
export default function LoginPage() {
  const [email,    setEmail]    = useState("test@mail.com");
  const [password, setPassword] = useState("123456");
  const [errors,   setErrors]   = useState({});
  const [success,  setSuccess]  = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [btnHov,   setBtnHov]   = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: reduxLoading, error: reduxError } = useSelector((state) => state.auth);

  //const registerLink = useThemeLink("/register");
  //const homeLink     = useThemeLink("/");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (document.getElementById("lg1-styles")) return;
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.id = "lg1-styles";
    s.textContent = `
      @keyframes lgCardIn   { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      @keyframes lgLogoIn   { from{opacity:0;transform:scale(0.6) rotate(-15deg)} to{opacity:1;transform:scale(1) rotate(0)} }
      @keyframes lgFieldIn  { from{opacity:0;transform:translateX(-14px)} to{opacity:1;transform:translateX(0)} }
      @keyframes lgSuccess  { from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }
      @keyframes lgBgFloat  { 0%,100%{transform:translateY(0) rotate(0)} 33%{transform:translateY(-12px) rotate(5deg)} 66%{transform:translateY(8px) rotate(-3deg)} }
    `;
    document.head.appendChild(s);
  }, []);

  const validate = () => {
    const e = {};
    if (!email.trim())                     e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = "Enter a valid email";
    if (!password)                         e.password = "Password is required";
    else if (password.length < 6)         e.password = "Minimum 6 characters";
    return e;
  };

  const handleLogin = async () => {
  const e = validate();

  if (Object.keys(e).length) {
    setErrors(e);
    return;
  }

  setErrors({});

  try {
    const res = await dispatch(loginUser({ email, password })).unwrap();

    // ✅ success
    setSuccess(true);

    // setTimeout(() => {
    //   navigate("/");
    // }, 1000);
  } catch (err) {
    // ❌ error from backend
    setErrors({ api: err || "Login failed" });
  }
};

  /* Enter key submit */
  const onKey = (e) => { if (e.key === "Enter") handleLogin(); };

  return (
    <>

      {reduxLoading && (
        <LoadingOverlay message="Signing you in, please wait a moment..." />
      )}

    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden py-10 px-4"
      style={{ background: "#f3f4f6", fontFamily: "'Barlow', sans-serif" }}
    >
      {/* Decorative bg blobs */}
      {[
        { size:180, top:"-40px",  left:"-60px",  color:"rgba(98,157,35,0.08)", delay:"0s"   },
        { size:120, top:"65%",    right:"-40px", color:"rgba(98,157,35,0.06)", delay:"1.2s" },
        { size:90,  bottom:"30px",left:"12%",    color:"rgba(98,157,35,0.07)", delay:"0.7s" },
        { size:60,  top:"18%",    right:"22%",   color:"rgba(245,158,11,0.07)",delay:"1.8s" },
      ].map((b, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width:b.size, height:b.size,
            top:b.top, bottom:b.bottom, left:b.left, right:b.right,
            background:b.color,
            animation:`lgBgFloat ${5+i}s ease-in-out ${b.delay} infinite`,
          }}
        />
      ))}

      {/* ── CARD ── */}
      <div
        className="w-full relative z-10"
        style={{
          maxWidth:  "680px",
          opacity:   visible ? 1 : 0,
          animation: visible ? "lgCardIn .65s cubic-bezier(.16,1,.3,1) both" : "none",
        }}
      >
        <div
          className="bg-white rounded-3xl px-8 sm:px-12 py-10"
          style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.04)" }}
        >
          {success ? (
            /* ── SUCCESS ── */
            <div
              className="flex flex-col items-center gap-5 py-8 text-center"
              style={{ animation:"lgSuccess .6s cubic-bezier(.16,1,.3,1) both" }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: GREEN_PALE, border:`2px solid ${GREEN}` }}
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <h2 className="font-extrabold text-gray-900 text-[22px]">Welcome Back!</h2>
                <p className="text-gray-400 text-[14px] mt-1">You have successfully logged in.</p>
              </div>
              <Link
                to={"/"}
                className="px-8 py-3 rounded-xl text-white font-bold text-[14px] transition-all duration-200 active:scale-95"
                style={{ background: GREEN }}
                onMouseEnter={e => e.currentTarget.style.background = GREEN_DARK}
                onMouseLeave={e => e.currentTarget.style.background = GREEN}
              >
                Go to Home →
              </Link>
            </div>
          ) : (
            <>
              {/* ── LOGO ── */}
              <div
                className="flex justify-center mb-5"
                style={{ animation: visible ? "lgLogoIn .7s cubic-bezier(.16,1,.3,1) .1s both" : "none" }}
              >
                <FarmLogo/>
              </div>

              {/* ── TITLE ── */}
              <h1
                className="text-center font-extrabold text-gray-900 mb-7"
                style={{
                  fontSize:"clamp(1.25rem, 3vw, 1.55rem)",
                  animation:visible ? "lgFieldIn .5s ease .18s both" : "none",
                  opacity:  visible ? undefined : 0,
                }}
              >
                Login Into Your Account
              </h1>

              {/* ── FIELDS ── */}
              <div className="flex flex-col gap-5" onKeyDown={onKey}>
                {/* Email */}
                <div style={{
                  animation: visible ? "lgFieldIn .5s ease .24s both" : "none",
                  opacity:   visible ? undefined : 0,
                }}>
                  <Field
                    label="Email" type="email"
                    value={email} onChange={e => setEmail(e.target.value)}
                    error={errors.email}
                  />
                </div>

                {/* Password */}
                <div style={{
                  animation: visible ? "lgFieldIn .5s ease .32s both" : "none",
                  opacity:   visible ? undefined : 0,
                }}>
                  <Field
                    label="Password" type="password"
                    value={password} onChange={e => setPassword(e.target.value)}
                    error={errors.password}
                  />
                </div>

                {/* {reduxError && (
                    <p className="text-[13px] text-red-500 font-medium mt-2">
                      {reduxError}
                    </p>
                  )} */}
                  {errors.api && (
                        <p style={{ color: "red" }}>{errors.api}</p>
                      )}

                {/* Forgot password */}
                <div
                  className="flex justify-end -mt-2"
                  style={{
                    animation: visible ? "lgFieldIn .5s ease .36s both" : "none",
                    opacity:   visible ? undefined : 0,
                  }}
                >
                  <a
                    href="#"
                    className="text-[13px] font-semibold transition-all duration-200 cursor-pointer"
                    style={{ color: GREEN }}
                    onMouseEnter={e => { e.currentTarget.style.color = GREEN_DARK; e.currentTarget.style.textDecoration="underline"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = GREEN;      e.currentTarget.style.textDecoration="none";      }}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* ── LOGIN BUTTON ── */}
              <div
                className="mt-5"
                style={{
                  animation: visible ? "lgFieldIn .5s ease .42s both" : "none",
                  opacity:   visible ? undefined : 0,
                }}
              >
                <button
                  onClick={handleLogin}
                  onMouseEnter={() => setBtnHov(true)}
                  onMouseLeave={() => setBtnHov(false)}
                  disabled={reduxLoading}
                  className="w-full cursor-pointer py-3.5 rounded-xl text-white font-extrabold text-[15px] flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: btnHov ? GREEN_DARK : GREEN,
                    boxShadow:  btnHov
                      ? "0 8px 24px rgba(98,157,35,0.4)"
                      : "0 4px 12px rgba(98,157,35,0.25)",
                    transform:  btnHov ? "translateY(-2px)" : "translateY(0)",
                    opacity:    reduxLoading ? 0.8 : 1,
                  }}
                >
                  {reduxLoading && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                    </svg>
                  )}
                  {reduxLoading ? "Logging In..." : "Login Account"}
                </button>
              </div>

              {/* ── DIVIDER ── */}
              <div
                className="flex items-center gap-4 my-6"
                style={{
                  animation: visible ? "lgFieldIn .5s ease .48s both" : "none",
                  opacity:   visible ? undefined : 0,
                }}
              >
                <div className="flex-1 h-px bg-gray-200"/>
                <span className="text-[13px] text-gray-400 font-medium whitespace-nowrap">Or Register With</span>
                <div className="flex-1 h-px bg-gray-200"/>
              </div>

              {/* ── SOCIAL BUTTONS ── */}
              <div
                className="flex gap-3"
                style={{
                  animation: visible ? "lgFieldIn .5s ease .54s both" : "none",
                  opacity:   visible ? undefined : 0,
                }}
              >
                <SocialBtn icon={<GoogleIcon/>}   label="Google"/>
                <SocialBtn icon={<FacebookIcon/>} label="Facebook"/>
              </div>

              {/* ── REGISTER LINK ── */}
              <p
                className="text-center cursor-pointer text-[14px] text-gray-500 mt-6"
                style={{
                  animation: visible ? "lgFieldIn .5s ease .6s both" : "none",
                  opacity:   visible ? undefined : 0,
                }}
              >
                Don't have Account?{" "}
                <Link
                  to={"/register"}
                  className="font-extrabold transition-colors duration-200"
                  style={{ color: GREEN }}
                  onMouseEnter={e => e.currentTarget.style.color = GREEN_DARK}
                  onMouseLeave={e => e.currentTarget.style.color = GREEN}
                >
                  Sign Up
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
