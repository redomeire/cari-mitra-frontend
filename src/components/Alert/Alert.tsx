import React from "react";
import { Button, Modal } from "react-daisyui";

interface Props {
    status: string,
    visible: boolean,
    message: string
}

const Alert = ({
    popup,
    setPopup
}: { popup: Props, setPopup: Function }) => {
    const toggleVisible = () => {
        setPopup({
            ...popup,
            visible: false
        })
      }

    return (
        <Modal open={popup.visible}>
          <Modal.Header className="font-bold text-black">
            {popup.status}
          </Modal.Header>
  
          <Modal.Body className="text-black">
            {popup.message}
          </Modal.Body>
  
          <Modal.Actions>
            <Button onClick={toggleVisible}>OK</Button>
          </Modal.Actions>
        </Modal>
    );
}

export default Alert;