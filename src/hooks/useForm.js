import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateStore } from 'fluxible-js';
import { v4 as uuid } from 'uuid';

function useForm ({
  initialContext = {},
  initialFormValues,
  validators,
  onSubmit = null,
  onSubmitError = null,
  onSubmitSuccess = null,
  createMutation = null,
  isGraphql = false,
  updateMutation = null,
  transformInput = null
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
        targetRecordId
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

        return {
          ...oldState,
          previousFormValues: { ...oldState.formValues },
          formValues: newFormValues,
          formErrors: {
            ...oldState.formErrors,
            [field]: validateField(field, newFormValues)
          }
        };
      });
    },
    [validateField]
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

  const submitHandler = React.useCallback(
    async ev => {
      if (ev && ev.preventDefault) ev.preventDefault();
      if (isSubmitting) return;

      try {
        if (validateForm()) return;

        setState(oldState => ({
          ...oldState,
          status: 'submitting'
        }));

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
          await onSubmit({ formValues, formContext, setContext });
        }

        if (onSubmitSuccess)
          onSubmitSuccess({ data, formValues, formContext, setContext, operation });

        setState(oldState => ({
          ...oldState,
          status: 'submitSuccess'
        }));

        updateStore({ loading: false });
      } catch (error) {
        console.error('useForm', error);

        if (onSubmitError)
          await onSubmitError(error, { formValues, formContext, setContext });

        updateStore({ loading: false });

        setState(oldState => ({
          ...oldState,
          status: 'submitError'
        }));
      }
    },
    [
      validateForm,
      onSubmit,
      formValues,
      formContext,
      setContext,
      onSubmitError,
      onSubmitSuccess,
      isSubmitting,
      transformInput,
      operation,
      isGraphql,
      targetRecordId,
      updateMutation,
      createMutation
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
    valueChanged
  };
}

export default useForm;
