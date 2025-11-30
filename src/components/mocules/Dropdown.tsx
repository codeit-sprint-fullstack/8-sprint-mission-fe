'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import dropdownIcon from '@/images/dropdown/ic_dropdown.svg';

interface DropdownOldSelectProps {
  order: string;
  onChangeOrder: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function DropdownOldSelect({ order, onChangeOrder }: DropdownOldSelectProps) {
  return (
    <div className="relative flex items-center justify-center">
      <select
        value={order}
        name="order"
        onChange={onChangeOrder}
        className="flex h-[42px] w-[42px] shrink-0 flex-col py-[10px] gap-[10px] rounded-[12px] border border-[var(--Cool-Gray-200,#e5e7eb)] bg-white p-[9px] text-transparent md:text-[var(--Secondary-800)] md:text-[16px] md:font-[400] md:w-fit"
      >
        <option value="recent">최신순</option>
        <option value="favorite">좋아요순</option>
      </select>
      <Image src={dropdownIcon} alt="dropdownIcon" className="absolute md:hidden" />
    </div>
  );
}

interface DropdownButtonElement {
  name: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface DropdownButtonProps {
  list: DropdownButtonElement[];
  children: ReactNode;
}

//버튼 리스트만 나오는 드롭다운
// export function DropdownButton({ list = [], children }: DropdownButtonProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className={styles.dropdownBox}>
//       <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
//         {children}
//       </button>
//       {isOpen && (
//         <div className={styles.listBox}>
//           <ul className={styles.list}>
//             {list.map((e) => (
//               <li className={styles.element} key={list.indexOf(e)}>
//                 <button onClick={e.onClick}>{e.name}</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

//선택지가 나오는 드롭다운
// export function DropdownSelect({ value, list, onChange, children }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className={styles.dropdownBox}>
//       <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
//         {children}
//       </button>
//       {isOpen && (
//         <div className={styles.listBox}>
//           <ul className={styles.list}>
//             {list.map((e) => (
//               <li className={styles.element}>
//                 <button onClick={onChange}>{e}</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
