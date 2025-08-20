import hotIcon from "../assets/icons/icon-exclusive.png";
import sportsIcon from "../assets/icons/icon-sport.png";
import casinoIcon from "../assets/icons/icon-casino.png";
import slotIcon from "../assets/icons/icon-slot.png";
import TableIcon from "../assets/icons/icon-table.png";
import fishicon from "../assets/icons/icon-fish.png";
import crashIcon from "../assets/icons/icon-crash.png";
import arcadeIcon from "../assets/icons/icon-arcade.png";
import lotteryIcon from "../assets/icons/icon-lottery.png";

import homeIcon from "../assets/icons/toolbar-icon-home.svg";
import promotionIcon from "../assets/icons/toolbar-icon-promotion.svg";
import withdrawIcon from "../assets/icons/toolbar-icon-deposit.svg";
import myaccountIcon from "../assets/icons/toolbar-icon-mine.svg";





import loginBanner1 from "../assets/images/login-banner1.webp";
import loginBanner2 from "../assets/images/login-banner2.webp";
import loginBanner3 from "../assets/images/login-banner3.webp";

import iconExchange from "../assets/icons/icon-exchange.svg";
import iconSportbook from "../assets/icons/icon-sportbook.svg";
import iconHorsebook from "../assets/icons/icon-horsebook.svg";
import velkieLogo from "../assets/icons/logo-velki.png";
import iconSboSport from "../assets/icons/icon-sbov2.svg";
import iconEsports from "../assets/icons/icon-awcme1sport.svg";

import Jili from "../assets/images/jilii.png";
import esport from "../assets/images/E1SPORT.webp";
import btg from "../assets/images/btg.png";
import iconhotroad from "../assets/images/hotroad.png";
import fc from "../assets/images/fc.png";
import jdb from "../assets/images/jdb.png";
import km from "../assets/images/km.png";
import pg from "../assets/images/pg.png";
import pt from "../assets/images/pt.png";
import rt from "../assets/images/REDTIGER.webp";
import sexy from "../assets/images/SEXYBCRT.webp";
import sg from "../assets/images/SPADEGAMING.webp";
import evo from "../assets/images/evo.png";
import sv388 from "../assets/images/SV388.webp";
import pp from "../assets/images/pp.png";
import yesbingo from "../assets/images/provider-awcmyesbingo.png";
import netent from "../assets/images/provider-netent.png";
import nlcLogo from "../assets/images/nl-yellow.svg";
import fastspin from "../assets/images/FASTSPIN.webp";
import joker from "../assets/images/provider-joker.png";
import p8 from "../assets/images/provider-awcmp8.png";
import dragonsoft from "../assets/images/DRAGONSOFT.webp";
import spribe from "../assets/images/SPRIBE.webp";
import betgames from "../assets/images/BETGAMES.webp";

import pakistanFlag from "../assets/images/flag-symbolism-Pakistan-design-Islamic.png";
import camodiaFlag from "../assets/images/Flag-Cambodia.png";
import philippinesFlag from "../assets/images/Flag_of_philippines.svg.jpg";
import brazilFlag from "../assets/images/Flag_of_Brazil.svg.png";
import indiaFlag from "../assets/images/Flag_of_India.svg.png";
import bangladeshFlag from "../assets/images/Flag_of_Bangladesh.svg.png";

// feature games

import feature1 from "../assets/images/features/feature1.webp";
import feature2 from "../assets/images/features/feature2.webp";
import feature3 from "../assets/images/features/feature3.webp";
import feature4 from "../assets/images/features/feature4.webp";
import feature5 from "../assets/images/features/feature5.webp";
import feature6 from "../assets/images/features/feature6.webp";
import feature7 from "../assets/images/features/feature7.webp";
import f1 from "../assets/images/features/feature-1.webp";
import f2 from "../assets/images/features/feature-2.webp";
// hotgame Image
import hot1 from "../assets/images/hot-casino/aviator.webp";
import hot2 from "../assets/images/hot-casino/JILI-TABLE-030.webp";
import hot3 from "../assets/images/hot-casino/JILI-TABLE-047.webp";
import hot4 from "../assets/images/hot-casino/JILI-TABLE-035.webp";
import hot5 from "../assets/images/hot-casino/KM-TABLE-021.webp";

import hot6 from "../assets/images/hot-casino/KM-TABLE-015.webp";
import hot7 from "../assets/images/hot-casino/KM-TABLE-022.webp";

import hot8 from "../assets/images/hot-casino/KM-TABLE-028.webp";
import hot9 from "../assets/images/hot-casino/KM-TABLE-060.webp";


import hot10 from "../assets/images/hot-casino/pgdragon.webp";

const obj = {
  user_status: {
    owner: "OW",
    sub_owner: "SOW",
    super_admin: "SUA",
    admin: "AD",
    sub_admin: "SAD",
    senior_super: "SSM",
    super_agent: "SA",
    agent: "AG",
    user: "CL",
  },
  user_next_status: {
    owner: "sub_owner",
    sub_owner: "super_admin",
    super_admin: "admin",
    admin: "sub_admin",
    sub_admin: "senior_super",
    senior_super: "super_agent",
    super_agent: "agent",
    agent: "user",
  },
  market_category: {
    1: "Market",
    3: "Bookmakers",
    5: "ManualOdds",
    10: "Win Toss",
    2: "Session",
    6: "Over by Over Session Market",
    7: "Player",
    9: "Wicket",
    11: "Bowler Session",
    8: "Last Digit ODD",
    4: "LineMarket",
    14: "Premium ODDs",
  },
  betCheckObj: {
    4: "Cricket",
    2: "Tennis",
    1: "Soccer",
    3: "Casino",
  },
  matchType: {
    cricket: "Cricket",
    tennis: "Tennis",
    soccer: "Soccer",
    casino: "Casino",
  },
};
export default obj;
export const priceFormat = (value) => {
  return new Intl.NumberFormat().format(value);
};
export const LoginBanner = [
  { id: 1, banner: loginBanner1 },
  { id: 2, banner: loginBanner2 },
  { id: 3, banner: loginBanner3 },
];
export const CountryFlagBanner = [
  { id: 1, banner: pakistanFlag, title: "Pakistan" },
  { id: 2, banner: camodiaFlag, title: "camodia" },
  { id: 3, banner: philippinesFlag, title: "philippines" },
  { id: 4, banner: brazilFlag, title: "brazil" },
  { id: 5, banner: indiaFlag, title: "india" },
  { id: 6, banner: bangladeshFlag, title: "bangladesh" },
];

export const FeaturedGames = [
  {
    id: 1,
    icons: feature1,
    title: "Crazy Time",
    titlebn: "পাগলামী সময়",
    gameTypeCheck: "platForm",
    platForm: "EVOLUTION",
    gameType: "LIVE",
    casinoType: "EVOLUTION-LIVE-006",
  },
  {
    id: 2,
    icons: feature2,
    title: "7up7down",
    titlebn: "7 আপ 7 ডাউন",
    platForm: "JILI",
    gameType: "TABLE",
    casinoType: "JILI-TABLE-011",
  },

  {
    icons: feature3,
    title: "Cricket King 18",
    titlebn: "ক্রিকেট কিং ১৮",
    gameType: "SLOT",
    platForm: "JILI",
    casinoType: "JILI-SLOT-078",
  },
  {
    icons: feature4,
    title: "Super Ace",
    titlebn: "সুপার এস",
    gameTypeCheck: "platForm",
    gameType: "SLOT",
    platForm: "JILI",
    casinoType: "JILI-SLOT-027",
  },
  {
    icons: feature5,
    title: "Wild Ace",
    titlebn: "বন্য টেক্কা",
    gameTypeCheck: "platForm",
    gameType: "SLOT",
    platForm: "JILI",
    casinoType: "JILI-SLOT-075",
  },
  {
    icons: feature6,
    title: "CrazySeven",
    titlebn: "ক্রেজি সেভেন",
    gameTypeCheck: "platForm",
    gameType: "SLOT",
    platForm: "JILI",
    casinoType: "JILI-SLOT-014",
  },
  {
    icons: feature7,
    title: "Cricket Sah 75",
    titlebn: "ক্রিকেট সাহ 75",
    gameTypeCheck: "platForm",
    gameType: "SLOT",
    platForm: "JILI",
    casinoType: "JILI-SLOT-082",
  },
  
];

export const SlotData = [
  {
    id: 1,
    icons: f1,
    title: "Skyward",
    titlebn: "আকাশমুখী",
    gameTypeCheck: "platForm",
    platForm: "SPRIBE",
    gameType: "EGAME",
    casinoType: "SPRIBE-EGAME-001",
  },
  {
    id: 2,
    icons: f2,
    title: "Crazy777",
    titlebn: "পাগল777",
    gameTypeCheck: "platForm",
    gameType: "SLOT",
    platForm: "JILI",
    casinoType:"JILI-SLOT-014"
  },
  // {
  //   id: 3,
  //   icons: f3,
  //   title: "Elemental Link Fire",
  //   titlebn: "জিলি",
  //   gameTypeCheck: "platForm",
  //   gameType: "SLOT",
  //   platForm: "JILI",
  // },
  // {
  //   id: 4,
  //   icons: f4,
  //   title: "SuperNiubi",
  //   titlebn: "পৃ",
  //   gameTypeCheck: "platForm",
  //   gameType: "SLOT",
  //   platForm: "PP",
  // },
  // {
  //   id: 5,
  //   icons: f5,
  //   title: "Supermarket Spree",
  //   titlebn: "কোদাল",
  //   gameTypeCheck: "platForm",
  //   gameType: "SLOT",
  //   platForm: "SPADE",
  // },{
  //   id: 6,
  //   icons: f6,
  //   title: "Cocktail Nights",
  //   titlebn: "কোদাল",
  //   gameTypeCheck: "platForm",
  //   gameType: "SLOT",
  //   platForm: "SPADE",
  // },{
  //   id: 5,
  //   icons: f7,
  //   title: "Asgardian Rising",
  //   titlebn: "কোদাল",
  //   gameTypeCheck: "platForm",
  //   gameType: "SLOT",
  //   platForm: "SPADE",
  // }
];

export const footerAccountMenu = [
  {
    id: 1,
    icons: homeIcon,
    title: "Home",
    link: "/",
    titlebn: "জমা",
  },
  {
    id: 1,
    icons: promotionIcon,
    title: "Promotions",
    link: "/promotions",
    titlebn: "জমা",
  },
  {
    id: 2,
    icons: withdrawIcon,
    title: "Deposit",
    link: "/deposit",
    titlebn: "প্রত্যাহার করুন",
  },
  {
    id: 2,
    icons: myaccountIcon,
    title: "My Account",
    link: "/myaccount",
    titlebn: "প্রত্যাহার করুন",
  },
];
export const casinoMainMenu = [
  {
    id: 1,
    icons: hotIcon,
    title: "Exclusive",
    type: "exclusive",
    titlebn: "গরম খেল",
  },
  {
    id: 1,
    icons: sportsIcon,
    title: "Sports",
    type: "sports",
    titlebn: "স্পোর্টস",
    position: "translate(5px, -7px)",
  },
  {
    id: 2,
    icons: casinoIcon,
    title: "Casino",
    titlebn: "ক্যাসিনো",
    type: "casino",
    position: "translate(-5px, 2px)",
  },
  {
    id: 3,
    icons: slotIcon,
    title: "Slot",
    titlebn: "স্লট",
    type: "slot",
    position: "translate(-1px, -7px)",
  },

  {
    id: 4,
    icons: TableIcon,
    title: "Table",
    titlebn: "টেবিল",
    type: "table",
    position: "translate(-9px, 3px)",
  },
  {
    id: 6,
    icons: crashIcon,
    title: "Crash",
    titlebn: "ক্র্যাশ",
    type: "crash",
    position: "translate(-5px, 2px)",
  },

  {
    id: 5,
    icons: fishicon,
    title: "Fishing",
    titlebn: "মাছ ধরা",
    type: "fishing",
    position: "translate(-4px, -5px)",
  },

  {
    id: 5,
    icons: arcadeIcon,
    title: "Arcade",
    type: "arcade",
    titlebn: "স্পোর্টসবুক",
  },

  {
    id: 6,
    icons: lotteryIcon,
    title: "Lottery",
    titlebn: "ভার্চুয়াল",
    type: "lottery",
    position: "translate(-7px, 9px)",
  },
];
export const casinoMenu = [
  {
    id: 1,
    title: "Exclusive",
    key: "exclusive",
    titlebn: "গরম খেল",

      
      array: [
        {
          id: 1,
          image:  hot1,
          title: "aviator",
          type: "aviator",
          gameTypeCheck: "platForm",
          platForm: "SPRIBE",
          gameType: "EGAME",
          casinoType: "SPRIBE-EGAME-001",
        },
        {
          id: 1,
          image: hot2,
          title: "Go Rush",
          type: "Go Rush",
          gameTypeCheck: "platForm",
          platForm: "JILI",
          gameType: "TABLE",
          casinoType: "JILI-TABLE-030",
        },
        {
          id: 2,
          image: hot3,
          title: "Crash Bonus",
          type: "Crash Bonus",
          gameTypeCheck: "platForm",
          platForm: "JILI",
          gameType: "TABLE",
          casinoType: "JILI-TABLE-047",
        },
        {
          id: 3,
          image: hot4,
          title: "Limbo",
          type: "Limbo",
          gameTypeCheck: "platForm",
          platForm: "JILI",
          gameType: "TABLE",
          casinoType: "JILI-TABLE-035",
        },
        {
          id: 4,
          image: hot5,
          title: "Number Matka",
          type: "Number Matka",
          gameTypeCheck: "platForm",
          platForm: "KINGMAKER",
          gameType: "TABLE",
          casinoType: "KM-TABLE-021",
        },
        {
          id: 5,
          image: hot6,
          title: "Sicbo",
          type: "Sicbo",
          gameTypeCheck: "platForm",
          platForm: "KINGMAKER",
          gameType: "TABLE",
          casinoType: "KM-TABLE-015",
        },
      
       
        {
          id:7,
          image: hot7,
          title: "Card Matka",
          type: "Card Matka",
          gameTypeCheck: "platForm",
          platForm: "KINGMAKER",
          gameType: "TABLE",
          casinoType: "KM-TABLE-022",
        },
        {
          id: 8,
          image: hot8,
          title: "7 Up 7 Down",
          type: "7 Up 7 Down",
          gameTypeCheck: "platForm",
          platForm: "KINGMAKER",
          gameType: "TABLE",
          casinoType: "KM-TABLE-028",
        },
        {
          id: 9,
          image: hot9,
          title: "Ludo",
          type: "Ludo",
          gameTypeCheck: "platForm",
          platForm: "KINGMAKER",
          gameType: "TABLE",
          casinoType: "KM-TABLE-060",
        },
        {
          id: 10,
          image: hot10,
          title: "Dragon ",
          type: "Dragon Tiger",
          gameTypeCheck: "platForm",
          platForm: "PG",
          gameType: "SLOT",
          casinoType: "PG-SLOT-035",
        },
  
      ],
  },
  {
    id: 1,
    title: "Sports",
    key: "sports",
    titlebn: "বিনিময়",
    array: [
      {
        image: iconExchange,
        title: "Exchange",
        gameTypeCheck: "sports",
        link: `${process.env.REACT_APP_SKY_URL}bkash/${localStorage.getItem(
          "token"
        )}`,
      },
      {
        image: velkieLogo,
        title: "Velki",
        gameTypeCheck: "sports",
        link: `${process.env.REACT_APP_VELKIE_URL}bkash/${localStorage.getItem(
          "token"
        )}`,
      },
      {
        image: iconSportbook,
        title: "Sportbook",
        link: "",
        gameTypeCheck: "platForm",
        platForm: "SABA",
        gameType: "VIRTUAL",
        casinoType: "SABA-VIRTUAL-001",
      },
      {
        image: iconSboSport,
        title: "SBO Sports",
        link: "",
        gameTypeCheck: "platForm",
        platForm: "SABA",
        gameType: "VIRTUAL",
        casinoType: "SABA-VIRTUAL-001",
      },
      {
        image: iconHorsebook,
        title: "Horsebook",
        link: "",
        gameTypeCheck: "platForm",
        platForm: "HORSEBOOK",
        gameType: "LIVE",
        casinoType: "HRB-LIVE-001",
      },
      {
        image: iconEsports,
        title: "E1sports",
        link: "",
        gameTypeCheck: "platForm",
        gameType: "ESPORTS",
        platForm: "E1SPORT",
        casinoType: "E1-ESPORTS-001",
      },
    ],
  },
  {
    id: 2,
    title: "Casino",
    key: "casino",
    titlebn: "লাইভ ক্যাসিনো",
    array: [
      {
        image: evo,
        title: "EVOLUTION",
        type: "evo",
        key: "live",

        platForm: "EVOLUTION",
        gameType: "LIVE",
        casinoType: "EVOLUTION-LIVE-006",
        isLobbyTrue: true,
      },
      {
        image: sexy,
        title: "SEXYBCRT",
        type: "sexy",
        key: "live",

        platForm: "SEXYBCRT",
        gameType: "LIVE",
        casinoType: "MX-LIVE-006",
        isLobbyTrue: true,
      },

      {
        image: iconhotroad,
        title: "HOTROAD",
        type: "hotroad",
        key: "live",

        platForm: "HOTROAD",
        gameType: "LIVE",
        casinoType: "HOTROAD-LIVE-001",
        isLobbyTrue: true,
      },
      {
        image: pt,
        title: "PLAYTECH",
        type: "pt",
        key: "live",
        platForm: "PT",
      },

      {
        image: betgames,
        title: "BG",
        type: "bg",
        key: "live",

        platForm: "BG",
        gameType: "LIVE",
        casinoType: "",
      },

      {
        image: pp,
        title: "PP",
        type: "pp",
        key: "live",
        platForm: "PP",
        gameType: "LIVE",
        casinoType: "PP-LIVE-001",
      },

      {
        image: esport,
        title: "E1SPORT",
        type: "e1sports",
        key: "live",
        gameTypeCheck: "platForm",
        gameType: "ESPORTS",
        platForm: "E1SPORT",
        casinoType: "E1-ESPORTS-001",
      },

      {
        image: sv388,
        title: "SV388",
        type: "sv",
        key: "live",
        gameTypeCheck: "platForm",
        platForm: "SV388",
        gameType: "LIVE",
        casinoType: "SV-LIVE-001",
      },
    ],
  },
  {
    id: 2,
    title: "Slot",
    key: "slot",
    titlebn: "স্লট",
    array: [
      {
        image: Jili,
        title: "JILI",
        type: "jili",
        key: "slot",

        gameType: "SLOT",
        platForm: "JILI",
      },
      {
        image: pg,
        title: "PG",
        type: "pg",
        key: "slot",

        gameType: "SLOT",
        platForm: "PG",
      },
      {
        image: jdb,
        title: "JDB",
        type: "jdb",
        key: "slot",

        gameType: "SLOT",
        platForm: "JDB",
      },

      {
        image: fastspin,
        title: "FASTSPIN",
        type: "FastSpin",
        key: "slot",

        gameType: "SLOT",
        platForm: "FASTSPIN",
      },

      {
        image: fc,
        title: "FC",
        type: "fc",
        key: "slot",

        gameType: "SLOT",
        platForm: "FC",
      },
      {
        image: sg,
        title: "SG",
        type: "spade",
        key: "slot",

        gameType: "SLOT",
        platForm: "SPADE",
      },
      {
        image: yesbingo,
        title: "Yes Bingo",
        type: "yesbingo",
        key: "slot",

        gameType: "SLOT",
        platForm: "YESBINGO",
      },
      {
        image: rt,
        title: "RT",
        type: "rt",
        key: "slot",

        gameType: "",
        platForm: "RT",
      },
      {
        image: pt,
        title: "PT",
        type: "pt",
        key: "slot",

        gameType: "SLOT",
        platForm: "PT",
      },

      {
        image: joker,
        title: "Joker",
        type: "Joker",
        key: "slot",

        gameType: "SLOT",
        platForm: "JOKER",
        casinoType: "",
      },

      {
        image: netent,
        title: "NETENT",
        type: "NETENT",
        key: "slot",

        gameType: "NETENT",
        platForm: "",
        casinoType: "",
      },

      {
        image: p8,
        title: "P8",
        type: "PLAYSTAR",
        key: "slot",

        gameType: "SLOT",
        platForm: "PLAY8",
        casinoType: "",
      },

      {
        image: btg,
        title: "BTG",
        type: "btg",
        key: "slot",

        gameType: "SLOT",
        platForm: "BTG",
      },

      {
        image: km,
        title: "KINGMAKER",
        type: "kingmaker",
        key: "slot",
        gameType: "SLOT",
        platForm: "KINGMAKER",
      },

      {
        image: pp,
        title: "PP",
        type: "pp",
        key: "slot",

        gameType: "SLOT",
        platForm: "PP",
      },
      {
        image: dragonsoft,
        title: "DRAGOONSOFT",
        type: "dragoonsoft",
        key: "slot",

        gameType: "SLOT",
        platForm: "DRAGOONSOFT",
      },

      {
        image: nlcLogo,
        title: "NLC",
        type: "NLC",
        key: "SLOT",

        platForm: "NLC",
        gameType: "SLOT",
      },
    ],
  },
  {
    id: 3,
    title: "Table",
    key: "table",
    titlebn: "টেবিল",
    array: [
      {
        image: Jili,
        title: "JILI",
        type: "jili",
        key: "table",

        gameType: "TABLE",
        platForm: "JILI",
      },
      {
        image: km,
        title: "KM",
        type: "kingmaker",
        key: "table",

        gameType: "TABLE",
        platForm: "KINGMAKER",
      },

      {
        image: spribe,
        title: "SPRIBE",
        type: "SPRIBE",
        key: "table",

        platForm: "SPRIBE",
        gameType: "",
        casinoType: "",
      },

      {
        image: pg,
        title: "PG",
        type: "pg",
        key: "TABLE",
        gameType: "SLOT",
        platForm: "PG",
        gameType: "TABLE",
      },

      {
        image: netent,
        title: "NETENT",
        type: "NETENT",
        key: "table",
        gameType: "TABLE",
        platForm: "NETENT",
        casinoType: "",
      },
    ],
  },
  {
    id: 1,
    title: "Crash",
    key: "crash",
    titlebn: "গরম খেল",
    array: [
      {
         image: spribe,
        title: "SPRIBE",
        type: "SPRIBE",
        key: "crash",
        // gameTypeCheck: "platForm",
        platForm: "SPRIBE",
        gameType: "",
        casinoType: "",
      },
      {
        image: Jili,
        title: "JILI",
        type: "jili",
        key: "crash",
        // gameTypeCheck: "platForm",
        gameType: "TABLE",
        platForm: "JILI",
      },
      {
        image: km,
        title: "KM",
        type: "kingmaker",
        key: "crash",
        // gameTypeCheck: "platForm",
        gameType: "TABLE",
        platForm: "KINGMAKER",
      },
      {
        image: pp,
        title: "PP",
        type: "pp",
        key: "crash",
        // gameTypeCheck: "platForm",
        gameType: "SLOT",
        platForm: "PP",
      },
    ],
  },
  {
    id: 4,
    title: "Fishing",
    key: "fishing",
    type: "fishing",
    array: [
      {
        image: Jili,
        title: "JILI",
        type: "jili",
        key: "fishing",
        gameType: "FH",
        platForm: "JILI",
      },

      {
        image: jdb,
        title: "JDB",
        type: "jdb",
        key: "fishing",
        gameType: "FH",
        platForm: "JDB",
      },
      {
        image: fc,
        title: "FC",
        type: "fc",
        key: "fishing",
        gameType: "FH",
        platForm: "FC",
      },

      {
        image: joker,
        title: "Joker",
        type: "Joker",
        key: "fishing",
        gameType: "FH",
        platForm: "JOKER",
        casinoType: "",
      },

      {
        image: yesbingo,
        title: "YELLOWBAT",
        type: "yl",
        key: "fishing",
        gameType: "FH",
        platForm: "YESBINGO",
      },

      {
        image: sg,
        title: "Spade",
        type: "spade",
        key: "fishing",
        gameType: "FH",
        platForm: "SPADE",
      },
    ],
  },

  {
    id: 6,
    title: "Arcade",
    key: "arcade",
    titlebn: "স্পোর্টসবুক",
    array: [
      {
        image: jdb,
        title: "JDB",
        type: "jdb",
        key: "arcade",
        gameType: "EGAME",
        platForm: "JDB",
      },
      {
        image: fc,
        title: "FC",
        type: "fc",
        key: "arcade",
        gameType: "EGAME",
        platForm: "FC",
      },
      {
        image: spribe,
        title: "SPRIBE",
        type: "SPRIBE",
        key: "arcade",
        gameType: "EGAME",
        platForm: "SPRIBE",
        casinoType: "",
      },
    ],
  },
  {
    id: 7,
    title: "Lottery",
    key: "lottery",
    titlebn: "খেলাধুলা",
    array: [
      {
        image: Jili,
        title: "JILI",
        type: "jili",
        key: "lottery",
        gameType: "FH",
        platForm: "JILI",
      },
      {
        image: km,
        title: "KM",
        type: "kingmaker",
        key: "lottery",
        gameType: "TABLE",
        platForm: "KINGMAKER",
      },
      {
        image: joker,
        title: "Joker",
        type: "Joker",
        key: "lottery",
        gameType: "SLOT",
        platForm: "JOKER",
        casinoType: "",
      },
      {
        image: yesbingo,
        title: "YellowBat",
        type: "yesbingo",
        key: "lottery",
        gameType: "FH",
        platForm: "YESBINGO",
      },
    ],
  },
];


export const validationRules = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/,
  newPass: /^[a-zA-Z0-9]{8,15}$/,
  newPassMessage:
    "Password must contain uppercase and lowercase characters, numbers and must be minimum 8 character long (without special character).",
  passwordMessage:
    "Password must contain uppercase and lowercase characters, numbers, special character and must be minimum 8 character long.",
  characters: /^[a-zA-Z_ ]*$/,
  numbers: /^[0-9]*$/,
  removeWhitespace: /^[a-zA-Z0-9]+$/,
  numberNew: /^[0-9]*$/,
  numberWithDot: /^\d*(\.\d{0,10})?$/,
};
export const preventMaxInput = (e) => {
  e.target.value = e.target.value.trimStart();
  e.target.value = e.target.value.replace(/  +/g, " ");
};
export const AmountArray = [
  { id: 1, amount: 100 },
  { id: 2, amount: 500 },
  { id: 3, amount: 1000 },
  { id: 4, amount: 5000 },
  { id: 5, amount: 1000 },
  { id: 6, amount: 15000 },
  { id: 7, amount: 20000 },
  { id: 8, amount: 25000 },
];
