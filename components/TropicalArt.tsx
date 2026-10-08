// Decorative SVGs. All aria-hidden: they carry no information.

type ArtProps = { className?: string };

function Hibiscus({ x, y, r = 7 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={0} cy={-r * 0.9} rx={r * 0.6} ry={r * 0.9} fill="#fff8e7" transform={`rotate(${a})`} />
      ))}
      <circle r={r * 0.35} fill="#ffb627" />
    </g>
  );
}

export function HawaiianShirt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path
        d="M40 12 L26 20 L6 44 L22 58 L32 48 L32 110 L88 110 L88 48 L98 58 L114 44 L94 20 L80 12 L60 36 Z"
        fill="var(--color-aloha-red)"
        stroke="#7d1020"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M40 12 L60 36 L48 40 L34 22 Z" fill="#fff8e7" stroke="#7d1020" strokeWidth="2" strokeLinejoin="round" />
      <path d="M80 12 L60 36 L72 40 L86 22 Z" fill="#fff8e7" stroke="#7d1020" strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 40 V110" stroke="#7d1020" strokeWidth="2" />
      {[56, 76, 96].map((y) => (
        <circle key={y} cx={60} cy={y} r={2.2} fill="#fff8e7" />
      ))}
      <Hibiscus x={44} y={64} />
      <Hibiscus x={76} y={84} />
      <Hibiscus x={42} y={98} r={5.5} />
      <Hibiscus x={78} y={58} r={5} />
    </svg>
  );
}
