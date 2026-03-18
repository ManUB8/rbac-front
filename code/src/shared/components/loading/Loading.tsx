import React from "react";
import ReactDOM from "react-dom";
import ReactLoading from "react-loading";

interface ILoadingDisplayProps {
  open?: boolean;
  label?: string;
}

const LoadingDisplay: React.FC<ILoadingDisplayProps> = ({ open = true, label = "Loading" }) => {
  if (!open) return null;

  const overlay = (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        inset: 0,                         // ← แทน top/left/width/height
        background: "rgba(0,0,0,0.4)",
        display: "grid",
        placeItems: "center",             // ← จัดกลางแนวแกนคู่
        zIndex: 2000,                     // ← สูงกว่า MUI modal (1300/1500)
        pointerEvents: "auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 20, color: "#fff" }}>{label}</span>
        <ReactLoading type="bars" color="#fff" />
      </div>
    </div>
  );

  // ใส่ portal เพื่อหนี stacking context แปลก ๆ ของ parent (transform/overflow hidden ฯลฯ)
  return ReactDOM.createPortal(overlay, document.body);
};

export default LoadingDisplay;