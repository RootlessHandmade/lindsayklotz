import { SVGProps } from 'react'

export default function BlogIcon(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...svgProps}
    >
      <path d="M6 3.5h6.25c2.1 0 3.75 1.65 3.75 3.75V16H6.75A2.75 2.75 0 0 0 4 18.75V6.25C4 4.75 5.25 3.5 6.75 3.5z" />
      <path d="M6.5 7h6" />
      <path d="M6.5 10h6" />
      <path d="M6.5 13h3.75" />
    </svg>
  )
}

