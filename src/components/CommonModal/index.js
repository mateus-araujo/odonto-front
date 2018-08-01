import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const CommonModal = ({ isOpen, toggle, toggleSecondary, className, message, modalTitle, primaryTitle, secondaryTitle }) => (
  <Modal isOpen={isOpen } toggle={toggle || null} className={className || null} centered>
    {modalTitle ? <ModalHeader toggle={toggle || null}>{modalTitle}</ModalHeader> : null}
    <ModalBody>
      {message || null}
    </ModalBody>
    <ModalFooter>
      {primaryTitle ? <Button color="primary" onClick={toggle || null}>{primaryTitle}</Button> : null}
      {secondaryTitle ? <Button color="secondary" onClick={toggleSecondary || null}>{secondaryTitle}</Button> : null}
    </ModalFooter>
  </Modal>
)

export default CommonModal