import React, {useState} from "react";


export const OptionroomThemeContext = React.createContext({
    theme: 'primary',
    background: null,
    isSidebarOpen: false,
    changeSidebarIsOpen: () => {

    },
    changeTheme: () => {
    },
});

// Defining a simple HOC component
const OptionroomThemeContextProvider = (props) => {
    const [theme, setTheme] = useState('primary');
    const [background, setBackground] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleChangeSidebarIsOpen = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    const handleChangeTheme = async (newTheme, mainBackground) => {
        setTheme(newTheme);
        setBackground(mainBackground);
    };


    return (
        <OptionroomThemeContext.Provider
            value={{
                theme: theme,
                background: background,
                isSidebarOpen: isSidebarOpen,
                changeTheme: handleChangeTheme,
                changeSidebarIsOpen: handleChangeSidebarIsOpen,
            }}
        >
            {props.children}
        </OptionroomThemeContext.Provider>
    );
};

export default OptionroomThemeContextProvider;
