import React, {useContext, useRef} from 'react';
import { Link } from "react-router-dom";
import { AppContext } from "../context/storeRewardsContext";
import ProductRedeem from "./ProductRedeem";
import worker from '../assets/worker.png';
import coin from '../assets/icons/coin.svg';
import Modal from './Modal';
import ModalBuy from './ModalBuy';
import Loader from './Loader';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {useStyles, AntSwitch} from '../data/config';


function Sidebar({width, height, children}) {
    const { user, userFetched, xPosition, toggleMenuUser, history, historyFetched, filterHistory, OrderHistory } = useContext(AppContext);

    const modalBuy = useRef(null);

    const modalBuyClose = (e) => {
      modalBuy.current.close();
    }


    const classes = useStyles();
    let ListRedeem;
    if( history.length === 0 ){
      ListRedeem = <h6>Todavía no ha canjeado <br/> ningún producto.</h6>;
    }else{
      ListRedeem = history.slice(0,3).map( (product, index) => (
        <ProductRedeem
          key={index}
          idOp={product._id}
          idProd={product.productId}
          category={product.category}
          cost={product.cost}
          createDate={product.createDate}
          name={product.name}
          img={product.img.hdUrl}
        />
      ));
    }
  
  return (
    <div className={`side-bar W-${xPosition}`}
        style={{
          transform: `translatex(${xPosition}vw)`,
          width: `${width}vw`,
          minHeight: height
        }}
      >
        <button
          onClick={() => toggleMenuUser() }
          className="toggle-menu"
          style={{
            transform: `translate(${-10}px, 20vh)`
          }}
        ></button>

        <div className="content">
            <div className="CloseBtn" onClick={() => toggleMenuUser() }>
              <svg id="Layer_1" x="0px" y="0px" viewBox="0 0 286.054 286.054" width="40" height="40">
                <g>
                  <path style={{fill:'#6ee8ff'}} d="M168.352,142.924l25.28-25.28c3.495-3.504,3.495-9.154,0-12.64l-12.64-12.649
                    c-3.495-3.486-9.145-3.495-12.64,0l-25.289,25.289l-25.271-25.271c-3.504-3.504-9.163-3.504-12.658-0.018l-12.64,12.649
                    c-3.495,3.486-3.486,9.154,0.018,12.649l25.271,25.271L92.556,168.15c-3.495,3.495-3.495,9.145,0,12.64l12.64,12.649
                    c3.495,3.486,9.145,3.495,12.64,0l25.226-25.226l25.405,25.414c3.504,3.504,9.163,3.504,12.658,0.009l12.64-12.64
                    c3.495-3.495,3.486-9.154-0.009-12.658L168.352,142.924z M143.027,0.004C64.031,0.004,0,64.036,0,143.022
                    c0,78.996,64.031,143.027,143.027,143.027s143.027-64.031,143.027-143.027C286.054,64.045,222.022,0.004,143.027,0.004z
                    M143.027,259.232c-64.183,0-116.209-52.026-116.209-116.209s52.026-116.21,116.209-116.21s116.209,52.026,116.209,116.209
                    S207.21,259.232,143.027,259.232z"/>
                </g>
              </svg>
            </div>

            <div className="Userinfo">
                {/* {children} */}
                <figure><img src={worker} alt={user.name} /></figure>
                <h2 className="UserName">Hola  {" "}
                    {
                        userFetched 
                        ? ( <strong>
                                {user.name} {" "}
                                <span className="Points">{user.points} <img src={coin} alt="Puntos"/></span>
                                <span className="BuyPoints" onClick={ ()=> modalBuy.current.open() }>&nbsp;</span>
                                
                            </strong>
                            ) 
                        : <em><span className="Loader Inline"><Loader/></span>cargando usuario...</em>
                    }
                </h2>
            </div>
            <div className="HistRedeem">
                    {
                        historyFetched
                        ? ( 
                            <>
                              <div className="WrpTitle">
                                <h3>Productos canjeados:</h3>
                                <FormControl id="FilterHistory" className={classes.formControl}>
                                    <Typography component="div">
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                        <Grid item>Más antiguo</Grid>
                                        <Grid item>
                                            <AntSwitch checked={filterHistory} onChange={(e) => OrderHistory(e.target.checked)} name="checkedHistory" />
                                        </Grid>
                                        <Grid item>Más reciente</Grid>
                                        </Grid>
                                    </Typography>
                                </FormControl>
                              </div>

                              <div>{ListRedeem} </div>

                              {history.length > 0
                                ? (<Link to="/history" >
                                  <button className="btnAll" onClick={() => toggleMenuUser() }> Ver todos los productos canjeados</button>
                                </Link>)
                                : ''
                              }

                            </>
                          )  
                        : <em><span className="Loader Inline"><Loader/></span>cargando historial...</em>
                    }
                   
            </div>

        </div>
        <Modal ref={modalBuy} >
            <ModalBuy modalBuyClose={modalBuyClose} />
        </Modal>
    </div>

  );
}

export default Sidebar;
