import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Wrench } from 'lucide-react';
import { useSpacecraft } from '../context/SpacecraftContext';
import ErrorMessage from '../components/ErrorMessage';
import { SHIP_IMAGE_OPTIONS } from '../constants/shipImages';

function Construction() {
  const navigate = useNavigate();
  const { addSpacecraft, error: apiError } = useSpacecraft();
  const [submitting, setSubmitting] = useState(false);


  // initial form state, builds the form within component return based on this structure
  const initial = {
    name: { value: '', text: 'Name', type: 'text', validator: /^.+$/, valid: true, errorMessage: 'Name is required' },
    capacity: { value: '', text: 'Capacity', type: 'text', validator: /^[0-9]+$/, valid: true, errorMessage: 'A whole, positive number is required' },
    description: { value: '', text: 'Description', type: 'text', validator: /^.+$/, valid: true, errorMessage: 'Description is required' },
    pictureUrl: { value: '', text: 'Ship Image', type: 'image', validator: null, valid: true, errorMessage: 'Ship Image is required' },
  };

  const [formState, setFormState] = useState(initial);
  const [formValid, setFormValid] = useState(true);


  function validateForm(state) {
    // validate form, will update state with validation flags which can be used to highlight invalid fields
    
    let formValid = true;
    let newState = { ...state };
    
    for (const field in state) {
      const fieldData = state[field];
      if (fieldData.validator instanceof RegExp && fieldData.validator.test(fieldData.value)) {
        newState = {
          ...newState,
          [field]: { ...newState[field], valid: true }
        };
      } else if (typeof fieldData.validator === 'boolean' && fieldData.value === fieldData.validator) {
        newState = {
          ...newState,
          [field]: { ...newState[field], valid: true }
        };
      } 
      else if (fieldData.validator === null) {
        // null = no validation, just pass
        newState = {
          ...newState,
          [field]: { ...newState[field], valid: true }
        };
      } else {
        formValid = false;
        newState = {
          ...newState,
          [field]: { ...newState[field], valid: false }
        };
      }
    }
    return { formValid, newState };
  }
  
  function updateField({ field, value }) {
    // update field value in state
    
    setFormState(state => ({
      ...state,
      [field]: { ...state[field], value: value }
    }));
  }
  
  
  
  async function submit() {
    // validate form before submitting
    
    const { formValid, newState } = validateForm(formState);
    
    setFormValid(formValid);
    
    if (formValid) {
      setSubmitting(true);

      await formAction(newState);
      console.log('Form submitted:', newState);
      setFormState(initial); // clear form on submit

      setSubmitting(false);
    } else {
      setFormState(newState); // update state with validation results
    }
  }
  
  
  async function formAction(user) {
    // do the action for the form if submission is valid
    const result = await addSpacecraft({
      name: user.name.value.trim(),
      capacity: user.capacity.value.trim(),
      description: user.description.value.trim(),
      pictureUrl: user.pictureUrl?.value?.trim() || undefined,
    });
    if (result?.success) navigate('/spacecrafts');
  }
  
  console.log(formState);  

  return (
    <div className="construction-page space-y-5 sm:space-y-6">
      <div>
        <button
          type="button"
          className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 text-base font-medium text-blue-400 hover:text-blue-300 transition-colors"
          onClick={() => navigate('/spacecrafts')}
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Back
        </button>
      </div>

      <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">
        <Wrench className="h-5 w-5 text-blue-500 shrink-0" />
        Construct New Spacecraft
      </h2>

      {apiError && <ErrorMessage message={apiError} />}

      {!formValid && (
        <div className="text-red-500 mb-4 text-sm sm:text-base">
          Please correct the errors below and try again.
        </div>
      )}

      <form className="mx-auto max-w-xl space-y-5">
        {
          // build the form based on the state structure specified
          Object.entries(formState).map(([key, { value, text, type, valid, errorMessage }], index) => {
            if (type === 'image') {

            }
            switch (type) {
              case 'text':
              case 'number':
              case 'email':
                return (
                  <div key={index}>
                    <label className="block text-base font-medium text-zinc-300" htmlFor={key}>{text}</label>
                    <input
                      id={key}
                      className={`mt-1.5 w-full min-h-[44px] rounded-lg border bg-zinc-800/80 px-3 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-colors
                      ${valid ? 'border-zinc-600' : 'border-red-500'}`}
                      type={type}
                      name={key}
                      value={value}
                      onChange={(e) => updateField({ field: key, value: e.target.value })}
                    />
                    {valid ? null : (<span className='text-red-500'>{errorMessage}</span>)}
                  </div>
                );
              case 'image':
                return (
                <div key={index}
                  className={valid ? 'border-zinc-600' : 'border-red-500'}>
                  <label className="block text-base font-medium text-zinc-300 mb-2">{text}</label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => updateField({ field: key, value: '' })}
                      className={`h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 bg-zinc-800 transition-colors ${
                        !value ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-zinc-600 hover:border-zinc-500'
                      }`}
                      title="No image"
                    >
                      <span className="text-xs text-zinc-500">None</span>
                    </button>
                    {SHIP_IMAGE_OPTIONS.map(({ id, src }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => updateField({ field: key, value: id })}
                        className={`h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-colors ${
                          value === id ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-zinc-600 hover:border-zinc-500'
                        }`}
                      >
                        <img src={src} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              );
              default:
                return null;
            }
          })
        }

        <div className="text-center">
          <button onClick={(e) => { e.preventDefault(); submit(); }}
            disabled={submitting}
            className="order-1 inline-flex w-full min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-500 disabled:opacity-50 transition-colors shadow-sm shadow-blue-900/20 sm:order-none sm:w-auto"
            type="submit">

            {submitting ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
            ) : (
              <Wrench className="h-4 w-4 shrink-0" />
            )}
            {submitting ? 'Constructing...' : 'Construct'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default Construction;






