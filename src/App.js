import "./App.css";
import Navbar from "./components/navbar/Navbar";
import ProductList from "./components/productList/ProductList";

function App() {
  return (
    <div className="grid__container">
      <header>
        <Navbar />
      </header>
      <main>
        <ProductList />
      </main>
      <footer>All Rights Reserved Desi Collection @2022</footer>
    </div>
  );
}

export default App;
