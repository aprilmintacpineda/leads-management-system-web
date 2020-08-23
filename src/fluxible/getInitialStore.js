export default () => ({
  authUser: null,
  loading: false,
  isAuthenticated: false,
  popup: {
    type: '',
    isOpen: false,
    message: '',
    onCancel: null,
    onConfirm: null
  }
});
