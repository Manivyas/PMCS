import React from "react";
import axios from "axios";
import { BASE_ROUTES, BASE_URL, NETWORK_CALL_TIMEOUT } from "../constants";

const http = axios.create({
    timeout: NETWORK_CALL_TIMEOUT,
});

const useHttpClient = () => {
    return {
        savePdf: (data: any) => {
            const body = {
                pdf: data
            }
            return http.post(`${BASE_URL}/${BASE_ROUTES.SAVE_PDF}`, body)
        },
        fetchPdfs: () => {
            return http.get(`${BASE_URL}/${BASE_ROUTES.GET_PDF}`);
        },
        deletePdf: (pdfId: string) => {
            return http.delete(`${BASE_URL}/${BASE_ROUTES.DELETE_PDF}/${pdfId}`);
        }
    }
}

export default useHttpClient;