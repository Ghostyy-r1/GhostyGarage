
import { motion } from 'framer-motion';

export function GhostSvg({ size = 40, className = '' }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C7.58172 2 4 5.58172 4 10V17.5C4 17.5 4.5 22 8.5 22C11 22 11.5 20 12 20C12.5 20 13 22 15.5 22C19.5 22 20 17.5 20 17.5V10C20 5.58172 16.4183 2 12 2Z"
        fill="currentColor"
        filter="url(#glow)"
      />
      <path
        d="M9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z"
        fill="#000000"
      />
      <path
        d="M17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11Z"
        fill="#000000"
      />
      <path
        d="M9.5 14.5C10.5 15.5 13.5 15.5 14.5 14.5"
        stroke="#000000"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </motion.svg>
  );
}
