import {environment} from "../../environments/environment";

const {API} = environment;

const urls = {
  auth: {
    auth: `${API}/auth`,
    refresh: `${API}/auth/refresh`
  },
  orders: {
    orders: `${API}/orders`,


  }
};

export {
  urls
};
