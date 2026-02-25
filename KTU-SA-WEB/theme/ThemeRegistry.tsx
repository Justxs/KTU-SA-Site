'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    cssVariables: true,
    typography: {
        fontFamily: "'PFDinTextPro-Regular', 'PFDinTextPro-Medium', 'PFDinTextPro-Bold', sans-serif",
    },
});

export default function ThemeRegistry({ children }: Readonly<{ children: React.ReactNode }>) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
