import { httpClient } from './HttpRequest';

export function apiGetUnresolvedPage(data) {
  return httpClient.request({
    url: '/UnresolvedPage/page',
    method: 'POST',
    data,
  });
}

export function apiGetOcrRecordPage(data) {
  return httpClient.request({
    url: '/ocrRecord/page',
    method: 'POST',
    data,
  });
}