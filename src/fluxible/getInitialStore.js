export default () => ({
  authUser: null,
  loading: false,
  isAuthenticated: false,
  leadStatuses: {
    data: [],
    status: 'initial'
  },
  popup: {
    type: '',
    isOpen: false,
    message: '',
    onCancel: null,
    onConfirm: null
  }
});
