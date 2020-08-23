export default () => ({
  authUser: null,
  loading: false,
  popup: {
    type: '',
    isOpen: false,
    message: '',
    onCancel: null,
    onConfirm: null
  }
});
