import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  it('renders default message', () => {
    render(<Loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders custom message when provided', () => {
    render(<Loading message="Fetching planets..." />);
    expect(screen.getByText('Fetching planets...')).toBeInTheDocument();
  });

  it('has loading component class', () => {
    const { container } = render(<Loading />);
    const wrapper = container.querySelector('.loading-component');
    expect(wrapper).toBeInTheDocument();
  });
});
