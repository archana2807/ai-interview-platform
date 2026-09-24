
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import PublicInterview from "./pages/PublicInterview";
import InterviewResults from "./pages/InterviewResults";
import InterviewDetail from "./pages/InterviewDetail";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Recruiter Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Interview Results */}
          <Route
            path="/results"
            element={<InterviewResults />}
          />
          <Route
            path="/results/:id"
            element={<InterviewDetail />}
          />
        </Route>

        {/* Candidate Interview (outside layout) */}
        <Route
          path="/interview/:token"
          element={<PublicInterview />}
        />

        {/* Default Route */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

