import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import '@testing-library/jest-dom';

describe('Pagination', () => {
  it('renders current page', () => {
    render(<Pagination page={2} onPrev={() => {}} onNext={() => {}} onFirst={() => {}} />);
    expect(screen.getByText(/Page 2/i)).toBeInTheDocument();
  });

  it('calls onPrev when Previous is clicked', () => {
    const onPrev = jest.fn();
    render(<Pagination page={2} onPrev={onPrev} onNext={() => {}} onFirst={() => {}} />);
    fireEvent.click(screen.getByText(/Previous/i));
    expect(onPrev).toHaveBeenCalled();
  });

  it('calls onNext when Next is clicked', () => {
    const onNext = jest.fn();
    render(<Pagination page={2} onPrev={() => {}} onNext={onNext} onFirst={() => {}} />);
    fireEvent.click(screen.getByText(/Next/i));
    expect(onNext).toHaveBeenCalled();
  });

  it('calls onFirst when First is clicked', () => {
    const onFirst = jest.fn();
    render(<Pagination page={2} onPrev={() => {}} onNext={() => {}} onFirst={onFirst} />);
    fireEvent.click(screen.getByText(/First/i));
    expect(onFirst).toHaveBeenCalled();
  });

  it('disables Previous button when disablePrev is true', () => {
    render(<Pagination page={1} onPrev={() => {}} onNext={() => {}} onFirst={() => {}} disablePrev />);
    expect(screen.getByText(/Previous/i)).toBeDisabled();
  });

  it('disables Next button when disableNext is true', () => {
    render(<Pagination page={1} onPrev={() => {}} onNext={() => {}} onFirst={() => {}} disableNext />);
    expect(screen.getByText(/Next/i)).toBeDisabled();
  });

  it('disables First button when disableFirst is true', () => {
    render(<Pagination page={1} onPrev={() => {}} onNext={() => {}} onFirst={() => {}} disableFirst />);
    expect(screen.getByText(/First/i)).toBeDisabled();
  });
});