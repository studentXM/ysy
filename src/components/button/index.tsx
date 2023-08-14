import React from "react"
import { DatePicker } from 'antd';
import img from '../../../public/assets/1.jpg';

function Button() {
    const r = "123"
    console.log(r)
    return <div>
        <img src={img} alt="" />
        <DatePicker></DatePicker >
    </div>
}

export default Button    