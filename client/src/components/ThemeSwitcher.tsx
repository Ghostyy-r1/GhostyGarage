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
  
  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-9 w-9 border-gray-700 bg-gray-900/80 hover:bg-gray-800 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {theme === 'light' && (
              <motion.div
                key="light"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sun className="h-4 w-4 text-amber-400" />
              </motion.div>
            )}
            {theme === 'dark' && (
              <motion.div
                key="dark"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Moon className="h-4 w-4 text-purple-400" />
              </motion.div>
            )}
            {theme === 'system' && (
              <motion.div
                key="system"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Laptop className="h-4 w-4 text-blue-400" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-gray-900 border border-gray-800"
        forceMount
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DropdownMenuLabel className="text-gray-300">Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-800" />
          {themes.map((t, index) => (
            <motion.div
              key={t.value}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
            >
              <DropdownMenuItem
                onClick={() => setTheme(t.value as 'light' | 'dark' | 'system')}
                className={`hover:bg-gray-800 text-gray-200 ${
                  theme === t.value ? "bg-gray-800/50" : ""
                }`}
              >
                {t.icon && <t.icon className={`mr-2 h-4 w-4 ${t.color}`} />}
                <span>{t.label}</span>
                {theme === t.value && (
                  <motion.span 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="ml-auto text-xs font-semibold text-purple-400"
                  >
                    Active
                  </motion.span>
                )}
              </DropdownMenuItem>
            </motion.div>
          ))}
          
          <DropdownMenuSeparator className="bg-gray-800" />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-gray-800 text-gray-200">
              <Globe className="mr-2 h-4 w-4 text-blue-400" />
              <span>Language</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-gray-900 border border-gray-800">
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang.value}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <DropdownMenuItem
                      onClick={() => setLanguage(lang.value)}
                      className={`hover:bg-gray-800 text-gray-200 ${
                        language === lang.value ? "bg-gray-800/50" : ""
                      }`}
                    >
                      <span>{lang.label}</span>
                      {language === lang.value && (
                        <motion.span 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="ml-auto text-xs font-semibold text-blue-400"
                        >
                          Active
                        </motion.span>
                      )}
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}