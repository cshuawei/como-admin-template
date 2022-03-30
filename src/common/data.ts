const $data = {
  pageSize: 10,
  pageNum: 1,
  pagerCount: 5,
  pageSizes: [10, 20, 30, 50],
  pageLayout: 'total, sizes, prev, pager, next, jumper'
}

const p = new Proxy($data, {
  set: function <T extends typeof $data, K extends keyof typeof $data> (
    obj: T,
    prop: K,
    val: T[K]
  ) {
    // console.log("set", obj, prop, val);
    console.error('$data为全局静态数据，修改会带来潜在的风险！！！')
    obj[prop] = val
    return true
  },
})

export default p
