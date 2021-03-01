import React, {useState, useEffect } from "react";
import * as config from "../data/config";
import usePagination from "../components/Pagination";
import Product from "../components/Product";
//import usePrevious from '../components/use-previous';

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const[user, setUser] = useState([]);
    const[userFetched, setUserFetched] = useState(false);
    const[products, setProducts] = useState([]);
    const[productsFetched, setProductsFetched] = useState(false);
    const[filterProducts, setFilterProducts] = useState([]);
    const[filterTerm, setFilterTerm] = useState('Todas');
    const[filterPrice, setFilterPrice] = useState(true);
    const[filterAlpha, setFilterAlpha] = useState(false);
    const[initPoints, setInitPoints] = useState('');
    const[comboCategory, setComboCategory] = useState([]);
    const[xPosition, setX] = useState(104);
    const[history, setHistory ] = useState([]);
    const[historyFetched, setHistoryFetched] = useState(false);
    const[filterHistory, setFilterHistory] = useState(true);
    const[redeemProduct, setRedeemProduct] = useState(config.demoProd);
    const[postResponse, setPostResponse] = useState({
      info : '',
      status: ''
      });
    const[pointsResponse, setPointsResponse] = useState({
      info : '',
      status: ''
    });
    const[puntosCuentas, setPuntosCuentas] = useState(null);


    //const prevPoints = usePrevious(initPoints);

    /* Start Pagination config */
    const prodctsCount = filterProducts.length;
    let [page, setPage] = useState(1);
    const PER_PAGE = 16;

    const count = Math.ceil(prodctsCount / PER_PAGE);
    const _DATA = usePagination(filterProducts, PER_PAGE);
    
    const handlePageChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };
    const productsList = _DATA.currentData().map(product => (
      <Product
        key={product._id}
        id={product._id}
        name={product.name}
        cost={product.cost}
        category={product.category}
        img={product.img.hdUrl}
      />
  ));
    /* end  Pagination config*/

    useEffect(() => {
        getUser();
        getProducts();
        getHistory();   
    }, []);

    const getUser = () => {
        config.getUser().then((response) => {
            setUser(response.data);
            setUserFetched(true);
            setInitPoints(response.data.points)
        });
      };
    
    const getProducts = (Term) => {
        config.getProducts().then((response) => {
          setProducts(response.data);
          filterTerm === "Todas" ? setFilterProducts(response.data) : setFilterProducts([]);
          const cate_names = response.data.map((p) => p.category );
          const comboCategory = [...new Set(cate_names)];
          setComboCategory(comboCategory.sort());
          setProductsFetched(true);
      });
    }

    const getHistory = () => {
      config.getHistory().then((response) => {
          const histDesc = response.data.reverse();
          setHistory(histDesc);
          setHistoryFetched(true);
      });
    };

    const sendPostProduct = (productId) => {
      config.sendRedeemProd(productId)
        .then((response) => {
          setPostResponse({
            info : 'Ha canjeado sus puntos con éxito.',
            status: response.status
          });
          setPuntosCuentas(initPoints);
          getUser();
          getHistory();
        })
        .catch((error) => {
          setPostResponse({
            info : 'Se ha producido un error.',
            status: error
          });
        });
    };

    const sendPostPoints = (amount) => {
      config.getPoints(amount)
        .then((response) => {
          setPointsResponse({
            info : 'Ha canjeado sus puntos con éxito.',
            status: response.status
          });
          setPuntosCuentas(initPoints);
          getUser();
        })
        .catch((error) => {
          setPointsResponse({
            info : 'Se ha producido un error.',
            status: error
          });
          
        });  
    }


    const FilterProdcts = (Term) => {
      if(Term === "Todas"){
        setFilterProducts(products); setFilterTerm("Todas");
        setPage(1);
        _DATA.jump(1);
      }else{
        const newfilterProducts = products.filter((prod) => prod.category === Term);
        setPage(1);
        _DATA.jump(1);
        setFilterProducts(newfilterProducts); setFilterTerm(Term);
      }
    }
   
    const OrderProdcts = (ValueChecked) => {
      let isActive = ValueChecked; //->order Ascendente - menor a may
      let orderProds = [];
      setFilterPrice(ValueChecked);
      if(isActive){
        // -> ordenar < a >
        orderProds = filterProducts.sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));
      }else{
        orderProds = filterProducts.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));
      }
      setFilterProducts(orderProds);
    }

    const OrderAlpha = (ValueAlpha) => {
      let isActive = ValueAlpha; //->order AZ
      let orderProds = [];
      setFilterAlpha(ValueAlpha);
      
      if(isActive){
        orderProds = filterProducts.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
      }else{
        orderProds = filterProducts.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0)).reverse();
      }
      setFilterProducts(orderProds);
    }

    const toggleMenuUser = () => {
        if (xPosition === 104) {
        setX(69);
        } else {
        setX(104);
        }
    };

    const OrderHistory = (ValueChecked) => {
      let isActive = ValueChecked;
      let orderHist = [];
      setFilterHistory(ValueChecked);
      if(isActive){
        orderHist = history.reverse();
      }else{
        orderHist = history.reverse();
      }

    }



  return (
    <AppContext.Provider value={{ user, setUser, userFetched, setUserFetched, products, setProducts, getProducts, productsFetched, setProductsFetched,
      FilterProdcts, filterProducts, filterTerm, setFilterTerm, setFilterProducts, prodctsCount, count, page, PER_PAGE, handlePageChange, productsList,
      OrderProdcts, filterPrice, setFilterPrice, initPoints, setInitPoints, filterAlpha, OrderAlpha, comboCategory, setComboCategory,
      xPosition, toggleMenuUser, history, setHistory, historyFetched, filterHistory, setFilterHistory, OrderHistory, redeemProduct, setRedeemProduct,
      sendPostProduct, postResponse, setPostResponse, sendPostPoints, pointsResponse, setPointsResponse, puntosCuentas, setPuntosCuentas
      }}>
      {children}
    </AppContext.Provider>
  );
}
export default AppProvider;
