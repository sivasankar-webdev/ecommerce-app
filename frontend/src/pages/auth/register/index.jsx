import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../features/auth/authSlice";
import Field from "./components/field";
import SocialBtn from "./components/button";
import { GREEN, GREEN_DARK, GREEN_PALE } from "@/constant";
import { FacebookIcon, FarmLogo, GoogleIcon } from "../login/components/icons";
import { LoadingOverlay } from "../login/components/popup";

/* ═══════════════════════════════════════════════════
   REGISTER PAGE — main export
═══════════════════════════════════════════════════ */
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});
  const [visible,  setVisible]  = useState(false);
  const [btnHov,   setBtnHov]   = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, user, token } = useSelector((state) => state.auth);

  const loginLink = "/login";

  /* Fade-in on mount */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

   
   useEffect(() => {
      if (isRegistered) {
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    }, [isRegistered]);

  /* Inject styles + font */
  useEffect(() => {
    if (document.getElementById("rg1-styles")) return;
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.id = "rg1-styles";
    s.textContent = `
      @keyframes rgCardIn {
        from { opacity:0; transform:translateY(32px) scale(0.97); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
      @keyframes rgLogoIn {
        from { opacity:0; transform:scale(0.6) rotate(-15deg); }
        to   { opacity:1; transform:scale(1)   rotate(0deg);   }
      }
      @keyframes rgFieldIn {
        from { opacity:0; transform:translateX(-14px); }
        to   { opacity:1; transform:translateX(0);     }
      }
      @keyframes rgSuccessIn {
        from { opacity:0; transform:scale(0.7); }
        to   { opacity:1; transform:scale(1);   }
      }
      @keyframes rgBgFloat {
        0%,100% { transform:translateY(0) rotate(0deg); }
        33%     { transform:translateY(-12px) rotate(5deg); }
        66%     { transform:translateY(8px) rotate(-3deg); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const validate = () => {
    const e = {};
    if (!username.trim())                    e.username = "Username is required";
    else if (username.trim().length < 3)     e.username = "At least 3 characters";
    if (!email.trim())                       e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))   e.email    = "Enter a valid email";
    if (!password)                           e.password = "Password is required";
    else if (password.length < 6)           e.password = "Minimum 6 characters";
    return e;
  };

  const handleSubmit = async () => {
  const e = validate();

  if (Object.keys(e).length) {
    setErrors(e);
    return;
  }

  setErrors({});

  try {
    const res = await dispatch(registerUser({ name: username, email, password })).unwrap();

    // ✅ Success
    console.log("Registered:", res);

    setIsRegistered(true);

    // Optional: auto redirect to login
    // setTimeout(() => {
    //   navigate("/login");
    // }, 1000);

  } catch (err) {
    // ❌ Backend error
    setErrors({ api: err || "Registration failed" });
  }
};

  return (
    <> 
      {loading && (
        <LoadingOverlay message="Signing you in, please wait a moment..." />
      )}
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden py-10 px-4"
      style={{
        background:  "#f3f4f6",
        fontFamily:  "'Barlow', sans-serif",
      }}
    >
      {/* Decorative floating blobs in bg */}
      {[
        { size:180, top:"-40px",  left:"-60px",  color:"rgba(98,157,35,0.08)", delay:"0s"    },
        { size:120, top:"60%",    right:"-40px",  color:"rgba(98,157,35,0.06)", delay:"1.2s"  },
        { size:90,  bottom:"30px",left:"15%",    color:"rgba(98,157,35,0.07)", delay:"0.7s"  },
        { size:60,  top:"20%",    right:"20%",   color:"rgba(245,158,11,0.08)",delay:"1.8s"  },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:      b.size, height:b.size,
            top:        b.top,  bottom:b.bottom,
            left:       b.left, right:b.right,
            background: b.color,
            animation:  `rgBgFloat ${5 + i}s ease-in-out ${b.delay} infinite`,
          }}
        />
      ))}

      {/* ── CARD ── */}
      <div
        className="w-full relative z-10"
        style={{
          maxWidth:  "680px",
          opacity:   visible ? 1 : 0,
          animation: visible ? "rgCardIn .65s cubic-bezier(.16,1,.3,1) both" : "none",
        }}
      >
        <div
          className="bg-white rounded-3xl px-8 sm:px-12 py-10"
          style={{ boxShadow:"0 8px 48px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.04)" }}
        >
          {isRegistered ? (
            /* ── SUCCESS STATE ── */
            <div
              className="flex flex-col items-center gap-5 py-8 text-center"
              style={{ animation:"rgSuccessIn .6s cubic-bezier(.16,1,.3,1) both" }}
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
                <h2 className="font-extrabold text-gray-900 text-[22px]">Account Created!</h2>
                <p className="text-gray-400 text-[14px] mt-1">Welcome to EkoMart. You can now log in.</p>
              </div>
              <Link
                to={loginLink}
                className="px-8 py-3 rounded-xl text-white font-bold text-[14px] transition-all duration-200"
                style={{ background: GREEN }}
                onMouseEnter={e => e.currentTarget.style.background = GREEN_DARK}
                onMouseLeave={e => e.currentTarget.style.background = GREEN}
              >
                Go to Login →
              </Link>
            </div>
          ) : (
            <>
              {/* ── LOGO ── */}
              <div
                className="flex justify-center mb-5"
                style={{ animation: visible ? "rgLogoIn .7s cubic-bezier(.16,1,.3,1) .15s both" : "none" }}
              >
                <FarmLogo/>
              </div>

              {/* ── TITLE ── */}
              <h1
                className="text-center font-extrabold text-gray-900 mb-7"
                style={{
                  fontSize:  "clamp(1.25rem, 3vw, 1.55rem)",
                  animation: visible ? "rgFieldIn .55s ease .2s both" : "none",
                  opacity:   visible ? undefined : 0,
                }}
              >
                Register Into Your Account
              </h1>

              {/* ── FIELDS ── */}
              <div className="flex flex-col gap-5">
                {[
                  { label:"Username", key:"username", type:"text",
                    comp: <Field key="u" label="Username" type="text" value={username}
                            onChange={e => setUsername(e.target.value)} error={errors.username}/> },
                  { label:"Email",    key:"email",    type:"email",
                    comp: <Field key="e" label="Email" type="email" value={email}
                            onChange={e => setEmail(e.target.value)} error={errors.email}/> },
                  { label:"Password", key:"password", type:"password",
                    comp: <Field key="p" label="Password" type="password" value={password}
                            onChange={e => setPassword(e.target.value)} error={errors.password}/> },
                ].map(({ key, comp }, i) => (
                  <div
                    key={key}
                    style={{
                      animation: visible ? `rgFieldIn .5s ease ${0.25 + i * 0.08}s both` : "none",
                      opacity:   visible ? undefined : 0,
                    }}
                  >
                    {comp}
                  </div>
                ))}
              </div>

                  {errors.api && (
                        <p className="text-[13px] text-red-500 font-medium mt-2 text-center">
                          {errors.api}
                        </p>
                      )}

              {/* ── REGISTER BUTTON ── */}
              <div
                className="mt-7"
                style={{ animation: visible ? "rgFieldIn .5s ease .5s both" : "none", opacity: visible ? undefined : 0 }}
              >
                <button
                  onClick={handleSubmit}
                  onMouseEnter={() => setBtnHov(true)}
                  onMouseLeave={() => setBtnHov(false)}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl cursor-pointer text-white font-extrabold text-[15px] flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: btnHov ? GREEN_DARK : GREEN,
                    boxShadow:  btnHov
                      ? "0 8px 24px rgba(98,157,35,0.4)"
                      : "0 4px 12px rgba(98,157,35,0.25)",
                    transform:  btnHov ? "translateY(-2px)" : "translateY(0)",
                    opacity:    loading ? 0.8 : 1,
                  }}
                >
                  {loading && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                    </svg>
                  )}
                  {loading ? "Creating Account..." : "Register Account"}
                </button>
              </div>

              {/* ── DIVIDER ── */}
              <div
                className="flex items-center gap-4 my-6"
                style={{ animation: visible ? "rgFieldIn .5s ease .55s both" : "none", opacity: visible ? undefined : 0 }}
              >
                <div className="flex-1 h-px bg-gray-200"/>
                <span className="text-[13px] text-gray-400 font-medium whitespace-nowrap">Or Register With</span>
                <div className="flex-1 h-px bg-gray-200"/>
              </div>

              {/* ── SOCIAL BUTTONS ── */}
              <div
                className="flex gap-3"
                style={{ animation: visible ? "rgFieldIn .5s ease .6s both" : "none", opacity: visible ? undefined : 0 }}
              >
                <SocialBtn icon={<GoogleIcon/>}   label="Google"   onClick={() => {}}/>
                <SocialBtn icon={<FacebookIcon/>} label="Facebook" onClick={() => {}}/>
              </div>

              {/* ── LOGIN LINK ── */}
              <p
                className="text-center text-[14px] text-gray-500 mt-6"
                style={{ animation: visible ? "rgFieldIn .5s ease .65s both" : "none", opacity: visible ? undefined : 0 }}
              >
                Already Have Account?{" "}
                <Link
                  to={loginLink}
                  className="font-extrabold transition-colors duration-200"
                  style={{ color: GREEN }}
                  onMouseEnter={e => e.currentTarget.style.color = GREEN_DARK}
                  onMouseLeave={e => e.currentTarget.style.color = GREEN}
                >
                  Login
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
