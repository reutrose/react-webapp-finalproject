import Icon from "@mdi/react";
import { mdiWhiteBalanceSunny } from "@mdi/js";
import { mdiMoonWaxingCrescent } from "@mdi/js";
import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		return sessionStorage.getItem("isDarkMode") === "true";
	});

	useEffect(() => {
		sessionStorage.setItem("isDarkMode", isDarkMode);
		document.body.className = isDarkMode
			? "bg-secondary text-light"
			: "bg-info-subtle text-dark";
	}, [isDarkMode]);

	const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

	const themeClasses = {
		bgColor: isDarkMode ? "bg-dark" : "bg-light",
		navColor: isDarkMode ? "bg-dark" : "bg-primary",
		fbColor: isDarkMode ? "bg-dark" : "bg-light",
		textColor: isDarkMode ? "text-light" : "text-dark",
		tableColor: isDarkMode ? "table-dark" : "table-light",
		symbol: isDarkMode ? (
			<Icon path={mdiWhiteBalanceSunny} size={1} />
		) : (
			<Icon path={mdiMoonWaxingCrescent} size={1} />
		),
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme, themeClasses }}>
			{children}
		</ThemeContext.Provider>
	);
};

ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
