import { Button, FormItem, Input } from "@/components/ui";
import { Field } from "formik";

const CondensorDetailsModal = () => {
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
                                <h6>Condensor Details</h6>
                                <div className="flex">
                                    <FormItem
                                        label="Condensor Make"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="condensorName"
                                            placeholder="Condensor Make"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Condensor Type"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="condensorType"
                                            placeholder="Condensor Type"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Condensor Capacity"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="condensorCapacity"
                                            placeholder="Condensor Capacity"
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

export default CondensorDetailsModal;