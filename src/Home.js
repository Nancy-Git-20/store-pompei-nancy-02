import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Filters from './components/Filters';
import Products from './components/Products';
import Sidebar from './components/Sidebar';

function Home() {
  
  return (
   
    <div id="AppStoreInn">
     
      <Sidebar width={30} height={"100vh"}/>
       
      <Header/>

      <Banner bannerAlt="electronics"/>

      <Filters/>
      
      <Products />
      
    </div>

  );
}
export default Home;