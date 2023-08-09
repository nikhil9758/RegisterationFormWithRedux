import { createSlice } from '@reduxjs/toolkit'

const initialState={
    value:[]    
}

export const userSlice= createSlice({
    name:"userdata",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.value=[...state.value,action.payload]
        },
        updateUser:(state,action)=>{
            state.value=state.value.map((item,id)=>{
                 if(item.pnumber===action.payload.pnumber){
                    return action.payload
                 }else{     
                    return item
                 }
            })
        },
        removeUser:(state,action)=>{
            state.value=state.value.filter((item,id)=>{return item.pnumber!==action.payload.pnumber})
        }
    }
})

export const {addUser, updateUser,removeUser}= userSlice.actions

export default userSlice.reducer