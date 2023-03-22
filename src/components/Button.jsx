import React from "react";

export const Button = ({ title, variant, isLoading }) => {
  const variants = {
    primary:
      "text-white bg-cyan-500 font-bold rounded-xl uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150",
    secondary:
      "text-cyan-500 border border-cyan-500 hover:bg-cyan-500 hover:text-white active:bg-cyan-600",
    tertiary:
      "text-cyan-500 border border-cyan-500 hover:bg-cyan-500 hover:text-white active:bg-cyan-600",
  };

  return (
    <button
      className={`w-full ${
        variant ? variants[variant] : variants.primary
      } flex justify-center items-center`}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        title
      )}
    </button>
  );
};
