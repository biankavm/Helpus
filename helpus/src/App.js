import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes';
import { AuthProvider } from 'contexts';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}
