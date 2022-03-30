/**
 * 通用http方法
 */
import axios, {
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios'
import JSONBIG from 'json-bigint'
import type { Http } from '~/common'
import router from '../router'
import $ux from './ux'
import $util from './util'

// 添加请求拦截器
axios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // 在发送请求之前做些什么
    const canExecute = !config.url?.includes('oauth/token')
    if (canExecute) {
      const headers = config.headers as AxiosRequestHeaders
      const token = $util.storage('local', 'get', 'ADMIN_TOKEN')
      if (token) {
        headers.Authorization = token
      }
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

const $http = (
  method: Http.Method,
  url: Http.Url,
  data?: Http.Data,
  options?: Http.Options
) => {
  return new Promise<any>((resolve, reject) => {
    const dataOptions: Http.DataOptions = {}
    if (method === 'get') {
      dataOptions.params = data
    } else {
      const _data = [] as string[]
      if (options?.keyValueSplicing) {
        // 键值对拼接
        if (data) {
          Object.keys(data).forEach((key) => {
            _data.push(`${key}=${(data as Record<string, any>)[key]}`)
          })
          url += `?${_data.join('&')}`
          data = {}
        }
      }
      dataOptions.data = data
    }
    if (options?.cancelTokenExcutor) {
      const CancelToken = axios.CancelToken
      dataOptions.cancelToken = new CancelToken(options.cancelTokenExcutor)
    }
    const responseType = options?.responseType || 'json'
    axios({
      url,
      method,
      withCredentials: options?.withCredentials,
      baseURL: options?.baseURL || import.meta.env.VITE_BASE_URL,
      timeout: options?.timeout || 6000,
      headers: options?.headers,
      responseType,
      ...dataOptions,
      // validateStatus(status) {
      //   return status >= 200 && status < 300; // default
      // }
      transformResponse: [
        (data) => {
          if (responseType === 'json') {
            // 解决后端Long类型数据的精度丢失问题
            try {
              const _JSONBIG = JSONBIG({
                storeAsString: true,
              })
              return _JSONBIG.parse(data)
            } catch (error) {
              return JSON.parse(data)
            }
          } else {
            return data
          }
        },
      ],
    }).then((res: AxiosResponse) => {
      if (responseType === 'json') {
        const d = res.data
        if (typeof d.success === 'undefined') resolve(d)
        if (d.success) resolve(d.data)
        if (!d.success) {
          if (
            typeof options?.isErrorHint === 'undefined' ||
              options?.isErrorHint === true
          ) {
            $ux.message('error', d.msg || '未知的错误')
          }
          reject(d)
        }
      } else {
        resolve(res)
      }
    }).catch(async (err: AxiosError) => {
      if (err.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        // console.log(err.response.data)
        // console.log(err.response.status)
        // console.log(err.response.headers)
        const d = err.response.data
        if (
          typeof options?.isErrorHint === 'undefined' ||
            options?.isErrorHint === true
        ) {
          if (d.error === 'unauthorized' || d.error === 'invalid_token') {
            await $ux.message('error', '登录失效')
            $util.storage('local', 'del', 'BLOCKCHAIN_CLIENT_TOKEN')
            router.replace('/login')
          } else {
            $ux.message(
              'error',
              d.msg || d.error_description || '未知的错误'
            )
          }
        }
      } else {
        if (axios.isCancel(err)) { console.error('Request canceled', err.message || '') }
        if (err.message && err.message.includes('timeout')) { $ux.message('error', '请求超时') }
      }
      reject(err)
    })
  })
}

export default $http
