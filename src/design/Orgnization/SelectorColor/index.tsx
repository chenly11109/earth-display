import React from 'react'
import './index.scss'
import ColorItem from './ColorItem'
import classNames from 'classnames'

export default function SelectorColor({
  handleSelect,
  selectedColor,
  className
} : {
  handleSelect: (color: string)=>void,
  selectedColor: string,
  className?: string
}) {
  const colors = ['#ffffff','#FF8686','#B4FF86','#86FFD3','#86F0FF','#86BEFF',
                  '#8886FF','#C386FF','#FD86FF','#B3B3B3','#FFAAAA','#D9FFC1',
                  '#BBFFE7','#B7F6FF','#B4D6FF','#BEBDFF','#DEBCFF','#FEBBFF']

  return (
    <div className={classNames('selectorColor',className)}>
      {
        colors.map((color,index) => {
          return(
            <ColorItem key={index} selectedColor={selectedColor} color={color} index={index} handleSelect={handleSelect} colors={colors} />
          )
        })
      }
    </div>
  )
}
