import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import DeleteTask from "../Modals/DeleteTask";
import EditBoard from "../Modals/EditBoard";
import EditTask from "../Modals/EditTask";
import NewBoard from "../Modals/NewBoard";
import NewTask from "../Modals/NewTask";
import ViewTask from "../Modals/ViewTask";
import ModalBackdrop from "./ModalBackdrop";
import ModalPopup from "./ModalPopup";

interface IModal {
  type?: string;
}

const ModalWrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  pointer-events: none;
`;

const ReturnModal: React.FC<IModal> = ({ type }) => {
  if (type === "View Task") {
    return <ViewTask />;
  } else if (type === "Delete Task" || type === "Delete Board") {
    return <DeleteTask />;
  } else if (type === "Edit Task") {
    return <EditTask />;
  } else if (type === "New Board") {
    return <NewBoard />;
  } else if (type === "Edit Board") {
    return <EditBoard />;
  } else if (type === "New Task") {
    return <NewTask />;
  } else {
    return <></>;
  }
};

const animation = {
  hidden: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
};

const Modal: React.FC<IModal> = ({ type }) => {
  return (
    <AnimatePresence>
      {type !== "" && (
        <>
          <ModalWrapper
            variants={animation}
            initial="hidden"
            animate="visible"
            exit="hidden"
            key="modal"
          >
            <ModalPopup>
              <ReturnModal type={type} />
            </ModalPopup>
          </ModalWrapper>
          <ModalBackdrop />
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
