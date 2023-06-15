import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// using ES6 modules
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface TestingPdfProps{
  fileId:string
}

function TestingPdf({fileId}:TestingPdfProps) {
    const [file, setFile] = useState<any>();
    const fetchPdf = async()=>{
        const response:any = await axios.get(`http://localhost:5001/api/upload/pdf/${fileId}`);
        const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        setFile(url);
      }

      useEffect(()=>{
        fetchPdf();
      },[])
    const workerUrl = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js`;
    return (
      <div style={{ height: '100vh' }}>
       {file && 
        <Worker workerUrl={workerUrl}>
        <Viewer fileUrl={file}  plugins={[defaultLayoutPlugin as any]}/>
      </Worker>
      }
      </div>
    );
  }

  export default TestingPdf;