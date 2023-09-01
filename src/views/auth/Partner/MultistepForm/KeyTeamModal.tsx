import { Button, FormItem, Input } from "@/components/ui";
import { Field } from "formik";
import { useEffect, useState } from "react";
interface MajorityHolderModalProps {
    modal: boolean;
    Team:any;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
  }
const KeyTeamModal: React.FC<MajorityHolderModalProps> = ({modal,setModal,Team}) => {
    const [data,setData]=useState({
        Team:Team
       });
       console.log("Team",Team);
       
       const handleChange=(e:any)=>{
        const newData:any={...data};
        newData[e.target.name]=e.target.value;
     
        setData(newData);
        console.log("newData",newData);
        
            }
            const handlesave = () => {
                let getData: any[] = JSON.parse(localStorage.getItem('Team_List') || '[]');
            
                if (localStorage.getItem('Team_List')) {
                    getData.push(data);
                    localStorage.setItem('Team_List', JSON.stringify(getData));
                }
                
                if (!localStorage.getItem('Team_List')) {
                    localStorage.setItem('Team_List', JSON.stringify([data]));
                }
                console.log("gggggg");
                
            };
        useEffect(()=>{
            setData({
                Team:Team
               });
        },[data.Team])
    return (
       <>
    {modal &&    <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={()=>setModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h6 className="text-center">{Team}</h6>
                                <div className="flex">
                                    <FormItem
                                        label="Full Name"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="fullName"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Full name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Contact (Mobile)"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="mobile"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Contact (Mobile)"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Contact (Landline)"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="phone"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Contact (Landline)"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Email ID"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="email"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Email ID"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>                                
                                <div className="flex">
                                    <FormItem
                                        label="Designation"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="designation"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Designation"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Reporting Manager"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="rm"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Reporting Manager"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <Button
                                    style={{ borderRadius: "13px" }}
                                    block
                                    onClick={handlesave}
                                    variant="solid"
                                    type="button"
                                    className='bg-[#3f8cfe] w-[40%] mx-auto rounded-[30px]'
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>}
                </>
    )
}

export default KeyTeamModal;