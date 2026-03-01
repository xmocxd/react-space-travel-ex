import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders nothing when message is empty', () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the error message', () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders a Dismiss button when onDismiss is provided', () => {
    const onDismiss = jest.fn();
    render(<ErrorMessage message="Error" onDismiss={onDismiss} />);
    const button = screen.getByRole('button', { name: /dismiss/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not render Dismiss button when onDismiss is not provided', () => {
    render(<ErrorMessage message="Error" />);
    expect(screen.queryByRole('button', { name: /dismiss/i })).not.toBeInTheDocument();
  });
});
