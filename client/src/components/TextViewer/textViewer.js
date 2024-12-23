import React from 'react';

const TextViewer = ({ text }) => {
    return (
        <div
            style={{
                whiteSpace: 'pre-wrap', // Preserves whitespace and line breaks
                wordWrap: 'break-word', // Breaks long words
                padding: '10px',
                backgroundColor: '#f9f9f9',
                textAlign: 'left',
                borderRadius: '5px',
                fontFamily: 'monospace', // Optional: A font style for text viewers
                fontSize: '14px',
                overflowY: 'auto', // Scroll if content overflows
                maxHeight: '400px', // Optional: Set a maximum height
                background: 'transparent',
            }}
        >
            {text}
        </div>
    );
};

export default TextViewer;
