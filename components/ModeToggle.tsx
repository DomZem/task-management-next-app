'use client';

import { useTheme } from 'next-themes';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { Switch } from './UI/Switch';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className="flex items-center justify-center rounded-md bg-primaryLightGrey py-3 dark:bg-primaryVeryDarkGrey">
      <div className="flex items-center gap-x-4">
        <IoMdSunny className="text-xl text-primaryMediumGrey" />

        <Switch
          checked={theme === 'dark'}
          onCheckedChange={handleThemeChange}
        />

        <IoMdMoon className="text-xl text-primaryMediumGrey" />
      </div>
    </div>
  );
}
