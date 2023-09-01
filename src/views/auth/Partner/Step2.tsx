import { Button, FormContainer, FormItem, Input } from "@/components/ui"
import { Field, Form, Formik } from "formik"
import { useState } from "react"
import ChamberDetailModal from "./MultistepForm/ChamberDetailModal";
import RefrigerationDetailModal from "./MultistepForm/RefrigerationDetailModal";
import AirCoolingUnitDetailModal from "./MultistepForm/AirCoolingUnitDetailModal";
import CondensorDetailsModal from "./MultistepForm/CondensorDetailsModal";
import MHEDetailsModal from "./MultistepForm/MHEDetails";
import { getToken } from "@/store/customeHook/token";
import useApiFetch from "@/store/customeHook/useApiFetch";
interface Props {
    numChambers: number;
}
const Step2: React.FC<Props> = (props: any) => {
    
    const [modal, setModal] = useState<any>(false);
    const {token}:any=getToken();
    const { data, loading, error } = useApiFetch<any>('master/partner/store/type-of-docks', token);

    const [modalRef, setModalRef] = useState<any>(false);
    const [modalAir, setModalAir] = useState<any>(false);
    const [modalMHE, setModalMHE] = useState<any>(false);
    const [modalCondensor, setModalCondensor] = useState<any>(false);
    const [chamber, setChamber] = useState(1);
    const [MHE,setMHEValue]=useState('')
    const [formData, setFormData] = useState({
    });
    const [numChambers, setNumChambers] = useState<any>(0);

    const handlechange = (e: any) => {
        const newData: any = { ...formData };
        newData[e.target.name] = e.target.value;
        if (e.target.name === 'chambers') {
            setNumChambers(e.target.value);
        }
        setFormData(newData);
        console.log("HHHH", newData);

    }
    const handlechamber = (index: any) => {
        setChamber(index)
        setModal(true)
    }
    const handleMHE=(value:any)=>{
        setMHEValue(value);
        setModalMHE(true)
    }
    return (
        <div>
             <h4 className="text-center">Infra Details</h4>
            <Formik
                initialValues={{ field: true }}
                onSubmit={() => console.log("Submited via my onSubmit function")}

            >

                <Form className="partner-details-container">
                    <ChamberDetailModal modal={modal} setModal={setModal} chamber={chamber} />
                    <RefrigerationDetailModal modal={modalRef} setModal={setModalRef} />
                    <AirCoolingUnitDetailModal modal={modalAir} setModal={setModalAir} />
                    <CondensorDetailsModal modal={modalCondensor} setModal={setModalCondensor} />
                    <MHEDetailsModal modal={modalMHE} setModal={setModalMHE} MHE={MHE} />
                    <FormContainer>
                        <FormItem
                            label="Total area of facility (acres)"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="area"
                                onChange={(e: any) => handlechange(e)}
                                placeholder="Total area of facility (acres)"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Built up area (sqft)"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="barea"
                                onChange={(e: any) => handlechange(e)}
                                placeholder="Built up area (sqft)"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Total number of chambers"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"

                                placeholder="Total number of chambers"
                                value={numChambers}
                                onChange={(e: any) => handlechange(e)}
                                component={Input}
                            />
                        </FormItem>
                        {Array.apply(null, { length: numChambers }).map((val, index) => {
                            return (
                                <Button type="button" className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg' onClick={() => handlechamber(index + 1)}>
                                    {`Add Chamber details ${index + 1}`}
                                </Button>
                            )
                        })}
                        <FormItem
                            label="Total Ante-Chamber Area (sqft)"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Total_Ante-Chamber_Area_(sqft)"
                                onChange={(e: any) => handlechange(e)}
                                placeholder="Total Ante-Chamber Area (sqft)"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Ante-Chamber Temp  Range (°C)"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Ante-Chamber_Temp_Range"
                                onChange={(e: any) => handlechange(e)}
                                placeholder="Ante-Chamber Temp  Range (°C)"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Total No. of Docks"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Total_No_of_Docks"
                                onChange={(e: any) => handlechange(e)}
                                placeholder="Total No. of Docks"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Type of Docks"
                            className='mx-auto'
                        >
                          
  <select
    id="countries"
    name="Type_of_Docks"
    onChange={(e: any) => handlechange(e)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option selected>Choose a Docks</option>
    {/* {dat} */}
    {data && data?.data.map((item:any,index:any)=>(
    <option value={item?.type}>{item?.type}</option>

    )

    )}
  
  </select>
                        </FormItem>
                        <FormItem
                            label="Total Office Space (sqft.)"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Total_Office_Space"
                                onChange={(e: any) => handlechange(e)}
                                placeholder="Total Office Space (sqft.)"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Processing Area if Any (sqft.)"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Processing_Area_if_Any"
                                onChange={(e: any) => handlechange(e)}
                                placeholder="Processing Area if Any (sqft.)"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Total Parking Space available"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Total_Parking_Space_available"
                                onChange={(e: any) => handlechange(e)}
                                placeholder="Total Parking Space available"
                                component={Input}
                            />
                        </FormItem>
                        <h4 className="mb-2 text-head-title">REFRIGERATION SYSTEM DETAILS</h4>
                        <div className="flex ">
                            <Button
                                type="button"
                                block
                                variant="solid"
                                className='w-[40%] indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                                onClick={() => setModalRef(true)}
                            >
                                Refrigeration Details
                            </Button>
                            <Button
                                type="button"
                                block
                                variant="solid"
                                className='w-[40%] indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                                onClick={() => setModalAir(true)}
                            >
                                Air Cooling Unit Details
                            </Button>
                            <Button
                                type="button"
                                block
                                variant="solid"
                                className='w-[40%] indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                                onClick={() => setModalCondensor(true)}
                            >
                                Condensor Details
                            </Button>
                        </div>
                        <h3>Other Equipment Details</h3>

                        <h4>Data Logger Details</h4>

                        <FormItem

                            label="Data Logger Make"

                            className='mx-auto'

                        >

                            <Field

                                type="text"

                                autoComplete="off"

                                name="chambers"

                                placeholder="Data Logger Make"

                                component={Input}

                            />

                        </FormItem>

                        <FormItem

                            label="Internet enabled"

                            className='mx-auto'

                        >

<select
    id="ttt"
    name="internet_enabled"
    onChange={(e: any) => handlechange(e)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option selected value="YES">yes</option>
    <option  value="NO">No</option>
  
  
  </select>
             

                        </FormItem>

                        <h4>Power Backup Details</h4>

                        <FormItem

                            label="Genset make"

                            className='mx-auto'

                        >

                            <Field

                                type="text"

                                autoComplete="off"

                                name="chambers"

                                placeholder="Genset make"

                                component={Input}

                            />

                        </FormItem>

                        <FormItem

                            label="Genset AMC Company"

                            className='mx-auto'

                        >

                            <Field

                                type="text"

                                autoComplete="off"

                                name="chambers"

                                placeholder="Genset AMC Company"

                                component={Input}

                            />

                        </FormItem>

                        <FormItem

                            label="Genset capacity"

                            className='mx-auto'

                        >

                            <Field

                                type="text"

                                autoComplete="off"

                                name="chambers"

                                placeholder="Genset capacity"

                                component={Input}

                            />

                        </FormItem>

                        <FormItem

                            label="Genset AMC"

                            className='mx-auto'

                        >

<select
    id="ttt"
    name="genset_AMC"
    onChange={(e: any) => handlechange(e)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option selected value="YES">yes</option>
    <option  value="NO">No</option>
  
  
  </select>

                        </FormItem>

                        <h4>MHE Details</h4>

                        {/* Modal */}
                        <div className="flex ">
                        <Button
                        type="button"
                            block
                            variant="solid"
                            className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                           onClick={()=>handleMHE('reach-truck')}
                        >
                      Reach Truck
                        </Button>
                        <Button
                         type="button"
                            block
                            variant="solid"
                            onClick={()=>handleMHE('handle-pallet')}
                            className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                        >
                        Handle Pallet
                        </Button>
                        <Button
                         type="button"
                            block
                            onClick={()=>handleMHE('fork-lift')}
                            variant="solid"
                            className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                        >
                        Fork Lift
                        </Button>
                        </div>
                        

                        <h3>Other Infrastructure Details</h3>

                        <FormItem

                            label="Vehicle Parking Area"

                            className='mx-auto'

                        >

                            <Field

                                type="text"

                                autoComplete="off"

                                name="chambers"

                                placeholder="Vehicle Parking Area"

                                component={Input}

                            />

                        </FormItem>

                        <FormItem

                            label="Truck Parking Area"

                            className='mx-auto'

                        >

                            <Field

                                type="text"

                                autoComplete="off"

                                name="chambers"

                                placeholder="Truck Parking Area"

                                component={Input}

                            />

                        </FormItem>

                        <FormItem

                            label="Office space"

                            className='mx-auto'

                        >

                            <Field

                                type="text"

                                autoComplete="off"

                                name="chambers"

                                placeholder="Office space"

                                component={Input}

                            />

                        </FormItem>

                        <FormItem

                            label="Computer Workstation"

                            className='mx-auto'

                        >

                            <Field

                                type="text"

                                autoComplete="off"

                                name="chambers"

                                placeholder="Computer Workstation"

                                component={Input}

                            />

                        </FormItem>

                        <FormItem

                            label="Internet"

                            className='mx-auto'

                        >

<select
    id="ttt"
    name="internet"
    onChange={(e: any) => handlechange(e)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option selected value="YES">yes</option>
    <option  value="NO">No</option>
  
  
  </select>

                        </FormItem>

                        <FormItem

                            label="Wifi"

                            className='mx-auto'

                        >

<select
    id="ttt"
    name="wifi"
    onChange={(e: any) => handlechange(e)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option selected value="YES">yes</option>
    <option  value="NO">No</option>
  
  
  </select>

                        </FormItem>

                        <FormItem

                            label="Printer"

                            className='mx-auto'

                        >

<select
    id="ttt"
    name="printer"
    onChange={(e: any) => handlechange(e)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option selected value="YES">yes</option>
    <option  value="NO">No</option>
  
  
  </select>

                        </FormItem>

                        <FormItem

                            label="Printer Type"

                            className='mx-auto'

                        >

<select
    id="ttt"
    name="printer_type"
    onChange={(e: any) => handlechange(e)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option selected value="Inkjet">Inkjet</option>
    <option  value="Laser">Laser</option>
  
  
  </select>

                        </FormItem>

                        <FormItem

                            label="Security Guard"

                            className='mx-auto'

                        >

<select
    id="ttt"
    name="security_guard"
    onChange={(e: any) => handlechange(e)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option selected value="YES">Yes</option>
    <option  value="NO">No</option>
  
  
  </select>
                        </FormItem>

                        <FormItem

                            label="CCTV"

                            className='mx-auto'

                        >

<select
    id="ttt"
    name="cctv"
    onChange={(e: any) => handlechange(e)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option selected value="YES">Yes</option>
    <option  value="NO">No</option>
  
  
  </select>

                        </FormItem>

                        <FormItem

                            label="Driver area for food and resting"

                            className='mx-auto'

                        >

                            <Field

                                type="text"

                                autoComplete="off"

                                name="chambers"

                                placeholder="Driver area for food and resting"

                                component={Input}

                            />

                        </FormItem>

                        <FormItem

                            label="Nearby Weighbridge"

                            className='mx-auto'

                        >

                            <Field

                                type="text"

                                autoComplete="off"

                                name="chambers"

                                placeholder="Nearby Weighbridge"

                                component={Input}

                            />

                        </FormItem>

                        <FormItem

                            label="Wall/ Ceiling condition"

                            className='mx-auto'

                        >

                            <Field

                                type="text"

                                autoComplete="off"

                                name="chambers"

                                placeholder="Wall/ Ceiling condition"

                                component={Input}

                            />

                        </FormItem>

                        <FormItem

                            label="Road condition from Main Road to Cold Storage"

                            className='mx-auto'

                        >

                            <Field

                                type="text"

                                autoComplete="off"

                                name="chambers"

                                placeholder="Road condition from main road to cold storage"

                                component={Input}

                            />

                        </FormItem>

                        {/* <MHEDetailsModal /> */}
                    </FormContainer>
                </Form>
            </Formik>
        </div>
    )
}

export default Step2;