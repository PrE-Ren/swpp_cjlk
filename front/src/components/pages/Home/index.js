import React from 'react'

import { PageTemplate } from 'components'
import Left_sidebar from '../../molecules/Left_sidebar'
import Right_sidebar from '../../organisms/Right_sidebar'

const Home = () => {
  return (
    <div>
      <Left_sidebar />
      <Right_sidebar />
    </div>
  )
}

export default Home
