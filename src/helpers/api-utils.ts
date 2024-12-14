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

      console.log(response.data, "CHECK");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 


