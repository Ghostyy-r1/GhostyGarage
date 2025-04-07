
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
      />
      <circle cx="9" cy="10" r="1.5" fill="#1a1a1a" />
      <circle cx="15" cy="10" r="1.5" fill="#1a1a1a" />
    </motion.svg>
  );
}
