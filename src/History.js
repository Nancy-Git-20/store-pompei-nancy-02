import React, {useContext} from 'react';
import { NavLink } from "react-router-dom";
import { AppContext } from "./context/storeRewardsContext";
import Header from './components/Header';
import Banner from './components/Banner';
import Sidebar from './components/Sidebar';
import ProductRedeem from "./components/ProductRedeem";
import CircleLoader from './components/CircleLoader';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {useStyles, AntSwitch} from './data/config';

function History() {

  const {history, historyFetched, filterHistory, OrderHistory } = useContext(AppContext);
  
  const classes = useStyles();

  let ListRedeem;
  if( history.length === 0 ){
    ListRedeem = <h6>Todavía no ha canjeado <br/> ningún producto.</h6>;
  }else{
    ListRedeem = history.map((product, index) => (
      <ProductRedeem
        key={index + '-' + product._id}
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
     
     <div id="History">
      
        <Sidebar width={30} height={"100vh"}/>
        
        <Header/>

        <Banner bannerAlt="electronics" bannerSection="history" />

        <div className="HistRedeem">
          <div className="container">
            {historyFetched
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
                      <div className="ProdGrid">{ListRedeem} </div>

                      <NavLink exact to="/" >
                        <button className="btnAll w40" > Volver </button>
                      </NavLink>
                    </>
                  )  
                : <CircleLoader/>
                
            }
          </div>  
        </div>


             
      </div>
    
  );
}

export default History;