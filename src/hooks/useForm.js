/** @format */

import React from 'react';
import { updateStore } from 'fluxible-js';

function useForm ({
  initialContext = {},
  initialFormValues,
  validators,
  onSubmit,
  onSubmitError
}) {
  const [{ formContext, formValues, formErrors, status }, setState] = React.useState(
    () => ({
      formValues: { ...initialFormValues },
      formErrors: {},
      formContext: { ...initialContext },
      status: 'initial'
    })
  );

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

  const submitHandler = React.useCallback(async () => {
    try {
      if (validateForm()) return;

      setState(oldState => ({
        ...oldState,
        status: 'submitting'
      }));

      updateStore({ loading: true });
      await onSubmit({ formValues, formContext, setContext });
      updateStore({ loading: false });

      setState(oldState => ({
        ...oldState,
        status: 'submitSuccess'
      }));
    } catch (error) {
      console.log('useForm', error);

      await onSubmitError(error, { formValues, formContext, setContext });
      updateStore({ loading: false });

      setState(oldState => ({
        ...oldState,
        status: 'submitError'
      }));
    }
  }, [validateForm, onSubmit, formValues, formContext, setContext, onSubmitError]);

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

  return {
    formValues,
    formErrors,
    formContext,
    setField,
    onChangeHandlers,
    status,
    isSubmitting: status === 'submitting',
    submitHandler,
    setContext
  };
}

export default useForm;
