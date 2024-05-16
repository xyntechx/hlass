"use client";

import React, { ReactNode, useEffect } from 'react';
import Image from "next/image";

interface PopupProps {
    show: boolean;
    onClose: () => void;
    onViewClass: () => void;
    children: ReactNode;
}

const Popup = ({ 
    show, 
    onClose,
    onViewClass,
    children 
} : PopupProps) => {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
      }, [show]);
    
      if (!show) return null;
    
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-3/4 h-3/4 overflow-y-auto">
                <div className="flex flex-row justify-between pb-4">
                    <button className="text-3xl hover:text-gray-800" onClick={onClose}>
                        &times;
                    </button>
                    <div onClick={onViewClass} className="flex flex-row font-semibold text-black hover:text-gray-800 gap-x-1">
                        <button>
                            OPEN FULL PAGE VIEW
                        </button>
                        <Image
                            src="/full_page_arrow.svg"
                            alt="Open Full Page View"
                            width={15}
                            height={15}
                        />
                    </div>
                </div>
                {children}
            </div>
        </div>
      );
};

export default Popup;
