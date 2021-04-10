import axios from 'axios'
import Cookie from 'js-cookie'

const xsrfHeaderName = 'Authorization'

axios.defaults.timeout = 5000
axios.defaults.withCredential = true
axios.defaults.xsrfHeaderName = xsrfHeaderName
axios.defaults.sxrfCookieName = xsrfHeaderName

const AUTH_TYPE = {
  BEARER: 'Bearer',
  BASIC: 'basic',
  AUTH1: 'auth1',
  AUTH2: 'auth2'
}

const METHOD = {
  GET: 'get',
  POST: 'post'
}

async function request(url, method, params, config) {
  switch (method) {
    case METHOD.GET:
      return axios.get(url, { params, ...config })
    case METHOD.POST:
      return axios.post(url, params, config)
    default:
      return axios.get(url, { params, ...config })
  }
}


