import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import useHttpClient from "../src/hooks/useHttpClient";
import { Ipdf } from "../src/types";

const StyledDiv = styled.div`


`

interface PpProps{
    ipdf:Ipdf
}

export const Pp=({ipdf}:PpProps)=>{
    // const {fetchPdfs} = useHttpClient();
    // const [pdf,setPdfs] = useState<Ipdf>();
    // useEffect(()=>{
    //     fetchPdfs()
    //     .then(res=>{
    //         let pds = res?.data;
    //         console.log(pds[4]);
    //         setPdfs(pds[4]);
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
    // },[])
    return (
        <StyledDiv>
            {ipdf?.file?.data}
        </StyledDiv>
    )
}