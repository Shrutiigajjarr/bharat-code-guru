import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/context/AppContext";
import AppLayout from "@/components/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LearningPaths from "./pages/LearningPaths";
import PracticeProblems from "./pages/PracticeProblems";
import CodePlayground from "./pages/CodePlayground";
import Mentorship from "./pages/Mentorship";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import ModuleViewer from "./pages/ModuleViewer";
import ModuleQuiz from "./pages/ModuleQuiz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function LoginGuard() {
  const { currentUser } = useApp();
  if (currentUser) return <Navigate to="/dashboard" replace />;
  return <Login />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<LoginGuard />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
            <Route path="/learning-paths" element={<AuthGuard><LearningPaths /></AuthGuard>} />
            <Route path="/learning-paths/:trackId/module/:moduleId" element={<AuthGuard><ModuleViewer /></AuthGuard>} />
            <Route path="/practice" element={<AuthGuard><PracticeProblems /></AuthGuard>} />
            <Route path="/playground" element={<AuthGuard><CodePlayground /></AuthGuard>} />
            <Route path="/mentorship" element={<AuthGuard><Mentorship /></AuthGuard>} />
            <Route path="/leaderboard" element={<AuthGuard><Leaderboard /></AuthGuard>} />
            <Route path="/analytics" element={<AuthGuard><Analytics /></AuthGuard>} />
            <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
            <Route path="/admin" element={<AuthGuard><AdminPanel /></AuthGuard>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
