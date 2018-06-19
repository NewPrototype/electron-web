import ax from 'axios';

import querystring from 'querystring';

import config from './../config';
const { server } = config;
import { message } from 'antd';


ax.defaults.baseURL = server;
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('toKen')}`;

// const axConfig={
//   headers: {'authorization': '11122'},
//   baseURL:server,
// }

// 拦截器
ax.interceptors.request.use(
  config => {
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete' ||
      config.method === 'patch'
    ) {
      config.data = querystring.stringify(config.data);
    }
    // console.log(`Bearer ${localStorage.getItem('toKen')}`,'---')
    config.headers = {
      authorization: `Bearer ${localStorage.getItem('toKen')}`,
    };
    // config.baseURL = server;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

ax.interceptors.response.use(
  response => {
    if (response.status) {
      if (response.data.code == 1) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      return response.data.result;
    } else {
      message.error(response.data.message);
    }
    return response
  },
  error => {
    message.error(error.response.data.message);

    return error.response.data
    // return Promise.reject(error);
  }
);

// 获取网站配置项
export async function login(params = {}) {
  return await ax.get('/login', { params });
}
// 获取网站配置项
export async function getLogin(params = {}) {
  return await ax.get('/getlogin', { params });
}
