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
  デジモン: 'デジモン',
  デジタマ: 'デジタマ',
  テイマー: 'テイマー',
  オプション: 'オプション',
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

export type CardInfo = {
  no: string;
  lv?: string;
  // lv?: Lv;
  rarity: string;
  cardtype: string;
  // cardtype: CardType;
  parallel?: string;
  name: string;
  // color: ApiResponseColor;
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
};
