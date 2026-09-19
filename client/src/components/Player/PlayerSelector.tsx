
import { useState } from "react";

const INK = "#221B2E";
const PAPER = "#FFF7E8";
const BG = "#241834";

const COLORS = [
  { name: "Bubblegum", base: "#FF6FA0" },
  { name: "Slime", base: "#7ED957" },
  { name: "Sky", base: "#5AC8FA" },
  { name: "Sun", base: "#FFCC33" },
  { name: "Grape", base: "#B18CFF" },
];

const BODY_LABELS = ["round", "wobbly", "boxy", "flower-shaped", "cloud-shaped"];
const EYE_LABELS = ["round eyes", "sleepy eyes", "a wink", "star eyes", "swirly eyes"];
const MOUTH_LABELS = ["a big smile", "a surprised gasp", "a flat stare", "a fangy grin", "a wiggly giggle"];

function starPath(cx, cy, r, points) {
  const step = Math.PI / points;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? r : r / 2.3;
    const angle = i * step - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    d += (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1) + " ";
  }
  return d + "Z";
}

function BodyShape({ id, fill }) {
  const common = { fill, stroke: INK, strokeWidth: 6, strokeLinejoin: "round" };
  switch (id) {
    case 0:
      return <circle cx="100" cy="104" r="74" {...common} />;
    case 1:
      return (
        <path
          d="M100,28 C138,24 172,52 176,90 C180,130 158,168 118,178 C80,187 40,168 28,130 C17,94 30,54 66,36 C77,30 88,29 100,28 Z"
          {...common}
        />
      );
    case 2:
      return <rect x="28" y="30" width="144" height="144" rx="34" {...common} />;
    case 3:
      return (
        <g>
          <circle cx="100" cy="65" r="38" {...common} />
          <circle cx="138" cy="93" r="38" {...common} />
          <circle cx="124" cy="137" r="38" {...common} />
          <circle cx="76" cy="137" r="38" {...common} />
          <circle cx="62" cy="93" r="38" {...common} />
          <circle cx="100" cy="105" r="50" {...common} />
        </g>
      );
    case 4:
      return (
        <g>
          <rect x="52" y="108" width="96" height="55" rx="28" {...common} />
          <circle cx="72" cy="115" r="36" {...common} />
          <circle cx="100" cy="90" r="44" {...common} />
          <circle cx="128" cy="115" r="36" {...common} />
        </g>
      );
    default:
      return null;
  }
}

function EyesShape({ id }) {
  const L = { cx: 74, cy: 96 };
  const R = { cx: 126, cy: 96 };
  const stroke = { stroke: INK, strokeWidth: 5, strokeLinecap: "round", fill: "none" };
  switch (id) {
    case 0:
      return (
        <g>
          <circle cx={L.cx} cy={L.cy} r="11" fill={INK} />
          <circle cx={L.cx - 3} cy={L.cy - 3} r="3.5" fill="#fff" />
          <circle cx={R.cx} cy={R.cy} r="11" fill={INK} />
          <circle cx={R.cx - 3} cy={R.cy - 3} r="3.5" fill="#fff" />
        </g>
      );
    case 1:
      return (
        <g>
          <path d={`M${L.cx - 14},${L.cy} Q${L.cx},${L.cy + 10} ${L.cx + 14},${L.cy}`} {...stroke} />
          <path d={`M${R.cx - 14},${R.cy} Q${R.cx},${R.cy + 10} ${R.cx + 14},${R.cy}`} {...stroke} />
        </g>
      );
    case 2:
      return (
        <g>
          <circle cx={L.cx} cy={L.cy} r="11" fill={INK} />
          <circle cx={L.cx - 3} cy={L.cy - 3} r="3.5" fill="#fff" />
          <path d={`M${R.cx - 14},${R.cy - 2} Q${R.cx},${R.cy + 6} ${R.cx + 14},${R.cy - 2}`} {...stroke} />
        </g>
      );
    case 3:
      return (
        <g fill={INK}>
          <path d={starPath(L.cx, L.cy, 12, 5)} />
          <path d={starPath(R.cx, R.cy, 12, 5)} />
        </g>
      );
    case 4:
      return (
        <g stroke={INK} strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d={`M${L.cx - 9},${L.cy - 3} a6,6 0 1 1 9,7 a4,4 0 1 1 -6,-4`} />
          <path d={`M${R.cx - 9},${R.cy - 3} a6,6 0 1 1 9,7 a4,4 0 1 1 -6,-4`} />
        </g>
      );
    default:
      return null;
  }
}

function MouthShape({ id }) {
  const cx = 100,
    cy = 148;
  switch (id) {
    case 0:
      return <path d={`M${cx - 25},${cy - 6} Q${cx},${cy + 20} ${cx + 25},${cy - 6}`} stroke={INK} strokeWidth="7" fill="none" strokeLinecap="round" />;
    case 1:
      return (
        <g>
          <ellipse cx={cx} cy={cy + 2} rx="15" ry="19" fill={INK} />
          <ellipse cx={cx} cy={cy + 14} rx="7" ry="5" fill="#E85D75" />
        </g>
      );
    case 2:
      return <rect x={cx - 28} y={cy - 3} width="56" height="8" rx="4" fill={INK} />;
    case 3:
      return (
        <g>
          <path d={`M${cx - 25},${cy - 6} Q${cx},${cy + 20} ${cx + 25},${cy - 6}`} stroke={INK} strokeWidth="7" fill="none" strokeLinecap="round" />
          <polygon points={`${cx - 19},${cy - 4} ${cx - 11},${cy - 4} ${cx - 15},${cy + 10}`} fill={INK} />
          <polygon points={`${cx + 19},${cy - 4} ${cx + 11},${cy - 4} ${cx + 15},${cy + 10}`} fill={INK} />
        </g>
      );
    case 4:
      return (
        <path
          d={`M${cx - 30},${cy - 2} Q${cx - 20},${cy - 16} ${cx - 10},${cy - 2} T${cx + 10},${cy - 2} T${cx + 30},${cy - 2}`}
          stroke={INK}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    default:
      return null;
  }
}

function Character({ bodyId, eyeId, mouthId, color, size }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <BodyShape id={bodyId} fill={color} />
      <EyesShape id={eyeId} />
      <MouthShape id={mouthId} />
    </svg>
  );
}

function stickerButton(selected) {
  return {
    border: `3px solid ${INK}`,
    borderRadius: 14,
    background: selected ? "#FFE9B8" : "#fff",
    boxShadow: selected ? `3px 3px 0 ${INK}` : "2px 2px 0 rgba(34,27,46,0.35)",
    transform: selected ? "translate(-1px,-1px)" : "none",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.12s ease, box-shadow 0.12s ease",
  };
}

const CustomizableCharacter = () => {
  const [bodyId, setBodyId] = useState(0);
  const [eyeId, setEyeId] = useState(0);
  const [mouthId, setMouthId] = useState(0);
  const [colorId, setColorId] = useState(0);
  const [spin, setSpin] = useState(0);

  const color = COLORS[colorId];

  const flavor = `${color.name}, ${BODY_LABELS[bodyId]}, with ${EYE_LABELS[eyeId]} and ${MOUTH_LABELS[mouthId]}.`;

  const reset = () => {
    setBodyId(0);
    setEyeId(0);
    setMouthId(0);
    setColorId(0);
    setSpin((s) => s + 1);
  };

  const randomize = () => {
    setBodyId(Math.floor(Math.random() * 5));
    setEyeId(Math.floor(Math.random() * 5));
    setMouthId(Math.floor(Math.random() * 5));
    setColorId(Math.floor(Math.random() * 5));
    setSpin((s) => s + 1);
  };

  const Row = ({ label, count, current, onPick, renderThumb }) => (
    <div style={{ marginBottom: 14 }}>
      <p style={{ margin: "0 0 6px 2px", fontSize: 13, fontWeight: 700, color: INK, opacity: 0.75 }}>{label}</p>
      <div style={{ display: "flex", gap: 8 }}>
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            aria-label={`${label} option ${i + 1}`}
            onClick={() => onPick(i)}
            style={{ ...stickerButton(current === i), width: 42, height: 42 }}
          >
            {renderThumb(i)}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1.6px, transparent 1.6px)",
        backgroundSize: "24px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "'Baloo 2', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&display=swap');
        @keyframes pop {
          0% { transform: scale(0.85) rotate(-4deg); }
          55% { transform: scale(1.08) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .char-pop { animation: pop 0.4s cubic-bezier(.34,1.56,.64,1); }
        .press:active { transform: translate(2px,2px) !important; box-shadow: 0px 0px 0 #221B2E !important; }
      `}</style>

      {/* decorative stickers */}
      <svg width="70" height="70" viewBox="0 0 100 100" style={{ position: "absolute", top: 28, left: 28, transform: "rotate(-12deg)" }}>
        <path d={starPath(50, 50, 42, 5)} fill="#FFCC33" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </svg>
      <svg width="54" height="54" viewBox="0 0 100 100" style={{ position: "absolute", bottom: 36, right: 40, transform: "rotate(18deg)" }}>
        <circle cx="50" cy="50" r="42" fill="#5AC8FA" stroke={INK} strokeWidth="5" />
      </svg>

      <div style={{ width: "100%", maxWidth: 380, position: "relative" }}>
        <div style={{ marginBottom: 18, textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: "#FFF7E8", letterSpacing: 0.2 }}>Build your blob</h1>
          <p style={{ margin: "6px 0 0", fontSize: 14, color: "#C9BEDD" }}>Mix a shape, a face and a color into something nobody's made before.</p>
        </div>

        <div
          style={{
            background: PAPER,
            border: `4px solid ${INK}`,
            borderRadius: 26,
            boxShadow: `8px 8px 0 ${INK}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "28px 20px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#FFEFCB",
              borderBottom: `4px solid ${INK}`,
            }}
          >
            <div key={spin} className="char-pop">
              <Character bodyId={bodyId} eyeId={eyeId} mouthId={mouthId} color={color.base} size={190} />
            </div>
            <div
              style={{
                marginTop: 10,
                background: "#fff",
                border: `2.5px solid ${INK}`,
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 12.5,
                fontWeight: 600,
                color: INK,
                textAlign: "center",
                maxWidth: 280,
              }}
            >
              {flavor}
            </div>
          </div>

          <div style={{ padding: "18px 18px 20px" }}>
            <Row
              label="Shape"
              count={5}
              current={bodyId}
              onPick={setBodyId}
              renderThumb={(i) => (
                <svg viewBox="0 0 200 200" width="30" height="30">
                  <BodyShape id={i} fill={color.base} />
                </svg>
              )}
            />
            <Row
              label="Eyes"
              count={5}
              current={eyeId}
              onPick={setEyeId}
              renderThumb={(i) => (
                <svg viewBox="0 0 200 200" width="30" height="30">
                  <circle cx="100" cy="100" r="96" fill="#FFEFCB" />
                  <EyesShape id={i} />
                </svg>
              )}
            />
            <Row
              label="Mouth"
              count={5}
              current={mouthId}
              onPick={setMouthId}
              renderThumb={(i) => (
                <svg viewBox="0 0 200 200" width="30" height="30">
                  <circle cx="100" cy="100" r="96" fill="#FFEFCB" />
                  <MouthShape id={i} />
                </svg>
              )}
            />
            <Row
              label="Color"
              count={5}
              current={colorId}
              onPick={setColorId}
              renderThumb={(i) => (
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: COLORS[i].base, border: `2px solid ${INK}` }} />
              )}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <button
                onClick={reset}
                className="press"
                style={{
                  flex: 1,
                  padding: "12px 0",
                  fontSize: 14,
                  fontWeight: 700,
                  color: INK,
                  background: "#fff",
                  border: `3px solid ${INK}`,
                  borderRadius: 14,
                  boxShadow: `3px 3px 0 ${INK}`,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Start over
              </button>
              <button
                onClick={randomize}
                className="press"
                style={{
                  flex: 1,
                  padding: "12px 0",
                  fontSize: 14,
                  fontWeight: 800,
                  color: INK,
                  background: "#7ED957",
                  border: `3px solid ${INK}`,
                  borderRadius: 14,
                  boxShadow: `3px 3px 0 ${INK}`,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Surprise me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizableCharacter;