import {environment} from "../../environments/environment";

const {API} = environment;

const auth = `${API}/auth`;
const orders = `${API}/orders`;
const user = `${API}/users`;

const urls = {
  auth: {
    login: auth,
    refresh: `${auth}/refresh`
  },
  orders: {
    orders: orders,
  },
  user: {
    myUser: `${user}/my`
  }
};

export {
  urls
};
