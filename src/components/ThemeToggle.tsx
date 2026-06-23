import { useTheme } from "../utils/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "relative",
        width: 54,
        height: 28,
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        padding: 0,
        outline: "none",
        flexShrink: 0,
        transition: "background 0.4s ease",
        background: isDark
          ? "linear-gradient(135deg, #0d1b2e 0%, #1a2a4a 100%)"
          : "linear-gradient(135deg, #87ceeb 0%, #4fa8d5 100%)",
        boxShadow: isDark
          ? "0 0 0 1.5px rgba(110,231,168,0.25), inset 0 1px 3px rgba(0,0,0,0.5)"
          : "0 0 0 1.5px rgba(250,204,21,0.4), inset 0 1px 3px rgba(0,0,0,0.15)",
      }}
    >
      {/* Stars (dark mode only) */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          overflow: "hidden",
          opacity: isDark ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        {[
          { top: "20%", left: "18%", size: 1.5 },
          { top: "55%", left: "28%", size: 1 },
          { top: "30%", left: "38%", size: 1 },
        ].map((s, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "#fff",
              opacity: 0.8,
            }}
          />
        ))}
      </span>

      {/* Clouds (light mode only) */}
      <span
        style={{
          position: "absolute",
          top: "55%",
          left: "14%",
          width: 10,
          height: 4,
          borderRadius: 999,
          background: "rgba(255,255,255,0.7)",
          opacity: isDark ? 0 : 1,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Sliding thumb */}
      <span
        style={{
          position: "absolute",
          top: 3,
          left: isDark ? "calc(100% - 25px)" : 3,
          width: 22,
          height: 22,
          borderRadius: "50%",
          transition: "left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease, box-shadow 0.4s ease",
          background: isDark
            ? "linear-gradient(135deg, #d4d8e8 0%, #b8bdcc 100%)"
            : "linear-gradient(135deg, #fde047 0%, #f59e0b 100%)",
          boxShadow: isDark
            ? "0 2px 8px rgba(0,0,0,0.5), inset -3px -2px 0 0 #9ba3bb"
            : "0 2px 8px rgba(245,158,11,0.5), 0 0 0 2px rgba(253,224,71,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Sun rays */}
        {!isDark && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" fill="#f59e0b" />
            {[0,45,90,135,180,225,270,315].map((deg) => (
              <line
                key={deg}
                x1="12" y1="2" x2="12" y2="5"
                stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"
                transform={`rotate(${deg} 12 12)`}
              />
            ))}
          </svg>
        )}
        {/* Moon craters (dark mode) — the inset shadow creates the crescent */}
      </span>
    </button>
  );
}
