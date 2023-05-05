import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUpload from "@/models/file";
import db from "@/db";

const FilesList = ({ files }) => {
  console.log(files);
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/deletefile?id=${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-lg">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-lg">
              Description
            </th>
            <th scope="col" className="px-6 py-3 "></th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">View</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Download</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {files.length > 0 ? (
            files.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="file-title px-6 py-4 font-black">
                  {item.title}
                </td>
                <td className="file-description px-6 py-4 font-black">
                  {item.description}
                </td>
                <td className="px-6 py-4 font-black">
                  <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    <a href={item.file_path} target="_blank" download>
                      Download
                    </a>
                  </button>
                </td>
                <td className="px-6 py-4 font-black">
                  <button class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                    <a href={item.file_path} target="_blank">
                      View
                    </a>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: "300" }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilesList;

export async function getServerSideProps(context) {
  db();
  const files = await FileUpload.find({}, { updatedAt: 0 });
  return {
    props: {
      files: files.map((item) => ({
        title: item.title ? item.title : "",
        description: item.description ? item.description : "",
        file_path: item.file_path ? item.file_path.slice(6) : "",
        file_mimetype: item.file_mimetype ? item.file_mimetype : "",
        _id: item._id ? JSON.stringify(item._id).slice(1, -1) : "",
        createdAt: item.createdAt.toISOString(),
      })),
    }, // will be passed to the page component as props
  };
}
