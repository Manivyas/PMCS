import React, { useEffect, useState } from 'react';

interface PDFViewerProps{
    binaryData:any
}
const PDFViewer = ({ binaryData }:PDFViewerProps) => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(()=>{
    displayPDF();
  },[])
  const displayPDF = () => {
    const decodedData = atob(binaryData);
    const uint8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
    uint8Array[i] = decodedData.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  if(!binaryData) return null
  return (
    <div>
      {pdfUrl && <iframe src={pdfUrl} width="100%" height="500px" />}
    </div>
  );
};

export default PDFViewer;



