import React from 'react'
import { useSelector } from 'react-redux'


const Users = (props) => {
    const users=useSelector((state)=>{
        return state.userReducer.value
    })
    
  return (
    <table style={{    width: '100vw',margin: '1rem',border: '1px solid black'}}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Date</th>
                <th>Address</th>
            </tr>
        </thead>
        <tbody>
            {
                users?.map((item,id)=>{
                    return (<tr key={id}>
                        <td>{item.name}</td>
                        <td>{item.pnumber}</td>
                        <td>{item.date}</td>
                        <td>{item.address?.map((subItem,_id)=>{
                                return subItem.value+" "
                        })}</td>
                        <button onClick={()=>{props.onEdit(item)}}>Edit</button>
                        <button onClick={()=>{props.onDelete()}}>Delete</button>
                        </tr>)
                })
            }
        </tbody>
    </table>
  )
}

export default Users