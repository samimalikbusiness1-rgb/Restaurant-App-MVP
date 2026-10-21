import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../api/client";

export default function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiRequest(endpoint, options);
      setData(result);
    } catch (err) {
      setError(err.message || "Unable to load data");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
