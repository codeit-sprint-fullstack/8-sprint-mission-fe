import { useState } from 'react';

//들어오는 인자의 비동기 함수 인자 타입과 반환 타입에 따라,
//자동으로 타입 정의를 하는 타입 설정인데,
//너무 어렵습니다. 좀 더 공부하곘습니다.
type AsyncFunction<TArgs extends any[], TResult> = (...args: TArgs) => Promise<TResult>;

export function useAsync<TArgs extends any[], TResult>(
  asyncFunction: AsyncFunction<TArgs, TResult>
): [
  boolean, // pending
  Error | null, // error
  (...args: TArgs) => Promise<TResult | undefined> // wrappedFunction
] {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const wrappedFunction = async (...args: TArgs): Promise<TResult | undefined> => {
    try {
      setError(null);
      setPending(true);
      return await asyncFunction(...args);
    } catch (err) {
      setError(err as Error);
      return undefined;
    } finally {
      setPending(false);
    }
  };

  return [pending, error, wrappedFunction];
}


export default useAsync;
