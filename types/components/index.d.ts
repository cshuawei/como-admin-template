import type { SelectOption } from '../common'
export namespace VsMenu {
  export interface Item {
    path: string;
    name: string;
    children?: Array<Item>;
    [propName: string]: any;
  }
}

export namespace VsTable {
  export interface TableColumn {
    property: string;
    label: string;
    width?: number;
    fixed?: boolean;
  }
}
export namespace VsHeader {
  export interface BreadcrumbItem {
    path: string;
    name: string;
  }
}

export namespace VsSearchBar {
  export interface RemoteMethodData {
    key: string;
    value: string;
  }
  export interface Item {
    type: 'input' | 'select' | 'select-remote' | 'cascader' | 'daterange';
    key: string;
    keys?: [string, string];
    placeholder?: string | [string, string] | undefined;
    group?: boolean | undefined;
    data?: Array<SelectOption>;
  }
}
