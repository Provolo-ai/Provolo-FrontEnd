import { useEffect } from "react";
import { useState } from "react";

export default function useSession() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`${import.meta.env.VITE_SERVER_URL}/auth/verify`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!cancelled) {
          if (res.ok) {
            const data = await res.json();
            setUser(data.data);
          } else {
            setUser(null);
          }
        }
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { user, loading };
}
