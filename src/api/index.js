import { httpClient } from "./HttpRequest";

export function apiGetUnresolvedPage() {
  return httpClient.request({
    url: '/api/UnresolvedPage/list',
    method: 'GET',
  });
}