import React, { useEffect, useRef, useState } from "react";
import AddModal from "./AddModal";
import BottomSheet from "@wldyslw/react-bottom-sheet";
import NewBlog from "./NewBlog";
import useIsMobile from "../hooks/useIsMobile";
import { fetchBlogs } from "../services/fetchBlogs";
import { useTable, Column, Row, HeaderGroup, Cell } from "react-table"; // Import the necessary types
import trashIcon from "../assets/trash.svg";
import { deleteBlog } from "../services/deleteBlog";

interface BottomSheetRef {
  open: () => void;
  close?: () => void;
}

interface Blog {
  id: string;
  title: string;
  image: string;
  description: string;
}

const AddBlog = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState<Blog[]>([]); // Define the type as Blog[]
  const bottomSheetRef = useRef<BottomSheetRef>(null as unknown as BottomSheetRef);
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
        const data: Blog[] = await fetchBlogs(); // Define the data type as Blog[]
        setRowData(data);
      } catch (error) {
        console.error(error);
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

  const columns: Column<Blog>[] = React.useMemo(
    () => [
      {
        Header: "عملیات",
        accessor: "actions",
        Cell: ({ row }: { row: Row<Blog> }) => (
          <button onClick={() => handleDelete(row.original.id)} className="p-2">
            <img src={trashIcon} alt="حذف" className="w-6 h-6 cursor-pointer" />
          </button>
        ),
      },
      { Header: "عنوان", accessor: "title" },
      {
        Header: "عکس",
        accessor: "image",
        Cell: ({ value }: { value: string }) => (
          <div className="flex justify-center">
            <img
              src={value}
              alt="Blog"
              className="w-12 h-12 object-cover rounded-full"
            />
          </div>
        ),
      },
      {
        Header: "توضیحات",
        accessor: "description",
        Cell: ({ value }: { value: string }) => (
          <div className="flex justify-center overflow-hidden">
            <p>{value.length > 50 ? value.slice(0, 50) + "..." : value}</p>
          </div>
        ),
      },
    ],
    [rowData]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<Blog>({
    columns,
    data: rowData,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex justify-end items-end">
        <div className="w-6/12 md:w-2/12" onClick={handleAddBlog}>
          <button className="buttonOfForm cursor-pointer">افزودن</button>
        </div>
      </div>

      <div className="w-full overflow-x-auto md:overflow-x-visible">
        <table
          {...getTableProps()}
          className="min-w-[1000px] md:min-w-full text-center rounded-xl overflow-hidden"
        >
          <thead className="bg-[#292524] rounded-xl">
            {headerGroups.map((headerGroup: HeaderGroup<Blog>) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: Column<Blog>) => (
                  <th {...column.getHeaderProps()} className="px-4 py-2">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: Row<Blog>) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="bg-[#171717]">
                  {row.cells.map((cell: Cell<Blog>) => (
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
              <NewBlog
                title="بلاگ جدید"
                setOpenModal={setOpenModal}
                onBlogAdded={(newBlog: Blog) => {
                  setRowData((prevBlog) => [...prevBlog, newBlog]);
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
        <NewBlog
          title="بلاگ جدید"
          bottomSheetRef={bottomSheetRef}
          onBlogAdded={(newBlog: Blog) => {
            setRowData((prevBlog) => [...prevBlog, newBlog]);
          }}
        />
      </BottomSheet>
    </div>
  );
};

export default AddBlog;
