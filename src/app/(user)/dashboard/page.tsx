import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page

// "use client";

// import { useState, useRef, useEffect } from "react";

// const fontLink = document.createElement("link");
// fontLink.rel = "stylesheet";
// fontLink.href =
//   "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
// document.head.appendChild(fontLink);

// const destinations = [
//   {
//     name: "Bali",
//     country: "Indonesia",
//     price: "₹ 19,600",
//     img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=80",
//   },
//   {
//     name: "Dubai",
//     country: "UAE",
//     price: "₹ 21,700",
//     img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80",
//   },
//   {
//     name: "Maldives",
//     country: "Maldives",
//     price: "₹ 11,300",
//     img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=700&q=80",
//   },
//   {
//     name: "Santorini",
//     country: "Greece",
//     price: "₹ 28,500",
//     img: "https://images.unsplash.com/photo-1507501336603-6136a08f4a63?w=700&q=80",
//   },
//   {
//     name: "Tokyo",
//     country: "Japan",
//     price: "₹ 35,000",
//     img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&q=80",
//   },
// ];

// const popularDestinations = [
//   {
//     name: "Kerala",
//     location: "India",
//     price: "₹ 248",
//     img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80",
//   },
//   {
//     name: "Sukhothai",
//     location: "Thailand",
//     price: "₹ 248",
//     img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80",
//   },
//   {
//     name: "Eiffel Tour",
//     location: "France",
//     price: "₹ 248",
//     img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80",
//   },
//   {
//     name: "Kashmir",
//     location: "India",
//     price: "₹ 248",
//     img: "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=400&q=80",
//   },
// ];

// const travelAgents = [
//   { name: "TUI Group", country: "Germany", logo: "TUI", color: "#003087" },
//   { name: "Thomas Cook", country: "UK", logo: "TC", color: "#e8001c" },
//   { name: "Expedia", country: "USA", logo: "EX", color: "#00355f" },
//   { name: "MakeMyTrip", country: "India", logo: "MMT", color: "#d63b2f" },
//   { name: "Cox & Kings", country: "India", logo: "C&K", color: "#8b6914" },
//   { name: "Kesari Tours", country: "India", logo: "KT", color: "#1a6b3a" },
// ];

// const navItems = [
//   { label: "Dashboard", icon: "⊞" },
//   { label: "My Trips", icon: "🧳" },
//   { label: "Favourites", icon: "🔖" },
//   { label: "Messages", icon: "✉" },
//   { label: "History", icon: "🗂" },
//   { label: "Settings", icon: "⚙" },
// ];

// const popularTabs = ["Most Popular", "Special Offers", "Near Me"];
// const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
// const MONTHS = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const profileMenuItems = [
//   { icon: "👤", label: "My Profile" },
//   { icon: "🧳", label: "My Trips" },
//   { icon: "❤️", label: "Wishlist" },
//   { icon: "💳", label: "Payment Methods" },
//   { icon: "🔔", label: "Notifications" },
//   { icon: "⚙️", label: "Settings" },
//   { icon: "↩", label: "Sign Out", danger: true },
// ];

// function getDaysInMonth(y: number, m: number) {
//   return new Date(y, m + 1, 0).getDate();
// }
// function getFirstDay(y: number, m: number) {
//   return new Date(y, m, 1).getDay();
// }
// function toKey(y, m, d) {
//   return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
// }
// function parseKey(k) {
//   const [y, m, d] = k.split("-").map(Number);
//   return new Date(y, m - 1, d);
// }

// function RangeCalendar({ startDate, endDate, onChange }: { startDate: Date, endDate: Date, onChange: (value: { start: Date, end: Date }) => void }) {
//   const today = new Date();
//   const [view, setView] = useState({
//     year: today.getFullYear(),
//     month: today.getMonth(),
//   });
//   const prev = () =>
//     setView((v) => {
//       const d = new Date(v.year, v.month - 1);
//       return { year: d.getFullYear(), month: d.getMonth() };
//     });
//   const next = () =>
//     setView((v) => {
//       const d = new Date(v.year, v.month + 1);
//       return { year: d.getFullYear(), month: d.getMonth() };
//     });

//   const totalDays = getDaysInMonth(view.year, view.month);
//   const cells = Array(getFirstDay(view.year, view.month))
//     .fill(null)
//     .concat(Array.from({ length: totalDays }, (_, i) => i + 1));

//   const handleDay = (day) => {
//     if (!day) return;
//     const date = parseKey(toKey(view.year, view.month, day));
//     if (!startDate || (startDate && endDate)) {
//       onChange({ start: date, end: null });
//     } else {
//       onChange(
//         date < startDate
//           ? { start: date, end: startDate }
//           : { start: startDate, end: date },
//       );
//     }
//   };

//   const isSt = (d) =>
//     d &&
//     startDate &&
//     new Date(view.year, view.month, d).toDateString() ===
//     startDate.toDateString();
//   const isEnd = (d) =>
//     d &&
//     endDate &&
//     new Date(view.year, view.month, d).toDateString() ===
//     endDate.toDateString();
//   const inRng = (d) => {
//     if (!d || !startDate || !endDate) return false;
//     const dt = new Date(view.year, view.month, d);
//     return dt > startDate && dt < endDate;
//   };

//   return (
//     <div
//       style={{
//         background: "rgba(22,25,40,0.9)",
//         backdropFilter: "blur(14px)",
//         borderRadius: 16,
//         padding: "16px",
//         border: "1px solid rgba(200,240,74,0.1)",
//         boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 14,
//         }}
//       >
//         <button
//           onClick={prev}
//           style={{
//             background: "transparent",
//             border: "none",
//             color: "#555878",
//             fontSize: 20,
//             cursor: "pointer",
//             padding: "0 6px",
//             lineHeight: 1,
//             transition: "color 0.15s",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.color = "#c8f04a")}
//           onMouseLeave={(e) => (e.currentTarget.style.color = "#555878")}
//         >
//           ‹
//         </button>
//         <span
//           style={{
//             fontSize: 12,
//             fontWeight: 700,
//             color: "#9ba3bf",
//             letterSpacing: 1.5,
//           }}
//         >
//           {MONTHS[view.month].slice(0, 3).toUpperCase()} {view.year}
//         </span>
//         <button
//           onClick={next}
//           style={{
//             background: "transparent",
//             border: "none",
//             color: "#555878",
//             fontSize: 20,
//             cursor: "pointer",
//             padding: "0 6px",
//             lineHeight: 1,
//             transition: "color 0.15s",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.color = "#c8f04a")}
//           onMouseLeave={(e) => (e.currentTarget.style.color = "#555878")}
//         >
//           ›
//         </button>
//       </div>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(7,1fr)",
//           marginBottom: 4,
//         }}
//       >
//         {DAYS.map((d) => (
//           <div
//             key={d}
//             style={{
//               textAlign: "center",
//               fontSize: 10,
//               fontWeight: 700,
//               color: "#404468",
//               padding: "3px 0",
//             }}
//           >
//             {d}
//           </div>
//         ))}
//       </div>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(7,1fr)",
//           gap: "2px 0",
//         }}
//       >
//         {cells.map((day, i) => {
//           const s = isSt(day),
//             e = isEnd(day),
//             r = inRng(day);
//           return (
//             <div
//               key={i}
//               onClick={() => handleDay(day)}
//               style={{
//                 textAlign: "center",
//                 padding: "7px 0",
//                 fontSize: 12,
//                 fontWeight: s || e ? 800 : 400,
//                 cursor: day ? "pointer" : "default",
//                 borderRadius: s
//                   ? "50% 0 0 50%"
//                   : e
//                     ? "0 50% 50% 0"
//                     : r
//                       ? 0
//                       : "50%",
//                 background:
//                   s || e
//                     ? "#c8f04a"
//                     : r
//                       ? "rgba(200,240,74,0.12)"
//                       : "transparent",
//                 color:
//                   s || e
//                     ? "#0a0c14"
//                     : r
//                       ? "#c8f04a"
//                       : day
//                         ? "#c0c5dc"
//                         : "transparent",
//                 transition: "background 0.15s",
//               }}
//             >
//               {day || ""}
//             </div>
//           );
//         })}
//       </div>
//       {startDate && (
//         <div
//           style={{
//             marginTop: 12,
//             padding: "9px 12px",
//             background: "rgba(200,240,74,0.05)",
//             borderRadius: 10,
//             border: "1px solid rgba(200,240,74,0.12)",
//           }}
//         >
//           <p style={{ margin: 0, fontSize: 11, color: "#9ba3bf" }}>
//             {startDate.toLocaleDateString("en-IN", {
//               day: "numeric",
//               month: "short",
//               year: "numeric",
//             })}
//             {endDate
//               ? ` → ${endDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
//               : " → pick end date"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// function DestinationSlider() {
//   const [active, setActive] = useState(0);
//   const iv = useRef(null);
//   const go = (dir) =>
//     setActive((p) => (p + dir + destinations.length) % destinations.length);
//   useEffect(() => {
//     iv.curr ent = setInterval(() => go(1), 4500);
//     return () => clearInterval(iv.current);
//   }, []);

//   return (
//     <div
//       style={{
//         position: "relative",
//         borderRadius: 22,
//         overflow: "hidden",
//         height: 240,
//         boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
//       }}
//     >
//       {destinations.map((d, i) => (
//         <div
//           key={d.name}
//           style={{
//             position: "absolute",
//             inset: 0,
//             opacity: i === active ? 1 : 0,
//             transform: i === active ? "scale(1)" : "scale(1.04)",
//             transition: "opacity 0.65s ease, transform 0.65s ease",
//             pointerEvents: i === active ? "auto" : "none",
//           }}
//         >
//           <img
//             src={d.img}
//             alt={d.name}
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               background:
//                 "linear-gradient(to top, rgba(8,10,20,0.95) 0%, rgba(8,10,20,0.0) 55%)",
//             }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               background:
//                 "linear-gradient(to right, rgba(8,10,20,0.35) 0%, transparent 35%, transparent 65%, rgba(8,10,20,0.35) 100%)",
//             }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               bottom: 22,
//               left: 24,
//               right: 24,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "flex-end",
//             }}
//           >
//             <div>
//               <p
//                 style={{
//                   margin: "0 0 4px",
//                   fontSize: 24,
//                   fontWeight: 800,
//                   color: "#fff",
//                   lineHeight: 1,
//                 }}
//               >
//                 {d.name}
//               </p>
//               <p
//                 style={{
//                   margin: 0,
//                   fontSize: 13,
//                   color: "rgba(255,255,255,0.5)",
//                 }}
//               >
//                 📍 {d.country}
//               </p>
//             </div>
//             <div
//               style={{
//                 background: "rgba(8,10,20,0.55)",
//                 backdropFilter: "blur(10px)",
//                 borderRadius: 14,
//                 padding: "9px 16px",
//                 border: "1px solid rgba(255,255,255,0.08)",
//                 textAlign: "right",
//               }}
//             >
//               <p
//                 style={{
//                   margin: "0 0 2px",
//                   fontSize: 9,
//                   color: "rgba(255,255,255,0.45)",
//                   textTransform: "uppercase",
//                   letterSpacing: 1.2,
//                 }}
//               >
//                 Starting at
//               </p>
//               <p
//                 style={{
//                   margin: 0,
//                   fontSize: 19,
//                   fontWeight: 800,
//                   color: "#c8f04a",
//                 }}
//               >
//                 {d.price}
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}
//       {[
//         { dir: -1, side: "left:12px" },
//         { dir: 1, side: "right:12px" },
//       ].map(({ dir, side }) => (
//         <button
//           key={side}
//           onClick={() => {
//             go(dir);
//             clearInterval(iv.current);
//           }}
//           style={{
//             position: "absolute",
//             top: "50%",
//             transform: "translateY(-50%)",
//             [side.split(":")[0]]: side.split(":")[1],
//             background: "rgba(8,10,20,0.6)",
//             backdropFilter: "blur(8px)",
//             border: "1px solid rgba(255,255,255,0.1)",
//             color: "#fff",
//             fontSize: 18,
//             width: 36,
//             height: 36,
//             borderRadius: "50%",
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 5,
//           }}
//         >
//           {dir === -1 ? "‹" : "›"}
//         </button>
//       ))}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 14,
//           left: "50%",
//           transform: "translateX(-50%)",
//           display: "flex",
//           gap: 5,
//         }}
//       >
//         {destinations.map((_, i) => (
//           <div
//             key={i}
//             onClick={() => setActive(i)}
//             style={{
//               width: i === active ? 20 : 6,
//               height: 6,
//               borderRadius: 3,
//               background: i === active ? "#c8f04a" : "rgba(255,255,255,0.28)",
//               cursor: "pointer",
//               transition: "all 0.3s",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function ProfileDropdown({ onClose }) {
//   const ref = useRef(null);
//   useEffect(() => {
//     const h = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) onClose();
//     };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   return (
//     <div
//       ref={ref}
//       style={{
//         position: "absolute",
//         top: "calc(100% + 10px)",
//         right: 0,
//         zIndex: 200,
//         background: "rgba(14,16,26,0.92)",
//         backdropFilter: "blur(24px)",
//         border: "1px solid rgba(200,240,74,0.18)",
//         borderRadius: 20,
//         width: 250,
//         overflow: "hidden",
//         boxShadow:
//           "0 28px 70px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
//         animation: "dropIn 0.2s ease",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           padding: "18px 18px 14px",
//           borderBottom: "1px solid rgba(255,255,255,0.05)",
//           display: "flex",
//           alignItems: "center",
//           gap: 12,
//           background: "rgba(200,240,74,0.03)",
//         }}
//       >
//         <div
//           style={{
//             width: 48,
//             height: 48,
//             borderRadius: "50%",
//             background: "linear-gradient(135deg,#ff6b6b,#ff8e53)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 18,
//             fontWeight: 800,
//             color: "#fff",
//             flexShrink: 0,
//             border: "2px solid rgba(200,240,74,0.35)",
//             boxShadow: "0 0 16px rgba(200,240,74,0.15)",
//           }}
//         >
//           A
//         </div>
//         <div>
//           <p
//             style={{
//               margin: "0 0 2px",
//               fontWeight: 700,
//               fontSize: 15,
//               color: "#fff",
//             }}
//           >
//             Anni
//           </p>
//           <p style={{ margin: "0 0 6px", fontSize: 11, color: "#404468" }}>
//             anni@safarly.com
//           </p>
//           <span
//             style={{
//               fontSize: 9,
//               fontWeight: 700,
//               background: "rgba(200,240,74,0.12)",
//               color: "#c8f04a",
//               padding: "3px 9px",
//               borderRadius: 20,
//               letterSpacing: 0.8,
//               border: "1px solid rgba(200,240,74,0.2)",
//             }}
//           >
//             TRAVELER PRO
//           </span>
//         </div>
//       </div>
//       {/* Stats */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr 1fr",
//           borderBottom: "1px solid rgba(255,255,255,0.05)",
//         }}
//       >
//         {[
//           ["12", "Trips"],
//           ["5", "Saved"],
//           ["2", "Active"],
//         ].map(([v, l]) => (
//           <div key={l} style={{ textAlign: "center", padding: "12px 4px" }}>
//             <p
//               style={{
//                 margin: "0 0 2px",
//                 fontWeight: 800,
//                 fontSize: 18,
//                 color: "#c8f04a",
//               }}
//             >
//               {v}
//             </p>
//             <p style={{ margin: 0, fontSize: 10, color: "#404468" }}>{l}</p>
//           </div>
//         ))}
//       </div>
//       {/* Menu */}
//       <div style={{ padding: "8px" }}>
//         {profileMenuItems.map((item) => (
//           <button
//             key={item.label}
//             onClick={onClose}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 10,
//               width: "100%",
//               padding: "10px 12px",
//               background: "transparent",
//               border: "none",
//               borderRadius: 10,
//               cursor: "pointer",
//               textAlign: "left",
//               color: item.danger ? "#ff5757" : "#9ba3bf",
//               fontSize: 13,
//               fontWeight: 500,
//               fontFamily: "'Plus Jakarta Sans', sans-serif",
//               transition: "background 0.15s, color 0.15s",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = item.danger
//                 ? "rgba(255,87,87,0.08)"
//                 : "rgba(200,240,74,0.06)";
//               e.currentTarget.style.color = item.danger ? "#ff5757" : "#c8f04a";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "transparent";
//               e.currentTarget.style.color = item.danger ? "#ff5757" : "#9ba3bf";
//             }}
//           >
//             <span style={{ fontSize: 14, width: 20, textAlign: "center" }}>
//               {item.icon}
//             </span>
//             {item.label}
//             {item.label === "Messages" && (
//               <span
//                 style={{
//                   marginLeft: "auto",
//                   fontSize: 10,
//                   background: "#c8f04a",
//                   color: "#0a0c14",
//                   fontWeight: 700,
//                   borderRadius: 10,
//                   padding: "1px 6px",
//                 }}
//               >
//                 3
//               </span>
//             )}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function SafarlyDashboard() {
//   const [activeNav, setActiveNav] = useState(0);
//   const [activeTab, setActiveTab] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [dateRange, setDateRange] = useState({ start: null, end: null });
//   const [profileOpen, setProfileOpen] = useState(false);

//   const css = `
//     * { box-sizing: border-box; margin: 0; padding: 0; }
//     ::-webkit-scrollbar { width: 4px; }
//     ::-webkit-scrollbar-track { background: transparent; }
//     ::-webkit-scrollbar-thumb { background: rgba(200,240,74,0.15); border-radius: 4px; }
//     @keyframes fadeUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes dropIn  { from { opacity:0; transform:translateY(-10px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
//     .nav-item { transition: all 0.18s; }
//     .nav-item:hover { background: rgba(200,240,74,0.07) !important; color: #c8f04a !important; }
//     .card-h { transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease; }
//     .card-h:hover { transform: translateY(-4px); border-color: rgba(200,240,74,0.35) !important; box-shadow: 0 14px 36px rgba(0,0,0,0.4); }
//     @media (max-width: 920px) {
//       .sidebar { position: fixed !important; left: -240px; top: 0; bottom: 0; z-index: 100; transition: left 0.28s ease; }
//       .sidebar.open { left: 0 !important; box-shadow: 20px 0 60px rgba(0,0,0,0.8); }
//       .right-panel { display: none !important; }
//       .hbg { display: flex !important; }
//     }
//     @media (max-width: 600px) {
//       .pop-grid { grid-template-columns: 1fr !important; }
//       .main-pad { padding: 18px 16px !important; }
//       .topbar { padding: 14px 16px !important; gap: 10px !important; }
//     }
//   `;

//   return (
//     <>
//       <style>{css}</style>
//       <div
//         style={{
//           display: "flex",
//           height: "100vh",
//           background: "#080a14",
//           fontFamily: "'Plus Jakarta Sans', sans-serif",
//           color: "#c0c5dc",
//           overflow: "hidden",
//           borderRadius: 22,
//           position: "relative",
//         }}
//       >
//         {/* ── SIDEBAR ── */}
//         <aside
//           className={`sidebar ${sidebarOpen ? "open" : ""}`}
//           style={{
//             width: 232,
//             flexShrink: 0,
//             background: "linear-gradient(180deg,#0d0f1e 0%,#0a0c19 100%)",
//             display: "flex",
//             flexDirection: "column",
//             padding: "26px 13px 20px",
//             gap: 2,
//             borderRight: "1px solid rgba(255,255,255,0.04)",
//             position: "relative",
//             overflow: "hidden",
//             zIndex: 10,
//           }}
//         >
//           {/* Lime glow — bottom-center of sidebar */}
//           <div
//             style={{
//               position: "absolute",
//               bottom: -80,
//               left: "50%",
//               transform: "translateX(-50%)",
//               width: 260,
//               height: 260,
//               borderRadius: "50%",
//               background:
//                 "radial-gradient(circle, rgba(200,240,74,0.28) 0%, rgba(200,240,74,0.08) 45%, transparent 70%)",
//               pointerEvents: "none",
//               filter: "blur(22px)",
//               zIndex: 0,
//             }}
//           />
//           {/* Secondary glow — mid-sidebar trailing bloom */}
//           <div
//             style={{
//               position: "absolute",
//               top: "42%",
//               left: "50%",
//               transform: "translateX(-50%)",
//               width: 180,
//               height: 180,
//               borderRadius: "50%",
//               background:
//                 "radial-gradient(circle, rgba(200,240,74,0.06) 0%, transparent 70%)",
//               pointerEvents: "none",
//               filter: "blur(18px)",
//               zIndex: 0,
//             }}
//           />
//           {/* Top edge rim light */}
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 16,
//               right: 16,
//               height: 1,
//               background:
//                 "linear-gradient(90deg, transparent, rgba(200,240,74,0.25), transparent)",
//               zIndex: 0,
//             }}
//           />

//           {/* Logo */}
//           <div
//             style={{
//               paddingLeft: 10,
//               marginBottom: 32,
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
//               <span
//                 style={{
//                   fontSize: 28,
//                   fontWeight: 800,
//                   color: "#fff",
//                   letterSpacing: "-1.5px",
//                 }}
//               >
//                 Safar
//               </span>
//               <span
//                 style={{
//                   fontSize: 28,
//                   fontWeight: 800,
//                   color: "#c8f04a",
//                   letterSpacing: "-1.5px",
//                 }}
//               >
//                 ly
//               </span>
//               <span style={{ fontSize: 15, color: "#c8f04a", marginLeft: 3 }}>
//                 ✦
//               </span>
//             </div>
//             <p
//               style={{
//                 fontSize: 10,
//                 color: "rgba(200,240,74,0.35)",
//                 fontWeight: 600,
//                 marginTop: 1,
//                 letterSpacing: 2.5,
//                 textTransform: "uppercase",
//               }}
//             >
//               travel companion
//             </p>
//           </div>

//           {/* Nav */}
//           {navItems.map((item, i) => (
//             <button
//               key={item.label}
//               className="nav-item"
//               onClick={() => {
//                 setActiveNav(i);
//                 setSidebarOpen(false);
//               }}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 11,
//                 padding: "11px 14px",
//                 borderRadius: 12,
//                 border: "none",
//                 cursor: "pointer",
//                 background:
//                   i === activeNav
//                     ? "linear-gradient(135deg,#c8f04a 0%,#a8d432 100%)"
//                     : "transparent",
//                 color: i === activeNav ? "#0a0c14" : "#555878",
//                 fontWeight: i === activeNav ? 700 : 500,
//                 fontSize: 14,
//                 textAlign: "left",
//                 fontFamily: "'Plus Jakarta Sans', sans-serif",
//                 boxShadow:
//                   i === activeNav ? "0 4px 20px rgba(200,240,74,0.28)" : "none",
//                 position: "relative",
//                 zIndex: 1,
//               }}
//             >
//               <span style={{ fontSize: 16, lineHeight: 1 }}>{item.icon}</span>
//               {item.label}
//               {i === activeNav && (
//                 <span
//                   style={{
//                     marginLeft: "auto",
//                     width: 6,
//                     height: 6,
//                     borderRadius: "50%",
//                     background: "rgba(10,12,20,0.35)",
//                   }}
//                 />
//               )}
//             </button>
//           ))}

//           <div style={{ flex: 1 }} />

//           {/* Promo */}
//           <div
//             style={{
//               background: "linear-gradient(140deg,#c8f04a 0%,#9fcc2e 100%)",
//               borderRadius: 16,
//               padding: "16px 16px 14px",
//               marginBottom: 6,
//               position: "relative",
//               overflow: "hidden",
//               zIndex: 1,
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: -20,
//                 right: -20,
//                 width: 90,
//                 height: 90,
//                 borderRadius: "50%",
//                 background: "rgba(255,255,255,0.13)",
//               }}
//             />
//             <div
//               style={{
//                 position: "absolute",
//                 top: 14,
//                 right: -4,
//                 width: 56,
//                 height: 56,
//                 borderRadius: "50%",
//                 background: "rgba(255,255,255,0.08)",
//               }}
//             />
//             <p
//               style={{
//                 color: "#0a0c14",
//                 fontWeight: 800,
//                 fontSize: 16,
//                 marginBottom: 4,
//                 position: "relative",
//               }}
//             >
//               50% Off Today!
//             </p>
//             <p
//               style={{
//                 color: "rgba(10,12,20,0.55)",
//                 fontSize: 11,
//                 lineHeight: 1.55,
//                 marginBottom: 14,
//                 position: "relative",
//               }}
//             >
//               Limited slots on select destinations.
//             </p>
//             <button
//               style={{
//                 background: "#0a0c14",
//                 border: "none",
//                 borderRadius: 10,
//                 padding: "7px 14px",
//                 color: "#c8f04a",
//                 fontWeight: 700,
//                 fontSize: 12,
//                 cursor: "pointer",
//                 fontFamily: "'Plus Jakarta Sans', sans-serif",
//                 position: "relative",
//               }}
//             >
//               Claim Now →
//             </button>
//           </div>

//           {/* Logout */}
//           <button
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 10,
//               padding: "10px 14px",
//               background: "transparent",
//               border: "none",
//               color: "#333650",
//               fontSize: 13,
//               cursor: "pointer",
//               borderRadius: 10,
//               fontFamily: "'Plus Jakarta Sans', sans-serif",
//               transition: "color 0.2s",
//               position: "relative",
//               zIndex: 1,
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.color = "#ff5757")}
//             onMouseLeave={(e) => (e.currentTarget.style.color = "#333650")}
//           >
//             ↩ Logout
//           </button>
//         </aside>

//         {/* ── MAIN PANEL ── */}
//         <main
//           style={{
//             flex: 1,
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//             minWidth: 0,
//             position: "relative",
//           }}
//         >
//           {/* Ambient blobs on main area */}
//           <div
//             style={{
//               position: "absolute",
//               top: -100,
//               right: 80,
//               width: 380,
//               height: 380,
//               borderRadius: "50%",
//               background:
//                 "radial-gradient(circle, rgba(200,240,74,0.07) 0%, transparent 65%)",
//               pointerEvents: "none",
//               filter: "blur(35px)",
//               zIndex: 0,
//             }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               bottom: -80,
//               left: "25%",
//               width: 420,
//               height: 300,
//               borderRadius: "50%",
//               background:
//                 "radial-gradient(circle, rgba(80,130,255,0.05) 0%, transparent 70%)",
//               pointerEvents: "none",
//               filter: "blur(40px)",
//               zIndex: 0,
//             }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               top: "35%",
//               right: -50,
//               width: 280,
//               height: 280,
//               borderRadius: "50%",
//               background:
//                 "radial-gradient(circle, rgba(200,240,74,0.04) 0%, transparent 70%)",
//               pointerEvents: "none",
//               filter: "blur(28px)",
//               zIndex: 0,
//             }}
//           />
//           {/* Top-left corner vignette bloom from sidebar */}
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: 220,
//               height: 200,
//               background:
//                 "radial-gradient(ellipse at 0% 0%, rgba(200,240,74,0.06) 0%, transparent 70%)",
//               pointerEvents: "none",
//               zIndex: 0,
//             }}
//           />

//           {/* ── TOPBAR ── */}
//           <header
//             className="topbar"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               padding: "16px 28px",
//               gap: 14,
//               borderBottom: "1px solid rgba(255,255,255,0.04)",
//               background: "rgba(8,10,20,0.75)",
//               backdropFilter: "blur(20px)",
//               flexShrink: 0,
//               position: "relative",
//               zIndex: 20,
//             }}
//           >
//             <button
//               className="hbg"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               style={{
//                 display: "none",
//                 background: "transparent",
//                 border: "none",
//                 color: "#c0c5dc",
//                 fontSize: 22,
//                 cursor: "pointer",
//                 padding: 4,
//                 flexShrink: 0,
//               }}
//             >
//               ☰
//             </button>

//             {/* Search */}
//             <div
//               style={{
//                 flex: 1,
//                 display: "flex",
//                 alignItems: "center",
//                 background: "rgba(255,255,255,0.04)",
//                 borderRadius: 12,
//                 padding: "0 16px",
//                 gap: 10,
//                 border: "1px solid rgba(255,255,255,0.07)",
//                 maxWidth: 440,
//                 transition: "border-color 0.2s, background 0.2s",
//               }}
//               onFocusCapture={(e) => {
//                 e.currentTarget.style.borderColor = "rgba(200,240,74,0.35)";
//                 e.currentTarget.style.background = "rgba(200,240,74,0.03)";
//               }}
//               onBlurCapture={(e) => {
//                 e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
//                 e.currentTarget.style.background = "rgba(255,255,255,0.04)";
//               }}
//             >
//               <span style={{ color: "#333650", fontSize: 14 }}>🔍</span>
//               <input
//                 type="text"
//                 placeholder="Search destinations..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 style={{
//                   flex: 1,
//                   background: "transparent",
//                   border: "none",
//                   outline: "none",
//                   color: "#c0c5dc",
//                   fontSize: 14,
//                   padding: "12px 0",
//                   fontFamily: "'Plus Jakarta Sans', sans-serif",
//                 }}
//               />
//             </div>

//             <button
//               style={{
//                 background: "linear-gradient(135deg,#c8f04a,#a8d432)",
//                 color: "#0a0c14",
//                 fontWeight: 700,
//                 fontSize: 13,
//                 border: "none",
//                 borderRadius: 11,
//                 padding: "11px 22px",
//                 cursor: "pointer",
//                 fontFamily: "'Plus Jakarta Sans', sans-serif",
//                 flexShrink: 0,
//                 boxShadow: "0 4px 18px rgba(200,240,74,0.28)",
//                 transition: "box-shadow 0.2s, transform 0.15s",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.boxShadow =
//                   "0 6px 26px rgba(200,240,74,0.45)";
//                 e.currentTarget.style.transform = "translateY(-1px)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.boxShadow =
//                   "0 4px 18px rgba(200,240,74,0.28)";
//                 e.currentTarget.style.transform = "translateY(0)";
//               }}
//             >
//               Search
//             </button>

//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 10,
//                 marginLeft: "auto",
//                 flexShrink: 0,
//               }}
//             >
//               {/* Bell */}
//               <div style={{ position: "relative" }}>
//                 <button
//                   style={{
//                     background: "rgba(255,255,255,0.04)",
//                     border: "1px solid rgba(255,255,255,0.07)",
//                     borderRadius: "50%",
//                     width: 40,
//                     height: 40,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "pointer",
//                     fontSize: 15,
//                     transition: "border-color 0.2s",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.borderColor = "rgba(200,240,74,0.3)")
//                   }
//                   onMouseLeave={(e) =>
//                   (e.currentTarget.style.borderColor =
//                     "rgba(255,255,255,0.07)")
//                   }
//                 >
//                   🔔
//                 </button>
//                 <span
//                   style={{
//                     position: "absolute",
//                     top: 6,
//                     right: 7,
//                     width: 8,
//                     height: 8,
//                     background: "#ff4757",
//                     borderRadius: "50%",
//                     border: "2px solid #080a14",
//                     boxShadow: "0 0 6px #ff4757",
//                   }}
//                 />
//               </div>

//               {/* Profile */}
//               <div style={{ position: "relative" }}>
//                 <button
//                   onClick={() => setProfileOpen((o) => !o)}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 9,
//                     background: profileOpen
//                       ? "rgba(200,240,74,0.07)"
//                       : "rgba(255,255,255,0.04)",
//                     border: `1px solid ${profileOpen ? "rgba(200,240,74,0.45)" : "rgba(255,255,255,0.07)"}`,
//                     borderRadius: 13,
//                     padding: "6px 12px 6px 6px",
//                     cursor: "pointer",
//                     transition: "all 0.2s",
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!profileOpen) {
//                       e.currentTarget.style.borderColor =
//                         "rgba(200,240,74,0.28)";
//                       e.currentTarget.style.background =
//                         "rgba(200,240,74,0.04)";
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!profileOpen) {
//                       e.currentTarget.style.borderColor =
//                         "rgba(255,255,255,0.07)";
//                       e.currentTarget.style.background =
//                         "rgba(255,255,255,0.04)";
//                     }
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: 30,
//                       height: 30,
//                       borderRadius: "50%",
//                       background: "linear-gradient(135deg,#ff6b6b,#ff8e53)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: 14,
//                       fontWeight: 800,
//                       color: "#fff",
//                       border: profileOpen
//                         ? "2px solid rgba(200,240,74,0.5)"
//                         : "2px solid transparent",
//                       transition: "border-color 0.2s",
//                     }}
//                   >
//                     A
//                   </div>
//                   <div style={{ textAlign: "left" }}>
//                     <p
//                       style={{
//                         margin: 0,
//                         fontWeight: 700,
//                         fontSize: 13,
//                         color: "#fff",
//                       }}
//                     >
//                       Anni
//                     </p>
//                     <p style={{ margin: 0, fontSize: 10, color: "#404468" }}>
//                       Traveler Pro
//                     </p>
//                   </div>
//                   <span
//                     style={{
//                       color: "#555878",
//                       fontSize: 11,
//                       marginLeft: 3,
//                       transition: "transform 0.22s",
//                       display: "inline-block",
//                       transform: profileOpen
//                         ? "rotate(180deg)"
//                         : "rotate(0deg)",
//                     }}
//                   >
//                     ▾
//                   </span>
//                 </button>

//                 {profileOpen && (
//                   <ProfileDropdown onClose={() => setProfileOpen(false)} />
//                 )}
//               </div>
//             </div>
//           </header>

//           {/* ── BODY ── */}
//           <div
//             style={{
//               display: "flex",
//               flex: 1,
//               overflow: "hidden",
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             {/* Center */}
//             <div
//               className="main-pad"
//               style={{
//                 flex: 1,
//                 padding: "28px 30px",
//                 overflowY: "auto",
//                 minWidth: 0,
//               }}
//             >
//               <div
//                 style={{ marginBottom: 26, animation: "fadeUp 0.4s ease both" }}
//               >
//                 <h1
//                   style={{
//                     fontSize: 30,
//                     fontWeight: 800,
//                     color: "#fff",
//                     marginBottom: 5,
//                     letterSpacing: "-0.5px",
//                   }}
//                 >
//                   Hello, Anni! 👋
//                 </h1>
//                 <p style={{ color: "#333650", fontSize: 15 }}>
//                   Ready to explore somewhere new today?
//                 </p>
//               </div>

//               <div
//                 style={{
//                   marginBottom: 30,
//                   animation: "fadeUp 0.42s ease 0.06s both",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: 14,
//                   }}
//                 >
//                   <h2 style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>
//                     Easy Visa Destinations
//                   </h2>
//                   <button
//                     style={{
//                       background: "transparent",
//                       border: "none",
//                       color: "#c8f04a",
//                       fontSize: 13,
//                       cursor: "pointer",
//                       fontWeight: 600,
//                       fontFamily: "'Plus Jakarta Sans', sans-serif",
//                     }}
//                   >
//                     View All →
//                   </button>
//                 </div>
//                 <DestinationSlider />
//               </div>

//               <div style={{ animation: "fadeUp 0.42s ease 0.12s both" }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     gap: 4,
//                     marginBottom: 18,
//                     borderBottom: "1px solid rgba(255,255,255,0.05)",
//                   }}
//                 >
//                   {popularTabs.map((tab, i) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(i)}
//                       style={{
//                         background: "transparent",
//                         border: "none",
//                         cursor: "pointer",
//                         fontSize: 14,
//                         fontWeight: i === activeTab ? 700 : 500,
//                         color: i === activeTab ? "#c8f04a" : "#404468",
//                         padding: "0 4px 13px",
//                         borderBottom:
//                           i === activeTab
//                             ? "2px solid #c8f04a"
//                             : "2px solid transparent",
//                         transition: "all 0.2s",
//                         fontFamily: "'Plus Jakarta Sans', sans-serif",
//                         marginBottom: -1,
//                       }}
//                     >
//                       {tab}
//                     </button>
//                   ))}
//                 </div>

//                 <div
//                   className="pop-grid"
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(2,1fr)",
//                     gap: 16,
//                   }}
//                 >
//                   {popularDestinations.map((d) => (
//                     <div
//                       key={d.name}
//                       className="card-h"
//                       style={{
//                         background: "rgba(22,25,40,0.75)",
//                         backdropFilter: "blur(12px)",
//                         borderRadius: 18,
//                         border: "1px solid rgba(255,255,255,0.06)",
//                         cursor: "pointer",
//                         overflow: "hidden",
//                         display: "flex",
//                         flexDirection: "column",
//                       }}
//                     >
//                       <div
//                         style={{
//                           position: "relative",
//                           height: 148,
//                           overflow: "hidden",
//                         }}
//                       >
//                         <img
//                           src={d.img}
//                           alt={d.name}
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                             display: "block",
//                             transition: "transform 0.45s ease",
//                           }}
//                           onMouseEnter={(e) =>
//                             (e.currentTarget.style.transform = "scale(1.08)")
//                           }
//                           onMouseLeave={(e) =>
//                             (e.currentTarget.style.transform = "scale(1)")
//                           }
//                         />
//                         <div
//                           style={{
//                             position: "absolute",
//                             top: 10,
//                             left: 10,
//                             background: "rgba(8,10,20,0.68)",
//                             backdropFilter: "blur(8px)",
//                             borderRadius: 20,
//                             padding: "4px 10px",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 4,
//                           }}
//                         >
//                           <span style={{ fontSize: 9, color: "#ff6b6b" }}>
//                             📍
//                           </span>
//                           <span
//                             style={{
//                               fontSize: 11,
//                               fontWeight: 600,
//                               color: "#fff",
//                             }}
//                           >
//                             {d.location}
//                           </span>
//                         </div>
//                         <button
//                           style={{
//                             position: "absolute",
//                             top: 10,
//                             right: 10,
//                             background: "rgba(8,10,20,0.68)",
//                             backdropFilter: "blur(8px)",
//                             border: "none",
//                             borderRadius: "50%",
//                             width: 28,
//                             height: 28,
//                             cursor: "pointer",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             fontSize: 12,
//                           }}
//                         >
//                           🤍
//                         </button>
//                       </div>
//                       <div style={{ padding: "11px 14px 8px" }}>
//                         <p
//                           style={{
//                             fontWeight: 700,
//                             fontSize: 15,
//                             color: "#fff",
//                             margin: 0,
//                           }}
//                         >
//                           {d.name}
//                         </p>
//                       </div>
//                       <div
//                         style={{
//                           marginTop: "auto",
//                           background: "linear-gradient(90deg,#c8f04a,#a8d432)",
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                           padding: "9px 14px",
//                         }}
//                       >
//                         <span
//                           style={{
//                             fontSize: 11,
//                             color: "#2a3a00",
//                             fontWeight: 600,
//                           }}
//                         >
//                           Starting at
//                         </span>
//                         <span
//                           style={{
//                             fontSize: 14,
//                             fontWeight: 800,
//                             color: "#0a0c14",
//                           }}
//                         >
//                           {d.price}{" "}
//                           <span style={{ fontSize: 10, fontWeight: 500 }}>
//                             /day
//                           </span>
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* ── RIGHT PANEL ── */}
//             <aside
//               className="right-panel"
//               style={{
//                 width: 285,
//                 background: "rgba(8,10,20,0.5)",
//                 backdropFilter: "blur(24px)",
//                 padding: "26px 18px",
//                 overflowY: "auto",
//                 borderLeft: "1px solid rgba(255,255,255,0.04)",
//                 flexShrink: 0,
//                 position: "relative",
//               }}
//             >
//               {/* Soft top-right ambient glow */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: -50,
//                   right: -30,
//                   width: 200,
//                   height: 200,
//                   borderRadius: "50%",
//                   background:
//                     "radial-gradient(circle,rgba(200,240,74,0.07) 0%,transparent 70%)",
//                   pointerEvents: "none",
//                   filter: "blur(22px)",
//                 }}
//               />

//               <div style={{ marginBottom: 26, position: "relative" }}>
//                 <h3
//                   style={{
//                     fontSize: 15,
//                     fontWeight: 700,
//                     color: "#fff",
//                     marginBottom: 13,
//                   }}
//                 >
//                   Select Dates
//                 </h3>
//                 <RangeCalendar
//                   startDate={dateRange.start}
//                   endDate={dateRange.end}
//                   onChange={(r) => setDateRange(r)}
//                 />
//                 {dateRange.start && dateRange.end && (
//                   <button
//                     onClick={() => setDateRange({ start: null, end: null })}
//                     style={{
//                       marginTop: 8,
//                       width: "100%",
//                       background: "transparent",
//                       border: "1px solid rgba(255,255,255,0.07)",
//                       borderRadius: 10,
//                       padding: "8px",
//                       color: "#404468",
//                       fontSize: 12,
//                       cursor: "pointer",
//                       fontFamily: "'Plus Jakarta Sans', sans-serif",
//                       transition: "all 0.2s",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.color = "#ff5757";
//                       e.currentTarget.style.borderColor = "rgba(255,87,87,0.3)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.color = "#404468";
//                       e.currentTarget.style.borderColor =
//                         "rgba(255,255,255,0.07)";
//                     }}
//                   >
//                     ✕ Clear selection
//                   </button>
//                 )}
//               </div>

//               <div>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: 13,
//                   }}
//                 >
//                   <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
//                     Travel Agents
//                   </h3>
//                   <button
//                     style={{
//                       background: "transparent",
//                       border: "none",
//                       color: "#c8f04a",
//                       fontSize: 11,
//                       cursor: "pointer",
//                       fontWeight: 600,
//                       fontFamily: "'Plus Jakarta Sans', sans-serif",
//                     }}
//                   >
//                     View All
//                   </button>
//                 </div>
//                 <div
//                   style={{ display: "flex", flexDirection: "column", gap: 8 }}
//                 >
//                   {travelAgents.map((agent) => (
//                     <div
//                       key={agent.name}
//                       className="card-h"
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 11,
//                         background: "rgba(22,25,40,0.65)",
//                         backdropFilter: "blur(10px)",
//                         borderRadius: 12,
//                         padding: "11px 13px",
//                         border: "1px solid rgba(255,255,255,0.05)",
//                         cursor: "pointer",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: 40,
//                           height: 40,
//                           borderRadius: 10,
//                           background: agent.color,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           flexShrink: 0,
//                           boxShadow: `0 4px 14px ${agent.color}60`,
//                         }}
//                       >
//                         <span
//                           style={{
//                             fontSize: 10,
//                             fontWeight: 800,
//                             color: "#fff",
//                             letterSpacing: "-0.3px",
//                           }}
//                         >
//                           {agent.logo}
//                         </span>
//                       </div>
//                       <div style={{ flex: 1, minWidth: 0 }}>
//                         <p
//                           style={{
//                             fontWeight: 700,
//                             fontSize: 13,
//                             color: "#fff",
//                             marginBottom: 2,
//                             whiteSpace: "nowrap",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           }}
//                         >
//                           {agent.name}
//                         </p>
//                         <p style={{ fontSize: 11, color: "#333650" }}>
//                           📍 {agent.country}
//                         </p>
//                       </div>
//                       <span style={{ fontSize: 14, color: "#333650" }}>›</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </main>

//         {/* Mobile overlay */}
//         {sidebarOpen && (
//           <div
//             onClick={() => setSidebarOpen(false)}
//             style={{
//               position: "fixed",
//               inset: 0,
//               background: "rgba(0,0,0,0.65)",
//               zIndex: 99,
//               backdropFilter: "blur(5px)",
//             }}
//           />
//         )}
//       </div>
//     </>
//   );
// }
