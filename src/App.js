import logo from './logo.svg';
import './App.css';
import Footer from './component/layout/footer/Footer';
import Header from './component/layout/header/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default App;
