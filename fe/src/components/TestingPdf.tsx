import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface TestingPdfProps {
  fileId: string;
}

function TestingPdf({ fileId }: TestingPdfProps) {
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

  const fetchPdf = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/upload/pdf/${fileId}`, {
        responseType: 'blob', // Set the response type to blob
      });
      const url = URL.createObjectURL(response.data);
      setFileUrl(url);
    } catch (error) {
      console.error('Error fetching PDF:', error);
      // Handle error state here
    }
  };

  useEffect(() => {
    fetchPdf();
  }, []);

  const workerUrl = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js`;

  return (
    <div style={{ height: '100vh',width:'100%',overflowY:'scroll' }}>
      {fileUrl && (
        <Worker workerUrl={workerUrl}>
          <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPlugin as any]} />
        </Worker>
      )}
    </div>
  );
}

export default TestingPdf;
