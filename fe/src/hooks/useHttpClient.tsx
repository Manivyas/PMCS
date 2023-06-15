import React from "react";
import axios from "axios";
import { BASE_ROUTES, BASE_URL, NETWORK_CALL_TIMEOUT } from "../constants";
import { Form, FormInstance } from "antd";

const http = axios.create({
    timeout: NETWORK_CALL_TIMEOUT,
});

const options= {
    headers:{
        "Content-type": "multipart/form-data",
    },
  }
  
const useHttpClient = () => {
    return {
        savePdf: (data: any) => {
            const body = {
                file:data?.file,
                fileName: data?.filename,
                description:data?.description,
                path:'Pdf 1',
                label:data?.label,
                owner:'yashyash'
            }
            console.log("Testing...", data);
            // return http.post('http://10.250.5.236:8080/api/document/add',data, options);
            return http.post('http://localhost:5001/api/upload/sent',data, options);

            // return http.post(`${BASE_URL}/${BASE_ROUTES.SAVE_PDF}`, body)
        },
        fetchPdfs: (username:string) => {
            return http.get(`http://localhost:5001/api/upload/pdfs/${username}`);
            // return http.get(`${BASE_URL}/${BASE_ROUTES.GET_PDF}`);
        },
        deletePdf: (pdfId: string) => {
            return http.delete(`${BASE_URL}/${BASE_ROUTES.DELETE_PDF}/${pdfId}`);
        },
        signup:(formData:FormInstance<any>)=>{
            // return http.post(``)
            const body ={
                'name':formData.getFieldValue("name"),
                'email':formData.getFieldValue("email"),
                'password':formData.getFieldValue("password")
            }
            return http.post('http://localhost:5001/api/user/register',body);
        },
        login:(formData:FormInstance<any>)=>{
            const body ={
                'name':formData.getFieldValue("name"),
                'password':formData.getFieldValue("password")
            }
            return http.post('http://localhost:5001/api/user/login',body);
        },
        updatePdfComments:(fileId:any,comments:any)=>{
            const body = {
                comments:comments
            }
            return http.put(`http://localhost:5001/api/upload/update/${fileId}`,body)
        },
        getPdf:(pdfId:string)=>{
            return http.get(`http://localhost:5001/api/upload/getpdf/${pdfId}`)
        }
    }
}

export default useHttpClient;