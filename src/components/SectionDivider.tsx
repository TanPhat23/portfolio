type SectionDividerProps = {
  title?: string
  subtitle?: string
  className?: string
  variant?: 'default' | 'subtle' | 'strong'
}

const variantStyles: Record<NonNullable<SectionDividerProps['variant']>, string> = {
  default: 'divider-line-default',
  subtle: 'divider-line-subtle',
  strong: 'divider-line-strong',
}

export default function SectionDivider({
  title,
  subtitle,
  className = '',
  variant = 'default',
}: SectionDividerProps) {
  return (
    <div className={`section-divider-wrap ${className}`}>
      <div className={`section-divider ${variantStyles[variant]}`}>
        <span className="section-divider-dot section-divider-dot-a" />
        <span className="section-divider-dot section-divider-dot-b" />
        <span className="section-divider-dot section-divider-dot-c" />
      </div>

      {(title || subtitle) && (
        <div className="section-divider-copy">
          {title ? <p className="section-divider-title">{title}</p> : null}
          {subtitle ? <p className="section-divider-subtitle">{subtitle}</p> : null}
        </div>
      )}

      <style>{`
        .section-divider-wrap {
          width: 100%;
          max-width: 64rem;
          margin-left: auto;
          margin-right: auto;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
        }

        @media (min-width: 640px) {
          .section-divider-wrap {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        .section-divider {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          border: 1px solid color-mix(in oklab, var(--border) 100%, transparent);
          background: color-mix(in oklab, var(--card) 84%, transparent);
          border-radius: 9999px;
          padding: 0.7rem 0.95rem;
          box-shadow: inset 0 1px 0 var(--inset-glint);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .section-divider::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            color-mix(in oklab, var(--primary) 18%, transparent) 50%,
            transparent 100%
          );
          opacity: 0.35;
          transform: translateX(-35%);
          animation: divider-shift 6s ease-in-out infinite;
          pointer-events: none;
        }

        .section-divider::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.14) 20%,
            transparent 40%
          );
          transform: translateX(-40%);
          animation: divider-sheen 5s linear infinite;
          pointer-events: none;
          opacity: 0.35;
        }

        .divider-line-default {
          background-image: linear-gradient(
            90deg,
            transparent,
            color-mix(in oklab, var(--primary) 72%, transparent),
            color-mix(in oklab, var(--border) 100%, transparent),
            transparent
          );
        }

        .divider-line-subtle {
          background-image: linear-gradient(90deg, transparent, var(--border), transparent);
        }

        .divider-line-strong {
          background-image: linear-gradient(
            90deg,
            transparent,
            color-mix(in oklab, var(--primary) 78%, transparent),
            color-mix(in oklab, var(--primary) 46%, transparent),
            transparent
          );
        }

        .section-divider-dot {
          position: relative;
          z-index: 1;
          flex: 0 0 auto;
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 9999px;
          background: var(--primary);
          box-shadow: 0 0 14px color-mix(in oklab, var(--primary) 50%, transparent);
          animation: divider-pulse 2.6s ease-in-out infinite;
        }

        .section-divider-dot-a {
          animation-delay: 0s;
          opacity: 0.95;
        }

        .section-divider-dot-b {
          width: 0.375rem;
          height: 0.375rem;
          background: color-mix(in oklab, var(--foreground) 62%, transparent);
          box-shadow: none;
          opacity: 0.6;
          animation-delay: 0.3s;
        }

        .section-divider-dot-c {
          animation-delay: 0.6s;
          opacity: 0.78;
        }

        .section-divider-copy {
          margin-top: 0.6rem;
          text-align: center;
          padding: 0 0.35rem;
        }

        .section-divider-title {
          margin: 0;
          color: var(--foreground);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .section-divider-subtitle {
          margin: 0.25rem 0 0;
          color: var(--muted-foreground);
          font-size: 0.85rem;
          line-height: 1.4;
        }

        @keyframes divider-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.14);
            opacity: 1;
          }
        }

        @keyframes divider-shift {
          0% {
            transform: translateX(-38%);
          }
          50% {
            transform: translateX(38%);
          }
          100% {
            transform: translateX(-38%);
          }
        }

        @keyframes divider-sheen {
          0% {
            transform: translateX(-60%);
          }
          100% {
            transform: translateX(60%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .section-divider::before,
          .section-divider::after,
          .section-divider-dot {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}