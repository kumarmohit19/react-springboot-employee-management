import React, { Component } from 'react'

class Modal extends Component {
  render() {
    return (
      <div>
        <div className='modalBg'></div>
        <div className='pop'>
          <span>{this.props.title}</span>
          <hr />
          <h3>
            {this.props.message}: {this.props.id}?
          </h3>
          <button
            className='ConfrimButton'
            onClick={() => this.props.onDelete(this.props.id)}
          >
            Yes
          </button>
          <button className='ConfrimButton' onClick={this.props.onClose}>
            No
          </button>
        </div>
      </div>
    )
  }
}

export default Modal
