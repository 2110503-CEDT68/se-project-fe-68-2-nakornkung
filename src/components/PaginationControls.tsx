import { useEffect, useState } from "react";

interface PaginationControlsProps {
  pages: number;
  currentPage: number;
  limit: number;
  setPage: (page: number | ((state: number) => number)) => void;
  setLimit: (limit: number) => void;
}

const limitSteps = [
  10,
  20,
  50,
];

export default function PaginationControls({ pages, currentPage, limit, setPage, setLimit }: PaginationControlsProps) {
  const [pageInput, setPageInput] = useState(currentPage.toString());

  useEffect(() => {
    if (!pageInput) return;
    const value = Number(pageInput);
    if (Number.isNaN(value) || value < 1 || value > pages) return;
    setPage(value);
  }, [pageInput, pages, setPage]);

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  const handleCommitPage = () => {
    const safePage = Math.min(Math.max(Number(pageInput), 1), pages || 1);
    setPageInput(safePage.toString())
    setPage(safePage);
  }

  return (
    <div className="flex gap-4">
      {/* page selector */}
      <div className="grid grid-cols-5 rounded-3xl border-2 border-text-4 overflow-clip 
      *:p-4 *:hover:enabled:bg-secondary-purple *:disabled:bg-gray-200 *:disabled:text-text-3
      *:disabled:dark:bg-dark-bg *:transition-colors
      *:dark:bg-dark-secondary *:hover:enabled:dark:bg-dark-primary dark:border-dark-secondary">
        <button
          onClick={() => setPage(1)}
          disabled={currentPage === 1 || pages === 0}
        >
          {"<<"}
        </button>
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1 || pages === 0}
        >
          {"<"}
        </button>
        <input
          type="number"
          className="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          onBlur={handleCommitPage}
          onKeyDown={(e) => e.key === "Enter" && handleCommitPage()}
          min={1}
          max={pages}
        />
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === pages || pages === 0}
        >
          {">"}
        </button>
        <button
          onClick={() => setPage(pages)}
          disabled={currentPage === pages || pages === 0}
        >
          {">>"}
        </button>
      </div>

      {/* page size */}
      <select className="my-2 px-2 rounded-xl border border-text-4 bg-secondary dark:bg-dark-secondary dark:border-dark-bg" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
        {limitSteps.map((step) => (
          <option key={step}>
            {step}
          </option>
        ))}
      </select>
    </div>
  );
}
