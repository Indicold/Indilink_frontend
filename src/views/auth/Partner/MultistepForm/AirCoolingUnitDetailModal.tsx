/*
 * The above code is a TypeScript React component that renders a modal for entering air cooling unit
 * details. It receives two props: `modal` and `setModal`, which control the visibility of the modal.
 * Inside the component, there is a form with input fields for ACU make and model number, ACU capacity,
 * ACU CFM, ACU defrosting method, and ACU outlet pipe make. The user can enter the details and click
 * the "Save" button to save the data. The `handleChange` function updates the `data` state with the
 * input values, and the `handles
 */
import { Button, FormItem, Input } from '@/components/ui'
import { Field } from 'formik'
import { useState } from 'react'
interface MajorityHolderModalProps {
    modal: boolean
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}
const AirCoolingUnitDetailModal: React.FC<MajorityHolderModalProps> = ({
    modal,
    setModal,
}) => {
    const [data, setData] = useState({})
    /**
     * The handleChange function updates the state with the new value of the input field and logs
     * the updated data.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the function, such as a change event on an
     * input field.
     */
    const handleChange = (e: any) => {
        const newData: any = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
        console.log('newData', newData)
    }
    /**
     * The function `handlesave` saves data to local storage and closes a modal.
     */
    const handlesave = () => {
        if (!localStorage.getItem('airCooling_List')) {
            localStorage.setItem('airCooling_List', JSON.stringify(data))
        }
        setModal(false)

        console.log('gggggg')
    }
    return (
        <>
            {/* The above code is rendering a modal component in a React application. The modal is displayed
       when the `modal` variable is true. The modal contains a form with input fields for ACU Make
       and Model no., ACU Capacity, ACU CFM, ACU Defrosting, and ACU Outlet Pipe Make. The user can
       enter values in these fields and click the "Save" button to save the form data. The modal can
       be closed by clicking the close button in the top right corner. */}
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
                                <h6>Air Cooling Unit Details</h6>
                                <div className="flex">
                                    <FormItem
                                        label="ACU Make and Model no."
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="fullName"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="ACU Make and Model no."
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="ACU Capacity"
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="mobile"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="ACU Capacity"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="ACU CFM"
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="phone"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="ACU CFM"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="ACU Defrosting"
                                        className="mx-auto"
                                    >
                                        <select
                                            id="ttt"
                                            name="acu_defrost"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected value="Water">
                                                Water
                                            </option>
                                            <option value="Hot Gas">
                                                Hot Gas
                                            </option>
                                            <option value="Heating cable">
                                                Heating cable
                                            </option>
                                        </select>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="ACU Outlet Pipe Make"
                                        className="mx-auto"
                                    >
                                        <select
                                            id="ttt"
                                            name="acu_defrost"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected value="PVC">
                                                PVC
                                            </option>
                                            <option value="GI">GI</option>
                                        </select>
                                    </FormItem>
                                </div>
                                <Button
                                    style={{ borderRadius: '13px' }}
                                    block
                                    variant="solid"
                                    onClick={handlesave}
                                    type="button"
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

export default AirCoolingUnitDetailModal
