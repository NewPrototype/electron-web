import ax from 'axios'

import querystring from 'querystring'

import config from './../config';
const { server } = config;

// 拦截器
ax.interceptors.request.use(config => {
  if (
    config.method === 'post' ||
    config.method === 'put' ||
    config.method === 'delete' ||
    config.method === 'patch'
  ) {
    config.data = querystring.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})


ax.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})



// 获取网站配置项
export async function login(params = {}) {
  return await ax.get(server + '/login', { params })
}
