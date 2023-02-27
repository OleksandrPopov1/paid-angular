import {environment} from "../../environments/environment";

const {API} = environment;

const auth = `${API}/auth`;
const orders = `${API}/orders`;
const user = `${API}/users`;
const groups = `${API}/groups`;
const admin = `${API}/admin`;

const urls = {
  auth: {
    login: auth,
    refresh: `${auth}/refresh`,
    activate: `${auth}/activate`
  },
  orders: {
    orders,
    excel: `${orders}/excel`
  },
  groups: {
    groups
  },
  user: {
    myUser: `${user}/my`
  },
  admin: {
    user: `${admin}/users`,
    statistic: `${admin}/statistic`
  }
};

export {
  urls
};
