// Auto-generated v2 from '농축수산물 품목 및 등급 코드표.xlsx': combo-specific retail ranks included
export type FilterOption = { code: string; name: string };

export const categories: FilterOption[] = [
  {
    code: "all",
    name: "전체 부류",
  },
  {
    code: "200",
    name: "채소류",
  },
  {
    code: "400",
    name: "과일류",
  },
];

export const itemsByCategory: Record<string, FilterOption[]> = {
  "200": [
    {
      code: "211",
      name: "배추",
    },
    {
      code: "212",
      name: "양배추",
    },
    {
      code: "213",
      name: "시금치",
    },
    {
      code: "214",
      name: "상추",
    },
    {
      code: "215",
      name: "얼갈이배추",
    },
    {
      code: "216",
      name: "갓",
    },
    {
      code: "217",
      name: "연근",
    },
    {
      code: "218",
      name: "우엉",
    },
    {
      code: "221",
      name: "수박",
    },
    {
      code: "222",
      name: "참외",
    },
    {
      code: "223",
      name: "오이",
    },
    {
      code: "224",
      name: "호박",
    },
    {
      code: "225",
      name: "토마토",
    },
    {
      code: "226",
      name: "딸기",
    },
    {
      code: "231",
      name: "무",
    },
    {
      code: "232",
      name: "당근",
    },
    {
      code: "233",
      name: "열무",
    },
    {
      code: "241",
      name: "건고추",
    },
    {
      code: "242",
      name: "풋고추",
    },
    {
      code: "243",
      name: "붉은고추",
    },
    {
      code: "244",
      name: "피마늘",
    },
    {
      code: "245",
      name: "양파",
    },
    {
      code: "246",
      name: "파",
    },
    {
      code: "247",
      name: "생강",
    },
    {
      code: "248",
      name: "고춧가루",
    },
    {
      code: "251",
      name: "가지",
    },
    {
      code: "252",
      name: "미나리",
    },
    {
      code: "253",
      name: "깻잎",
    },
    {
      code: "254",
      name: "부추",
    },
    {
      code: "255",
      name: "피망",
    },
    {
      code: "256",
      name: "파프리카",
    },
    {
      code: "257",
      name: "멜론",
    },
    {
      code: "258",
      name: "깐마늘(국산)",
    },
    {
      code: "259",
      name: "깐마늘(수입)",
    },
    {
      code: "261",
      name: "브로콜리",
    },
    {
      code: "262",
      name: "양상추",
    },
    {
      code: "263",
      name: "청경채",
    },
    {
      code: "264",
      name: "케일",
    },
    {
      code: "265",
      name: "콩나물",
    },
    {
      code: "266",
      name: "절임배추",
    },
    {
      code: "267",
      name: "쑥",
    },
    {
      code: "268",
      name: "달래",
    },
    {
      code: "269",
      name: "두릅",
    },
    {
      code: "270",
      name: "로메인 상추",
    },
    {
      code: "271",
      name: "취나물",
    },
    {
      code: "272",
      name: "쥬키니호박",
    },
    {
      code: "273",
      name: "청양고추",
    },
    {
      code: "274",
      name: "대파",
    },
    {
      code: "275",
      name: "고사리",
    },
    {
      code: "276",
      name: "쪽파",
    },
    {
      code: "277",
      name: "다발무",
    },
    {
      code: "278",
      name: "겨울 배추",
    },
    {
      code: "279",
      name: "알배기배추",
    },
    {
      code: "280",
      name: "브로콜리",
    },
    {
      code: "422",
      name: "방울토마토",
    },
  ],
  "400": [
    {
      code: "411",
      name: "사과",
    },
    {
      code: "412",
      name: "배",
    },
    {
      code: "413",
      name: "복숭아",
    },
    {
      code: "414",
      name: "포도",
    },
    {
      code: "415",
      name: "감귤",
    },
    {
      code: "416",
      name: "단감",
    },
    {
      code: "418",
      name: "바나나",
    },
    {
      code: "419",
      name: "참다래",
    },
    {
      code: "420",
      name: "파인애플",
    },
    {
      code: "421",
      name: "오렌지",
    },
    {
      code: "423",
      name: "자몽",
    },
    {
      code: "424",
      name: "레몬",
    },
    {
      code: "425",
      name: "체리",
    },
    {
      code: "426",
      name: "건포도",
    },
    {
      code: "427",
      name: "건블루베리",
    },
    {
      code: "428",
      name: "망고",
    },
    {
      code: "429",
      name: "블루베리",
    },
    {
      code: "430",
      name: "아보카도",
    },
    {
      code: "431",
      name: "레드향",
    },
    {
      code: "432",
      name: "매실",
    },
    {
      code: "433",
      name: "무화과",
    },
    {
      code: "434",
      name: "복분자",
    },
    {
      code: "435",
      name: "샤인머스켓",
    },
    {
      code: "436",
      name: "곶감",
    },
    {
      code: "437",
      name: "골드키위",
    },
  ],
};

export const kindsByItem: Record<string, FilterOption[]> = {
  "211": [
    {
      code: "01",
      name: "봄",
    },
    {
      code: "02",
      name: "여름(고랭지)",
    },
    {
      code: "03",
      name: "가을",
    },
    {
      code: "06",
      name: "월동",
    },
  ],
  "212": [
    {
      code: "00",
      name: "양배추",
    },
  ],
  "213": [
    {
      code: "00",
      name: "시금치",
    },
  ],
  "214": [
    {
      code: "01",
      name: "적",
    },
    {
      code: "02",
      name: "청",
    },
  ],
  "215": [
    {
      code: "00",
      name: "얼갈이배추",
    },
  ],
  "216": [
    {
      code: "00",
      name: "갓",
    },
  ],
  "217": [
    {
      code: "01",
      name: "연근",
    },
  ],
  "218": [
    {
      code: "01",
      name: "우엉",
    },
  ],
  "221": [
    {
      code: "00",
      name: "수박",
    },
  ],
  "222": [
    {
      code: "00",
      name: "참외",
    },
  ],
  "223": [
    {
      code: "01",
      name: "가시계통",
    },
    {
      code: "02",
      name: "다다기계통",
    },
    {
      code: "03",
      name: "취청",
    },
  ],
  "224": [
    {
      code: "01",
      name: "애호박",
    },
    {
      code: "02",
      name: "쥬키니",
    },
    {
      code: "03",
      name: "단호박",
    },
  ],
  "225": [
    {
      code: "00",
      name: "토마토",
    },
  ],
  "226": [
    {
      code: "00",
      name: "딸기",
    },
  ],
  "231": [
    {
      code: "01",
      name: "봄",
    },
    {
      code: "02",
      name: "고랭지",
    },
    {
      code: "03",
      name: "가을",
    },
    {
      code: "06",
      name: "월동",
    },
  ],
  "232": [
    {
      code: "00",
      name: "당근",
    },
    {
      code: "01",
      name: "무세척",
    },
    {
      code: "02",
      name: "세척",
    },
    {
      code: "10",
      name: "세척(수입)",
    },
  ],
  "233": [
    {
      code: "00",
      name: "열무",
    },
  ],
  "241": [
    {
      code: "00",
      name: "화건",
    },
    {
      code: "01",
      name: "햇산화건",
    },
    {
      code: "02",
      name: "양건(~23.5)",
    },
    {
      code: "03",
      name: "햇산양건(~23.5)",
    },
    {
      code: "10",
      name: "수입",
    },
    {
      code: "90",
      name: "국산(화건)",
    },
    {
      code: "99",
      name: "수입(중국)",
    },
  ],
  "242": [
    {
      code: "00",
      name: "풋고추(녹광 등)",
    },
    {
      code: "02",
      name: "꽈리고추",
    },
    {
      code: "03",
      name: "청양고추",
    },
    {
      code: "04",
      name: "오이맛고추",
    },
  ],
  "243": [
    {
      code: "00",
      name: "붉은고추",
    },
  ],
  "244": [
    {
      code: "01",
      name: "한지1접",
    },
    {
      code: "02",
      name: "난지1접",
    },
    {
      code: "03",
      name: "한지",
    },
    {
      code: "04",
      name: "난지",
    },
    {
      code: "06",
      name: "햇한지1접",
    },
    {
      code: "07",
      name: "햇난지1접",
    },
    {
      code: "08",
      name: "쪽마늘",
    },
    {
      code: "21",
      name: "햇난지(대서)",
    },
    {
      code: "22",
      name: "난지(대서)",
    },
    {
      code: "23",
      name: "햇난지(남도)",
    },
    {
      code: "24",
      name: "난지(남도)",
    },
  ],
  "245": [
    {
      code: "00",
      name: "양파",
    },
    {
      code: "02",
      name: "햇양파",
    },
    {
      code: "10",
      name: "수입",
    },
  ],
  "246": [
    {
      code: "00",
      name: "대파",
    },
    {
      code: "02",
      name: "쪽파",
    },
  ],
  "247": [
    {
      code: "00",
      name: "국산",
    },
    {
      code: "01",
      name: "수입",
    },
  ],
  "248": [
    {
      code: "00",
      name: "국산",
    },
    {
      code: "01",
      name: "중국",
    },
  ],
  "251": [
    {
      code: "00",
      name: "가지",
    },
  ],
  "252": [
    {
      code: "00",
      name: "미나리",
    },
  ],
  "253": [
    {
      code: "00",
      name: "깻잎",
    },
  ],
  "254": [
    {
      code: "00",
      name: "부추",
    },
  ],
  "255": [
    {
      code: "00",
      name: "청",
    },
  ],
  "256": [
    {
      code: "00",
      name: "파프리카",
    },
  ],
  "257": [
    {
      code: "00",
      name: "멜론",
    },
  ],
  "258": [
    {
      code: "01",
      name: "깐마늘(국산)",
    },
    {
      code: "03",
      name: "깐마늘(대서)",
    },
    {
      code: "04",
      name: "햇깐마늘(대서)",
    },
    {
      code: "05",
      name: "깐마늘(남도)",
    },
    {
      code: "06",
      name: "햇깐마늘(남도)",
    },
  ],
  "259": [
    {
      code: "01",
      name: "깐마늘(수입)",
    },
    {
      code: "03",
      name: "깐마늘(수입산)",
    },
  ],
  "261": [
    {
      code: "01",
      name: "브로콜리",
    },
  ],
  "262": [
    {
      code: "01",
      name: "양상추",
    },
  ],
  "263": [
    {
      code: "01",
      name: "청경채",
    },
  ],
  "264": [
    {
      code: "01",
      name: "케일",
    },
  ],
  "265": [
    {
      code: "01",
      name: "콩나물",
    },
  ],
  "266": [
    {
      code: "00",
      name: "절임배추",
    },
    {
      code: "01",
      name: "봄",
    },
    {
      code: "02",
      name: "여름(고랭지)",
    },
    {
      code: "03",
      name: "가을",
    },
    {
      code: "04",
      name: "월동",
    },
  ],
  "276": [
    {
      code: "02",
      name: "쪽파",
    },
  ],
  "279": [
    {
      code: "00",
      name: "알배기배추",
    },
  ],
  "280": [
    {
      code: "00",
      name: "브로콜리(국산)",
    },
  ],
  "411": [
    {
      code: "01",
      name: "홍옥",
    },
    {
      code: "05",
      name: "후지",
    },
    {
      code: "06",
      name: "쓰가루(아오리)",
    },
    {
      code: "07",
      name: "홍로",
    },
  ],
  "412": [
    {
      code: "01",
      name: "신고",
    },
    {
      code: "02",
      name: "만삼길",
    },
    {
      code: "03",
      name: "장십랑",
    },
    {
      code: "04",
      name: "원황",
    },
  ],
  "413": [
    {
      code: "01",
      name: "백도",
    },
    {
      code: "04",
      name: "창방조생",
    },
    {
      code: "05",
      name: "유명",
    },
  ],
  "414": [
    {
      code: "01",
      name: "캠벨얼리",
    },
    {
      code: "02",
      name: "거봉",
    },
    {
      code: "03",
      name: "델라웨어",
    },
    {
      code: "06",
      name: "MBA",
    },
    {
      code: "07",
      name: "수입",
    },
    {
      code: "08",
      name: "레드글로브 칠레(~23.5)",
    },
    {
      code: "09",
      name: "레드글로브 페루(~23.5)",
    },
    {
      code: "10",
      name: "톰슨 미국(~23.5)",
    },
    {
      code: "11",
      name: "톰슨 호주(~23.5)",
    },
    {
      code: "12",
      name: "샤인머스켓",
    },
  ],
  "415": [
    {
      code: "00",
      name: "감귤",
    },
    {
      code: "01",
      name: "노지",
    },
    {
      code: "02",
      name: "시설",
    },
  ],
  "416": [
    {
      code: "00",
      name: "단감",
    },
  ],
  "418": [
    {
      code: "02",
      name: "수입",
    },
  ],
  "419": [
    {
      code: "01",
      name: "국산",
    },
    {
      code: "02",
      name: "그린 뉴질랜드",
    },
  ],
  "420": [
    {
      code: "02",
      name: "수입",
    },
  ],
  "421": [
    {
      code: "02",
      name: "수입",
    },
    {
      code: "03",
      name: "네이블 미국",
    },
    {
      code: "04",
      name: "발렌시아 미국",
    },
    {
      code: "05",
      name: "네이블 EU",
    },
    {
      code: "06",
      name: "네이블 호주",
    },
  ],
  "422": [
    {
      code: "01",
      name: "방울토마토",
    },
    {
      code: "02",
      name: "대추방울토마토",
    },
  ],
  "423": [
    {
      code: "00",
      name: "수입",
    },
  ],
  "424": [
    {
      code: "00",
      name: "수입",
    },
  ],
  "425": [
    {
      code: "00",
      name: "수입",
    },
  ],
  "426": [
    {
      code: "00",
      name: "수입",
    },
  ],
  "427": [
    {
      code: "00",
      name: "수입",
    },
  ],
  "428": [
    {
      code: "00",
      name: "수입",
    },
  ],
  "429": [
    {
      code: "01",
      name: "블루베리",
    },
  ],
  "430": [
    {
      code: "00",
      name: "수입",
    },
  ],
};

export const ranks: FilterOption[] = [
  {
    code: "1",
    name: "1등급",
  },
  {
    code: "2",
    name: "2등급",
  },
  {
    code: "3",
    name: "3등급",
  },
  {
    code: "4",
    name: "상품",
  },
  {
    code: "5",
    name: "중품",
  },
  {
    code: "6",
    name: "하품",
  },
  {
    code: "7",
    name: "유기농",
  },
  {
    code: "8",
    name: "무농약",
  },
  {
    code: "9",
    name: "저농약",
  },
  {
    code: "10",
    name: "냉장",
  },
  {
    code: "11",
    name: "냉동",
  },
  {
    code: "12",
    name: "무항생제",
  },
  {
    code: "13",
    name: "S과",
  },
  {
    code: "14",
    name: "M과",
  },
  {
    code: "15",
    name: "M과",
  },
  {
    code: "16",
    name: "S과",
  },
  {
    code: "17",
    name: "1+등급",
  },
  {
    code: "18",
    name: "동물복지란",
  },
  {
    code: "19",
    name: "특大",
  },
  {
    code: "20",
    name: "大",
  },
  {
    code: "21",
    name: "中",
  },
  {
    code: "22",
    name: "小",
  },
  {
    code: "23",
    name: "2L과",
  },
  {
    code: "24",
    name: "L과",
  },
  {
    code: "25",
    name: "M과",
  },
  {
    code: "26",
    name: "S과",
  },
  {
    code: "27",
    name: "대멸",
  },
  {
    code: "28",
    name: "중멸",
  },
  {
    code: "29",
    name: "세멸",
  },
];

// 지역 코드 데이터
export const countryCodes: FilterOption[] = [
  {
    code: "1101",
    name: "서울",
  },
  {
    code: "2100",
    name: "부산",
  },
  {
    code: "2200",
    name: "대구",
  },
  {
    code: "2300",
    name: "인천",
  },
  {
    code: "2401",
    name: "광주",
  },
  {
    code: "2501",
    name: "대전",
  },
  {
    code: "2601",
    name: "울산",
  },
  {
    code: "3111",
    name: "수원",
  },
  {
    code: "3214",
    name: "강릉",
  },
  {
    code: "3211",
    name: "춘천",
  },
  {
    code: "3311",
    name: "청주",
  },
  {
    code: "3511",
    name: "전주",
  },
  {
    code: "3711",
    name: "포항",
  },
  {
    code: "3911",
    name: "제주",
  },
  {
    code: "3113",
    name: "의정부",
  },
  {
    code: "3613",
    name: "순천",
  },
  {
    code: "3714",
    name: "안동",
  },
  {
    code: "3814",
    name: "창원",
  },
  {
    code: "3145",
    name: "용인",
  },
  {
    code: "2701",
    name: "세종",
  },
  {
    code: "3112",
    name: "성남",
  },
  {
    code: "3138",
    name: "고양",
  },
  {
    code: "3411",
    name: "천안",
  },
  {
    code: "3818",
    name: "김해",
  },
];

// 소매가격 선택가능 지역
export const retailCountryCodes: FilterOption[] = countryCodes;

// 도매가격 선택가능 지역 (서울, 부산, 대구, 광주, 대전)
export const wholesaleCountryCodes: FilterOption[] = [
  {
    code: "1101",
    name: "서울",
  },
  {
    code: "2100",
    name: "부산",
  },
  {
    code: "2200",
    name: "대구",
  },
  {
    code: "2401",
    name: "광주",
  },
  {
    code: "2501",
    name: "대전",
  },
];

export type QueryCombo = {
  p_itemcategorycode: string;
  p_itemcode: string;
  p_kindcode: string;
};

export const validCombos: QueryCombo[] = [
  {
    p_itemcategorycode: "200",
    p_itemcode: "211",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "211",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "211",
    p_kindcode: "03",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "211",
    p_kindcode: "06",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "212",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "213",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "214",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "214",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "215",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "216",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "217",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "218",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "221",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "222",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "223",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "223",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "223",
    p_kindcode: "03",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "224",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "224",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "224",
    p_kindcode: "03",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "225",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "226",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "231",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "231",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "231",
    p_kindcode: "03",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "231",
    p_kindcode: "06",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "232",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "232",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "232",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "232",
    p_kindcode: "10",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "233",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "241",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "241",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "241",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "241",
    p_kindcode: "03",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "241",
    p_kindcode: "10",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "241",
    p_kindcode: "90",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "241",
    p_kindcode: "99",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "242",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "242",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "242",
    p_kindcode: "03",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "242",
    p_kindcode: "04",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "243",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "244",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "244",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "244",
    p_kindcode: "03",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "244",
    p_kindcode: "04",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "244",
    p_kindcode: "06",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "244",
    p_kindcode: "07",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "244",
    p_kindcode: "08",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "244",
    p_kindcode: "21",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "244",
    p_kindcode: "22",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "244",
    p_kindcode: "23",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "244",
    p_kindcode: "24",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "245",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "245",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "245",
    p_kindcode: "10",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "246",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "246",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "247",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "247",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "248",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "248",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "251",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "252",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "253",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "254",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "255",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "256",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "257",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "258",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "258",
    p_kindcode: "03",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "258",
    p_kindcode: "04",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "258",
    p_kindcode: "05",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "258",
    p_kindcode: "06",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "259",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "259",
    p_kindcode: "03",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "261",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "262",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "263",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "264",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "265",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "266",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "266",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "266",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "266",
    p_kindcode: "03",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "266",
    p_kindcode: "04",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "276",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "279",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "280",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "422",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "200",
    p_itemcode: "422",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "411",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "411",
    p_kindcode: "05",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "411",
    p_kindcode: "06",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "411",
    p_kindcode: "07",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "412",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "412",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "412",
    p_kindcode: "03",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "412",
    p_kindcode: "04",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "413",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "413",
    p_kindcode: "04",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "413",
    p_kindcode: "05",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "414",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "414",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "414",
    p_kindcode: "03",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "414",
    p_kindcode: "06",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "414",
    p_kindcode: "07",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "414",
    p_kindcode: "08",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "414",
    p_kindcode: "09",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "414",
    p_kindcode: "10",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "414",
    p_kindcode: "11",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "414",
    p_kindcode: "12",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "415",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "415",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "415",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "416",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "418",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "419",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "419",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "420",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "421",
    p_kindcode: "02",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "421",
    p_kindcode: "03",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "421",
    p_kindcode: "04",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "421",
    p_kindcode: "05",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "421",
    p_kindcode: "06",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "423",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "424",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "425",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "426",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "427",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "428",
    p_kindcode: "00",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "429",
    p_kindcode: "01",
  },
  {
    p_itemcategorycode: "400",
    p_itemcode: "430",
    p_kindcode: "00",
  },
];

// Combo-specific retail ranks
export const comboRetailRanksFlat: Record<string, FilterOption[]> = {
  "200|211|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|211|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|211|03": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|211|06": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|212|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|213|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|214|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|214|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|215|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|221|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|222|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|223|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|223|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|223|03": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|224|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|224|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|225|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|226|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|231|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|231|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|231|03": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|231|06": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|232|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|232|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|232|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|232|10": [
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|233|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|241|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|241|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|241|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|241|03": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|241|10": [
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|242|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|242|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|242|03": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|242|04": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|243|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|244|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|244|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|244|03": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|244|04": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|244|06": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|244|07": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|244|08": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|244|21": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|244|22": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|244|23": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|244|24": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|245|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|245|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|245|10": [
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|246|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|246|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|247|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|247|01": [
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|251|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|252|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|253|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|254|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|255|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|256|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|257|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|258|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|258|03": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|258|04": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|258|05": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|258|06": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|259|01": [
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|259|03": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|279|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|280|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|422|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "200|422|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|411|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|411|05": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|411|06": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|411|07": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|412|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|412|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|412|03": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|412|04": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|413|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|413|04": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|413|05": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|414|01": [
    {
      code: "24",
      name: "L과",
    },
    {
      code: "25",
      name: "M과",
    },
  ],
  "400|414|02": [
    {
      code: "24",
      name: "L과",
    },
    {
      code: "25",
      name: "M과",
    },
  ],
  "400|414|03": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|414|06": [
    {
      code: "24",
      name: "L과",
    },
    {
      code: "25",
      name: "M과",
    },
  ],
  "400|414|07": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|414|08": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|414|09": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|414|10": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|414|11": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|414|12": [
    {
      code: "24",
      name: "L과",
    },
    {
      code: "25",
      name: "M과",
    },
  ],
  "400|415|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|415|01": [
    {
      code: "13",
      name: "S과",
    },
    {
      code: "14",
      name: "M과",
    },
  ],
  "400|415|02": [
    {
      code: "13",
      name: "S과",
    },
    {
      code: "14",
      name: "M과",
    },
  ],
  "400|416|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|418|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|419|01": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|419|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|420|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|421|02": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|421|03": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|421|04": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|421|05": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|421|06": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|424|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|425|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
  "400|428|00": [
    {
      code: "4",
      name: "상품",
    },
    {
      code: "5",
      name: "중품",
    },
  ],
};

// Helpers
export function buildQuery(params: {
  category?: FilterOption | null;
  item?: FilterOption | null;
  kind?: FilterOption | null;
  rank?: FilterOption | null;
  countryCode?: FilterOption | null;
}) {
  return {
    p_itemcategorycode: params.category?.code ?? "",
    p_itemcode: params.item?.code ?? "",
    p_kindcode: params.kind?.code ?? "",
    p_productrankcode: params.rank?.code ?? "",
    p_countrycode: params.countryCode?.code ?? "",
  };
}

export function getItems(categoryCode?: string | null) {
  if (!categoryCode) return [];
  return itemsByCategory[categoryCode] ?? [];
}

export function getKinds(itemCode?: string | null) {
  if (!itemCode) return [];
  return kindsByItem[itemCode] ?? [];
}

// Convenience: flat key "cat|item|kind"
export function getRetailRanksByKey(key: string) {
  return comboRetailRanksFlat[key] ?? ranks;
}

// 지역 코드 관련 함수들
export function getCountryCodes(priceType: 'retail' | 'wholesale' = 'retail'): FilterOption[] {
  return priceType === 'wholesale' ? wholesaleCountryCodes : retailCountryCodes;
}

export function getCountryCodeByCode(code: string): FilterOption | undefined {
  return countryCodes.find(country => country.code === code);
}

export function getCountryCodeByName(name: string): FilterOption | undefined {
  return countryCodes.find(country => country.name === name);
}

export function isValidCountryCode(code: string, priceType: 'retail' | 'wholesale' = 'retail'): boolean {
  const validCodes = getCountryCodes(priceType);
  return validCodes.some(country => country.code === code);
}

export function getDefaultCountryCode(): string {
  return ''; // 전체지역이 기본값
}

// 품목 코드에 따른 이미지 파일명 매핑
export function getItemImagePath(itemCode: string): string {
  const imageMap: Record<string, string> = {
    // 채소류
    "211": "배추.png",
    "212": "양배추.png",
    "213": "시금치.png",
    "214": "상추.png",
    "215": "얼갈이배추.png",
    "216": "갓.png",
    "221": "수박.png",
    "222": "참외.png",
    "223": "오이.png",
    "224": "호박.png",
    "225": "토마토.png",
    "226": "딸기.png",
    "231": "무.png",
    "232": "당근.png",
    "233": "열무.png",
    "241": "건고추.png",
    "242": "풋고추.png",
    "243": "붉은고추.png",
    "244": "피마늘.png",
    "245": "양파.png",
    "246": "파.png",
    "247": "생강.png",
    "248": "고춧가루.png",
    "251": "가지.png",
    "252": "미나리.png",
    "253": "깻잎.png",
    "255": "피망.png",
    "256": "파프리카.png",
    "257": "멜론.png",
    "258": "깐마늘.png",
    "259": "깐마늘.png",
    "261": "브로콜리.png",
    "279": "알배기배추.png",
    "280": "브로콜리.png",
    "422": "방울토마토.png",
    // 과일류
    "411": "사과.png",
    "412": "배.png",
    "413": "복숭아.png",
    "414": "포도.png",
    "415": "감귤.png",
    "416": "단감.png",
    "418": "바나나.png",
    "419": "참다래.png",
    "420": "파인애플.png",
    "421": "오렌지.png",
    "423": "자몽.png",
    "424": "레몬.png",
    "425": "체리.png",
    "426": "건포도.png",
    "428": "망고.png",
    "430": "아보카도.png",
  };

  return imageMap[itemCode] || "default.png"; // 기본 이미지
}
