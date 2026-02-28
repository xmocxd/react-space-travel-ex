import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="construction-page">
      <div className="mb-4">
        <button
          type="button"
          onClick={handleCancel}
          className="text-cyan-400 hover:underline"
        >
          ← Back / Cancel
        </button>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Construct New Spacecraft</h2>

      {apiError && <ErrorMessage message={apiError} />}

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white"
          />
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-400">{validationErrors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-slate-300">
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
            className="mt-1 w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white"
          />
          {validationErrors.capacity && (
            <p className="mt-1 text-sm text-red-400">{validationErrors.capacity}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white"
          />
          {validationErrors.description && (
            <p className="mt-1 text-sm text-red-400">{validationErrors.description}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500 disabled:opacity-50"
          >
            {submitting ? 'Constructing...' : 'Construct'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-slate-600 px-4 py-2 text-slate-300 hover:bg-slate-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Construction;
