export namespace VsMenu {
  export interface Item {
    path: string
    name: string
    children?: Array<Item>
    [propName: string]: any
  }
}

export namespace VsTable {
  export interface TableColumn {
    property: string
    label: string
    width?: number
    fixed?: boolean
  }
}

export namespace VsSearchBar {
  export interface RemoteMethodData {
    key: string
    value: string
  }
  interface DataMap {
    label: string
    value: string
  }
  export interface Item {
    type: 'input' | 'select' | 'select-remote' | 'cascader' | 'daterange'
    key: string
    placeholder?: string
    data?: Array<DataMap>
  }
}
