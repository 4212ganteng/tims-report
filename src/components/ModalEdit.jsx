import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Input } from "./Input";

export const ModalEdit = ({
  showModal,
  setShowModal,
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
                    Edit Masyarakat
                  </h3>
                  <div className="mt-2 w-full">
                    <div className="flex flex-col gap-2">
                      <Input
                        type="number"
                        label="NIK"
                        placeholder="NIK"
                        name="nik"
                        onChange={(e) =>
                          setEditData({ ...data, nik: e.target.value })
                        }
                        value={data?.nik}
                      />
                      <Input
                        label="Nama"
                        placeholder="Nama"
                        name="nama"
                        onChange={(e) =>
                          setEditData({ ...data, nama: e.target.value })
                        }
                        value={data?.nama}
                      />
                      <Input
                        label="Alamat"
                        placeholder="Tempat Lahir"
                        name="tempat_lahir"
                        onChange={(e) =>
                          setEditData({ ...data, tempat_lahir: e.target.value })
                        }
                        value={data?.tempat_lahir}
                      />
                      <div className="border py-2">
                        <label className="block text-gray-700 text-sm px-2">
                          Tanggal Lahir
                        </label>
                        <input
                          className="w-full rounded-lg focus:outline-none px-2"
                          type="date"
                          name="tanggal_lahir"
                          onChange={(e) =>
                            setEditData({
                              ...data,
                              tanggal_lahir: e.target.value,
                            })
                          }
                          value={data?.tanggal_lahir}
                        />
                      </div>
                      <Input
                        label="Umur"
                        placeholder="Umur"
                        name="umur"
                        onChange={(e) =>
                          setEditData({ ...data, umur: e.target.value })
                        }
                        value={data?.umur}
                      />
                      <Input
                        label="Status Kawin"
                        placeholder="Enter Y/N"
                        name="status_kawin"
                        onChange={(e) =>
                          setEditData({ ...data, status_kawin: e.target.value })
                        }
                        value={data?.status_kawin}
                      />
                      <Input
                        label="Jenis Kelamin"
                        placeholder="Enter L/P"
                        name="jenis_kelamin"
                        onChange={(e) =>
                          setEditData({
                            ...data,
                            kelamin: e.target.value,
                          })
                        }
                        value={data?.kelamin}
                      />
                      <Input
                        label="Alamat"
                        placeholder="Alamat"
                        name="alamat"
                        onChange={(e) =>
                          setEditData({ ...data, alamat: e.target.value })
                        }
                        value={data?.alamat}
                      />
                      {/* <Input
                        placeholder="Kelurahan"
                        name="kelurahan"
                        onChange={(e) =>
                          setEditData({ ...data, kelurahan: e.target.value })
                        }
                        value={data?.kelurahan}
                      /> */}
                      {/* <select
                        name="kecamatan_id"
                        onChange={(e) => {
                          setEditData({
                            ...data,
                            kecamatan_id: e.target.value,
                          });
                        }}
                        className="py-3 border rounded-lg focus:outline-none appearance-none w-full px-2"
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
                        name="kecamatan"
                        placeholder="Kecamatan"
                        onChange={(e) =>
                          setEditData({
                            ...data,
                            kecamatan: e.target.value,
                          })
                        }
                        value={data?.kecamatan}
                      />
                      {/* <Input
                        placeholder="Kota"
                        name="kota"
                        onChange={(e) =>
                          setEditData({ ...data, kota: e.target.value })
                        }
                        value={data?.kota}
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
                  refetch();
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
