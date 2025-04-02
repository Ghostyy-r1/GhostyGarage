import { useState } from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
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
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: null },
];

const languages = [
  { value: 'en', label: 'English 🇺🇸' },
  { value: 'fr', label: 'Français 🇫🇷' },
  { value: 'es', label: 'Español 🇪🇸' },
  { value: 'de', label: 'Deutsch 🇩🇪' },
  { value: 'ja', label: '日本語 🇯🇵' },
];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [language, setLanguage] = useState('en');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    
    // This would be implemented with a proper theme system in a real app
    // Just simulating the visual effect for now
    document.documentElement.classList.toggle('dark');
  };
  
  const currentThemeIcon = theme === 'dark' ? Moon : Sun;
  
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