import { Routes, Route } from 'react-router-dom'
import { HomePage } from './components/ui/homePage';
import { GlobalStyle } from './components/globalStyle';
import { LoadPage } from './components/ui/loadPage';
import SceneCanvas from './scene/SceneCanvas';

function App() {
  return (
 <>
  <GlobalStyle />
  <Routes>
    <Route path="/home" element={<HomePage />} />
    <Route path="/load" element={<LoadPage />} />
    <Route path="/windFarm" element={<SceneCanvas />} />
  </Routes>
</>
  )
}

export default App;
