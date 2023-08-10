import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser,updateUser,removeUser } from '../redux/userSlice'
import Users from './Users'
import './Registeration.css'
const Registeration = () => {
    const[user,setUser]= useState({})
    const[address,setAddress]=useState([""])
    const[errors,setErrors]=useState({})
    const dispatch= useDispatch()
    const [isEditable,setIsEditable]=useState(false)
    const handleonchange=(name,value)=>{
        setUser({...user,[name]:value})
    }

    const validation=()=>{
        let isvalid=true
        let errors={
            name:"",
            date:"",
            pnumber:"",
            address:"",
            password:"",
            cpassword:""
        }
        if(!user.name){
            errors.name="Name cannot be empty"
            isvalid=false
        }else if(user.name.length>20){
            errors.name="Name cannot contains more than 20 characters"
            isvalid=false
        }//else if(/\d/.test(user.name) || /[^A-Za-Z\s]/.test(user.name)){
        //     errors.name="Name cannot contain digits and soecial chaaracters"
        //     isvalid=false
        // }

        if(!user.date){
            errors.date="Date cannot be empty"
            isvalid=false
        }else{
            let currentDate= new Date()
            console.log("userdate..........")
            console.log(currentDate.toLocaleDateString())
            if(new Date(user.date).toLocaleDateString()>currentDate.toLocaleDateString()){
                errors.date="selected date should not be greater than current date"
                isvalid=false
            }
        }

        if(!user.pnumber){
            errors.pnumber="phone number cannot be empty"
            isvalid=false
        }else if(parseInt(user.pnumber)>8 && parseInt(user.pnumber)<10){
            errors.pnumber="phone number should contain minimum 8 and maximum 10 characters"
            isvalid=false
        }else if(!/[0-9]/.test(user.pnumber)){
            errors.pnumber="phone number Not valid"
            isvalid=false
        }

        if(user?.password?.length<10){
            errors.password="Password must have 10 characters"
            isvalid=false
        }else if(!/[A-Z]/.test(user?.password) && !/[!@#$%^&*]/.test(user?.password)){
            errors.password="password must have one uppercase and one special character"
            isvalid=false
        }

        if(user?.password!==user?.cpassword){
            errors.cpassword="password not match"
            isvalid=false
        }
        console.log(errors)
        setErrors(errors)
        return isvalid
    }

    const handleOnChangeAddress=async (value,id)=>{
        await setAddress(address.map((item,_id)=>{
            if(_id===id)
                return {...item,value}
            else
                return item
        })
        )
        setUser({...user,"address":address})
    }

    const handleOnClick=async ()=>{
        await setAddress([...address,""])
        setUser({...user,"address":address})
    }

    const handleOnSubmitForm=()=>{
        const isvalid=validation()
        if(isvalid){
            dispatch(addUser(user))
            setUser({name:"",pnumber:"",date:"",address:[""],password:"",cpassword:""})
            setAddress([{value:""}])
        }
    }

    const handleOnEditUser=(value)=>{
        setIsEditable(!isEditable)        
        setUser(value)
        setAddress(value.address)
    }

    const handleOnUpdateUser=()=>{
        dispatch(updateUser(user))
        setUser({name:"",pnumber:"",date:"",address:[""],password:"",cpassword:""})
        setAddress([{value:""}])
        setIsEditable(!isEditable)
    }

    const handleOnRemoveUser=()=>{
        dispatch(removeUser(user))
    }

  return (
    <div>
        <div style={{display: 'flex',justifyContent: 'center'}}>
            <div style={{display: 'flex',justifyContent: 'center',border: '3px solid black',width: '34%',padding: '1rem'}}>
                <div style={{display: 'flex',flexDirection: 'column',width:'50%'}}>
                    Name: <input type='name' value={user.name} onChange={(e)=>{handleonchange('name',e.target.value)}} />
                    <div className='Error'>{errors.name}</div><br/>
                    DOB:<input type="date" value={user.date} onChange={(e)=>{handleonchange('date',e.target.value)}} />
                    <div className='Error'>{errors.date}</div><br/>
                    Phone Number:<input type="number" value={user.pnumber} onChange={(e)=>{handleonchange('pnumber',e.target.value)}} />
                    <div className='Error'>{errors.pnumber}</div><br/>
                    Address:
                    {          
                        address.map((item,id)=>{
                            return (<div key={id}><textarea type="text" value={item.value} onChange={(e)=>{handleOnChangeAddress(e.target.value,id)}} ></textarea><br/></div>)
                        })
                    }
                    <button onClick={handleOnClick}>Add</button>
                    <div className='Error'>{errors.address}</div><br/>
                    Password: <input type="password" value={user.password}
                    onChange={(e)=>{handleonchange('password',e.target.value)}}/>
                    <div className='Error'>{errors.password}</div><br/>
                    Confirm Password: <input type="password" value={user.cpassword}
                    onChange={(e)=>{handleonchange('cpassword',e.target.value)}} />
                    <div className='Error'>{errors.cpassword}</div><br/>
                    <button onClick={isEditable?handleOnUpdateUser:handleOnSubmitForm}>{isEditable?"update":"Submit"}</button>
                </div>
            </div>
        </div>
        <Users onEdit={(value)=>{handleOnEditUser(value)}} onDelete={()=>{handleOnRemoveUser()}}/>
    </div>
  )
}

export default Registeration