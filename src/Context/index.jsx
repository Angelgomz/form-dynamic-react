import { createContext, useState } from "react";

export const ModalFinishContext = createContext();
export const ModalFinishFormProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  return (
    <ModalFinishContext.Provider
      value={{
        data,
        setData,
        open,
        setOpen,
      }}
    >
      {children}
    </ModalFinishContext.Provider>
  );
};
