import BT01 from '../../assets/cardInfo/BT01.json';
import BT02 from '../../assets/cardInfo/BT02.json';
import BT03 from '../../assets/cardInfo/BT03.json';
import BT04 from '../../assets/cardInfo/BT04.json';
import BT05 from '../../assets/cardInfo/BT05.json';
import BT06 from '../../assets/cardInfo/BT06.json';
import BT07 from '../../assets/cardInfo/BT07.json';
import BT08 from '../../assets/cardInfo/BT08.json';
import EX01 from '../../assets/cardInfo/EX01.json';
import EX02 from '../../assets/cardInfo/EX02.json';
import PRO from '../../assets/cardInfo/PRO.json';
import ST01 from '../../assets/cardInfo/ST01.json';
import ST02 from '../../assets/cardInfo/ST02.json';
import ST03 from '../../assets/cardInfo/ST03.json';
import ST04 from '../../assets/cardInfo/ST04.json';
import ST05 from '../../assets/cardInfo/ST05.json';
import ST06 from '../../assets/cardInfo/ST06.json';
import ST07 from '../../assets/cardInfo/ST07.json';
import ST08 from '../../assets/cardInfo/ST08.json';
import ST09 from '../../assets/cardInfo/ST09.json';
import { CardInfo } from '../domains/card';

export const ALL_CARD_LIST: CardInfo[] = [
  ...BT01.cardInfoList.map((v) => ({ ...v, category: 'BT01' })),
  ...BT02.cardInfoList.map((v) => ({ ...v, category: 'BT02' })),
  ...BT03.cardInfoList.map((v) => ({ ...v, category: 'BT03' })),
  ...BT04.cardInfoList.map((v) => ({ ...v, category: 'BT04' })),
  ...BT05.cardInfoList.map((v) => ({ ...v, category: 'BT05' })),
  ...BT06.cardInfoList.map((v) => ({ ...v, category: 'BT06' })),
  ...BT07.cardInfoList.map((v) => ({ ...v, category: 'BT07' })),
  ...BT08.cardInfoList.map((v) => ({ ...v, category: 'BT08' })),
  ...EX01.cardInfoList.map((v) => ({ ...v, category: 'EX01' })),
  ...EX02.cardInfoList.map((v) => ({ ...v, category: 'EX02' })),
  ...PRO.cardInfoList.map((v) => ({ ...v, category: 'PRO' })),
  ...ST01.cardInfoList.map((v) => ({ ...v, category: 'ST01' })),
  ...ST02.cardInfoList.map((v) => ({ ...v, category: 'ST02' })),
  ...ST03.cardInfoList.map((v) => ({ ...v, category: 'ST03' })),
  ...ST04.cardInfoList.map((v) => ({ ...v, category: 'ST04' })),
  ...ST05.cardInfoList.map((v) => ({ ...v, category: 'ST05' })),
  ...ST06.cardInfoList.map((v) => ({ ...v, category: 'ST06' })),
  ...ST07.cardInfoList.map((v) => ({ ...v, category: 'ST07' })),
  ...ST08.cardInfoList.map((v) => ({ ...v, category: 'ST08' })),
  ...ST09.cardInfoList.map((v) => ({ ...v, category: 'ST09' })),
];
