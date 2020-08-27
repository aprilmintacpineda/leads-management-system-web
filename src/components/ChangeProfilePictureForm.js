import React from 'react';
import ReactImgCrop from 'react-image-crop';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';

import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CameraAltIcon from '@material-ui/icons/CameraAlt';

import validate from 'libs/validate';
import { getCroppedImg } from 'libs/helpers';

import useForm from 'hooks/useForm';
import { alertMessage } from 'fluxible/popup';

const useStyles = makeStyles({
  editProfileIconBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  hiddenInput: {
    display: 'none'
  }
});

const cropConfig = {
  aspect: 1,
  width: 150,
  height: 150,
  x: 0,
  y: 0
};

function ChangeProfilePictureForm ({
  updateMutation,
  mutationName,
  savePath,
  targetRecordId,
  onSubmitSuccess = null,
  title
}) {
  const classes = useStyles();
  const fileInputRef = React.useRef();
  const [isOpen, setIsOpen] = React.useState(false);
  const [src, setSrc] = React.useState(null);

  const onSubmit = React.useCallback(
    async ({ formValues, setContext }) => {
      const fileName = uuid();
      const croppedImage = await getCroppedImg(
        formValues.selectedFiles[0],
        formValues.crop,
        fileName
      );

      const trimmedPath = savePath.replace(/[/]+$/, '').replace(/^[/]+/, '');

      const { key: profilePicture } = await Storage.put(
        `${trimmedPath}/${fileName}.jpg`,
        croppedImage
      );

      const { data } = await API.graphql(
        graphqlOperation(updateMutation, {
          input: {
            id: targetRecordId,
            profilePicture
          }
        })
      );

      setContext({
        resultRecord: data[mutationName]
      });

      return data;
    },
    [updateMutation, savePath, targetRecordId, mutationName]
  );

  const formOptions = React.useMemo(
    () => ({
      initialFormValues: {
        selectedFiles: null,
        crop: cropConfig
      },
      initialContext: {
        resultRecord: null
      },
      validators: {
        selectedFiles: ({ selectedFiles }) =>
          validate(selectedFiles, ['required', 'len:1'])
      },
      onSubmit,
      onSubmitSuccess
    }),
    [onSubmit, onSubmitSuccess]
  );

  const {
    formValues,
    formContext,
    fileSelect,
    setField,
    valueChanged,
    submitHandler,
    resetForm,
    isSubmitting
  } = useForm(formOptions);

  const toggle = React.useCallback(() => {
    setIsOpen(isVisible => !isVisible);
  }, []);

  const openFilePicker = React.useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const readDataUrl = React.useCallback(async () => {
    try {
      setSrc(null);

      const fileReader = new FileReader();

      fileReader.addEventListener('load', () => {
        setField('crop', cropConfig);
        setSrc(fileReader.result);
      });

      fileReader.readAsDataURL(formValues.selectedFiles[0]);
    } catch (error) {
      console.error(error);
      alertMessage({ message: 'Could not read the picture you selected.' });
      setField('selectedFiles', null);
    }
  }, [setField, formValues.selectedFiles]);

  React.useEffect(() => {
    if (formValues.selectedFiles) readDataUrl();
  }, [formValues.selectedFiles, readDataUrl]);

  React.useEffect(() => {
    if (formContext.resultRecord) toggle();
  }, [formContext.resultRecord, toggle]);

  return (
    <>
      <IconButton className={classes.editProfileIconBtn} size="small" onClick={toggle}>
        <CameraAltIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={isOpen}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        onExit={resetForm}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {!formValues.selectedFiles ? (
            <Box display="flex" justifyContent="center" alignItems="center" p={5}>
              <Button variant="contained" color="primary" onClick={openFilePicker}>
                Select file
              </Button>
            </Box>
          ) : src ? (
            <ReactImgCrop
              crop={formValues.crop}
              src={src}
              onChange={valueChanged.crop}
              locked
              disabled={isSubmitting}
            />
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" p={5}>
              <CircularProgress />
            </Box>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className={classes.hiddenInput}
            onChange={fileSelect.selectedFiles}
            accept="*.jpg,*.png"
          />
        </DialogContent>
        <DialogActions>
          <Box flex="1" display="flex" justifyContent="space-between">
            <Button onClick={openFilePicker} disabled={!src || isSubmitting}>
              Select picture
            </Button>
            <Box>
              <Button color="secondary" onClick={toggle} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={submitHandler}
                disabled={!src || isSubmitting}>
                Submit
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(ChangeProfilePictureForm);
