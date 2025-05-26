import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import '@testing-library/jest-dom';

describe('Pagination', () => {
  it('renders current page', () => {
    render(<Pagination page={2} onPrev={() => { }} onNext={() => { }} />);
    expect(screen.getByText(/Page 2/i)).toBeInTheDocument();
  });

  it('calls onPrev when Previous is clicked', () => {
    const onPrev = jest.fn();
    render(<Pagination page={2} onPrev={onPrev} onNext={() => { }} />);
    fireEvent.click(screen.getByText(/Previous/i));
    expect(onPrev).toHaveBeenCalled();
  });

  it('calls onNext when Next is clicked', () => {
    const onNext = jest.fn();
    render(<Pagination page={2} onPrev={() => { }} onNext={onNext} />);
    fireEvent.click(screen.getByText(/Next/i));
    expect(onNext).toHaveBeenCalled();
  });

  it('disables Previous button when disablePrev is true', () => {
    render(<Pagination page={1} onPrev={() => { }} onNext={() => { }} disablePrev />);
    expect(screen.getByText(/Previous/i)).toBeDisabled();
  });

  it('disables Next button when disableNext is true', () => {
    render(<Pagination page={1} onPrev={() => { }} onNext={() => { }} disableNext />);
    expect(screen.getByText(/Next/i)).toBeDisabled();
  });
});