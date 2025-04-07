
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
        d="M12 2C7.58172 2 4 5.58172 4 10V17.5C4 19.9853 6.01472 22 8.5 22C9.82986 22 11.0075 21.3652 11.7578 20.3662C11.9012 20.1886 12.0988 20.1886 12.2422 20.3662C12.9925 21.3652 14.1701 22 15.5 22C17.9853 22 20 19.9853 20 17.5V10C20 5.58172 16.4183 2 12 2Z"
        fill="currentColor"
        filter="url(#glow)"
      />
      <ellipse cx="9" cy="10" rx="2" ry="1.8" fill="#000000" />
      <ellipse cx="15" cy="10" rx="2" ry="1.8" fill="#000000" />
      <path
        d="M8 14C8.5 15 10 16 12 16C14 16 15.5 15 16 14"
        stroke="#000000"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </motion.svg>
  );
}
