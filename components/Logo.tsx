import Link from 'next/link'

interface ZMarkProps {
  size?: number
}

export function ZMark({ size = 40 }: ZMarkProps) {
  const h = Math.round(size * 1.15)
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main bright gradient — cyan → blue → purple */}
        <linearGradient id="zg-main" x1="50" y1="0" x2="50" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#38bdf8" />
          <stop offset="48%"  stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        {/* Depth/shadow gradient — darker tones */}
        <linearGradient id="zg-depth" x1="50" y1="0" x2="50" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#0369a1" />
          <stop offset="48%"  stopColor="#1e40af" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
      </defs>

      {/* ── Depth layer (slightly offset down-right, darker) ── */}
      <line x1="10"  y1="20"  x2="90"  y2="20"
            stroke="url(#zg-depth)" strokeWidth="24" strokeLinecap="round" />
      <line x1="90"  y1="20"  x2="10"  y2="95"
            stroke="url(#zg-depth)" strokeWidth="24" strokeLinecap="round" />
      <line x1="10"  y1="95"  x2="90"  y2="95"
            stroke="url(#zg-depth)" strokeWidth="24" strokeLinecap="round" />

      {/* ── Main bright layer (slightly offset up-left) ── */}
      <line x1="8"   y1="15"  x2="88"  y2="15"
            stroke="url(#zg-main)" strokeWidth="22" strokeLinecap="round" />
      <line x1="88"  y1="15"  x2="8"   y2="90"
            stroke="url(#zg-main)" strokeWidth="22" strokeLinecap="round" />
      <line x1="8"   y1="90"  x2="88"  y2="90"
            stroke="url(#zg-main)" strokeWidth="22" strokeLinecap="round" />
    </svg>
  )
}

interface LogoProps {
  href?: string
  iconSize?: number
  textColor?: string
  className?: string
}

/** Full lockup: Z mark + "ZENTRO" wordmark */
export function Logo({ href = '/', iconSize = 36, textColor = '#0f172a', className = '' }: LogoProps) {
  const fontSize = Math.round(iconSize * 0.56)

  const inner = (
    <span className={`flex items-center gap-3 ${className}`}>
      <ZMark size={iconSize} />
      <span
        style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize,
          fontWeight: 700,
          letterSpacing: '0.18em',
          color: textColor,
          lineHeight: 1,
        }}
      >
        ZENTRO
      </span>
    </span>
  )

  return href ? <Link href={href}>{inner}</Link> : inner
}

/** Icon-only square mark (for favicons, tiny contexts) */
export function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <Link href="/" aria-label="Zentro home">
      <ZMark size={size} />
    </Link>
  )
}
