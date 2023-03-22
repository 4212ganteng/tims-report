import { Button, Input } from "@mui/material";
import {
  DataGrid,
  GridCsvExportMenuItem,
  GridToolbarExport,
  GridToolbarExportContainer,
} from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "../../components/Modal";
import { ModalDelete } from "../../components/ModalDelete";
import { ModalEdit } from "../../components/ModalEdit";
import { ModalKecamatan } from "../../components/ModalKecamatan";
import Navbar from "../../components/Navbar";
import { API } from "../../config/api";
import { userContext } from "../../context/userContext";

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function Home() {
  const navigate = useNavigate();

  const [state] = React.useContext(userContext);

  const [search, setSearch] = React.useState("");

  // Data
  const [editData, setEditData] = React.useState({});
  const [form, setForm] = React.useState({});
  const [dataKecamatan, setDataKecamatan] = React.useState([]);

  //   Modal
  const [showModalEdit, setShowModalEdit] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [showModalAddKecamatan, setShowModalAddKecamatan] =
    React.useState(false);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  React.useEffect(() => {
    state.isLogin !== true && navigate("/login");
  }, [state.isLogin]);

  React.useEffect(() => {
    getKecamatan.mutate();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // suhmit Add Masyarakat
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      if (!form.nik) {
        return alert("nik tidak boleh kosong");
      }
      const { data } = await API.post("/masyarakat/create", {
        nik: form?.nik,
        nama: form?.nama,
        tempat_lahir: form?.tempat_lahir,
        tanggal_lahir: form?.tanggal_lahir,
        kelamin: form?.kelamin?.toUpperCase(),
        umur: form?.umur,
        status_kawin: form?.status_kawin?.toUpperCase(),
        alamat: form?.alamat,
        kecamatan: form?.kecamatan,
        desa: form?.desa,
      });

      refetch();
      setForm({});
      toast.success("berhasil menambahkan data");
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      console.log(error);
    }
  };

  const getKecamatan = useMutation(async () => {
    try {
      const { data } = await API.get("/kecamatan/findall");

      setDataKecamatan(data.data);
    } catch (error) {
      console.log(error);
    }
  });

  const {
    isLoading,
    data: masyarakat,
    refetch,
  } = useQuery({
    queryKey: ["masyarakatData"],
    queryFn: () =>
      API.get(
        `/masyarakat/?limit=${paginationModel.pageSize}&page=${
          paginationModel.page + 1
        }&search=${search}`
      ).then((res) => res.data),
  });

  const [rowCountState, setRowCountState] = React.useState(
    masyarakat?.totalDocuments || masyarakat?.totalDoucment || 0
  );

  React.useEffect(() => {
    refetch();
  }, [paginationModel, search]);

  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      masyarakat?.totalDocuments !== undefined
        ? masyarakat?.totalDocuments
        : prevRowCountState
    );
  }, [masyarakat?.totalDocuments, setRowCountState]);

  const columns = [
    { field: "nik", headerName: "NIK", width: 250 },
    { field: "nama", headerName: "Nama", width: 200 },
    {
      field: "tempat_lahir",
      headerName: "Tempat Lahir",
      width: 140,
    },
    {
      field: "tanggal_lahir",
      headerName: "Tanggal Lahir",
      width: 140,
      renderCell: (params) => {
        const formattedDate = params.row.tanggal_lahir.slice(0, 10);
        return formattedDate;
      },
    },
    {
      field: "kelamin",
      headerName: "Jenis Kelamin",
      width: 140,
      renderCell: (params) => {
        return (
          <div>
            {params.row.kelamin === "L"
              ? "Laki-laki"
              : params.row.kelamin === "P"
              ? "Perempuan"
              : "-"}
          </div>
        );
      },
    },
    { field: "umur", headerName: "Umur", width: 140 },
    {
      field: "status_kawin",
      headerName: "Status Kawin",
      width: 140,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status_kawin === "Y"
              ? "Sudah"
              : params.row.status_kawin === "N"
              ? "Belum"
              : "-"}
          </div>
        );
      },
    },
    { field: "kecamatan", headerName: "Kecamatan", width: 140 },
    { field: "alamat", headerName: "Alamat", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white rounded-md px-2 py-1"
              onClick={() => {
                setEditData(params.row);
                setShowModalEdit(true);
              }}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white rounded-md px-2 py-1"
              onClick={() => {
                setEditData(params.row);
                setShowModalDelete(true);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  // function for edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.patch(`/masyarakat/${editData._id}`, {
        nama: editData?.nama,
        tempat_lahir: editData?.tempat_lahir,
        tanggal_lahir: editData?.tanggal_lahir,
        umur: editData?.umur,
        status_kawin: editData?.status_kawin?.toUpperCase(),
        kelamin: editData?.kelamin?.toUpperCase(),
        alamat: editData?.alamat,
        kecamatan: editData?.kecamatan,
        kota: editData?.kota,
      });
      refetch();
      toast.success("berhasil mengubah data");
      return response;
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      console.log(error);
    }
  };

  const handleSubmitAddKecamatan = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/kecamatan/", {
        nama: form?.kecamatan,
      });
      refetch();
      getKecamatan.mutate();
      toast.success("berhasil menambahkan data");
      return response;
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      console.log(error);
    }
  };

  // function for delete
  const handleDelete = async () => {
    try {
      const response = await API.delete(`/masyarakat/${editData._id}`);
      refetch();
      toast.success("berhasil menghapus data");
      return response;
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      console.log(error);
    }
  };

  const csvOptions = {
    fileName: "Data Masyarakat",
    fields: [
      "nik",
      "nama",
      "tempat_lahir",
      "tanggal_lahir",
      "kelamin",
      "umur",
      "status_kawin",
      "kecamatan",
      "alamat",
    ],
  };

  function CustomExportButton(props) {
    return (
      <GridToolbarExportContainer {...props}>
        <GridCsvExportMenuItem options={csvOptions} />
      </GridToolbarExportContainer>
    );
  }

  return (
    <>
      <Navbar />
      <div className=" items-center justify-center max-w-full">
        <div className="bg-white p-8 overflow-x-auto h-screen">
          <h1 className="text-2xl mb-8">Data Masyarakat</h1>
          {/* <div className="text-md font-mono mb-4">
            <h1>{`Kecamatan : ${state.user.kecamatan}`}</h1>
            <h1>{`Desa : ${state.user.desa}`}</h1>
            <h1>{`Tim Sukses : ${state.user.nama}`}</h1>
            <h1>{`No.Wa : ${state.user.wa}`}</h1>
          </div> */}
          <div className="md:flex justify-between items-center mb-8">
            <div className="flex gap-4">
              {/* <Button
                variant="outlined"
                onClick={() => setShowModalAddKecamatan(true)}
              >
                Add Kecamatan
              </Button> */}
              <Button variant="contained" onClick={() => setShowModal(true)}>
                Add Masyarakat
              </Button>
            </div>
            <div className="my-6">
              <Input
                placeholder="Search by name"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {/* Table */}
          <DataGrid
            getRowId={(row) => row._id}
            rows={(masyarakat && masyarakat.data) || []}
            columns={columns}
            components={{
              Toolbar: CustomExportButton,
            }}
            style={{ border: "none", height: "70%" }}
            rowCount={rowCountState}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 30, 50]}
            disableRowSelectionOnClick
            loading={isLoading}
          />

          {/* Modal Edit Masyarakat */}
          <ModalEdit
            showModal={showModalEdit}
            setShowModal={setShowModalEdit}
            data={editData}
            setEditData={setEditData}
            handleSubmit={handleSubmit}
            refetch={refetch}
            dataKecamatan={dataKecamatan}
          />

          {/* Modal Add Masyarakat */}
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            handleChange={handleChange}
            handleSubmit={handleSubmitAdd}
            dataKecamatan={dataKecamatan}
          />

          {/* Modal Delete Masyarakat */}
          <ModalDelete
            showModal={showModalDelete}
            setShowModal={setShowModalDelete}
            handleDelete={handleDelete}
            refetch={refetch}
          />

          {/* Modal Add Kecamatan */}
          <ModalKecamatan
            showModal={showModalAddKecamatan}
            setShowModal={setShowModalAddKecamatan}
            handleChange={handleChange}
            handleSubmit={handleSubmitAddKecamatan}
          />
        </div>
      </div>

      <ExcelFile>
        <ExcelSheet data={masyarakat} name="Employees">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Wallet Money" value="amount" />
          <ExcelColumn label="Gender" value="sex" />
          <ExcelColumn
            label="Marital Status"
            value={(col) => (col.is_married ? "Married" : "Single")}
          />
        </ExcelSheet>
      </ExcelFile>
    </>
  );
}
