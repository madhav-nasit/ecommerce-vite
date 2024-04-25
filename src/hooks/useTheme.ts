import { ThemeContext } from 'contexts';
import { useContext } from 'react';

/** Custom hook to use the theme */
export const useTheme = () => useContext(ThemeContext);
