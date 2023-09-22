/*
 * The above code is a TypeScript React component that renders a modal for entering generator details.
 * It receives props such as `modal`, `formD`, `update`, `setModal`, and `chamber`. It uses state to
 * manage the form data and handles changes in the form inputs. It also includes a `handlesave`
 * function that is called when the save button is clicked. The `handleStoreTable` function is called
 * within `handlesave` to store the generator data.
 */
import { Button, FormItem, Input } from '@/components/ui'
import { handleStoreTable, validateGeneratorForm } from '@/store/customeHook/validate'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
interface MajorityHolderModalProps {
    modal: boolean
    formD: any
    update: React.Dispatch<React.SetStateAction<boolean>>
    chamber: any
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}
const GeneratorDetailModal: React.FC<MajorityHolderModalProps> = ({
    modal,
    formD,
    update,
    setModal,
}) => {
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})

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
     * The handlesave function calls the handleStoreTable function with specific parameters.
     */
    const handlesave = () => {
        if(validateGeneratorForm(data, setErrors)) {
        handleStoreTable(
            'partner/store/generator',
            data,
            setModal,
            formD,
            update,
            'generator_ids'
        )
        }
    }

    return (
        <>
            <ToastContainer />
            {/* The above code is a TypeScript React component that renders a modal. The modal is
       conditionally rendered based on the value of the `modal` variable. When the modal is
       rendered, it displays a form with input fields for "Asset ID", "Make", "Model", "KVA", and
       "Year". There is also a "Save" button that triggers the `handlesave` function when clicked.
       The modal can be closed by clicking on the close button in the top right corner. */}
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
                                <h6 className="text-center">Generator</h6>
                                <div className="flex">
                                    <FormItem
                                        label="Asset ID"
                                        className="w-1/2 mx-auto"
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
                                        <p className="text-[red]">
                                            {errors && errors.asset_id}
                                        </p>
                                    </FormItem>
                                    <FormItem label="Make" className="w-1/2 mx-auto">
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
                                        <p className="text-[red]">
                                            {errors && errors.make}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem label="Model" className="w-1/2 mx-auto">
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
                                        <p className="text-[red]">
                                            {errors && errors.model}
                                        </p>
                                    </FormItem>
                                    <FormItem label="KVA" className="w-1/2 mx-auto">
                                        <Field
                                            type="number"
                                            autoComplete="off"
                                            name="kva"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="KVA"
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.kva}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem label="Year" className="w-1/2 mx-auto">
                                        <select
                                            id="countries"
                                            name="year"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            className="input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option selected disabled>Select</option>
                                            {Array.from({ length: 2023 - 1980 + 1 }, (_, index) => 1980 + index).map((yr)=>{
                                                return (<option>{yr}</option>);
                                            })}

                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.year}
                                        </p>
                                    </FormItem>
                                    <div className="w-1/2">

                                    </div>
                                </div>

                                {/* <div className="flex">
                                    <FormItem
                                        label="Pallet Dimension mm"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="Pallet_Dimension"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Pallet Dimension "
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Floor Area (sqft)"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="Floor_Area_(sqft)"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Floor Area (sqft)"
                                            component={Input}
                                        />
                                    </FormItem>
                                    
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Staircase (Yes/No)"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="Staircase_(Yes/No)"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Yes/No"
                                            component={Input}
                                        />
                                    </FormItem>
                                  
                                    
                                </div> */}
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

export default GeneratorDetailModal
