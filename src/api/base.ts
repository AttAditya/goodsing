export const callApi = async <T = any>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
  body: any = null, 
  retry: number = 0
): Promise<T | null> => {
  const fallsafeUrl = 'http://localhost:3000';
  const overrideUrl = (window as Window & {
    apiBaseUrl?: string
  }).apiBaseUrl;

  const api_base_url = overrideUrl || fallsafeUrl;
  const credentials: RequestCredentials = 'include';
  const headers: {[ key: string]: string } = method === 'GET'
    ? {}
    : {
      'Content-Type': 'application/json',
    };

  const requestBody = method === "GET"
    ? null
    : (
      body
        ? JSON.stringify(body)
        : undefined
    );
  
  const url = `${api_base_url}${endpoint}`;
  const options: RequestInit = {
    method,
    credentials,
    headers,
    body: requestBody,
  };

  const resp = await fetch(url, options);
  console.log(resp.ok);

  if (resp.ok) return await resp.json();
  if (retry <= 0) return null;

  return await callApi<T>(
    endpoint, method, body, retry - 1
  );
};

