import React, { useRef, useEffect } from "react";
//react-bootstrap
import { Button, Modal } from "react-bootstrap";

function CustomModal({ handleclose, children, ...props }) {
  return (
    <Modal {...props}>
      <div className="modal-header-div d-flex justify-content-center">
        <p className="modal-header-text mb-0">Comments</p>
        <Button className="modal-close-btn p-0" onClick={() => handleclose()}>
          <img src="/images/close.png" alt="close" className="close-img" />
        </Button>
      </div>
      <div className="comments-wrapper">
        <div className="comments-container">{children}</div>
        <div className="mt-4 w-100">
          <Button className="dn-btn" onClick={() => handleclose()}>
            DONE
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CustomModal;
