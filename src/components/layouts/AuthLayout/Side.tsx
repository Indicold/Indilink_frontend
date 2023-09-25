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
                className="col-span-3 bg-no-repeat bg-white py-6 px-16 flex-col justify-between hidden lg:flex"
                // style={{
                //     backgroundImage: `url('/img/images/authbanner.png')`,
                //     backgroundPosition:"center"
                // }}
            >
              <div className='bg-[#F3F4F6] rounded-lg px-[45px] py-[58px]'>
<section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5  items-center justify-center flex-col">
    {/* <img className="lg:w-2/6 mt-4 md:w-3/6 w-5/6 mb-4 object-cover object-center rounded-[3%] " alt="hero" src="./img/images/logimg.png" /> */}
    
    {/* <img className="lg:w-2/6 mt-4 md:w-3/6 !w-[75%] mb-4 object-cover object-center rounded-[3%] " alt="hero" src="./img/images/indicoldside.png" /> */}

    <div id="default-carousel" className="relative w-full" data-carousel="slide">
  {/* Carousel wrapper */}
  <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
    {/* Item 1 */}
    <div className="duration-700 ease-in-out" data-carousel-item="">
      <img
        src="./img/images/indicoldside.png"
        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        alt=""
      />
    </div>
    {/* Item 2 */}
    <div className="hidden duration-700 ease-in-out" data-carousel-item="">
      <img
        src="/img/images/authbanner.png"
        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        alt="..."
      />
    </div>
    {/* Item 3 */}
    <div className="hidden duration-700 ease-in-out" data-carousel-item="">
      <img
        src="./img/images/indicoldside.png"
        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        alt="..."
      />
    </div>
    {/* Item 4 */}
    <div className="hidden duration-700 ease-in-out" data-carousel-item="">
      <img
        src="./img/images/indicoldside.png"
        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        alt="..."
      />
    </div>
    {/* Item 5 */}
    <div className="hidden duration-700 ease-in-out" data-carousel-item="">
      <img
        src="./img/images/indicoldside.png"
        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        alt="..."
      />
    </div>
  </div>
</div>


    <div className="text-center w-full">
      <h6 className="title-color">What is Lorem Ipsum?</h6>
      <div className="flex justify-center">
      <p className='text-field'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
    </div>
  </div>
</section>
  {/* Slider indicators */}
  <div className="w-fit mx-auto mt-2 z-30 flex space-x-3 bottom-1 left-1/2">
    <button
      type="button"
      className="w-3 h-3 rounded-full bg-gray-400"
      aria-current="true"
      aria-label="Slide 1"
      data-carousel-slide-to={0}
    />
    <button
      type="button"
      className="w-3 h-3 rounded-full bg-gray-400"
      aria-current="false"
      aria-label="Slide 2"
      data-carousel-slide-to={1}
    />
    <button
      type="button"
      className="w-3 h-3 rounded-full bg-gray-400"
      aria-current="false"
      aria-label="Slide 3"
      data-carousel-slide-to={2}
    />
    <button
      type="button"
      className="w-3 h-3 rounded-full bg-gray-400"
      aria-current="false"
      aria-label="Slide 4"
      data-carousel-slide-to={3}
    />
    <button
      type="button"
      className="w-3 h-3 rounded-full bg-gray-400"
      aria-current="false"
      aria-label="Slide 5"
      data-carousel-slide-to={4}
    />
  </div>

</div>
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
