import React from 'react';
import "./style.css"

const SaveModal = (props) => {
  return (
      <div>
          <div className="modal-wrapper"
              style={{
                  transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                  opacity: props.show ? '1' : '0'
              }}>
              <div className="modal-header">
                  <h3>Create adventure title</h3>
                  <span className="close-modal-btn" onClick={props.close}>×</span>
              </div>
              <div className="modal-body">
                  <p>
                      {props.children}
                  </p>
              </div>
              <div className="modal-footer">
                  <button className="btn-cancel" onClick={props.close}>Cancel</button>
                  <button className="btn-continue" onClick={()=>{props.saveQuest(); props.close()}} >Save</button>
              </div>
          </div>
      </div>
  )
}

export default SaveModal;