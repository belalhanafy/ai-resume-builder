import React from 'react';

// Function to calculate luminance and determine text color
const getTextColor = (color) => {
    if (!color) return "#000"; // Default black

    let colorValue = color.replace('#', '');
    if (colorValue.length === 3) {
        colorValue = colorValue.split('').map(c => c + c).join('');
    }

    const num = parseInt(colorValue, 16);
    const r = (num >> 16) & 0xff;
    const g = (num >> 8) & 0xff;
    const b = num & 0xff;

    // Calculate luminance (perceived brightness)
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    return luminance > 128 ? "#000000" : "#FFFFFF"; // Dark text for light colors, light text for dark colors
};

const SectionHeader = ({ header, resumeInfo }) => {
    const themeColor = resumeInfo?.themeColor || "#d6d3d1";
    const textColor = getTextColor(themeColor);

    return (
        <div className='my-4' style={{ backgroundColor: themeColor, padding: '2px', borderRadius: '4px' }}>
            <h2 className='text-center capitalize' style={{ color: textColor, fontWeight: 'bold', fontSize: '1.2rem' }}>
                {header}
            </h2>
        </div>
    );
};

export default SectionHeader;
