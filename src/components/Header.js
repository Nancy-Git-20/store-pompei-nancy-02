import React, {useContext, useRef} from 'react';
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/storeRewardsContext";
import logo from '../assets/aerolab-logo.svg';// Tell Webpack this JS file uses this image
import coin from '../assets/icons/coin.svg';
import Modal from './Modal';
import ModalBuy from './ModalBuy';
import Loader from './Loader';

function Header() {
    const { user, userFetched, toggleMenuUser } = useContext(AppContext);
    
    const modalBuy = useRef(null);

    const modalBuyClose = (e) => {
      modalBuy.current.close();
    }
    
  return (

    <header>
        <div className="container">
            <div className="ColLeft">
              <NavLink to="/" exact={true} activeClassName="Acti-ve Nav-Link">
                <h1><img className="Logo" src={logo} alt="Logo"/></h1>
              </NavLink>  
            </div>
            <div className="ColRight">
                <h2 className="UserName">
                {
                  userFetched
                    ? ( <strong>
                          <em className="UsName">Hola <strong>{user.name}</strong> </em>
                          <span className="Points">{user.points} <img src={coin} alt="Puntos"/></span>
                          <span className="BuyPoints" onClick={ ()=> modalBuy.current.open() }>&nbsp;</span>
                          <span className="Config" onClick={() => toggleMenuUser() }>&nbsp;</span>
                        </strong>
                      ) 
                    : <em><span className="Loader Inline"><Loader/></span>cargando usuario...</em>
                }
                </h2>
            </div>       

        </div>

        <Modal ref={modalBuy} >
            <ModalBuy modalBuyClose={modalBuyClose} />
        </Modal>
    </header>

  );
}

export default Header;
