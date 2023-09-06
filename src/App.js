
import './App.css';
import { Link, Route, Routes } from "react-router-dom";
import Home from './Home';
import FoodDetails from './FoodDetails';
function App() {
  return (
    <div class="container">
      <div class="row ng-scope">
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/odahmos-food-app" element={<Home />} />
        <Route path="/food/:foodId" element={<FoodDetails/>}/>
      </Routes>
      {/*
                Route between 2 components depending on the path:
                1. Home page ("/")
                2. Products Page ("/products")
                
                ** Home Page **
                • Can be a basic home page, maybe welcoming the user to your site and giving some background about yourself as a developer
                
                ** Products Page **
                • Using an array of data for your products (provided for you), map over that data to show each item and some information on the products page as a list of available products.
            */}
        </div>
    </div>
  );
}

export default App;
