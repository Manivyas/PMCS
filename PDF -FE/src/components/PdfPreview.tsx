import React, { Component, useState } from 'react';
import { Document, Page } from 'react-pdf';

export const PdfPreview = () => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const onDocumentLoadSuccess = (numPages: number) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () =>
        setPageNumber((pageNumber) => pageNumber - 1);
    const goToNextPage = () =>
        setPageNumber((pageNumber) => pageNumber + 1);


    return (
        <div>
            <nav>
                <button onClick={goToPrevPage}>Prev</button>
                <button onClick={goToNextPage}>Next</button>
            </nav>

            <div style={{ width: 600 }}>
                <Document
                    file="./cost-estimate.pdf"
                    onLoadSuccess={() => onDocumentLoadSuccess(numPages)}
                >
                    <Page pageNumber={pageNumber} width={600} />
                </Document>
            </div>

            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    );
}
