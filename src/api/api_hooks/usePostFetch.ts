import { useState } from "react";
import { API_URL } from "../../config/env";
import { UserType } from "../../components/context/AuthContext";

type usePostFetchOptionsProps = {
  onSuccess?: () => void;
  onError?: () => void;
};
export const usePostFetch = <TData>(
  url: string,
  options?: usePostFetchOptionsProps,
  user?:UserType
) => {
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();
  const headers = new Headers({
    "Content-Type": "application/json",
  })

  if(user) {
    headers.append('Authorization', `Bearer ${user.token}`)
  }
  const mutate = (data: TData) => {
    setIsLoading(true);

    fetch(`${API_URL}/${url}`, {
      method: "POST",
      headers: headers,
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
        options?.onSuccess && options?.onSuccess();
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
        options?.onError && options?.onError();
      });
  };

  return { response, loading, error, mutate };
};
export function useCounter() {
  const [counter, setCounter] = useState(0);
  console.log(counter);
  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);

  return { counter, increment, decrement };
}
