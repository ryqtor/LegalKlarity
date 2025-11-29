"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Home, User, Briefcase, FileText } from "lucide-react"
import { cn } from "../../lib/utils"
import ThemeToggle from "../../components/ThemeToggle"

type LucideIcon = typeof Home

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  actions?: {
    name: string
    url: string
    primary?: boolean
  }[]
}

export function NavBar({ items, className, actions }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 pt-6 px-4",
        className,
      )}
    >
      <div className="glass-panel relative max-w-7xl mx-auto flex items-center justify-between gap-4 py-3 px-6 rounded-full shadow-2xl ring-1 ring-white/20 dark:ring-white/10">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src="/logo.png" alt="LegalKlarity" className="h-8 w-8 object-cover rounded-full" />
        </Link>

        {/* Nav Items */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors whitespace-nowrap",
                  "text-gray-950/80 dark:text-white/80",
                  isActive && "bg-gray-100 dark:bg-white/10 text-primary dark:text-primary",
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={20} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary/10 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                      <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </div>

        {/* Right Side: Theme Toggle & Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {actions && actions.length > 0 && (
            <div className="flex items-center gap-2">
              {actions.map((action) => (
                <Link
                  key={action.name}
                  to={action.url}
                  className={cn(
                    "text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap",
                    action.primary
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {action.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}