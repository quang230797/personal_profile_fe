import { useState, useEffect } from "react";
import { cvApi, type CvData } from "../services/api";

interface UseCvDataResult {
  data: CvData | null;
  loading: boolean;
  error: Error | null;
}

export function useCvData(profileId: number = 1): UseCvDataResult {
  const [data, setData] = useState<CvData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCvData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await cvApi.getComplete(profileId);

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error("Failed to fetch CV data"),
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCvData();

    return () => {
      isMounted = false;
    };
  }, [profileId]);

  return { data, loading, error };
}
