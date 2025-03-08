import { useState } from "react";
import { toast } from "react-toastify";


export function useApiCall() {
  const [loading, setLoading] = useState(false);

  const callApi = async (fun, data) => {
    try {
      setLoading(true);
      const response = await fun(data);
      return response;
    } catch (error) {

      toast.error(error?.response?.data?.message || error.message);
      // throw error;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading };
}
