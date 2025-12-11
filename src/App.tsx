import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import AppRoutes from './routes';

// ============================================
// App Component - Clean Entry Point
// All routing is now handled in routes/index.tsx
// with lazy loading for bundle optimization
// ============================================

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="athens-app-theme">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
