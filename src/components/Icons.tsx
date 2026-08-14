/**
 * Line icons drawn on a 24x24 grid, stroke-based so they inherit currentColor
 * and stay legible in the navy circles used across the site.
 */

type Props = { className?: string };

const base = "h-6 w-6";

function Svg({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? base}
    >
      {children}
    </svg>
  );
}

/* ---------- Markets ---------- */

export function AerospaceIcon({ className }: Props) {
  return (
    <Svg className={className}>
      <path d="M12 2.5c1.9 2.2 2.9 4.9 2.9 7.8v3.1l4.6 3v2.4l-4.9-1.6-.6 3.4 1.7 1.5v1.4L12 22l-3.7.5v-1.4l1.7-1.5-.6-3.4-4.9 1.6v-2.4l4.6-3v-3.1c0-2.9 1-5.6 2.9-7.8Z" />
    </Svg>
  );
}

export function DefenseIcon({ className }: Props) {
  return (
    <Svg className={className}>
      <path d="M12 2.5 4.5 5.4v6.1c0 4.6 3.1 8.7 7.5 10 4.4-1.3 7.5-5.4 7.5-10V5.4L12 2.5Z" />
      <path d="m8.8 11.8 2.3 2.4 4.1-4.4" />
    </Svg>
  );
}

export function MedicalIcon({ className }: Props) {
  return (
    <Svg className={className}>
      <path d="M9.5 2.5h5v4.7h4.7v5h-4.7v4.7h-5v-4.7H4.8v-5h4.7V2.5Z" />
      <path d="M4.8 21.5h14.4" />
    </Svg>
  );
}

export function UtilitiesIcon({ className }: Props) {
  return (
    <Svg className={className}>
      <path d="M13.4 2.5 5.2 13.2h5.6l-1 8.3 8.2-10.7h-5.6l1-8.3Z" />
    </Svg>
  );
}

export function OilIcon({ className }: Props) {
  return (
    <Svg className={className}>
      <path d="M4.5 21.5h15" />
      <path d="M7 21.5V7.8l5.5-5.3v19" />
      <path d="M12.5 10.5h5.2v11" />
      <path d="M9.5 11h0M9.5 15h0" />
    </Svg>
  );
}

export function IndustrialIcon({ className }: Props) {
  return (
    <Svg className={className}>
      <path d="M3.5 21.5h17" />
      <path d="M3.5 21.5V9.8l5.4 3.4V9.8l5.4 3.4V9.8l5.4 3.4v8.3" />
      <path d="M3.5 9.8 4.3 3h4.1l.5 6.8" />
    </Svg>
  );
}

/* ---------- Solutions ---------- */

export function MoldingIcon({ className }: Props) {
  return (
    <Svg className={className}>
      <path d="M4 3.5h16v5.2H4z" />
      <path d="M12 8.7v3.6" />
      <path d="M6.5 12.3h11l-2 8.2h-7l-2-8.2Z" />
    </Svg>
  );
}

export function CuttingIcon({ className }: Props) {
  return (
    <Svg className={className}>
      <path d="M7 2.5h10v4.8H7z" />
      <path d="M12 7.3v4.4" />
      <path d="m8.6 15.4 3.4-3.7 3.4 3.7" />
      <path d="M3.5 19.5h17" />
    </Svg>
  );
}

export function CompoundingIcon({ className }: Props) {
  return (
    <Svg className={className}>
      <path d="M14.6 2.9 21 9.3" />
      <path d="m17.3 5.7-9.9 9.9-3.9 5.5 5.5-3.9 9.9-9.9" />
      <path d="m10.3 8.9 4.7 4.7" />
    </Svg>
  );
}

export function AdditionalIcon({ className }: Props) {
  return (
    <Svg className={className}>
      <path d="M12 21.5c-4.4 0-7.5-3.1-7.5-7.5C4.5 8.5 8 4.2 12 2.5c4 1.7 7.5 6 7.5 11.5 0 4.4-3.1 7.5-7.5 7.5Z" />
      <path d="M12 21.5V9" />
      <path d="m9 12.8 3-2.4 3 2.4" />
    </Svg>
  );
}

/* ---------- Utility ---------- */

export function CheckIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className ?? "h-5 w-5"}
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.86-9.55a.9.9 0 0 0-1.37-1.16l-3.2 3.77-1.63-1.63a.9.9 0 1 0-1.27 1.27l2.32 2.32a.9.9 0 0 0 1.32-.05l3.83-4.52Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ArrowIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "h-4 w-4"}
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export function ChevronIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "h-4 w-4"}
    >
      <path d="m6 8 4 4 4-4" />
    </svg>
  );
}

export function PhoneIcon({ className }: Props) {
  return (
    <Svg className={className ?? "h-5 w-5"}>
      <path d="M6.2 3.5h3l1.5 3.8-1.9 1.4a11 11 0 0 0 5.5 5.5l1.4-1.9 3.8 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
    </Svg>
  );
}

export function MailIcon({ className }: Props) {
  return (
    <Svg className={className ?? "h-5 w-5"}>
      <path d="M3.5 5.5h17v13h-17z" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </Svg>
  );
}

export function PinIcon({ className }: Props) {
  return (
    <Svg className={className ?? "h-5 w-5"}>
      <path d="M12 21.5s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10.3" r="2.4" />
    </Svg>
  );
}

export const marketIcons = {
  aerospace: AerospaceIcon,
  defense: DefenseIcon,
  medical: MedicalIcon,
  utilities: UtilitiesIcon,
  oil: OilIcon,
  industrial: IndustrialIcon,
};

export const solutionIcons = {
  molding: MoldingIcon,
  cutting: CuttingIcon,
  compounding: CompoundingIcon,
  additional: AdditionalIcon,
};
