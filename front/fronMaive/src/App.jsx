
import RouteConfig from './routes/RouteConfig';
import { RegProvider } from './context/RegContext';
import { useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
function App() {

  useEffect(() => {
    const handleUnload = () => {
      fetch('http://localhost:8282/api/shutdown', { method: 'POST' });
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);
  return (
    <RegProvider>
      <Router>
        <RouteConfig />
      </Router>
    </RegProvider>
  );
}

export default App;
