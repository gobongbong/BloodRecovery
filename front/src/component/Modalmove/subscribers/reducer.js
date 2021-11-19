import { ADD_PAGE } from "./action"
import React,{useEffect,useState} from "react";
const initialState={
    index:0,
    page: " "
}

function memory(key,data){
   // JSON.parse(window.localStorage.getItem(key)) 
   sessionStorage.setItem("lastbefore",sessionStorage.getItem("last"))
   if(data.indexOf('\"')===-1)//오류가 나지않으면
    sessionStorage.setItem("last", JSON.stringify(data))
  else
  sessionStorage.setItem("last", data)

}
const subcribersReducer =(state=initialState, action)=>{

    switch(action.type){
        case ADD_PAGE:
            memory(state.index+1,action.inputpage)
            return {
            ...state,
            index:state.index+1,
            page: (sessionStorage.getItem("last"))
            
            
            
        }

    default: return state
    }
}

export default subcribersReducer;