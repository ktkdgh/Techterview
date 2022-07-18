import React, { Component } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css"
import "./components/css/VideoDeleteModal.css"
import "./components/css/CreateRoom.css"
import 'bootstrap/dist/css/bootstrap.min.css';


import Navbar from "./components/includes/Navbar"
import Mainbody from "./components/pages/Main"
import Feedback from "./components/pages/FeedbackMain"
import FeedbackDetail from "./components/pages/FeedbackDetail"
import MyVideo from "./components/pages/FeedbackMyVideo";
import Login from "./components/pages/Login";
import QuestionList from "./components/pages/QuestionListMain";
import TrainingAlone from "./components/pages/TrainingAlone";
import TrainingOthers from "./components/pages/TrainingOthers";
import OthersLobby from "./components/pages/TrainingOthersLobby";

class App extends  Component {
  render() {

    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<Navbar />}>
              <Route path="/" element={<Mainbody />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feedback/myvideo" element={<MyVideo />} />
              <Route path="/questionlist/main" element={<QuestionList />} />
              <Route path="/feedback/main" element={<Feedback />} />
              <Route path="/feedback/detail" element={<FeedbackDetail />} />
              <Route path="/training/detail" element={<FeedbackDetail />} />
              <Route path="/training/others/lobby" element={<OthersLobby />} />
            </Route>

            <Route path="/page/training/alone/:key" element={<TrainingAlone />} />
            <Route path="/training/others" element={<TrainingOthers />} />
            

          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;