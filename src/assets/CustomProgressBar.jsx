import React from 'react'

const CustomProgressBar = ({ value = 0 }) => (
  <div style={{ background: '#e5e7eb', borderRadius: 8, width: '100%', height: 8 }}>
    <div style={{ width: `${value}%`, height: '100%', background: '#3563E9', borderRadius: 8 }} />
  </div>
)

export default CustomProgressBar
