import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  it('renders default message and has loading class', () => {
    const { container } = render(<Loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(container.querySelector('.loading-component')).toBeInTheDocument();
  });

  it('renders custom message when provided', () => {
    render(<Loading message="Fetching planets..." />);
    expect(screen.getByText('Fetching planets...')).toBeInTheDocument();
  });
});
