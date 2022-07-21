const Toast = ({msg,handleShow,bgColor}) => {
  return (
    <div className={`toast show position-fixed text-light ${bgColor}`} 
    data-bs-autohide="false"
    style={{top: '5px', right: '5px', zIndex:9 , minWidth: 280}} role="alert" aria-live="assertive" aria-atomic="true">
      <div className={`toast-header ${bgColor} text-light`}>
        <strong className="me-auto text-light">{msg.title}</strong>
        <button
          type="button"
          className="btn-close close"
          data-bs-dismiss="toast"
          aria-label="Close"
          style={{outline: 'none'}}
          onClick={handleShow}
        ></button>
      </div>
      <div className="toast-body">{msg.msg}</div>
    </div>
  );
};

export default Toast;
