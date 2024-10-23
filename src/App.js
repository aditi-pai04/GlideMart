import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import UserHome from './UserHome';
import ProductDetails from './ProductDetails';
import MyCart from './MyCart';
import MyWishlist from './MyWishlist'
import SupportPage from './SupportPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={UserHome} />
        <Route exact path="/product-details" component={ProductDetails} />
        <Route exact path="/cart" component={MyCart} />
        <Route exact path="/wishlist" component={MyWishlist} />
        <Route exact path="/support" component={SupportPage} />
      </Switch>
    </Router>
  );
}

export default App;
