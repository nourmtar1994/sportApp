import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://193.95.69.122:5000/api/v1";

/**
 fixed :
  - no need to JSON.stringify to then immediatly do a JSON.parse
  - don't use export defaults, because default imports are hard to search for
  - axios already support generic request in one parameter, no need to call specialized ones
**/
export const useAxios = (axiosParams) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (params) => {
    try {
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []); // execute once only

  return { response, error, loading };
};

// const { response, loading, error } = useAxios({
//   method: "get",
//   url: "/personnel",
//   headers: {
//     // no need to stringify
//     accept: "*/*",
//   },
//   data: {
//     // no need to stringify
//     userId: 1,
//   },
// });
