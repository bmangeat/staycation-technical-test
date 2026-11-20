import React from 'react';

import Header from './Header'
import HotelPage from './HotelList';
import 'styles/app.scss'


const App = () => (
  <div className='app'>
    <Header />
    <div className='app__body'>
      <HotelPage />
    </div>
  </div>
)

export default App
