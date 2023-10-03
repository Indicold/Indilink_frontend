/**
 * The `MachineModal` component is a modal that allows users to input data for a machine and save it.
 * @param  - 1. `modal`: A boolean value that determines whether the modal is visible or not.
 * @returns The code is returning a React functional component named "MachineModal".
 */
import { Button, FormItem, Input } from '@/components/ui'
import { handleStoreTable } from '@/store/customeHook/validate'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
interface MajorityHolderModalProps {
    modal: boolean
    formD: any
    update: React.Dispatch<React.SetStateAction<boolean>>
    // chamber:any;
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    setFormData: any
    machineId: any
}
const MachineModal: React.FC<MajorityHolderModalProps> = ({
    modal,
    formD,
    update,
    setModal,
    setFormData,
    machineId
}) => {
    const [data, setData] = useState({})

    /**
     * The handleChange function updates the state data object with the new value from the input
     * field.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It is typically an event object that is triggered by a user action, such as clicking
     * a button or typing in an input field.
     */
    const handleChange = (e: any) => {
        const newData: any = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
        console.log('newData', newData)
    }
    /**
     * The handlesave function is used to handle saving data related to a partner's prepared
     * machine.
     */
    const handlesave = () => {
        handleStoreTable(
            'partner/prepare/machine',
            data,
            setModal,
            formD,
            update,
            'machine_ids'
        )
        let arr = machineId;
        arr.push()
        setFormData()       
    }

    return (
        <>
            <ToastContainer />
            {/* The above code is rendering a modal component in a TypeScript React application. The modal is
      displayed when the `modal` variable is true. The modal contains a form with input fields for
      asset ID, type of machine, name, make, model, purpose, and power requirement. There is also a
      "Save" button that triggers the `handlesave` function when clicked. */}
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
                                <h6 className="text-center">Machine</h6>
                                <div className="flex">
                                    <FormItem
                                        label="Asset ID"
                                        className="mx-auto w-1/2"
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
                                    <FormItem
                                        label="Type of Machine"
                                        className="mx-auto w-1/2"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="type_of_machine"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Type of Machine"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem label="Name" className="mx-auto w-1/2">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="name"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem label="Make" className="mx-auto w-1/2">
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
                                    <FormItem label="Model" className="mx-auto w-1/2">
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
                                        label="Purpose"
                                        className="mx-auto w-1/2"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="purpose"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Purpose"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Power requirement"
                                        className="w-1/2"
                                    >
                                        <Field
                                            type="number"
                                            autoComplete="off"
                                            name="power_requirement"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Power requirement"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className='flex'>
                                <Button
                                    style={{ borderRadius: '13px' }}
                                    block
                                    variant="solid"
                                    onClick={handlesave}
                                    type="button"
                                    className="indigo-btn !w-[40%] mx-auto rounded-[30px]"
                                >
                                    Save
                                </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MachineModal