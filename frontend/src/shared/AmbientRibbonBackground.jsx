import React, { useEffect, useRef } from 'react';

/**
 * AmbientRibbonBackground
 * 3D Flowing Light Ribbon Canvas Engine adapted for Mini Trello (KB Task Board)
 * - Supports both Dark (Obsidian & Forest) and Light (Verdant Signal)
 * - Organic boundary fade: ribbons dissolve into background
 * - Mouse parallax responsiveness
 * - High performance: automatic pause when tab is hidden or prefers-reduced-motion
 */
export default function AmbientRibbonBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * DPR));
      canvas.height = Math.max(1, Math.floor(height * DPR));
    }

    let currentScrollP = 0;
    let targetScrollP = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    function calculateTargetScroll() {
      const docHeight =
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        ) - window.innerHeight;
      targetScrollP =
        docHeight > 0
          ? Math.min(Math.max(window.scrollY / docHeight, 0), 1)
          : 0;
    }

    function getActiveTheme() {
      return document.documentElement.dataset.theme === 'light' ||
        document.documentElement.getAttribute('data-theme') === 'light'
        ? 'light'
        : 'dark';
    }

    const THEME_PALETTES = {
      dark: {
        bgFill: '#0E1111',
        bundles: [
          {
            strands: 28,
            baseColor: { r: 66, g: 148, b: 106 }, // Forest green (#42946A)
            highlightColor: { r: 167, g: 243, b: 208 }, // Mint highlight (#A7F3D0)
            goldColor: { r: 230, g: 185, b: 115 }, // Warm champagne gold
            baseAlpha: 0.75,
            speed: 0.0007,
            twistSpeed: 0.0012,
            spread: 90,
            phaseOffset: 0,
            scrollPartDirection: 1,
          },
          {
            strands: 22,
            baseColor: { r: 42, g: 118, b: 82 }, // Deep emerald
            highlightColor: { r: 110, g: 231, b: 183 },
            goldColor: { r: 207, g: 163, b: 99 },
            baseAlpha: 0.65,
            speed: 0.0005,
            twistSpeed: 0.0009,
            spread: 110,
            phaseOffset: 1.8,
            scrollPartDirection: -1,
          },
          {
            strands: 16,
            baseColor: { r: 52, g: 130, b: 90 },
            highlightColor: { r: 207, g: 163, b: 99 },
            goldColor: { r: 220, g: 175, b: 105 },
            baseAlpha: 0.50,
            speed: 0.0004,
            twistSpeed: 0.0006,
            spread: 130,
            phaseOffset: 3.5,
            scrollPartDirection: 1.2,
          },
        ],
      },
      light: {
        bgFill: '#F6F8F5',
        bundles: [
          {
            strands: 28,
            baseColor: { r: 28, g: 100, b: 68 }, // Deep botanical conifer
            highlightColor: { r: 45, g: 135, b: 92 }, // Crisp sage-emerald
            goldColor: { r: 180, g: 130, b: 50 }, // Warm amber
            baseAlpha: 0.50,
            speed: 0.0007,
            twistSpeed: 0.0012,
            spread: 90,
            phaseOffset: 0,
            scrollPartDirection: 1,
          },
          {
            strands: 22,
            baseColor: { r: 35, g: 110, b: 76 },
            highlightColor: { r: 55, g: 145, b: 102 },
            goldColor: { r: 165, g: 120, b: 45 },
            baseAlpha: 0.42,
            speed: 0.0005,
            twistSpeed: 0.0009,
            spread: 110,
            phaseOffset: 1.8,
            scrollPartDirection: -1,
          },
          {
            strands: 16,
            baseColor: { r: 50, g: 125, b: 88 },
            highlightColor: { r: 180, g: 130, b: 50 },
            goldColor: { r: 170, g: 125, b: 48 },
            baseAlpha: 0.35,
            speed: 0.0004,
            twistSpeed: 0.0006,
            spread: 130,
            phaseOffset: 3.5,
            scrollPartDirection: 1.2,
          },
        ],
      },
    };

    function getRibbonPoint(bundleIndex, t, time, scrollP, mX, mY) {
      const p = t;
      const partShift = scrollP * 0.75;
      const scrollSpread = 1 + scrollP * 0.45;

      if (bundleIndex === 0) {
        const outwardX = partShift * 1.1;
        const x3d =
          ((p - 0.48) * 2.8 + outwardX) * scrollSpread +
          Math.sin(time * 0.45 + p * 3.2) * 0.22 +
          mX * 0.16;
        const y3d =
          Math.sin(p * Math.PI * 1.15 + 0.25) * 0.95 -
          0.1 +
          Math.cos(time * 0.35 + p * 2.6) * 0.15 -
          scrollP * 0.55 +
          mY * 0.14;
        const z3d = 1.0 + Math.sin(p * Math.PI + time * 0.55) * 0.45 + scrollP * 0.25;
        return { x: x3d, y: y3d, z: z3d };
      } else if (bundleIndex === 1) {
        const outwardX = -partShift * 1.15;
        const x3d =
          ((p - 0.45) * 3.0 + outwardX) * scrollSpread -
          Math.cos(time * 0.38 + p * 2.9) * 0.18 +
          mX * 0.12;
        const y3d =
          Math.sin(p * Math.PI * 1.25 + 0.1) * 1.05 -
          0.05 +
          Math.sin(time * 0.28 + p * 2.3) * 0.12 -
          scrollP * 0.65 +
          mY * 0.1;
        const z3d = 0.8 + Math.cos(p * Math.PI * 1.2 + time * 0.45) * 0.38 + scrollP * 0.2;
        return { x: x3d, y: y3d, z: z3d };
      } else {
        const outwardX = partShift * 0.65;
        const x3d =
          ((p - 0.52) * 3.2 + outwardX) * scrollSpread +
          Math.sin(time * 0.3 + p * 2.1) * 0.24 +
          mX * 0.08;
        const y3d =
          Math.sin(p * Math.PI + 0.45) * 1.15 -
          0.16 +
          Math.cos(time * 0.22 + p * 1.9) * 0.16 -
          scrollP * 0.75 +
          mY * 0.06;
        const z3d = 0.58 + Math.sin(p * Math.PI * 0.9 + time * 0.35) * 0.28;
        return { x: x3d, y: y3d, z: z3d };
      }
    }

    function renderScene(time = 0, scrollP = 0, mX = 0, mY = 0) {
      const cw = canvas.width;
      const ch = canvas.height;
      const centerX = cw * 0.5;
      const centerY = ch * 0.5;
      const scale = Math.min(cw, ch) * 0.78;

      const theme = getActiveTheme();
      const palette = THEME_PALETTES[theme] || THEME_PALETTES.dark;

      ctx.fillStyle = palette.bgFill;
      ctx.fillRect(0, 0, cw, ch);

      const ribbonVisibility = Math.max(0.35, 1 - scrollP * 0.75);
      ctx.globalCompositeOperation = theme === 'dark' ? 'screen' : 'source-over';

      const numSamples = 65;
      const tStart = -0.25;
      const tEnd = 1.25;
      const tSpan = tEnd - tStart;

      for (let b = 0; b < palette.bundles.length; b++) {
        const bundle = palette.bundles[b];
        const bundleAlpha = bundle.baseAlpha * ribbonVisibility;
        const strands = bundle.strands;
        const spread = bundle.spread * (cw / 1440);

        for (let s = 0; s < strands; s++) {
          const strandRatio = s / (strands - 1);
          const strandOffset = (strandRatio - 0.5) * spread;

          const isHighlight = s % 4 === 0;
          const isGold = s % 6 === 0;
          const color = isGold
            ? bundle.goldColor
            : isHighlight
            ? bundle.highlightColor
            : bundle.baseColor;

          const alphaMultiplier =
            theme === 'dark'
              ? isHighlight
                ? 0.95
                : isGold
                ? 0.85
                : 0.62
              : isHighlight
              ? 0.68
              : isGold
              ? 0.6
              : 0.4;
          const strandAlpha = alphaMultiplier * bundleAlpha;
          const lineWidth = (isHighlight ? 2.6 : isGold ? 1.9 : 1.3) * DPR;

          ctx.beginPath();
          let isFirstPoint = true;

          for (let i = 0; i <= numSamples; i++) {
            const t = tStart + (i / numSamples) * tSpan;
            const curvePt = getRibbonPoint(b, t, time * bundle.speed, scrollP, mX, mY);

            const twistAngle =
              time * bundle.twistSpeed + t * Math.PI * 4 + bundle.phaseOffset;
            const twistOffsetX = Math.cos(twistAngle) * strandOffset;
            const twistOffsetY = Math.sin(twistAngle) * strandOffset;

            const z = Math.max(0.2, curvePt.z);
            const persp = 1 / z;

            const screenX = centerX + (curvePt.x * scale + twistOffsetX) * persp;
            const screenY = centerY + (curvePt.y * scale + twistOffsetY) * persp;

            if (isFirstPoint) {
              ctx.moveTo(screenX, screenY);
              isFirstPoint = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          }

          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${strandAlpha.toFixed(3)})`;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }

      // Vignette gradient at edges
      const vignetteGrad = ctx.createLinearGradient(0, ch * 0.7, 0, ch);
      const vignetteColor = theme === 'dark' ? '14, 17, 17' : '246, 248, 245';
      vignetteGrad.addColorStop(0, `rgba(${vignetteColor}, 0)`);
      vignetteGrad.addColorStop(1, `rgba(${vignetteColor}, 0.90)`);

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, ch * 0.7, cw, ch * 0.3);
    }

    let animationFrameId = null;
    let isRunning = false;
    let startTime = performance.now();

    function loop(now) {
      if (!isRunning) return;

      const diffScroll = targetScrollP - currentScrollP;
      currentScrollP += diffScroll * 0.07;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const elapsed = now - startTime;
      renderScene(elapsed, currentScrollP, mouseX, mouseY);

      animationFrameId = requestAnimationFrame(loop);
    }

    function start() {
      if (isRunning) return;
      if (isReducedMotion) {
        renderScene(1200, targetScrollP, 0, 0);
        return;
      }
      isRunning = true;
      startTime = performance.now();
      animationFrameId = requestAnimationFrame(loop);
    }

    function stop() {
      if (!isRunning) return;
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    function onScroll() {
      calculateTargetScroll();
      if (isReducedMotion) renderScene(1200, targetScrollP, 0, 0);
    }

    function onMouseMove(e) {
      if (isReducedMotion) return;
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function handleThemeChange() {
      resize();
      if (isReducedMotion) renderScene(1200, targetScrollP, 0, 0);
    }

    resize();
    calculateTargetScroll();
    currentScrollP = targetScrollP;
    start();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', () => {
      resize();
      calculateTargetScroll();
      if (isReducedMotion) renderScene(1200, targetScrollP, 0, 0);
    }, { passive: true });

    window.addEventListener('themechange', handleThemeChange);
    window.addEventListener('gds-theme-change', handleThemeChange);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      stop();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('themechange', handleThemeChange);
      window.removeEventListener('gds-theme-change', handleThemeChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <div
      className="ambient-gradient-wrapper fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="ambient-ribbon-canvas block absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
