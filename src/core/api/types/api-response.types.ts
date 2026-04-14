export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  result?: T;
  qr?: string;
}

export type ApiResult<T> =
  | {
      success: true;
      /**
       * @data disini bisa berupa message atau result, tergantung response dari backend
       */
      data: T;
    }
  | { success: false; error: string };
