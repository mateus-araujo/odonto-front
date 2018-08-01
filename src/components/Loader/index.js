import React from 'react'
import { RingLoader } from 'react-spinners'

import './styles.css'

const Loader = () => {
  return (
    <div className="Loading">
      <RingLoader
        color={'#007BFF'}
        loading={true}
        size={30}
      />
    </div>
  )
}

export default Loader