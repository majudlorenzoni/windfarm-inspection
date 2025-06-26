import { Routes, Route } from 'react-router-dom'
import { HomePage } from './components/ui/homePage';
import { GlobalStyle } from './components/globalStyle';
import { LoadPage } from './components/ui/loadPage';
import SceneCanvas from './scene/SceneCanvas';
import { AuthProvider } from './components/contexts/authContext';
import { PrivateRoute } from './routes/privateRoute';
import { LoginPage } from './components/ui/loginPage/loginPage';
import { PreviousInspectionsPage } from './components/ui/inspetionPage';
import { RelatorioGeral } from './components/ui/relatorio/relatorioGeral';
import { LearnMore } from './components/ui/learnMore';
import { CreateInspectionForm } from './components/ui/createInspection';
function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/load" element={<LoadPage />} />
        <Route path="/learnMore" element={<LearnMore />} />
        <Route path="/createInspection" element={<CreateInspectionForm />} />
        <Route path="/inspections" element={<PreviousInspectionsPage />} />
        <Route path="/report" element={<RelatorioGeral />} />
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
