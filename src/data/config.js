import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

export const nameSection = "Electronics";

export const demoProd = {
  "id":"id",
  "name": "name",
  "cost": "0"
};

const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA4ODcxYTdlNzE4NzAwMjBlMzhlZTAiLCJpYXQiOjE2MTExNzE2MTB9.gRqbCL86qsiOXjaSoQeyuhM5e-wjonyGpb4gZqIf6sk';
//const Token = '';

const UserUrlApi = 'https://coding-challenge-api.aerolab.co/user/me';

const ProductsUrlApi = 'https://coding-challenge-api.aerolab.co/products';

const HistoryUrlApi = 'https://coding-challenge-api.aerolab.co/user/history';

const RedeemUrlApi = 'https://coding-challenge-api.aerolab.co/redeem';

const PointsUrlApi = 'https://coding-challenge-api.aerolab.co/user/points';

// Asi funciona con fetch
// const headers = {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + Token
//     }
// }
//Asi funciona con AXIOS
const headers = {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' + Token,
  };


export const getUser = () => {
  return axios.get(UserUrlApi, { headers });
};

export const getProducts = () => {
  return axios.get(ProductsUrlApi, { headers });
};

export const getHistory = () => {
  return axios.get(HistoryUrlApi, { headers });
};

export const sendRedeemProd = (productId) => {
  const body = {
    productId,
  };
  return axios.post(RedeemUrlApi, body, { headers });
};

export const getPoints = (amount) => {
  const body = {
    amount,
  };
  return axios.post(PointsUrlApi, body, { headers });
};


/*MATERIAL*/

export const useStyles = makeStyles((theme) => ({
  formControl: {
    "& .MuiFormLabel-root.Mui-focused":{
      color:"#15caf6"
    },
    margin: theme.spacing(1),
    minWidth: 310,
    width: 310,
    display:'inline-block'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);