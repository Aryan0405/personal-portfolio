'use client';

interface ExternalLinkButtonProps {
  href: string;
  label: string;
  className?: string;
  'aria-label'?: string;
}

export default function ExternalLinkButton({
  href,
  label,
  className,
  'aria-label': ariaLabel,
}: ExternalLinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-external ${className || ''}`.trim()}
      aria-label={ariaLabel || `${label}, opens in a new tab`}
    >
      <span className="btn-external-label">{label}</span>
      <svg
        viewBox="0 0 7 7"
        fill="currentColor"
        shape-rendering="crispEdges"
        aria-hidden="true"
        className="btn-external-arrow"
        style={{ width: '1.1em', height: '1.1em', minWidth: '12px', minHeight: '12px', display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      >
        <rect x="2" y="0" width="5" height="1" />
        <rect x="6" y="1" width="1" height="4" />
        <rect x="5" y="1" width="1" height="1" />
        <rect x="4" y="2" width="2" height="1" />
        <rect x="3" y="3" width="2" height="1" />
        <rect x="2" y="4" width="2" height="1" />
        <rect x="1" y="5" width="2" height="1" />
        <rect x="0" y="6" width="2" height="1" />
      </svg>
    </a>
  );
}
