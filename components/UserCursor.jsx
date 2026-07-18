"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    animate,
} from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const useIsStaticRenderer = () => false;

export default function UserCursor(props = {}) {
    const { theme } = useTheme();

    const defaultProps = {
        color: "var(--accent-gold)", // Vermilion Gold
        size: 31,
        pressScale: 0.85,
        offsetX: 0,
        offsetY: 0,
        showLabel: true,
        name: "vermilion",
        textColor: theme === "light" ? "#FFFFFF" : "#000000",
        labelTiltStrength: 25,
        labelOffsetUseDefault: true,
        labelOffsetX: 25,
        labelOffsetY: 12,
    };

    const {
        name,
        arrow,
        label,
        color,
        textColor,
        size,
        labelTiltStrength,
        showLabel,
        offsetX,
        offsetY,
        labelOffsetX,
        labelOffsetY,
        labelOffsetUseDefault,
        pressScale,
        classNames,
        offset: offsetOverride,
        labelOffset: labelOffsetOverride,
        style,
    } = { ...defaultProps, ...props };

    const fullScreen = true;
    const hideOnTouch = true;
    const zIndex = 9999;

    const isStatic = useIsStaticRenderer();

    const [isTouchDevice, setIsTouchDevice] = useState(false);
    useEffect(() => {
        if (!hideOnTouch) {
            setIsTouchDevice(false);
            return;
        }
        if (typeof window === "undefined" || !window.matchMedia) return;
        const mql = window.matchMedia("(pointer: coarse)");
        const sync = () => setIsTouchDevice(!!mql.matches);
        sync();
        if (mql.addEventListener) {
            mql.addEventListener("change", sync);
            return () => mql.removeEventListener("change", sync);
        }
        const legacy = mql;
        legacy.addListener?.(sync);
        return () => legacy.removeListener?.(sync);
    }, [hideOnTouch]);

    const [hovering, setHovering] = useState(false);
    const [pressed, setPressed] = useState(false);

    const labelSpringCfg = useMemo(() => ({ stiffness: 500, damping: 28, mass: 0.4 }), []);

    const resolvedOffset = useMemo(
        () => ({
            x: offsetOverride?.x ?? offsetX,
            y: offsetOverride?.y ?? offsetY,
        }),
        [offsetOverride?.x, offsetOverride?.y, offsetX, offsetY]
    );

    const resolvedLabelOffset = useMemo(() => {
        if (labelOffsetOverride) {
            return {
                x: labelOffsetOverride.x ?? size * 0.9,
                y: labelOffsetOverride.y ?? size * 0.2 + 6,
            };
        }
        if (labelOffsetUseDefault) {
            return { x: size * 0.9, y: size * 0.2 + 6 };
        }
        return { x: labelOffsetX, y: labelOffsetY };
    }, [
        labelOffsetOverride?.x,
        labelOffsetOverride?.y,
        labelOffsetUseDefault,
        labelOffsetX,
        labelOffsetY,
        size,
    ]);

    const mouseX = useMotionValue(-9999);
    const mouseY = useMotionValue(-9999);

    // Make the arrow track instantly without spring lag
    const arrowX = mouseX;
    const arrowY = mouseY;
    // Label trails slightly but much faster now
    const labelX = useSpring(mouseX, labelSpringCfg);
    const labelY = useSpring(mouseY, labelSpringCfg);

    const scaleMV = useMotionValue(1);
    useEffect(() => {
        const controls = animate(scaleMV, pressed ? pressScale : 1, {
            type: "spring",
            stiffness: 500,
            damping: 28,
            mass: 0.5,
        });
        return () => controls.stop();
    }, [pressed, pressScale, scaleMV]);

    const labelTiltTarget = useMotionValue(0);
    const labelRotation = useSpring(labelTiltTarget, {
        stiffness: 200,
        damping: 24,
        mass: 0.6,
    });

    const lastSampleRef = useRef(null);

    useEffect(() => {
        if (isStatic || isTouchDevice) return;
        if (typeof window === "undefined") return;

        // Hide default cursor on document body
        document.body.style.cursor = "none";
        
        // Ensure all interactive elements keep hiding cursor
        const styleEl = document.createElement("style");
        styleEl.innerHTML = `* { cursor: none !important; }`;
        document.head.appendChild(styleEl);

        const onMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;

            const now = typeof performance !== "undefined" ? performance.now() : Date.now();
            const last = lastSampleRef.current;
            let vx = 0;
            let vy = 0;
            if (last) {
                const dt = Math.max(1, now - last.t);
                vx = ((x - last.x) / dt) * 1000;
                vy = ((y - last.y) / dt) * 1000;
            }
            lastSampleRef.current = { x, y, t: now };

            mouseX.set(x + resolvedOffset.x);
            mouseY.set(y + resolvedOffset.y);

            const speed = Math.hypot(vx, vy);
            const norm = Math.min(1, speed / 1500);
            const sign = vx === 0 ? 0 : vx > 0 ? 1 : -1;
            labelTiltTarget.set(sign * norm * labelTiltStrength);

            setHovering(true);
        };

        const onDown = () => setPressed(true);
        const onUp = () => setPressed(false);
        const onLeave = () => setHovering(false);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        document.addEventListener("mouseleave", onLeave);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            document.removeEventListener("mouseleave", onLeave);
            
            document.body.style.cursor = "";
            document.head.removeChild(styleEl);
            setPressed(false);
        };
    }, [
        isStatic,
        isTouchDevice,
        labelTiltStrength,
        resolvedOffset.x,
        resolvedOffset.y,
        mouseX,
        mouseY,
        labelTiltTarget,
    ]);

    const visible = useMemo(() => {
        if (isStatic) return true;
        if (isTouchDevice) return false;
        return hovering;
    }, [isStatic, isTouchDevice, hovering]);

    const labelTranslateX = useTransform(labelX, (v) => v + resolvedLabelOffset.x);
    const labelTranslateY = useTransform(labelY, (v) => v + resolvedLabelOffset.y);

    const arrowContent = useMemo(() => {
        if (typeof arrow === "function") {
            try {
                return arrow(color);
            } catch {
                return null;
            }
        }
        if (arrow !== undefined && arrow !== null) return arrow;
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block", overflow: "visible" }}
            >
                <path
                    d="M5 3 L23 14 L14 16 L11 24 Z"
                    fill={color}
                    stroke="rgba(0,0,0,0.18)"
                    strokeWidth={0.6}
                    strokeLinejoin="round"
                />
            </svg>
        );
    }, [arrow, color, size]);

    const labelContent = useMemo(() => {
        if (label !== undefined && label !== null) return label;
        return (
            <div
                className={classNames?.labelText}
                style={{
                    color: textColor,
                    fontSize: Math.max(7, size * 0.43),
                    lineHeight: 1.1,
                    fontWeight: 600,
                    fontFamily: 'var(--font-display), system-ui, sans-serif',
                    whiteSpace: "nowrap",
                    letterSpacing: 0.1,
                }}
            >
                {name}
            </div>
        );
    }, [label, name, textColor, size, classNames?.labelText]);

    if (isTouchDevice) return null;

    const layerStyle = {
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex,
    };

    return (
        <CursorLayer
            layerStyle={layerStyle}
            visible={visible}
            arrowX={arrowX}
            arrowY={arrowY}
            labelX={labelTranslateX}
            labelY={labelTranslateY}
            labelRotation={labelRotation}
            scale={scaleMV}
            showLabel={showLabel}
            color={color}
            size={size}
            arrowContent={arrowContent}
            labelContent={labelContent}
            classNames={classNames}
        />
    );
}

function CursorLayer(props) {
    const {
        layerStyle,
        visible,
        arrowX,
        arrowY,
        labelX,
        labelY,
        labelRotation,
        scale,
        showLabel,
        color,
        size,
        arrowContent,
        labelContent,
        classNames,
    } = props;

    return (
        <div style={layerStyle}>
            {showLabel && (
                <motion.div
                    className={classNames?.label}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        x: labelX,
                        y: labelY,
                        rotate: labelRotation,
                        scale,
                        background: color,
                        borderRadius: 999,
                        padding: `${size * 0.18}px ${size * 0.36}px`,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
                        opacity: visible ? 1 : 0,
                        transformOrigin: "0% 50%",
                        userSelect: "none",
                        pointerEvents: "none",
                    }}
                >
                    {labelContent}
                </motion.div>
            )}

            <motion.div
                className={classNames?.cursor}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    x: arrowX,
                    y: arrowY,
                    scale,
                    width: size,
                    height: size,
                    opacity: visible ? 1 : 0,
                    transformOrigin: "0% 0%",
                    pointerEvents: "none",
                }}
            >
                <div
                    className={classNames?.arrow}
                    style={{ width: size, height: size }}
                >
                    {arrowContent}
                </div>
            </motion.div>
        </div>
    );
}
