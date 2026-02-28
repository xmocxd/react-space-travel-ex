import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Construction Page Component
 * 
 * Purpose: Allow users to construct (create) new spacecraft.
 * 
 * TODO: Implement the following features:
 * - Form with fields for name, capacity, and description
 * - Validation for required fields (name, capacity, description)
 * - Display error messages for missing/invalid fields
 * - Submit handler to create new spacecraft via API
 * - Navigate back to previous page after successful creation
 * - Cancel button to navigate back without saving
 * - Handle loading states during submission
 * - Handle API errors
 */
function Construction() {
  const navigate = useNavigate();

  // TODO: Add state for form data (name, capacity, description)
  // TODO: Add state for validation errors
  // TODO: Add state for loading status
  // TODO: Add state for API errors

  // TODO: Implement form input change handlers

  // TODO: Implement form validation function
  // - Check if name is provided
  // - Check if capacity is provided and valid (number)
  // - Check if description is provided

  // TODO: Implement form submit handler
  // - Validate form data
  // - If valid, call API to create spacecraft
  // - Navigate back on success
  // - Show errors on failure

  // TODO: Implement cancel/back handler

  return (
    <div className="construction-page">
      <h2>Construct New Spacecraft</h2>
      {/* TODO: Add back/cancel button */}
      {/* TODO: Create form with:
          - Name input field (text, required)
          - Capacity input field (number, required)
          - Description textarea (text, required)
          - Submit button
          - Cancel button
      */}
      {/* TODO: Display validation errors for each field */}
      {/* TODO: Display API errors */}
      {/* TODO: Show loading state during submission */}
    </div>
  );
}

export default Construction;
