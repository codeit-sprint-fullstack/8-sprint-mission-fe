import Image from 'next/image';

const TagChip = ({
  type,
  tag,
  onClick,
}: {
  type: 'modify' | 'view';
  tag: string;
  onClick: () => void;
}) => {
  return (
    <div className="bg-coolGray-100 flex h-[36px] flex-row items-center justify-center gap-[10px] rounded-[26px] px-3 py-[6px]">
      <div className="text-secondary-800 text-base leading-[26px] font-normal whitespace-nowrap">
        #{tag}
      </div>
      {type === 'modify' && (
        <button onClick={onClick} className="cursor-pointer">
          <Image src="/icons/ic_x.svg" alt="ic_x" width={22} height={24} />
        </button>
      )}
    </div>
  );
};

export default TagChip;
