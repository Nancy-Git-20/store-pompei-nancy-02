import React, { useEffect, useImperativeHandle, useState, forwardRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

const modalElement = document.getElementById('modal-root')

export function Modal({ children, fade = false, defaultOpened = false }, ref) {
  const [isOpen, setIsOpen] = useState(defaultOpened)

  const close = useCallback(() => setIsOpen(false), [])

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close
  }), [close])

  const handleEscape = useCallback(event => {
    if (event.keyCode === 27) close()
  }, [close])

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])
  // enable-background
  return createPortal(
    isOpen ? (
      <div className={`modal ${fade ? 'modal-fade' : ''}`}>
        <div className="modal-overlay" onClick={close} />
        <span role="button" className="modal-close" aria-label="close" onClick={close}>
        <svg id="Capa_1" x="0px" y="0px" width="20" height="25" viewBox="298.3 175.012 245.293 245.304"
            enableBackground="new 298.3 175.012 245.293 245.304" >
          <path d="M536.115,182.487c-9.965-9.966-26.125-9.966-36.074,0l-79.094,79.104l-79.095-79.104c-9.966-9.966-26.108-9.966-36.074,0
            s-9.966,26.108,0,36.074l79.094,79.101l-79.098,79.105c-9.966,9.965-9.966,26.109,0,36.074c4.981,4.98,11.51,7.475,18.039,7.475
            c6.528,0,13.064-2.49,18.039-7.475l79.095-79.102l79.094,79.102c4.982,4.98,11.51,7.475,18.039,7.475s13.055-2.49,18.039-7.475
            c9.967-9.965,9.967-26.109,0-36.074l-79.098-79.101l79.094-79.102C546.082,208.599,546.082,192.453,536.115,182.487z"/>
          </svg>
        </span>
        <div className="modal-body">{children}</div>
      </div>
    ) : null,
    modalElement
  )
}

export default forwardRef(Modal)
