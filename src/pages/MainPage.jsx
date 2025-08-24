import Footer from '../Componet/Footer';
import Header from '../Componet/Header';
import AdCard from '../Componet/AdCard';
import ShopCard from '../Componet/ShopCard';

export default function MainPage() {
  return (
    <>
      <Header />
      <AdCard />
      <ShopCard value={0} />
      <ShopCard value={1} />
      <ShopCard value={2} />
      <AdCard children={1} />
      <Footer />
    </>
  );
}
