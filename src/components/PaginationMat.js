import React, {useContext} from 'react';
import { AppContext } from "../context/storeRewardsContext";

import { Pagination } from "@material-ui/lab";

function PaginationMat() {
    const { prodctsCount, count, page, PER_PAGE, handlePageChange } = useContext(AppContext);
    let Txt;

    if(prodctsCount < PER_PAGE && page === 1){
        Txt = prodctsCount + ' of ' + prodctsCount + 'products'
    }else if(prodctsCount >= PER_PAGE && page === 1){
        Txt = PER_PAGE + ' of ' + prodctsCount + 'products'
    }else if(prodctsCount >= PER_PAGE && page === 2){
        Txt = prodctsCount + ' of ' + prodctsCount + 'products'
    }

  return (
    <div className="Paginate">
        <div className="cont-ainer">
            <div className="FullWidth PagInfo">
                
                <p>{Txt}</p>
                
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                />
                
            </div>
        </div>        
    </div>
  );
}

export default PaginationMat;
