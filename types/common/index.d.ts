export namespace Ux {
  export type Msg = string;
  export type ConfirmType = 'success' | 'error' | 'info' | 'warning';
  export interface ConfirmOptions {
    title?: string | undefined;
    message: string;
    async?: boolean | undefined;
    callback?: (...args: any[]) => Promise<unknown>;
    confirmButtonText?: string | undefined;
    [propName: string]: any;
  }
}

export namespace Http {
  export type Url = string;
  export type Data = Record<string, any> | Array<any> | undefined;
  export interface DataOptions {
    data?: Data;
    params?: Record<string, any> | undefined;
    [key: string]: any;
  }
  export type Method = 'get' | 'post';
  export interface Options {
    withCredentials?: boolean;
    baseURL?: string;
    timeout?: number;
    isErrorHint?: boolean;
    headers?: Record<string, any>;
    keyValueSplicing?: boolean | undefined;
    fullData?: boolean;
    [key: string]: any;
  }
}

export namespace Upload {
  export interface Data {
    file: File;
    bucketName?: string;
    [key: string]: any;
    [key: number]: any;
  }
  export interface Options {
    baseURL?: string;
    timeout?: number;
    withCredentials?: boolean;
    headers?: Record<string, any>;
    [key: string]: any;
  }
}

export namespace Download {
  export interface Data {
    delete?: boolean;
    fileName?: string;
    [key: string]: any;
  }
  export interface Options {
    baseURL?: string;
    timeout?: number;
    withCredentials?: boolean;
    headers?: Record<string, any>;
    [key: string]: any;
  }
}

export namespace Util {
  export type StorageType = 'local' | 'session';
  export type StorageAction = 'set' | 'get' | 'del';
  interface StorageOptions {
    expire: number;
  }
  export type StorageArgs = [string?, StorageOptions?];
  export interface FindTreeObjOptions {
    id?: string;
    children?: string;
  }
  export interface FindTreeObj {
    id?: string;
    children?: Array<FindTreeObj>;
    [propName: string]: any;
  }
  export type FindTreeObjReturn = (
    items: Array<FindTreeObj>
  ) => Util.FindTreeObj;
  export interface MergeParamsOptions<P> {
    retainKeys?: Array<string> | undefined;
    deleteKyes?: (keyof P)[] | undefined;
  }
  export type FindTreeIdsId = string | number;
  export interface FindTreeIdsOptions {
    id?: FindTreeIdsId | undefined;
    children?: string | undefined;
  }
  export interface FindTreeIdsItem {
    id?: string | number | undefined;
    children?: string | undefined;
    [propName: string]: any;
  }
  export type FindTreeIdsReturn = (
    items: Array<FindTreeIdsItem>,
    parentId?: FindTreeIdsId | undefined
  ) => Array<string>;
}

export interface Pattern {
  sum: RegExp;
  discount: RegExp;
  num: RegExp;
  numNoZero: RegExp;
  stock: RegExp;
  hour: RegExp;
  minute: RegExp;
  postCode: RegExp;
  email: RegExp;
  phone: RegExp;
  landline: RegExp;
  telephone: RegExp;
  nohanzi: RegExp;
  numbydot: RegExp;
  numEnbydot: RegExp;
  idCard: RegExp;
  bankCard: RegExp;
  noSpace: RegExp;
  password: RegExp;
}

export interface AfterReadFile {
  content: string;
  message: string;
  status: string;
  file: File;
}

export type AfterReadFileList = Array<AfterReadFile>;

export interface PaginationParams {
  current: number;
  size: number;
  [propName: string]: any;
}

export interface SelectOption {
  label: string;
  value?: string | number;
  options?: Array<SelectOption>;
}

export interface Tree {
  label: string;
  value?: string;
  children?: Tree[];
  [key: string]: any;
}
