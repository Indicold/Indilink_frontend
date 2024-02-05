// import all modules and icons for Audit Details 
import usePostApi from '@/store/customeHook/postApi';
import { TokenInfo, apiUrl, getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import { messageView } from '@/store/customeHook/validate';
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import EventNoteIcon from '@mui/icons-material/EventNote';
import FilterIcon from '@mui/icons-material/Filter';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router-dom';
import { Button, Icon } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocompletem from "react-google-autocomplete"
import useApiFetch2 from '@/store/customeHook/useFetchApi2';
const AuditDetails = ({ setModal }: any) => {
  const AssetsTypeId: any = localStorage.getItem("AssetsType");
  /* The following code is declaring a variable `token` and assigning it the value returned by the
  `getToken()` function. The type of the `token` variable is `any`, which means it can hold any type
  of value. */
  const token: any = getToken();

  /* The following code is a TypeScript React code snippet. It is using the `useParams` hook from React
  Router to extract the `id` parameter from the current URL. The `id` parameter is then being
  destructured from the returned object and assigned to a variable. The `any` type is used to
  indicate that the `id` variable can have any type. */
  const { id }: any = useParams();

  /* The below code is written in TypeScript and React. It is using destructuring assignment to extract
  the `user_id` property from the result of the `TokenInfo()` function. The `TokenInfo()` function
  is expected to return an object with a `user_id` property. The extracted `user_id` value is then
  assigned to the `user_id` variable. */
  const { user_id }: any = TokenInfo();
  const [gradeID, setGradeID] = useState('1');
  const AssetsId: any = localStorage.getItem('Asset_id')

  /* The below code is written in TypeScript and React. It is using various hooks provided by React to
  fetch data from an API and perform some operations. */
  const { data: gradeType } = useApiFetch2<any>(`audit/audit_grade_type`, token.token);
  const { data: TaskList, refetch: FetchAgain } = useApiFetch2<any>(`audit/GetAuditViaassetsid/${AssetsId}`, token.token);
  const { data: TaskListID } = useApiFetch2<any>(`audit/GetAuditViaassets_temp_id/${AssetsId}/${id}`, token.token);
  const { data: AuditModuleLists } = useApiFetch2<any>(`audit/auditModules/${id}/${AssetsId}`, token.token);
  let { result: AddAssetOrderResponse, loading, sendPostRequest: postData }: any = usePostApi('audit/addassetAudit');
  let { result: UpdateAssetOrderResponse, sendPostRequest: postDataUpdate }: any = usePostApi('audit/updateAssetTask');

  /* The following code is a TypeScript React component. It defines several state variables using the
  useState hook. */
  const [formData, setFormData] = useState<any>({
  });
  const [commanData, setCommanData] = useState<any>({})
  const [imgList, setImgList] = useState<any>([])
  const [longitude, setLongitude] = useState<any>(null)
  const [latitude, setLatitude] = useState<any>(null)
  const [Validfrom, setValidFrom] = useState<any>(null)
  const [ValidTill, setValidTill] = useState<any>(null)
  const [Address, setAddress] = useState<any>(null)
  const [ECT, setECT] = useState<any>({
    note: false,
    media: false
  })
  const [ECT1, setECT1] = useState<any>({
    note: false,
    media: false
  })
  const [Note, setNote] = useState<any>('')
  const [Media, setMedia] = useState<any>('')
  const [AuditModal, setAuditModal] = useState<Boolean>(false)
  const [GradeTypeId, setGradeTypeId] = useState<any>(1)
  const arr = [1, 2, 3, 4, 5];

  let data: any = JSON.parse(localStorage.getItem("data"));

  const [rating, setRating] = useState(data);
  const handleClick = (newRating: any) => {
    setRating(newRating);
    setGradeTypeId(newRating)
  }

  localStorage.setItem("data", JSON.stringify(rating))

  /* The following code is using the useEffect hook in a React component. It is creating a new state object
  by copying the existing formData state using the spread operator. It then sets the created_by and
  update_by properties of the new state object to the value of the user_id variable. Finally, it
  sets the status property of the new state object to the string "pending". The updated state object
  is then set using the setFormData function. This code is likely used to initialize the form data
  with default values when the component mounts. */
  useEffect(() => {
    const newState: any = { ...formData };
    newState.created_by = user_id
    newState.update_by = user_id
    newState.status = "pending"
    setFormData(newState)
  }, [])

  const UploadImgfile = (e: any) => {
    const files: any = e.target.files;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token?.token}`);

    var formdata = new FormData();
    for (let i = 0; i < files?.length; i++) {
      formdata.append("doc", files[i]);
    }


    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${apiUrl}/audit/uploadDoc`, requestOptions)
      .then(response => response.json())
      .then((result: any) => {
        setImgList(result?.data)
      })
      .catch(error => console.log('error', error));
  }
  console.log("gggggggg", imgList);

  /**
   * The `handlesave` function is used to save or update an item with various properties, including
   * asset ID, asset type, photo, priority, description, grade, status, remark, and user ID.
   * @param {any} item - The `item` parameter is an object that contains various properties.
   */
  const handlesave = (item: any, ItemData: any, ItemTemp: any) => {

    const body: any = {
      ...item,
      audit_module_id: id,
      audit_temp_id: item?.audit_temp_id,
      audit_temp_task_id: item?.audit_temp_task_id,
      asset_id: localStorage.getItem('Asset_id'),
      asset_type: AssetsTypeId || 1,
      photo: imgList?.length > 0 ? JSON.stringify(imgList) : item?.photo,
      priority: item?.priority || "Low",
      description: Note || item?.description,
      grade: GradeTypeId || item?.grade,
      status: item?.status || 1,
      remark: item?.remark || "N/A",
      longitude: longitude || item?.longitude,
      latitude: latitude || item?.latitude,
      valid_from: Validfrom || item?.valid_from,
      valid_till: ValidTill || item?.valid_till,
      address: Address || item?.address,
      // default_grade_type_id:GradeTypeId,
      created_by: user_id,
      update_by: user_id,

    }

    if (item?.flag === 0) {
      postData(body)
    } else {
      postDataUpdate(body)
    }
  }
 


  useEffect(() => {
    if (AddAssetOrderResponse) {
      messageView(AddAssetOrderResponse)
    }
    // AddAssetOrderResponse = "667"
  }, [AddAssetOrderResponse?.message]);

  /**
   * The handleChange function updates the value of the "note" state variable based on the value of the
   * input field.
   * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
   * function. It represents the event that triggered the function, such as a change event on an input
   * element.
   */
  const handleChange = (e: any) => {

    setNote(e.target.value)
  }

  /* The following code is using the `useEffect` hook in a React component. It is watching for changes in
  the `UpdateAssetOrderResponse` variable and when it changes, it calls the `messageView` function
  with the value of `UpdateAssetOrderResponse`. After that, it sets the value of
  `UpdateAssetOrderResponse` to "667". */
  useEffect(() => {
    if (UpdateAssetOrderResponse) {
      messageView(UpdateAssetOrderResponse)
    }
    // UpdateAssetOrderResponse = "667"
  }, [UpdateAssetOrderResponse?.message]);

  /* The following code is a TypeScript React component that renders an audit form. It includes a modal for
  adding a new audit, a list of audits, and a form for submitting audit data. The component uses
  various UI components and hooks from the React and Material-UI libraries to handle user
  interactions and manage state. */
  const today = new Date().toISOString().split('T')[0];
  return (
    <div>
      <ToastContainer />
      {/* {AuditModal && <AuditAddModal FetchAgain={FetchAgain} setModal={setAuditModal} commanData={commanData} />}
      <div className='flex justify-end'>

      </div>
      {TaskListID?.data && false && <AuditListById allData={TaskListID?.data?.length > 0 ? TaskListID?.data : TaskList} setCommanData={setCommanData} setModal={setAuditModal} />} */}

      <div className="flex justify-center overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none blur-bg-modal">
        <div className="relative my-6 mx-auto w-full my-auto ">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-solid border-gray-300 rounded-t ">
              <h4 className="text-head-title w-full !text-center">{TaskListID?.category?.name} AUDIT</h4>


            </div>
            <div className="relative ">
              <form className=" shadow-md rounded px-8 pt-2 pb-8 w-full">
                <Accordion>
                  {AuditModuleLists?.data?.length > 0 ? AuditModuleLists?.data?.map((ItemData: any, index: any) => (

                    <AccordionItem key={index}>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          {ItemData?.name}

                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel style={{ padding: '5px' }}>


                        <Accordion>
                          {ItemData?.audit_temp_ids?.length > 0 ? ItemData.audit_temp_ids?.map((ItemTemp: any, index: any) => (

                            <AccordionItem key={index}>
                              <AccordionItemHeading>
                                <AccordionItemButton>
                                  {ItemTemp?.name}

                                </AccordionItemButton>
                              </AccordionItemHeading>
                              <AccordionItemPanel style={{ padding: '5px' }}>
                                <Accordion>
                                  {ItemTemp?.payload?.length > 0 ? ItemTemp?.payload?.map((item: any, index: any) => (

                                    <AccordionItem key={index} onClick={() => {
                                      localStorage.removeItem("data")
                                    }}>
                                      <AccordionItemHeading onClick={() => {
                                        setGradeTypeId(item?.grade)
                                        setImgList([])
                                      }}>
                                        <AccordionItemButton>
                                          <b>Task : </b>{item?.default_title}

                                        </AccordionItemButton>
                                      </AccordionItemHeading>
                                      <AccordionItemPanel>
                                        <div>

                                          {item?.default_grade_type_id === 1 ? <FormControl disabled>

                                            <FormLabel id="demo-radio-buttons-group-label">    Is the facility dock area clean?</FormLabel>
                                            <RadioGroup
                                           
                                              aria-labelledby="demo-radio-buttons-group-label"
                                              defaultValue={item?.grade}
                                              name="radio-buttons-group"
                                            >
                                              <FormControlLabel value={1} onChange={(e: any) => setGradeTypeId(e.target.value)} control={<Radio />} label="Yes" />
                                              <FormControlLabel value={0} onChange={(e: any) => setGradeTypeId(e.target.value)} control={<Radio />} label="No" />
                                            </RadioGroup>
                                          </FormControl> : item?.default_grade_type_id === 3 ? <>
                                            <div className="flex">
                                              {arr.map((index) => (
                                                <span
                                                  key={index}
                                                //   onClick={() => handleClick(index)}
                                                  className="cursor-pointer "
                                                >
                                                  <Icon className="text-yellow-500 text-xl">
                                                    {index <= rating ? <StarIcon /> : <StarOutlineIcon />}
                                                  </Icon>
                                                </span>
                                              ))}
                                              {localStorage.setItem('data', item?.grade)}

                                            </div>
                                          </> :
                                            <div>
                                              <p>Grade</p>

                                              <select disabled onChange={(e: any) => setGradeTypeId(e.target.value)} className=" border rounded-[13px] py-2 px-1 w-1/4 text-black">
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((items: any, index: any) => (
                                                  <option value={items} key={index} selected={item?.grade == items}>{items}</option>
                                                ))}

                                              </select>
                                            </div>}
                                          <div>Address

                                            <Autocompletem
                                              className='input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'
                                              disabled={true}
                                              name="address"
                                              // value={item?.address}
                                              defaultValue={item?.address}
                                              onChange={(e: any) => setAddress(e.target.value)}
                                              placeholder="Address"
                                              apiKey='AIzaSyB7dJWdsmX6mdklhTss1GM9Gy6qdOk6pww'
                                              onPlaceSelected={(place) => {
                                                setAddress(place?.formatted_address)
                                                // localStorage.setItem("AuditAddress",place?.formatted_address);
                                                // setAddressUpdateCount((val) => val + 1);
                                                setLatitude(place?.geometry?.location?.lat());
                                                setLongitude(place?.geometry?.location?.lng());
                                              }}
                                            />
                                          </div>
                                          <div className='flex'>
                                            <div className="relative max-w-sm m-2">
                                              <label htmlFor="">Valid From</label>
                                              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                                <svg
                                                  className="w-4 h-4 mt- text-gray-500 dark:text-gray-400"
                                                  aria-hidden="true"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="currentColor"
                                                  viewBox="0 0 20 20"
                                                >
                                                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                              </div>
                                              <input
                                              disabled
                                                type="date"
                                                min={today}
                                                defaultValue={item?.valid_from ? item?.valid_from.split('T')[0] : ''}
                                                onChange={(e: any) => setValidFrom(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Select date"
                                              />
                                            </div>

                                            <div className="relative max-w-sm m-2">
                                              <label htmlFor="">Valid Till</label>
                                              <div className="absolute inset-y-0 start-0 pt-5 flex items-center ps-3.5 pointer-events-none">
                                                <svg
                                                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                  aria-hidden="true"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="currentColor"
                                                  viewBox="0 0 20 20"
                                                >
                                                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                              </div>
                                              <input
                                               disabled
                                                type="date"
                                                min={today}
                                                defaultValue={item?.valid_till ? item?.valid_till.split('T')[0] : ''} // Use split to extract the date part
                                                onChange={(e: any) => setValidTill(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Select date"
                                              />
                                            </div>

                                          </div>

                                          <div className='flex mt-3'>
                                            <div className="flex mx-2" role="button" onClick={() => setECT({ media: false, note: !ECT?.note })}>
                                              <EventNoteIcon />
                                              <p>Note</p>
                                            </div>
                                            <div className="flex mx-2" role="button" onClick={() => setECT({ note: false, media: !ECT?.media })}>
                                              <FilterIcon />
                                              <p>Media</p>
                                            </div>
                                          </div>

                                          {imgList?.length > 0 ? <div className='flex justify-center m-2'>
                                            {imgList?.map((item: any, index: any) => (<img src={item} alt="" className='w-[50px] h-[50px] m-2' />
                                            ))}

                                          </div> :
                                            <div className='flex justify-center m-2'>

                                              {/* Checking if item?.photo is an array and has a length greater than 0 */}
                                              {typeof item?.photo === 'string' && item?.photo.length > 0 && (
                                                (() => {
                                                  try {
                                                    const parsedPhotos = JSON.parse(item?.photo);

                                                    if (Array.isArray(parsedPhotos) && parsedPhotos.length > 0) {
                                                      return parsedPhotos.map((itemPhoto: any, index: any) => {
                                                        /* Ensure each itemPhoto is a valid URL string before rendering the image */
                                                        if (typeof itemPhoto === 'string') {
                                                          return (
                                                            <img
                                                              src={itemPhoto}
                                                              alt={`img-${index}`}
                                                              className='w-[50px] h-[50px] m-2'
                                                              key={index}
                                                            />
                                                          );
                                                        }
                                                        return null;
                                                      });
                                                    }
                                                  } catch (error) {
                                                    console.error("Error parsing item?.photo:", error);
                                                  }
                                                  return null;
                                                })()
                                              )}

                                            </div>}

                                          {ECT?.note && <>
                                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Discription</label>
                                            <textarea id="message" disabled rows={4} onChange={(e: any) => handleChange(e)} className="block p-2.5 w-full text-sm text-gray-900
                             bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
                              focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                              placeholder="Write your discription here...">{item?.description}</textarea>
                                          </>}

                                          {ECT?.media && <>
                                            <div className="flex items-center justify-center w-full">
                                              <label
                                                htmlFor="dropzone-file"
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-white hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                              >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                  <svg
                                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                  >
                                                    <path
                                                      stroke="currentColor"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                  </svg>
                                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                  </p>
                                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                  </p>
                                                </div>
                                                <input disabled id="dropzone-file" multiple type="file" className="hidden" onChange={(e: any) => UploadImgfile(e)} />
                                              </label>
                                            </div>

                                          </>}
                                        </div>

                                        <div className='!w-full flex justify-center mt-4'>
                                          {/* <Button className='mx-auto !text-white !bg-[#008000]' onClick={() => handlesave(item, ItemData, ItemTemp)}>Submit</Button> */}
                                        </div>
                                      </AccordionItemPanel>
                                    </AccordionItem>

                                  )) :
                                    <h3 className='text-center'>No Audit Available</h3>
                                  }
                                </Accordion>
                              </AccordionItemPanel>
                            </AccordionItem>

                          )) :
                            <h3 className='text-center'>No Audit Available</h3>
                          }
                        </Accordion>
                      </AccordionItemPanel>
                    </AccordionItem>

                  )) :
                    <h3 className='text-center'>No Audit Available</h3>
                  }
                </Accordion>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AuditDetails
