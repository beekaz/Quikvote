import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import FeaturesSection from "./components/Features/FeatureSection";
import AboutSection from "./components/About/About";  
import CTASection from "./components/CTASection/CTA";
// import ContactSection from "./components/Contact/Contact";
import Login from "./components/Contact/SignupAndLogin/Login";
import Signup from "./components/Contact/SignupAndLogin/Signup";
import Footer from "./components/Footer/Footer";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import TargetAudience from "./components/Features/TargetAudience";
import WhyChooseQuikVote from "./components/Features/WhyQuikVote";
import LearnMore from "./components/Features/LearnMore";
import PollVote from "./components/Election/PollVote";
import QS from "./components/Election/QS";
import ManageElections from "./components/Election/ManageElection";
import ElectionPage from "./components/Election/ElectionPage";
import ElectionDashboard from "./components/Election/ElectionDashboard"
import QuizList from "./components/Election/Quizlist";
import SurveyList from "./components/Election/SurveyList"
import PollList from "./components/Election/PollList";
import ManageElectionList from "./components/Election/ManageElectionList";
import CreateElectionForm from "./components/Election/ElectionForm";
import VotingInfo from "./components/HowItWorks/VotingInfo";
// import Userdashbotaard from "./components/Election/Userdashbord";

const App = () => {
  const userRoutes = 
  [

  ]

  const adminRoutes =
  [

  ]
  const authRouter =
  [

  ]
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  return (
    <Router>
      <div className='root'>
        <Navbar />
        <Routes>
          <Route
            path='/login'
            element={<Login/>}
          />{" "}
          <Route path='/signup' element={<Signup />} />
          <Route path='/manage-activities' element={<ManageElections />} />
          <Route path='/manage-polls' element={<PollList />} />
          <Route path='/manage-surveys"' element={<SurveyList />} />
          <Route path='/manage-quizzes' element={<QuizList />} />
          <Route path='/manage-elections' element={<ManageElectionList />} />
          {/* <Route path='/create-election' element={<ElectionPage />} /> */}
          <Route path='/create-election' element={<CreateElectionForm />} />
          <Route path='/create-survey' element={<QS />} />
          <Route path='/poll' element={<PollVote />} />
          <Route path='/how-it-works' element={<VotingInfo />} />
          {/* <Route path='/signup/dashboard' element={<Userdashboard />} /> */}
        </Routes>
        {/* <Userdashboard /> */}
        <HeroSection />
        <TargetAudience />
        <WhyChooseQuikVote />
        <LearnMore />
        {/* <AboutSection /> */}

        {/* <FeaturesSection /> */}
        <Routes>
          {/* <Route path='/register' element={<CTASection />} /> */}
        </Routes>
        <CTASection />
        {/* <ContactSection /> */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
