import { Button, FormContainer, FormItem, Input } from "@/components/ui";
import usePostApi from "@/store/customeHook/postApi";
import usePutApi from "@/store/customeHook/putApi";
import { TokenInfo, getToken } from "@/store/customeHook/token";
import useApiFetch from "@/store/customeHook/useApiFetch";
import { useNavigate, useParams } from 'react-router-dom';
import { Field, Form, Formik } from "formik";
import { useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

const ChatModal = ({data,modal,setModal,setCommentList,commentList,url,user,EditorData,editorState,contentHistory,convertToRaw}:any) => {
  console.log("doc_iddoc_iddoc_iddoc_id",modal);
    const {id}:any=useParams()
    const {user_id}:any=TokenInfo();
   let _idVal = localStorage.getItem('_id')
    const [formData,setFormData]=useState<any>({text:""});
    const { result: PutApiResponse, loading: PutApiLoading, sendPostRequest: updateData }: any = usePutApi(`legal/document/${data?.doc_id}`)

    const [open,setOpen]=useState<any>(modal)
    const handleChange=(e:any)=>{
        const newData={...formData};
        newData[e.target.name]=e.target.value;
        setFormData(newData);
    }

 
    const handleComment=()=>{
        const obj:any={
          user:user,
          replyfor:url,
          replytext:formData?.text || "N/A",
          time:new Date()
        }
        let date = new Date();
        const contentState: any = editorState.getCurrentContent();
        const body: any = {
            asset_id:id,
          title: EditorData?.data?.title,
          userId: EditorData?.data?.author?.user_id.toString() || user_id.toString(),
          contentHistory: contentHistory,
          commentList: [...commentList,obj],
          collaborators: EditorData?.data?.collaborators || [],
          content: JSON.stringify(convertToRaw(contentState)),
          password: EditorData?.data?.password
        };
    
        updateData(body);
        if(formData?.text){
            setCommentList([...commentList,obj]);
            setFormData({
                text:""
            })
            setOpen(true)
        }
 
      
      }
const newfilterArray:any=commentList?.filter((item:any,index:any)=>item?.replyfor===url) || [];
const TimeString=(time:any)=>{
    let date=new Date(time);
    return date.toLocaleString()
}
useEffect(()=>{
    setOpen(modal)
},[modal])
useEffect(()=>{
if(PutApiResponse){
    console.log("PutApiResponse",PutApiResponse)
}
},[PutApiResponse])
console.log("tttttttttt",newfilterArray);

  return (
    <div>
    {open &&  <>
    
       <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                      
                       <div className="relative w-full max-w-[400px] max-h-full rounded-[13px] my-auto">
                           <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                               <button onClick={()=>{setOpen(false);modal=false}} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                   <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                   </svg>
                                   <span className="sr-only">Close modal</span>
                               </button>
                               <div className="px-6 py-6 lg:px-8">
                                   <h6 className="text-center">Add Comments </h6>
                                   <Formik
                                       initialValues={{ field: false }}
                                       onSubmit={() =>
                                           console.log('Submited via my onSubmit function')
                                       }
                                   >
                                   <Form className="py-2">
                                   <FormContainer>
                                       <div className="flex flex-col">
                                        
                                          <div className="w-full border-2 flex justify-between flex-col overflow-scroll overflow-x-hidden	 h-[200px]">
                                            {newfilterArray.length>0 && newfilterArray?.map((item:any,index:any)=>(
                                                <div className="w-full" key={index}>
                                                      <p className={`w-full m-4 text-left `}>
                                                    <span className="text-chat-message-style">{item?.replyfor}</span><br/>
                                                </p>
                                                <p className={`w-full p-4 text-right`}>
                                                    
                                                    <span className="text-chat-message-style">{item?.replytext}</span>
                                                   <br/>
                                                   <br/>
                                                   <span className="bg-gray mt-4">{TimeString(item?.time)}</span>

                                                    <br/>
                                                    <span className="bg-gray mt-2">User{item?.user}</span>
                                                </p>
                                              
                                                </div>
                                            )) 
                                            }
                                          </div>
                                           <FormItem
                                               label="Add Comment"
                                               className='mx-auto w-full'
                                           >
                                               <Field
                                                   type="text"
                                                   autoComplete="off"
                                                
                                                   name="text"
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   onChange={(e:any)=>handleChange(e)}
                                                   placeholder="message"
                                                   value={formData?.text}
                                                   component={Input}
                                               />
                                           </FormItem>
                                       
                                       </div>
                                    
                                       
                                       <div className="w-full flex">
                                       <Button
                                           style={{ borderRadius: "13px" }}
                                           block
                                           variant="solid"
                                           onClick={handleComment}
                                           type="button"
                                           className='indigo-btn  w-[100px] mx-auto rounded-[30px]'
                                       >
                                           Save
                                       </Button>
                                       </div>
                                   </FormContainer>
                                   </Form>
                                   </Formik>
                               </div>
                           </div>
                       </div>
                   </div>
   </>}
   </div>
  )
}

export default ChatModal
