/* The code is importing three things: */
import Tags from '@/components/layouts/smallComponents/Tags'
import useApiFetch from '@/store/customeHook/useApiFetch'
import { messageView, messageViewNew } from '@/store/customeHook/validate'
import { apiUrl, getToken } from '@/store/token'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import AuditAssignListModal from '../../Audit/AuditAssignListModal'

/**
 * The `StoreDetails` function is a React component that displays details of a store, including an
 * image, contact information, and status.
 * @returns The component `StoreDetails` is returning JSX elements that make up the UI of the
 * component. It includes div containers, headings, images, and text elements.
 */
const StoreDetails = () => {
    const { id }: any = useParams() // Extracting endpoint of active URL to define payload for API call
    const { token }: any = getToken() // Extracting token info to define payload for API call
    const location: any = useLocation()
    const [assetDetails, setAssetsDetails] = useState<any>({})
    const [status, setStatus] = useState<any>('')
    const [modalList, setModalList] = useState<any>(false)
    let state: any = location?.state?.type
    console.log('yyyyyyy', state)

    const {
        data: fetchDetails,
        loading: fetchDetailsloading,
        error: fetchDetailsSerror,
    } = useApiFetch<any>(`partner/store/${id}`, token)
    const handleAccept = () => {
        var myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${token}`)

        var requestOptions: any = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow',
        }

        fetch(`${apiUrl}/customer/accept-responses/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result?.status === 200) {
                    setStatus('Approved')
                    messageViewNew({
                        message: 'Data Updated Successfully !',
                        status: 200,
                    })
                } else {
                    messageViewNew(result)
                }
            })
            .catch((error: any) => {
                messageViewNew(error)
            })
    }
    const handleReject = () => {
        var myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${token}`)

        var requestOptions: any = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow',
        }

        fetch(`${apiUrl}/customer/reject-responses/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result?.status === 200) {
                    setStatus('DisApproved')
                    messageViewNew({
                        message: 'Data Updated Successfully !',
                        status: 200,
                    })
                } else {
                    messageViewNew(result)
                }
            })
            .catch((error: any) => {
                messageViewNew(error)
            })
    }
    const partoneDetails = [
        {
            id: 1,
            titlePart1: 'Cold',
            titlePart2: 'Stoarage 1',
            imageUrl:
                'https://cdn.pixabay.com/photo/2014/08/08/20/54/laundry-413688_1280.jpg',
        },
        {
            id: 2,
            titlePart1: 'Cold',
            titlePart2: 'Stoarage 2',
            imageUrl:
                'https://img.freepik.com/premium-photo/caucasian-factory-worker-blue-lab-suit-with-tablet-hands-bend-manufacture-machine-check-readings-look-camera_645730-122.jpg?size=626&ext=jpg',
        },
        {
            id: 3,
            titlePart1: 'Cold',
            titlePart2: 'Stoarage 3',
            imageUrl:
                'https://img.freepik.com/free-photo/photo-automobile-production-line-welding-car-body-modern-car-assembly-plant-auto-industry_645730-133.jpg',
        },
        {
            id: 4,
            titlePart1: 'Cold',
            titlePart2: 'Stoarage 4',
            imageUrl:
                'https://img.freepik.com/free-photo/minsk-belarus-dec-15-2021-car-bodies-are-assembly-line-factory-production-cars-modern-automotive-industry-car-being-checked-before-being-painted-hightech-enterprise_645730-813.jpg?t=st=1707128866~exp=1707129466~hmac=d7475cb31502855d6c2cd852626cf926b3e8d1cff81cf09290adb7e0ba15c91f',
        },
        {
            id: 5,
            titlePart1: 'Cold',
            titlePart2: 'Stoarage 5',
            imageUrl:
                'https://img.freepik.com/premium-photo/industrial-surface_199107-110.jpg?size=626&ext=jpg',
        },
        {
            id: 6,
            titlePart1: 'Cold',
            titlePart2: 'Stoarage 6',
            imageUrl:
                'https://img.freepik.com/premium-photo/technologist-make-set-up-special-device-while-standing-department-dairy-factory_645730-45.jpg?size=626&ext=jpg',
        },
        {
            id: 7,
            titlePart1: 'Cold',
            titlePart2: 'Stoarage 7',
            imageUrl:
                'https://img.freepik.com/premium-photo/photo-automobile-production-line-welding-car-body-modern-car-assembly-plant-auto-industry_645730-115.jpg?size=626&ext=jpg',
        },
        {
            id: 8,
            titlePart1: 'Cold',
            titlePart2: 'Stoarage 8',
            imageUrl:
                'https://img.freepik.com/free-photo/industrial-worker-protective-uniform-operating-forklift-big-warehouse-distribution-center_342744-1497.jpg?size=626&ext=jpg',
        },
        {
            id: 9,
            titlePart1: 'Cold',
            titlePart2: 'Stoarage 9',
            imageUrl:
                'https://img.freepik.com/premium-photo/one-working-day-modern-automatic-bus-trolleybus-car-production-with-unfinished-cars-workers-protective-uniform-automotive-background-automobile-assembly-line-welding-arm_645730-44.jpg?size=626&ext=jpg',
        },
        {
            id: 10,
            titlePart1: 'Cold',
            titlePart2: 'Stoarage 10',
            imageUrl:
                'https://img.freepik.com/premium-photo/one-working-day-modern-automatic-bus-trolleybus-car-production-with-unfinished-cars-workers-protective-uniform-factory-background-automobile-assembly-line-welding-arm_645730-74.jpg?size=626&ext=jpg',
        },
    ]
    const storeTypeArray = [
        {
            id: 0,
            title: 'Asset Type',
            value: 'Store',
        },
        {
            id: 1,
            title: 'Address',
            value: assetDetails?.address || 'Not Available',
        },
        {
            id: 2,
            title: 'Total Tonnage',
            value: assetDetails?.total_tonnage || 'Not Available',
        },
        {
            id: 3,
            title: 'No Of Chamber',
            value: assetDetails?.no_of_chambers || 0,
        },
        {
            id: 4,
            title: 'Ante Room Area',
            value: assetDetails?.ante_room_area || 'Not Available',
        },
        {
            id: 5,
            title: 'Total Office Space',
            value: assetDetails?.total_office_space || 'Not Available',
        },
        {
            id: 6,
            title: 'Type of Dock',
            value: assetDetails?.type_of_dock_id || 'Not Available',
        },
        {
            id: 7,
            title: 'Processing Area',
            value: assetDetails?.processing_area || 'Not Available',
        },
        {
            id: 8,
            title: 'Parking Area',
            value: assetDetails?.parking_area || 0,
        },
        {
            id: 9,
            title: 'Installation Year',
            value: assetDetails?.installation_year || 'Not Available',
        },
        {
            id: 10,
            title: 'Facility Manager Name',
            value: assetDetails?.facility_manager_name || 'Not Available',
        },
        {
            id: 11,
            title: 'Facility Manager Contact',
            value: assetDetails?.facility_manager_contact || 'Not Available',
        },
    ]
    useEffect(() => {
        if (fetchDetails?.data?.store) {
            setAssetsDetails(fetchDetails?.data?.store)
        }
    }, [fetchDetails?.data?.store])
    return (
        <div>
            {modalList && <AuditAssignListModal setModal={setModalList} />}
            <div className="mb-4">
                <h5>
                    <b>Asset Details</b>
                </h5>

                {/* <p>Please add the Invoice</p> */}
            </div>

            <div className="p-4 rounded-lg mx-0 shadow-2xl">
                <h5>
                    <b className="flex">
                        Asset ID:{' '}
                        <h2 className="text-gray-400 text-lg">{id}</h2>
                    </b>
                </h5>

                <div className="lg:flex gap-4">
                    <div className="lg:w-[70%] mb-4 w-full">
                        <img
                            className="lg:h-[19rem] w-full rounded-lg"
                            src="https://img.freepik.com/free-photo/photo-automobile-production-line-welding-car-body-modern-car-assembly-plant-auto-industry-interior-hightech-factory-modern-production_645730-185.jpg?w=826&t=st=1707127221~exp=1707127821~hmac=5e1da4cbe40d01a7461d6e550faf689a1a76a9960d4536c0336fcf1dfb40573chttps://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                            alt=""
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:w-[40%] gap-4">
                        <div>
                            <img
                                className="h-auto lg:h-[9rem] w-full rounded-lg"
                                src="https://cdn.pixabay.com/photo/2014/09/13/21/46/milling-444493_1280.jpg"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                className="h-auto lg:h-[9rem] max-w-full rounded-lg"
                                src="https://img.freepik.com/free-photo/close-up-shot-screw-cutting-machine-factory-that-makes-metal-details_645730-81.jpg?t=st=1707106617~exp=1707107217~hmac=3d644d054bb6c63a71eed8e12b65d4d77d6b1acc620cb0c1a928d75366a41b1e"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                className="h-auto lg:h-[9rem] max-w-full rounded-lg"
                                src="https://img.freepik.com/free-photo/production-manufacture-sightseeing-excursion-interior-ceramic-tile-manufacturing-plant-ceramic-tile-manufacturing-plant-with-conveyer-belt_645730-195.jpg?t=st=1707106617~exp=1707107217~hmac=07fa02d138ae280c003f2edfe403dd8d33503dc6b01d575b57640b28e346ece8"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                className="h-auto lg:h-[9rem] max-w-full rounded-lg"
                                src="https://img.freepik.com/free-photo/car-bodies-are-assembly-line-factory-production-cars-modern-automotive-industry-car-being-checked-before-being-painted-hightech-enterprise_645730-801.jpg?t=st=1707106617~exp=1707107217~hmac=16ad15258b9de01b1113a937a1b686e36c1fcb89eba0cd48751822361de639f1"
                                alt=""
                            />
                        </div>
                    </div>
                </div>

                <div className="grid mt-10 gap-4 my-6 lg:grid-cols-4">
                    {storeTypeArray?.map((item: any, index: any) => {
                        return (
                            <div key={index} className="flex">
                                <div className="bg-green-50 mx-2">
                                    <AnnouncementIcon className="mx-2 my-2" />
                                </div>
                                <div>
                                    <p className="font font-semibold text-black">
                                        {item?.title}
                                    </p>
                                    <p>{item?.value}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="lg:w-[25%] w-[100%]">
                    {localStorage.getItem('user_type') === 'Customer' ? (
                        <div className="m-auto text-center">
                            {status && (
                                <div className="">
                                    <div className="w-[100%] pl-4  mb-4">
                                        <h2 className="text-sm">Status</h2>
                                        <h2 className="text-gray-400 text-sm">
                                            {status}
                                        </h2>
                                    </div>
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={handleAccept}
                                className="text-white w-full bg-[#103492] hover:bg-[#103492]/80 focus:ring-4 focus:outline-none focus:ring-[#103492]/50 font-medium rounded-lg text-sm px-14 m-auto py-2.5  dark:hover:bg-[#103492]/80 dark:focus:ring-[#103492]/40 "
                            >
                                Approved
                            </button>
                            <button
                                type="button"
                                onClick={handleReject}
                                className="text-white w-full bg-[#103492] hover:bg-[#103492]/80 focus:ring-4 focus:outline-none focus:ring-[#103492]/50 font-medium rounded-lg text-sm px-14 m-auto py-2.5  dark:hover:bg-[#103492]/80 dark:focus:ring-[#103492]/40 "
                            >
                                Disapproved
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setModalList(true)}
                            className="text-white w-full bg-[#103492] hover:bg-[#103492]/80 focus:ring-4 focus:outline-none focus:ring-[#103492]/50 font-medium rounded-lg text-sm px-14 m-auto py-2.5  dark:hover:bg-[#103492]/80 dark:focus:ring-[#103492]/40 "
                        >
                            Audit
                        </button>
                    )}
                </div>

                <div>

<h1 className='text-lg text-blue-800 my-10'>
    Facilities
</h1>


<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {partoneDetails.map((item: any, index: any) => {
                                return (
                                    <div key={index} className="relative">
                                        <img
                                            className="h-auto max-w-full rounded-lg"
                                            src={item?.imageUrl}
                                            alt=""
                                        />
                                        <div className="pl-4 pb-2 absolute font-bold  text-white bottom-0 left-0">
                                            <p className="backdrop-blur-[2px]">
                                                {item?.titlePart1}
                                            </p>

                                            <p className="backdrop-blur-[2px]">
                                                {item?.titlePart2}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

</div>

                <div className="p-4 bg-white rounded-lg mx-0">
                    <div className="ml-4">
                        <h1 className="text-lg text-blue-800 mt-10 mb-4">
                            Asset Rules
                        </h1>
                        <p className="font-light">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Eius unde cumque nisi dolorum atque quas
                            corporis, molestias maxime possimus officiis minima
                            natus sit quasi mollitia accusantium voluptatem fuga
                            blanditiis illum?
                        </p>
                    </div>
                    <div className="grid px-6 gap-4 grid-cols-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(
                            (item: any, index: any) => {
                                return (
                                    <div key={index} className="pt-6 ">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full">
                                            <AnnouncementIcon className="mx-3 my-3 " />
                                        </div>
                                        <div className="py-4">
                                            <p className="font font-semibold text-black">
                                                Asset Type
                                            </p>
                                            <p className="w-full font-light">
                                                Lorem ipsum dm quas cupas
                                                repellendus ea tenetur.
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreDetails
