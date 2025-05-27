import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Header from './Header';
import '../types/global.d.ts';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

describe('Header', () => {
  it('renders h1 title on home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1, name: /pop movies/i })).toBeInTheDocument();
    expect(screen.queryByText(/movie details/i)).not.toBeInTheDocument();
  });

  it('renders back button, h2, and h1 on detail page', () => {
    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Header movieTitle="Interstellar" />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /movie details/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /interstellar/i })).toBeInTheDocument();
  });

  it('calls navigate(-1) when back button is clicked', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Header movieTitle="Test Movie" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /go back/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});