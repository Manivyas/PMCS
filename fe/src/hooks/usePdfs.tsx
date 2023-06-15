import React, { useEffect, useState } from "react";
import { Ipdf } from "../types";
import useHttpClient from "./useHttpClient";

const usePdfs = () => {
    const { fetchPdfs } = useHttpClient();
    const [pdfs, setPdfs] = useState<Ipdf[]>([]);
    useEffect(() => {
        let loggedUser: string = localStorage.getItem('username') || 'NA';
        loggedUser = loggedUser.replaceAll('\"', '');
        fetchPdfs(loggedUser)
            .then(res => {
                const pdfList = res?.data;
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