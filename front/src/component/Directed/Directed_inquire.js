import React, { useEffect, useState } from "react";
import Menu_left_nav from '../Common/Header/Menu_left_nav';
import DIRECTEDIMG from '../../Img/DIRECTEDIMG.png';
import GOBACKBTN from '../../Img/DirectedIMG/arrow.png';
import BLOODDROPIMG from "../../Img/DirectedIMG/blood-drop.png";
import BRONZE from "../../Img/Grade/4_bronze.png";
import SIVER from "../../Img/Grade/3_silver.png";
import GOLD from "../../Img/Grade/2_gold.png";
import VIP from "../../Img/Grade/1_vip.png";
import axios from "axios";
import Directed_inquire_default from "./Directed_inquire_default";
import Directed_inquire_default_data from "./Directed_inquire_default_dats";
import { connect } from 'react-redux'
import { addPage } from '../../component/Modalmove/subscribers/action'
import './Directed_inquire.css';


const Directed_inquire = (id) => {
    const [getData, setGetData] = useState();
    const [viewData, setViewData] = useState(false);
    const [getApplicants, setGetApplicants] = useState();
    const [viewdata1,setviewdata1]=useState(0);
   ;

    const getValue = () => {

        setViewData(!viewData);
    


    }
    useEffect(() => {
        axios
            .get("http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct/directedItem/" + sessionStorage.getItem("directId"))

            .then(function (response) {

                setGetData(response);
                console.log(response.data.completeStatus)

            });

    }, []);
    useEffect(() => {
        axios
            .get("http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct/directedItem/" + sessionStorage.getItem("directId") + "/applicants")

            .then(function (response) {

                setGetApplicants(response); 
                check(response.data)

            });

    }, [getApplicants]);
    const deleteData = () => {

        axios
            .delete("http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/direct/directedItem/" + sessionStorage.getItem("directId"))

            .then(function (response) {
                alert("게시글이 삭제되었습니다.")
             
                id.addPage("지정헌혈")
            });

    }
    const writeStatue = (status) => {
        if (status === false)
            return "진행중";
        else return "완료"


    }
    const dividedate = (inputdate) => {

        var redate = "";
        for (var i in inputdate) {
            if (inputdate[i] == "T") break;

            redate = redate + inputdate[i];
        }
        return redate;

    }
    const check=(resdata)=>{
        if(resdata.length===0)
        {
            setviewdata1("3")
        }
        //console.log(sessionStorage.getItem("directId"));
        for(var i in resdata ){
          
            if(resdata[i].applicantIdentify===sessionStorage.getItem("userId"))//신청자명단에 있으면
            {
                if(resdata[i].applyStatus===true)//명단에 있고 완료
                {
                    setviewdata1("1")
                }
                else
                setviewdata1("2")//명단에 있고 아직
                break;
            }
            else setviewdata1("3")//신청자명단에 없으면
           
        }
    }
    const levelIMG = (level) => {

        if (level === 1) return BRONZE;
        else if (level === 2) return SIVER;
        else if (level === 3) return GOLD;
        else if (level === 4) return VIP;
    }

    const viewfn =()=>{
        if(getData?.data.completeStatus===true) return null
else{        if(viewdata1==="3"){//신청자명단에없으면
            return<Directed_inquire_default id={id} getValue={getValue} ></Directed_inquire_default>
        }
        else if(viewdata1==="1")//신청했고 이미 완료면
       {
            return null

       }
       else if(viewdata1==="2")//신청했꼬 아직아님
       {
           return (<Directed_inquire_default_data id={getData?.data.requesterUserId}></Directed_inquire_default_data>)
       }
    }

    }
    return (


        <div className="Directed-inquire-container">
            <div className="Directed-inquire-nav-container">
                <div className="Directed-inquire-nav-class">
                    <Menu_left_nav name={"지정헌혈"} imgname={DIRECTEDIMG}></Menu_left_nav>
                  
                </div>
                <div className="Directed-inquire-nav-goback">
                    <img className="Directed-inquire-goback-bntimg-class" onClick={() => id.addPage("지정헌혈")} src={GOBACKBTN}></img>
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
                                    <div className="Directed-inquire-card-location1">{getData?.data.locationSido}</div>
                                    <div className="Directed-inquire-card-location1">{getData?.data.locationSigungu}</div>
                                </div>
                                <div className="Directed-inquire-card-info-bloodtype">
                                    {getData?.data.bloodType}
                                </div>
                                <div className="Directed-inquire-card-writer-container">
                                    <img src={levelIMG(getData?.data.requesterLevel)} className="Directed-inquire-card-writer-icon" ></img>
                                    <div className="Directed-inquire-card-writername-class">
                                        {getData?.data.requesterNickname}
                                    </div>
                                </div>
                            </div>
                            <div className="Directed-inquire-card-context-class">
                                {getData?.data.contents}
                            </div>
                            <div className="Directed-inquire-card-context-img-class">
                                <div className="Directed-inquire-card-context-margin">
                                <img src={getData?.data.image} className="Directed-inquire-cardset-img"/>
                                </div>
                            </div>
                            <div className="Directed-inquire-card-footer-class">
                                <div className="Directed-inquire-card-footer-status">
                                    <img src={BLOODDROPIMG} className="Directed-inquire-card-footer-statueIMG"></img>
                                    <div className="Directed-inquire-card-footer-statustext">{writeStatue(getData?.data.completeStatus)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Directed-inquire-footer-container">
                        {getData?.data.requesterUserId === sessionStorage.getItem("userId") ? 
                        getData?.data.completeStatus===false?
                        <div>
                            <div className="Directed-inquire-footer-mypost">
                                <div className="Directed-inquire-footer-delete" onClick={deleteData}>
                                    삭제
                                </div>
                                <div className="Directed-inquire-footer-repost" onClick={()=>id.addPage("지정헌혈_수정")}>
                                    수정
                                </div>
                            </div>
                        </div>:null :viewfn()} 
                    

                        <div className="Directed-inquire-footer-applicant">
                            {getApplicants?.data.map((menu,index)=>(getApplicants?.data[index].applyStatus===false?<div className="Directed-inquire-footer-appname">{getApplicants?.data[index].applicantNickname+"님 지정헌혈 예정입니다."}</div>
                            :<div className="Directed-inquire-footer-appname">{getApplicants?.data[index].applicantNickname+"님이 지정헌혈을 완료하셨습니다!."}</div>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        page: state.page

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPage: (text) => dispatch(addPage(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Directed_inquire);