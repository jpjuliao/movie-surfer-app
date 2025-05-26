type PaginationProps = {
  page: number;
  onPrev: () => void;
  onNext: () => void;
  onFirst: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  disableFirst?: boolean;
};

const Pagination = ({
  page,
  onPrev,
  onNext,
  onFirst,
  disablePrev = false,
  disableNext = false,
  disableFirst = false,
}: PaginationProps) => (
  <div className="flex justify-center gap-4 my-6">
    <button
      onClick={onFirst}
      disabled={disableFirst}
      className="px-4 py-2 rounded bg-gray-200 text-black disabled:opacity-50"
    >
      First
    </button>
    <button
      onClick={onPrev}
      disabled={disablePrev}
      className="px-4 py-2 rounded bg-gray-200 text-black disabled:opacity-50"
    >
      Previous
    </button>
    <span className="self-center text-white">Page {page}</span>
    <button
      onClick={onNext}
      disabled={disableNext}
      className="px-4 py-2 rounded bg-gray-200 text-black disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default Pagination;