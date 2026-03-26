import { httpClient } from "./HttpRequest";

export function apiGetUnresolvedPage(data) {
  return httpClient.request({
    url: '/api/UnresolvedPage/page',
    method: 'POST',
    data,
  });
}