import React,{useState} from "react";
import './Directed_write_select.css';
function Directed_write_select(props) {
    const [getState, setState] = useState("서울특별시");
    const [getState2, setState2] = useState("종로구");

 

    const handleChange = (e) => {
        setState(e.target.value);
        if(e.target.value==="서울특별시"){
            setState2("종로구")
        }
        else if(e.target.value==="부산광역시"){
            setState2("중구")
        }
        else if(e.target.value==="대구광역시"){
            setState2("중구")
        }
        else if(e.target.value==="인천광역시"){
            setState2("중구")
        }
        else if(e.target.value==="광주광역시"){
            setState2("동구")
        }
        else if(e.target.value==="대전광역시"){
            setState2("동구")
        }
        else if(e.target.value==="울산광역시"){
            setState2("중구")
        }
        else if(e.target.value==="세종특별자치시"){
            setState2("소정면")
        }
        else if(e.target.value==="경기도"){
            setState2("수원시")
        }
        else if(e.target.value==="강원도"){
            setState2("춘천시")
        }
        else if(e.target.value==="충청북도"){
            setState2("청주시")
        }
        else if(e.target.value==="전라북도"){
            setState2("전주시")
        }
        else if(e.target.value==="전라남도"){
            setState2("목포시")
        }
        else if(e.target.value==="경상북도"){
            setState2("포항시")
        }
        else if(e.target.value==="경상남도"){
            setState2("창원시")
        }
        else if(e.target.value==="제주특별자치도"){
            setState2("제주시")
        }

    }
    const handleChange2 = (e) => {
        setState2(e.target.value);
        

    }
    const senddata=()=>{

        props.getValue(getState)
        props.getValue2(getState2)
  
    }
    const SelectBox = () => {
        return (
            <select value={getState} onChange={handleChange}>
                <option key="서울특별시" value="서울특별시">서울특별시</option>
                <option key="부산광역시" value="부산광역시">부산광역시</option>
                <option key="대구광역시" value="대구광역시">대구광역시</option>
                <option key="인천광역시" value="인천광역시">인천광역시</option>
                <option key="광주광역시" value="광주광역시">광주광역시</option>
                <option key="대전광역시" value="대전광역시">대전광역시</option>
                <option key="울산광역시" value="울산광역시">울산광역시</option>
                <option key="세종특별자치시" value="세종특별자치시">세종특별자치시</option>
                <option key="경기도" value="경기도">경기도</option>
                <option key="강원도" value="강원도">강원도</option>
                <option key="충청북도" value="충청북도">충청북도</option>
                <option key="충청남도" value="충청남도">충청남도</option>
                <option key="전라북도" value="전라북도">전라북도</option>
                <option key="전라남도" value="전라남도">전라남도</option>
                <option key="경상북도" value="경상북도">경상북도</option>
                <option key="경상남도" value="경상남도">경상남도</option>
                <option key="제주특별자치도" value="제주특별자치도">제주특별자치도</option>

            </select>
        );
    }
    const SelectBox2 = () => {

        if (getState === "서울특별시")//서울
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="서울종로구" value="종로구">종로구</option>
                    <option key="서울중구" value="중구">중구</option>
                    <option key="서울용산구" value="용산구">용산구</option>
                    <option key="서울성동구" value="성동구">성동구</option>
                    <option key="서울광진구" value="광진구">광진구</option>
                    <option key="서울동대문구" value="동대문구">동대문구</option>
                    <option key="서울중랑구" value="중랑구">중랑구</option>
                    <option key="서울성북구" value="성북구">성북구</option>
                    <option key="서울강북구" value="강북구">강북구</option>
                    <option key="서울도봉구" value="도봉구">도봉구</option>
                    <option key="서울노원구" value="노원구">노원구</option>
                    <option key="서울은평구" value="은평구">은평구</option>
                    <option key="서울서대문구" value="서대문구">서대문구</option>
                    <option key="서울마포구" value="마포구">마포구</option>
                    <option key="서울양천구" value="양천구">양천구</option>
                    <option key="서울강서구" value="강서구">강서구</option>
                    <option key="서울구로구" value="구로구">구로구</option>
                    <option key="서울금천구" value="금천구">금천구</option>
                    <option key="서울영등포구" value="영등포구">영등포구</option>
                    <option key="서울동작구" value="동작구">동작구</option>
                    <option key="서울관악구" value="관악구">관악구</option>
                    <option key="서울서초구" value="서초구">서초구</option>
                    <option key="서울강남구" value="강남구">강남구</option>
                    <option key="서울송파구" value="송파구">송파구</option>
                    <option key="서울강동구" value="강동구">강동구</option>
                </select>
            );
        }
        else if (getState === "부산광역시")//부산
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="부산중구" value="중구">중구</option>
                    <option key="부산서구" value="서구">서구</option>
                    <option key="부산동구" value="동구">동구</option>
                    <option key="부산영도구" value="영도구">영도구</option>
                    <option key="부산진구" value="부산진구">부산진구</option>
                    <option key="부산동래구" value="동래구">동래구</option>
                    <option key="부산남구" value="남구">남구</option>
                    <option key="부산북구" value="북구">북구</option>
                    <option key="부산강서구" value="강서구">강서구</option>
                    <option key="부산해운대구" value="해운대구">해운대구</option>
                    <option key="부산사하구" value="사하구">사하구</option>
                    <option key="부산금정구" value="금정구">금정구</option>
                    <option key="부산연제구" value="연제구">연제구</option>
                    <option key="부산수영구" value="수영구">수영구</option>
                    <option key="부산사상구" value="사상구">사상구</option>
                </select>
            );
        }
        else if (getState === "대구광역시")//대구
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="대구중구" value="중구">중구</option>
                    <option key="대구동구" value="동구">동구</option>
                    <option key="대구서구" value="서구">서구</option>
                    <option key="대구남구" value="남구">남구</option>
                    <option key="대구북구" value="북구">북구</option>
                    <option key="대구수성구" value="수성구">수성구</option>
                    <option key="대구달서구" value="달서구">달서구</option>
                    <option key="대구달성군" value="달성군">달성군</option>
                </select>
            );
        }
        else if (getState === "인천광역시")//인천
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="인천중구" value="중구">중구</option>
                    <option key="인천동구" value="동구">동구</option>
                    <option key="인천미추홀구" value="미추홀구">미추홀구</option>
                    <option key="인천연수구" value="연수구">연수구</option>
                    <option key="인천남동구" value="남동구">남동구</option>
                    <option key="인천부평구" value="부평구">부평구</option>
                    <option key="인천계양구" value="계양구">계양구</option>
                    <option key="인천서구" value="서구">서구</option>
                    <option key="인천강화군" value="강화군">강화군</option>
                    <option key="인천옹진군" value="옹진군">옹진군</option>
                </select>
            );
        }
        else if (getState === "광주광역시")//광주
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="광주동구" value="동구">동구</option>
                    <option key="광주서구" value="서구">서구</option>
                    <option key="광주남구" value="남구">남구</option>
                    <option key="광주북구" value="북구">북구</option>
                    <option key="광주광산구" value="광산구">광산구</option>
                </select>
            );
        }
        else if (getState === "대전광역시")//대전광역시
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="대전동구" value="동구">동구</option>
                    <option key="대전중구" value="중구">중구</option>
                    <option key="대전서구" value="서구">서구</option>
                    <option key="대전유성구" value="유성구">유성구</option>
                    <option key="대전대덕구" value="대덕구">대덕구</option>
                </select>
            );
        }
        else if (getState === "울산광역시")//울산
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="울산중구" value="중구">중구</option>
                    <option key="울산남구" value="남구">남구</option>
                    <option key="울산동구" value="동구">동구</option>
                    <option key="울산북구" value="북구">북구</option>
                    <option key="울산울주군" value="울주군">울주군</option>
                </select>
            );
        }
        else if (getState === "세종특별자치시")//세종특별자치시
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="세종소정면" value="소정면">소정면</option>
                    <option key="세종전의면" value="전의면">전의면</option>
                    <option key="세종전동면" value="전동면">전동면</option>
                    <option key="세종조치원읍" value="조치원읍">조치원읍</option>
                    <option key="세종연서면" value="연서면">연서면</option>
                    <option key="세종연동면" value="연동면">연동면</option>
                    <option key="세종부강면" value="부강면">부강면</option>
                    <option key="세종연기면" value="연기면">연기면</option>
                    <option key="세종장군읍" value="장군읍">장군읍</option>
                    <option key="세종금남면" value="금남면">금남면</option>
                    <option key="세종한솔동" value="한솔동">한솔동</option>
                    <option key="세종새롬동" value="새롬동">새롬동</option>
                    <option key="세종도담동" value="도담동">도담동</option>
                    <option key="세종해밀동" value="해밀동">해밀동</option>
                    <option key="세종종촌동" value="종촌동">종촌동</option>
                    <option key="세종고운동" value="고운동">고운동</option>
                    <option key="세종소담동" value="소담동">소담동</option>
                    <option key="세종반곡동" value="반곡동">반곡동</option>
                    <option key="세종보람동" value="보람동">보람동</option>
                    <option key="세종대평동" value="대평동">대평동</option>
                    <option key="세종다정동" value="다정동">다정동</option>
                </select>
            );
        }
        else if (getState === "경기도")//경기도
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="경기도수원시" value="수원시">수원시</option>
                    <option key="경기도성남시" value="성남시">성남시</option>
                    <option key="경기도안양시" value="안양시">안양시</option>
                    <option key="경기도안산시" value="안산시">안산시</option>
                    <option key="경기도용인시" value="용인시">용인시</option>
                    <option key="경기도부천시" value="부천시">부천시</option>
                    <option key="경기도광명시" value="광명시">광명시</option>
                    <option key="경기도평택시" value="평택시">평택시</option>
                    <option key="경기도과천시" value="과천시">과천시</option>
                    <option key="경기도오산시" value="오산시">오산시</option>
                    <option key="경기도시흥시" value="시흥시">시흥시</option>
                    <option key="경기도군포시" value="군포시">군포시</option>
                    <option key="경기도의왕시" value="의왕시">의왕시</option>
                    <option key="경기도하남시" value="하남시">하남시</option>
                    <option key="경기도이천시" value="이천시">이천시</option>
                    <option key="경기도안성시" value="안성시">안성시</option>
                    <option key="경기도김포시" value="김포시">김포시</option>
                    <option key="경기도화성시" value="화성시">화성시</option>
                    <option key="경기도광주시" value="광주시">광주시</option>
                    <option key="경기도여주시" value="여주시">여주시</option>
                    <option key="경기도양평군" value="양평군">양평군</option>
                    <option key="경기도고양시" value="고양시">고양시</option>
                    <option key="경기도의정부시" value="의정부시">의정부시</option>
                    <option key="경기도동두천시" value="동두천시">동두천시</option>
                    <option key="경기도구리시" value="구리시">구리시</option>
                    <option key="경기도남양주시" value="남양주시">남양주시</option>
                    <option key="경기도파주시" value="파주시">파주시</option>
                    <option key="경기도양주시" value="양주시">양주시</option>
                    <option key="경기도포천시" value="포천시">포천시</option>
                    <option key="경기도연천군" value="연천군">연천군</option>
                    <option key="경기도가평군" value="가평군">가평군</option>
                </select>
            );
        }
        else if (getState === "강원도")//강원도
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="강원도춘천시" value="춘천시">춘천시</option>
                    <option key="강원도원주시" value="원주시">원주시</option>
                    <option key="강원도강릉시" value="강릉시">강릉시</option>
                    <option key="강원도동해시" value="동해시">동해시</option>
                    <option key="강원도태백시" value="태백시">태백시</option>
                    <option key="강원도속초시" value="속초시">속초시</option>
                    <option key="강원도삼척시" value="삼척시">삼척시</option>
                    <option key="강원도홍천군" value="홍천군">홍천군</option>
                    <option key="강원도횡성군" value="횡성군">횡성군</option>
                    <option key="강원도영월군" value="영월군">영월군</option>
                    <option key="강원도평창군" value="평창군">평창군</option>
                    <option key="강원도정선군" value="정선군">정선군</option>
                    <option key="강원도철원군" value="철원군">철원군</option>
                    <option key="강원도화천군" value="화천군">화천군</option>
                    <option key="강원도양구군" value="양구군">양구군</option>
                    <option key="강원도인제군" value="인제군">인제군</option>
                    <option key="강원도고성군" value="고성군">고성군</option>
                    <option key="강원도양양군" value="양양군">양양군</option>
                </select>
            );
        }
        else if (getState === "충청북도")//충청북도
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="충청북도청주시" value="청주시">청주시</option>
                    <option key="충청북도충주시" value="충주시">충주시</option>
                    <option key="충청북도제천시" value="제천시">제천시</option>
                    <option key="충청북도보은군" value="보은군">보은군</option>
                    <option key="충청북도옥천군" value="옥천군">옥천군</option>
                    <option key="충청북도영동군" value="영동군">영동군</option>
                    <option key="충청북도증평군" value="증평군">증평군</option>
                    <option key="충청북도진천군" value="진천군">진천군</option>
                    <option key="충청북도괴산군" value="괴산군">괴산군</option>
                    <option key="충청북도음성군" value="음성군">음성군</option>
                    <option key="충청북도단양군" value="단양군">단양군</option>
                </select>
            );
        }
        else if (getState === "충청남도")//충청남도
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="충청남도천안시" value="천안시">천안시</option>
                    <option key="충청남도공주시" value="공주시">공주시</option>
                    <option key="충청남도보령시" value="보령시">보령시</option>
                    <option key="충청남도아산시" value="아산시">아산시</option>
                    <option key="충청남도서산시" value="서산시">서산시</option>
                    <option key="충청남도논산시" value="논산시">논산시</option>
                    <option key="충청남도계룡시" value="계룡시">계룡시</option>
                    <option key="충청남도당진시" value="당진시">당진시</option>
                    <option key="충청남도금산군" value="금산군">금산군</option>
                    <option key="충청남도부여군" value="부여군">부여군</option>
                    <option key="충청남도서천군" value="서천군">서천군</option>
                    <option key="충청남도청양군" value="청양군">청양군</option>
                    <option key="충청남도홍성군" value="홍성군">홍성군</option>
                    <option key="충청남도예산군" value="예산군">예산군</option>
                    <option key="충청남도태안군" value="태안군">태안군</option>
                </select>
            );
        }
        else if (getState === "전라북도")//전라북도
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="전라북도전주시" value="전주시">전주시</option>
                    <option key="전라북도군산시" value="군산시">군산시</option>
                    <option key="전라북도익산시" value="익산시">익산시</option>
                    <option key="전라북도정읍시" value="정읍시">정읍시</option>
                    <option key="전라북도남원시" value="남원시">남원시</option>
                    <option key="전라북도김제시" value="김제시">김제시</option>
                    <option key="전라북도완주군" value="완주군">완주군</option>
                    <option key="전라북도진안군" value="진안군">진안군</option>
                    <option key="전라북도무주군" value="무주군">무주군</option>
                    <option key="전라북도장수군" value="장수군">장수군</option>
                    <option key="전라북도임실군" value="임실군">임실군</option>
                    <option key="전라북도순창군" value="순창군">순창군</option>
                    <option key="전라북도고창군" value="고창군">고창군</option>
                    <option key="전라북도부안군" value="부안군">부안군</option>
                </select>
            );
        }
        else if (getState === "전라남도")//전라남도
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="전라남도목포시" value="목포시">목포시</option>
                    <option key="전라남도여수시" value="여수시">여수시</option>
                    <option key="전라남도순천시" value="순천시">순천시</option>
                    <option key="전라남도나주시" value="나주시">나주시</option>
                    <option key="전라남도광양시" value="광양시">광양시</option>
                    <option key="전라남도담양군" value="담양군">담양군</option>
                    <option key="전라남도곡성군" value="곡성군">곡성군</option>
                    <option key="전라남도구례군" value="구례군">구례군</option>
                    <option key="전라남도고흥군" value="고흥군">고흥군</option>
                    <option key="전라남도보성군" value="보성군">보성군</option>
                    <option key="전라남도화순군" value="화순군">화순군</option>
                    <option key="전라남도장흥군" value="장흥군">장흥군</option>
                    <option key="전라남도강진군" value="강진군">강진군</option>
                    <option key="전라남도해남군" value="해남군">해남군</option>
                    <option key="전라남도영암군" value="영암군">영암군</option>
                    <option key="전라남도무안군" value="무안군">무안군</option>
                    <option key="전라남도함평군" value="함평군">함평군</option>
                    <option key="전라남도영광군" value="영광군">영광군</option>
                    <option key="전라남도장성군" value="장성군">장성군</option>
                    <option key="전라남도완도군" value="완도군">완도군</option>
                    <option key="전라남도진도군" value="진도군">진도군</option>
                    <option key="전라남도신안군" value="신안군">신안군</option>
                </select>
            );
        }
        else if (getState === "경상북도")//경상북도
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="경상북도포항시" value="포항시">포항시</option>
                    <option key="경상북도경주시" value="경주시">경주시</option>
                    <option key="경상북도김천시" value="김천시">김천시</option>
                    <option key="경상북도안동시" value="안동시">안동시</option>
                    <option key="경상북도구미시" value="구미시">구미시</option>
                    <option key="경상북도영주시" value="영주시">영주시</option>
                    <option key="경상북도영천시" value="영천시">영천시</option>
                    <option key="경상북도상주시" value="상주시">상주시</option>
                    <option key="경상북도문경시" value="문경시">문경시</option>
                    <option key="경상북도경산시" value="경산시">경산시</option>
                    <option key="경상북도군위군" value="군위군">군위군</option>
                    <option key="경상북도의성군" value="의성군">의성군</option>
                    <option key="경상북도청송군" value="청송군">청송군</option>
                    <option key="경상북도영양군" value="영양군">영양군</option>
                    <option key="경상북도양덕군" value="양덕군">양덕군</option>
                    <option key="경상북도청도군" value="청도군">청도군</option>
                    <option key="경상북도고령군" value="고령군">고령군</option>
                    <option key="경상북도성주군" value="성주군">성주군</option>
                    <option key="경상북도칠곡군" value="칠곡군">칠곡군</option>
                    <option key="경상북도예천군" value="예천군">예천군</option>
                    <option key="경상북도봉화군" value="봉화군">봉화군</option>
                    <option key="경상북도울진군" value="울진군">울진군</option>
                    <option key="경상북도울릉군" value="울릉군">울릉군</option>
                </select>
            );
        }
        else if (getState === "경상남도")//경상남도
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="경상남도창원시" value="창원시">창원시</option>
                    <option key="경상남도진주시" value="진주시">진주시</option>
                    <option key="경상남도통영시" value="통영시">통영시</option>
                    <option key="경상남도사천시" value="사천시">사천시</option>
                    <option key="경상남도김해시" value="김해시">김해시</option>
                    <option key="경상남도밀양시" value="밀양시">밀양시</option>
                    <option key="경상남도거제시" value="거제시">거제시</option>
                    <option key="경상남도양산시" value="양산시">양산시</option>
                    <option key="경상남도의령군" value="의령군">의령군</option>
                    <option key="경상남도함안군" value="함안군">함안군</option>
                    <option key="경상남도창녕군" value="창녕군">창녕군</option>
                    <option key="경상남도고성군" value="고성군">고성군</option>
                    <option key="경상남도남해군" value="남해군">남해군</option>
                    <option key="경상남도하동군" value="하동군">하동군</option>
                    <option key="경상남도산청군" value="산청군">산청군</option>
                    <option key="경상남도함양군" value="함양군">함양군</option>
                    <option key="경상남도거창군" value="거창군">거창군</option>
                    <option key="경상남도합천군" value="합천군">합천군</option>
                </select>
            );
        }
        else if (getState === "제주특별자치도")//제주특별자치도
        {
            return (
                <select select value={getState2} onChange={handleChange2}>
                    <option key="제주특별자치도제주시" value="제주시">제주시</option>
                    <option key="제주특별자치도서귀포시" value="서귀포시">서귀포시</option>
                </select>
            );
        }

        

    }
    return (

        <div className="Directed-select-container"><SelectBox/><SelectBox2/>{senddata()}
        </div>

    )
}
export default Directed_write_select;
