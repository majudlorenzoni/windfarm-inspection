import { Routes, Route } from 'react-router-dom'
import { HomePage } from './components/ui/homePage';
import { GlobalStyle } from './components/globalStyle';
import { LoadPage } from './components/ui/loadPage';
import SceneCanvas from './scene/SceneCanvas';
import { AuthProvider } from './components/contexts/authContext';
import { PrivateRoute } from './routes/privateRoute';

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/load" element={<LoadPage />} />
        <Route
          path="/windFarm"
          element={
            <PrivateRoute>
              <SceneCanvas />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
