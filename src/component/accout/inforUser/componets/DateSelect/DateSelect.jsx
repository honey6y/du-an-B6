import { range } from 'lodash'
import React, { useEffect, useState } from 'react'
import style from './DateSelect.module.css'

export default function DateSelect({value, onChange, errorMessage}) {
    const [date, setDate] = useState({
        date: value?.getDate() || 1,
        month: value?.getMonth() || 0,
        year: value?.getFullYear() || 1990
    })

    useEffect(() => {
        if(value) {
            setDate({
                date: value.getDate(),
                month: value.getMonth(),
                year: value.getFullYear()
            })
        }
      },[value])
    const handleChange = (event) => {
        const { value: valueFromSelect, name} = event.target
        const newDate = {
            date: value?.getDate() || date.date,
            month: value?.getMonth() || date.month,
            year: value?.getFullYear() || date.year,
            [name]: Number(valueFromSelect)
        }
        setDate(newDate)
        onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
    }
  return (
    <div className={style.input_change_infor}>
        <div className={style.title_profile}>Ngày sinh</div>
        <div className={style.box_select}>
                <select className={style.select_profile} onChange={handleChange} name='date' value={value?.getDate() || date.date} autoComplete='on'>
                    <option disabled>Ngày</option>
                    {range(1, 32).map(item => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <select className={style.select_profile} onChange={handleChange} name="month" value={value?.getMonth() || date.month}>
                    <option disabled>Tháng</option>
                    {range(0, 12).map(item => (
                        <option value={item} key={item}>
                            {item + 1}
                        </option>
                    ))}
                </select>
                <select className={style.select_profile} onChange={handleChange} name="year" value={value?.getFullYear() || date.year}>
                    <option disabled>Năm</option>
                    {range(1990, 2024).map(item => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select>
        </div>
        <div className={style.date_error}>{errorMessage}</div>
    </div>
  )
}
