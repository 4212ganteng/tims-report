import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Input } from "./Input";

export const ModalKecamatan = ({
  showModal,
  setShowModal,
  handleChange,
  handleSubmit,
  data,
  setEditData,
  refetch,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal, setShowModal]);

  return (
    <>
      {showModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center w-full transition duration-500 bg-black/50 p-4">
          <div
            ref={modalRef}
            id="modal"
            className="overflow-y-auto max-h-[800px] inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-2xl w-[500px] border"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white p-5 w-full">
              <div className="w-full">
                <div className="mt-3 w-full">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900 flex justify-between items-center"
                    id="modal-headline"
                  >
                    Add Kecamatan
                  </h3>
                  <div className="mt-2 w-full">
                    <div className="flex flex-col gap-2">
                      <Input
                        label="Kecamatan"
                        placeholder="Enter Kecamatan"
                        name="kecamatan"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <Button
                onClick={(e) => {
                  handleSubmit(e);
                  setShowModal(false);
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </Button>
              <Button
                onClick={() => setShowModal(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
