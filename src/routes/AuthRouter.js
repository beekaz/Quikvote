import React, { useContext, useEffect, Suspense, Fragment } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { lazy } from "react";
import { PrivatePaths } from "./path";
import { AuthContext } from "../context";

// Lazy-loaded components
const Home = lazy(() => import("../modules/Home"));
const Login = lazy(() => import("../modules/Auth/Login"));
const Register = lazy(() => import("../modules/Auth/Register"));
const ForgetPassword = lazy(() => import("../modules/Auth/ForgetPassword"));
const Unauthorized = lazy(() => import("../modules/Unauthorized"));


// Lazy-loading components
const PollVote = lazy(() => import("../modules/Poll/PollVote"));
const Quiz = lazy(() => import("../modules/Quiz/Quiz"));
const Election  = lazy(() => import("../modules/Election/Election"));
const Survey = lazy(() => import("../modules/Quiz/Survey"));
const CreateElectionPage = lazy(() => import("../modules/Election/CreateElectionPage")); 
const EditElectionPage = lazy(() => import("../modules/Election/CreateElectionPage?EditElectionPage"));


const paths = [
  { path: "/", element: Home },
  { path: "/login", element: Login },
  { path: "/register", element: Register },
  { path: "/forget-password", element: ForgetPassword },
  { path: "/poll", element: PollVote }, // Poll route
  { path: "/quiz", element: Quiz },
  { path: "/election", element: Election },
  { path: "/create-election", element: CreateElectionPage }, // New route for creating elections
  { path: "/edit-election/:id", element: <EditElectionPage /> },

  { path: "/survey", element: Survey }, //
  { path: "*", element: Unauthorized },
  {
    path: "/manage-activities",
    element: lazy(() => import("../modules/Polls/ManageElections")),
  },
  {
    path: "/create-survey",
    element: lazy(() => import("./modules/Surveys/CreateSurvey")),
  },

  {
    path: "/create-quiz",
    element: lazy(() => import("./modules/Quizzes/CreateQuiz")),
  },
  {
    path: "/manage-quizzes",
    element: lazy(() => import("./modules/QuizList")),
  },
  {
    path: "/manage-surveys",
    element: lazy(() => import("./modules/SurveyList")),
  },
  {
    path: "/manage-elections",
    element: lazy(() => import("../modules/election/ManageElectionsList")),
  },
];

function Auth() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const redirectPath =
        user.role === "Admin"
          ? `${PrivatePaths.ADMIN}/dashboard`
          : `${PrivatePaths.USER}/dashboard`;
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  // Redirect non-authenticated users to login
  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {paths.map(({ path, element: Element }) => (
          <Fragment key={path}>
            <Route path={path} element={<Element />} />
          </Fragment>
        ))}
      </Routes>
    </Suspense>
  );
}

export default Auth;
