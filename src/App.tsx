import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import AcademicsPage from './pages/AcademicsPage'
import QuestionPapersPage from './pages/QuestionPapersPage'
import AssignmentsPage from './pages/AssignmentsPage'
import AnnouncementsPage from './pages/AnnouncementsPage'
import CampusMapPage from './pages/CampusMapPage'
import ExploreNearbyPage from './pages/ExploreNearbyPage'
import FreshersGuidePage from './pages/FreshersGuidePage'
import OfficeTimingsPage from './pages/OfficeTimingsPage'
import BookmarksPage from './pages/BookmarksPage'
import DownloadsPage from './pages/DownloadsPage'
import StudyPlannerPage from './pages/StudyPlannerPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import HelpPage from './pages/HelpPage'
import AdminPage from './pages/AdminPage'
import CalendarPage from './pages/CalendarPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/question-papers" element={<QuestionPapersPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/campus-map" element={<CampusMapPage />} />
        <Route path="/explore-nearby" element={<ExploreNearbyPage />} />
        <Route path="/freshers-guide" element={<FreshersGuidePage />} />
        <Route path="/office-timings" element={<OfficeTimingsPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/study-planner" element={<StudyPlannerPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
