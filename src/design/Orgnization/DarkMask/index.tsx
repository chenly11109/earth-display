import React from 'react'
import './index.scss'
import classNames from 'classnames'

type noop = () => void

export default function DarkMask({
  isShow,
  closeMask,
  renderChildren
}: {
  /** 是否显示 */
  isShow: boolean,
  /** 关闭遮罩 */
  closeMask: noop,
  /** 子组件 renderProps, 参数为关闭遮罩的回调函数 */
  renderChildren?: (onClose: noop) => React.ReactNode
}) {

  return (
    <>
      {
          <div className={classNames('dark_mask', isShow && 'close_mask')}>
            {
              renderChildren && renderChildren(closeMask)
            }
          </div>
      }
      
    </>
  )
}
