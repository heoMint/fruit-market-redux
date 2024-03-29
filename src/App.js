import React from 'react';
import Nav from './components/Nav';
import ItemListContainer from './pages/ItemListContainer';
import NotificationCenter from './components/NotificationCenter';
import './App.css';
import './variables.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
      </Routes>
      <NotificationCenter />
      <img
        src= '../public/images/cart-icon.png'
        alt="logo_foot"
      />
    </Router>
  );
}

export default App;
