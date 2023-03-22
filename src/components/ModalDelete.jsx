import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Important from "../assets/icons/inportant.png";
import { Input } from "./Input";

export const ModalDelete = ({
  showModal,
  setShowModal,
  handleChange,
  handleDelete,
  data,
  setEditData,
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
        <div className="fixed z-10 inset-0 flex items-center overflow-y-auto justify-center w-full transition duration-500 bg-black/50 p-4">
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
                <div className="mt-3 w-full flex justify-center flex-col items-center">
                  <img src={Important} alt="important" className="h-36 w-36" />
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 text-center pt-8 pb-4"
                    id="modal-headline"
                  >
                    Are u sure want to delete this data?
                  </h3>
                  <p>data will be deleted and can't restored.</p>
                </div>
              </div>
            </div>
            <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <Button
                onClick={() => {
                  handleDelete();
                  setShowModal(false);
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Delete
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
