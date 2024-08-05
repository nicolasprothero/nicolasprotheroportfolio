import { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

import './Window.css';

interface WindowProps {
    title: string;
    children: React.ReactNode;
    width: string;
    height?: string;
    defaultPosition: { x: number, y: number };
    isClosable: boolean;
}

let zIndex = 0;

const Window: React.FC<WindowProps> = ({ title, children, width, height, defaultPosition, isClosable }) => {
    const draggableRef = useRef(null);
    const [isOpen, setIsOpen] = useState(true);
    const [myZIndex, setMyZIndex] = useState(0);

    const handleCloseClick = () => {
        if (isClosable) {
            setIsOpen(false);
        }
    };


    const handleClick = () => {
        zIndex += 1;
        setMyZIndex(zIndex);
    };

    useEffect(() => {
        zIndex += 1;
        setMyZIndex(zIndex);
    }, [])

    return isOpen ? (
        <Draggable nodeRef={draggableRef} defaultPosition={defaultPosition} bounds=".desktop-canvas" handle="#WindowHeader">
            <div ref={draggableRef} id="MainWindow" style={{ zIndex: myZIndex, width: width, height: height }}>
                <div id="WindowHeader" onMouseDown={handleClick}>
                    <div id="ThreeWindowButtons">
                        <div className="WindowButton" id="WindowCloseButton" onClick={handleCloseClick}></div>
                        <div className="WindowButton" id="WindowMaximizeButton"></div>
                    </div>
                    <div id="WindowTitle">{title}</div>
                </div>
                <div id="WindowContent" onMouseDown={handleClick}>
                    {children}
                </div>
            </div>
        </Draggable>
    ) : null;
}

export default Window;