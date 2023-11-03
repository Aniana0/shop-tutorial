import logo from './logo.svg';
import './App.css';
import Navigation from './coponents/Navigation';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <>
    <AuthContextProvider>
      <Navigation />
      <Outlet/>
    </AuthContextProvider>
    </>
  );
}

export default App;
