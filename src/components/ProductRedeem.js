import React from 'react';

function ProductRedeem(props) {
    const {idOp, category, cost, createDate, name, img} = props;
    const str = createDate;
    const date = str.substring(0, 10);//YYYY-MM-DD

    const fields = date.split('-');
    const year   = fields[0];
    const month  = fields[1];
    const day    = fields[2]
    const dateOk  = day+'/'+month+'/'+year;  

  return (
    
    <div id={idOp} className="Product Redeem">
        <figure>
            <img src={img} alt={name}/>
        </figure>
        <div className="Info">
            <p>{category}</p>
            <h4> <strong>{name}</strong> | {cost} points</h4>
            <p> Canjeado el: {dateOk} </p>
            <p> ID: {idOp} </p>
        </div>
    </div>
    
  );
}

export default ProductRedeem;
