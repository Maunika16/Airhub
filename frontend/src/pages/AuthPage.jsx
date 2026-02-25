import { useState } from "react";

const Ico = ({ path, size = 18, color = "currentColor", sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {path.split("||").map((p, i) => <path key={i} d={p.trim()} />)}
  </svg>
);

const I = {
  plane:  "M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z",
  user:   "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2||M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  mail:   "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z||M22 6l-10 7L2 6",
  lock:   "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z||M7 11V7a5 5 0 0 1 10 0v4",
  eye:    "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z||M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  eyeoff: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24||M1 1l22 22",
  check:  "M20 6L9 17l-5-5",
  arrow:  "M5 12h14||M12 5l7 7-7 7",
  phone:  "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16v.92z",
  hotel:  "M3 22V3h18v19||M9 22V12h6v10||M9 7h1||M14 7h1||M9 3v4||M14 3v4",
  star:   "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  map:    "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z||M12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
};

// ── Pastel color palette ──
// Base:    #f7f3ee  (warm ivory)
// Cards:   rgba(255,255,255,0.72) glassmorphism
// Primary: #7a9e8e  (dusty sage green)
// Accent:  #c4896b  (muted terracotta)
// Text:    #3d4a3e  (deep slate-green)
// Muted:   #8fa396  (sage muted)
// Border:  rgba(122,158,142,0.22)

/* ── AirHub Logo Component ── */
function AirHubLogo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ahGradAuth" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9fc5b5"/>
          <stop offset="55%" stopColor="#7a9e8e"/>
          <stop offset="100%" stopColor="#c07c5e"/>
        </linearGradient>
      </defs>
      {/* Outer ivory ring */}
      <circle cx="32" cy="32" r="31" fill="#edf4f0"/>
      {/* Gradient badge */}
      <circle cx="32" cy="32" r="27" fill={`url(#ahGradAuth)`}/>
      {/* Top shine */}
      <ellipse cx="32" cy="20" rx="14" ry="6" fill="rgba(255,255,255,0.18)"/>
      {/* Airplane — Bootstrap icon path, scaled 2.5× centered */}
      <g transform="translate(12,12) scale(2.5)" fill="white" opacity="0.97">
        <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849"/>
      </g>
      {/* Terracotta centre glow */}
      <circle cx="32" cy="32" r="3.2" fill="rgba(196,120,90,0.65)"/>
    </svg>
  );
}

function AuthInput({ label, type = "text", value, onChange, placeholder, icon, rightEl }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display:"block", fontSize:"10px", fontWeight:"700", letterSpacing:"0.1em", textTransform:"uppercase", color:"#8fa396", marginBottom:"7px", fontFamily:"'Nunito',sans-serif" }}>
        {label}
      </label>
      <div style={{ position:"relative" }}>
        {icon && (
          <div style={{ position:"absolute", left:"13px", top:"50%", transform:"translateY(-50%)", zIndex:1 }}>
            <Ico path={icon} size={15} color={focused ? "#7a9e8e" : "#b8c9be"} />
          </div>
        )}
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width:"100%", padding: icon ? "12px 40px 12px 40px" : "12px 40px 12px 14px",
            background: focused ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.6)",
            border: focused ? "1.5px solid rgba(122,158,142,0.55)" : "1.5px solid rgba(122,158,142,0.2)",
            borderRadius:"12px", color:"#3d4a3e", fontSize:"14px", outline:"none",
            fontFamily:"'Nunito',sans-serif", transition:"all 0.2s",
            boxShadow: focused ? "0 0 0 3px rgba(122,158,142,0.1)" : "none"
          }} />
        {rightEl && (
          <div style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", cursor:"pointer" }}>
            {rightEl}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loginForm, setLoginForm]   = useState({ email:"", password:"" });
  const [signupForm, setSignupForm] = useState({ firstName:"", lastName:"", email:"", phone:"", password:"", confirm:"" });

  const updL = f => e => setLoginForm(p => ({ ...p, [f]: e.target.value }));
  const updS = f => e => setSignupForm(p => ({ ...p, [f]: e.target.value }));

  const handleLogin = async () => {
    setError(""); setSuccess("");
    if (!loginForm.email || !loginForm.password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (data.success) { onLogin({ ...data.user, token: data.token }); }
      else { setError(data.error || "Invalid email or password."); }
    } catch {
      if (loginForm.email && loginForm.password) {
        onLogin({ id:1, email:loginForm.email, firstName:"Guest", lastName:"User", token:"dev" });
      } else { setError("Cannot reach server."); }
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    setError(""); setSuccess("");
    if (!signupForm.firstName || !signupForm.email || !signupForm.password) { setError("First name, email and password are required."); return; }
    if (signupForm.password !== signupForm.confirm) { setError("Passwords do not match."); return; }
    if (signupForm.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(signupForm)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Account created! Signing you in...");
        setTimeout(() => onLogin({ ...data.user, token: data.token }), 1200);
      } else { setError(data.error || "Signup failed."); }
    } catch {
      setSuccess("Account created! Signing you in...");
      setTimeout(() => onLogin({ id:Date.now(), email:signupForm.email, firstName:signupForm.firstName, lastName:signupForm.lastName, token:"dev" }), 1200);
    }
    setLoading(false);
  };

  const eyeBtn = (
    <div onClick={() => setShowPass(v => !v)}>
      <Ico path={showPass ? I.eyeoff : I.eye} size={15} color="#b8c9be" />
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", display:"flex", fontFamily:"'Nunito',sans-serif", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#f7f3ee; }
        input::placeholder { color:#c8d5cc !important; }
        @keyframes ah-float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes ah-float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
        @keyframes ah-rise { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ah-slide { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
        @keyframes ah-spin  { to{transform:rotate(360deg)} }
        @keyframes ah-shimmer { from{background-position:-200% center} to{background-position:200% center} }
        .ah-submit:hover:not(:disabled) { transform:translateY(-2px)!important; box-shadow:0 14px 40px rgba(122,158,142,0.38)!important; }
        .ah-submit:active:not(:disabled) { transform:translateY(0)!important; }
        .ah-feature:hover { background:rgba(255,255,255,0.5)!important; }
        @media(max-width:768px){ .ah-left{display:none!important} .ah-right{width:100%!important;padding:32px 24px!important} }
      `}</style>

      {/* ── LEFT — Brand panel ── */}
      <div className="ah-left" style={{ width:"52%", position:"relative", overflow:"hidden",
        background:"linear-gradient(150deg, #e8f0eb 0%, #dde8e2 40%, #d4e0da 100%)" }}>

        {/* Floating blobs */}
        {[
          { top:"6%",  left:"4%",  w:360, h:360, c:"rgba(122,158,142,0.18)", a:"ah-float1 10s ease-in-out infinite" },
          { top:"52%", right:"3%", w:300, h:300, c:"rgba(196,137,107,0.12)", a:"ah-float2 12s ease-in-out infinite" },
          { bottom:"8%",left:"18%",w:240, h:240, c:"rgba(122,158,142,0.12)", a:"ah-float1 8s ease-in-out infinite reverse" },
        ].map((b,i) => (
          <div key={i} style={{ position:"absolute", top:b.top, left:b.left, right:b.right, bottom:b.bottom, width:b.w, height:b.h,
            background:`radial-gradient(circle,${b.c},transparent 70%)`, borderRadius:"50%", filter:"blur(40px)", animation:b.a, pointerEvents:"none" }} />
        ))}

        <div style={{ position:"relative", zIndex:1, height:"100%", display:"flex", flexDirection:"column", padding:"52px 56px", justifyContent:"space-between" }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:"14px", animation:"ah-slide 0.6s ease both" }}>
            <AirHubLogo size={46} />
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"27px", fontWeight:"700", color:"#3d4a3e", letterSpacing:"-0.02em", lineHeight:1 }}>AirHub</div>
              <div style={{ fontSize:"9px", color:"#7a9e8e", fontWeight:"800", letterSpacing:"0.22em", marginTop:"3px" }}>HOTELS &amp; RESORTS</div>
            </div>
          </div>

          {/* Main copy */}
          <div style={{ animation:"ah-rise 0.7s 0.2s ease both" }}>
            <div style={{ fontSize:"11px", fontWeight:"700", letterSpacing:"0.18em", textTransform:"uppercase", color:"#7a9e8e", marginBottom:"18px" }}>
              ✦ Premium Guest Experience
            </div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"46px", fontWeight:"700", color:"#3d4a3e", lineHeight:1.18, marginBottom:"18px" }}>
              Your stay,<br />
              <span style={{ background:"linear-gradient(90deg,#7a9e8e,#c4896b,#7a9e8e)", backgroundSize:"200% auto",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"ah-shimmer 4s linear infinite" }}>
                curated.
              </span>
            </h2>
            <p style={{ fontSize:"15px", color:"#6d7f70", lineHeight:1.75, maxWidth:"380px" }}>
              Join thousands of travellers who trust AirHub for seamless hotel bookings, exclusive loyalty rewards, and personalised stays.
            </p>

            {/* Feature list */}
            <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginTop:"36px" }}>
              {[
                "Instant booking confirmation across 10,000+ hotels",
                "Earn & redeem loyalty points on every stay",
                "Exclusive member rates — up to 30% off",
              ].map((f,i) => (
                <div key={i} className="ah-feature" style={{ display:"flex", alignItems:"center", gap:"12px",
                  padding:"12px 16px", background:"rgba(255,255,255,0.35)", borderRadius:"12px",
                  border:"1px solid rgba(255,255,255,0.55)", transition:"all 0.2s", backdropFilter:"blur(8px)" }}>
                  <div style={{ width:"22px", height:"22px", background:"rgba(122,158,142,0.18)", borderRadius:"6px",
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Ico path={I.check} size={12} color="#7a9e8e" sw={2.5} />
                  </div>
                  <span style={{ fontSize:"13px", color:"#5a6e5c" }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Mini stats */}
            <div style={{ display:"flex", gap:"24px", marginTop:"36px" }}>
              {[["10K+","Hotels"],["4.8★","Rating"],["2M+","Guests"]].map(([v,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"26px", fontWeight:"700", color:"#3d4a3e" }}>{v}</div>
                  <div style={{ fontSize:"11px", color:"#8fa396", fontWeight:"600", textTransform:"uppercase", letterSpacing:"0.08em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize:"12px", color:"#a8b9ab", animation:"ah-rise 0.7s 0.4s ease both" }}>
            © {new Date().getFullYear()} AirHub Hotels. All rights reserved.
          </div>
        </div>
      </div>

      {/* ── RIGHT — Form ── */}
      <div className="ah-right" style={{ width:"48%", background:"#f7f3ee",
        display:"flex", alignItems:"center", justifyContent:"center", padding:"52px 64px", overflowY:"auto" }}>
        <div style={{ width:"100%", maxWidth:"400px", animation:"ah-rise 0.6s 0.1s ease both" }}>

          {/* Mode tabs */}
          <div style={{ display:"flex", background:"rgba(255,255,255,0.6)", border:"1.5px solid rgba(122,158,142,0.18)",
            borderRadius:"14px", padding:"4px", marginBottom:"34px", backdropFilter:"blur(8px)" }}>
            {["login","signup"].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); setSuccess(""); }}
                style={{ flex:1, padding:"10px", borderRadius:"11px", border:"none", cursor:"pointer",
                  fontFamily:"'Nunito',sans-serif", fontSize:"14px", fontWeight:"700", transition:"all 0.2s",
                  background: mode===m ? "rgba(255,255,255,0.95)" : "transparent",
                  color: mode===m ? "#7a9e8e" : "#a8b9ab",
                  boxShadow: mode===m ? "0 2px 10px rgba(0,0,0,0.07)" : "none" }}>
                {m==="login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div style={{ marginBottom:"28px" }}>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"34px", fontWeight:"700",
              color:"#3d4a3e", letterSpacing:"-0.01em", marginBottom:"8px" }}>
              {mode==="login" ? "Welcome back" : "Join AirHub"}
            </h1>
            <p style={{ fontSize:"14px", color:"#8fa396", lineHeight:1.6 }}>
              {mode==="login"
                ? "Sign in to access your guest profile and bookings."
                : "Create your account for personalised hotel experiences."}
            </p>
          </div>

          {/* Login form */}
          {mode==="login" && (
            <>
              <AuthInput label="Email Address" type="email" value={loginForm.email} onChange={updL("email")} placeholder="you@example.com" icon={I.mail} />
              <AuthInput label="Password" type={showPass?"text":"password"} value={loginForm.password} onChange={updL("password")} placeholder="Your password" icon={I.lock} rightEl={eyeBtn} />
            </>
          )}

          {/* Signup form */}
          {mode==="signup" && (
            <>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
                <AuthInput label="First Name" value={signupForm.firstName} onChange={updS("firstName")} placeholder="John" icon={I.user} />
                <AuthInput label="Last Name"  value={signupForm.lastName}  onChange={updS("lastName")}  placeholder="Smith" />
              </div>
              <AuthInput label="Email Address" type="email"  value={signupForm.email}   onChange={updS("email")}   placeholder="you@example.com"  icon={I.mail}  />
              <AuthInput label="Phone (optional)" type="tel" value={signupForm.phone}   onChange={updS("phone")}   placeholder="+91 98765 43210"  icon={I.phone} />
              <AuthInput label="Password"  type={showPass?"text":"password"} value={signupForm.password} onChange={updS("password")} placeholder="Min 6 characters" icon={I.lock} rightEl={eyeBtn} />
              <AuthInput label="Confirm Password" type={showPass?"text":"password"} value={signupForm.confirm} onChange={updS("confirm")} placeholder="Repeat password" icon={I.lock} />
            </>
          )}

          {/* Error / Success */}
          {error && (
            <div style={{ background:"rgba(196,100,80,0.08)", border:"1px solid rgba(196,100,80,0.2)", borderRadius:"12px",
              padding:"12px 16px", marginBottom:"16px", fontSize:"13px", color:"#c46450", display:"flex", gap:"8px", alignItems:"center" }}>
              <span>⚠</span>{error}
            </div>
          )}
          {success && (
            <div style={{ background:"rgba(122,158,142,0.1)", border:"1px solid rgba(122,158,142,0.3)", borderRadius:"12px",
              padding:"12px 16px", marginBottom:"16px", fontSize:"13px", color:"#5a8a7a", display:"flex", gap:"8px", alignItems:"center" }}>
              <Ico path={I.check} size={14} color="#5a8a7a" sw={2.5} />{success}
            </div>
          )}

          {/* Submit */}
          <button className="ah-submit" onClick={mode==="login" ? handleLogin : handleSignup} disabled={loading}
            style={{ width:"100%", padding:"14px 24px", borderRadius:"14px", border:"none",
              cursor:loading?"not-allowed":"pointer", fontFamily:"'Nunito',sans-serif",
              fontSize:"15px", fontWeight:"800", letterSpacing:"0.02em", transition:"all 0.25s",
              background: loading ? "rgba(122,158,142,0.3)" : "linear-gradient(135deg,#7a9e8e,#9abcac)",
              color: loading ? "#a8c0b8" : "white",
              boxShadow: loading ? "none" : "0 6px 24px rgba(122,158,142,0.32)",
              display:"flex", alignItems:"center", justifyContent:"center", gap:"10px" }}>
            {loading
              ? <><div style={{ width:"15px", height:"15px", border:"2px solid rgba(255,255,255,0.3)", borderTop:"2px solid white", borderRadius:"50%", animation:"ah-spin 0.8s linear infinite" }} />Processing...</>
              : <>{mode==="login" ? "Sign In" : "Create Account"}<Ico path={I.arrow} size={16} color="white" sw={2} /></>}
          </button>

          {/* Switch */}
          <p style={{ textAlign:"center", fontSize:"13px", color:"#a8b9ab", marginTop:"22px" }}>
            {mode==="login" ? "No account? " : "Already a member? "}
            <span onClick={() => { setMode(mode==="login"?"signup":"login"); setError(""); setSuccess(""); }}
              style={{ color:"#7a9e8e", fontWeight:"800", cursor:"pointer" }}>
              {mode==="login" ? "Create one" : "Sign in"}
            </span>
          </p>

          {/* Demo note */}
          <div style={{ marginTop:"26px", padding:"14px 16px", background:"rgba(122,158,142,0.07)",
            border:"1px solid rgba(122,158,142,0.18)", borderRadius:"12px" }}>
            <p style={{ fontSize:"12px", color:"#8fa396", lineHeight:1.6 }}>
              <span style={{ color:"#7a9e8e", fontWeight:"700" }}>Demo mode:</span> Works without the backend — enter any email and password to explore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}