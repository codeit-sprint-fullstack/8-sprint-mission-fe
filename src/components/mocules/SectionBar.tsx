interface SectionBar {
  title: string;
}

export default function SectionBar({ title = '' }: SectionBar) {
  return (
    <div className="w-full shrink-0 flex justify-start">
      <p className="text-[var(--Cool-Gray-900)] text-xl font-bold">{title}</p>
    </div>
  );
}
