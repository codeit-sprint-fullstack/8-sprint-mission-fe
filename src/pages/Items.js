
import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemList from '../components/Items/ItemList';

const Items = () => {

  return (
    <div className="items-container">
      <Header />
      <main>
        <ItemList />
      </main>
      <Footer />
    </div>
  );
};

export default Items;