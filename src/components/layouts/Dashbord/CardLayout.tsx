import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Chart from "react-apexcharts";
// import GeoChart from './GeoBubbleMap';
import CircularChart from './CircularChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ForumIcon from '@mui/icons-material/Forum';
// import GeoMapChart from './DashboardPartner/GeoMapChart';

import GoogleMapComp from './DashboardPartner/GoogleMapCom';
import { locations } from '@/store/customeHook/validate';
const CardLayout = ({ title }: any) => {
  const options: any = {
    series: [{
      data: [21, 22, 10, 28, 16, 21, 13, 30]
    }],
    chart: {
      height: 450,
      type: 'bar',

    },
    // colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '25%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [
        ['John', 'Doe'],
        ['Joe', 'Smith'],
        ['Jake', 'Williams'],
        'Amber',
        ['Peter', 'Brown'],
        ['Mary', 'Evans'],
        ['David', 'Wilson'],
        ['Lily', 'Roberts'],
      ],
      labels: {
        style: {
          // colors: colors,
          fontSize: '12px'
        }
      }
    }
  };

  const series: any = [
    {
      name: 'Actual',
      data: [
        {
          x: '2011',
          y: 1292,
          goals: [
            {
              name: 'Expected',
              value: 1400,
              strokeHeight: 5,
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: '2012',
          y: 4432,
          goals: [
            {
              name: 'Expected',
              value: 5400,
              strokeHeight: 5,
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: '2013',
          y: 5423,
          goals: [
            {
              name: 'Expected',
              value: 5200,
              strokeHeight: 5,
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: '2014',
          y: 6653,
          goals: [
            {
              name: 'Expected',
              value: 6500,
              strokeHeight: 5,
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: '2015',
          y: 8133,
          goals: [
            {
              name: 'Expected',
              value: 6600,
              strokeHeight: 13,
              strokeWidth: 0,
              strokeLineCap: 'round',
              strokeColor: '#775DD0'
            }
          ]
        },

      ]
    }
  ]
  const dataList: any = [
    {
      title: "Anlytics",
      list: []
    },
    {
      title: "Audit",
      list: []
    },
    {
      title: "Compliance",
      list: []
    }
  ]

  return (
    <>
      <div className='bg-white p-4 rounded-lg mx-0'>
        <div className="w-full flex justify-between">
          <h2 className="text-start">{title}</h2>
        </div>
        <section className="grid gap-6 my-6 md:grid-cols-3">
          {['Assets Registered This Week', 'No of Total Store Assets', 'Revenue Generating Assets'].map((item: any, index: any) => (
            <div className="p-6 bg-white shadow rounded-0" key={index}>
              <dl className="space-y-2">
                <dt className="text-bold font-medium text-gray-500">{item} </dt>
                <dd className="text-bold font-light md:text-4xl flex justify-between items-center"><h2>24</h2>
                  <AssessmentIcon sx={{ color: "orange", fontSize: "56px" }} />
                </dd>

                <dd className="flex items-center space-x-1 text-sm font-medium text-green-500">
                  <span>32.4%</span>
                  <TrendingUpIcon />
                </dd>
              </dl>
            </div>
          ))}



        </section>
        <div className='flex grid gap-6 my-6 md:grid-cols-3'>
          {dataList?.map((item: any, index: any) => (
            <section className="grid gap-6 my-6 shadow rounded-2xl bg-white">
              <h3 className='ml-4 mt-4'>{item?.title}</h3>
              <div className="p-6   flex flex-col" >
                {[1, 2, 3]?.map((item: any, index: any) => (
                  <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">

                    <div className="flex-auto">
                      <div className="flex flex-wrap -mx-3">
                        {/* <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
         <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
           <i
             className="ni ni-money-coins text-lg relative top-3.5 text-white"
             aria-hidden="true"
           />
         </div>
       </div> */}
                        <div className="grid grid-cols-2 my-auto gap-2 w-full px-3">
                          <div className='my-auto'>
                            <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                              Today's Money
                            </p>
                            <h5 className="mb-0 font-bold">
                              $53,000
                              <span className="leading-normal text-sm font-weight-bolder text-lime-500">
                                +55%
                              </span>
                            </h5>

                          </div>
                          <CircularChart />

                          {/* <Chart options={optionsProgress} series={optionsProgress.series} type={optionsProgress.chart.type} height={optionsProgress.chart.height} /> */}
                        </div>

                      </div>
                    </div>
                  </div>
                ))}



              </div>



            </section>
          ))}




        </div>

        <div className='lg:flex justify-around'>
          <section className="grid gap-6 my-6 w-[100%] lg:w-[60%]">
            <div className="p-6 bg-white shadow rounded-2xl" >
              <h3 className=''>Payables</h3>
              <div className='flex justify-around pt-4 items-center'>
                <div>
                  <h5>69%</h5>
                  <p>from pre. month</p>
                </div>
                <div>
                  <h5>6989K</h5>
                  <p>Impressions</p>
                </div>
                <div>
                  <h5>6978</h5>
                  <p>Reach</p>
                </div>
                <div>
                  <h5>6.9%</h5>
                  <p>growth</p>
                </div>
              </div>
              <Chart options={options} series={series} type="bar" height={300} />

            </div>



          </section>
          <section className="grid gap-6 my-6 w-[100%] lg:w-[35%] shadow rounded-2xl">
            <h3 className='ml-4 mt-4 mb-0'>Audit List</h3>

            <div className="p-6 pt-0  flex flex-col">
              {[1, 2, 3, 4]?.map((item: any, index: any) => (
                <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap ">
                      <div className="w-4/12 max-w-full px-6 ml-auto text-right flex-0">
                        <div className="inline-block w-12 h-12 text-center rounded-lg  shadow-soft-2xl">
                          <ForumIcon sx={{ color: "orange", fontSize: "56px" }} />
                        </div>
                      </div>
                      <div className="flex-none w-2/3 max-w-full px-3">
                        <div>
                          <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                            Today's Money
                          </p>
                          <h5 className="mb-0 font-bold">
                            $53,000
                            <span className="leading-normal text-sm font-weight-bolder text-lime-500">
                              +55%
                            </span>
                          </h5>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}



            </div>



          </section>

        </div>





        <div className=' rounded-2xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'>
             {/* <GeoMapChart /> */}
             {locations?.length>0 && <GoogleMapComp locations={locations} />}
        </div>
        {/* <GeoChart /> */}
      </div>
    </>
  )
}

export default CardLayout
