import styled from "@emotion/styled";
import ReactDOM from "react-dom";
import {  FC } from "react";

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  setVisible: (boolean) => void;
}
interface ModalContainerProps {
  visible: boolean;
}

export const Modal: FC<ModalProps> = ({ children, visible, setVisible }) => {
  return ReactDOM.createPortal(
    <ModalContainer visible={visible} onClick={() => setVisible(false)}>
      <ModalWindow onClick={(e) => e.stopPropagation()}>{children}</ModalWindow>
    </ModalContainer>,
    document.getElementById("root") as HTMLElement
  );
};

const ModalContainer = styled.div<ModalContainerProps>(({ visible }) => ({
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.616)",
  zIndex: "10",
  display: visible ? "flex" : "none",
}));

const ModalWindow = styled.div`
  min-width: 200px;
  min-height: 200px;
  background-color: #fff;
  padding: 30px;
  border-radius: 20px;
`;
