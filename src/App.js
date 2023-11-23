import logo from './logo.svg';
import './App.css';
import Navigation from './coponents/Navigation';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import GlobalStyle from './styles/GlobalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AllProducts from './pages/AllProducts';
import Footer from './coponents/Footer';

const queryClient = new QueryClient();
// 라이브러리의 쿼리 변경에 대한 기본 설정 값

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <GlobalStyle />
      <div className='container'>
        <Navigation />
        <Routes>
          <Route path='/' element={<AllProducts/>} />
        </Routes>
        <Outlet/>
      </div>
    </AuthContextProvider>
    </QueryClientProvider>
    <Footer/>
    </>
  );
}

export default App;
