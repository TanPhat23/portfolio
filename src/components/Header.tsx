import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { ArrowRight, ChevronRight, Menu, PanelTop, Sparkles, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '#/components/ui/sheet'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils' // Hàm tiện ích mặc định của shadcn

type NavItem = {
  label: string
  href: string
  isExternal?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Header() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Tối ưu scroll listener: chỉ cập nhật state khi giá trị thực sự thay đổi
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Tự động đóng menu mobile khi chuyển trang
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const activeLabel = useMemo(() => {
    const current = NAV_ITEMS.find((item) => 
      item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
    )
    return current?.label ?? 'Home'
  }, [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-border bg-background/80 backdrop-blur-md py-2 shadow-sm'
          : 'border-transparent bg-transparent py-4'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo Section */}
        <Link 
          to="/" 
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <PanelTop className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight">TanStack Port</span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase">Dev Core</span>
          </div>
        </Link>

        {/* Desktop Nav - Sử dụng cấu trúc ul/li tối giản */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border bg-card/50 p-1 shadow-inner">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href as any}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  )}
                  activeProps={{
                    className: "bg-background text-primary shadow-sm",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Active Badge (Desktop only) */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border bg-secondary/50 px-3 py-1 text-[11px] font-medium text-secondary-foreground">
            <Sparkles className="h-3 w-3 text-yellow-500" />
            <span>{activeLabel}</span>
          </div>

          <ThemeToggle />

          {/* Mobile Menu (Shadcn Sheet) */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col gap-6 pt-12">
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <PanelTop className="h-5 w-5 text-primary" />
                    Navigation
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col gap-2">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href as any}
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
                      activeProps={{
                        className: "bg-accent text-primary font-semibold",
                      }}
                    >
                      {item.label}
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto border-t pt-6">
                  <Button className="w-full gap-2 group">
                    Contact Me
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}