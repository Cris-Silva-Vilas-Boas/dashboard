import React, {createContext, useState, useContext} from 'react';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

interface IThemeContext{
    toggleTheme(): void;
    theme: ITheme;
}

type Props = {
    children?: React.ReactNode
  };

interface ITheme{
    title: string,
    color: {
        primary: string,
        secondary: string,
        tertiary: string,

        white: string,
        black: string,
        gray: string,

        sucess: string,
        info: string,
        warning: string
    }
}


const ThemeContext = createContext<IThemeContext>({} as IThemeContext);
const ThemeProvider: React.FC <Props> = ({children}) =>{
    const[theme, setTheme] = useState<ITheme>(() => {
        const themeSalved = localStorage.getItem('@minha-carteira:theme');
        if(themeSalved){
            return JSON.parse(themeSalved);
        }else{
            return dark
        }
    });
    
    const toggleTheme = () =>{
        if(theme.title === 'dark'){
            setTheme(light);
            localStorage.setItem('@minha-carteira:theme', JSON.stringify(light));
        }else{
            setTheme(dark);
            localStorage.setItem('@minha-carteira:theme', JSON.stringify(dark));
        }
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );

}

    function useTheme(): IThemeContext{
        const context = useContext(ThemeContext);
        return context;
    }


export {ThemeProvider, useTheme};
  


