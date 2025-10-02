import ItemTag from "@/components/Items/ItemTag";

const InputForm = () => {
  return (
    <div className="flex flex-col items-start gap-6 mx-6">
      <div className="flex flex-col items-start gap-4 w-full mb-8">
        <label className="font-semibold text-gray-800">상품명</label>
        <input
          type="text"
          placeholder="상품명을 입력해주세요."
          maxLength={10}
          required
          className="w-full h-14 rounded-xl bg-gray-100 px-6 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <span className="hidden text-red-500 text-sm font-semibold mt-2">
          10자 이내로 입력해주세요.
        </span>
      </div>

      <div className="flex flex-col items-start gap-4 w-full mb-8">
        <label className="font-semibold text-gray-800">상품 소개</label>
        <textarea
          placeholder="상품 소개를 입력해주세요."
          minLength={10}
          required
          className="w-full h-72 rounded-xl bg-gray-100 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
        />
        <span className="hidden text-red-500 text-sm font-semibold mt-2">
          10자 이상 입력해주세요.
        </span>
      </div>

      <div className="flex flex-col items-start gap-4 w-full mb-8">
        <label className="font-semibold text-gray-800">판매가격</label>
        <input
          type="number"
          placeholder="판매가격을 입력해주세요."
          className="w-full h-14 rounded-xl bg-gray-100 px-6 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <span className="hidden text-red-500 text-sm font-semibold mt-2">
          숫자로 입력해주세요.
        </span>
      </div>

      <div className="flex flex-col items-start gap-4 w-full mb-8">
        <label className="font-semibold text-gray-800">태그</label>
        <input
          type="text"
          placeholder="태그를 입력해주세요."
          maxLength={5}
          required
          className="w-full h-14 rounded-xl bg-gray-100 px-6 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <span className="hidden text-red-500 text-sm font-semibold mt-2">
          5글자 이내로 입력해주세요.
        </span>
        <ItemTag />
      </div>
    </div>
  );
};

export default InputForm;
