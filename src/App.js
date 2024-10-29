import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./modules/Home";
import Login from "./components/Contact/SignupAndLogin/Login";
import Signup from "./components/Contact/SignupAndLogin/Signup";
import PollVote from "./components/Election/PollVote";
import QS from "./components/Election/QS";
import ManageElections from "./components/Election/ManageElection";
import QuizList from "./components/Election/Quizlist";
import SurveyList from "./components/Election/SurveyList";
import PollList from "./components/Election/PollList";
import ManageElectionList from "./components/Election/ManageElectionList";
import CreateElectionForm from "./components/Election/ElectionForm";
import VotingInfo from "./components/HowItWorks/VotingInfo";
import AdminDashboard from "./modules/Admin";
import UserDashboard from "./modules/User";
import { AuthContext } from "./context";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayoutBasic from "./Layouts/Admin";

const App = () => {
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);

  console.log(userData, "Checking user in App")
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const renderAuthRoutes = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  const renderUserRoutes = () => (
    <Routes>
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/manage-activities" element={<ManageElections />} />
      <Route path="/manage-polls" element={<PollList />} />
      <Route path="/manage-surveys" element={<SurveyList />} />
      <Route path="/manage-quizzes" element={<QuizList />} />
      <Route path="/manage-elections" element={<ManageElectionList />} />
      <Route path="/create-election" element={<CreateElectionForm />} />
      <Route path="/create-survey" element={<QS />} />
      <Route path="/poll" element={<PollVote />} />
      <Route path="/how-it-works" element={<VotingInfo />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );

  const renderAdminRoutes = () => (
    <Routes>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="admin/manage-activities" element={<ManageElections />} />
      <Route path="admin/manage-polls" element={<PollList />} />
      <Route path="admin/manage-surveys" element={<SurveyList />} />
      <Route path="admin/manage-quizzes" element={<QuizList />} />
      <Route path="admin/manage-elections" element={<ManageElectionList />} />
      <Route path="admin/create-election" element={<CreateElectionForm />} />
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />
    </Routes>
  );

  return (
    <Router>
      {!userData ? (
        renderAuthRoutes()
      ) : (
        <DashboardLayoutBasic>
          {userData.role === "Admin" ? renderAdminRoutes() : renderUserRoutes()}
        </DashboardLayoutBasic>
      )}
    </Router>
  );
};

export default App;