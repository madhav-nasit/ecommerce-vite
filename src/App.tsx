import { AppRouter } from 'routers';
import { AuthProvider } from 'contexts';
import 'src/App.css';

/**
 * App.tsx
 * Entry point for react app
 */
const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
