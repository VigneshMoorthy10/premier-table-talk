type CrestProps = {
  abbrev: string;
  color: string;
  size?: number;
  className?: string;
};

/** Shield-shaped club badge, gradient filled in the club colour with a sash. */
export function Crest({ abbrev, color, size = 36, className }: CrestProps) {
  if (abbrev === "LIV") {
    return (
      <img
        src="/liverpool.jpg"
        alt="Liverpool crest"
        width={size}
        height={size}
        className={className}
      />
    );
  }

  const id = `crest-${abbrev.toLowerCase()}`;
  return (
    <svg
      viewBox="0 0 60 70"
      width={size}
      height={(size * 70) / 60}
      className={className}
      role="img"
      aria-label={`${abbrev} crest`}
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="60%" stopColor={color} stopOpacity="0.55" />
          <stop offset="100%" stopColor="#05070E" stopOpacity="0.95" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d="M30 1 L58 9 V36 C58 53 46 63 30 69 C14 63 2 53 2 36 V9 Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <path
          d="M30 1 L58 9 V36 C58 53 46 63 30 69 C14 63 2 53 2 36 V9 Z"
          fill={`url(#${id}-fill)`}
        />
        <path d="M-6 46 L66 12 L66 20 L-6 54 Z" fill="#F4F2EC" fillOpacity="0.22" />
      </g>
      <path
        d="M30 1 L58 9 V36 C58 53 46 63 30 69 C14 63 2 53 2 36 V9 Z"
        fill="none"
        stroke="#F4F2EC"
        strokeOpacity="0.35"
        strokeWidth="1.4"
      />
      <text
        x="30"
        y="38"
        textAnchor="middle"
        fill="#F4F2EC"
        fontSize="17"
        fontWeight="800"
        fontFamily="Archivo, Arial Narrow, sans-serif"
        letterSpacing="0.5"
      >
        {abbrev}
      </text>
    </svg>
  );
}
