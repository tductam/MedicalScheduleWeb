interface InfoItemProps {
  label: string;
  value: string | number;
}

export function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex flex-col bg-[#F7F9FC] border-b pl-1">
      <span className="text-[14px] text-zinc-500">{label}</span>
      <span>{value}</span>
    </div>
  );
}
