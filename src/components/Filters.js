import React, {useState, useContext} from 'react';
import { AppContext } from "../context/storeRewardsContext";
import Loader from './Loader';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {useStyles, AntSwitch} from '../data/config';


function Filters() {
    const { productsFetched, comboCategory, FilterProdcts, filterTerm, setFilterPrice, setFilterProducts, filterProducts,
      filterAlpha, OrderAlpha} = useContext(AppContext);
    
    const classes = useStyles();
    const [activeFilter, setActiveFilter] = useState('');

    const OrderByPrice = (orderType) => {
      let newOrderProds = [];
      setFilterPrice(orderType);
      if(orderType === "Lowest"){
        setActiveFilter("Lowest");
        newOrderProds = filterProducts.sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));
      }else{
        setActiveFilter("Highest");
        newOrderProds = filterProducts.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));
      }
      setFilterProducts(newOrderProds);
      
    }
    

  return (

    <div className="UserActions">

        <div className="container">
            {productsFetched 
             ?
                (
                    <>
                        <FormControl id="W-310" className={classes.formControl}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Categoría:
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-placeholder-label-label"
                                id="demo-simple-select-placeholder-label"
                                value={filterTerm}
                                onChange={(e) => FilterProdcts(e.target.value)}
                                className={classes.selectEmpty}
                                >
                                <MenuItem value="Todas">Todas</MenuItem>
                                {comboCategory.map((element, i) => (
                                    <MenuItem key={i} value={element}>{element}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Seleccionar categoría</FormHelperText>
                        </FormControl>
                        
                        <button name="Lowest" className={`BtnFilterPrice ${activeFilter === 'Lowest' ? 'active' : ''}`} onClick={(e) => OrderByPrice(e.target.name)}>Lowest price</button>
                        <button name="Highest" className={`BtnFilterPrice Lst ${activeFilter === 'Highest' ? 'active' : ''}`} onClick={(e) => OrderByPrice(e.target.name)}>Highest price</button>

                        <FormControl id="FilterAlpha" className={classes.formControl}>
                            <Typography component="div">
                                <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>Z-A</Grid>
                                <Grid item>
                                    <AntSwitch checked={filterAlpha} onChange={(e) => OrderAlpha(e.target.checked)} name="checkedAlpha" />
                                </Grid>
                                <Grid item>A-Z</Grid>
                                </Grid>
                            </Typography>
                        </FormControl>

                    </>
                )
             :  <div className="WrapLoaderIn"><em><span className="Loader Inline"><Loader/></span>cargando categorias y filtros...</em></div>
            }    
        </div>
    </div>

  );
}

export default Filters;
