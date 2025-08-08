import Header from "./components/header";
import Footer from "./components/footer";
import "./css/app.css";
import CardItemList from "./components/cardItemList";
function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <CardItemList />
        <Footer />
      </div>
    </>
  );
}

export default App;
