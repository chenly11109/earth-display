import React, { useState } from 'react'
import './index.scss'
import { ReactComponent as CloseIcon } from './close.svg'
import classNames from 'classnames'

export default function CloseButton({
  handleClose,
  className
}: {
  handleClose:()=>void,
  className?: string
}) {

  const handleClick = ()=>{
    handleClose()
  }

  return (
    <div className={classNames('fullscreenCloseButton', className)} onClick={handleClick}>
      <CloseIcon className={classNames('fullscreenCloseButton__icon')}/>
    </div>
  )
}
