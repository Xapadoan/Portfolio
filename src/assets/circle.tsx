export function Circle({
  radius = 10,
  strokeWidth = 0,
  color,
  strokeColor,
}: {
  radius?: number;
  strokeWidth?: number;
  color: string;
  strokeColor?: string;
}) {
  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth}
        stroke={strokeColor || color}
        strokeWidth={strokeWidth}
        fill={color}
      />
    </svg>
  );
}
