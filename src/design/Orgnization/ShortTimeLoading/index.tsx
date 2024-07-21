import React from 'react'
import './index.scss'
import {ReactComponent as Loading} from './short_time_loading.svg'
import classNames from 'classnames'

export default function ShortTimeLoading({
  isShow,
  className
}: {
  /** 是否显示 */
  isShow: boolean,
  className: string
}) {

  return (
    isShow ? 
      <Loading className={classNames('shortTimeLoading', className)} />
    :
      null
  )
}
