import { CssBaseline, ThemeProvider } from '@mui/material';
import getTheme from './shared/utils/theme';
import { useAtom } from 'jotai';
import { colorModeAtom } from './shared/store/themeAtom';
import './App.css';
import AuthRoute from './router/AuthRoute';
import { Provider as JotaiProvider } from 'jotai';
import FlashProvider from './shared/components/message/FlashProvider';
import PopupProvider from './shared/components/popup/PopupProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false
        }
    }
});

function App() {
    const [mode] = useAtom(colorModeAtom);
    const theme = getTheme(mode);


    return (
        <div className="main-center-container">
            <JotaiProvider>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <PopupProvider />
                        <FlashProvider />
                        <AuthRoute />
                    </ThemeProvider>
                </QueryClientProvider>
            </JotaiProvider>
        </div>
    );
}

export default App;
