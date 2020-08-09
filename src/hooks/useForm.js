/** @format */

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
  mutation = null,
  transformInput = null
}) {
  const [{ formContext, formValues, formErrors, status }, setState] = React.useState(
    () => ({
      formValues: { ...initialFormValues },
      formErrors: {},
      formContext: { ...initialContext },
      status: 'initial'
    })
  );

  const isSubmitting = status === 'submitting';

  const validateField = React.useCallback(
    (field, values) => {
      const validator = validators[field];
      return validator ? validator(values) : '';
    },
    [validators]
  );

  const setField = React.useCallback(
    (field, value) => {
      setState(oldState => {
        const newFormValues = {
          ...oldState.formValues,
          [field]: value
        };

        return {
          ...oldState,
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

        if (mutation) {
          const inputData = transformInput
            ? transformInput({ formValues, formContext })
            : formValues;

          const { data } = await API.graphql(
            graphqlOperation(mutation, {
              input: {
                id: uuid(),
                ...inputData
              }
            })
          );

          if (onSubmitSuccess)
            onSubmitSuccess({ data, formValues, formContext, setContext });
        } else {
          await onSubmit({ formValues, formContext, setContext });
        }

        updateStore({ loading: false });

        setState(oldState => ({
          ...oldState,
          status: 'submitSuccess'
        }));
      } catch (error) {
        console.log('useForm', error);

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
      mutation,
      onSubmitSuccess,
      isSubmitting,
      transformInput
    ]
  );

  const autocompleteHandlers = React.useMemo(
    () =>
      Object.keys(initialFormValues).reduce(
        (accumulator, field) => ({
          ...accumulator,
          [field]: (_, value) => {
            setField(field, value);
          }
        }),
        {}
      ),
    [initialFormValues, setField]
  );

  const onChangeHandlers = React.useMemo(
    () =>
      Object.keys(initialFormValues).reduce(
        (accumulator, field) => ({
          ...accumulator,
          [field]: ev => {
            setField(field, ev.target.value);
          }
        }),
        {}
      ),
    [initialFormValues, setField]
  );

  const resetForm = React.useCallback(() => {
    setState({
      formValues: { ...initialFormValues },
      formErrors: {},
      formContext: { ...initialContext },
      status: 'initial'
    });
  }, [initialFormValues, initialContext]);

  return {
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
    resetForm
  };
}

export default useForm;
