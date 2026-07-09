'use client';

import { useI18n } from '@/lib/i18n/context';
import { Locale } from '@/lib/i18n/types';
import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils/cn';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {languages.map(lang => (
        <Button
          key={lang.code}
          variant={locale === lang.code ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLocale(lang.code)}
          className="flex items-center gap-1 px-2 py-1 text-sm"
          aria-label={`Switch to ${lang.label}`}
        >
          <span>{lang.flag}</span>
          <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
        </Button>
      ))}
    </div>
  );
}
