import type { ApiRequestOptions } from './ApiRequestOptions';

type Headers = Record<string, string>;
type Middleware<T> = (value: T) => T | Promise<T>;
type Resolver<T> = (options: ApiRequestOptions<T>) => Promise<T>;

export class Interceptors<T> {
  _fns: Middleware<T>[];

  constructor() {
    this._fns = [];
  }

  eject(fn: Middleware<T>): void {
    const index = this._fns.indexOf(fn);
    if (index !== -1) {
      this._fns = [...this._fns.slice(0, index), ...this._fns.slice(index + 1)];
    }
  }

  use(fn: Middleware<T>): void {
    this._fns = [...this._fns, fn];
  }
}

export type OpenAPIConfig = {
	BASE: string;
	CREDENTIALS: 'include' | 'omit' | 'same-origin';
	ENCODE_PATH?: (path: string) => string;
	HEADERS?: (options: ApiRequestOptions) => Promise<Record<string, string>| undefined>;
	PASSWORD?: (options: ApiRequestOptions) => Promise<string | undefined>;
	TOKEN?: (options: ApiRequestOptions) => Promise<string | undefined>;
	USERNAME?: (options: ApiRequestOptions) => Promise<string | undefined>;
	VERSION: string;
	WITH_CREDENTIALS: boolean;
	interceptors: {
		request: Interceptors<RequestInit>
		response: Interceptors<Response>
	};
  };

export const OpenAPI: OpenAPIConfig = {
  BASE: 'http://localhost:44327',
  CREDENTIALS: 'include',
  ENCODE_PATH: (uri: string) => encodeURIComponent(uri),
  HEADERS: async (options: ApiRequestOptions) => {
    // You can perform async operations here if needed
    return undefined;
  },
  PASSWORD: async (options: ApiRequestOptions) => {
    // You can perform async operations here if needed
    return undefined; // or return the actual password
  },
  TOKEN: async (options: ApiRequestOptions) => {
    // You can perform async operations here if needed
    return undefined; // or return the actual token
  },
  USERNAME: async (options: ApiRequestOptions) => {
    // You can perform async operations here if needed
    return undefined; // or return the actual username
  },
  VERSION: '1',
  WITH_CREDENTIALS: false,
  interceptors: {
    request: new Interceptors(),
    response: new Interceptors(),
  },
};
