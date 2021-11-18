import "./App.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Board_main from "./component/Board/Board_main";
import Directed_main from "./component/Directed/Directed_main";
import Notice_main from "./component/Notice/Notice_main";
import Join_main from "./component/Join/Join_main";
import Rank_main from "./component/Rank/Rank_main";
import Main_base from "./component/Main/Main_base";
import Directed_inquire from "./component/Directed/Directed_inquire";
import {Provider} from 'react-redux'
import store from "./component/Modalmove/store";
function App() {

  return (
    <Provider store={store}>
    <div className="App">
  

        <Switch>
          <Route exact path="/board" component={Board_main} />
          <Route exact path="/directed" component={Directed_main} />
          <Route exact path="/notice" component={Notice_main} />
          <Route exact path="/ranking" component={Rank_main} />
          <Route path="/test" component={Directed_inquire} exact={true}/>
          <Route exact path="/join" component={Join_main} />
          <Route exact path="/" component={Main_base} exact={true}/>

        
        </Switch>
     
    </div>
    </Provider>
  );
}

export default App;
//npm install
//npm install react-router-dom
//npm install axios
