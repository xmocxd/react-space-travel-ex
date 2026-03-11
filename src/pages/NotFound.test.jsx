import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound page', () => {
  it('renders 404, message, and Back to Home link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Page Not Found/i })).toBeInTheDocument();
    expect(screen.getByText(/Sorry, the page you are looking for does not exist/i)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Back to Home/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
