import React, { useEffect, useState } from 'react'

import 'styles/header.scss'

import StaycationLogo from './StaycationLogo'
import { useUser } from 'hooks/useUser'

const Header = () => {
  const { data, isLoading, isError } = useUser()
  return (
    <div className='header'>
      <StaycationLogo />
      {data && (
        <div className='header__user'>
                    Welcome, {data.firstName}!
        </div>
      )}
    </div>
  )
}

export default Header
