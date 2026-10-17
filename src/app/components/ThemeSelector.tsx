"use client";

import { useTheme, type ThemePreference } from "@/context/ThemeContext";

interface ThemeSelectorProps {
  className?: string;
  isMobile?: boolean;
}

export default function ThemeSelector({ className = "", isMobile = false }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme();

  const options: { value: ThemePreference; label: string; icon: React.ReactNode }[] = [
    {
      value: "dark",
      label: "Dark theme (Cosmic Night)",
      icon: (
        <svg
          className="theme-btn-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ),
    },
    {
      value: "light",
      label: "Light theme (Cosmic Day)",
      icon: (
        <svg
          className="theme-btn-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ),
    },
    {
      value: "system",
      label: "Follow system preference",
      icon: (
        <svg
          className="theme-btn-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      ),
    },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Color theme selection"
      className={`theme-selector-group ${isMobile ? "is-mobile" : ""} ${className}`}
    >
      {options.map((opt) => {
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => setTheme(opt.value)}
            className={`theme-selector-btn ${isActive ? "is-active" : ""}`}
          >
            {opt.icon}
            {isMobile && <span className="theme-btn-label">{opt.value === "system" ? "Auto" : opt.value}</span>}
          </button>
        );
      })}
    </div>
  );
}
