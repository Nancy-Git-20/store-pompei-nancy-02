import React from 'react';
import {nameSection} from '../data/config'
import banner from '../assets/header-x2.png';

function Banner(props) {
   
    const {bannerAlt,bannerSection} = props;
    const subSection = bannerSection ? '/'+ bannerSection : '';
    
  return (

    <section className="Banner">
        <div className="container">
            <div className="Col-100">
                <figure>
                    <img src={banner} alt={bannerAlt}/>
                    <figcaption>{nameSection} {subSection}</figcaption>
                </figure>
            </div>      
        </div>
    </section>

  );
}

export default Banner;

