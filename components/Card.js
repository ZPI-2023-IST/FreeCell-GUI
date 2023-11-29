import {useEffect, useState} from "react";

const Card = ({value, style}) => {
    const [cardWidth, setCardWidth] = useState(300);

    useEffect(() => {
        const handleResize = () => {
            setCardWidth(
                (typeof window !== "undefined"
                    ? window.innerWidth || document.documentElement.clientWidth
                    : 1200) / 15
            );
        };

        // Initial update
        handleResize();

        // Add event listener for window resize
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
        }

        // Cleanup the event listener when the component is unmounted
        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, []);

    const cardHeight = cardWidth * 1.5;

    const cardStyle = {
        border: '2px solid #333',
        borderRadius: '15px',
        padding: '10px',
        margin: '5px',
        minWidth: `${cardWidth}px`,
        minHeight: `${cardHeight}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        ...style,
    };

    const suitStyle_upper_left = {
        fontSize: '24px',
        color:
            value && (value.includes('h') || value.includes('d')) ? 'red' : 'black',
        position: 'absolute',
        top: '10px', // Adjusted top position
        left: '10px', // Adjusted left position
    };

    const suitStyle_bottom_right = {
        fontSize: '24px',
        color:
            value && (value.includes('h') || value.includes('d')) ? 'red' : 'black',
        position: 'absolute',
        bottom: '10px', // Adjusted bottom position
        right: '10px', // Adjusted right position
    };

    const valueStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        color: value && (value.includes('h') || value.includes('d')) ? 'red' : 'black',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    return (
        <div id={value} style={{...cardStyle}}>
            {value && (
                <>
                    <div style={suitStyle_upper_left}>{getSuitSymbol(value.slice(-1))}{value.split(' ')[0]}</div>
                    <div style={valueStyle}>{value.split(' ')[0]}</div>
                    <div style={suitStyle_bottom_right}>{getSuitSymbol(value.slice(-1))}{value.split(' ')[0]}</div>
                </>
            )}
        </div>
    );
};

export const getSuitSymbol = (suit) => {
    switch (suit) {
        case 'h':
            return '♥'; // Hearts
        case 'd':
            return '♦'; // Diamonds
        case 'c':
            return '♣'; // Clubs
        case 's':
            return '♠'; // Spades
        default:
            return '';
    }
};

export default Card;
