import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import './css/common.css';

function App() {
  return (
    <>
      <Header />
      <div><Outlet /></div>
      <Footer />
    </>
  );
}

export default App;