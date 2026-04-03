import axios from 'axios';

/**
 * HTTP 请求
 */
class HttpRequest {
  /** 基础URL */
  baseURL = '';

  /** 固定请求头 */
  headers = {};

  constructor(options) {
    this.baseURL = options.baseURL || '';
  }

  /**
   * 请求
   * @param {*} options
   * @returns {Promise<any>}
   */
  async request(options) {
    return axios
      .request({
        baseURL: this.baseURL,
        ...options,
      })
      .then((response) => {
        console.log(response);
        return response?.data?.data;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }

  /**
   * 获取文件访问URL
   * @param {string} filePath 文件保存路径
   * @returns {string}
   */
  getFileUrl(filePath) {
    return `${this.baseURL}/file/read?filePath=${filePath}`;
  }

  /**
   * 文件上传
   */
  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.request({
      url: '/file/save',
      method: 'POST',
      data: formData,
    });
  }
}

export default HttpRequest;

export const httpClient = new HttpRequest({
  baseURL: import.meta.env.VITE_API_URL ?? '',
});
