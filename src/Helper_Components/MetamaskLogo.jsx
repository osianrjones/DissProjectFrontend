import React, { useEffect, useRef } from 'react';
const ModelViewer = require('@metamask/logo');

const MetamaskLogo = () => {
    const containerRef = useRef(null);
    const viewerRef = useRef(null);
    const padding = 250;

    useEffect(() => {
        // Initialize ModelViewer
        const viewer = ModelViewer({
            pxNotRatio: true,
            width: 100,
            height: 90,
            followMouse: false,
            slowDrift: false,
        });

        viewerRef.current = viewer;

        const container = containerRef.current;
        if (container) {
            container.appendChild(viewer.container);

            // Set initial look position
            viewer.lookAt({x: 100, y: 100});

            let inside = false;

            const handleMouseMove = (event) => {
                const button = document.getElementById("button-metamask");
                if (button) {
                    const rect = button.getBoundingClientRect();

                    const expandedRect = {
                        left: rect.left - padding,
                        right: rect.right + padding,
                        top: rect.top - padding,
                        bottom: rect.bottom + padding,
                    }

                    const isMouseInside =
                        event.clientX >= expandedRect.left &&
                        event.clientX <= expandedRect.right &&
                        event.clientY >= expandedRect.top &&
                        event.clientY <= expandedRect.bottom;

                    if (isMouseInside) {
                        if (!inside) {
                            inside = true;
                            viewer.setFollowMouse(true);
                        }
                    } else {
                        if (inside) {
                            inside = false;
                            viewer.setFollowMouse(false);
                            viewer.lookAt({ x: 0, y: 0 });
                        }
                    }
                }
            };

            document.addEventListener('mousemove', handleMouseMove);


            // Cleanup on unmount
            return () => {
                viewer.stopAnimation();
                document.removeEventListener('mousemove', handleMouseMove);
                if (container) {
                    container.removeChild(viewer.container);
                }
            };
        }
    }, []);

    return <div id="logo-container" ref={containerRef} />;
};

export default MetamaskLogo;
