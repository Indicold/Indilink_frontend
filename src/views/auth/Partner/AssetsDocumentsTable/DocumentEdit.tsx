/* The code is importing various components and hooks from different files and libraries. Here is a
breakdown of what each import statement is doing: */
import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { ToastContainer } from 'react-toastify'
import { Document, Page } from 'react-pdf';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TokenInfo } from '@/store/customeHook/token';
import { apiUrl } from '@/store/token';
import usePostApi from '@/store/customeHook/postApi';
import { messageView, messageViewNew } from '@/store/customeHook/validate';
import LinkEditorExample from '@/components/layouts/EditorComponents';
const DocumentEditModal = ({modal,setModal,data}:any) => {
    
    const [text,setText]=useState<any>('')
    const [error,setError]=useState<any>({})
    const {id}:any=useParams(); // For extracting endpoint of the active URL for defining API payload
    const {aud}:any=TokenInfo() // For extracting user info to define in payload for API call
    const {
        result: commentResponse,
        loading: commentLoading,
        sendPostRequest: Postcomment,
    }: any = usePostApi(`legal/document-comment`)

    /**
     * The function handlesubmitComment is used to handle the submission of a comment, where it checks
     * if the text field is empty and displays an error message if it is, otherwise it creates a
     * comment object and calls the Postcomment function to post the comment.
     */
    const handlesubmitComment=()=>{
        if(!text){
            setError({text:"This field is required"})
        }else{
            const body:any={
                asset_id:id,
                doc_id:data?.doc_id,
                status: "Negotiation",
                comment:text,
                comment_created_by:aud
            }
            Postcomment(body)
            setText("")
    
        }
       
    }
    
    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is being used to handle the response from the `commentResponse` variable. */
    useEffect(()=>{
        messageViewNew(commentResponse)
if(commentResponse?.status===200){
    setModal(false)
    
}
    },[commentResponse])
  return (
    <div>
    <ToastContainer />
    {modal && (
        <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="my-auto otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div className="relative w-full max-w-[800px] mt-[50px] max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={()=>setModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>

                    <div className="px-6 py-6 lg:px-8">
                        <h6 className="text-head-title text-center  mb-4">
                           Document Edit
                        </h6>
  
<LinkEditorExample  data={data} setText={setText} handlesubmitComment={handlesubmitComment}/>

                 
                    </div>
                </div>
            </div>
        </div>
    )}
</div>
  )
}

export default DocumentEditModal
