import React from 'react'
import type { CommonProps } from '@/@types/common'
import Loading from '@/components/shared/Loading'
import { useSelector } from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


interface SideProps extends CommonProps {
    content?: React.ReactNode
}
interface IntrinsicElements {
  div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  // Add more elements if needed (e.g., button, section, etc.)
}

const Side = ({ children, content, ...rest }: SideProps) => {
const AuthResponse=useSelector((state:any)=>state?.auth)    



    return (
        <div className="grid lg:grid-cols-6 w-full h-full">
            <div
                className="col-span-3 bg-no-repeat bg-white py-6 px-16 flex-col justify-between hidden lg:flex"
             
            >
        <Carousel   showArrows={!true}
  showStatus={!true}
  showThumbs={true}
  infiniteLoop={true}
  autoPlay={true}
  stopOnHover={true}>
                {[1,2,3,4].map((item:any,index:any)=>(
            <div className='bg-[#F3F4F6] rounded-lg px-[45px] py-10'>
            <section className="text-gray-600 body-font">
              <div className="container mx-auto flex px-5  items-center justify-center flex-col">
                
            
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
          
            
            </div>
            
                ))}
   
               
            </Carousel>
            </div>
            
            <div className="col-span-3 flex flex-col p-4 bg-white dark:bg-gray-800">
                <div className=" lg:p-10">
                   {AuthResponse?.apiLoginPostReducer?.loading ? (
                   <Loading loading={true} />
                   ) : (
                       <div className="">
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
