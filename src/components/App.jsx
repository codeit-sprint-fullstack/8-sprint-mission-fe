import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import './css/common.css';

function App({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default App;