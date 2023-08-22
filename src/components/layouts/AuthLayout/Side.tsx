import React, { cloneElement, useEffect, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Logo from '@/components/template/Logo'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import Loading from '@/components/shared/Loading'
import { useSelector } from 'react-redux'

interface SideProps extends CommonProps {
    content?: React.ReactNode
}

const Side = ({ children, content, ...rest }: SideProps) => {
const AuthResponse=useSelector((state:any)=>state?.auth)    
console.log("GGGGGGG",AuthResponse?.apiLoginPostReducer?.loading);

    return (
        <div className="grid lg:grid-cols-6 w-full h-full">
            <div
                className="col-span-3 bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
                style={{
                    // backgroundImage: `url('/img/others/auth-side-bg.jpg')`,
                    backgroundColor:"#3f8cfec2"
                }}
            >
<section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5  items-center justify-center flex-col">
    <img className="lg:w-2/6 mt-4 md:w-3/6 w-5/6 mb-4 object-cover object-center rounded-[3%] shadow-[10px_10px_20px_rgba(240,_46,_170,_5)]" alt="hero" src="./img/images/logimg.png" />
    <div className="text-center w-full">
      <h6 className="title-font sm:text-lg text-lg mb-0 font-normal text-white">Lorem ipsum dolor sit</h6>
      <div className="flex justify-center">
      <img src="./img/images/scanerboy.png" className='w-[500px] mr-5' alt="" />
      </div>
    </div>
  </div>
</section>
            </div>
            <div className="col-span-3 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
            <div className="xl:min-w-[450px] px-8">
  {AuthResponse?.apiLoginPostReducer?.loading ? (
    <Loading loading={true} />
  ) : (
    <div className="mb-8">
      {content}
      {children
        ? React.cloneElement(children as React.ReactElement, {
            ...rest,
          })
        : null}
    </div>
  )}
</div>

            </div>
        </div>
    )
}

export default Side
