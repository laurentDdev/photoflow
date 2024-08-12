import React, {useEffect} from 'react';


export type ThemeContextType = {
    theme: string,
    toggleTheme: () => void

}

export const ThemeContext = React.createContext({})

const ThemeProvider = ({children}: {children: React.ReactNode}) => {

    const [theme, setTheme] = React.useState('light');

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        if (localTheme) {
            setTheme(localTheme);
        }
    }, []);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            window.localStorage.setItem('theme', 'dark');
        } else {
            setTheme('light');
            window.localStorage.setItem('theme', 'light');
        }
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;