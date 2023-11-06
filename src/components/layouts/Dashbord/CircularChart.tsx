import React from 'react'
import "./style.css"
const CircularChart = () => {
  return (
    <>
      <div className="flex-wrapper flex">
  <div className="single-chart">
    <svg viewBox="0 0 36 36" className="circular-chart orange">
      <path
        className="circle-bg"
        d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        className="circle"
        strokeDasharray="30, 100"
        d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x={18} y="20.35" className="percentage">
        30%
      </text>
    </svg>
  </div>

</div>

    </>
  )
}

export default CircularChart
