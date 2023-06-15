import React, { useEffect, useState } from "react";
import useHttpClient from "../hooks/useHttpClient";

export const PdfUploader = () => {
  const { savePdf } = useHttpClient();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");

  const handleFileChange = (e:any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFileName(selectedFile.name);
      setFile(selectedFile);
    } else {
      // Handle file type not supported error
    }
  };

  const handleDescriptionChange = (e:any) => {
    setDescription(e.target.value);
  };

  const handleLabelChange = (e:any) => {
    setLabel(e.target.value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!file) {
      return;
    }
    let loggedUser:string = localStorage.getItem('username') || 'NA';
    loggedUser = loggedUser.replaceAll('\"','');
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", fileName);
    formData.append("description", description);
    formData.append("label", label);
    formData.append("owner", loggedUser.replaceAll('\"',''));

    try {
      const response = await savePdf(formData);
      //   console.log("File Uploaded Successfully...", response);
      // Reset form fields and state variables
      setFile(null);
      setDescription("");
      setLabel("");
    } catch (error) {
      console.log("Error uploading file:", error);
      // Handle error
    }
  };

  useEffect(() => {
    // console.log("This is executed");
  });

  return (
    <div
      className="pdf-uploader"
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>PDF Uploader</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
        <div>
          <label htmlFor="file">Upload Your PDF File:</label>
          <input
            type="file"
            id="file"
            className="form-control"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={description}
            onChange={handleDescriptionChange}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>

        <div>
          <label htmlFor="label">Label:</label>
          <input
            type="text"
            id="label"
            className="form-control"
            value={label}
            onChange={handleLabelChange}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            marginLeft: "10px",
          }}
        >
          Upload
        </button>
      </form>
    </div>
  );
};
