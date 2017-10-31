export default {
  url: '/router',
  baseURL: '/nodeApi',
  method: 'POST',
  headers: {'content-type': 'application/json'},
  timeout: 60000,
  withCredentials: false,
  respponseType: 'json',
  xsrfCookieName: 'XSRF-TOKEN',
  onUploadProgress: (progressEvent) => {

  },
  onDownloadProgress: (progressEvent) => {

  },
  maxContentLength: 2000,
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
  maxRedirects: 5
}
