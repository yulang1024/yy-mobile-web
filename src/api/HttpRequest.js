import axios from 'axios';

/**
 * HTTP 请求
 */
class HttpRequest {
  /** 基础URL */
  baseURL = '';

  /** 固定请求头 */
  headers = {

  };

  constructor(options) {
    this.baseURL = options.baseURL || '';
  }

  /**
   * 请求
   * @param {*} options
   * @returns {Promise<any>}
   */
  async request(options) {
    return axios.request({
      baseURL: this.baseURL,
      ...options,
    }).then(response => {
      console.log(response);
      return response?.data?.data;
    }).catch(error => {
      console.log(error);
      return Promise.reject(error);
    });
  }
}

export default HttpRequest;

export const httpClient = new HttpRequest({
  baseURL: 'http://localhost:5173',
});