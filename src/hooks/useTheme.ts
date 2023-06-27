import { type Theme } from "~/models/Theme";
import { useEffect, useState } from "react";
import { themes } from "~/constants/theme";

export const useTheme = () => {
    const [selectedTheme, setSelectedTheme] = useState(themes.light);
    const switchTheme = (theme: Theme) => {
        switch (theme.title) {
            case 'light':
                localStorage.theme = 'light';
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                document.documentElement.style.backgroundColor = '#f9fafb';
                setSelectedTheme(themes.light);
                break;
            case 'dark':
                localStorage.theme = 'dark';
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                document.documentElement.style.backgroundColor = '#030712';
                setSelectedTheme(themes.dark);
                break;
            default:
                localStorage.theme = 'system';
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.style.backgroundColor = '#030712';
                    setSelectedTheme(themes.system);
                } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.backgroundColor = '#f9fafb';
                    setSelectedTheme(themes.system);
                }
        }
    };

    const switchSystemTheme = () => {
        switchTheme(themes.system)
    };

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQueryList.addEventListener('change', switchSystemTheme);

        return () => {
            mediaQueryList.removeEventListener('change', switchSystemTheme);
        };
    }, []);

    return { selectedTheme, setSelectedTheme: switchTheme };
};