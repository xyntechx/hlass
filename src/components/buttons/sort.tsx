import React from 'react';
import Image from 'next/image';

interface SortButtonProps {
    sortOrder: string;
    onToggle: () => void;
}

export default function SortButton({ sortOrder, onToggle }: SortButtonProps) {
    const imgStyle: React.CSSProperties = {
        transform: sortOrder === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)',
    };

    return (
        <button onClick={onToggle}>
            <Image src="/sort_icon.png" alt="Sort" style={imgStyle} width={40} height={40} />
        </button>
    );
}

