import React from 'react'
import './index.scss'
import {ReactComponent as TickIcon} from './tick.svg'
import cn from 'classnames'

export default function AreaSelectionWithNotes({
  width=340,
  title,
  note,
  status,
  handleCheck,
  titleStyle,
  noteStyle,
  padding
} : {
  width?: number
  title: string
  note: string
  status: 'uncheck' | 'checked'
  handleCheck: ()=>void
  titleStyle?: React.CSSProperties
  noteStyle?: React.CSSProperties
  padding?: number
}) {
  return (
    <div 
      className={cn(
        'areaSelectionWithNotes',
        status==='checked' && 'areaSelectionWithNotes--checked'
      )}
      style={{width: `calc(${width}/1080*100vh)`, padding: `calc(${padding}/1080*100vh)`}}
      onMouseUp={handleCheck}
    >
      
      {/* title */}
      <div className="areaSelectionWithNotes__titleWrap" style={titleStyle}>
        <span className="areaSelectionWithNotes__titleWrap__title">
          {title}
          <TickIcon className='areaSelectionWithNotes__titleWrap__title__tick' />
        </span>
      </div>

      {/* note */}
      <div className="areaSelectionWithNotes__note" style={noteStyle}>
        {note}
      </div>

    </div>
  )
}
