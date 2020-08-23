import { updateStore, store } from 'fluxible-js';

export function closePopup () {
  updateStore({
    popup: {
      ...store.popup,
      isOpen: false
    }
  });
}

export function alertMessage ({ title = null, message }) {
  updateStore({
    popup: {
      ...store.popup,
      isOpen: true,
      type: 'message',
      title,
      message,
      onConfirm: null,
      onClose: null
    }
  });
}

export function alertDialog ({
  title = null,
  message,
  onConfirm,
  onCancel: onClose = null
}) {
  updateStore({
    popup: {
      ...store.popup,
      isOpen: true,
      type: 'dialog',
      title,
      message,
      onConfirm,
      onClose
    }
  });
}

export function unknownError () {
  alertMessage({
    message: 'An unknown error occurred. If this error persists, please file a ticket.'
  });
}
