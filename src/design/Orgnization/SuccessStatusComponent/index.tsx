import React from 'react'
import './index.scss'
import { ReactComponent as SuccessIcon } from './success_status_component.svg';

export default function SuccessStatusComponent({
  isShow
}: {
  /** 是否显示 */
  isShow: boolean
}) {

  return (
    isShow ? 
      <SuccessIcon />
    :
      null
  )
}
