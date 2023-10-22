/*
 * The above code is a TypeScript React component that represents a modal for adding chamber details.
 * It includes form fields for entering chamber information such as chamber number, chamber name,
 * chamber size, number of pallets, pallet size, racking type, photo of entrance, photo of the chamber
 * from inside, number of floors, floor area, temperature range, height of each floor, staircase
 * (yes/no), and parking area. It also includes a save button that triggers a function to save the
 * chamber details. The component uses various dependencies such as FormItem, Input, useApiFetch,
 * useState, and ToastContainer
 */
import { Button, FormItem, Input, Tooltip } from '@/components/ui'
import { apiUrl, getToken } from '@/store/customeHook/token'
import useApiFetch from '@/store/customeHook/useApiFetch'
import { onkeyDown, validateChamberForm } from '@/store/customeHook/validate'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import InfoIcon from '@mui/icons-material/Info';
interface MajorityHolderModalProps {
    modal: boolean
    formD: any
    update: React.Dispatch<React.SetStateAction<boolean>>
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    FetchAgain: any
}
const ChamberDetailModal: React.FC<MajorityHolderModalProps> = ({
    modal,
    formD,
    update,
    setModal,
    FetchAgain,
    commanData
}:any) => {
    const { token }: any = getToken()
    const isDisabled:any=commanData?.type=='View' ? true: false;
    const {
        data: RackingType,
        loading: RackingTypeLoading,
        error: RackingTypeError,
    } = useApiFetch<any>('master/partner/store/get-racking-type', token)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [length, setLength] = useState<any>('');
    const [breadth, setBreadth] = useState<any>('');
    const [height, setHeight] = useState('');
    const [lengthP, setLengthP] = useState('');
    const [breadthP, setBreadthP] = useState('');
    const [heightP, setHeightP] = useState('');
    const [formattedString, setFormattedString] = useState('');
    const [formattedStringP, setFormattedStringP] = useState('');
    const [data, setData] = useState<any>({
        staircase:true
    })
    const {id}:any=useParams();
    const [errors, setErrors] = useState<any>({})
    let chamber_sizee = ''

    const updateFormattedString = (newLength:any, newBreadth:any, newHeight:any) => {
        const formatted = `${newLength}x${newBreadth}x${newHeight}`;
        setFormattedString(formatted);
        data['chamber_size'] = formatted
    };

    const updateFormattedStringP = (newLength:any, newBreadth:any, newHeight:any) => {
        const formatted = `${newLength}x${newBreadth}x${newHeight}`;
        setFormattedStringP(formatted);
        data['pallet_size'] = formatted
    };

    /**
     * The handleChange function updates the data object based on the input value and name, and logs
     * the updated data object.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the change, such as a user input or a file
     * selection.
     */
    const handleChange = (e: any) => {
        const newData: any = { ...data }
        newData.asset_id = id
       
        newData['chamber_size'] = formattedString || commanData?.chamber_size;
        newData['pallet_size'] = formattedStringP || commanData?.pallet_size;
        newData[e.target.name] = e.target.value
      
        if (e.target.name === 'photo_of_entrance') {
            newData[e.target.name] = e.target.files
        } else if (e.target.name === 'photo_of_chamber') {
            newData[e.target.name] = e.target.files
        } else if (e.target.name === 'photo_of_chamber_gate') {
            newData[e.target.name] = e.target.files
        } else if (e.target.name === 'photo_of_chamber_corner') {
            newData[e.target.name] = e.target.files
        } 
        else if (e.target.name === 'ch-l') {
            // data['chamber_size']?data['chamber_size'].concat(e.target.value.toString()):data['chamber_size'] = e.target.value.toString()
            // data['chamber_size'].concat('x')
            // console.log("chamber_size", typeof e.target.value.toString())
            setLength(e.target.value);
            const area:any=e.target.value*breadth;
            newData['floor_area']=area;
            updateFormattedString(e.target.value, breadth, height);
        } else if (e.target.name === 'ch-b') {
            setBreadth(e.target.value);
            const area:any=e.target.value*length;
            newData['floor_area']=area;
            updateFormattedString(length, e.target.value, height);
        } else if (e.target.name === 'ch-h') {
            setHeight(e.target.value);
            updateFormattedString(length, breadth, e.target.value);
        } 
        else if (e.target.name === 'pl-l') {
            // data['chamber_size']?data['chamber_size'].concat(e.target.value.toString()):data['chamber_size'] = e.target.value.toString()
            // data['chamber_size'].concat('x')
            // console.log("chamber_size", typeof e.target.value.toString())
            setLengthP(e.target.value);
            updateFormattedStringP(e.target.value, breadthP, heightP);
        } else if (e.target.name === 'pl-b') {
            setBreadthP(e.target.value);
            updateFormattedStringP(lengthP, e.target.value, heightP);
        } else if (e.target.name === 'pl-h') {
            setHeightP(e.target.value);
            updateFormattedStringP(lengthP, breadthP, e.target.value);
        }else
        if(e.target.name==='staircase'){
          
            // setData({...data,staircase:e.target.checked})
            newData[e.target.name]=e.target.checked ? true :false;
        }
        else {
            newData[e.target.name] = e.target.value
        }
        if(errors[e.target.name]){
            validateChamberForm(newData, setErrors)

        }
        setData(newData)
        
    }
    /**
     * The `handlesave` function is responsible for saving chamber details by making a POST request to
     * the server with the provided form data.
     */
    // console.log('newData')
    // console.log("ididididididid",formD);

    const handlesave = async () => {
        var myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${token}`)

        var formdata = new FormData()
        formdata.append('asset_id', data?.asset_id)
        formdata.append('chamber_number', data?.chamber_number)
        formdata.append('chamber_name', data?.chamber_name)
        formdata.append('chamber_size', data?.chamber_size)
        formdata.append('no_of_pallets', data?.no_of_pallets)
        formdata.append('pallet_size', data?.pallet_size)
        formdata.append('racking_type_id', data?.racking_type_id)
        formdata.append('no_of_floors', data?.no_of_floors)
        formdata.append('staircase', data?.staircase)
        formdata.append('floor_area', data?.floor_area)
        formdata.append('temp_range_min', data?.temp_range_min)
        formdata.append('temp_range_max', data?.temp_range_max)
        formdata.append('parking_area', data?.parking_area)
        formdata.append('each_floor_hight', data?.each_floor_hight)
        // data?.photo_of_entrance?.forEach((file:any, index:any) => {
        //     formdata.append(`photo_of_entrance`, file, file.name);
        //   });
        // formdata.append(
        //     'photo_of_entrance',
        //     data?.photo_of_entrance
        // )
        if(data?.photo_of_entrance)for (let index = 0; index < data?.photo_of_entrance.length; index++) {
            formdata.append(
                'photo_of_entrance',
                data?.photo_of_entrance[index]
            )
        }
        if(data?.photo_of_chamber)for (let index = 0; index < data?.photo_of_chamber.length; index++) {
            formdata.append(
                'photo_of_chamber',
                data?.photo_of_chamber[index]
            )
        }
        if(data?.photo_of_chamber_gate)for (let index = 0; index < data?.photo_of_chamber_gate.length; index++) {
            formdata.append(
                'photo_of_chamber',
                data?.photo_of_chamber_gate[index]
            )
        }
        if(data?.photo_of_chamber_corner)for (let index = 0; index < data?.photo_of_chamber_corner.length; index++) {
            formdata.append(
                'photo_of_chamber',
                data?.photo_of_chamber_corner[index]
            )
        }
    
        var requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        }
        var requestOptionsUpdate: any = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        }
        console.log("validateChamberFormvalidateChamberForm", formD)
            if(commanData?.type=='Edit'){
                try {
                    const response = await fetch(
                        `${apiUrl}/partner/store/chamber/${commanData?.id}`,
                        requestOptionsUpdate
                    )
                    const result = await response.json()
                    console.log("VVVVVVV",result);
        
                    if (result?.status) {
                        FetchAgain()
                        messageView('Chamber Details Updated Successfully!')
                        
                        const newD: any = { ...formD }
                        let arr: any = []
                        if (newD[`chamber_ids`]) arr = [...newD[`chamber_ids`]]
                        localStorage.setItem('StoreData',JSON.stringify(newD))
                        console.log("GGGGGG88889", result?.data, newD)
                        arr.push(result?.data?.id)
                        newD['chamber_ids'] = arr;
                        console.log("GGGGGG8888",newD?.chamber_ids);
                        
                  // Retrieve existing chamber_ids from local storage
        const existingChamberIdsJSON = localStorage.getItem('chamber_ids');
        let existingChamberIds = [];
        
        if (existingChamberIdsJSON) {
          existingChamberIds = JSON.parse(existingChamberIdsJSON);
        }
        
        // Assuming newD?.chamber_ids is the new data to be added
        const newChamberIds = newD?.chamber_ids || [];
        
        // Check if the new data is not already in the existing array
        const mergedChamberIds = [...new Set([...existingChamberIds, ...newChamberIds])];
        localStorage.setItem('chamber_ids', JSON.stringify(mergedChamberIds));
        if (!existingChamberIdsJSON) {
          // If chamber_ids doesn't exist in local storage, set it
          localStorage.setItem('chamber_ids', JSON.stringify(mergedChamberIds));
        }
        
        
                        update(newD)
                        setModal(false)
                    }
                    console.log(result?.status)
                } catch (error: any) {
                    messageView(error.message)
                    console.log('error', error.message)
                }
            }else{

               if(validateChamberForm(data, setErrors)){ try {
                    const response = await fetch(
                        `${apiUrl}/partner/store/chamber`,
                        requestOptions
                    )
                    const result = await response.json()
                    console.log("VVVVVVV",result);
        
                    if (result?.status) {
                        FetchAgain()
                        messageView('Chamber Details Updated Successfully!')
                        
                        const newD: any = { ...formD }
                        let arr: any = []
                        if (newD[`chamber_ids`]) arr = [...newD[`chamber_ids`]]
                        localStorage.setItem('StoreData',JSON.stringify(newD))
                        console.log("GGGGGG88889", result?.data, newD)
                        arr.push(result?.data?.id)
                        newD['chamber_ids'] = arr;
                        console.log("GGGGGG8888",newD?.chamber_ids);
                        
                  // Retrieve existing chamber_ids from local storage
        const existingChamberIdsJSON = localStorage.getItem('chamber_ids');
        let existingChamberIds = [];
        
        if (existingChamberIdsJSON) {
          existingChamberIds = JSON.parse(existingChamberIdsJSON);
        }
        
        // Assuming newD?.chamber_ids is the new data to be added
        const newChamberIds = newD?.chamber_ids || [];
        
        // Check if the new data is not already in the existing array
        const mergedChamberIds = [...new Set([...existingChamberIds, ...newChamberIds])];
        localStorage.setItem('chamber_ids', JSON.stringify(mergedChamberIds));
        if (!existingChamberIdsJSON) {
          // If chamber_ids doesn't exist in local storage, set it
          localStorage.setItem('chamber_ids', JSON.stringify(mergedChamberIds));
        }
        
        
                        update(newD)
                        setModal(false)
                    }
                    console.log(result?.status)
                } catch (error: any) {
                    messageView(error.message)
                    console.log('error', error.message)
                }}
            }
      
    }

    /**
     * The function `messageView` displays a success toast message with specified options.
     * @param {any} messagevalue - The message value is the text that you want to display in the toast
     * message. It can be any string or variable that contains the message you want to show.
     */
    const messageView = (messagevalue: any) => {
        toast.success(messagevalue, {
            position: 'top-right', // Position of the toast
            autoClose: 3000, // Auto-close after 3000ms (3 seconds)
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                background: '#FFB017',
                fontSize: 'bold',
                color: '#fff', // Set the background color here
            },
        })
    }
    useEffect(()=>{
   
     setLength(commanData?.chamber_size?.split('x')[0])
     setBreadth(commanData?.chamber_size?.split('x')[1])
     setHeight(commanData?.chamber_size?.split('x')[2])
     setLengthP(commanData?.pallet_size?.split('x')[0])
     setBreadthP(commanData?.pallet_size?.split('x')[1])
     setHeightP(commanData?.pallet_size?.split('x')[2])
        
        setData(commanData)
    },[commanData])
    console.log("565767676",data);
    return (
        <>
            <ToastContainer />
            {/* The above code is rendering a modal component in a TypeScript React application. The
            modal is displayed when the `modal` variable is true. The modal contains a form with
            various input fields such as chamber number, chamber name, chamber size, number of
            pallets, pallet size, racking type, photo of entrance, photo of the chamber from inside,
            number of floors, floor area, temperature range, height of each floor, staircase
            (yes/no), and parking area. The user can fill in these fields and click the "Save"
            button to save the form data. */}
            {modal && (
                <div
                    id="authentication-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative w-full max-w-[800px] max-h-full rounded-[13px]">
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
                                <h6 className="text-center text-head-title">
                                    Chamber
                                </h6>
                                
                                <div className="flex">
                                    <FormItem
                                        label="Chamber No*"
                                        className="mx-auto w-1/2"
                                    >
                                        <Field
                                            type="text"
                                            disabled={isDisabled}
                                            autoComplete="off"
                                            name="chamber_number"
                                            placeholder="Chamber no."
                                            component={Input}
                                            value={data?.chamber_number}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.chamber_number}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Chamber name *"
                                        className="mx-auto w-1/2"
                                    >
                                        <Field
                                            type="text"
                                            disabled={isDisabled}
                                            autoComplete="off"
                                            name="chamber_name"
                                            placeholder="Chamber name"
                                            component={Input}
                                            value={data?.chamber_name}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.chamber_name}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Chamber Size(Meter) *"
                                        className="mx-auto w-1/2"
                                    >
                                         {/* <Field
                                            type="number"
                                            autoComplete="off"
                                            name="chamber_size"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="L X B X H"
                                            component={Input}
                                        /> */}
                                        <div className='flex input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                        <input     disabled={isDisabled} type="number" placeholder='Length' className='w-1/3 text-center focus:outline-0' min={1} name='ch-l' value={length} onChange={(e: any) => handleChange(e)} />
                                        <span className='h-fit my-auto'>X</span>
                                        <input     disabled={isDisabled} type="number" placeholder='Breadth' className='w-1/3 text-center focus:outline-0' min={1} name='ch-b' value={breadth} onChange={(e: any) => handleChange(e)} />
                                        <span className='h-fit my-auto'>X</span>
                                        <input     disabled={isDisabled} type="number" placeholder='Height' className='w-1/3 text-center focus:outline-0' min={1} name='ch-h' value={height} onChange={(e: any) => handleChange(e)} />
                                       </div>
                                        <p className="text-[red]">
                                            {errors && errors.chamber_size}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="No. of pallets *"
                                        className="mx-auto w-1/2"
                                    ><Field
                                            type="number"
                                            autoComplete="off"
                                            disabled={isDisabled}
                                            name="no_of_pallets"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="No. of pallets"
                                            component={Input}
                                            value={data?.no_of_pallets}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.no_of_pallets}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Pallet size(MM)*"
                                        className="mx-auto w-1/2"
                                    >
                                          {/* <Field
                                            type="text"
                                            autoComplete="off"
                                            name="pallet_size"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="L X B X H"
                                            component={Input}
                                        /> */}
                                        <div className='flex input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                        <input     disabled={isDisabled} type="number" placeholder='Length' className='w-1/3 text-center focus:outline-0' min={1} name='pl-l' value={lengthP} onChange={(e: any) => handleChange(e)} />
                                        <span className='h-fit my-auto'>X</span>
                                        <input     disabled={isDisabled} type="number" placeholder='Breadth' className='w-1/3 text-center focus:outline-0' min={1} name='pl-b' value={breadthP} onChange={(e: any) => handleChange(e)} />
                                        <span className='h-fit my-auto'>X</span>
                                        <input     disabled={isDisabled} type="number" placeholder='Height' className='w-1/3 text-center focus:outline-0' min={1} name='pl-h' value={heightP} onChange={(e: any) => handleChange(e)} />
                                       </div>
                                     
                                        <p className="text-[red]">
                                            {errors && errors.pallet_size}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Racking Type *"
                                        className="mx-auto w-1/2"
                                    >
                                        <select
                                            name="racking_type_id"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            disabled={isDisabled}
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                         
                                        >
                                            <option>Select</option>
                                            {RackingType &&
                                                RackingType?.data?.map(
                                                    (item: any, index: any) => (
                                                        <option
                                                            value={item?.id}
                                                            selected={item?.id===data?.racking_type_id}
                                                        >
                                                            {item?.type}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.racking_type_id}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    
                                    <FormItem
                                     label={
                                        <div className='flex justify-center items-center'>
                                          Photo of entrance
                                          <Tooltip title="Select multiple files" arrow>
                                            <InfoIcon />
                                          </Tooltip>
                                        </div>
                                      }
                                        className="mx-auto w-1/2"
                                    >
                                        
                                        <input
                                            type="file"
                                            multiple
                                            disabled={isDisabled}
                                            name="photo_of_entrance"
                                            id=""
                                            accept="image/png, image/gif, image/jpeg" 
                                            className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                           
                                        />
                                        
                                        <p className="text-[red]">
                                            {errors && errors.photo_of_entrance}
                                        </p>
                                    </FormItem>

                                    <FormItem
                                        // label="Photo of the chamber from inside*"
                                        label={
                                            <div className='flex justify-center items-center'>
                                            Photo of the chamber from inside*
                                              <Tooltip title="Select multiple files" arrow>
                                                <InfoIcon />
                                              </Tooltip>
                                            </div>
                                          }
                                        className="mx-auto w-1/2"
                                    >
                                        <input
                                            type="file"
                                            disabled={isDisabled}
                                            name="photo_of_chamber"
                                            multiple
                                            id=""
                                            accept="image/png, image/gif, image/jpeg" 
                                            className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                           
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.photo_of_chamber}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        // label="Photo of chamber from gate *"
                                        label={
                                            <div className='flex justify-center items-center'>
                                          Photo of chamber from gate *
                                              <Tooltip title="Select multiple files" arrow>
                                                <InfoIcon />
                                              </Tooltip>
                                            </div>
                                          }
                                        className="mx-auto w-1/2"
                                    >
                                        
                                        <input
                                            type="file"
                                            multiple
                                            name="photo_of_chamber_gate"
                                            id=""
                                            disabled={isDisabled}
                                            accept="image/png, image/gif, image/jpeg" 
                                            className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                           
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.photo_of_entrance}
                                        </p>
                                    </FormItem>

                                    <FormItem
                                        // label="Photo of the chamber from one corner *"
                                        label={
                                            <div className='flex justify-center items-center'>
                                          Photo of the chamber from one corner *
                                              <Tooltip title="Select multiple files" arrow>
                                                <InfoIcon />
                                              </Tooltip>
                                            </div>
                                          }
                                        className="mx-auto w-1/2"
                                    >
                                        <input
                                            type="file"
                                            name="photo_of_chamber_corner"
                                            multiple
                                            id=""
                                            disabled={isDisabled}
                                            accept="image/png, image/gif, image/jpeg" 
                                            className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                           
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.photo_of_chamber}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="No. of floors *"
                                        className="mx-auto w-1/2"
                                    >
                                   <Field
                                            type="number"
                                            autoComplete="off"
                                            min={1}
                                            name="no_of_floors"
                                            disabled={isDisabled}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            value={data?.no_of_floors}
                                            onKeyDown={onkeyDown}
                                            placeholder="No. of floors"
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.no_of_floors}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Floor area (Square Feet) *"
                                        className="mx-auto w-1/2"
                                    >
                                          <Field
                                              disabled={isDisabled}
                                            type="text"
                                            autoComplete="off"
                                            name="floor_area"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Enter Value"
                                            component={Input}
                                            value={data?.floor_area || formD?.floor_area}
                                           
                                        />
                                      
                                        <p className="text-[red]">
                                            {errors && errors.floor_area}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Temperature range (°C) *"
                                        className="mx-auto w-1/2"
                                    >
                                            {/* <Field
                                            type="text"
                                            autoComplete="off"
                                            name="temp_range"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Enter Value"
                                            component={Input}
                                        /> */}
                                        <div className='flex input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                        <input     disabled={isDisabled} type="number" placeholder='Min' className='w-1/2 text-center focus:outline-0' name='temp_range_min' value={data?.temp_range_min} onChange={(e: any) => handleChange(e)} />
                                        <input     disabled={isDisabled} type="number" placeholder='Max' className='w-1/2 text-center focus:outline-0' name='temp_range_max' value={data?.temp_range_max} onChange={(e: any) => handleChange(e)} />
                                       </div>
                                           
                                        <p className="text-[red]">
                                            {errors && errors.temp_range}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Height of each floor (Feet) *"
                                        className="mx-auto w-1/2"
                                    ><Field
                                            type="text"
                                            autoComplete="off"
                                            disabled={isDisabled}
                                            name="each_floor_hight"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            value={data?.each_floor_hight}
                                            placeholder="Enter Value"
                                            component={Input}
                                        />
                            
                                        <p className="text-[red]">
                                            {errors && errors.each_floor_hight}
                                        </p>
                                    </FormItem>
                                </div>

                                <div className="flex">
                                    <FormItem
                                        label="Staircase (Yes/No)"
                                        className="w-1/2"
                                    >
                                        <div className='border-2 flex justify-around p-4'>
                                         <span className=" text-center ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                         Staircase (Yes/No)
  </span>
                                        <label className="relative inline-flex items-center cursor-pointer">
  <input     disabled={isDisabled} type="checkbox" className="sr-only peer"  checked={data?.staircase}  name="staircase"
 
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                           />
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
 
</label>
</div>
                                        {/* <select
                                            name="staircase"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select> */}
                                        <p className="text-[red]">
                                            {errors && errors.staircase}
                                        </p>
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

export default ChamberDetailModal
