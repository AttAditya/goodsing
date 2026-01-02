export const callApi = async <T = any>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
  body: any = null, 
  retry: number = 0
): Promise<T | null> => {
  const API_BASE_URL = (window as any).apiBaseUrl || 'http://localhost:3000';

  const credentials: RequestCredentials = 'include';
  const headers: Record<string, string> = method === 'GET' ? {} : {
    'Content-Type': 'application/json',
  };

  const requestBody = method === "GET"
    ? null
    : (
      body
        ? JSON.stringify(body)
        : undefined
    );
  
  const url = `${API_BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    credentials,
    headers,
    body: requestBody,
  };

  const resp = await fetch(url, options);

  if (resp.ok) return await resp.json();
  if (retry <= 0) return null;

  return await callApi<T>(
    endpoint, method, body, retry - 1
  );
};