import { useState } from "react";
import { API_URL } from "../../config/env";
export const usePostFetch = <TData>(url: string) => {
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();

  const mutate = (data: TData) => {
    setIsLoading(true);
    fetch(`${API_URL}/${url}`, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        data: data,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((res) => {
        setResponse(res);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };

  return { response, loading, error, mutate };
};
