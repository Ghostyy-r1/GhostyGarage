import { useState, useEffect } from 'react';
import { Moon, Sun, Globe, Laptop } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

const themes = [
  { value: 'light', label: 'Light', icon: Sun, color: 'text-amber-400' },
  { value: 'dark', label: 'Dark', icon: Moon, color: 'text-purple-400' },
  { value: 'system', label: 'System', icon: Laptop, color: 'text-blue-400' },
];

const languages = [
  { value: 'en', label: 'English 🇺🇸' },
  { value: 'fr', label: 'Français 🇫🇷' },
  { value: 'es', label: 'Español 🇪🇸' },
  { value: 'de', label: 'Deutsch 🇩🇪' },
  { value: 'ja', label: '日本語 🇯🇵' },
];

export function ThemeSwitcher() {
  // Initialize from localStorage or default to dark
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'dark'
  );
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [mounted, setMounted] = useState(false);
  
  // Once mounted, we can show the theme switcher
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      
      root.classList.add(systemTheme);
      return;
    }
    
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    if (language) {
      localStorage.setItem('language', language);
      // In a real app, you would change the language here
    }
  }, [language]);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
  // Find current theme object
  const currentTheme = themes.find(t => t.value === theme) || themes[0];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-9 w-9 border-gray-700 bg-black/20 hover:bg-black/30"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'dark' ? (
              <Moon className="h-4 w-4 text-gray-200" />
            ) : (
              <Sun className="h-4 w-4 text-gray-200" />
            )}
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value as 'light' | 'dark' | 'system')}
            className={theme === t.value ? "bg-accent" : ""}
          >
            {t.icon && <t.icon className="mr-2 h-4 w-4" />}
            <span className={t.icon ? "" : "pl-6"}>{t.label}</span>
            {theme === t.value && (
              <span className="ml-auto text-xs font-semibold text-accent-foreground">
                Active
              </span>
            )}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Globe className="mr-2 h-4 w-4" />
            <span>Language</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  className={language === lang.value ? "bg-accent" : ""}
                >
                  <span>{lang.label}</span>
                  {language === lang.value && (
                    <span className="ml-auto text-xs font-semibold text-accent-foreground">
                      Active
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}