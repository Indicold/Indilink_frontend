import DownloadingIcon from '@mui/icons-material/Downloading';
import { NavLink, useNavigate } from 'react-router-dom';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { TokenInfo } from '@/store/customeHook/token';
import { apiUrl, getToken } from '@/store/token';
import { messageView } from '@/store/customeHook/validate';
const UserProfilePage = () => {
  const {token}:any=getToken()
  const {owner_user_id,is_nda_signed}:any=TokenInfo();
    // const token:any=localStorage.getItem('access_token');
    // const decode=jwt_decode(token)
    const navigate:any=useNavigate();
    const handleChangePassword=()=>{
        localStorage.clear()

        navigate('/forgot-password')

    }
    const handleUploadNda=(e:any)=>{
      var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var formdata = new FormData();
formdata.append("nda_doc", e?.target?.files[0]);

var requestOptions :any= {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${apiUrl}/auth/upload-nda`, requestOptions)
  .then(response => response.json())
  .then(result =>{
    messageView(result?.message)
  })
  .catch(error =>{
    messageView(error?.message || error?.error)
  });
    }
  return (
    <>
    <div className="container mt-20">
      <div>
        <div className="bg-white pt-4 relative shadow rounded-lg w-[100%] xl:w-full mx-auto">
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
          {owner_user_id ===0  && <div className="my-5 px-6">
              <NavLink to='/basic-info'
                // href="/forgot-password"
                // onClick={handleChangePassword}
                className="text-white mx-auto w-[100%] lg:w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3 indigo-btn "
              >
               Profile Details
              </NavLink>
            </div>}
            <div className="my-5 px-6">
              <a
                // href="/forgot-password"
                onClick={handleChangePassword}
                className="text-white mx-auto w-[100%] lg:w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3 indigo-btn "
              >
               Change Password
              </a>
            </div>
        {is_nda_signed !==1 &&    <>
          {owner_user_id ===0  &&  <div className="my-5 px-6 ">
              <a
                href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/592212/Example-Mutual-Non-Disclosure-Agreement.pdf" target='_blank'
                className="border-dashed border-2 border-indigo-600 mx-auto w-[100%] lg:w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3 "
              >
            <DownloadingIcon /> Download NDA
              </a>
            </div>}
          {owner_user_id ===0  &&  <div className="my-5 px-6">
              <div role='button'
                className="border-dashed border-2 border-indigo-600  mx-auto w-[100%] lg:w-[30%] block rounded-lg text-center font-medium leading-6 px-6 py-3"
              >
                <label htmlFor="file">
                    <DriveFolderUploadIcon/>
            Upload NDA

                </label>
                <input type='file'  id='file' className='hidden' onChange={(e:any)=>handleUploadNda(e)}/>
              </div>
            </div>}
        </>}
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
