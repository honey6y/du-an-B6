
import Footer from './component/layout/footer/Footer';
import Header from './component/layout/header/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <ToastContainer autoClose={1400} />
      <Footer></Footer>
    </>
  );
}

export default App;
