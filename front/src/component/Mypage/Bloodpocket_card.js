import React from "react";
import './Bloodpocket_card.css';
function Bloodpocket_card(getindex){


    return(

        <div className="Bloodpocket-card-container">
           
           <div className="Bloodpocket-card-codenumber">{getindex.getindex.code}</div>
                    <img src={getindex?.getindex?.image} className="Bloodpocket-card-context"></img>
          
        </div>
    )

}

export default Bloodpocket_card;