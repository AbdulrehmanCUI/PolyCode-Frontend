import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./features/navigation/components/Navbar";
import Sidebar from "./features/navigation/components/Sidebar";
import { PlaygroundProvider } from "./features/playground/context/PlaygroundContext";
import "./App.css";

// ── Lazy-load every page so their JS bundles are only downloaded when needed ──
const LanguageSelectPage = lazy(
  () => import("./features/language/pages/LanguageSelectPage"),
);
const HomePage = lazy(() => import("./features/docs/pages/Home/HomePage"));
const DocumentPage = lazy(() => import("./features/docs/pages/DocumentPage"));
const CategoryPage = lazy(() => import("./features/docs/pages/CategoryPage"));
const SearchPage = lazy(() => import("./features/docs/pages/SearchPage"));
const PlaygroundPage = lazy(
  () => import("./features/playground/pages/PlaygroundPage"),
);

// Minimal inline fallback – shown while the lazy chunk downloads
const PageFallback = () => (
  <div className="loading">
    <div className="spinner-container">
      <div className="spinner" />
    </div>
  </div>
);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    () => localStorage.getItem("selectedLanguage") || null,
  );
  const [theme, setTheme] = React.useState(
    () => localStorage.getItem("theme") || "dark",
  );

  const toggleSidebar = () => setIsSidebarOpen((o) => !o);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLanguageSelect = (language) => {
    localStorage.setItem("selectedLanguage", language);
    setSelectedLanguage(language);
  };

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  return (
    <PlaygroundProvider>
      <Router>
        <div className={`app ${theme === "light" ? "theme-light" : ""}`}>
          {selectedLanguage ? (
            <>
              <Navbar
                toggleSidebar={toggleSidebar}
                theme={theme}
                onToggleTheme={toggleTheme}
              />
              <div className="layout">
                {isSidebarOpen && (
                  <div className="backdrop" onClick={closeSidebar}></div>
                )}
                <Sidebar
                  isOpen={isSidebarOpen}
                  onClose={closeSidebar}
                  selectedLanguage={selectedLanguage}
                  onLanguageSelect={handleLanguageSelect}
                />
                <main className="main-content">
                  <Suspense fallback={<PageFallback />}>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <HomePage selectedLanguage={selectedLanguage} />
                        }
                      />
                      <Route
                        path="/hub"
                        element={
                          <HomePage selectedLanguage={selectedLanguage} />
                        }
                      />
                      <Route
                        path="/doc/*"
                        element={
                          <DocumentPage
                            selectedLanguage={selectedLanguage}
                            theme={theme}
                          />
                        }
                      />
                      <Route
                        path="/category/*"
                        element={
                          <CategoryPage selectedLanguage={selectedLanguage} />
                        }
                      />
                      <Route
                        path="/search"
                        element={
                          <SearchPage selectedLanguage={selectedLanguage} />
                        }
                      />
                      <Route
                        path="/playground"
                        element={
                          <PlaygroundPage
                            theme={theme}
                            onToggleSidebar={toggleSidebar}
                            sidebarOpen={isSidebarOpen}
                          />
                        }
                      />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </Suspense>
                </main>
              </div>
            </>
          ) : (
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <LanguageSelectPage
                      onLanguageSelect={handleLanguageSelect}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          )}
        </div>
      </Router>
    </PlaygroundProvider>
  );
}

export default App;
