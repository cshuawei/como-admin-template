/**
 * 常用交互方法
 *
 */
import { ElMessage, ElLoading } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/loading/style/css'
import { Ux } from '~/common'

const $ux = {
  message (type: 'success' | 'warning' | 'info' | 'error', message: Ux.Msg) {
    ElMessage({
      message,
      type
    })
  },
  loading (msg?: Ux.Msg, background?: string) {
    return ElLoading.service({
      lock: true,
      text: msg || '加载中...',
      background: background || 'rgba(0, 0, 0, 0.7)',
    })
  }
}
export default $ux
