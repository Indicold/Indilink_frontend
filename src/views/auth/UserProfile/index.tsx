import DownloadingIcon from '@mui/icons-material/Downloading';
import { NavLink, useNavigate } from 'react-router-dom';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
const UserProfilePage = () => {
    // const token:any=sessionStorage.getItem('access_token');
    // const decode=jwt_decode(token)
    // console.log("TTTTTTTTTT",decode);
    const navigate:any=useNavigate();
    const handleChangePassword=()=>{
        sessionStorage.clear()

        navigate('/forgot-password')

    }
  return (
    <>
    <div className="container mx-auto my-24">
      <div>
        <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-full xl:w-full mx-auto">
          <div className="flex justify-center">
            <img
              src="https://avatars0.githubusercontent.com/u/35900628?v=4"
              alt=""
              className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
            />
          </div>
          <div className="mt-16">
            <h1 className="font-bold text-center text-3xl text-gray-900">
            {/* {data && data?.email} */}
            </h1>
            <div className="my-5 px-6">
              <NavLink to='/basic-info'
                // href="/forgot-password"
                // onClick={handleChangePassword}
                className="text-white mx-auto w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3 indigo-btn "
              >
               Profile Details
              </NavLink>
            </div>
            <div className="my-5 px-6">
              <a
                // href="/forgot-password"
                onClick={handleChangePassword}
                className="text-white mx-auto w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3 indigo-btn "
              >
               Change Password
              </a>
            </div>
            <div className="my-5 px-6">
              <a
                href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/592212/Example-Mutual-Non-Disclosure-Agreement.pdf" target='_blank'
                className="border-dashed border-2 border-indigo-600 mx-auto w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3 "
              >
            <DownloadingIcon /> Download NDA
              </a>
            </div>
            <div className="my-5 px-6">
              <div role='button'
                className="border-dashed border-2 border-indigo-600  mx-auto w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3"
              >
                <label htmlFor="file">
                    <DriveFolderUploadIcon/>
            Upload NDA

                </label>
                <input type='file'  id='file' className='hidden'/>
              </div>
            </div>
        
            <div className="w-full">
              <h3 className="font-medium text-gray-900 text-left px-6">
                Recent activites
              </h3>
              <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                <a
                  href="#"
                  className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Updated his status
                  <span className="text-gray-500 text-xs">24 min ago</span>
                </a>
                <a
                  href="#"
                  className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Added new profile picture
                  <span className="text-gray-500 text-xs">42 min ago</span>
                </a>
                <a
                  href="#"
                  className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Posted new article in{" "}
                  <span className="font-bold">#Web Dev</span>
                  <span className="text-gray-500 text-xs">49 min ago</span>
                </a>
                <a
                  href="#"
                  className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Edited website settings
                  <span className="text-gray-500 text-xs">1 day ago</span>
                </a>
                <a
                  href="#"
                  className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 overflow-hidden"
                >
                  <img
                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Added new rank
                  <span className="text-gray-500 text-xs">5 days ago</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default UserProfilePage
