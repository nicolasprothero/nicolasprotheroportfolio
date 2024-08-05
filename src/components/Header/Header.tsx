import React, { useState } from 'react';
import Button from "../Button/Button";
import './Header.css';

const Header: React.FC = () => {
    const [isFullPage, setIsFullPage] = useState(false);
    const [emailText, setEmailText] = useState('NPROTHERO0917@GMAIL.COM');
  
    const handleButtonClick = () => {
      setIsFullPage(!isFullPage);
      setEmailText('NPROTHERO0917@GMAIL.COM');
    };
  
    const handleEmailClick = () => {
        navigator.clipboard.writeText('nprothero0917@gmail.com')
        .then(() => {
            setEmailText('✓ COPIED');
        })
        .catch(err => {
            console.error('Failed to copy email: ', err);
        });
    };
  
    return (
      <>
        <div className="button-container">
          <Button variant='secondary-button' onClick={handleButtonClick}>
            {isFullPage ? 'CLOSE' : 'ABOUT ME'}
          </Button>
        </div>
        {isFullPage && (
          <div className="full-page">
            <div className="full-page-content">
              <div>NICOLAS PROTHERO</div>
              <div>PRODUCT DESIGN<br/>WEB DEVELOPMENT<br/>GRAPHIC DESIGN</div>
              <div className="email" onClick={handleEmailClick}>{emailText}</div>
            </div>
            <div className="full-screen-footer">
              illustration by @studiospitt
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Header;