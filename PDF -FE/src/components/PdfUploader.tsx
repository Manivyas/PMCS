import React, { useState } from "react";
import useHttpClient from "../hooks/useHttpClient";
export const PdfUploader = () => {
    const { savePdf } = useHttpClient();
    const [file, setFile] = useState<any>();
    const onFileChangeHandler = (e: any) => {
        e.preventDefault();
        setFile(e.target.files[0]);
        const formData = new FormData();
        formData.append('file', file);
        savePdf(formData)
            .then(res => {
                console.log("File Uploaded Successfully...")
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <div className="row" >
            <div className="col-md-6">
                <div className="form-group files color">
                    <label>Upload Your File</label>
                    <input type="file" className="form-control" name="file" onChange={onFileChangeHandler} />
                </div>
            </div>
        </div >
    );
}