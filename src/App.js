import logo from './logo.svg';
import './App.css';
import Navigation from './coponents/Navigation';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Navigation />
      <Outlet/>
    </>
  );
}

export default App;
