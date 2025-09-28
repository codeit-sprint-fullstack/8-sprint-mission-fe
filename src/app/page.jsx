import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
    return (
        <main className="flex-1">
            <section className="flex h-[54rem] items-center bg-[#cfe5ff] bg-no-repeat bg-[url('/img_home_banner.svg')] bg-[length:55%] bg-[position:80%_bottom]">
                <div className="mx-auto w-full max-w-[120rem]">
                    <h1 className="text-[4rem] font-bold text-black mx-60">
                        일상의 모든 물건을
                        <br />
                        거래해보세요
                    </h1>
                    <Link
                        href="/items"
                        className="mt-[3.2rem] inline-flex items-center justify-center mx-60 rounded-full bg-[#3692ff] px-[10rem] py-[1.6rem] text-[1.25rem] text-white hover:bg-[#1967d6] focus:bg-[#1251aa] disabled:cursor-default disabled:bg-gray-400 disabled:pointer-events-none"
                    >
                        구경하러 가기
                    </Link>
                </div>
            </section>

            <section className="mx-auto px-100 max-w-[120rem] pb-[13.8rem]">
                <div className="flex items-center gap-[5%] py-[13.8rem]">
                    <div className="w-1/2">
                        <Image
                            src="/img_home_hot_item.svg"
                            alt="인기 상품"
                            width={500}
                            height={300}
                            className="h-auto w-full"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="mb-[1.2rem] text-[1.5rem] font-bold leading-[2.5rem] text-[#3692ff]">
                            Hot item
                        </h2>
                        <h1 className="text-[2.5rem] font-bold">
                            인기 상품을
                            <br />
                            확인해 보세요
                        </h1>
                        <p className="mt-[2.4rem] text-[1.25rem] font-medium">
                            가장 HOT한 중고거래 물품을
                            <br />
                            판다마켓에서 확인해보세요
                        </p>
                    </div>
                </div>

                <div className="flex flex-row-reverse items-center gap-[5%] py-[13.8rem]">
                    <div className="w-1/2">
                        <Image
                            src="/img_home_search.svg"
                            alt="상품 검색"
                            width={500}
                            height={300}
                            className="h-auto w-full"
                        />
                    </div>
                    <div className="flex-1 text-right">
                        <h2 className="mb-[1.2rem] text-[1.5rem] font-bold leading-[2.5rem] text-[#3692ff]">
                            Search
                        </h2>
                        <h1 className="text-[2.5rem] font-bold">
                            구매를 원하는
                            <br />
                            상품을 검색하세요
                        </h1>
                        <p className="mt-[2.4rem] text-[1.25rem] font-medium">
                            구매하고 싶은 물품은 검색해서
                            <br />
                            쉽게 찾아보세요
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-[5%] py-[13.8rem]">
                    <div className="w-1/2">
                        <Image
                            src="/img_home_register.svg"
                            alt="상품 등록"
                            width={500}
                            height={300}
                            className="h-auto w-full"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="mb-[1.2rem] text-[1.5rem] font-bold leading-[2.5rem] text-[#3692ff]">
                            Register
                        </h2>
                        <h1 className="text-[2.5rem] font-bold">
                            판매를 원하는
                            <br />
                            상품을 등록하세요
                        </h1>
                        <p className="mt-[2.4rem] text-[1.25rem] font-medium">
                            어떤 물건이든 판매하고 싶은 상품을
                            <br />
                            쉽게 등록하세요
                        </p>
                    </div>
                </div>
            </section>

            <section className="flex h-[54rem] items-center bg-[#cfe5ff] bg-no-repeat bg-[url('/img_home_close.svg')] bg-[length:55%] bg-[position:80%_bottom]">
                <div className="mx-auto w-full max-w-[120rem]">
                    <h1 className="text-[4rem] font-bold text-black mx-60">
                        믿을 수 있는
                        <br />
                        판다마켓 중고거래
                    </h1>
                </div>
            </section>
        </main>
    );
}
