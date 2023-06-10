import React from 'react';
import './App.css';
import { PDF } from './components/PDF';
import { CustomizedInputBase } from './components/Search';
import { PdfUploader } from './components/PdfUploader';
import { PdfPreview } from './components/PdfPreview';

function App() {
  return (
    <div >
      <CustomizedInputBase />
      <PDF />
      <PdfUploader />
      {/* <div className="App-viewer">
        <PdfViewer document={'cost-estimate.pdf'} />
      </div> */}
      <PdfPreview />
    </div>
  );
}

export default App;
