import { Button, FormItem, Input } from "@/components/ui";
import { Field } from "formik";

const MajorityHolderModal = () => {
    return (
        <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h6>Majority holder 1</h6>
                                <div className="flex">
                                    <FormItem
                                        label="Location started in year"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="fullName"
                                            placeholder="Full name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Number of shares held"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="shares"
                                            placeholder="Number of shares held"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="%age holding"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="percent"
                                            placeholder="%age holding"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Address line 1"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="add1"
                                            placeholder="Address line 1"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>                                
                                <div className="flex">
                                    <FormItem
                                        label="Address line 2"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="add2"
                                            placeholder="Address line 2"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="City"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="city"
                                            placeholder="City"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="State"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="state"
                                            placeholder="State"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="PIN Code"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="pin"
                                            placeholder="PIN Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                <FormItem
                                            label="ID no. (Aadhar/PAN)"
                                            className='mx-auto'
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="id"
                                                placeholder="ID no. (Aadhar/PAN)"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Contact number"
                                            className='mx-auto'
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="contact"
                                                placeholder="Contact number"
                                                component={Input}
                                            />
                                        </FormItem>
                                </div>
                                        
                                        
                                <FormItem
                                    label="Email ID"
                                    className='mx-auto'
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="Email ID"
                                        component={Input}
                                    />
                                </FormItem>
                                <Button
                                    style={{ borderRadius: "13px" }}
                                    block
                                    variant="solid"
                                    type="button"
                                    className='bg-[#3f8cfe] w-[40%] mx-auto rounded-[30px]'
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default MajorityHolderModal;