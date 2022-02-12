export const LV = {
  'Lv.2': 'Lv.2',
  'Lv.3': 'Lv.3',
  'Lv.4': 'Lv.4',
  'Lv.5': 'Lv.5',
  'Lv.6': 'Lv.6',
  'Lv.7': 'Lv.7',
  '-': '-',
} as const;

export type Lv = keyof typeof LV;

export const CARD_TYPE = {
  '1_デジタマ': '1_デジタマ',
  '2_デジモン': '2_デジモン',
  '3_テイマー': '3_テイマー',
  '4_オプション': '4_オプション',
} as const;

export type CardType = keyof typeof CARD_TYPE;

export type ApiResponseColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'black'
  | 'purple'
  | 'white';

export const COLOR = {
  '1_red': '1_red',
  '2_blue': '2_blue',
  '3_yellow': '3_yellow',
  '4_green': '4_green',
  '5_black': '5_black',
  '6_purple': '6_purple',
  '7_white': '7_white',
  '8_multicolor': '8_multicolor',
} as const;

export type Color = keyof typeof COLOR;

export type CardInfo = {
  no: string;
  lv?: string;
  // lv?: Lv;
  rarity: string;
  cardtype: CardType;
  parallel?: string;
  name: string;
  colors: Color[];
  color: string;
  form?: string;
  attribute: string;
  type: string;
  dp?: string;
  apperanceCost?: string;
  evolutionCost1?: string;
  evolutionCost2?: string;
  effect?: string;
  evolutionaryOriginEffect?: string;
  securityEffect?: string;
  imgFileName: string;
  category: string;
};

export const convertToDisplayColorFromColor = (color: Color): string => {
  switch (color) {
    case '1_red':
      return '赤';
    case '2_blue':
      return '青';
    case '3_yellow':
      return '黄';
    case '4_green':
      return '緑';
    case '5_black':
      return '黒';
    case '6_purple':
      return '紫';
    case '7_white':
      return '白';
    default:
      return '-';
  }
};

export const convertToColorCodeFromColor = (color: Color): string => {
  switch (color) {
    case '1_red':
      return '#e7052c';
    case '2_blue':
      return '#2697e1';
    case '3_yellow':
      return '#fde105';
    case '4_green':
      return '#2a9b69';
    case '5_black':
      return '#211715';
    case '6_purple':
      return '#6356a3';
    case '7_white':
      return '#ffffff';
    default:
      return '#a0a0a0';
  }
};

export const convertToDisplayCardTypeFromCardType = (
  cardType: CardType
): string => {
  switch (cardType) {
    case '1_デジタマ':
      return 'デジタマ';
    case '2_デジモン':
      return 'デジモン';
    case '3_テイマー':
      return 'テイマー';
    case '4_オプション':
      return 'オプション';
    default:
      return '-';
  }
};

export const convertToDisplayDigimonLvFromDigimonLv = (lv: Lv): string => {
  switch (lv) {
    case '-':
      return 'None';
    default:
      return lv;
  }
};
