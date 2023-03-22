import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Input } from "./Input";

export const Modal = ({
  showModal,
  setShowModal,
  handleChange,
  handleSubmit,
  dataKecamatan,
  data,
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
            className="overflow-y-auto max-h-[750px] inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-2xl w-[500px] border"
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
                    Add Masyarakat
                  </h3>
                  <div className="mt-2 w-full">
                    <div className="flex flex-col gap-2">
                      <Input
                        type="number"
                        label="NIK"
                        placeholder="NIK"
                        name="nik"
                        onChange={handleChange}
                      />
                      <Input
                        label="Nama"
                        placeholder="Nama"
                        name="nama"
                        onChange={handleChange}
                      />
                      <Input
                        label="Tempat Lahir"
                        placeholder="Tempat Lahir"
                        name="tempat_lahir"
                        onChange={handleChange}
                      />
                      <div className="border py-2">
                        <label className="block text-gray-700 text-sm px-2">
                          Tanggal Lahir
                        </label>
                        <input
                          className="w-full rounded-lg focus:outline-none px-2"
                          type="date"
                          name="tanggal_lahir"
                          onChange={handleChange}
                        />
                      </div>
                      <Input
                        label="Umur"
                        placeholder="Umur"
                        name="umur"
                        onChange={handleChange}
                      />
                      <Input
                        label="Status Kawin"
                        placeholder="Enter Y/N"
                        name="status_kawin"
                        onChange={handleChange}
                      />
                      <Input
                        label="Jenis Kelamin"
                        placeholder="Enter L/P"
                        name="kelamin"
                        onChange={handleChange}
                      />
                      <Input
                        label="Alamat"
                        placeholder="Alamat"
                        name="alamat"
                        onChange={handleChange}
                      />
                      {/* <Input
                        label="Kelurahan"
                        placeholder="Kelurahan"
                        name="kelurahan"
                        onChange={handleChange}
                      /> */}
                      {/* <select
                        name="kecamatan_id"
                        onChange={handleChange}
                        className="w-full py-3 border rounded-lg focus:outline-none appearance-none px-2"
                      >
                        <option value="">Pilih Kecamatan</option>
                        {dataKecamatan.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.nama}
                          </option>
                        ))}
                      </select> */}
                      <Input
                        label="Kecamatan"
                        placeholder="Kecamatan"
                        name="kecamatan"
                        onChange={handleChange}
                      />
                      {/* <Input
                        label="Kota"
                        placeholder="Kota"
                        name="kota"
                        onChange={handleChange}
                      /> */}
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
