import React, { useEffect, useState } from 'react';
import './Home.css';
import Window from '../../components/Window/Window';
import MarkdownRenderer from '../../util/MarkdownRenderer/MarkdownRenderer.tsx';
import lucyGif from '/images/lucyGif.gif';
import logoGif from '/images/logo.gif';

interface HomeProps {
  activeButton: string;
  selectedMarkdownPath: string | null;
}

const colors = ['white'];

const Home: React.FC<HomeProps> = ({ activeButton, selectedMarkdownPath }) => {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState(colors[0]);

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, [activeButton]);

  useEffect(() => {
    if (selectedMarkdownPath) {
      const importProject = import.meta.glob('../../markdown/projects/*.md', { as: 'raw' });

      const loadProject = async () => {
        if (importProject[selectedMarkdownPath]) {
          const fileContent = await importProject[selectedMarkdownPath]();
          setMarkdownContent(fileContent);
        } else {
          setMarkdownContent('Project not found');
        }
      };

      loadProject();
    }
  }, [selectedMarkdownPath]);


  const getCenterPosition = (width: number, height: number) => {
    const x = (window.innerWidth - width) / 2;
    const y = (window.innerHeight - height) / 2;
    return { x, y };
  };

  const mainWindowSize = { width: 58 * window.innerWidth / 100, height: 72 * window.innerHeight / 100 };

  const mainWindowPosition = getCenterPosition(mainWindowSize.width, mainWindowSize.height);

  const offsetYUp = 5 * window.innerHeight / 100;
  mainWindowPosition.y -= offsetYUp;

  const secondaryWindowSize = { width: 300, height: 340 }; // Fixed size in pixels
  const tertiaryWindowSize = { width: 300, height: 100 }; // Fixed size in pixels

  const secondaryWindowPosition = getCenterPosition(secondaryWindowSize.width, secondaryWindowSize.height);
  secondaryWindowPosition.x += 30 * window.innerWidth / 100; 
  secondaryWindowPosition.y += 18 * window.innerHeight / 100;

  const tertiaryWindowPosition = getCenterPosition(secondaryWindowSize.width, secondaryWindowSize.height);
  tertiaryWindowPosition.x += -27 * window.innerWidth / 100; 
  tertiaryWindowPosition.y += 46 * window.innerHeight / 100;


  return (
    <>
      <div className="desktop-canvas">
      <Window title="" width={`${mainWindowSize.width}px`} height={`${mainWindowSize.height}px`} defaultPosition={mainWindowPosition} isClosable={false}>
        <div>
          {markdownContent && activeButton !== "home" ? (
            <MarkdownRenderer content={markdownContent} />
          ) : (
            <div className="main-window-container" style={{ backgroundColor }}>
              <div className="title-container">
                  <img src={logoGif} />
                <div className="title-text">PRODUCT DESIGN, WEB DEVELOPMENT, GRAPHIC DESIGN</div>
              </div>
            </div>
          )}
        </div>
        </Window>
        {activeButton === "home" && (
          <>
            <Window title="" width={`${secondaryWindowSize.width}px`} height={`${secondaryWindowSize.height}px`} defaultPosition={secondaryWindowPosition} isClosable={true}>
              <img src={lucyGif} alt="Lucy GIF" />
            </Window>
            <Window title="" width={`${tertiaryWindowSize.width}px`} height={`${tertiaryWindowSize.height}px`} defaultPosition={tertiaryWindowPosition} isClosable={true}>
              <div className="secondary-text">super cool pro tip: <br/> check out my work below ↓</div>
            </Window>
          </>
        )}
        <div className="main-container">
          THIS WEBSITE WAS DESIGNED AND DEVELOPED BY NICOLAS PROTHERO
        </div>
      </div>
    </>
  );
}

export default Home;
