/** @format */

import { updateStore, store } from 'fluxible-js';

export function closePopup () {
  updateStore({
    popup: {
      ...store.popup,
      isOpen: false
    }
  });
}

export function alertMessage ({ message }) {
  updateStore({
    popup: {
      ...store.popup,
      isOpen: true,
      type: 'message',
      message
    }
  });
}
