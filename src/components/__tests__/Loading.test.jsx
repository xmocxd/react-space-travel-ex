import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading', () => {
  it('renders default message when no message prop is passed', () => {
    render(<Loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders custom message when message prop is provided', () => {
    render(<Loading message="Fetching spacecraft..." />);
    expect(screen.getByText('Fetching spacecraft...')).toBeInTheDocument();
  });

  it('has a loading spinner (aria-hidden element)', () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector('[aria-hidden]');
    expect(spinner).toBeInTheDocument();
  });
});
