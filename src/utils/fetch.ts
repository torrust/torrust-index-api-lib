export async function request(path: string, config: RequestInit): Promise<Response> {
  const request = new Request(path, config);
  const response = await fetch(request);

  if(!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}

export async function fetchGet<T>(path: string, headers?: HeadersInit): Promise<T> {
  const init = {method: "get", headers: { "Content-Type": "application/json", ...headers }};
  const response = await request(path, init);
  return response.json().catch(() => ({}));
}

export async function fetchGetBlob(path: string, headers?: HeadersInit): Promise<Blob> {
  const init = {method: "get", headers: { ...headers }};
  const response = await request(path, init);
  return response.blob().catch(() => (new Blob));
}

export async function fetchPost<T, U>(path: string, body: T, headers?: HeadersInit): Promise<U> {
  const init = {method: "post", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body)};
  const response = await request(path, init);
  return response.json().catch(() => ({}));
}

export async function fetchPut<T, U>(path: string, body: T, headers?: HeadersInit): Promise<U> {
  const init = {method: "put", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body)};
  const response = await request(path, init);
  return response.json().catch(() => ({}));
}

export async function fetchDelete<T, U>(path: string, body: T, headers?: HeadersInit): Promise<U> {
  const init = {method: "delete", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body)};
  const response = await request(path, init);
  return response.json().catch(() => ({}));
}
