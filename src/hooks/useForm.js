import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateStore } from 'fluxible-js';
import { v4 as uuid } from 'uuid';

function useForm ({
  initialContext = {},
  initialFormValues,
  validators,
  validatorChains = null,
  onSubmit = null,
  onSubmitError = null,
  onSubmitSuccess = null,
  createMutation = null,
  isGraphql = false,
  updateMutation = null,
  transformInput = null,
  onBeforeSaveConfirm = null
}) {
  const [
    { formContext, formValues, formErrors, status, targetRecordId, previousFormValues },
    setState
  ] = React.useState(() => ({
    previousFormValues: { ...initialFormValues },
    formValues: { ...initialFormValues },
    formErrors: {},
    formContext: { ...initialContext },
    status: 'initial',
    targetRecordId: null
  }));

  const isSubmitting = status === 'submitting';
  const operation = targetRecordId ? 'update' : 'create';

  const validateField = React.useCallback(
    (field, values) => {
      const validator = validators[field];
      return validator ? validator(values) : '';
    },
    [validators]
  );

  const setEditMode = React.useCallback(callback => {
    setState(oldState => {
      const {
        formValues = oldState.formValues,
        targetRecordId = null,
        formContext = oldState.formContext
      } = callback({
        formValues: oldState.formValues,
        formContext: oldState.formContext
      });

      return {
        ...oldState,
        previousFormValues: { ...formValues },
        formContext,
        formValues,
        targetRecordId,
        formErrors: {}
      };
    });
  }, []);

  const setField = React.useCallback(
    (field, value) => {
      setState(oldState => {
        const newFormValues = {
          ...oldState.formValues,
          [field]: value
        };

        const newFormErrors = {
          ...oldState.formErrors,
          [field]: validateField(field, newFormValues)
        };

        if (validatorChains) {
          const chain = validatorChains[field];

          if (chain) {
            chain.forEach(field => {
              newFormErrors[field] = validateField(field, newFormValues);
            });
          }
        }

        return {
          ...oldState,
          previousFormValues: { ...oldState.formValues },
          formValues: newFormValues,
          formErrors: newFormErrors
        };
      });
    },
    [validateField, validatorChains]
  );

  const setContext = React.useCallback(newContext => {
    setState(oldState => ({
      ...oldState,
      formContext: {
        ...oldState.formContext,
        ...newContext
      }
    }));
  }, []);

  const validateForm = React.useCallback(() => {
    let hasError = false;
    const newFormErrors = {};

    Object.keys(initialFormValues).forEach(field => {
      const error = validateField(field, formValues);
      if (error) hasError = true;
      newFormErrors[field] = error;
    });

    if (hasError) {
      setState(oldState => ({
        ...oldState,
        formErrors: newFormErrors
      }));
    }

    return hasError;
  }, [initialFormValues, formValues, validateField]);

  const confirmSubmit = React.useCallback(async () => {
    try {
      updateStore({ loading: true });
      let data = null;

      if (isGraphql) {
        const inputData = transformInput
          ? transformInput({ formValues, formContext })
          : formValues;

        let input = {};
        let mutation = null;

        if (operation === 'create') {
          mutation = createMutation;
          input = {
            id: uuid(),
            ...inputData
          };
        } else {
          // update
          mutation = updateMutation;
          input = {
            id: targetRecordId,
            ...inputData
          };
        }

        const result = await API.graphql(
          graphqlOperation(mutation, {
            input
          })
        );

        data = result.data;
      } else {
        data = await onSubmit({ formValues, formContext, setContext });
      }

      if (onSubmitSuccess)
        onSubmitSuccess({ data, formValues, formContext, setContext, operation });

      setState(oldState => ({
        ...oldState,
        status: 'submitSuccess'
      }));

      updateStore({ loading: false });
    } catch (error) {
      console.error('useForm confirmSubmit', error);

      if (onSubmitError)
        await onSubmitError(error, { formValues, formContext, setContext });

      updateStore({ loading: false });

      setState(oldState => ({
        ...oldState,
        status: 'submitError'
      }));
    }
  }, [
    onSubmit,
    formValues,
    formContext,
    setContext,
    onSubmitError,
    onSubmitSuccess,
    transformInput,
    operation,
    isGraphql,
    targetRecordId,
    updateMutation,
    createMutation
  ]);

  const cancelSubmit = React.useCallback(() => {
    setState(oldState => ({
      ...oldState,
      status: 'submitCancelled'
    }));
  }, []);

  const submitHandler = React.useCallback(
    async ev => {
      try {
        if (ev && ev.preventDefault) ev.preventDefault();
        if (isSubmitting) return;
        if (validateForm()) return;

        setState(oldState => ({
          ...oldState,
          status: 'submitting'
        }));

        if (onBeforeSaveConfirm) {
          const result = await onBeforeSaveConfirm({
            formValues,
            formContext,
            onConfirm: confirmSubmit,
            onCancel: cancelSubmit,
            operation,
            targetRecordId
          });

          if (!result) {
            setState(oldState => ({
              ...oldState,
              status: 'submitConfirmError'
            }));
          }
        } else {
          confirmSubmit();
        }
      } catch (error) {
        console.error('useForm submitHandler', error);

        if (onSubmitError)
          await onSubmitError(error, { formValues, formContext, setContext });

        setState(oldState => ({
          ...oldState,
          status: 'submitError'
        }));
      }
    },
    [
      validateForm,
      isSubmitting,
      confirmSubmit,
      formContext,
      formValues,
      onBeforeSaveConfirm,
      onSubmitError,
      setContext,
      cancelSubmit,
      operation,
      targetRecordId
    ]
  );

  const {
    textField: onChangeHandlers,
    autocomplete: autocompleteHandlers,
    fileSelect,
    valueChanged
  } = React.useMemo(
    () =>
      Object.keys(initialFormValues).reduce(
        (accumulator, field) => ({
          valueChanged: {
            ...accumulator.valueChanged,
            [field]: value => {
              setField(field, value);
            }
          },
          textField: {
            ...accumulator.textField,
            [field]: ev => {
              setField(field, ev.target.value);
            }
          },
          autocomplete: {
            ...accumulator.autocomplete,
            [field]: (_, value) => {
              setField(field, value);
            }
          },
          fileSelect: {
            ...accumulator.fileSelect,
            [field]: ev => {
              setField(field, ev.target.files);
            }
          }
        }),
        {
          textField: {},
          autocomplete: {},
          fileSelect: {},
          valueChanged: {}
        }
      ),
    [initialFormValues, setField]
  );

  const resetForm = React.useCallback(() => {
    setState({
      previousFormValues: { ...initialFormValues },
      formValues: { ...initialFormValues },
      formErrors: {},
      formContext: { ...initialContext },
      status: 'initial'
    });
  }, [initialFormValues, initialContext]);

  const setForm = React.useCallback(
    ({ formValues = null, formContext = null, formErrors = null }) => {
      setState(oldState => ({
        ...oldState,
        formValues: formValues || oldState.formValues,
        formContext: formContext || oldState.formContext,
        formErrors: formErrors || oldState.formErrors
      }));
    },
    []
  );

  return {
    previousFormValues,
    formValues,
    formErrors,
    formContext,
    setField,
    onChangeHandlers,
    autocompleteHandlers,
    status,
    isSubmitting,
    submitHandler,
    setContext,
    setEditMode,
    operation,
    resetForm,
    fileSelect,
    valueChanged,
    setForm
  };
}

export default useForm;
