import DownloadingIcon from '@mui/icons-material/Downloading'
import { NavLink, useNavigate } from 'react-router-dom'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import { TokenInfo } from '@/store/customeHook/token'
import { apiUrl, getToken } from '@/store/token'
import { messageView, messageViewNew } from '@/store/customeHook/validate'
import { SiReadthedocs } from 'react-icons/si'
import useApiFetch from '@/store/customeHook/useApiFetch'

const UserProfilePage = () => {
    const { token }: any = getToken()
    const { owner_user_id, is_nda_signed }: any = TokenInfo()
    const { data: GetNdaStatusData }: any = useApiFetch(
        `auth/get_user_nda_status`,
        token
    )
    const navigate: any = useNavigate()
    const handleChangePassword = () => {
        localStorage.clear()

        navigate('/forgot-password')
    }

    const handleUploadNda = (e: any) => {
        var myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${token}`)

        var formdata = new FormData()
        formdata.append('nda_doc', e?.target?.files[0])

        var requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        }

        fetch(`${apiUrl}/auth/upload-nda`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                messageViewNew(result)
            })
            .catch((error) => {
                messageViewNew(error)
            })
    }
    const ProfileData: any = GetNdaStatusData?.data[0]
    console.log('gytuyt', GetNdaStatusData, ProfileData)

    return (
        <>
            <div className="container mt-20">
                <div>
                    <div className="bg-white pt-4 relative shadow rounded-lg w-[100%] xl:w-full mx-auto  shadow-2xl">
                        <div className="flex justify-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                                alt=""
                                className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                            />
                        </div>
                        <div className="mt-16 pb-16">
                            <h1 className="font-bold text-center text-3xl text-gray-900">
                                {/* {data && data?.email} */}
                            </h1>
                            {(owner_user_id === 'USER0' ||
                                owner_user_id === '0') && (
                                <div className="my-5 px-6">
                                    <NavLink
                                        to="/basic-info"
                                        // href="/forgot-password"
                                        // onClick={handleChangePassword}
                                        className="text-white mx-auto w-[100%] lg:w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-[#103492]"
                                    >
                                        Profile Details
                                    </NavLink>
                                </div>
                            )}
                            <div className="my-5 px-6">
                                <a
                                    // href="/forgot-password"
                                    role="button"
                                    onClick={handleChangePassword}
                                    className="text-white mx-auto w-[100%] lg:w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-[#103492]"
                                >
                                    Change Password
                                </a>
                            </div>
                            {ProfileData?.is_nda_signed == 0 &&
                            !ProfileData?.nda_doc ? (
                                <>
                                    {(owner_user_id === 'USER0' ||
                                        owner_user_id === '0') && (
                                        <div className="my-5 px-6 ">
                                            <a
                                                href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/592212/Example-Mutual-Non-Disclosure-Agreement.pdf"
                                                target="_blank"
                                                className="border-dashed border-2 border-[#103492] mx-auto w-[100%] lg:w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3 text-[#103492]"
                                            >
                                                <DownloadingIcon /> Download NDA
                                            </a>
                                        </div>
                                    )}
                                    {(owner_user_id === 'USER0' ||
                                        owner_user_id === '0') && (
                                        <div className="my-5 px-6">
                                            <div
                                                role="button"
                                                className="border-dashed border-2 border-indigo-600  mx-auto w-[100%] lg:w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3 text-[#103492]"
                                            >
                                                <label htmlFor="file">
                                                    <DriveFolderUploadIcon />
                                                    Upload NDA
                                                </label>
                                                <input
                                                    type="file"
                                                    id="file"
                                                    className="hidden"
                                                    onChange={(e: any) =>
                                                        handleUploadNda(e)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : ProfileData?.is_nda_signed == 1 ? (
                                <>
                                    <ul
                                        role="list"
                                        className="mx-auto max-w-sm divide-y divide-gray-200 dark:divide-gray-700"
                                    >
                                        <li className="py-3 sm:py-4 flex">
                                            <button
                                                type="button"
                                                className="mx-auto relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                <SiReadthedocs />
                                                NDA Agreement
                                                <div className="absolute inline-flex items-center justify-center w-auto p-2  h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-8  dark:border-gray-900">
                                                    Pending For Approval
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                </>
                            ) : ProfileData?.is_nda_signed == 2 ? (
                                <>
                                    <ul
                                        role="list"
                                        className="mx-auto max-w-sm divide-y divide-gray-200 dark:divide-gray-700"
                                    >
                                        <li className="py-3 sm:py-4 flex">
                                            <button
                                                type="button"
                                                className="mx-auto relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                <SiReadthedocs />
                                                NDA Agreement
                                                <div className="absolute inline-flex items-center justify-center w-auto p-2  h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-8  dark:border-gray-900">
                                                    Approved
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                </>
                            ) : ProfileData?.is_nda_signed == 3 ? (
                                <>
                                    <>
                                        {(owner_user_id === 'USER0' ||
                                            owner_user_id === '0') && (
                                            <div className="my-5 px-6 ">
                                                <a
                                                    href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/592212/Example-Mutual-Non-Disclosure-Agreement.pdf"
                                                    target="_blank"
                                                    className="border-dashed border-2 border-[#103492] mx-auto w-[100%] lg:w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3 text-[#103492]"
                                                >
                                                    <DownloadingIcon /> Download
                                                    NDA
                                                </a>
                                            </div>
                                        )}
                                        {(owner_user_id === 'USER0' ||
                                            owner_user_id === '0') && (
                                            <div className="my-5 px-6">
                                                <div
                                                    role="button"
                                                    className="border-dashed border-2 border-indigo-600  mx-auto w-[100%] lg:w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3 text-[#103492]"
                                                >
                                                    <label htmlFor="file">
                                                        <DriveFolderUploadIcon />
                                                        Upload NDA
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        className="hidden"
                                                        onChange={(e: any) =>
                                                            handleUploadNda(e)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </>
                                    <ul
                                        role="list"
                                        className="mx-auto max-w-sm divide-y divide-gray-200 dark:divide-gray-700"
                                    >
                                        <li className="py-3 sm:py-4 flex">
                                            <button
                                                type="button"
                                                className="mx-auto relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                <SiReadthedocs />
                                                NDA Agreement
                                                <div className="absolute inline-flex items-center justify-center w-auto p-2  h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-8  dark:border-gray-900">
                                                    Rejected
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <ul
                                        role="list"
                                        className="mx-auto max-w-sm divide-y divide-gray-200 dark:divide-gray-700"
                                    >
                                        <li className="py-3 sm:py-4 flex">
                                            <button
                                                type="button"
                                                className="mx-auto relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                <SiReadthedocs />
                                                NDA Agreement
                                                <div className="absolute inline-flex items-center justify-center w-auto p-2  h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-8  dark:border-gray-900">
                                                    Pending
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfilePage
