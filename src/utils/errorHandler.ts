// - res: Response → fetch가 반환하는 표준 Response 타입.
// - T → JSON으로 파싱되는 데이터의 타입을 제네릭으로 받음.
// - T는 나중에 외부에서 구체화해야한다. ex) responseHandler<{a, b, c}>(res)
// - 반환 타입은 { ok: true } & T → 항상 ok: true가 붙고, JSON 데이터 구조가 합쳐짐.

/* 기본 리스폰스 처리 */
// async function responseHandler<T extends object>(res: T): Promise<T & SuccessResponse> {
//   const data: T & SuccessResponse = {
//     ...res,
//     ok: true,
//   };
//   return data;
// }

export interface ErrorResponse {
  ok: false;
  message: string;
}

/* 기본 에러 처리 */
export function errorHandler(err: Error): ErrorResponse {
  //console.log(err);
  return {
    ok: false,
    message: parseMessage(err.message),
  };
}

function parseMessage(message: string) {
  try {
    const parsed = JSON.parse(message);
    console.log(parsed.code);
    console.log(parsed.message);
    return parsed.message;
  } catch (e) {
    console.log('메시지가 JSON 형식이 아님:', message);
    return message;
  }
}
