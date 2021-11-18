import React ,{Link,Route}from "react";
import './Directed_card.css';
import BRONZE from "../../Img/Grade/4_bronze.png";
import SIVER from "../../Img/Grade/3_silver.png";
import GOLD from "../../Img/Grade/2_gold.png";
import VIP from "../../Img/Grade/1_vip.png";
import BLOODDROP from "../../Img/DirectedIMG/blood-drop.png";
import LOCATION from "../../Img/DirectedIMG/location.png";
import Directed_inquire from '../Directed/Directed_inquire';
import Directed_main from "../Directed/Directed_main";
import {connect} from 'react-redux'
import {addPage} from '../../component/Modalmove/subscribers/action'
const gradefunction=(Grade)=>{

    if(Grade===1) //BRONZE 예정
        return (<img className="Directed-img-userimg" src={BRONZE}></img>)
    else if(Grade===2) //SIVER 예정
        return (<img className="Directed-img-userimg" src={SIVER}></img>)
    else if(Grade===3) //GOLD 예정
        return (<img className="Directed-img-userimg" src={GOLD}></img>)
    else //레벨4 VIP
        return (<img className="Directed-img-userimg" src={VIP}></img>)

}
//날짜 T이후로 쪼개는거
const dividedate=(inputdate)=>{

    var redate="~ ";
    for(var i in inputdate)
    {   if(inputdate[i]=="T")break;

        redate = redate+ inputdate[i];
    }
    return redate;

}



const Directed_card=(getData)=>{
    // const sendValue=(text)=>{
    //     getData.getsetValue3(getData.getData.id);
    //     //그냥이렇게하면된다!!
    // } 
    //게시글조회
    function clickevent(){

        sessionStorage.setItem("directId",getData.getData.id)
        getData.addPage("지정헌혈조회")
    }
    
    return(
       
        <div className="Directed-recard-container" onClick={clickevent}>
            <div className="Directed-card-nav-container">
                <div className="Directed-card-nav-usericon-class">
                   {
                       gradefunction(getData.getData?.requesterLevel)
                     
                   }
                </div>
                <div className="Directed-card-nav-username-class">
                    <p>{getData.getData?.requesterNickname}</p>
                </div>
                <div className="Directed-card-nav-userstatus-container">
                    <div className="Directed-card-nav-userstatus-class">
                        <img src={BLOODDROP} className="Directed-card-nav-userstatus-icon"></img>
                        {/* {console.log(getData.getData?.completeStatus)} */}
          {getData.getData?.completeStatus===false?<p className="Directed-card-nav-userstatus-p-class">진행중</p>:<p>완료</p> }
                    </div>
                </div>
            </div>
            <div className="Directed-card-content-container">
            <p className="Directed-card-content-class">{getData.getData?.title}</p>
            </div>
            <div className="Directed-card-footer-container">
                <div className="Directed-card-footer-locaion-container">
                    <img src={LOCATION} className="Directed-card-footer-locationiconimg"></img>
                </div>
                <div className="Directed-card-footer-locationname">
                    <p className="Directed-card-footer-locationname-si">{getData.getData?.locationSido}</p>
                    <p className="Directed-card-footer-locationname-gu">{getData.getData?.locationSigungu}</p>
                </div>
                <div className="Directed-card-footer-bloodtype-container">
                    <div className="Directed-card-footer-bloodtype-class">
                        <p className="Directed-card-footer-bloodtype-p-class">
                            {getData.getData?.bloodType}
                        </p>
                    </div>
                </div>
                <div className="Directed-card-footer-date-container">
                    <div className="Directed-card-footer-date-class">
                        <p className="Directed-card-footer-date-p-class">
                            {dividedate(getData.getData?.periodTo)}
                        </p>
                    </div>
                    
                </div>
                
                {
                
                    //getData.getData[0]
                    //==="id"?console.log("ture"):console("false")
                    
                }
            
                
                
            </div>

        </div>
    )

}
const mapStateToProps=(state)=>{
    return{
        page:state.page
        
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        addPage: (text)=>dispatch(addPage(text))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Directed_card);