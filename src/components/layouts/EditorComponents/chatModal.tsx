/* These lines of code are importing various components, hooks, and functions from different files and
libraries. Here's a breakdown of what each import statement is doing: */
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
    const {id}:any=useParams() // Extracting the endpoint from the link for API call
    const {user_id}:any=TokenInfo(); // Extracting user_id from token for defining API payload
   let _idVal = localStorage.getItem('_id')
    const [formData,setFormData]=useState<any>({text:""}); // State variable for formData management

    /* The line of code `const { result: PutApiResponse, loading: PutApiLoading, sendPostRequest:
    updateData }: any = usePutApi(`legal/document/${data?.doc_id}`)` is using object destructuring
    to extract specific properties from the return value of the `usePutApi` hook. */
    const { result: PutApiResponse, loading: PutApiLoading, sendPostRequest: updateData }: any = usePutApi(`legal/document/${data?.doc_id}`)

    const [open,setOpen]=useState<any>(modal)

    /**
     * The handleChange function updates the formData state object with the new value entered in an
     * input field.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the function, such as a change event on an
     * input field.
     */
    const handleChange=(e:any)=>{
        const newData={...formData};
        newData[e.target.name]=e.target.value;
        setFormData(newData);
    }

 
    /**
     * The `handleComment` function updates the comment list and sends a request to update the data
     * with the new comment.
     */
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
/**
 * The TimeString function takes a time value and returns a formatted string representation of the date
 * and time.
 * @param {any} time - The `time` parameter is a value that represents a specific point in time. It can
 * be in various formats such as a string, a number, or a Date object.
 * @returns The function `TimeString` returns a string representation of the provided `time` argument
 * in a localized format.
 */
const TimeString=(time:any)=>{
    let date=new Date(time);
    return date.toLocaleString()
}
/* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
`useEffect` hook is being used to update the state variable `open` whenever the value of the `modal`
prop changes. */
useEffect(()=>{
    setOpen(modal)
},[modal])

  /* The below code is a TypeScript React component that renders a modal for adding comments. */
  return (
    <div>
    {modal &&  <>
       <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                       <div className="relative w-full max-w-[400px] max-h-full rounded-[13px] my-auto">
                           <div className="relative bg-white rounded-lg shadow dark:bg-white">
                               <button onClick={()=>{setModal(false);}} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
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
                                        <div className="">
                                          <div id="scrolltobottom" className="autoscrollable-wrapper w-full border-2 flex justify-between flex-col overflow-scroll overflow-x-hidden h-[200px]">
                                          < div className="">
                                            {newfilterArray.length>0 ? newfilterArray?.map((item:any,index:any)=>(
                                                <div className="w-full" key={index}>
                                                      <p className={` w-[80%] flex h-auto m-4 text-left `}>
                                                    <span className="text-chat-message-style p-3 bg-gray-400 rounded-xl text-white max-w-md">{item?.replyfor}</span><br/>
                                                   
                                                </p>
                                                <p className={`w-[80%] ml-14 flex justify-end`}>
                                                   
                                                    <span className=" p-3 bg-gray-400 rounded-xl text-white max-w-md" >{item?.replytext}</span>
                                                   
                                                 
                                                </p>
                                                <p  className={`w-full pr-4 pb-4 text-right`}>
                                           
                                                   <span className="bg-gray mt-4">{TimeString(item?.time)}</span>
 
                                                    <br/>
                                                    <span className="bg-gray mt-2">User{item?.user}</span>
                                                </p>
                                             
                                                </div>
                                            )):
                                            [{
                                                user: user,
                                                replyfor: url,
                                                replytext: "",
                                                time: new Date()
                                            }]?.map((item:any,index:any)=>(
                                                <div className="w-full" key={index}>
                                                      <p className={` w-[80%] flex h-auto m-4 text-left `}>
                                                    <span className="text-chat-message-style p-3 bg-gray-400 rounded-xl text-white max-w-md">{item?.replyfor}</span><br/>
                                                   
                                                </p>
                                
                                             
                                                </div>
                                            ))
                                            }
                                          </div>
                                          </div>
                                          </div>
                                           <FormItem
                                               label="Add Comment"
                                               className='mx-auto w-full'
                                           >
                                               <Field
                                                   type="text"
                                                   autoComplete="off"
                                               
                                                   name="text"
                                                   className="bg-gray-50 ml-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
