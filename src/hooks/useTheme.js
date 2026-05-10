import { useMemo } from "react";

const useTheme = (state) => {
  const themeData = useMemo(() => {
    const currentTheme = state.themes?.find((theme) => theme.id === state.theme);

    if (currentTheme) {
      return {
        backgroundImage: currentTheme.backgroundImage || "none",
        border: currentTheme.border || "none",
      };
    }

    switch (state.theme) {
      case "cool":
      case "ocean":
        return {
          backgroundImage: "linear-gradient(to right bottom, lightblue, lightyellow)",
          border: "1px solid lightskyblue",
        };
      case "light":
        return {
          backgroundImage: "linear-gradient(to right bottom, whitesmoke, whitesmoke)",
          border: "1px solid whitesmoke",
        };
      default:
        return {
          backgroundImage: "none",
          border: "none",
        };
    }
  }, [state.theme, state.themes]);

  return themeData;
};

export default useTheme;
