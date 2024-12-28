import axios from "axios";

  export const getOrders = async (type: string) => {
  
  const IP = "52.66.237.148";
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwibmFtZSI6IjIiLCJyb2xlcyI6WyJSRVNUQVVSQU5UIl0sImlhdCI6MTczMzg1NjQ5MiwiZXhwIjoxNzM0NzIwNDkyfQ.mj74SPkwKECOYw15ouSMAD2GGfTx8Dqog0rUMVQfhWMJDgAbY7JVXB2ZEDxsbmxwqNDDBfBBSm4quCuhIGRymg"; // Replace with your actual token

    try {
      const response = await axios.get(`http://${IP}/orders?state=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data, "GET ORDERS");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  export const changeStatus = async (status: boolean) => {
    const IP = "52.66.237.148";
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwibmFtZSI6IjIiLCJyb2xlcyI6WyJSRVNUQVVSQU5UIl0sImlhdCI6MTczMzg1NjQ5MiwiZXhwIjoxNzM0NzIwNDkyfQ.mj74SPkwKECOYw15ouSMAD2GGfTx8Dqog0rUMVQfhWMJDgAbY7JVXB2ZEDxsbmxwqNDDBfBBSm4quCuhIGRymg"; // Replace with your actual token
    const value = status === true ? "offline" : "online";
    try {
      const response = await axios.post(
        `http://${IP}/restaurant-admins/status?restaurantId=3`, 
         value , // Data sent in the body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
          },
        }
      );
  
      console.log(response.data, "STORE STATUS");
      return response.data.data; 
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
    }
  };

  export const getCategories = async () => {
    const IP = "52.66.237.148";
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwibmFtZSI6IjEiLCJyb2xlcyI6WyJSRVNUQVVSQU5UIl0sInJlc3RyYXVudCI6eyJpZCI6MSwidXNlciI6eyJpZCI6MSwibmFtZSI6bnVsbCwibW9iaWxlTnVtYmVyIjoiOTgyOTY5OTM4MiIsImVtYWlsIjpudWxsLCJpbWFnZVVybCI6bnVsbCwiZW1haWxWZXJpZmllZCI6ZmFsc2UsInByb3ZpZGVyIjoibG9jYWwiLCJwcm92aWRlcklkIjpudWxsLCJzdGF0dXMiOiJhY3RpdmUiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJSRVNUQVVSQU5UIn1dfSwib3duZXJOYW1lIjoiSm9obm5ubm5ubm4gRG9lIiwicmVzdGF1cmFudE5hbWUiOiJUaGUgR3JlYXQgRGluZXIiLCJyZXN0YXVyYW50SW1hZ2VVcmwiOm51bGwsImVtYWlsQWRkcmVzcyI6ImpvaG5AZXhhbXBsZS5jb20iLCJtb2JpbGVOdW1iZXIiOiIxMjM0NTY3ODkwIiwibGF0aXR1ZGUiOiI0MC43MTI4IiwibG9uZ2l0dWRlIjoiLTc0LjAwNjAiLCJzaG9wTnVtYmVyIjoiMTAxIiwiZmxvb3JPclRvd2VyIjoiMXN0IEZsb29yIiwiYXJlYU9yU2VjdG9yT3JMb2NhbGl0eSI6Ik1hbmhhdHRhbiIsImxhbmRtYXJrIjoiTmVhciBDZW50cmFsIFBhcmsiLCJwaW5jb2RlIjoiMTAwMDEiLCJzdGF0ZSI6Ik5ZIiwiY2l0eSI6Ik5ldyBZb3JrIiwiaXNWZWciOmZhbHNlLCJyYXRpbmciOjQuNSwicGFuTnVtYmVyIjoiQUJDREUxMjM0RiIsImZzc2FpTnVtYmVyIjoiMTIzNDU2Nzg5MDEyMzQ1IiwiZ3N0aW5OdW1iZXIiOiIyOUFCQ0RFMTIzNEYxWjUiLCJpc09ubGluZSI6dHJ1ZSwicmVzdGF1cmFudEJhbmtEZXRhaWxzIjp7ImlkIjoxLCJhY2NvdW50TnVtYmVyIjoiOTg3NjU0MzIxMCIsImlmc2MiOiJIREZDMDAwMTIzNCJ9LCJjYXRlZ29yaWVzIjpbeyJpZCI6MSwibmFtZSI6IkNhdHkyIE5hbWUiLCJpdGVtcyI6W3siaWQiOjEsInRpdGxlIjoiTWVudSBJdGVtIDEiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uIGZvciBNZW51IEl0ZW0gMSIsInByaWNlIjoxNS45OSwiaW1hZ2VVcmwiOiJodHRwczovL2V4YW1wbGUuY29tL2ltYWdlLmpwZyIsImlzU3RvY2siOnRydWUsImlzVmVnIjpmYWxzZSwic2VydmluZ0luZm8iOm51bGwsInBvcnRpb25TaXplIjpudWxsLCJwcmVwYXJhdGlvblRpbWUiOm51bGx9LHsiaWQiOjIsInRpdGxlIjoiTWVudSBJdGVtIDIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uIGZvciBNZW51IEl0ZW0gMiIsInByaWNlIjoxMi45OSwiaW1hZ2VVcmwiOiJodHRwczovL2V4YW1wbGUuY29tL2ltYWdlMi5qcGciLCJpc1N0b2NrIjp0cnVlLCJpc1ZlZyI6dHJ1ZSwic2VydmluZ0luZm8iOm51bGwsInBvcnRpb25TaXplIjpudWxsLCJwcmVwYXJhdGlvblRpbWUiOm51bGx9XSwiaXNEaXNhYmxlZCI6ZmFsc2V9XX0sImlhdCI6MTczNTIzMzc0OCwiZXhwIjoxNzM2MDk3NzQ4fQ.uHlfOtrT1TGmBrIKl_jubP6p688oFNdSt7JR7DSDsrCkcv4N4UlTx-ECXAWta6Q4wUWm8Xm041iUUml0dO7duA"; // Replace with your actual token
    // const value = status === true ? "offline" : "online";
    try {
      const response = await axios.get(
        `http://${IP}/api/menu/restaurant/categories/?restaurantId=1`
        , 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
          },
        }
      );
  
      console.log(response.data, "CATEGORIES");
      return response.data.data; 
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
    }
  };

  export const inStock = async (id: number,status: boolean) => {
    
    const IP = "52.66.237.148";
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwibmFtZSI6IjEiLCJyb2xlcyI6WyJSRVNUQVVSQU5UIl0sInJlc3RyYXVudCI6eyJpZCI6MSwidXNlciI6eyJpZCI6MSwibmFtZSI6bnVsbCwibW9iaWxlTnVtYmVyIjoiOTgyOTY5OTM4MiIsImVtYWlsIjpudWxsLCJpbWFnZVVybCI6bnVsbCwiZW1haWxWZXJpZmllZCI6ZmFsc2UsInByb3ZpZGVyIjoibG9jYWwiLCJwcm92aWRlcklkIjpudWxsLCJzdGF0dXMiOiJhY3RpdmUiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJSRVNUQVVSQU5UIn1dfSwib3duZXJOYW1lIjoiSm9obm5ubm5ubm4gRG9lIiwicmVzdGF1cmFudE5hbWUiOiJUaGUgR3JlYXQgRGluZXIiLCJyZXN0YXVyYW50SW1hZ2VVcmwiOm51bGwsImVtYWlsQWRkcmVzcyI6ImpvaG5AZXhhbXBsZS5jb20iLCJtb2JpbGVOdW1iZXIiOiIxMjM0NTY3ODkwIiwibGF0aXR1ZGUiOiI0MC43MTI4IiwibG9uZ2l0dWRlIjoiLTc0LjAwNjAiLCJzaG9wTnVtYmVyIjoiMTAxIiwiZmxvb3JPclRvd2VyIjoiMXN0IEZsb29yIiwiYXJlYU9yU2VjdG9yT3JMb2NhbGl0eSI6Ik1hbmhhdHRhbiIsImxhbmRtYXJrIjoiTmVhciBDZW50cmFsIFBhcmsiLCJwaW5jb2RlIjoiMTAwMDEiLCJzdGF0ZSI6Ik5ZIiwiY2l0eSI6Ik5ldyBZb3JrIiwiaXNWZWciOmZhbHNlLCJyYXRpbmciOjQuNSwicGFuTnVtYmVyIjoiQUJDREUxMjM0RiIsImZzc2FpTnVtYmVyIjoiMTIzNDU2Nzg5MDEyMzQ1IiwiZ3N0aW5OdW1iZXIiOiIyOUFCQ0RFMTIzNEYxWjUiLCJpc09ubGluZSI6dHJ1ZSwicmVzdGF1cmFudEJhbmtEZXRhaWxzIjp7ImlkIjoxLCJhY2NvdW50TnVtYmVyIjoiOTg3NjU0MzIxMCIsImlmc2MiOiJIREZDMDAwMTIzNCJ9LCJjYXRlZ29yaWVzIjpbeyJpZCI6MSwibmFtZSI6IkNhdHkyIE5hbWUiLCJpdGVtcyI6W3siaWQiOjEsInRpdGxlIjoiTWVudSBJdGVtIDEiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uIGZvciBNZW51IEl0ZW0gMSIsInByaWNlIjoxNS45OSwiaW1hZ2VVcmwiOiJodHRwczovL2V4YW1wbGUuY29tL2ltYWdlLmpwZyIsImlzU3RvY2siOnRydWUsImlzVmVnIjpmYWxzZSwic2VydmluZ0luZm8iOm51bGwsInBvcnRpb25TaXplIjpudWxsLCJwcmVwYXJhdGlvblRpbWUiOm51bGx9LHsiaWQiOjIsInRpdGxlIjoiTWVudSBJdGVtIDIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uIGZvciBNZW51IEl0ZW0gMiIsInByaWNlIjoxMi45OSwiaW1hZ2VVcmwiOiJodHRwczovL2V4YW1wbGUuY29tL2ltYWdlMi5qcGciLCJpc1N0b2NrIjp0cnVlLCJpc1ZlZyI6dHJ1ZSwic2VydmluZ0luZm8iOm51bGwsInBvcnRpb25TaXplIjpudWxsLCJwcmVwYXJhdGlvblRpbWUiOm51bGx9XSwiaXNEaXNhYmxlZCI6ZmFsc2V9XX0sImlhdCI6MTczNTIzMzc0OCwiZXhwIjoxNzM2MDk3NzQ4fQ.uHlfOtrT1TGmBrIKl_jubP6p688oFNdSt7JR7DSDsrCkcv4N4UlTx-ECXAWta6Q4wUWm8Xm041iUUml0dO7duA"; // Replace with your actual token
    // const value = status === true ? "offline" : "online";
    try {
      const response = await axios.put(
        `http://${IP}/api/menu/restaurant/categories/item/update-stock?menuItemId=${id}`,status
        , 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
          },
        }
      );
  
      console.log(response.data, "STOCK");
      return response.data.data; 
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
    }
  };
  
  export const addNewCategory = async (name: string) => {
    const IP = "52.66.237.148";
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwibmFtZSI6IjEiLCJyb2xlcyI6WyJSRVNUQVVSQU5UIl0sInJlc3RyYXVudCI6eyJpZCI6MSwidXNlciI6eyJpZCI6MSwibmFtZSI6bnVsbCwibW9iaWxlTnVtYmVyIjoiOTgyOTY5OTM4MiIsImVtYWlsIjpudWxsLCJpbWFnZVVybCI6bnVsbCwiZW1haWxWZXJpZmllZCI6ZmFsc2UsInByb3ZpZGVyIjoibG9jYWwiLCJwcm92aWRlcklkIjpudWxsLCJzdGF0dXMiOiJhY3RpdmUiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJSRVNUQVVSQU5UIn1dfSwib3duZXJOYW1lIjoiSm9obm5ubm5ubm4gRG9lIiwicmVzdGF1cmFudE5hbWUiOiJUaGUgR3JlYXQgRGluZXIiLCJyZXN0YXVyYW50SW1hZ2VVcmwiOm51bGwsImVtYWlsQWRkcmVzcyI6ImpvaG5AZXhhbXBsZS5jb20iLCJtb2JpbGVOdW1iZXIiOiIxMjM0NTY3ODkwIiwibGF0aXR1ZGUiOiI0MC43MTI4IiwibG9uZ2l0dWRlIjoiLTc0LjAwNjAiLCJzaG9wTnVtYmVyIjoiMTAxIiwiZmxvb3JPclRvd2VyIjoiMXN0IEZsb29yIiwiYXJlYU9yU2VjdG9yT3JMb2NhbGl0eSI6Ik1hbmhhdHRhbiIsImxhbmRtYXJrIjoiTmVhciBDZW50cmFsIFBhcmsiLCJwaW5jb2RlIjoiMTAwMDEiLCJzdGF0ZSI6Ik5ZIiwiY2l0eSI6Ik5ldyBZb3JrIiwiaXNWZWciOmZhbHNlLCJyYXRpbmciOjQuNSwicGFuTnVtYmVyIjoiQUJDREUxMjM0RiIsImZzc2FpTnVtYmVyIjoiMTIzNDU2Nzg5MDEyMzQ1IiwiZ3N0aW5OdW1iZXIiOiIyOUFCQ0RFMTIzNEYxWjUiLCJpc09ubGluZSI6dHJ1ZSwicmVzdGF1cmFudEJhbmtEZXRhaWxzIjp7ImlkIjoxLCJhY2NvdW50TnVtYmVyIjoiOTg3NjU0MzIxMCIsImlmc2MiOiJIREZDMDAwMTIzNCJ9LCJjYXRlZ29yaWVzIjpbeyJpZCI6MSwibmFtZSI6IkNhdHkyIE5hbWUiLCJpdGVtcyI6W3siaWQiOjEsInRpdGxlIjoiTWVudSBJdGVtIDEiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uIGZvciBNZW51IEl0ZW0gMSIsInByaWNlIjoxNS45OSwiaW1hZ2VVcmwiOiJodHRwczovL2V4YW1wbGUuY29tL2ltYWdlLmpwZyIsImlzU3RvY2siOnRydWUsImlzVmVnIjpmYWxzZSwic2VydmluZ0luZm8iOm51bGwsInBvcnRpb25TaXplIjpudWxsLCJwcmVwYXJhdGlvblRpbWUiOm51bGx9LHsiaWQiOjIsInRpdGxlIjoiTWVudSBJdGVtIDIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uIGZvciBNZW51IEl0ZW0gMiIsInByaWNlIjoxMi45OSwiaW1hZ2VVcmwiOiJodHRwczovL2V4YW1wbGUuY29tL2ltYWdlMi5qcGciLCJpc1N0b2NrIjp0cnVlLCJpc1ZlZyI6dHJ1ZSwic2VydmluZ0luZm8iOm51bGwsInBvcnRpb25TaXplIjpudWxsLCJwcmVwYXJhdGlvblRpbWUiOm51bGx9XSwiaXNEaXNhYmxlZCI6ZmFsc2V9XX0sImlhdCI6MTczNTIzMzc0OCwiZXhwIjoxNzM2MDk3NzQ4fQ.uHlfOtrT1TGmBrIKl_jubP6p688oFNdSt7JR7DSDsrCkcv4N4UlTx-ECXAWta6Q4wUWm8Xm041iUUml0dO7duA"; // Replace with your actual token
  
    try {
      const response = await axios.post(
        `http://${IP}/api/menu/category-with-items?restaurantId=1`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log(response.data, "CATEGORY");
      return response.data;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  };
  

 


