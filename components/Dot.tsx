interface DotProps {
  color: string;
}

export default function Dot({ color }: DotProps) {
  return (
    <div
      className="h-[15px] w-[15px] rounded-full"
      style={{
        backgroundColor: color,
      }}
    ></div>
  );
}
