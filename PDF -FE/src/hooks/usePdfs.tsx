import React, { useEffect, useState } from "react";
import useHttpClient from "./useHttpClient";

const usePdfs = () => {
    const { fetchPdfs } = useHttpClient();
    const [pdfs, setPdfs] = useState([]);
    useEffect(() => {
        fetchPdfs()
            .then(res => {
                // const pdfList = res?.data?.pdfs;
                const pdfList: any = ["1", "2", "3"];
                setPdfs(pdfList);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return {
        pdfs
    }
}
export default usePdfs;