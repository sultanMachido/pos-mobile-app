import React from 'react'
import { Modal } from 'native-base'

const ModalBox =({children,showModal,closeModal})=>{
   return(
    <Modal isOpen={showModal} onClose={closeModal}>
        <Modal.Content h={150}>
          <Modal.CloseButton />
          <Modal.Body>
            {children}
          </Modal.Body>
        </Modal.Content>
    </Modal>
   )
}

export default ModalBox