import React, { createContext, useMemo, useState } from 'react';
import { GetItem, SetItem } from 'storage-utility';
import useCustomEffect from '../Hooks/useCustomEffect.hook';

const THEME_STORE_KEY = 'theme'; // Localstorage key to store theme value.
const THEME_MODE_STORE_KEY = 'theme_mode'; // Localstorage key to store theme mode value.
const SPACING_STORE_KEY = 'spacing'; // Localstorage key to store spacing value.
const TABLE_BORDER_STORE_KEY = 'table_border'; // Localstorage key to store table border value.

export interface ThemeContextProps {
    theme: string;
    mode: ModeOptions;
    spacing: SpacingOptions;
    tableBorder: boolean;
    sidebarExpand?: boolean;
    setTheme: (theme: string) => void;
    setMode: (mode: ModeOptions) => void;
    setSpacing: (spacing: SpacingOptions) => void;
    setTableBorder: (state: boolean) => void;
    setSidebarExpand: Function;
}

export type ModeOptions = 'sync' | 'light' | 'default' | 'dark';
export type SpacingOptions = 'compact' | 'comfort' | 'relax';

/**
 * Theme Context.
 */
export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'default',
    mode: 'default',
    spacing: 'compact',
    tableBorder: true,
    sidebarExpand: false,
    setTheme: () => {},
    setMode: () => {},
    setSpacing: () => {},
    setSidebarExpand: () => {},
    setTableBorder: () => {},
});

/**
 * Theme Context Provider.
 *
 * @param value string
 * @param children ReactNode
 * @returns ReactNode
 */
export const ThemeContextProvider = ({
    value = 'default',
    mode: propMode = 'default',
    children,
}: {
    value?: string;
    mode?: ModeOptions;
    children: React.ReactNode;
}) => {
    const [theme, setTheme] = useState(value);
    const [mode, setMode] = useState(propMode);
    const [spacing, setSpacing] = useState<SpacingOptions>('compact');
    const [tableBorder, setTableBorder] = useState<boolean>(true);
    const [sidebarExpand, setSidebarExpand] = useState(false);

    useCustomEffect(() => {
        const storeTheme = GetItem(THEME_STORE_KEY);
        const spacing = GetItem(SPACING_STORE_KEY);
        const tableBorder = GetItem(TABLE_BORDER_STORE_KEY);

        applyTheme(storeTheme || 'default');
        handleSpacingChange(spacing || 'compact');
        handleTableBorderChange(tableBorder !== null ? tableBorder : true);

        if (mode === 'sync') {
            window
                .matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', handleSchemeChange);
        }

        return () => {
            if (mode === 'sync') {
                window
                    .matchMedia('(prefers-color-scheme: dark)')
                    .removeEventListener('change', handleSchemeChange);
            }
        };
    }, [mode]);

    /**
     * Apply theme to 'html' tag on DOM.
     *
     * @param theme string
     */
    const applyTheme = (theme: string = 'default', propMode?: ModeOptions) => {
        let newTheme = theme;
        const html = document.getElementsByTagName('html')[0];
        const storeMode = GetItem(THEME_MODE_STORE_KEY);

        const currentMode = propMode || storeMode || mode;

        if (
            currentMode === 'dark' ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches && currentMode === 'sync')
        ) {
            newTheme = 'dark';
        } else {
            SetItem(THEME_STORE_KEY, newTheme);
            setTheme(newTheme);
        }

        if (propMode || storeMode) {
            setMode(currentMode);
            if (propMode) {
                SetItem(THEME_MODE_STORE_KEY, propMode);
            }
        }

        if (currentMode === 'dark' || currentMode === 'sync') {
            if (newTheme === 'dark') {
                (html as any).classList.add('dark');
            } else {
                (html as any).classList.remove('dark');
            }
        } else {
            (html as any).classList.remove('dark');
        }

        (html as any).setAttribute('data-theme', newTheme);
    };

    /**
     * Handle Theme change.
     *
     * @param theme string
     */
    const handleThemeChange = (theme: string) => {
        setTheme(theme);
        applyTheme(theme);
    };

    /**
     * Handle Theme Mode change.
     *
     * @param mode string
     */
    const handleModeChange = (mode: ModeOptions) => {
        applyTheme(theme, mode);
    };

    /**
     * Handle Color Scheme changes ( i.e. OS's Dark mode ).
     *
     * @param e MediaQueryListEvent
     */
    const handleSchemeChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
            applyTheme('dark');
        } else {
            applyTheme(GetItem(THEME_STORE_KEY));
        }
    };

    const handleSpacingChange = (spacing: SpacingOptions) => {
        const html = document.getElementsByTagName('html')[0];
        (html as any).setAttribute('data-spacing', spacing);

        setSpacing(spacing);
        SetItem(SPACING_STORE_KEY, spacing);
    };

    const handleTableBorderChange = (state: boolean) => {
        const html = document.getElementsByTagName('html')[0];
        (html as any).setAttribute('data-table-border', state);

        setTableBorder(state);
        SetItem(TABLE_BORDER_STORE_KEY, state);
    };

    /**
     * Current context value for theme.
     */
    const val = useMemo(
        () => ({
            theme,
            mode,
            spacing,
            tableBorder,
            sidebarExpand,
            setTheme: handleThemeChange,
            setMode: handleModeChange,
            setSpacing: handleSpacingChange,
            setTableBorder: handleTableBorderChange,
            setSidebarExpand,
        }),
        [theme, mode, spacing, tableBorder, sidebarExpand]
    );

    return <ThemeContext.Provider value={val}>{children}</ThemeContext.Provider>;
};
