import { X } from "lucide-react";
import "../styles/global.css";

export default function Modal({ onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Tutup">
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
