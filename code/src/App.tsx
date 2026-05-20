import { CssBaseline, ThemeProvider } from "@mui/material";
import getTheme from "./shared/utils/theme";
import { useAtom } from "jotai";
import { colorModeAtom } from "./shared/store/themeAtom";
import "./App.css";
import AuthRoute from "./router/AuthRoute";
import { Provider as JotaiProvider } from "jotai";
import FlashProvider from "./shared/components/message/FlashProvider";
import PopupProvider from "./shared/components/popup/PopupProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

function AppContent() {
    const [mode] = useAtom(colorModeAtom);

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <PopupProvider />
            <FlashProvider />
            <AuthRoute />
        </ThemeProvider>
    );
}

function App() {
    return (
        <JotaiProvider>
            <QueryClientProvider client={queryClient}>
                <div className="main-center-container">
                    <AppContent />
                </div>
            </QueryClientProvider>
        </JotaiProvider>
    );
}

export default App;