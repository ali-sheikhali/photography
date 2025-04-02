import React, { useEffect, useRef, useState } from "react";
import AddModal from "./AddModal";
import BottomSheet from "@wldyslw/react-bottom-sheet";
import NewBlog from "./NewBlog";
import useIsMobile from "../hooks/useIsMobile";
import { fetchBlogs } from "../services/fetchBlogs";
import { useTable } from "react-table";
import trashIcon from "../assets/trash.svg";
import { deleteBlog } from "../services/deleteBlog";

interface BottomSheetRef {
  open: () => void;
  close?: () => void;
}

const AddBlog = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState<any>([]);
  const bottomSheetRef = useRef<BottomSheetRef>(
    null as unknown as BottomSheetRef
  );
  const isMobile = useIsMobile();

  const handleAddBlog = () => {
    if (isMobile) {
      bottomSheetRef.current?.open();
    } else {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setRowData(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    const isDeleted = await deleteBlog(id);
    if (isDeleted) {
      setRowData((prev) => prev.filter((blog) => blog.id !== id));
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "عملیات",
        accessor: "actions",
        Cell: ({ row }: any) => (
          <button onClick={() => handleDelete(row.original.id)} className="p-2">
            <img src={trashIcon} alt="حذف" className="w-6 h-6 cursor-pointer" />
          </button>
        ),
      },
      { Header: "عنوان", accessor: "title" },
      {
        Header: "عکس",
        accessor: "image",
        Cell: ({ value }: any) => (
          <div className="flex justify-center">
            <img
              src={value}
              alt="Blog"
              className="w-12 h-12 object-cover rounded-full"
            />
          </div>
        ),
      },
      { Header: "توضیحات", accessor: "description"  ,
        Cell: ({ value }: any) => (
        <div className="flex justify-center overflow-hidden">
          <p>{value}</p>
        </div>)
         },
    ],
    [rowData]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: rowData });

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex justify-end items-end">
        <div className="w-6/12 md:w-2/12" onClick={handleAddBlog}>
          <button className="buttonOfForm cursor-pointer">افزودن</button>
        </div>
      </div>

      <div className="">
        <table
          {...getTableProps()}
          className="min-w-full text-center rounded-xl overflow-hidden"
        >
          <thead className="bg-[#292524] rounded-xl">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="px-4 py-2">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="bg-[#171717]">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 border-b-2 border-[#737373]"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="inset-0 absolute backdrop-blur-sm"></div>
          <div className="relative w-6/12 rounded-lg py-8 px-4">
            <AddModal rounded={false}>
              <NewBlog title="بلاگ جدید" setOpenModal={setOpenModal} 
              onBlogAdded = {(newBlog)=>{
                setRowData((prevBlog)=> [...prevBlog , newBlog])
            }}
              />
            </AddModal>
          </div>
        </div>
      )}

      <BottomSheet
        detents={["65%"]}
        ref={bottomSheetRef}
        className="!bg-[#171717] text-white w-full py-4 mx-auto"
      >
        <NewBlog title="بلاگ جدید" bottomSheetRef={bottomSheetRef}
        onBlogAdded = {(newBlog)=>{
            setRowData((prevBlog)=> [...prevBlog , newBlog])
        }}
        />
      </BottomSheet>
    </div>
  );
};

export default AddBlog;
