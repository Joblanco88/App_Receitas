import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

export default function Meals() {
  return (
    <div>
      <Header
        title="Meals"
      />
      <Recipes />
      <Footer />
    </div>
  );
}
