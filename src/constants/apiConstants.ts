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