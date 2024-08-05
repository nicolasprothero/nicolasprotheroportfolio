import React, { useEffect, useState } from 'react';
import './Footer.css';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';

interface FooterProps {
    handleClick: (buttonType: string) => void;
    toggleOverlay: () => void; 
}

const Footer: React.FC<FooterProps> = ({ handleClick }) => {
    const [time, setTime] = useState(new Date());
    const [activeButton, setActiveButton] = useState('home');

    useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);

    return (
        <div className="footer">
            <div className="footer-left">
                <Button variant='primary-button' onClick={() => { handleClick('home'); setActiveButton('home'); }} className={activeButton === 'home' ? 'active' : ''}>HOME</Button>
                <div className="vertical-spacer"></div>
                <Button variant='icon-button' onClick={() => { handleClick('product-design'); setActiveButton('product-design'); }} className={activeButton === 'product-design' ? 'active' : ''}>
                    <Badge type="red-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '2vh' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z" />
                        </svg>
                    </Badge>
                    PRODUCT DESIGN
                </Button>
                <Button variant='icon-button' onClick={() => { handleClick('web-development'); setActiveButton('web-development'); }} className={activeButton === 'web-development' ? 'active' : ''}>
                    <Badge type="blue-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '2vh' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                        </svg>
                    </Badge>
                    WEB DEVELOPMENT
                </Button>
                <Button variant='icon-button' onClick={() => { handleClick('graphic-design'); setActiveButton('graphic-design'); }} className={activeButton === 'graphic-design' ? 'active' : ''}>
                    <Badge type="green-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '2vh' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </Badge>
                    GRAPHIC DESIGN
                </Button>
            </div>
            <div className="footer-right">
                {/* <Button variant='secondary-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                </Button> */}
                <span className="clock-box">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
};

export default Footer;