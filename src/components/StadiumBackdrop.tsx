export function StadiumBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base night gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0D1622 0%, #080E18 45%, #050810 100%)",
        }}
      />
      {/* four floodlight beams falling from the top corners through haze */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: [
            "radial-gradient(60% 78% at 6% -12%, rgba(240,203,132,0.30) 0%, rgba(240,203,132,0.10) 38%, transparent 70%)",
            "radial-gradient(52% 70% at 26% -16%, rgba(214,231,255,0.20) 0%, rgba(214,231,255,0.06) 40%, transparent 72%)",
            "radial-gradient(52% 70% at 74% -16%, rgba(214,231,255,0.20) 0%, rgba(214,231,255,0.06) 40%, transparent 72%)",
            "radial-gradient(60% 78% at 94% -12%, rgba(240,203,132,0.30) 0%, rgba(240,203,132,0.10) 38%, transparent 70%)",
          ].join(","),
        }}
      />
      {/* haze band across the pitch level */}
      <div
        className="absolute inset-x-0 top-1/3 h-1/2"
        style={{
          background:
            "radial-gradient(70% 100% at 50% 0%, rgba(198,161,91,0.10) 0%, transparent 75%)",
        }}
      />
      {/* dark vignette at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(3,5,10,0.75) 100%)",
        }}
      />
    </div>
  );
}
