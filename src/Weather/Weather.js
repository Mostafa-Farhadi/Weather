import React from 'react'
import '../assets/css/style.css'

import Input from '../components/Input'
import Online from '../components/Online'
import Daily from '../components/Daily'
import Hourly from '../components/Hourly'

function Weather() {
    return (
        <div className="root">
            <Input />
            <Online />
            <Daily />
            <Hourly />
        </div>
    )
}

export default Weather
