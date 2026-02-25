import { useState, useMemo, useEffect, useRef } from "react";

/* ════════════════════════════════════
   ICONS
════════════════════════════════════ */
const Ico = ({ path, size=18, color="currentColor", sw=1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {path.split("||").map((p,i) => <path key={i} d={p.trim()} />)}
  </svg>
);

const I = {
  user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2||M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  phone:    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16v.92z",
  idcard:   "M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z||M7 13h4||M7 10h2||M15 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  bed:      "M2 4v16||M2 8h18a2 2 0 0 1 2 2v10||M2 17h20||M6 8v9",
  card:     "M1 10h22||M1 6a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6z||M5 15h2||M9 15h6",
  trophy:   "M8 21h8||M12 17v4||M7 4H4a2 2 0 0 0-2 2v2c0 3.31 2.69 6 6 6h8c3.31 0 6-2.69 6-6V6a2 2 0 0 0-2-2h-3||M7 4h10v6a5 5 0 0 1-10 0V4z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z||M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  history:  "M12 8v4l3 3||M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5",
  hotel:    "M3 22V3h18v19||M9 22V12h6v10||M9 7h1||M14 7h1||M9 3v4||M14 3v4",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  lock:     "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z||M7 11V7a5 5 0 0 1 10 0v4",
  check:    "M20 6L9 17l-5-5",
  plane:    "M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z",
  map:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z||M12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  bell:     "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9||M13.73 21a2 2 0 0 1-3.46 0",
  globe:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z||M2 12h20||M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  save:     "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z||M17 21v-8H7v8||M7 3v5h8",
  logout:   "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4||M16 17l5-5-5-5||M21 12H9",
  edit:     "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7||M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  calendar: "M3 4h18v18H3z||M16 2v4||M8 2v4||M3 10h18",
  clock:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z||M12 6v6l4 2",
  chevR:    "M9 18l6-6-6-6",
  chevL:    "M15 18l-6-6 6-6",
  info:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z||M12 8h.01||M12 12v4",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z||M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  night:    "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  wifi:     "M5 12.55a11 11 0 0 1 14.08 0||M1.42 9a16 16 0 0 1 21.16 0||M8.53 16.11a6 6 0 0 1 6.95 0||M12 20h.01",
};

/* ════════════════════════════════════
   PALETTE (pastel refined)
   Base bg:   #f7f3ee  warm ivory
   Cards:     rgba(255,255,255,0.72) glass
   Primary:   #7a9e8e  dusty sage
   Accent:    #c4896b  muted terracotta
   Text:      #3d4a3e  deep slate-green
   Muted:     #8fa396
   Border:    rgba(122,158,142,0.22)
════════════════════════════════════ */

/* ── AirHub Logo Component ── */
function AirHubLogo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ahGradProf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9fc5b5"/>
          <stop offset="55%" stopColor="#7a9e8e"/>
          <stop offset="100%" stopColor="#c07c5e"/>
        </linearGradient>
      </defs>
      {/* Outer ivory ring */}
      <circle cx="32" cy="32" r="31" fill="#edf4f0"/>
      {/* Gradient badge */}
      <circle cx="32" cy="32" r="27" fill={`url(#ahGradProf)`}/>
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

function Section({ title, iconKey, children }) {
  return (
    <div style={{ background:"rgba(255,255,255,0.72)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
      border:"1.5px solid rgba(255,255,255,0.9)", borderRadius:"22px", padding:"28px 32px", marginBottom:"18px",
      position:"relative", overflow:"hidden", boxShadow:"0 4px 28px rgba(122,158,142,0.08), inset 0 1px 0 rgba(255,255,255,0.8)" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px",
        background:"linear-gradient(90deg,transparent,rgba(122,158,142,0.35),transparent)" }} />
      <div style={{ position:"absolute", top:"-24px", right:"-24px", width:"100px", height:"100px",
        background:"radial-gradient(circle,rgba(122,158,142,0.1),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"22px", position:"relative" }}>
        <div style={{ width:"38px", height:"38px", background:"linear-gradient(135deg,rgba(122,158,142,0.18),rgba(122,158,142,0.08))",
          borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center",
          border:"1px solid rgba(122,158,142,0.2)", flexShrink:0 }}>
          <Ico path={I[iconKey]} size={17} color="#7a9e8e" />
        </div>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"19px", fontWeight:"600", color:"#3d4a3e", margin:0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({ label, type="text", value, onChange, placeholder, options, required, span }) {
  const [focused, setFocused] = useState(false);
  const base = {
    width:"100%", padding:"11px 14px",
    background: focused ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.58)",
    border: focused ? "1.5px solid rgba(122,158,142,0.5)" : "1.5px solid rgba(122,158,142,0.2)",
    borderRadius:"11px", color:"#3d4a3e", fontSize:"14px", outline:"none",
    fontFamily:"'Nunito',sans-serif", transition:"all 0.22s",
    boxShadow: focused ? "0 0 0 3px rgba(122,158,142,0.1)" : "none",
    appearance:"none", WebkitAppearance:"none"
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"6px", gridColumn: span?"span 2":undefined }}>
      <label style={{ fontSize:"10px", fontWeight:"700", letterSpacing:"0.1em", textTransform:"uppercase", color:"#8fa396", fontFamily:"'Nunito',sans-serif" }}>
        {label}{required && <span style={{ color:"#c4896b", marginLeft:"4px" }}>✦</span>}
      </label>
      {options
        ? <select value={value} onChange={onChange} style={{ ...base, cursor:"pointer" }} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}>
            <option value="">Select {label}</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        : <input className="ah-inp" type={type} value={value} onChange={onChange}
            placeholder={placeholder||label} style={base} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} />}
    </div>
  );
}

function Grid({ cols=2, children }) {
  return <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap:"16px" }}>{children}</div>;
}

function Spinner() {
  return <div style={{ width:"15px", height:"15px", border:"2px solid rgba(122,158,142,0.25)", borderTop:"2px solid #7a9e8e", borderRadius:"50%", animation:"ah-spin 0.8s linear infinite", flexShrink:0 }} />;
}

function useCompleteness(form) {
  return useMemo(() => {
    const fields = [
      form.personal.firstName, form.personal.lastName, form.personal.dob, form.personal.gender, form.personal.nationality,
      form.contact.email, form.contact.mobile, form.contact.city, form.contact.country,
      form.identification.idType, form.identification.idNumber,
      form.booking.roomType, form.booking.bedPreference,
      form.payment.paymentMethod, form.loyalty.loyaltyTier,
      form.account.username, form.account.language
    ];
    return Math.round(fields.filter(v=>v&&v.trim()!=="").length / fields.length * 100);
  }, [form]);
}

/* ════════════════════════════════════
   GUEST CARD
════════════════════════════════════ */
function GuestCard({ form, userId, amenities }) {
  const tier = form.loyalty.loyaltyTier || "Silver";
  const palettes = {
    Silver:   { bg:"linear-gradient(135deg,#c8d4ce,#e0e8e4)", text:"#3d4a3e", sub:"rgba(61,74,62,0.6)" },
    Gold:     { bg:"linear-gradient(135deg,#d4a87a,#e8c49a)", text:"#3a2a10", sub:"rgba(58,42,16,0.6)" },
    Platinum: { bg:"linear-gradient(135deg,#8fa8b8,#b4c8d4)", text:"#1a2a38", sub:"rgba(26,42,56,0.6)" },
  };
  const p = palettes[tier] || palettes.Silver;
  const fullName = `${form.personal.firstName} ${form.personal.lastName}`.trim();
  const initials = ((form.personal.firstName[0]||"")+(form.personal.lastName[0]||"")).toUpperCase();

  return (
    <div style={{ marginBottom:"24px", animation:"ah-rise 0.5s ease both" }}>
      <p style={{ fontSize:"10px", fontWeight:"700", letterSpacing:"0.12em", textTransform:"uppercase", color:"#8fa396", marginBottom:"12px" }}>✦ Your AirHub Guest Card</p>
      <div style={{ position:"relative", borderRadius:"20px", overflow:"hidden", padding:"26px 26px 22px", background:p.bg, boxShadow:"0 16px 48px rgba(0,0,0,0.15)", maxWidth:"400px" }}>
        <div style={{ position:"absolute", top:"-24px", right:"-24px", width:"120px", height:"120px", background:"rgba(255,255,255,0.18)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", bottom:"-20px", right:"50px",  width:"80px",  height:"80px",  background:"rgba(255,255,255,0.1)",  borderRadius:"50%" }} />
        <div style={{ position:"absolute", top:"18px", right:"22px", opacity:0.35 }}>
          <Ico path={I.wifi} size={20} color={p.text} />
        </div>
        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"22px" }}>
            <div>
              <div style={{ fontSize:"10px", fontWeight:"700", letterSpacing:"0.14em", textTransform:"uppercase", color:p.sub, marginBottom:"2px" }}>AirHub Hotels</div>
              <div style={{ fontSize:"12px", fontWeight:"700", color:p.sub, letterSpacing:"0.06em" }}>{tier} Member</div>
            </div>
            <div style={{ width:"40px", height:"40px", background:`${p.text}18`, borderRadius:"11px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px", fontWeight:"800", color:p.text }}>
              {initials||"?"}
            </div>
          </div>
          <div style={{ fontFamily:"'Courier New',monospace", fontSize:"15px", letterSpacing:"0.22em", color:p.text, marginBottom:"18px", fontWeight:"700" }}>
            AIR — {String(userId||"0000").padStart(4,"0")}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
            <div>
              <div style={{ fontSize:"9px", color:p.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"3px" }}>Cardholder</div>
              <div style={{ fontSize:"14px", fontWeight:"700", color:p.text, fontFamily:"'Cormorant Garamond',serif" }}>{fullName||"Guest Member"}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:"9px", color:p.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"3px" }}>Room</div>
              <div style={{ fontSize:"12px", fontWeight:"700", color:p.text }}>{form.booking.roomType||"Standard"}</div>
            </div>
          </div>
          {amenities.length > 0 && (
            <div style={{ marginTop:"14px", paddingTop:"14px", borderTop:`1px solid ${p.text}20`, display:"flex", gap:"6px", flexWrap:"wrap" }}>
              {amenities.slice(0,4).map(a => (
                <span key={a} style={{ fontSize:"10px", fontWeight:"700", color:p.text, background:`${p.text}15`, padding:"3px 8px", borderRadius:"20px" }}>{a}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   PROFILE VIEW PANEL
════════════════════════════════════ */
function ProfileViewPanel({ form, user, amenities, userId, onClose, onEdit }) {
  const fullName = `${form.personal.firstName||user.firstName||""} ${form.personal.lastName||user.lastName||""}`.trim();
  const initials = ((form.personal.firstName||user.firstName||"")[0]||(""+(form.personal.lastName||user.lastName||"")[0]||"")).toUpperCase();
  const pct = useCompleteness(form);

  const rows = [
    { label:"Full Name",       value: fullName },
    { label:"Email",           value: form.contact.email||user.email },
    { label:"Mobile",          value: form.contact.mobile },
    { label:"Date of Birth",   value: form.personal.dob },
    { label:"Nationality",     value: form.personal.nationality },
    { label:"Country",         value: form.contact.country },
    { label:"City",            value: form.contact.city },
    { label:"ID Type",         value: form.identification.idType },
    { label:"Room Preference", value: form.booking.roomType },
    { label:"Bed Preference",  value: form.booking.bedPreference },
    { label:"Payment Method",  value: form.payment.paymentMethod },
    { label:"Loyalty Tier",    value: form.loyalty.loyaltyTier },
    { label:"Language",        value: form.account.language },
    { label:"Currency",        value: form.account.currency },
  ].filter(r => r.value);

  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(61,74,62,0.35)", zIndex:500, backdropFilter:"blur(6px)", animation:"ah-fadein 0.2s ease" }} />
      <div style={{ position:"fixed", right:0, top:0, bottom:0, width:"400px", background:"#f7f3ee", borderLeft:"1.5px solid rgba(122,158,142,0.2)", zIndex:501, overflowY:"auto", animation:"ah-slidein 0.3s ease", boxShadow:"-8px 0 48px rgba(0,0,0,0.1)" }}>
        <style>{`
          @keyframes ah-slidein { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
          @keyframes ah-fadein  { from{opacity:0} to{opacity:1} }
        `}</style>
        <div style={{ height:"3px", background:"linear-gradient(90deg,#7a9e8e,#c4896b,#7a9e8e)" }} />
        <div style={{ padding:"26px" }}>
          {/* Header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"22px" }}>
            <span style={{ fontSize:"10px", fontWeight:"700", letterSpacing:"0.14em", textTransform:"uppercase", color:"#7a9e8e" }}>Your Profile</span>
            <button onClick={onClose} style={{ background:"rgba(122,158,142,0.1)", border:"1px solid rgba(122,158,142,0.2)", borderRadius:"8px", color:"#8fa396", width:"30px", height:"30px", cursor:"pointer", fontSize:"16px", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>

          {/* Avatar */}
          <div style={{ textAlign:"center", marginBottom:"22px" }}>
            <div style={{ width:"68px", height:"68px", margin:"0 auto 10px", background:"linear-gradient(135deg,#7a9e8e,#9abcac)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px", fontWeight:"800", color:"white", border:"3px solid rgba(255,255,255,0.8)", boxShadow:"0 4px 20px rgba(122,158,142,0.3)" }}>
              {initials||"?"}
            </div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:"700", color:"#3d4a3e", marginBottom:"3px" }}>{fullName||"Guest User"}</div>
            <div style={{ fontSize:"12px", color:"#8fa396" }}>{form.contact.email||user.email}</div>
            {userId && <div style={{ fontSize:"11px", color:"#7a9e8e", fontWeight:"700", marginTop:"5px" }}>Guest ID: AIR-{String(userId).padStart(4,"0")}</div>}
          </div>

          {/* Progress */}
          <div style={{ background:"rgba(255,255,255,0.7)", borderRadius:"14px", padding:"14px 16px", marginBottom:"18px", border:"1px solid rgba(122,158,142,0.15)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
              <span style={{ fontSize:"11px", color:"#8fa396", fontWeight:"600" }}>Profile Completeness</span>
              <span style={{ fontSize:"12px", color:"#7a9e8e", fontWeight:"700" }}>{pct}%</span>
            </div>
            <div style={{ height:"6px", background:"rgba(122,158,142,0.12)", borderRadius:"3px", overflow:"hidden" }}>
              <div style={{ width:`${pct}%`, height:"100%", background:"linear-gradient(90deg,#7a9e8e,#c4896b)", borderRadius:"3px", transition:"width 0.6s" }} />
            </div>
          </div>

          {/* Guest card */}
          {userId && <GuestCard form={form} userId={userId} amenities={amenities} />}

          {/* Details table */}
          <div style={{ marginBottom:"16px" }}>
            <div style={{ fontSize:"10px", fontWeight:"700", letterSpacing:"0.1em", textTransform:"uppercase", color:"#8fa396", marginBottom:"10px" }}>Profile Details</div>
            <div style={{ borderRadius:"14px", overflow:"hidden", border:"1.5px solid rgba(122,158,142,0.15)" }}>
              {rows.map((r,i) => (
                <div key={r.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px", background:i%2===0?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.3)" }}>
                  <span style={{ fontSize:"12px", color:"#8fa396", fontWeight:"600" }}>{r.label}</span>
                  <span style={{ fontSize:"13px", color:"#3d4a3e", fontWeight:"600", maxWidth:"55%", textAlign:"right" }}>{r.value}</span>
                </div>
              ))}
              {rows.length===0 && (
                <div style={{ padding:"20px", textAlign:"center", color:"#8fa396", fontSize:"13px" }}>No profile data yet. Fill in your details and save.</div>
              )}
            </div>
          </div>

          {/* Amenities */}
          {amenities.length>0 && (
            <div style={{ marginBottom:"18px" }}>
              <div style={{ fontSize:"10px", fontWeight:"700", letterSpacing:"0.1em", textTransform:"uppercase", color:"#8fa396", marginBottom:"9px" }}>Amenity Preferences</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                {amenities.map(a => (
                  <span key={a} style={{ fontSize:"12px", color:"#7a9e8e", background:"rgba(122,158,142,0.1)", border:"1px solid rgba(122,158,142,0.25)", padding:"4px 12px", borderRadius:"20px", fontWeight:"600" }}>{a}</span>
                ))}
              </div>
            </div>
          )}

          <button onClick={() => { onEdit(); onClose(); }} style={{ width:"100%", padding:"13px", borderRadius:"13px", border:"none", background:"linear-gradient(135deg,#7a9e8e,#9abcac)", color:"white", fontFamily:"'Nunito',sans-serif", fontSize:"14px", fontWeight:"700", cursor:"pointer", boxShadow:"0 4px 18px rgba(122,158,142,0.3)", transition:"all 0.2s" }}>
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════
   ACTIVITY PAGE
════════════════════════════════════ */
function ActivityPage({ form, upd }) {
  const [subTab, setSubTab] = useState("upcoming");
  const nights = useMemo(() => {
    if (!form.activity.checkIn||!form.activity.checkOut) return 0;
    const d = (new Date(form.activity.checkOut)-new Date(form.activity.checkIn))/86400000;
    return d>0?Math.round(d):0;
  }, [form.activity.checkIn, form.activity.checkOut]);

  return (
    <div className="ah-section">
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px", marginBottom:"20px" }}>
        {[
          {label:"Nights",   value:"0", icon:"night", bg:"rgba(122,158,142,0.1)"},
          {label:"Hotels",   value:"0", icon:"hotel", bg:"rgba(196,137,107,0.1)"},
          {label:"Countries",value:"0", icon:"globe", bg:"rgba(122,158,142,0.08)"},
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, borderRadius:"16px", padding:"16px 12px", textAlign:"center", border:"1.5px solid rgba(255,255,255,0.8)" }}>
            <div style={{ width:"32px", height:"32px", margin:"0 auto 8px", background:"rgba(255,255,255,0.7)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Ico path={I[s.icon]} size={16} color="#7a9e8e" />
            </div>
            <div style={{ fontSize:"22px", fontWeight:"800", color:"#3d4a3e", fontFamily:"'Cormorant Garamond',serif" }}>{s.value}</div>
            <div style={{ fontSize:"10px", color:"#8fa396", textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:"700", marginTop:"2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Sub tabs */}
      <div style={{ display:"flex", gap:"6px", marginBottom:"18px", background:"rgba(255,255,255,0.5)", borderRadius:"14px", padding:"4px", border:"1px solid rgba(122,158,142,0.15)" }}>
        {[["upcoming","Upcoming"],["past","Past Stays"],["cancelled","Cancellations"]].map(([id,label]) => (
          <button key={id} onClick={()=>setSubTab(id)} style={{ flex:1, padding:"9px", borderRadius:"11px", border:"none", cursor:"pointer", fontFamily:"'Nunito',sans-serif", fontSize:"13px", fontWeight:"700", transition:"all 0.2s",
            background:subTab===id?"rgba(255,255,255,0.95)":"transparent",
            color:subTab===id?"#7a9e8e":"#8fa396",
            boxShadow:subTab===id?"0 2px 10px rgba(0,0,0,0.06)":"none" }}>{label}</button>
        ))}
      </div>

      {subTab==="upcoming" && (
        <>
          <Section title="Add Upcoming Booking" iconKey="calendar">
            <Grid cols={2}>
              <Field label="Hotel Name"    value={form.activity.hotelName||""}     onChange={upd("activity","hotelName")}     placeholder="AirHub Grand" />
              <Field label="Location"      value={form.activity.location||""}      onChange={upd("activity","location")}      placeholder="Chennai, India" />
              <Field label="Check-In"      type="date" value={form.activity.checkIn||""}  onChange={upd("activity","checkIn")} />
              <Field label="Check-Out"     type="date" value={form.activity.checkOut||""} onChange={upd("activity","checkOut")} />
              <Field label="Status"        value={form.activity.bookingStatus||""} onChange={upd("activity","bookingStatus")} options={["Confirmed","Pending","Awaiting Payment","On Request"]} />
              <Field label="Confirmation No." value={form.activity.confirmationNo||""} onChange={upd("activity","confirmationNo")} placeholder="AIR-2024-7823" />
            </Grid>
            {form.activity.hotelName && (
              <div style={{ marginTop:"16px", background:"linear-gradient(135deg,rgba(122,158,142,0.1),rgba(196,137,107,0.08))", border:"1.5px solid rgba(122,158,142,0.2)", borderRadius:"16px", padding:"18px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                  <div style={{ width:"44px", height:"44px", background:"linear-gradient(135deg,#7a9e8e,#9abcac)", borderRadius:"13px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Ico path={I.hotel} size={20} color="white" />
                  </div>
                  <div>
                    <div style={{ fontWeight:"700", fontSize:"15px", color:"#3d4a3e", fontFamily:"'Cormorant Garamond',serif" }}>{form.activity.hotelName}</div>
                    <div style={{ fontSize:"12px", color:"#8fa396" }}>{form.activity.location||"Location not set"}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:"18px", flexWrap:"wrap" }}>
                  {form.activity.checkIn && (
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontSize:"9px", color:"#8fa396", textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:"700" }}>Check-in</div>
                      <div style={{ fontSize:"13px", fontWeight:"700", color:"#3d4a3e" }}>{new Date(form.activity.checkIn).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div>
                    </div>
                  )}
                  {nights>0 && (
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontSize:"9px", color:"#8fa396", textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:"700" }}>Nights</div>
                      <div style={{ fontSize:"24px", fontWeight:"800", color:"#7a9e8e", fontFamily:"'Cormorant Garamond',serif" }}>{nights}</div>
                    </div>
                  )}
                  {form.activity.checkOut && (
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontSize:"9px", color:"#8fa396", textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:"700" }}>Check-out</div>
                      <div style={{ fontSize:"13px", fontWeight:"700", color:"#3d4a3e" }}>{new Date(form.activity.checkOut).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div>
                    </div>
                  )}
                </div>
                <div style={{ background:"rgba(122,170,136,0.12)", border:"1px solid rgba(106,170,136,0.3)", borderRadius:"20px", padding:"5px 14px", fontSize:"12px", fontWeight:"700", color:"#5a9a7a" }}>
                  {form.activity.bookingStatus||"Confirmed"}
                </div>
              </div>
            )}
            {!form.activity.hotelName && (
              <div style={{ textAlign:"center", padding:"28px 20px", background:"rgba(122,158,142,0.04)", borderRadius:"12px", border:"1.5px dashed rgba(122,158,142,0.2)", marginTop:"14px" }}>
                <div style={{ fontSize:"36px", marginBottom:"8px" }}>🏨</div>
                <div style={{ fontSize:"13px", color:"#8fa396" }}>Fill in the details above to preview your booking</div>
              </div>
            )}
          </Section>
        </>
      )}
      {subTab==="past" && (
        <div style={{ textAlign:"center", padding:"48px 20px", background:"rgba(255,255,255,0.5)", borderRadius:"18px", border:"1.5px dashed rgba(122,158,142,0.25)" }}>
          <div style={{ width:"60px", height:"60px", margin:"0 auto 14px", background:"rgba(122,158,142,0.1)", borderRadius:"16px", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Ico path={I.clock} size={28} color="#8fa396" />
          </div>
          <div style={{ fontSize:"17px", fontWeight:"700", color:"#6d7f70", marginBottom:"6px", fontFamily:"'Cormorant Garamond',serif" }}>No past stays yet</div>
          <div style={{ fontSize:"13px", color:"#8fa396" }}>Completed bookings will appear here.</div>
        </div>
      )}
      {subTab==="cancelled" && (
        <div style={{ textAlign:"center", padding:"48px 20px", background:"rgba(255,255,255,0.5)", borderRadius:"18px", border:"1.5px dashed rgba(122,158,142,0.25)" }}>
          <div style={{ width:"60px", height:"60px", margin:"0 auto 14px", background:"rgba(122,158,142,0.1)", borderRadius:"16px", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Ico path={I.check} size={28} color="#7a9e8e" sw={2.5} />
          </div>
          <div style={{ fontSize:"17px", fontWeight:"700", color:"#6d7f70", marginBottom:"6px", fontFamily:"'Cormorant Garamond',serif" }}>Clean record</div>
          <div style={{ fontSize:"13px", color:"#8fa396" }}>No cancellations on file — great!</div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════
   MAIN
════════════════════════════════════ */
const TAB_ORDER = ["personal","contact","identification","booking","payment","loyalty","account","activity"];

export default function ProfilePage({ user, onLogout }) {
  const [activeTab,        setActiveTab]        = useState("personal");
  const [saved,            setSaved]            = useState(false);
  const [loading,          setLoading]          = useState(false);
  const [userId,           setUserId]           = useState(user.id||null);
  const [error,            setError]            = useState("");
  const [amenities,        setAmenities]        = useState([]);
  const [serverOnline,     setServerOnline]     = useState(null);
  const [showDrop,         setShowDrop]         = useState(false);
  const [showPanel,        setShowPanel]        = useState(false);
  const [profileSaved,     setProfileSaved]     = useState(false);
  const dropRef = useRef(null);

  const [form, setForm] = useState({
    personal:       { firstName:user.firstName||"", lastName:user.lastName||"", dob:"", gender:"", nationality:"" },
    contact:        { email:user.email||"", mobile:"", altPhone:"", address:"", city:"", state:"", country:"", postalCode:"" },
    identification: { idType:"", idNumber:"", idExpiry:"" },
    booking:        { roomType:"", bedPreference:"", smoking:"", floorView:"" },
    payment:        { cardNumber:"", billingAddress:"", paymentMethod:"" },
    loyalty:        { loyaltyTier:"", corporateAccount:"" },
    account:        { username:user.email?.split("@")[0]||"", password:"", notifications:"", language:"", currency:"" },
    activity:       { hotelName:"", location:"", checkIn:"", checkOut:"", bookingStatus:"", confirmationNo:"" }
  });

  const pct = useCompleteness(form);

  const initials = useMemo(() => {
    const f=(form.personal.firstName||user.firstName||"")[0]?.toUpperCase()||"";
    const l=(form.personal.lastName||user.lastName||"")[0]?.toUpperCase()||"";
    return f+l||"?";
  }, [form.personal.firstName,form.personal.lastName,user]);

  const fullName = [form.personal.firstName||user.firstName,form.personal.lastName||user.lastName].filter(Boolean).join(" ");

  useEffect(() => {
    const h = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setShowDrop(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    const check = async () => {
      try { const r=await fetch("http://localhost:5000/api/health",{signal:AbortSignal.timeout(3000)}); const d=await r.json(); setServerOnline(d.status==="OK"); }
      catch { setServerOnline(false); }
    };
    check(); const iv=setInterval(check,12000); return ()=>clearInterval(iv);
  }, []);

  const upd = (sec,fld) => e => setForm(p=>({...p,[sec]:{...p[sec],[fld]:e.target.value}}));

  const handleSubmit = async () => {
    setError("");
    if (!form.personal.firstName) { setError("First name is required."); return; }
    if (!form.contact.email)      { setError("Email address is required."); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/profile",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form,booking:{...form.booking,amenities},userId})
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true); setProfileSaved(true); setServerOnline(true);
        if (data.userId) setUserId(data.userId);
        setTimeout(()=>setSaved(false),5000);
      } else { setError("Server error: "+data.error); }
    } catch {
      setServerOnline(false);
      setError("Backend offline. Run node server.js to save to database.");
    }
    setLoading(false);
  };

  const tabs = [
    {id:"personal",       label:"Personal",    icon:"user"},
    {id:"contact",        label:"Contact",     icon:"phone"},
    {id:"identification", label:"ID Details",  icon:"idcard"},
    {id:"booking",        label:"Preferences", icon:"bed"},
    {id:"payment",        label:"Payment",     icon:"card"},
    {id:"loyalty",        label:"Loyalty",     icon:"trophy"},
    {id:"account",        label:"Account",     icon:"settings"},
    {id:"activity",       label:"Activity",    icon:"history"},
  ];

  const curIdx = TAB_ORDER.indexOf(activeTab);
  const goNext = () => curIdx<TAB_ORDER.length-1 && setActiveTab(TAB_ORDER[curIdx+1]);
  const goPrev = () => curIdx>0 && setActiveTab(TAB_ORDER[curIdx-1]);

  return (
    <div style={{ minHeight:"100vh", fontFamily:"'Nunito',sans-serif", background:"#f7f3ee", overflowX:"hidden", position:"relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { margin:0; background:#f7f3ee; }
        .ah-inp::placeholder { color:#c8d5cc!important; opacity:1; }
        select option { background:#f0ebe4; color:#3d4a3e; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:rgba(122,158,142,0.05); }
        ::-webkit-scrollbar-thumb { background:rgba(122,158,142,0.25); border-radius:3px; }
        @keyframes ah-fadeSlide { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ah-rise      { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ah-shimmer   { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes ah-spin      { to{transform:rotate(360deg)} }
        @keyframes ah-popIn     { from{opacity:0;transform:scale(0.94) translateY(-6px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes ah-float1    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes ah-float2    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }
        .ah-section  { animation:ah-fadeSlide 0.3s ease both; }
        .ah-tab:hover { background:rgba(122,158,142,0.1)!important; color:#7a9e8e!important; }
        .ah-save:hover:not(:disabled) { transform:translateY(-2px)!important; box-shadow:0 12px 36px rgba(122,158,142,0.38)!important; }
        .ah-save:active:not(:disabled) { transform:translateY(0)!important; }
        .ah-pill:hover { background:rgba(122,158,142,0.12)!important; border-color:rgba(122,158,142,0.4)!important; }
        .ah-nav-btn:hover { background:rgba(122,158,142,0.08)!important; color:#5a7a6a!important; }
        @media(max-width:900px){
          .ah-layout{grid-template-columns:1fr!important;padding:16px!important}
          .ah-sidebar{position:static!important}
          .ah-tabs-inner{display:flex!important;flex-wrap:wrap!important;gap:4px!important}
          .ah-tab{width:auto!important;flex:1 1 auto!important;min-width:80px!important;padding:8px!important;font-size:12px!important}
          .ah-hero{padding:24px 20px!important}
          .ah-nav{padding:0 16px!important}
        }
      `}</style>

      {/* Background blobs */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", background:"linear-gradient(140deg,#f7f3ee 0%,#eff5f1 35%,#f5ede6 70%,#f7f3ee 100%)" }} />
      {[
        {top:"6%",  left:"2%",  w:380, h:380, c:"rgba(122,158,142,0.14)", a:"ah-float1 10s ease-in-out infinite"},
        {top:"45%", right:"1%", w:320, h:320, c:"rgba(196,137,107,0.10)", a:"ah-float2 12s ease-in-out infinite"},
        {bottom:"5%",left:"20%",w:280, h:280, c:"rgba(122,158,142,0.09)", a:"ah-float1 9s ease-in-out infinite reverse"},
        {top:"25%", left:"40%", w:200, h:200, c:"rgba(196,137,107,0.07)", a:"ah-float2 7s ease-in-out infinite"},
      ].map((b,i)=>(
        <div key={i} style={{ position:"fixed", top:b.top,left:b.left,right:b.right,bottom:b.bottom, width:b.w,height:b.h, background:`radial-gradient(circle,${b.c},transparent 70%)`, borderRadius:"50%", filter:"blur(50px)", animation:b.a, zIndex:0, pointerEvents:"none" }} />
      ))}

      {/* ── NAV ── */}
      <nav className="ah-nav" style={{ position:"sticky", top:0, zIndex:200, background:"rgba(247,243,238,0.82)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderBottom:"1.5px solid rgba(122,158,142,0.14)", padding:"0 44px", display:"flex", alignItems:"center", justifyContent:"space-between", height:"66px", boxShadow:"0 2px 20px rgba(122,158,142,0.07)" }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <AirHubLogo size={40} />
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:"700", color:"#3d4a3e", letterSpacing:"-0.02em", lineHeight:1 }}>AirHub</div>
            <div style={{ fontSize:"8px", color:"#7a9e8e", fontWeight:"800", letterSpacing:"0.22em", marginTop:"2px" }}>HOTELS &amp; RESORTS</div>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          {/* Server dot only */}
          <div title={serverOnline===null?"Checking...":serverOnline?"Connected":"Offline"}
            style={{ width:"8px", height:"8px", borderRadius:"50%", cursor:"help", transition:"all 0.3s",
              background:serverOnline===null?"#c8d5cc":serverOnline?"#7a9e8e":"#c4896b",
              boxShadow:serverOnline?"0 0 7px rgba(122,158,142,0.6)":"none" }} />

          {/* Progress */}
          <div style={{ display:"flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.65)", border:"1px solid rgba(122,158,142,0.18)", borderRadius:"20px", padding:"5px 12px" }}>
            <div style={{ width:"26px", height:"4px", background:"rgba(122,158,142,0.15)", borderRadius:"2px", overflow:"hidden" }}>
              <div style={{ width:`${pct}%`, height:"100%", background:"linear-gradient(90deg,#7a9e8e,#c4896b)", borderRadius:"2px", transition:"width 0.5s" }} />
            </div>
            <span style={{ fontSize:"11px", color:"#8fa396", fontWeight:"700" }}>{pct}%</span>
          </div>

          {userId && <span style={{ fontSize:"11px", color:"#7a9e8e", background:"rgba(122,158,142,0.1)", border:"1px solid rgba(122,158,142,0.2)", padding:"4px 10px", borderRadius:"20px", fontWeight:"700" }}>Guest #{userId}</span>}

          {/* Avatar dropdown */}
          <div ref={dropRef} style={{ position:"relative" }}>
            <button onClick={()=>setShowDrop(v=>!v)}
              style={{ width:"38px", height:"38px", borderRadius:"50%", border:"2px solid rgba(122,158,142,0.35)", background:"linear-gradient(135deg,rgba(122,158,142,0.2),rgba(122,158,142,0.08))", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", fontWeight:"800", color:"#5a7a6a", fontFamily:"'Nunito',sans-serif", transition:"all 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(122,158,142,0.65)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(122,158,142,0.35)"}>
              {initials}
            </button>

            {showDrop && (
              <div style={{ position:"absolute", top:"calc(100% + 10px)", right:0, background:"rgba(247,243,238,0.97)", backdropFilter:"blur(20px)", border:"1.5px solid rgba(122,158,142,0.18)", borderRadius:"18px", padding:"6px", boxShadow:"0 12px 40px rgba(61,74,62,0.14)", minWidth:"220px", zIndex:999, animation:"ah-popIn 0.2s ease" }}>
                <div style={{ padding:"12px 14px 14px", borderBottom:"1px solid rgba(122,158,142,0.12)", marginBottom:"4px" }}>
                  <div style={{ fontWeight:"700", fontSize:"14px", color:"#3d4a3e" }}>{fullName||"Guest User"}</div>
                  <div style={{ fontSize:"12px", color:"#8fa396", marginTop:"2px" }}>{form.contact.email||user.email}</div>
                  {userId && <div style={{ fontSize:"11px", color:"#7a9e8e", marginTop:"4px", fontWeight:"700" }}>AIR-{String(userId).padStart(4,"0")}</div>}
                </div>
                {[
                  {label:"View Profile",    icon:"eye",      action:()=>{setShowPanel(true);setShowDrop(false);}},
                  {label:"Edit Profile",    icon:"edit",     action:()=>{setActiveTab("personal");setShowDrop(false);}},
                  {label:"Account Settings",icon:"settings", action:()=>{setActiveTab("account");setShowDrop(false);}},
                  {label:"Activity",        icon:"history",  action:()=>{setActiveTab("activity");setShowDrop(false);}},
                ].map(item=>(
                  <button key={item.label} onClick={item.action} className="ah-nav-btn"
                    style={{ display:"flex", alignItems:"center", gap:"10px", width:"100%", padding:"10px 12px", borderRadius:"11px", border:"none", background:"transparent", color:"#6d7f70", fontSize:"13px", fontWeight:"600", cursor:"pointer", fontFamily:"'Nunito',sans-serif", transition:"all 0.15s", textAlign:"left" }}>
                    <Ico path={I[item.icon]} size={14} color="#8fa396" />
                    {item.label}
                  </button>
                ))}
                <div style={{ borderTop:"1px solid rgba(122,158,142,0.12)", margin:"4px 0" }} />
                <button onClick={onLogout} className="ah-nav-btn"
                  style={{ display:"flex", alignItems:"center", gap:"10px", width:"100%", padding:"10px 12px", borderRadius:"11px", border:"none", background:"transparent", color:"#c4896b", fontSize:"13px", fontWeight:"600", cursor:"pointer", fontFamily:"'Nunito',sans-serif", transition:"all 0.15s", textAlign:"left" }}>
                  <Ico path={I.logout} size={14} color="#c4896b" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="ah-hero" style={{ position:"relative", zIndex:1, padding:"40px 44px 32px", borderBottom:"1.5px solid rgba(122,158,142,0.1)", background:"rgba(255,255,255,0.28)", backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)" }}>
        <div style={{ maxWidth:"1160px", margin:"0 auto" }}>
          <div style={{ fontSize:"10px", fontWeight:"700", letterSpacing:"0.18em", textTransform:"uppercase", color:"#7a9e8e", marginBottom:"10px" }}>✦ Guest Profile</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"38px", fontWeight:"700", color:"#3d4a3e", letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:"8px" }}>
            {form.personal.firstName ? `Welcome back, ${form.personal.firstName}.` : "Complete Your Profile"}
          </h1>
          <p style={{ color:"#8fa396", fontSize:"15px", maxWidth:"460px", lineHeight:1.65 }}>Personalise your stay preferences and unlock exclusive member benefits.</p>
          <div style={{ display:"flex", gap:"12px", marginTop:"24px", flexWrap:"wrap" }}>
            {[
              {label:"Loyalty Points", value:"0",                                 icon:"star",   active:false},
              {label:"Total Stays",    value:"0",                                 icon:"hotel",  active:false},
              {label:"Member Tier",    value:form.loyalty.loyaltyTier||"Silver",  icon:"trophy", active:true},
            ].map(s=>(
              <div key={s.label} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 16px", background:s.active?"rgba(122,158,142,0.1)":"rgba(255,255,255,0.55)", border:`1.5px solid ${s.active?"rgba(122,158,142,0.25)":"rgba(255,255,255,0.7)"}`, borderRadius:"14px", backdropFilter:"blur(8px)" }}>
                <Ico path={I[s.icon]} size={16} color={s.active?"#7a9e8e":"#b8c9be"} />
                <div>
                  <div style={{ fontSize:"15px", fontWeight:"700", color:s.active?"#5a7a6a":"#8fa396" }}>{s.value}</div>
                  <div style={{ fontSize:"10px", color:"#a8b9ab", textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:"600" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LAYOUT ── */}
      <div className="ah-layout" style={{ position:"relative", zIndex:1, display:"grid", gridTemplateColumns:"218px 1fr", gap:"24px", maxWidth:"1160px", margin:"0 auto", padding:"28px 44px 60px" }}>

        {/* Sidebar */}
        <aside className="ah-sidebar" style={{ position:"sticky", top:"82px", height:"fit-content" }}>
          <div style={{ background:"rgba(255,255,255,0.65)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:"1.5px solid rgba(255,255,255,0.88)", borderRadius:"20px", padding:"8px", boxShadow:"0 4px 22px rgba(122,158,142,0.1)" }}>
            <p style={{ fontSize:"9px", fontWeight:"700", letterSpacing:"0.14em", textTransform:"uppercase", color:"#b8c9be", padding:"10px 12px 6px" }}>Sections</p>
            <div className="ah-tabs-inner">
              {tabs.map(tab=>{
                const act=activeTab===tab.id;
                return (
                  <button key={tab.id} className="ah-tab" onClick={()=>setActiveTab(tab.id)} style={{ display:"flex", alignItems:"center", gap:"9px", width:"100%", padding:"10px 12px", borderRadius:"12px", border:"none", background:act?"rgba(255,255,255,0.95)":"transparent", color:act?"#5a7a6a":"#8fa396", fontSize:"13px", fontWeight:act?"700":"500", cursor:"pointer", transition:"all 0.2s", marginBottom:"2px", fontFamily:"'Nunito',sans-serif", textAlign:"left", boxShadow:act?"0 2px 10px rgba(122,158,142,0.12)":"none" }}>
                    <div style={{ width:"26px", height:"26px", background:act?"linear-gradient(135deg,rgba(122,158,142,0.18),rgba(122,158,142,0.06))":"transparent", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.2s" }}>
                      <Ico path={I[tab.icon]} size={14} color={act?"#7a9e8e":"#b8c9be"} />
                    </div>
                    {tab.label}
                    {act && <div style={{ marginLeft:"auto", width:"5px", height:"5px", borderRadius:"50%", background:"#7a9e8e" }} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Completeness card */}
          <div style={{ background:"rgba(255,255,255,0.65)", backdropFilter:"blur(20px)", border:"1.5px solid rgba(255,255,255,0.88)", borderRadius:"20px", padding:"18px", marginTop:"12px", boxShadow:"0 4px 22px rgba(122,158,142,0.08)" }}>
            <div style={{ fontSize:"9px", fontWeight:"700", letterSpacing:"0.14em", textTransform:"uppercase", color:"#b8c9be", marginBottom:"12px" }}>Profile Journey</div>
            <div style={{ height:"7px", background:"rgba(122,158,142,0.1)", borderRadius:"4px", overflow:"hidden", marginBottom:"9px" }}>
              <div style={{ width:`${pct}%`, height:"100%", background:"linear-gradient(90deg,#7a9e8e,#c4896b)", backgroundSize:"200% auto", animation:"ah-shimmer 3s linear infinite", borderRadius:"4px", transition:"width 0.6s" }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:"12px", color:"#7a9e8e", fontWeight:"700" }}>{pct}%</span>
              <span style={{ fontSize:"11px", color:"#b8c9be" }}>{pct<50?"Keep going":pct<90?"Almost there":"🎉 Done!"}</span>
            </div>
          </div>

          {/* Member badge */}
          <div style={{ marginTop:"12px", padding:"16px", background:"linear-gradient(135deg,rgba(122,158,142,0.12),rgba(196,137,107,0.08))", border:"1.5px solid rgba(255,255,255,0.8)", borderRadius:"20px", textAlign:"center", backdropFilter:"blur(12px)" }}>
            <Ico path={I.trophy} size={22} color="#7a9e8e" />
            <div style={{ fontSize:"12px", fontWeight:"700", color:"#5a7a6a", marginTop:"8px" }}>AirHub Member</div>
            <div style={{ fontSize:"11px", color:"#8fa396", marginTop:"3px", lineHeight:1.5 }}>Exclusive perks & early access</div>
          </div>
        </aside>

        {/* Main form */}
        <main>
          {/* PERSONAL */}
          {activeTab==="personal" && (
            <div className="ah-section">
              <Section title="Personal Details" iconKey="user">
                <Grid cols={2}>
                  <Field label="First Name" value={form.personal.firstName} onChange={upd("personal","firstName")} required />
                  <Field label="Last Name"  value={form.personal.lastName}  onChange={upd("personal","lastName")}  required />
                  <Field label="Date of Birth" type="date" value={form.personal.dob} onChange={upd("personal","dob")} />
                  <Field label="Gender" value={form.personal.gender} onChange={upd("personal","gender")} options={["Female","Male","Non-Binary","Prefer not to say"]} />
                  <Field label="Nationality" value={form.personal.nationality} onChange={upd("personal","nationality")} options={["Indian","American","British","Canadian","Australian","German","French","Japanese","Chinese","Other"]} span />
                </Grid>
              </Section>
            </div>
          )}

          {/* CONTACT */}
          {activeTab==="contact" && (
            <div className="ah-section">
              <Section title="Contact Information" iconKey="phone">
                <Grid cols={2}>
                  <Field label="Email Address" type="email" value={form.contact.email} onChange={upd("contact","email")} required />
                  <Field label="Mobile Number" type="tel"   value={form.contact.mobile} onChange={upd("contact","mobile")} required />
                  <Field label="Alternate Phone" type="tel" value={form.contact.altPhone} onChange={upd("contact","altPhone")} />
                  <Field label="Postal Code" value={form.contact.postalCode} onChange={upd("contact","postalCode")} />
                  <Field label="Street Address" value={form.contact.address} onChange={upd("contact","address")} placeholder="123 Main Street" span />
                  <Field label="City"    value={form.contact.city}    onChange={upd("contact","city")} />
                  <Field label="State"   value={form.contact.state}   onChange={upd("contact","state")} />
                  <Field label="Country" value={form.contact.country} onChange={upd("contact","country")} options={["India","United States","United Kingdom","Canada","Australia","Germany","France","Japan","Singapore","UAE","Other"]} span />
                </Grid>
              </Section>
            </div>
          )}

          {/* IDENTIFICATION */}
          {activeTab==="identification" && (
            <div className="ah-section">
              <Section title="Identification Details" iconKey="idcard">
                <div style={{ background:"rgba(122,158,142,0.07)", border:"1px solid rgba(122,158,142,0.18)", borderRadius:"12px", padding:"12px 16px", marginBottom:"18px", fontSize:"13px", color:"#6d8f7e", display:"flex", gap:"10px", alignItems:"flex-start" }}>
                  <Ico path={I.lock} size={15} color="#7a9e8e" />
                  <span>Your identification is encrypted and secured. Required for international bookings.</span>
                </div>
                <Grid cols={2}>
                  <Field label="ID Type"    value={form.identification.idType}   onChange={upd("identification","idType")}   options={["Passport","Aadhaar Card","Driving License","National ID","PAN Card","Voter ID"]} />
                  <Field label="ID Number"  value={form.identification.idNumber} onChange={upd("identification","idNumber")} placeholder="Enter ID number" />
                  <Field label="Expiry Date" type="date" value={form.identification.idExpiry} onChange={upd("identification","idExpiry")} />
                </Grid>
              </Section>
            </div>
          )}

          {/* BOOKING */}
          {activeTab==="booking" && (
            <div className="ah-section">
              <Section title="Booking Preferences" iconKey="bed">
                <Grid cols={2}>
                  <Field label="Room Type"       value={form.booking.roomType}      onChange={upd("booking","roomType")}      options={["Standard","Deluxe","Suite","Presidential Suite","Studio","Penthouse"]} />
                  <Field label="Bed Preference"  value={form.booking.bedPreference} onChange={upd("booking","bedPreference")} options={["Single","Double","Queen","King","Twin","Bunk"]} />
                  <Field label="Smoking"         value={form.booking.smoking}       onChange={upd("booking","smoking")}       options={["Non-Smoking","Smoking"]} />
                  <Field label="Floor / View"    value={form.booking.floorView}     onChange={upd("booking","floorView")}     options={["Sea View","City View","Garden View","Pool View","High Floor","Low Floor","No Preference"]} />
                </Grid>
                <div style={{ marginTop:"20px" }}>
                  <p style={{ fontSize:"10px", fontWeight:"700", letterSpacing:"0.1em", textTransform:"uppercase", color:"#8fa396", marginBottom:"11px" }}>
                    Amenity Preferences <span style={{ color:"#b8c9be", fontWeight:"400", textTransform:"none", letterSpacing:0 }}>— tap to select</span>
                  </p>
                  <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                    {["Ocean View","High Floor","Quiet Room","Pet Friendly","City Centre","Pool Access","Spa Access","Gym Access"].map(tag=>{
                      const sel=amenities.includes(tag);
                      return (
                        <div key={tag} className="ah-pill"
                          onClick={()=>setAmenities(p=>p.includes(tag)?p.filter(a=>a!==tag):[...p,tag])}
                          style={{ padding:"7px 14px", borderRadius:"20px", fontSize:"12px", fontWeight:"700", cursor:"pointer", userSelect:"none", transition:"all 0.2s", display:"flex", alignItems:"center", gap:"6px",
                            background:sel?"rgba(122,158,142,0.12)":"rgba(255,255,255,0.6)",
                            border:sel?"1.5px solid rgba(122,158,142,0.38)":"1.5px solid rgba(122,158,142,0.15)",
                            color:sel?"#5a7a6a":"#8fa396",
                            boxShadow:sel?"0 2px 10px rgba(122,158,142,0.15)":"none" }}>
                          {sel && <Ico path={I.check} size={11} color="#7a9e8e" sw={2.5} />}
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                  {amenities.length>0 && <p style={{ fontSize:"12px", color:"#8fa396", marginTop:"9px" }}>{amenities.length} preference{amenities.length>1?"s":""} selected</p>}
                </div>
              </Section>
            </div>
          )}

          {/* PAYMENT */}
          {activeTab==="payment" && (
            <div className="ah-section">
              <Section title="Payment Information" iconKey="card">
                <div style={{ background:"linear-gradient(135deg,rgba(122,158,142,0.15),rgba(196,137,107,0.12))", border:"1.5px solid rgba(255,255,255,0.8)", borderRadius:"18px", padding:"22px 24px", marginBottom:"20px", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:"-20px", right:"-20px", width:"100px", height:"100px", background:"rgba(255,255,255,0.2)", borderRadius:"50%" }} />
                  <Ico path={I.card} size={24} color="#7a9e8e" />
                  <div style={{ fontFamily:"'Courier New',monospace", fontSize:"16px", letterSpacing:"0.2em", margin:"14px 0 8px", color:"#3d4a3e" }}>
                    {form.payment.cardNumber||"**** **** **** ****"}
                  </div>
                  <div style={{ fontSize:"11px", color:"#8fa396", letterSpacing:"0.06em" }}>AirHub Guest Card</div>
                </div>
                <Grid cols={2}>
                  <Field label="Card Number (masked)" value={form.payment.cardNumber}  onChange={upd("payment","cardNumber")}  placeholder="**** **** **** 4242" />
                  <Field label="Payment Method"       value={form.payment.paymentMethod} onChange={upd("payment","paymentMethod")} options={["Credit Card","Debit Card","UPI","Net Banking","PayPal","Apple Pay","Google Pay","Cash"]} />
                  <Field label="Billing Address"      value={form.payment.billingAddress} onChange={upd("payment","billingAddress")} placeholder="Same as contact" span />
                </Grid>
              </Section>
            </div>
          )}

          {/* LOYALTY */}
          {activeTab==="loyalty" && (
            <div className="ah-section">
              <Section title="Loyalty & Membership" iconKey="trophy">
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px", marginBottom:"20px" }}>
                  {[
                    {name:"Silver",   icon:"star",   pts:"0–999 pts",   color:"rgba(138,158,184,0.25)", border:"rgba(138,158,184,0.35)"},
                    {name:"Gold",     icon:"trophy", pts:"1,000–4,999", color:"rgba(196,137,107,0.18)", border:"rgba(196,137,107,0.38)"},
                    {name:"Platinum", icon:"globe",  pts:"5,000+ pts",  color:"rgba(122,158,142,0.18)", border:"rgba(122,158,142,0.38)"},
                  ].map(tier=>{
                    const act=form.loyalty.loyaltyTier===tier.name;
                    return (
                      <div key={tier.name} onClick={()=>setForm(p=>({...p,loyalty:{...p.loyalty,loyaltyTier:tier.name}}))} style={{ background:act?tier.color:"rgba(255,255,255,0.5)", border:act?`1.5px solid ${tier.border}`:"1.5px solid rgba(255,255,255,0.8)", borderRadius:"16px", padding:"18px 14px", textAlign:"center", cursor:"pointer", transition:"all 0.22s", boxShadow:act?"0 4px 18px rgba(0,0,0,0.07)":"none" }}>
                        <div style={{ width:"38px", height:"38px", margin:"0 auto 10px", background:act?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.4)", borderRadius:"11px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <Ico path={I[tier.icon]} size={18} color={act?"#5a7a6a":"#b8c9be"} />
                        </div>
                        <div style={{ fontWeight:"700", fontSize:"13px", color:act?"#3d4a3e":"#8fa396" }}>{tier.name}</div>
                        <div style={{ fontSize:"11px", color:act?"#6d7f70":"#b8c9be", marginTop:"3px" }}>{tier.pts}</div>
                      </div>
                    );
                  })}
                </div>
                <Grid cols={2}>
                  <Field label="Loyalty Tier"     value={form.loyalty.loyaltyTier}     onChange={upd("loyalty","loyaltyTier")}     options={["Silver","Gold","Platinum"]} />
                  <Field label="Corporate Account" value={form.loyalty.corporateAccount} onChange={upd("loyalty","corporateAccount")} placeholder="Company name (optional)" />
                </Grid>
              </Section>
            </div>
          )}

          {/* ACCOUNT */}
          {activeTab==="account" && (
            <div className="ah-section">
              <Section title="Account Settings" iconKey="settings">
                <Grid cols={2}>
                  <Field label="Username"   value={form.account.username}     onChange={upd("account","username")} required />
                  <Field label="Password"   type="password" value={form.account.password} onChange={upd("account","password")} placeholder="Choose a strong password" required />
                  <Field label="Notifications" value={form.account.notifications} onChange={upd("account","notifications")} options={["Email","SMS","Email & SMS","Push Notifications","None"]} />
                  <Field label="Language"   value={form.account.language}     onChange={upd("account","language")} options={["English","Hindi","Tamil","Spanish","French","German","Arabic","Japanese","Chinese"]} />
                  <Field label="Currency"   value={form.account.currency}     onChange={upd("account","currency")} options={["INR (₹)","USD ($)","EUR (€)","GBP (£)","JPY (¥)","AED (د.إ)","SGD (S$)","AUD (A$)"]} span />
                </Grid>
              </Section>
            </div>
          )}

          {/* ACTIVITY */}
          {activeTab==="activity" && <ActivityPage form={form} upd={upd} />}

          {/* Guest card after save */}
          {profileSaved && activeTab!=="activity" && (
            <div className="ah-section" style={{ marginTop:"4px" }}>
              <GuestCard form={form} userId={userId} amenities={amenities} />
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ background:"rgba(196,137,107,0.08)", border:"1px solid rgba(196,137,107,0.25)", borderRadius:"13px", padding:"13px 16px", marginBottom:"14px", fontSize:"13px", color:"#b07050", fontWeight:"600", display:"flex", alignItems:"center", gap:"10px" }}>
              <span>⚠</span>{error}
            </div>
          )}

          {/* Offline warning */}
          {serverOnline===false && !error && (
            <div style={{ background:"rgba(196,137,107,0.06)", border:"1px solid rgba(196,137,107,0.2)", borderRadius:"13px", padding:"13px 16px", marginBottom:"14px", fontSize:"13px", color:"#a07050", fontWeight:"600", display:"flex", alignItems:"center", gap:"10px" }}>
              <span>🔌</span>
              <span>Backend offline — run <code style={{ background:"rgba(0,0,0,0.05)", padding:"1px 6px", borderRadius:"4px" }}>node server.js</code> to enable saving.</span>
            </div>
          )}

          {/* Bottom nav row */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"12px", flexWrap:"wrap", gap:"12px" }}>
            <div style={{ display:"flex", gap:"8px" }}>
              {[{label:"← Previous",fn:goPrev,dis:curIdx===0},{label:"Next →",fn:goNext,dis:curIdx===TAB_ORDER.length-1}].map(b=>(
                <button key={b.label} onClick={b.fn} disabled={b.dis}
                  style={{ padding:"10px 18px", borderRadius:"11px", border:"1.5px solid rgba(122,158,142,0.2)", background:"rgba(255,255,255,0.6)", color:b.dis?"#c8d5cc":"#6d8f7e", fontWeight:"700", fontSize:"13px", cursor:b.dis?"not-allowed":"pointer", fontFamily:"'Nunito',sans-serif", transition:"all 0.2s" }}>
                  {b.label}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
              {saved && (
                <div style={{ display:"flex", alignItems:"center", gap:"8px", color:"#5a9a7a", fontSize:"13px", fontWeight:"700", background:"rgba(122,158,142,0.1)", border:"1px solid rgba(122,158,142,0.28)", padding:"9px 16px", borderRadius:"20px", animation:"ah-rise 0.3s ease" }}>
                  <Ico path={I.check} size={15} color="#5a9a7a" sw={2.5} />
                  Saved! {userId&&`Guest #${userId}`}
                </div>
              )}
              <button className="ah-save" onClick={handleSubmit} disabled={loading}
                style={{ background:loading?"rgba(122,158,142,0.25)":"linear-gradient(135deg,#7a9e8e,#9abcac)", color:loading?"#8fa396":"white", border:"none", borderRadius:"13px", padding:"13px 36px", fontSize:"14px", fontWeight:"800", letterSpacing:"0.02em", cursor:loading?"not-allowed":"pointer", transition:"all 0.25s", boxShadow:loading?"none":"0 6px 22px rgba(122,158,142,0.3)", display:"flex", alignItems:"center", gap:"9px", fontFamily:"'Nunito',sans-serif" }}>
                {loading?<><Spinner/>Saving...</>:<><Ico path={I.save} size={15} color="white"/>Save Profile</>}
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer style={{ position:"relative", zIndex:1, borderTop:"1.5px solid rgba(122,158,142,0.12)", padding:"22px 44px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px", background:"rgba(255,255,255,0.3)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <AirHubLogo size={32} />
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"17px", fontWeight:"700", color:"#6d7f70", lineHeight:1 }}>AirHub Hotels</div>
            <div style={{ fontSize:"8px", color:"#b8c9be", fontWeight:"700", letterSpacing:"0.16em", marginTop:"2px" }}>& RESORTS</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:"20px" }}>
          {["Privacy Policy","Terms of Use","Help Centre","Contact"].map(l=>(
            <span key={l} style={{ fontSize:"12px", color:"#b8c9be", cursor:"pointer", fontWeight:"600", transition:"color 0.2s" }}
              onMouseEnter={e=>e.target.style.color="#7a9e8e"} onMouseLeave={e=>e.target.style.color="#b8c9be"}>{l}</span>
          ))}
        </div>
        <div style={{ fontSize:"12px", color:"#c8d5cc", fontWeight:"600" }}>© {new Date().getFullYear()} AirHub Hotels</div>
      </footer>

      {/* Profile View Panel */}
      {showPanel && (
        <ProfileViewPanel form={form} user={user} amenities={amenities} userId={userId}
          onClose={()=>setShowPanel(false)} onEdit={()=>setActiveTab("personal")} />
      )}
    </div>
  );
}