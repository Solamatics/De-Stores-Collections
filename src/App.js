import "./App.css";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="grid__container">
      <header>
        <Navbar />
      </header>
      <main>Product List</main>
      <footer>All Rights Reserved Desi Collection @2022</footer>
    </div>
  );
}

export default App;
