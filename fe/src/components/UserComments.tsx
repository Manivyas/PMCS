import React, { useEffect } from "react";
import { useState } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import useHttpClient from "../hooks/useHttpClient";
import { Ipdf } from "../types";

interface CommentSection {
    userId: string
    comId: string
    avatarUrl: string
    userProfile?: string
    fullName: string
    text: string
    replies: any
    commentId: string
}

interface UserCommentProps {
    filename: string;
    fileId: string;
    owner: string;
    description: string;
    uploadedAt: string;
    comments: Array<{}>;
}
export const UserComments = ({ filename, fileId, comments, description, owner, uploadedAt }: UserCommentProps) => {
    const [data, setData] = useState<any>("");
    const { updatePdfComments, getPdf } = useHttpClient();
    const [pdf, setPdf] = useState<Ipdf>();

    

    useEffect(() => {
        getPdf(fileId)
            .then(res => {
                setPdf(res?.data);
                setData(res?.data?.comments);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <CommentSection

            commentData={data}
            onSubmitAction={(data: CommentSection) => {
                updatePdfComments(fileId, data);
                console.log('check submit, ', data);
            }}
            currentData={(data: any) => {
                console.log('curent data', data);
            }}
            logIn={{
                loginLink: "/login",
                signupLink: "/signup"
            }}
            currentUser={{
                currentUserId: '01a',
                currentUserImg: 'https://www.flaticon.com/free-icons/user',
                currentUserProfile: '',
                currentUserFullName: owner
            }} />
    );
}
