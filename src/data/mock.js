const DEFAULT_IMAGE = '../assets/img_default.png'

const mockProducts = [
  {
    title: '로봇청소기',
    description: '최신형 스마트 로봇청소기, 자동 충전과 맵핑 기능 포함.',
    price: 350000,
    tags: ['가전', '청소'],
    likes: 25,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '아이폰14',
    description: '거의 새제품, 스크래치 없음. 256GB 보관 박스 포함.',
    price: 1200000,
    tags: ['핸드폰', '애플'],
    likes: 120,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '게이밍노트북',
    description: '고성능 게이밍 노트북, RTX 그래픽카드 장착.',
    price: 2200000,
    tags: ['노트북', '게임'],
    likes: 77,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '책상',
    description: '원목 스탠딩 책상, 높이 조절 가능. 상태 양호.',
    price: 150000,
    tags: ['가구'],
    likes: 12,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '에어팟2',
    description: '무선 이어폰, 생활 스크래치 있으나 작동 정상.',
    price: 90000,
    tags: ['음향'],
    likes: 45,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '아이패드',
    description: '아이패드 프로 11인치, 펜슬 포함 세트.',
    price: 950000,
    tags: ['태블릿'],
    likes: 65,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '자전거',
    description: '접이식 미니벨로 자전거, 휴대성 좋고 상태 양호.',
    price: 200000,
    tags: ['레저'],
    likes: 33,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '캠핑의자',
    description: '튼튼한 접이식 캠핑 의자, 야외활동 필수템.',
    price: 45000,
    tags: ['캠핑'],
    likes: 14,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '냉장고',
    description: '소형 미니 냉장고, 원룸 사용 적합.',
    price: 130000,
    tags: ['가전'],
    likes: 28,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '공기청정기',
    description: '대형 공기청정기, 필터 새것 교체 완료.',
    price: 210000,
    tags: ['가전'],
    likes: 19,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '전기밥솥',
    description: '10인용 전기밥솥, 보온 기능 정상 작동.',
    price: 75000,
    tags: ['주방'],
    likes: 8,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '기타',
    description: '입문용 통기타, 줄 교체 완료. 소리 잘 납니다.',
    price: 120000,
    tags: ['악기'],
    likes: 52,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '모니터',
    description: '27인치 FHD 모니터, 게임 및 사무용 적합.',
    price: 180000,
    tags: ['PC'],
    likes: 41,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '마우스',
    description: '무선 게이밍 마우스, 클릭감 우수.',
    price: 45000,
    tags: ['PC'],
    likes: 10,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '키보드',
    description: '기계식 키보드, 청축 스위치. LED 지원.',
    price: 65000,
    tags: ['PC'],
    likes: 16,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '프린터',
    description: '컬러 잉크젯 프린터, 무선 연결 지원.',
    price: 90000,
    tags: ['사무'],
    likes: 7,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '스피커',
    description: '블루투스 스피커, 고출력 사운드. 생활 방수.',
    price: 60000,
    tags: ['음향'],
    likes: 22,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '가습기',
    description: '초음파 미니 가습기, USB 전원 사용.',
    price: 25000,
    tags: ['가전'],
    likes: 18,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '커피머신',
    description: '에스프레소 커피머신, 캡슐 방식 지원.',
    price: 185000,
    tags: ['주방'],
    likes: 29,
    imageUrl: DEFAULT_IMAGE
  },
  {
    title: '전기히터',
    description: '겨울철 필수 아이템, 온풍기 기능 탑재.',
    price: 110000,
    tags: ['가전'],
    likes: 11,
    imageUrl: DEFAULT_IMAGE
  },
  { title: '전기포트', description: '스테인리스 전기포트, 자동 전원 차단 기능.', price: 35000, tags: ['주방'], likes: 9, imageUrl: DEFAULT_IMAGE },
  { title: '빔프로젝터', description: '가정용 미니 빔프로젝터, HDMI 지원.', price: 320000, tags: ['가전'], likes: 31, imageUrl: DEFAULT_IMAGE },
  { title: '캠핑랜턴', description: '충전식 LED 랜턴, 밝기 조절 가능.', price: 28000, tags: ['캠핑'], likes: 17, imageUrl: DEFAULT_IMAGE },
  { title: '트레킹화', description: '방수 기능 탑재 아웃도어 신발.', price: 98000, tags: ['레저'], likes: 21, imageUrl: DEFAULT_IMAGE },
  { title: '전동킥보드', description: '성인용 전동 킥보드, 최대 25km/h.', price: 450000, tags: ['레저'], likes: 66, imageUrl: DEFAULT_IMAGE },
  { title: '스탠드조명', description: 'LED 스탠드 조명, 밝기 단계 조절.', price: 40000, tags: ['가구'], likes: 15, imageUrl: DEFAULT_IMAGE },
  { title: '안마기', description: '어깨 및 허리용 안마기, 온열 기능 포함.', price: 125000, tags: ['가전'], likes: 39, imageUrl: DEFAULT_IMAGE },
  { title: '전기자전거', description: '배터리 교체형 전기자전거, 주행거리 60km.', price: 1300000, tags: ['레저'], likes: 84, imageUrl: DEFAULT_IMAGE },
  { title: '블렌더', description: '주방용 고속 블렌더, 스무디 제조 가능.', price: 89000, tags: ['주방'], likes: 19, imageUrl: DEFAULT_IMAGE },
  { title: '에어프라이어', description: '대용량 에어프라이어, 기름 없이 조리 가능.', price: 150000, tags: ['주방'], likes: 44, imageUrl: DEFAULT_IMAGE },
  { title: '운동자전거', description: '실내용 헬스 자전거, 강도 조절 가능.', price: 320000, tags: ['운동'], likes: 23, imageUrl: DEFAULT_IMAGE },
  { title: '요가매트', description: '미끄럼 방지 요가매트, 두께 10mm.', price: 25000, tags: ['운동'], likes: 12, imageUrl: DEFAULT_IMAGE },
  { title: '러닝머신', description: '접이식 런닝머신, 속도 조절 가능.', price: 680000, tags: ['운동'], likes: 37, imageUrl: DEFAULT_IMAGE },
  { title: '골프채세트', description: '입문자용 골프채 세트, 가방 포함.', price: 750000, tags: ['레저'], likes: 42, imageUrl: DEFAULT_IMAGE },
  { title: '드론', description: '4K 카메라 탑재 드론, GPS 지원.', price: 520000, tags: ['레저'], likes: 71, imageUrl: DEFAULT_IMAGE },
  { title: '전동드릴', description: '무선 전동드릴, 배터리 2개 포함.', price: 98000, tags: ['공구'], likes: 20, imageUrl: DEFAULT_IMAGE },
  { title: '공구세트', description: '가정용 공구세트, 다용도 사용 가능.', price: 65000, tags: ['공구'], likes: 13, imageUrl: DEFAULT_IMAGE },
  { title: '책장', description: '5단 원목 책장, 견고한 구조.', price: 120000, tags: ['가구'], likes: 27, imageUrl: DEFAULT_IMAGE },
  { title: '소파', description: '3인용 패브릭 소파, 쿠션 포함.', price: 450000, tags: ['가구'], likes: 34, imageUrl: DEFAULT_IMAGE },
  { title: '침대프레임', description: '퀸사이즈 원목 침대 프레임.', price: 390000, tags: ['가구'], likes: 26, imageUrl: DEFAULT_IMAGE },
  { title: '매트리스', description: '메모리폼 매트리스, 퀸사이즈.', price: 340000, tags: ['가구'], likes: 22, imageUrl: DEFAULT_IMAGE },
  { title: '의자세트', description: '식탁용 의자 4개 세트.', price: 210000, tags: ['가구'], likes: 18, imageUrl: DEFAULT_IMAGE },
  { title: '탁상시계', description: '빈티지 디자인 탁상시계.', price: 28000, tags: ['인테리어'], likes: 7, imageUrl: DEFAULT_IMAGE },
  { title: '액자', description: 'A3 사이즈 포스터 액자.', price: 18000, tags: ['인테리어'], likes: 6, imageUrl: DEFAULT_IMAGE },
  { title: '러그', description: '거실용 대형 러그, 부드러운 촉감.', price: 98000, tags: ['인테리어'], likes: 11, imageUrl: DEFAULT_IMAGE },
  { title: '커튼', description: '암막 커튼, 베이지 색상.', price: 65000, tags: ['인테리어'], likes: 14, imageUrl: DEFAULT_IMAGE },
  { title: '화분', description: '실내 인테리어용 조화 화분.', price: 22000, tags: ['인테리어'], likes: 8, imageUrl: DEFAULT_IMAGE },
  { title: '손목시계', description: '스테인리스 손목시계, 방수 기능.', price: 180000, tags: ['패션'], likes: 29, imageUrl: DEFAULT_IMAGE },
  { title: '가방', description: '여성용 토트백, 가죽 소재.', price: 95000, tags: ['패션'], likes: 16, imageUrl: DEFAULT_IMAGE },
  { title: '운동화', description: '남성용 러닝화, 쿠션감 우수.', price: 120000, tags: ['패션'], likes: 21, imageUrl: DEFAULT_IMAGE },
  { title: '재킷', description: '가죽 재킷, 사이즈 M.', price: 210000, tags: ['패션'], likes: 24, imageUrl: DEFAULT_IMAGE },
  { title: '모자', description: '야구 모자, 프리사이즈.', price: 18000, tags: ['패션'], likes: 9, imageUrl: DEFAULT_IMAGE }
]

export default mockProducts
