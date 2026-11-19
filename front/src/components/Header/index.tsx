import React, { useEffect, useState } from 'react'

import 'styles/header.scss'

import StaycationLogo from './StaycationLogo'
import { GetUserResponse } from 'types/user'

const Header = () => {
  const [user, setUser] = useState<GetUserResponse | undefined>(undefined)

  useEffect(() => {
    fetch('http://localhost:9000/users/1')
      .then(async res => {
        const result = await res.json()
        setUser(result)
      })
      .catch(e => console.warn('Error: ', e))
  }, [])

  return (
    <div className='header'>
      <StaycationLogo />
      {user && (
        <div className='header__user'>
                    Welcome, {user.firstName}!
        </div>
      )}
    </div>
  )
}

export default Header
