/*
 * The above code is a TypeScript React component that renders a modal for entering refrigeration
 * details. It imports various components and custom hooks from different files. It uses the useState
 * and useEffect hooks to manage state and make API calls. The modal is displayed when the "modal" prop
 * is true. Inside the modal, there are form fields for entering refrigeration details such as type,
 * year of installation, manufacturer/vendor, vendor contact name, vendor contact number, number of
 * compressors, make of compressors, and AMC details. There is also a "Save" button that triggers the
 * handlesave function when clicked.
 */
import { Button, FormItem, Input } from '@/components/ui'
import { getToken } from '@/store/customeHook/token'
import useApiFetch from '@/store/customeHook/useApiFetch'
import { Field } from 'formik'
import { useState } from 'react'
interface MajorityHolderModalProps {
    modal: boolean
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}
const RefrigerationDetailModal: React.FC<MajorityHolderModalProps> = ({
    modal,
    setModal,
}) => {
    const { token }: any = getToken() // Extracting token for API call

    const { data, loading, error } = useApiFetch<any>(
        'master/partner/store/type-of-cold-storage',
        token
    )
    const [data1, setData] = useState({})
    /**
     * The handleChange function updates the state with the new value of the input field.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the function, such as a change event on an
     * input field.
     */
    const handleChange = (e: any) => {
        const newData: any = { ...data1 }
        newData[e.target.name] = e.target.value

        setData(newData)
    }
    /**
     * The function `handlesave` saves data to local storage and closes a modal.
     */
    const handlesave = () => {
        if (!localStorage.getItem('Register_List')) {
            localStorage.setItem('Register_List', JSON.stringify(data))
        }
        setModal(false)
    }

    return (
        <>
            {/* The above code is rendering a modal component in a React application. The modal is displayed
        when the `modal` variable is true. The modal contains a form with various input fields such
        as select, text, and button. The user can input data into these fields and click the "Save"
        button to save the data. The modal also has a close button to hide the modal when clicked. */}
            {modal && (
                <div
                    id="authentication-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                onClick={() => setModal(false)}
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="authentication-modal"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h6>Refrigeration Details</h6>
                                <div className="flex">
                                    <FormItem
                                        label="Type of Refrigeration"
                                        className="mx-auto"
                                    >
                                        <select
                                            id="countries"
                                            name="type_of_refrigerator"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>
                                                Select Refrigerator
                                            </option>
                                            {data &&
                                                data?.data.map(
                                                    (item: any, index: any) => (
                                                        <option
                                                            value={item?.type}
                                                        >
                                                            {item?.type}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                    </FormItem>
                                    <FormItem
                                        label="Year of Installation"
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="mobile"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Year of Installation"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Manufacturer/ Vendor"
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="phone"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Manufacturer/ Vendor"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Vendor Contact Name"
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="email"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Vendor Contact Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Vendor Contact Number"
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="designation"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Vendor Contact Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Number of Compressors"
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="rm"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Number of compressors"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Make of compressors"
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="designation"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Make of compressors"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="AMC Details"
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="rm"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="AMC Details"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <Button
                                    style={{ borderRadius: '13px' }}
                                    block
                                    variant="solid"
                                    type="button"
                                    onClick={handlesave}
                                    className="bg-[#3f8cfe] w-[40%] mx-auto rounded-[30px]"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default RefrigerationDetailModal
