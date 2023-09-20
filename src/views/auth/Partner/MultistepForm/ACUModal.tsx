/**
 * The above code is a TypeScript React component that renders a modal form for entering data related
 * to an ACU (Air Conditioning Unit) and includes form validation and a save button.
 * @param  - 1. `modal`: a boolean value indicating whether the modal is open or not.
 * @returns The component is returning a modal component that displays a form with input fields for
 * various attributes such as asset ID, make, model, C.M.F., H.P., A.M.C., T.R., and defrosting ID. The
 * user can enter values in these fields and click the "Save" button to save the data. The modal is
 * displayed conditionally based on the value of the "modal
 */
import { Button, FormItem, Input } from '@/components/ui'
import { handleStoreTable } from '@/store/customeHook/validate'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
interface MajorityHolderModalProps {
    modal: boolean
    formD: any
    update: React.Dispatch<React.SetStateAction<boolean>>
    chamber: any
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}
const ACUModall: React.FC<MajorityHolderModalProps> = ({
    modal,
    formD,
    update,
    setModal,
}) => {
    const [data, setData] = useState({})

    /**
     * The handleChange function updates the state with the new value entered in the input field or
     * the selected file in the file input field.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the function, such as a change event on an
     * input field or a file input event.
     */
    const handleChange = (e: any) => {
        const newData: any = { ...data }

        if (e.target.name === 'photo_of_entrance') {
            newData[e.target.name] = e.target.files[0]
        } else {
            newData[e.target.name] = e.target.value
        }

        setData(newData)
        console.log('newData', newData)
    }
    /**
     * The function `handlesave` calls the `handleStoreTable` function with specific
     * parameters.
     */
    const handlesave = () => {
        handleStoreTable(
            'partner/store/acu',
            data,
            setModal,
            formD,
            update,
            'acu_ids'
        )
    }

    return (
        <>
            {/* The above code is a TypeScript React component that renders a modal. The modal is
       conditionally rendered based on the value of the `modal` variable. When the modal is
       rendered, it displays a form with several input fields and a save button. The user can enter
       values in the input fields and click the save button to save the form data. The modal can be
       closed by clicking the close button in the top right corner. */}
            {modal && (
                <div
                    id="authentication-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative w-full max-w-[600px] max-h-full rounded-[13px]">
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
                                <h6 className="text-center">A.C.U.</h6>
                                <div className="flex">
                                    <FormItem
                                        label="Asset ID"
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="asset_id"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Asset ID"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem label="Make" className="mx-auto">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="make"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Make"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem label="Model" className="mx-auto">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="model"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Model"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="C.M.F."
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="cmf"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="C.M.F."
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem label="H.P." className="mx-auto">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="hp"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="H.P."
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="A.M.C."
                                        className="mx-auto"
                                    >
                                        <select
                                            id="countries"
                                            name="amc"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </FormItem>
                                </div>

                                <div className="flex">
                                    <FormItem label="T.R." className="mx-auto">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="tr"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="T.R."
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Defrosting ID"
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="defrosting_id"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Defrosting ID"
                                            component={Input}
                                        />
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

export default ACUModall
