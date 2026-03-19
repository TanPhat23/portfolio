import { useEffect, useMemo, useState } from 'react'
import { MoonStar, SunMedium, LaptopMinimal } from 'lucide-react'

type ThemeMode = 'light' | 'dark' | 'auto'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'auto'
  }

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored
  }

  return 'auto'
}

function getResolvedTheme(mode: ThemeMode) {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode
}

function applyThemeMode(mode: ThemeMode) {
  if (typeof window === 'undefined') return

  const resolved = getResolvedTheme(mode)
  const root = document.documentElement

  root.classList.remove('light', 'dark')
  root.classList.add(resolved)

  if (mode === 'auto') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', mode)
  }

  root.style.colorScheme = resolved
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('auto')
  const resolvedTheme = useMemo(() => getResolvedTheme(mode), [mode])

  useEffect(() => {
    const initialMode = getInitialMode()
    setMode(initialMode)
    applyThemeMode(initialMode)
  }, [])

  useEffect(() => {
    if (mode !== 'auto' || typeof window === 'undefined') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyThemeMode('auto')

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [mode])

  function toggleMode() {
    const nextMode: ThemeMode =
      mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light'

    setMode(nextMode)
    applyThemeMode(nextMode)
    window.localStorage.setItem('theme', nextMode)
  }

  const label =
    mode === 'auto'
      ? 'Theme mode: auto (system). Click to switch to light mode.'
      : `Theme mode: ${mode}. Click to switch mode.`

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)]/85 px-4 text-sm font-semibold text-[color:var(--foreground)] shadow-[0_1px_0_var(--inset-glint)_inset,0_10px_24px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-[color:var(--ring)]"
    >
      {resolvedTheme === 'dark' ? (
        <MoonStar className="h-4.5 w-4.5 text-[color:var(--primary)]" />
      ) : mode === 'auto' ? (
        <LaptopMinimal className="h-4.5 w-4.5 text-[color:var(--primary)]" />
      ) : (
        <SunMedium className="h-4.5 w-4.5 text-[color:var(--primary)]" />
      )}
      <span className="hidden sm:inline">
        {mode === 'auto' ? 'Auto' : mode === 'dark' ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}