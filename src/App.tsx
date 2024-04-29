import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Bounce, ToastContainer } from 'react-toastify';
import { AppRouter } from 'routers';
import { AuthProvider } from 'contexts';
import { useTheme } from 'hooks';
import 'src/App.css';
import 'react-toastify/dist/ReactToastify.css';

// Create a client
export const queryClient = new QueryClient();

/**
 * App.tsx
 * Entry point for react app
 */
const App = () => {
  // returns current theme mode: light | dark
  const { theme } = useTheme();
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
        <ToastContainer theme={theme} transition={Bounce} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
