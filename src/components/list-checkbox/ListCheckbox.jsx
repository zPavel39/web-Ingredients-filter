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
    /* console.log('check', props.selectedCheck) */

    return (
        <div className='checkList'>
            {props.searchSelectedList.length === 0 && props.searchInput.length > 0 ?
                <div className='checkList__noSearch'>
                    <span className='checkList__noSearch_title'>Ингредиент не найден</span>
                </div>
                :
                props.searchSelectedList.length > 0 ?
                    <div className='checkList__search'>
                        {props.searchSelectedList.map((i) => {
                            return (
                                <div className='checkList__itemSearch' key={i.id}>
                                    <input
                                        type='checkbox'
                                        id={i.id}
                                        name={`${i.name}-${i.id}`}
                                        onChange={() => callback.setSelectedCheck(i.name)}
                                        checked={props.selectedCheck.filter(item => item == i.name) == i.name ? true : false} />
                                    <label htmlFor={`${i.name}-${i.id}`}>{i.name}</label>
                                </div>
                            )
                        })}
                    </div>
                    :
                    <div className='checkList__itemBlock'>
                        {
                            props.selectedList.map((i) => {
                                return (
                                    <div className='checkList__item' key={i.id}>
                                        <input
                                            type='checkbox'
                                            id={`${i.name}-${i.id}`}
                                            name={i.name}
                                            onChange={() => callback.setSelectedCheck(i.name)}
                                            checked={props.selectedCheck.filter(item => item == i.name) == i.name ? true : false} />
                                        <label htmlFor={`${i.name}-${i.id}`}>{i.name}</label>
                                    </div>
                                )
                            })}
                    </div>
            }
        </div>
    )
}

export default ListCheckbox