import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Wrench } from 'lucide-react';
import { useSpacecraft } from '../context/SpacecraftContext';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Construction Page Component
 *
 * Purpose: Allow users to construct (create) new spacecraft.
 */
function Construction() {
  const navigate = useNavigate();
  const { addSpacecraft, error: apiError } = useSpacecraft();

  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    description: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = useCallback(() => {
    const err = {};
    if (!formData.name?.trim()) err.name = 'Name is required';
    if (!formData.capacity?.trim()) err.capacity = 'Capacity is required';
    else if (!/^\d+$/.test(formData.capacity) || Number(formData.capacity) < 1) {
      err.capacity = 'Capacity must be a positive number';
    }
    if (!formData.description?.trim()) err.description = 'Description is required';
    setValidationErrors(err);
    return Object.keys(err).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;
      setSubmitting(true);
      const result = await addSpacecraft({
        name: formData.name.trim(),
        capacity: formData.capacity.trim(),
        description: formData.description.trim(),
      });
      setSubmitting(false);
      if (result?.success) navigate('/spacecrafts');
    },
    [formData, validate, addSpacecraft, navigate]
  );

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="construction-page space-y-8 sm:space-y-10">
      <div>
        <button
          type="button"
          onClick={handleCancel}
          className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 text-base font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Back / Cancel
        </button>
      </div>

      <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-50">
        <Wrench className="h-5 w-5 text-blue-500 shrink-0" aria-hidden />
        Construct New Spacecraft
      </h2>

      {apiError && <ErrorMessage message={apiError} />}

      <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6">
        <div>
          <label htmlFor="name" className="block text-base font-medium text-zinc-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1.5 w-full min-h-[44px] rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-colors"
          />
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-400">{validationErrors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="capacity" className="block text-base font-medium text-zinc-300">
            Capacity
          </label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            min="1"
            value={formData.capacity}
            onChange={handleChange}
            required
            className="mt-1.5 w-full min-h-[44px] rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-colors"
          />
          {validationErrors.capacity && (
            <p className="mt-1 text-sm text-red-400">{validationErrors.capacity}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-base font-medium text-zinc-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1.5 w-full min-h-[44px] rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-colors resize-y"
          />
          {validationErrors.description && (
            <p className="mt-1 text-sm text-red-400">{validationErrors.description}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="submit"
            disabled={submitting}
            className="order-1 inline-flex w-full min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-500 disabled:opacity-50 transition-colors shadow-sm shadow-blue-900/20 sm:order-none sm:w-auto"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
            ) : (
              <Wrench className="h-4 w-4 shrink-0" aria-hidden />
            )}
            {submitting ? 'Constructing...' : 'Construct'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full min-h-[44px] cursor-pointer rounded-xl border border-zinc-600 px-5 py-3 text-base font-medium text-zinc-300 hover:bg-zinc-800 transition-colors sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Construction;
