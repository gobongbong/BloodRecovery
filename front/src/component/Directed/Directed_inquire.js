import React,{useEffect, useState} from "react";
import { withRouter } from "react-router";
import Menu_left_nav from '../Common/Header/Menu_left_nav';
import DIRECTEDIMG from '../../Img/DIRECTEDIMG.png';
import GOBACKBTN from '../../Img/DirectedIMG/arrow.png';
import Common_Button_IMG from "../Common/Button/Common_Button_IMG";
import DIRECTED_BUTTON_IMG from "../../Img/DirectedIMG/DIRECTEDIMGWHITE.png";
import BLOODDROPIMG from "../../Img/DirectedIMG/blood-drop.png";
import BRONZE from "../../Img/Grade/4_bronze.png";
import SIVER from "../../Img/Grade/3_silver.png";
import GOLD from "../../Img/Grade/2_gold.png";
import VIP from "../../Img/Grade/1_vip.png";
import axios from "axios";
import './Directed_inquire.css';


const Directed_inquire = (id) => {
const [getData,setGetData]=useState();
    const sendValue = () => {
        id.getsetValue3()

    }
    useEffect(() => {
        axios
            .get("http://ec2-18-219-208-124.us-east-2.compute.amazonaws.com:8000/direct/directedItem/"+id.id)
       
            .then(function(response){
                
                setGetData(response); 
                console.log("response",response)
        
            });
        
    }, []);
    
    const writeStatue=(status)=>
    {
        if(status===false)
        return "진행중";
        else return "완료"


    }
    const dividedate=(inputdate)=>{

        var redate="";
        for(var i in inputdate)
        {   if(inputdate[i]=="T")break;
    
            redate = redate+ inputdate[i];
        }
        return redate;
    
    }
    const levelIMG=(level)=>{

        if(level===1) return BRONZE;
        else if(level===2) return SIVER;
        else if(level===3) return GOLD;
        else if(level===4) return VIP;
    }

    return (


        <div className="Directed-inquire-container">
            <div className="Directed-inquire-nav-container">
                <div className="Directed-inquire-nav-class">
                    <Menu_left_nav name={"지정헌혈"} imgname={DIRECTEDIMG}></Menu_left_nav>
                    {console.log(id.id)}
                </div>
                <div className="Directed-inquire-nav-goback">
                    <img className="Directed-inquire-goback-bntimg-class" onClick={sendValue} src={GOBACKBTN}></img>
                </div>
            </div>
            <div className="Directed-inquire-content-container">
                <div className="Directed-inquire-content-class" >
                    <div className="Directed-inquire-card-class">
                        <div className="Dircected-inquire-card-total">
                            <div className="Directed-inquire-card-nav-class">
                                <div className="Directed-inquire-card-title-class">
                                    {getData?.data.title}
                                </div>
                                <div className="Directed-inquire-card-data-class">
                                    {dividedate(getData?.data.periodFrom)}~{dividedate(getData?.data.periodTo)}
                                </div>
                            </div>
                            <div className="Directed-inquire-card-info-class">
                                <div className="Directed-inquire-card-info-location">
                                    {getData?.data.locationSido} {getData?.data.locationSigungu}
                                </div>
                                <div className="Directed-inquire-card-info-bloodtype">
                                    {getData?.data.bloodType}
                                </div>
                                <div className="Directed-inquire-card-writer-container">
                                    <img src={levelIMG(getData?.data.requesterLevel)} className="Directed-inquire-card-writer-icon"></img>
                                    <div className="Directed-inquire-card-writername-class">
                                        {getData?.data.requesterNickname}
                                    </div>
                                </div>
                            </div>
                            <div className="Directed-inquire-card-context-class">
                               {getData?.data.contents}
                            </div>
                            <div className="Directed-inquire-card-footer-class">
                                <div className="Directed-inquire-card-footer-status">
                                    <img src={BLOODDROPIMG} className="Directed-inquire-card-footer-statueIMG"></img>
                                    <div className="Directed-inquire-carad-footer-statustext">{writeStatue(getData?.data.completeStatus)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Directed-inquire-footer-container">
                        <div className="Directed-inquire-footer-btn-container">
                            <div className="Directed-inquire-footer-btn-class">
                                <Common_Button_IMG name={"신청하기"} imgname={DIRECTED_BUTTON_IMG}></Common_Button_IMG>
                            </div>
                        </div>
                        <div className="Directed-inquire-footer-info1-class">
                            신청 하기를 누르면 요청자의 상세 정보를 열람할 수 있습니다.
                        </div>
                        <div className="Directed-inquire-footer-info2-class">
                            헌혈의 집을 이용한 지정 헌혈만 가능 합니다.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Directed_inquire;