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
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="files-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? (
            files.map((item) => (
              <tr key={item._id}>
                <td className="file-title">{item.title}</td>
                <td className="file-description">{item.description}</td>
                <td>
                  <a href={item.file_path} target="_blank" download>
                    Download
                  </a>
                </td>
                <td>
                  <a href={item.file_path} target="_blank">
                    View
                  </a>
                </td>
                <td>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
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
