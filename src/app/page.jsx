import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full h-[33.75rem] bg-blue-100 flex justify-center items-end">
        <div className="flex items-end gap-16">
          <div className="flex flex-col gap-8 items-center text-center">
            <h1 className="text-5xl font-bold text-gray-700 leading-snug">
              일상의 모든 물건을 <br /> 거래해 보세요
            </h1>
            <Link
              href="/market"
              className="inline-flex justify-center items-center h-14 px-16 rounded-full bg-blue-500 text-white text-xl font-semibold hover:bg-blue-600 transition"
            >
              구경하러 가기
            </Link>
          </div>
          <div
            className="w-[746px] h-[340px] bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: "url('/images/panda-1.svg')" }}
          />
        </div>
      </section>

      {/* Best Item Section */}
      <section className="w-full py-32 flex justify-center items-center bg-white">
        <div className="flex gap-16 justify-center items-center">
          <img
            src="/images/bestitem.svg"
            alt="Best Item"
            className="w-[36.75rem] h-auto"
          />
          <div className="flex flex-col items-start text-gray-700">
            <p className="text-blue-500 text-lg font-bold mb-3">Hot item</p>
            <h2 className="text-4xl font-bold leading-snug mb-6">
              인기 상품을 <br /> 확인해 보세요
            </h2>
            <p className="text-2xl font-medium">
              가장 HOT한 중고거래 물품을 <br /> 판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full py-32 flex justify-center items-center bg-white">
        <div className="flex gap-16 justify-center items-center bg-gray-50 p-8">
          <div className="flex flex-col items-end text-gray-700 text-right">
            <p className="text-blue-500 text-lg font-bold mb-3">Search</p>
            <h2 className="text-4xl font-bold leading-snug mb-6">
              구매를 원하는 <br /> 상품을 검색하세요
            </h2>
            <p className="text-2xl font-medium">
              구매하고 싶은 물품을 검색해서 <br /> 쉽게 찾아보세요
            </p>
          </div>
          <img
            src="/images/search.svg"
            alt="Search"
            className="w-[36.75rem] h-auto"
          />
        </div>
      </section>

      {/* Register Section */}
      <section className="w-full py-32 flex justify-center items-center bg-white">
        <div className="flex gap-16 justify-center items-center bg-gray-50 p-8">
          <img
            src="/images/register.svg"
            alt="Register"
            className="w-[36.75rem] h-auto"
          />
          <div className="flex flex-col items-start text-gray-700">
            <p className="text-blue-500 text-lg font-bold mb-3">Register</p>
            <h2 className="text-4xl font-bold leading-snug mb-6">
              판매를 원하는 <br /> 상품을 등록하세요
            </h2>
            <p className="text-xl font-medium">
              어떤 물건이든 판매하고 싶은 상품을 <br /> 쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="w-full h-[33.75rem] bg-blue-100 flex justify-center items-end">
        <div className="flex items-end gap-16">
          <h2 className="text-4xl font-bold text-gray-700 leading-snug whitespace-pre-line text-center">
            믿을 수 있는{"\n"}판다 마켓 중고 거래
          </h2>
          <div
            className="w-[746px] h-[397px] bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: "url('/images/panda-2.svg')" }}
          />
        </div>
      </section>
    </div>
  );
}
