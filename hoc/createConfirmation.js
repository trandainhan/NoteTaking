import React from 'react'
import ReactDOM from 'react-dom'
import Confirm from '../components/Confirm'

const confirm = (message, callBack) => {
  let cleanup, component, wrapper;
  wrapper = document.body.appendChild(document.createElement('div'));
  component = ReactDOM.render(<Confirm title={message}/>, wrapper);
  cleanup = () => {
    ReactDOM.unmountComponentAtNode(wrapper);
    return setTimeout(function() {
      return wrapper.remove();
    });
  };
  return component.promise.then(() => {
    cleanup()
    callBack()
  }).catch(() => {
    cleanup()
  })
};

export default confirm
