"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { siteConfig } from "@/lib/site-config";

type GlobeProps = {
  /** Rotation speed in radians per frame. 0 = locked. Default 0.005. */
  rotationSpeed?: number;
  /** Lock the globe so Targoviste sits dead-center facing the viewer. */
  locked?: boolean;
  className?: string;
};

/**
 * cobe-powered 3D globe centered on the seminary's coordinates.
 * Lightweight (single canvas, ~6KB lib) and runs in the browser only.
 */
export function Globe({
  rotationSpeed = 0.005,
  locked = false,
  className,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert seminary lng to the phi offset that brings it to the front.
    // cobe rotates around the y-axis; phi = -lng (in radians) faces that longitude.
    const targetPhi = -(siteConfig.geo.lng * Math.PI) / 180;

    let phi = locked ? targetPhi : targetPhi - Math.PI / 2;
    let animationFrame = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = canvas.offsetWidth || 600;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi,
      theta: 0.28,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5.5,
      baseColor: [0.97, 0.94, 0.86],
      markerColor: [0.78, 0.63, 0.31],
      glowColor: [0.96, 0.88, 0.65],
      markers: [
        { location: [siteConfig.geo.lat, siteConfig.geo.lng], size: 0.09 },
      ],
    });

    // Manual animation loop — cobe v2 exposes update() instead of onRender.
    const tick = () => {
      if (!locked) {
        phi += rotationSpeed;
        globe.update({ phi });
      }
      animationFrame = requestAnimationFrame(tick);
    };
    animationFrame = requestAnimationFrame(tick);

    canvas.style.opacity = "1";

    return () => {
      cancelAnimationFrame(animationFrame);
      globe.destroy();
    };
  }, [locked, rotationSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: "1 / 1",
        opacity: 0,
        transition: "opacity 700ms var(--ease-soft)",
        contain: "layout paint",
      }}
      aria-hidden="true"
    />
  );
}
