import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

const App: React.FC = () => {
  const [_isSidebarVisible, setSidebarVisible] = useState(false);
  const [activeButton, setActiveButton] = useState('home');
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [selectedMarkdownPath, setSelectedMarkdownPath] = useState<string | null>(null);

  const handleClick = (buttonType: string) => {
    switch (buttonType) {
        case 'home':
            setSidebarVisible(false);
            setActiveButton('home');
            break;
        case 'product-design':
            setSidebarVisible(true);
            setActiveButton('product-design');
            break;
        case 'web-development':
            setSidebarVisible(true);
            setActiveButton('web-development');
            break;
        case 'graphic-design':
            setSidebarVisible(true);
            setActiveButton('graphic-design');
            break;
    }
  };

  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  return (
    <Router>
      <Header></Header>
      <Sidebar activeButton={activeButton} onSelectItem={setSelectedMarkdownPath} />
      <div className="app-container">
        <Routes>
        <Route path="/" element={<Home activeButton={activeButton} selectedMarkdownPath={selectedMarkdownPath} />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer handleClick={handleClick} toggleOverlay={toggleOverlay} />
      </div>
    </Router>
  );
}

export default App;