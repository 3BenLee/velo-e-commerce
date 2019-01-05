import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import './ItemAddedModal.css';

class ItemAddedModal extends React.Component {

  render () {
    return (
      <div>
          <Modal className="item-added-modal" isOpen={this.props.open} toggle={this.props.toggle} className={this.props.className}>
            <ModalHeader className="item-added-modal-header">
              <p className="item-added-modal-p">Item Added To Cart</p>
            </ModalHeader>
          </Modal>
        </div>
    )
  };
}
export default ItemAddedModal;