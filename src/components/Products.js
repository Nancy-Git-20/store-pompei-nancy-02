import React, {useContext} from 'react';
import { AppContext } from "../context/storeRewardsContext";
import PaginationMat from './PaginationMat';
import CircleLoader from './CircleLoader';

function Products() {
    
    const {productsFetched, productsList } = useContext(AppContext);

  return (

    <section className="SectProds">
        <div className="container">
           
            <div className="FullWidth">
              
                <div className="Products">
                    {
                        productsFetched 
                        ? (
                            <>
                            <PaginationMat />
                            <div className="WrapProds">
                                {productsList}
                            </div>    
                            <PaginationMat />
                            </>
                        )  
                        :  <CircleLoader/>
                    }    
                </div>

            </div>       

        </div>
    </section>

  );
}

export default Products;
