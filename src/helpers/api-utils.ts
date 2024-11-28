type RequestConfig = {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    payload?: Record<string, unknown>;
    headers?: Record<string, string>;
    revalidate?: number; //optional
  };
  
  export async function apiRequest({
    method,
    url,
    payload,
    headers = {},
    revalidate,
  }: RequestConfig) {
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Credentials": "true",
          ...headers,
        },
        credentials: "include",
      };
  
      if (payload) {
        options.body = JSON.stringify(payload);
      }

      if (revalidate !== undefined) {
        (options as any).next = { revalidate };
      }
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      console.error(`Error in ${method} request:`, errorMessage);
  
      return { status: 404, error: errorMessage };
    }
  }

//EXAMPLES FOR USAGE

//   const data = await apiRequest({
//     method: "GET",
//     url: "/api/resource",
//     revalidate: 10, // ISR caching for 10 seconds
//   });

//   const data = await apiRequest({
//     method: "POST",
//     url: "/api/resource",
//     payload: { name: "Example", value: 42 },
//   });
  