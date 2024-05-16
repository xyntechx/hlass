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
    /* useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
      }, [show]); */
    
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
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur, nisi at vulputate varius, nisi nulla cursus nisi, non consectetur libero justo ut libero. Suspendisse potenti. Donec a est non urna volutpat consequat. Curabitur in lectus eu sapien tempor malesuada.</p>
                    <p>Phasellus vestibulum massa eget lacus interdum fermentum. Integer nec felis sit amet elit viverra vehicula vel a erat. Nam fermentum, augue id scelerisque consectetur, sapien nisi tincidunt nunc, non pharetra neque urna quis felis. Vivamus finibus, nunc eget gravida efficitur, leo nisi interdum ex, a posuere urna augue ut purus.</p>
                    <p>Aliquam erat volutpat. Nulla facilisi. Maecenas consequat diam a nisi eleifend, quis feugiat nisl laoreet. Donec suscipit, libero ac bibendum facilisis, quam velit laoreet turpis, ac malesuada velit sapien at metus. Quisque id sagittis nisl. Praesent nec lectus sed mi iaculis posuere ac id elit.</p>
                    <p>Mauris euismod metus in purus fringilla, sit amet aliquet mauris sagittis. Suspendisse potenti. Proin vehicula nulla vel urna vehicula, ut ultricies felis tincidunt. Nam vehicula ipsum eget turpis dictum, ac tincidunt turpis fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer et nunc id dui tincidunt vestibulum et ut elit.</p>
                    <p>Curabitur condimentum, lectus et auctor posuere, risus ipsum facilisis justo, eget fermentum justo est in eros. Curabitur id lacus non elit euismod vehicula. In in ultricies arcu. Nullam ac varius lacus, ut tristique elit. Etiam sodales, metus et sollicitudin gravida, eros lorem sagittis risus, sed fermentum mi magna a elit.</p>
                    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam a libero et turpis tristique pretium. Integer a nisi sit amet justo egestas tincidunt a sit amet nulla. Proin sit amet dapibus tortor, vel fermentum risus. Vivamus laoreet sapien a ligula suscipit, sit amet egestas lacus venenatis. Proin sit amet libero turpis. Integer in dui velit. Donec tempor velit ac ipsum suscipit, non interdum ex facilisis.</p>
                    <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In ut leo nec ligula interdum fermentum nec id libero. Ut sollicitudin mi eget bibendum ullamcorper. Maecenas vel dolor arcu. Nullam vehicula vehicula odio. Duis quis nunc a justo dignissim faucibus in a odio. Etiam egestas justo vel elit ultricies, id ultrices odio facilisis. Nulla facilisi. Curabitur gravida turpis a varius hendrerit.</p>
                    <p>Vivamus scelerisque risus vitae ligula bibendum, eget cursus nisl vehicula. Sed auctor ipsum sed bibendum vulputate. Nunc ut sem nec turpis iaculis cursus. Aenean commodo orci ac vehicula fermentum. Fusce interdum dui eu dolor lacinia fermentum. Integer sodales dui nisi, id elementum mi tincidunt eget.</p>
                    <p>Morbi eget augue sed sapien scelerisque dictum. Nulla facilisi. Nulla sodales lorem et libero suscipit, vitae viverra mauris congue. Phasellus dictum vel tortor eget tincidunt. Ut et lectus eu augue tincidunt eleifend. Nulla facilisi. Fusce non felis sit amet erat pulvinar cursus in non sem.</p>
                    <p>Curabitur et tortor non purus vehicula condimentum. Etiam at lacus quis nunc pulvinar varius. Vivamus eget metus et purus aliquam laoreet. Ut vitae malesuada nisl. Ut lacinia augue id libero suscipit, quis hendrerit lorem vulputate. Fusce eget magna in dui aliquet cursus.</p>
                </div>
            </div>
        </div>
      );
};

export default Popup;
