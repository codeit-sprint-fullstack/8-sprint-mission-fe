import '../css/ShopCard.css'
import img01 from '../assets/Img_home_03.png'
import img02 from '../assets/Img_home_04.png'
import img03 from '../assets/Img_home_05.png'

const shopCards = [
  {
    title: 'Hot item',
    content: '인기 상품을 \n 확인해 보세요',
    desc: '가장 HOT한 중고거래 물품을 \n 판다 마켓에서 확인해 보세요',
    image: img01,
    reverse: false
  },
  {
    title: 'Search',
    content: '구매를 원하는 \n 상품을 검색하세요',
    desc: '구매하고 싶은 물품은 검색해서 \n 쉽게 찾아보세요',
    image: img02,
    reverse: true
  },
  {
    title: 'Register',
    content: '판매를 원하는 \n 상품을 등록하세요',
    desc: '어떤 물건이든 판매하고 싶은 상품을 \n 쉽게 등록하세요',
    image: img03,
    reverse: false
  }
]

function ShopCard({ value = 0 }) {
  if (value < 0 || value >= shopCards.length) {
    return null
  }

  const item = shopCards[value]

  let sectionClass = 'shopCard_section'
  if (item.reverse) {
    sectionClass += ' reverse'
  }
  if (value === 1) {
    sectionClass += ' narrow'
  }

  return (
    <section className='shopCard'>
      <div className={sectionClass}>
        <div className='shopCard_img'>
          <img src={item.image} alt={item.title} />
        </div>
        <div className='shopCard_content'>
          <div className='title'>{item.title}</div>
          <div className='content'>{item.content}</div>
          <div className='text_footer'>{item.desc}</div>
        </div>
      </div>
    </section>
  )
}

export default ShopCard
