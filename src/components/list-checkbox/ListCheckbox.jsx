import React from 'react'
import './ListCheckbox.scss'

const ListCheckbox = ({ ...props }) => {

    const callback = {
        setSelectedCheck: (selected) => {
            if (props.selectedCheck.find(item => item === selected)) {
                props.setSelectedCheck([...props.selectedCheck.filter(item => item !== selected)])
            } else {
                props.setSelectedCheck([...props.selectedCheck, selected])
            }
        }
    }
    return (
        <div className='checkList'>
            {props.checkList.map((i) => {
                return (
                    <div className='checkList__item' key={i.id}>
                        <input type='checkbox' id={i.id} name={i.name} onChange={() => callback.setSelectedCheck(i.name)} />
                        <label htmlFor={i.id}>{i.name}</label>
                    </div>
                )
            })}
        </div>
    )
}

export default ListCheckbox