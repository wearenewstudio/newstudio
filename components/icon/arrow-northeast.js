import { forwardRef } from 'react'

const IconArrowNortheast = forwardRef((props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="7 7 10 10"
    ref={ref}
    {...props}
  >
    <g>
      <path
        id="Vector"
        d="M8 16L16 8M16 8H10M16 8V14"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
))

export default IconArrowNortheast
