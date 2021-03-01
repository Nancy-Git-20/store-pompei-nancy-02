import React from "react";

export default function CircleLoader() {
  return (
    <>
        <div className="Loader">
            <div className="contLoad">
                <svg className="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340" >
                    <circle cx="170" cy="170" r="160" stroke="#15caf6" />
                    <circle cx="170" cy="170" r="135" stroke="#404041" />
                    <circle cx="170" cy="170" r="110" stroke="#15caf6" />
                    <circle cx="170" cy="170" r="85" stroke="#404041" />
                </svg>
                <em>Cargando productos...</em>
            </div>
        </div>
    </>  
  );
}