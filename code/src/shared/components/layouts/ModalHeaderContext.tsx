// ModalHeaderContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Ctx = {
  setTitle: (t: string) => void;
  setActions: (a: React.ReactNode[]) => void;
};

const ModalHeaderCtx = createContext<Ctx>({
  setTitle: () => {},
  setActions: () => {},
});

export const useModalHeader = () => useContext(ModalHeaderCtx);

export const ModalHeaderProvider: React.FC<
  React.PropsWithChildren<{
    initialTitle: string;
    onClose: () => void;
    renderHeader: (title: string, actions: React.ReactNode[], onClose: () => void) => React.ReactNode;
  }>
> = ({ initialTitle, onClose, renderHeader, children }) => {
  const [title, setTitle] = useState(initialTitle);
  const [actions, setActions] = useState<React.ReactNode[]>([]);

  // ✅ sync title เมื่อ initialTitle เปลี่ยน (เช่น เปลี่ยน path)
  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  return (
    <ModalHeaderCtx.Provider value={{ setTitle, setActions }}>
      {renderHeader(title, actions, onClose)}
      {children}
    </ModalHeaderCtx.Provider>
  );
};