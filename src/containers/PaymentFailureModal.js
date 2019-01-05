import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import './PaymentFailureModal.css';

class PaymentFailureModal extends React.Component {

  render () {
    return (
      <div>
          <Modal className="payment-failure-modal" isOpen={this.props.open} toggle={this.props.toggle} className={this.props.className}>
            <ModalHeader className="payment-failure-modal-header">
              <p className="payment-failure-modal-p">Please Check Your Card Information Again</p>
            </ModalHeader>
          </Modal>
        </div>
    )
  };
}
export default PaymentFailureModal;