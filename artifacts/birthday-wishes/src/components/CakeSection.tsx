import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CAKE_SVG = `<svg id="cake" version="1.1" x="0px" y="0px" width="200px" height="500px" viewBox="0 0 200 500" enable-background="new 0 0 200 500" xml:space="preserve">
    <path fill="#a88679" d="M173.667-13.94c-49.298,0-102.782,0-147.334,0c-3.999,0-4-16.002,0-16.002
c44.697,0,96.586,0,147.334,0C177.667-29.942,177.668-13.94,173.667-13.94z">
        <animate id="bizcocho_3" attributeName="d" calcMode="spline" keySplines="0 0 1 1; 0 0 1 1" begin="relleno_2.end" dur="0.3s" fill="freeze" values="
                          M173.667-13.94c-49.298,0-102.782,0-147.334,0c-3.999,0-4-16.002,0-16.002
c44.697,0,96.586,0,147.334,0C177.667-29.942,177.668-13.94,173.667-13.94z
                          ;
                          M173.667,411.567c-47.995,12.408-102.955,12.561-147.334,0
c-3.848-1.089-0.189-16.089,3.661-15.002c44.836,12.66,90.519,12.753,139.427,0.07
C173.293,395.631,177.541,410.566,173.667,411.567z
                          ;
                          M173.667,427.569c-49.795,0-101.101,0-147.334,0c-3.999,0-4-16.002,0-16.002
c46.385,0,97.539,0,147.334,0C177.668,411.567,177.667,427.569,173.667,427.569z
                          " />
    </path>
    <path fill="#8b6a60" d="M100-178.521c1.858,0,3.364,1.506,3.364,3.363c0,0,0,33.17,0,44.227
c0,19.144,0,57.431,0,76.574c0,10.152,0,40.607,0,40.607c0,1.858-1.506,3.364-3.364,3.364l0,0c-1.858,0-3.364-1.506-3.364-3.364c0,0,0-30.455,0-40.607c0-19.144,0-57.432,0-76.575c0-11.057,0-44.226,0-44.226C96.636-177.015,98.142-178.521,100-178.521
L100-178.521z">
        <animate id="relleno_2" attributeName="d" calcMode="spline" keySplines="0 0 1 1; 0 0 1 1; 0 0 0.58 1" begin="bizcocho_2.end" dur="0.5s" fill="freeze" values="
                          M100-178.521c1.858,0,3.364,1.506,3.364,3.363c0,0,0,33.17,0,44.227
c0,19.144,0,57.431,0,76.574c0,10.152,0,40.607,0,40.607c0,1.858-1.506,3.364-3.364,3.364l0,0c-1.858,0-3.364-1.506-3.364-3.364c0,0,0-30.455,0-40.607c0-19.144,0-57.432,0-76.575c0-11.057,0-44.226,0-44.226C96.636-177.015,98.142-178.521,100-178.521
L100-178.521z
                          ;
                          M100,267.257c1.858,0,3.364,1.506,3.364,3.363c0,0,0,33.17,0,44.227
c0,19.143,0,57.43,0,76.574c0,10.151,0,40.606,0,40.606c0,1.858-1.506,3.364-3.364,3.364l0,0c-1.858,0-3.364-1.506-3.364-3.364
c0,0,0-30.455,0-40.606c0-19.145,0-57.432,0-76.576c0-11.057,0-44.225,0-44.225C96.636,268.763,98.142,267.257,100,267.257
L100,267.257z
                          ;
                          M93.928,405.433c-0.655,6.444-0.102,9.067,2.957,11.798c0,0,8.083,5.571,16.828,3.503
c18.629-4.406,43.813,6.194,50.792,7.791c14.75,3.375,9.162,6.867,9.162,6.867c-2.412,2.258-58.328,0-73.667,0l0,0
c-1.858,0-69.995,2.133-73.667,0c0,0-3.337-2.439,6.172-5.992c11.375-4.25,52.875,8.822,47.139-9.442
c-6.333-20.167,5.226-21.514,5.226-21.514c3.435-0.915,12.78-6.663,10.923-0.546L93.928,405.433z
                          ;
                          M102.242,427.569c5.348,0,14.079,0,17.462,0c0,0,17.026,0,27.504,0
c19.143,0,20.39-3.797,26.459,0c3,1.877,0,7.823,0,7.823c-2.412,2.258-58.328,0-73.667,0l0,0c-1.858,0-67.187,0-73.667,0
c0,0-4.125-4.983,0-7.823c5.201-3.58,16.085,0,23.725,0c8.841,0,20.762,0,20.762,0c3.686,0,8.597,0,19.511,0H102.242z
                          " />
    </path>
    <path fill="#a88679" d="M173.667-15.929c-46.512,0-105.486,0-147.334,0c-3.999,0-4-16.002,0-16.002
c43.566,0,97.96,0,147.334,0C177.667-31.931,177.666-15.929,173.667-15.929z">
        <animate id="bizcocho_2" attributeName="d" calcMode="spline" keySplines="0 0 1 1; 0 0 1 1; 0.25 0 0.58 1" begin="relleno_1.end" dur="0.5s" fill="freeze" values="
                          M173.667-15.929c-46.512,0-105.486,0-147.334,0c-3.999,0-4-16.002,0-16.002
c43.566,0,97.96,0,147.334,0C177.667-31.931,177.666-15.929,173.667-15.929z
                          ;
                          M173.434,445.393c-47.269,8.001-105.245,8.001-147.334,0c-3.929-0.747-0.692-16.543,3.243-15.824
c43.828,8.001,92.165,8.001,140.739,0C174.029,428.918,177.377,444.726,173.434,445.393z
                          ;
                          M173.667,461.569c-49.795,0-101.101,0-147.334,0c-3.999,0-4-16.002,0-16.002
c46.385,0,97.539,0,147.334,0C177.668,445.567,177.667,461.569,173.667,461.569z
                          " />
    </path>
    <path fill="#8b6a60" d="M100-178.521c1.858,0,3.364,1.506,3.364,3.363c0,0,0,33.17,0,44.227
c0,19.144,0,57.431,0,76.574c0,10.152,0,40.607,0,40.607c0,1.858-1.506,3.364-3.364,3.364l0,0c-1.858,0-3.364-1.506-3.364-3.364c0,0,0-30.455,0-40.607c0-19.144,0-57.432,0-76.575c0-11.057,0-44.226,0-44.226C96.636-177.015,98.142-178.521,100-178.521
L100-178.521z">
        <animate id="relleno_1" attributeName="d" calcMode="spline" keySplines="0 0 1 1; 0 0 1 1; 0 0 0.58 1" begin="bizcocho_1.end" dur="0.5s" fill="freeze" values="
                          M100-178.521c1.858,0,3.364,1.506,3.364,3.363c0,0,0,33.17,0,44.227
c0,19.144,0,57.431,0,76.574c0,10.152,0,40.607,0,40.607c0,1.858-1.506,3.364-3.364,3.364l0,0c-1.858,0-3.364-1.506-3.364-3.364c0,0,0-30.455,0-40.607c0-19.144,0-57.432,0-76.575c0-11.057,0-44.226,0-44.226C96.636-177.015,98.142-178.521,100-178.521
L100-178.521z
                          ;
                          M100,267.257c1.858,0,3.364,1.506,3.364,3.363c0,0,0,33.17,0,44.227
c0,19.143,0,57.43,0,76.574c0,10.151,0,40.606,0,40.606c0,1.858-1.506,3.364-3.364,3.364l0,0c-1.858,0-3.364-1.506-3.364-3.364
c0,0,0-30.455,0-40.606c0-19.145,0-57.432,0-76.576c0-11.057,0-44.225,0-44.225C96.636,268.763,98.142,267.257,100,267.257
L100,267.257z
                          ;
                          M93.928,405.433c-0.655,6.444-0.102,9.067,2.957,11.798c0,0,8.083,5.571,16.828,3.503
c18.629-4.406,43.813,6.194,50.792,7.791c14.75,3.375,9.162,6.867,9.162,6.867c-2.412,2.258-58.328,0-73.667,0l0,0
c-1.858,0-69.995,2.133-73.667,0c0,0-3.337-2.439,6.172-5.992c11.375-4.25,52.875,8.822,47.139-9.442
c-6.333-20.167,5.226-21.514,5.226-21.514c3.435-0.915,12.78-6.663,10.923-0.546L93.928,405.433z
                          ;
                          M102.242,461.569c5.348,0,14.079,0,17.462,0c0,0,17.026,0,27.504,0
c19.143,0,20.39-3.797,26.459,0c3,1.877,0,7.823,0,7.823c-2.412,2.258-58.328,0-73.667,0l0,0c-1.858,0-67.187,0-73.667,0
c0,0-4.125-4.983,0-7.823c5.201-3.58,16.085,0,23.725,0c8.841,0,20.762,0,20.762,0c3.686,0,8.597,0,19.511,0H102.242z
                          " />
    </path>
    <path fill="#c8a09a" d="M173.667-31.929c-49.298,0-102.782,0-147.334,0c-3.999,0-4-16.002,0-16.002
c44.697,0,96.586,0,147.334,0C177.667-47.931,177.668-31.929,173.667-31.929z">
        <animate id="bizcocho_1" attributeName="d" calcMode="spline" keySplines="0 0 1 1; 0 0 1 1" begin="2s" dur="0.5s" fill="freeze" values="
                          M173.667-31.929c-49.298,0-102.782,0-147.334,0c-3.999,0-4-16.002,0-16.002
c44.697,0,96.586,0,147.334,0C177.667-47.931,177.668-31.929,173.667-31.929z
                          ;
                          M173.667,461.567c-49.795,0-101.101,0-147.334,0c-3.999,0-4-16.002,0-16.002
c46.385,0,97.539,0,147.334,0C177.668,445.565,177.667,461.567,173.667,461.567z
                          ;
                          M173.667,477.569c-49.795,0-101.101,0-147.334,0c-3.999,0-4-16.002,0-16.002
c46.385,0,97.539,0,147.334,0C177.668,461.567,177.667,477.569,173.667,477.569z
                          " />
    </path>
    <path fill="#c8a09a" d="M95.188,113.216c0-3.119,2.164-5.67,4.812-5.67c2.646,0,4.812,2.551,4.812,5.67
c0,5.594,0,16.782,0,22.375c0,5.143,0,15.427,0,20.568c0,7.332,0,21.997,0,29.33c0,5.522,0,16.568,0,22.092
c0,3.295,0,9.885,0,13.181c0,3.118-2.165,5.669-4.812,5.669c-2.648,0-4.812-2.551-4.812-5.669c0-3.248,0-9.743,0-12.991
c0-5.428,0-16.283,0-21.711c0-7.618,0-22.854,0-30.473c0-4.951,0-14.854,0-19.807C95.188,130.141,95.188,118.857,95.188,113.216z">
        <animate id="crema" attributeName="d" calcMode="spline" keySplines="0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 0.58 1" begin="bizcocho_3.end" dur="2s" fill="freeze" values="
                          M95.188,113.216c0-3.119,2.164-5.67,4.812-5.67c2.646,0,4.812,2.551,4.812,5.67
c0,5.594,0,16.782,0,22.375c0,5.143,0,15.427,0,20.568c0,7.332,0,21.997,0,29.33c0,5.522,0,16.568,0,22.092
c0,3.295,0,9.885,0,13.181c0,3.118-2.165,5.669-4.812,5.669c-2.648,0-4.812-2.551-4.812-5.669c0-3.248,0-9.743,0-12.991
c0-5.428,0-16.283,0-21.711c0-7.618,0-22.854,0-30.473c0-4.951,0-14.854,0-19.807C95.188,130.141,95.188,118.857,95.188,113.216z
                          ;
                          M95.188,0c0-3.119,2.164-5.67,4.812-5.67c2.646,0,4.812,2.551,4.812,5.67
c0,5.594,0,16.782,0,22.375c0,5.143,0,15.427,0,20.568c0,7.333,0,21.998,0,29.33c0,5.523,0,16.569,0,22.092
c0,3.295,0,9.885,0,13.181c0,3.118-2.165,5.669-4.812,5.669c-2.648,0-4.812-2.551-4.812-5.669c0-3.248,0-9.743,0-12.991
c0-5.428,0-16.284,0-21.711c0-7.618,0-22.854,0-30.472c0-4.952,0-14.854,0-19.807C95.188,16.925,95.188,5.641,95.188,0z
                          ;
                          M104.812,113.216c0,3.119-2.164,5.67-4.812,5.67c-2.646,0-4.812-2.551-4.812-5.67c0-5.594,0-16.782,0-22.375
c0-5.143,0-15.427,0-20.568c0-7.332,0-21.997,0-29.33c0-5.522,0-16.568,0-22.092c0-3.295,0-9.885,0-13.181
c0-3.118,2.165-5.669,4.812-5.669c2.648,0,4.812,2.551,4.812,5.669c0,3.248,0,9.743,0,12.991c0,5.428,0,16.284,0,21.711
c0,7.618,0,22.854,0,30.472c0,4.952,0,14.854,0,19.807C104.812,96.292,104.812,107.576,104.812,113.216z
                          ;
                          M104.812,405.897c0,3.119-2.164,5.67-4.812,5.67c-2.646,0-4.812-2.551-4.812-5.67c0-5.594,0-16.782,0-22.376
c0-5.143,0-15.426,0-20.568c0-7.332,0-21.997,0-29.33c0-5.522,0-16.568,0-22.092c0-3.295,0-9.885,0-13.181
c0-3.118,2.165-5.669,4.812-5.669c2.648,0,4.812,2.551,4.812,5.669c0,3.247,0,9.743,0,12.991c0,5.428,0,16.283,0,21.711
c0,7.618,0,22.854,0,30.473c0,4.951,0,14.854,0,19.807C104.812,388.972,104.812,400.256,104.812,405.897z
                          ;
                          M111.873,411.567c-3.119,0-9.226,0-11.874,0c-2.646,0-7.748,0-10.867,0c-7.086,0-12.698,0-18.292,0
c-6.592,0-12.871,7.371-19.166,3.008c-10.043-6.961-7.776-10.169,2.991-17.745c12.61-8.873,27.713,1.994,25.919-7.531
c-2.589-13.742,11.008-14.513,11.365-17.789c0.441-4.051,4.235-11.107,8.051-8.175c3.113,2.393,1.007,8.008,0,13.159
c-1.871,9.569,8.058,2.113,9.494,14.155c2.592,21.732,21.184-0.675,29.309,7.976c5.216,5.553,18.413,5.552,15.426,12.942
c-3.131,7.745-15.825-4.369-23.8,2.903C126.261,418.271,118.301,411.567,111.873,411.567z
                          ;
                          M111.873,411.567c-3.119,0-9.226,0-11.874,0c-2.646,0-9.734,4.069-12.853,4.069
c-7.086,0-10.712-4.069-16.306-4.069c-6.592,0-12.12,6.013-19.166,3.008c-7.053-3.008-7.458,2.026-18.659,1.165
c-6.832-0.525-7.522-3.034-7.533-6.265c-0.037-10.336,22.073-2.452,36.613-2.628c10.234-0.124,19.856-1.439,37.905-2.102
c16.642-0.61,32.699,1.552,46.009,1.927c12.438,0.351,29.663-8.99,31.532,3.315c0.773,5.093-5.605,3.342-11.211,9.579
c-5.093,5.667-7.59-4.605-12.965-3.832c-8.269,1.189-14.962-8.537-22.937-1.265C126.261,418.271,118.301,411.567,111.873,411.567z
                          ;
                          M110.946,413.652c-2.904-1.137-8.405-2.748-12.446-0.97c-6.099,2.685-7.273,10.358-13.253,8.242
c-7.843-2.775-8.953-5.008-14.546-5.01c-24.653-0.011-4.849,26.507-18.264,26.507c-12.377,0,5.791-33.537-19.422-26.682
c-7.703,2.095-9.806-0.942-9.817-4.173c-0.037-10.336,24.357-4.544,38.897-4.72c10.234-0.124,19.856-1.439,37.905-2.102
c16.642-0.61,32.699,1.552,46.009,1.927c12.438,0.351,28.973-8.865,31.532,3.315c1.449,6.896,0.318,15.624-3.874,15.624
c-7.619,0-1.788-15.192-19.243-7.111c-7.581,3.51-15.963-9.738-26.669,1.066C120.644,426.744,118.381,416.561,110.946,413.652z
                          ;
                          M111.547,413.9c-2.969-0.956-8.775-0.949-13.167-0.5c-14.667,1.5-8.325,16.508-14.667,16.666
c-6.667,0.166-0.167-13.5-13.013-14.151c-30.471-1.545-5.572,46.651-18.987,46.651c-12.377,0,10.333-50.166-18.667-44.5
c-7.835,1.531-9.537-1.417-9.548-4.647c-0.037-10.336,23.675-5.177,38.215-5.353c10.234-0.124,20.618-1.671,38.667-2.333
c16.642-0.61,32.023,1.458,45.333,1.833c12.438,0.351,33.819-8.431,33.199,4.001c-0.532,10.666,0.414,26.166-5.245,25.833
c-7.606-0.447-2.954-31.5-19.243-18.899c-7.985,6.177-17.658-5.969-27.377,5.732C118.88,434.066,121.38,417.067,111.547,413.9z
                          ;
                          M111.547,415.233c-6.667-0.834-9.667,4.667-13.833,3.333c-19.649-6.291-8.158,22.176-14.5,22.334
c-6.667,0.166,2.833-18-13.333-22.167c-29.544-7.615-9.667,43.833-20.167,43.833c-10.333,0,8.004-55.006-16.833-39
c-7.5,4.833-9.508-3.78-9.299-7.004c0.799-12.329,23.592-7.153,38.132-7.329c10.234-0.124,20.238-1.505,38.287-2.167
c16.642-0.61,32.903,1.125,46.213,1.5c12.438,0.351,35.058-5.579,31.863,6.451c-5.532,20.833,1.25,28.216-4.409,27.883
c-7.606-0.447-6.058-37.895-20.62-23.333c-10.167,10.166-15.972-0.747-25,12C119.547,443.568,121.798,416.515,111.547,415.233z
                          " />
    </path>
    <rect x="10" y="475.571" fill="#fefae9" width="180" height="4" />
</svg>`;

const CAKE_CSS = `
  @keyframes cake-fire {
    0%, 100% {
      background: rgba(255, 220, 100, 0.85);
      box-shadow: 0 0 30px 8px rgba(255, 180, 60, 0.5), 0 0 60px 15px rgba(255, 120, 30, 0.2);
      transform: translateY(0) scale(1);
    }
    50% {
      background: rgba(255, 80, 10, 0.15);
      box-shadow: 0 0 50px 20px rgba(255, 160, 40, 0.3);
      transform: translateY(-18px) scale(0.05);
    }
  }
  @keyframes cake-candle-in {
    to { transform: translateY(0); }
  }
  @keyframes cake-glow-pulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.12); }
  }
  @keyframes cake-smoke {
    0% { opacity: 0.8; transform: translateY(0) scaleX(1); }
    100% { opacity: 0; transform: translateY(-60px) scaleX(2.5); }
  }
  @keyframes cake-sparkle-float {
    0% { opacity: 0; transform: translate(0, 0) scale(0); }
    20% { opacity: 1; transform: translate(var(--sx, 10px), -10px) scale(1); }
    100% { opacity: 0; transform: translate(var(--sx, 20px), -80px) scale(0.2); }
  }
`;

interface CakeSectionProps {
  wishMade: boolean;
  candlesBlown: boolean;
  onBlowCandles: () => void;
}

export default function CakeSection({ wishMade, candlesBlown, onBlowCandles }: CakeSectionProps) {
  const [showSmoke, setShowSmoke] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; sx: number; delay: number }[]>([]);
  const [svgKey, setSvgKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered) {
          setHasEntered(true);
          setSvgKey(k => k + 1);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasEntered]);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    onBlowCandles();
    setShowSmoke(true);
    const newSparkles = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 60 - 30,
      y: Math.random() * 20,
      sx: Math.random() * 60 - 30,
      delay: Math.random() * 0.5,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setShowSmoke(false), 2500);
    setTimeout(() => setSparkles([]), 3000);
  };

  return (
    <>
      <style>{CAKE_CSS}</style>
      <div ref={sectionRef} className="relative flex flex-col items-center justify-center">

        {/* Ambient glow beneath cake */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(235,145,175,0.18) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Cake wrapper — relative so candle can be positioned over SVG */}
        <div className="relative inline-block" style={{ width: 200, height: 320 }}>

          {/* SVG cake with SMIL animation — key forces remount on scroll-in */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: 200, height: 320, overflow: 'hidden' }}
            dangerouslySetInnerHTML={{ __html: `<div key="${svgKey}" style="width:200px;height:320px;overflow:hidden;position:relative;">${CAKE_SVG}</div>` }}
          />

          {/* Candle positioned over the cake (centered, near top of cake body) */}
          <div
            style={{
              position: 'absolute',
              top: 28,
              left: '50%',
              marginLeft: -3,
              width: 6,
              height: 38,
              background: 'linear-gradient(180deg, #fff 0%, #ffe8f0 40%, #d4a0b0 100%)',
              borderRadius: 4,
              boxShadow: candlesBlown ? 'none' : '0 0 8px 2px rgba(255,200,150,0.3)',
              zIndex: 10,
              transition: 'box-shadow 0.5s ease',
            }}
          >
            {/* Candle stripes */}
            <div style={{ position: 'absolute', top: '25%', left: 0, right: 0, height: 2, background: 'rgba(200,60,80,0.35)', borderRadius: 2 }} />
            <div style={{ position: 'absolute', top: '55%', left: 0, right: 0, height: 2, background: 'rgba(200,60,80,0.35)', borderRadius: 2 }} />

            {/* Flames (5 layered for realism) */}
            {!candlesBlown && [2, 1.5, 1, 0.5, 0.2].map((duration, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: -22,
                  left: '50%',
                  marginLeft: -4,
                  width: 8,
                  height: 22,
                  borderRadius: '50%',
                  animation: `cake-fire ${duration}s ${hasEntered ? '0s' : '999s'} infinite`,
                  zIndex: 20,
                }}
              />
            ))}

            {/* Smoke puff after blowing */}
            <AnimatePresence>
              {candlesBlown && showSmoke && (
                <>
                  {[0, 0.3, 0.6].map((delay, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.7, y: 0, scale: 0.4, x: 0 }}
                      animate={{ opacity: 0, y: -55, scale: 1.8 + i * 0.4, x: (i - 1) * 8 }}
                      exit={{}}
                      transition={{ duration: 1.8 + i * 0.3, delay, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: -16,
                        left: '50%',
                        marginLeft: -6,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.25)',
                        filter: 'blur(3px)',
                        pointerEvents: 'none',
                        zIndex: 30,
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Sparkles burst when candle blown */}
            {sparkles.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], x: s.x, y: -50 - s.y, scale: [0, 1, 0.3] }}
                transition={{ duration: 1.2, delay: s.delay, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: -10,
                  left: '50%',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: `hsl(${30 + Math.random() * 60}, 100%, 75%)`,
                  boxShadow: '0 0 6px 2px rgba(255,220,100,0.8)',
                  pointerEvents: 'none',
                  zIndex: 40,
                }}
              />
            ))}
          </div>

          {/* Golden glow around flame */}
          {!candlesBlown && (
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 2,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,210,80,0.5) 0%, transparent 70%)',
                filter: 'blur(8px)',
                pointerEvents: 'none',
                zIndex: 5,
              }}
            />
          )}
        </div>

        {/* Interactive button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <AnimatePresence mode="wait">
            {!candlesBlown ? (
              <motion.button
                key="blow"
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(6px)' }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(235,145,175,0.5)' }}
                whileTap={{ scale: 0.94 }}
                onClick={handleBlowCandles}
                className="relative px-10 py-4 rounded-full border border-primary/50 text-primary font-serif text-2xl tracking-wide overflow-hidden group"
                style={{ background: 'rgba(180,80,120,0.12)', backdropFilter: 'blur(12px)' }}
              >
                <span className="relative z-10">Blow out the candle</span>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'radial-gradient(circle at center, rgba(235,145,175,0.2), transparent)' }}
                  whileHover={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            ) : (
              <motion.div
                key="wish"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, rgba(251,191,36,0.8), rgba(235,145,175,0.8), rgba(251,191,36,0.8))',
                    filter: 'blur(1px)',
                    boxShadow: '0 0 30px rgba(251,191,36,0.6)',
                  }}
                />
                <p className="font-serif text-4xl text-primary drop-shadow-md">Your wish is on its way</p>
                <p className="text-lg font-light text-foreground/70 max-w-sm text-center leading-relaxed">
                  May it find you exactly when you need it most.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
