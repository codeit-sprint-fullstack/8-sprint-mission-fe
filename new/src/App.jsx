import MarketPage from "../../src/pages/MarketPage/MarketPage.jsx";
import Header from "../../src/components/Layout/Header.jsx";

function App() {
  return (
    <>
      {/* Global Navigation Bar */}
      <Header />

      <div className="withHeader">
        <MarketPage />
      </div>
    </>
  );
}

export default App;
