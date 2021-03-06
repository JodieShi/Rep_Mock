export interface FaiosTransformer {
  (data: any, header?: any): any;
}

export interface FaiosAdapter {
  (config: FaiosRequseConfig): FaiosPromise<any>;
}

export interface FaiosBasicCredentials {
  username: string;
  password: string;
}

export interface FaiosProxyConfig {
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
  protocol?: string;
}

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK'

export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream'

export interface TransitionalOptions {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface FaiosRequseConfig {
  url?: string;
  method?: string;
  baseURL?: string;
  transformRequest?: FaiosTransformer | FaiosTransformer[];
  transformResponse?: FaiosTransformer | FaiosTransformer[];
  headers?: any;
  params?: any;
  parmasSerializer?: (params: any) => string;
  data?: any;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  adapter?: FaiosAdapter;
  auth?: FaiosBasicCredentials;
  responseType?: ResponseType;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: ((status: number) => boolean) | null;
  maxBodyLength?: number;
  maxRedirects?: number;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: FaiosProxyConfig | false;
  cancelToken?: CancelToken;
  decompress?: boolean;
  transition?: TransitionalOptions
}

export interface FaiosResponse<T = any> {
  data: Text;
  status: number;
  statusText: string;
  headers: any;
  config: FaiosRequestConfig;
  request?: any;
}

export interface FaiosError<T = any> extends Error {
  config: FaiosRequestConfig;
  code?: string;
  request?: any;
  response?: FaiosResponse<T>;
  isFaiosError: boolean;
  toJSON: () => object;
}

export interface FaiosPromise<T = any> extends Promise<FaiosResponse<T>> {
}

export interface CancelStatic {
  new (message?: string): Cancel;
}

export interface Cancel {
  message: string;
}

export interface Canceler {
  (message?: string): void;
}

export interface CancelTokenStatic {
  new (executor: (cancel: Canceler) => void): CancelToken;
  source(): CancelTokenSource;
}

export interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequested(): void;
}

export interface CancelTokenSource {
  token: CancelToken;
  cancel: Canceler;
}

export interface FaiosInterceptorManager<V> {
  use<T = V>(onFulfilled?: (value: V) => T | Promise<T>, onRejected?: (error: any) => any): number;
  eject(id: number): void;
}

export interface FaiosInstance {
  (config: FaiosRequestConfig): FaiosPromise;
  (url: string, config?: FaiosRequstConfig): FaiosPromise;
  defaults: FaiosRequestConfig;
  interceptor: {
    request: FaiosInterceptorManager<FaiosRequestConfig>;
    response: FaiosInterceptorManager<FaiosResponse>;
  };
  getUrl(config?: FaiosRequestConfig): string;
  request<T = any, R = FaiosResponse<T>> (config: FaiosRequestConfig): Promise<R>;
  get<T = any, R = FaiosResponse<T>>(url: string, config: FaiosRequestConfig): Promise<R>;
  delete<T = any, R = FaiosResponse<T>>(url: string, config: FaiosRequestConfig): Promise<R>;
  head<T = any, R = FaiosResponse<T>>(url: string, config: FaiosRequestConfig): Promise<R>;
  options<T = any, R = FaiosResponse<T>>(url: string, config: FaiosRequestConfig): Promise<R>;
  post<T = any, R = FaiosResponse<T>>(url: string, data?: any, config: FaiosRequestConfig): Promise<R>;
  put<T = any, R = FaiosResponse<T>>(url: string, data?: any, config: FaiosRequestConfig): Promise<R>;
  patch<T = any, R = FaiosResponse<T>>(url: string, data?: any, config: FaiosRequestConfig): Promise<R>;
}

export interface FaiosStatic extends FaiosInstance {
  create(config?: FaiosRequestConfig): FaiosInstance;
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  isCancel(value: any): boolean;
  all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
  isFaiosError(payload: any): payload is FaiosError;
}

declare const faios: FaiosStatic;

export default faios;
