import React from 'react'
import { ClipLoader } from 'react-spinners'

import './styles.css'

const Loader = ({ color }) => {
  return (
    <div className="Loading">
      <ClipLoader
        color={color || '#007BFF'}
        loading={true}
        size={30}
      />
    </div>
  )
}

export default Loader