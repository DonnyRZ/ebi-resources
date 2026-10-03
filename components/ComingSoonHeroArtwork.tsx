/** Brand-led, image-free hero artwork for business lines still in preparation. */
export function ComingSoonHeroArtwork({
  variant,
}: {
  variant: "travel" | "technology";
}) {
  const isTravel = variant === "travel";

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-navy">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isTravel
            ? "radial-gradient(ellipse at 78% 45%, rgba(182,139,75,.25), transparent 34%), radial-gradient(ellipse at 100% 100%, rgba(66,91,125,.3), transparent 48%), linear-gradient(115deg, #11172a 0%, #1c2740 58%, #11182b 100%)"
            : "radial-gradient(ellipse at 78% 42%, rgba(67,115,155,.27), transparent 34%), radial-gradient(ellipse at 100% 100%, rgba(182,139,75,.14), transparent 46%), linear-gradient(115deg, #101629 0%, #19233b 58%, #101629 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.24) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.24) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(90deg, transparent 8%, black 52%, black 100%)",
        }}
      />

      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {isTravel ? (
          <g stroke="#d2ad73">
            <g strokeOpacity=".16" strokeWidth="1.2">
              <ellipse cx="1190" cy="438" rx="430" ry="300" transform="rotate(-18 1190 438)" />
              <ellipse cx="1190" cy="438" rx="340" ry="235" transform="rotate(-18 1190 438)" />
              <ellipse cx="1190" cy="438" rx="250" ry="170" transform="rotate(-18 1190 438)" />
              <path d="M840 115c117 82 244 89 352 26 105-61 214-50 327 24" />
              <path d="M793 709c117-81 248-84 356-18 102 62 221 48 354-35" />
              <path d="M1044 88c-44 111-43 216 3 318 47 101 51 214 12 405" />
            </g>
            <path
              d="M492 652c116-55 194-135 287-139 89-4 107 86 198 75 88-11 105-125 209-144 73-14 136 14 245-42"
              strokeWidth="2.2"
              strokeDasharray="3 11"
              strokeLinecap="round"
              strokeOpacity=".78"
            />
            <path
              d="M712 504c40-75 96-114 169-117 74-3 137 42 190 134"
              strokeWidth="1.4"
              strokeOpacity=".45"
            />
            <path
              d="M900 627V478a93 93 0 0 1 186 0v149M868 627h250M930 627v-87m126 87v-87"
              strokeWidth="1.7"
              strokeOpacity=".57"
            />
            <circle cx="779" cy="513" r="24" strokeWidth="1.6" strokeOpacity=".7" />
            <circle cx="779" cy="513" r="5" fill="#d2ad73" fillOpacity=".9" />
            <circle cx="977" cy="588" r="18" strokeWidth="1.6" strokeOpacity=".7" />
            <circle cx="977" cy="588" r="4" fill="#d2ad73" fillOpacity=".9" />
            <circle cx="1186" cy="444" r="26" strokeWidth="1.6" strokeOpacity=".7" />
            <circle cx="1186" cy="444" r="5" fill="#d2ad73" fillOpacity=".9" />
            <circle cx="1428" cy="402" r="20" strokeWidth="1.6" strokeOpacity=".7" />
            <circle cx="1428" cy="402" r="4" fill="#d2ad73" fillOpacity=".9" />
          </g>
        ) : (
          <g stroke="#b4c4d8">
            <g strokeOpacity=".15" strokeWidth="1.2">
              <circle cx="1192" cy="442" r="300" />
              <circle cx="1192" cy="442" r="226" />
              <circle cx="1192" cy="442" r="152" />
              <path d="M1192 88v708M838 442h708M942 192l500 500M1442 192 942 692" />
            </g>
            <g stroke="#c8a064" strokeOpacity=".72" strokeWidth="1.7">
              <path d="M592 242h154a48 48 0 0 1 48 48v75h111a54 54 0 0 1 54 54v92" />
              <path d="M1600 286h-154a48 48 0 0 0-48 48v72h-98a56 56 0 0 0-56 56v99" />
              <path d="M698 768h176a53 53 0 0 0 53-53v-75a53 53 0 0 1 53-53h116" />
              <path d="M1286 90v106a54 54 0 0 1-54 54h-52a52 52 0 0 0-52 52v73" />
            </g>
            <g stroke="#d5b680" strokeWidth="1.7">
              <rect x="748" y="334" width="84" height="84" rx="18" strokeOpacity=".6" />
              <rect x="1080" y="358" width="112" height="112" rx="26" strokeOpacity=".82" />
              <rect x="1329" y="483" width="78" height="78" rx="18" strokeOpacity=".6" />
              <circle cx="592" cy="242" r="7" fill="#d5b680" />
              <circle cx="859" cy="419" r="7" fill="#d5b680" />
              <circle cx="1192" cy="442" r="8" fill="#d5b680" />
              <circle cx="1477" cy="286" r="7" fill="#d5b680" />
              <circle cx="1098" cy="587" r="7" fill="#d5b680" />
              <circle cx="698" cy="768" r="7" fill="#d5b680" />
              <circle cx="1286" cy="90" r="7" fill="#d5b680" />
            </g>
          </g>
        )}
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(13,19,34,.78) 0%, rgba(13,19,34,.36) 44%, transparent 78%), linear-gradient(0deg, rgba(8,12,23,.28), transparent 55%)",
        }}
      />
    </div>
  );
}
