import React, { useEffect, useState } from "react";

interface DisplayPdfProps{
    binaryData:any
}

  export const DisplayPdf = ({binaryData}:DisplayPdfProps)=>{
      const [doc,setDoc] = useState<any>(); 
    const getDoc = (binary:any) => {
        if (binary != null) {
          var contentType = "application/pdf";
          setDoc("data:" + contentType + ";base64," + binary);
        } else {
          setDoc("");
        }
      };

      useEffect(()=>{
        getDoc(binaryData);
      },[])

    return(
    <div
        id="previewModal"
        className="modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-lg">
          {/* <!-- Modal content--> */}
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Doc</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <embed
                src={doc}
                id="displayFile"
                width="100%"
                height="99%"
                style={{ borderStyle: "solid" }}
                type="application/pdf"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }