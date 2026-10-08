import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css'

export interface ModalProps{
    children: React.ReactNode
    onClose: () => void
}

export default function Modal ({ children, onClose}: ModalProps){
    useEffect(() => {
      document.body.style.overflow = "hidden";

        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
    window.addEventListener("keydown", handler);
    return ()=> {
      document.body.style.overflow = "auto";
      window.removeEventListener('keydown', handler);}
}, [onClose]);

return createPortal(
    <div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
  onClick={onClose}
>
  <div className={css.modal} onClick={(e) => e.stopPropagation()}>
    {children}
  </div>
</div>,
document.body
)

}