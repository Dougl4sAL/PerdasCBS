export interface Loss {
  id: string
  codigo: string
  quantidade: number
  descricao: string
  fatorHecto: string
  hectoUnid: string
  precoUnid: string
  local: "Armazém" | "Puxada" | "Rota"
  area: string
  ajudante: string
  motivo: string
  data: string
}

export const LOCATIONS = ["Armazém", "Puxada", "Rota"] as const

export const AREAS_BY_LOCATION = {
  Armazém: ["Central", "Picking", "Repack"],
  Puxada: ["TNX-9J21", "RRC-9G34", "QMM-5A95"],
  Rota: ["Distribuição"],
} as const

export const HELPERS = [
  "Ray dos Santo",
  "Gleverton",
  "Felipe",
  "Luiz Eduardo",
  "Acacio Santos",
  "Amilton",
  "Cantiliano",
  "Cladson Diego",
  "Cosme",
  "Elenilson",
  "Gerson",
  "Gilson",
  "Henrique",
  "José Anderson",
  "José Carlos",
  "Maycon",
  "Rinaldo",
  "Silvino",
  "Rodrigo",
  "Inventário",
  "Pac. Prejuízo",
] as const

export const REASONS = [
  "Vencimento",
  "Quebra",
  "Furo",
  "Falta",
  "Micro Furo",
  "Mal Cheio",
  "Vazada",
  "Def. Rótulo",
  "Amassada",
  "Blow Out",
  "Vazia",
  "Quebrada",
  "Estufada",
  "Inventário",
] as const

export interface Product {
  codigo: string
  descricao: string
  fatorHecto: string
  hectoUnid: string
  precoUnid: string
}

export const MOCK_LOSSES: Loss[] = [
  {
    id: "1",
    codigo: "9092",
    quantidade: 5,
    descricao: "Skol Multipack",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,07",
    local: "Armazém",
    area: "Picking",
    ajudante: "Ray dos Santo",
    motivo: "Quebra",
    data: "06/11/2025",
  },
  {
    id: "2",
    codigo: "9069",
    quantidade: 3,
    descricao: "Skolata 350",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "3,85",
    local: "Armazém",
    area: "Central",
    ajudante: "Gleverton",
    motivo: "Vencimento",
    data: "05/11/2025",
  },
  {
    id: "3",
    codigo: "8745",
    quantidade: 2,
    descricao: "Brahma Extra",
    fatorHecto: "0,06",
    hectoUnid: "0,005",
    precoUnid: "2,50",
    local: "Puxada",
    area: "TNX-9J21",
    ajudante: "Felipe",
    motivo: "Furo",
    data: "04/11/2025",
  },
  {
    id: "4",
    codigo: "7521",
    quantidade: 1,
    descricao: "Antartica Dupla Malte",
    fatorHecto: "0,12",
    hectoUnid: "0,006",
    precoUnid: "3,50",
    local: "Rota",
    area: "Distribuição",
    ajudante: "Luiz Eduardo",
    motivo: "Amassada",
    data: "03/11/2025",
  },
  {
    id: "5",
    codigo: "6840",
    quantidade: 4,
    descricao: "Budweiser Premium",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,20",
    local: "Armazém",
    area: "Repack",
    ajudante: "Acacio Santos",
    motivo: "Mal Cheio",
    data: "02/11/2025",
  },
]

export const PRODUCTS: Product[] = [
  {
    codigo: "347",
    descricao: "SUKITA PET 1L CAIXA C/12",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,16"
  },
  {
    codigo: "371",
    descricao: "MALZBIER BRAHMA LONG NECK 355ML SIX-PACK BAND",
    fatorHecto: "0,0852",
    hectoUnid: "0,00355",
    precoUnid: "4,83"
  },
  {
    codigo: "503",
    descricao: "SUKITA PET 2L CAIXA C/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "5,36"
  },
  {
    codigo: "504",
    descricao: "PEPSI COLA PET 2L CAIXA C/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "6,88"
  },
  {
    codigo: "982",
    descricao: "SKOL 600ML",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "5,41"
  },
  {
    codigo: "988",
    descricao: "BRAHMA CHOPP 600ML",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "5,95"
  },
  {
    codigo: "1164",
    descricao: "SUKITA UVA LATA 350ML SH C/12 NPAL",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,41"
  },
  {
    codigo: "1166",
    descricao: "SUKITA UVA PET 2L CAIXA C/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "5,36"
  },
  {
    codigo: "1388",
    descricao: "SKOL GFA VD 1L 2,99",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "6,24"
  },
  {
    codigo: "1695",
    descricao: "BRAHMA CHOPP GFA VD 1L COM TTC",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "6,58"
  },
  {
    codigo: "1743",
    descricao: "ANTARCTICA PILSEN GFA VD 1L COM TTC",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "6,03"
  },
  {
    codigo: "1745",
    descricao: "SKOL LT 269ML SH C15 NPAL",
    fatorHecto: "0,04035",
    hectoUnid: "0,00269",
    precoUnid: "2,58"
  },
  {
    codigo: "1898",
    descricao: "BRAHMA CHOPP LT 269ML SH C15 NPAL",
    fatorHecto: "0,04035",
    hectoUnid: "0,00269",
    precoUnid: "2,66"
  },
  {
    codigo: "2006",
    descricao: "ANTARCTICA SUBZERO 600ML",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "5,12"
  },
  {
    codigo: "2008",
    descricao: "ANTARCTICA SUBZERO LATA 350ML SH C/12 NPAL",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,97"
  },
  {
    codigo: "2319",
    descricao: "GUARANA CHP ANTARCTICA PET 1L CAIXA C/12",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,32"
  },
  {
    codigo: "2320",
    descricao: "SODA LIMONADA ANTARCTICA PET 1L CAIXA C/12",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,16"
  },
  {
    codigo: "2349",
    descricao: "GUARANA CHP ANTARCTICA PET 2L CAIXA C/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "7,12"
  },
  {
    codigo: "2350",
    descricao: "SODA LIMONADA ANTARCTICA PET 2L CAIXA C/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "6,88"
  },
  {
    codigo: "2353",
    descricao: "GUARANA CHP ANTARCTICA DIET PET 2L CAIXA C/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "7,12"
  },
  {
    codigo: "2538",
    descricao: "ANTARCTICA PILSEN 600ML",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "5,12"
  },
  {
    codigo: "2546",
    descricao: "ORIGINAL 600ML",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "6,25"
  },
  {
    codigo: "2548",
    descricao: "BUDWEISER 600ML",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "6,25"
  },
  {
    codigo: "3733",
    descricao: "BOHEMIA NOVA EMBALAGEM 600ML",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "5,95"
  },
  {
    codigo: "4293",
    descricao: "PEPSI BLACK PET 200ML SH C/12",
    fatorHecto: "0,024",
    hectoUnid: "0,002",
    precoUnid: "1,52"
  },
  {
    codigo: "4409",
    descricao: "PEPSI TWIST PET 2L SHRINK C/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "6,88"
  },
  {
    codigo: "7325",
    descricao: "PEPSI COLA PET 1L CAIXA C/12",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,16"
  },
  {
    codigo: "7945",
    descricao: "PEPSI COLA PET 2,5L CAIXA C/6",
    fatorHecto: "0,15",
    hectoUnid: "0,025",
    precoUnid: "7,92"
  },
  {
    codigo: "7947",
    descricao: "GUARANA CHP ANTARCTICA PET 2,5L CAIXA C/6",
    fatorHecto: "0,15",
    hectoUnid: "0,025",
    precoUnid: "8"
  },
  {
    codigo: "7977",
    descricao: "GATORADE UVA PET 500ML SIXPACK",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "4,79"
  },
  {
    codigo: "7980",
    descricao: "GATORADE TANGERINA PET 500ML SIXPACK",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "4,79"
  },
  {
    codigo: "7981",
    descricao: "GATORADE LARANJA PET 500ML SIXPACK",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "4,79"
  },
  {
    codigo: "7982",
    descricao: "GATORADE LIMAO PET 500ML SIXPACK",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "4,79"
  },
  {
    codigo: "7983",
    descricao: "GATORADE MORANGO-MARACUJA PET 500ML SIXPACK",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "4,79"
  },
  {
    codigo: "8411",
    descricao: "GUARANA CHP ANTARCTICA PET 1,5 SHRINK C/6",
    fatorHecto: "0,09",
    hectoUnid: "0,015",
    precoUnid: "5,6"
  },
  {
    codigo: "8753",
    descricao: "GATORADE TROPICAL PET 500ML SIXPACK",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "#N/D"
  },
  {
    codigo: "8791",
    descricao: "H2OH LIMAO C/GAS PET 500ML CAIXA C/12",
    fatorHecto: "0,06",
    hectoUnid: "0,005",
    precoUnid: "3,84"
  },
  {
    codigo: "8793",
    descricao: "H2OH LIMAO C/GAS PET 1,5L CAIXA C/6",
    fatorHecto: "0,09",
    hectoUnid: "0,015",
    precoUnid: "6,92"
  },
  {
    codigo: "9067",
    descricao: "ANTARCTICA PILSEN LATA 350ML SH C/12 NPAL",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,99"
  },
  {
    codigo: "9068",
    descricao: "SKOL LATA 350ML SH C/12 NPAL",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,99"
  },
  {
    codigo: "9069",
    descricao: "BRAHMA CHOPP LATA 350ML SH C/12 NPAL",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,16"
  },
  {
    codigo: "9072",
    descricao: "BOHEMIA NOVA EMBALAGEM LATA 350ML SH C/12 NPA",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,33"
  },
  {
    codigo: "9083",
    descricao: "SKOL LT 473ML SH C/12 NPAL",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "3,99"
  },
  {
    codigo: "9084",
    descricao: "GUARANA CHP ANTARCTICA LATA 350ML SH C/12 NPA",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,57"
  },
  {
    codigo: "9085",
    descricao: "GUARANA CHP ANTARCTICA DIET LATA 350ML SH C/1",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,57"
  },
  {
    codigo: "9087",
    descricao: "SODA LIMONADA ANTARCTICA LATA 350ML SH C/12 N",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,41"
  },
  {
    codigo: "9089",
    descricao: "SUKITA LATA 350ML SH C/12 NPAL",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,41"
  },
  {
    codigo: "9091",
    descricao: "TONICA ANTARCTICA LATA 350ML SH C/12 NPAL",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,65"
  },
  {
    codigo: "9093",
    descricao: "PEPSI TWIST LATA 350ML SH C/12 NPAL",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,41"
  },
  {
    codigo: "9096",
    descricao: "PEPSI COLA LATA 350ML SH C/12 NPAL",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,41"
  },
  {
    codigo: "9274",
    descricao: "PEPSI ZERO LATA 350ML SH C/12 NPAL",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,41"
  },
  {
    codigo: "9276",
    descricao: "PEPSI ZERO PET 2L CAIXA C/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "6,88"
  },
  {
    codigo: "9320",
    descricao: "BRAHMA CHOPP LT 473ML SH C/12 NPAL",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "4,16"
  },
  {
    codigo: "9795",
    descricao: "GUARANA ANTARCTICA ZERO PET 1L CAIXA C/12",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,32"
  },
  {
    codigo: "10761",
    descricao: "AGUA MIN LEV S/ GAS COPO 300ML CAIXA C/48",
    fatorHecto: "0,144",
    hectoUnid: "0,003",
    precoUnid: "0,62"
  },
  {
    codigo: "10763",
    descricao: "AGUA MIN LEV S/ GAS PET 500ML CAIXA C/12",
    fatorHecto: "0,06",
    hectoUnid: "0,005",
    precoUnid: "0,75"
  },
  {
    codigo: "10765",
    descricao: "AGUA MIN LEV S/ GAS PET 1500 CX06",
    fatorHecto: "0,09",
    hectoUnid: "0,015",
    precoUnid: "1,67"
  },
  {
    codigo: "12791",
    descricao: "AGUA MIN LEV C/ GAS PET 500ML CAIXA C/12",
    fatorHecto: "0,06",
    hectoUnid: "0,005",
    precoUnid: "1,58"
  },
  {
    codigo: "12948",
    descricao: "BRAHMA CHOPP ZERO LATA 350ML SH C/12 NPAL",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,16"
  },
  {
    codigo: "12951",
    descricao: "BRAHMA CHOPP ZERO LN 355ML SIXPACK CX CART C/",
    fatorHecto: "0,0852",
    hectoUnid: "0,00355",
    precoUnid: "4,08"
  },
  {
    codigo: "13061",
    descricao: "H2OH LIMONETO PET 500ML SHRINK C/12 NPAL",
    fatorHecto: "0,06",
    hectoUnid: "0,005",
    precoUnid: "3,84"
  },
  {
    codigo: "13065",
    descricao: "H2OH LIMONETO PET 1,5 SHRINK C/06 NPAL",
    fatorHecto: "0,09",
    hectoUnid: "0,015",
    precoUnid: "6,92"
  },
  {
    codigo: "13196",
    descricao: "SKOL ONE WAY 300ML CX C/23",
    fatorHecto: "0,069",
    hectoUnid: "0,003",
    precoUnid: "3,3"
  },
  {
    codigo: "13201",
    descricao: "BRAHMA CHOPP GFA VD 300ML CX C/23",
    fatorHecto: "0,069",
    hectoUnid: "0,003",
    precoUnid: "2,34"
  },
  {
    codigo: "13205",
    descricao: "SKOL GFA VD 300ML CX C/23",
    fatorHecto: "0,069",
    hectoUnid: "0,003",
    precoUnid: "2,34"
  },
  {
    codigo: "13566",
    descricao: "SKOL BEATS SENSES LT 269ML CX C/8 FRIDGE PACK",
    fatorHecto: "0,02152",
    hectoUnid: "0,00269",
    precoUnid: "5,35"
  },
  {
    codigo: "14135",
    descricao: "BUDWEISER LATA 473ML SIX-PACK SH C/2 NPAL",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "4,66"
  },
  {
    codigo: "14844",
    descricao: "GUARANA CHP ANTARCTICA LT 269ML SH C/15",
    fatorHecto: "0,04035",
    hectoUnid: "0,00269",
    precoUnid: "2,17"
  },
  {
    codigo: "17808",
    descricao: "BUDWEISER OW 330ML CX C/24",
    fatorHecto: "0,0792",
    hectoUnid: "0,0033",
    precoUnid: "4,91"
  },
  {
    codigo: "18152",
    descricao: "GUARANA CHP ANTARCTICA PET 200ML SH C/12",
    fatorHecto: "0,024",
    hectoUnid: "0,002",
    precoUnid: "1,6"
  },
  {
    codigo: "18266",
    descricao: "PEPSI COLA PET 200ML SH C/12",
    fatorHecto: "0,024",
    hectoUnid: "0,002",
    precoUnid: "1,52"
  },
  {
    codigo: "18267",
    descricao: "SODA LIMONADA ANTARCTICA PET 200ML SH C/12",
    fatorHecto: "0,024",
    hectoUnid: "0,002",
    precoUnid: "1,52"
  },
  {
    codigo: "18268",
    descricao: "SUKITA PET 200ML SH C/12",
    fatorHecto: "0,024",
    hectoUnid: "0,002",
    precoUnid: "1,52"
  },
  {
    codigo: "18780",
    descricao: "CORONITA EXTRA N OW 210ML CX C/4 SIX PACK",
    fatorHecto: "0,0504",
    hectoUnid: "0,0021",
    precoUnid: "4,99"
  },
  {
    codigo: "18807",
    descricao: "STELLA ARTOIS LONG NECK 330ML SIX-PACK SHRINK",
    fatorHecto: "0,0792",
    hectoUnid: "0,0033",
    precoUnid: "5,58"
  },
  {
    codigo: "18836",
    descricao: "CORONA EXTRA N LONG NECK 330ML CX C/24 NPAL",
    fatorHecto: "0,0792",
    hectoUnid: "0,0033",
    precoUnid: "6,41"
  },
  {
    codigo: "19164",
    descricao: "GUARANA CHP ANTARCTICA PET 1L PACK C/2 MULTPA",
    fatorHecto: "0,02",
    hectoUnid: "0,01",
    precoUnid: "5,4"
  },
  {
    codigo: "19225",
    descricao: "RED BULL BR LATA 250ML CX C 24 NPAL .",
    fatorHecto: "0,06",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "19227",
    descricao: "RED BULL BR LATA 355ML FOUR PACK .",
    fatorHecto: "0,0142",
    hectoUnid: "0,00355",
    precoUnid: "9,54"
  },
  {
    codigo: "19229",
    descricao: "RED BULL BR LATA 250ML SIX PACK NPAL .",
    fatorHecto: "0,015",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "19231",
    descricao: "RED BULL SUGAR FREE BR LATA 250ML FOUR PACK N",
    fatorHecto: "0,01",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "19321",
    descricao: "GUARANA ANTARCTICA ZERO PET 200ML SH C/12",
    fatorHecto: "0,024",
    hectoUnid: "0,002",
    precoUnid: "1,6"
  },
  {
    codigo: "19668",
    descricao: "ORIGINAL LATA 350ML SH C/12 NPAL",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,74"
  },
  {
    codigo: "19729",
    descricao: "STELLA ARTOIS LT SLEEK 350ML C 8 CX CARTAO",
    fatorHecto: "0,028",
    hectoUnid: "0,0035",
    precoUnid: "4,58"
  },
  {
    codigo: "20217",
    descricao: "ORIGINAL GFA VD 300ML CX C/23",
    fatorHecto: "0,069",
    hectoUnid: "0,003",
    precoUnid: "2,69"
  },
  {
    codigo: "20329",
    descricao: "BRAHMA DUPLO MALTE 600ML",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "5,95"
  },
  {
    codigo: "20498",
    descricao: "BRAHMA DUPLO MALTE LT SLEEK 350ML SH C 12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,49"
  },
  {
    codigo: "20530",
    descricao: "STELLA ARTOIS 600 ML",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "7,33"
  },
  {
    codigo: "20535",
    descricao: "STELLA ARTOIS ONE WAY 600ML CX C/12 NPAL",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "4,33"
  },
  {
    codigo: "20549",
    descricao: "BRAHMA DUPLO MALTE GFA VD 300ML CX C/23",
    fatorHecto: "0,069",
    hectoUnid: "0,003",
    precoUnid: "2,6"
  },
  {
    codigo: "20651",
    descricao: "CORONA EXTRA N LT SLEEK 350ML C 8 CX CARTAO",
    fatorHecto: "0,028",
    hectoUnid: "0,0035",
    precoUnid: "4,99"
  },
  {
    codigo: "21020",
    descricao: "BUDWEISER LT SLEEK 350ML CX CART C 12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,49"
  },
  {
    codigo: "21119",
    descricao: "SKOL BEATS GT LT 269ML CX CARTAO C/8 NPAL",
    fatorHecto: "0,02152",
    hectoUnid: "0,00269",
    precoUnid: "5,35"
  },
  {
    codigo: "21526",
    descricao: "JOHNNIE WALKER RED LABEL GARRAFA VIDRO 1 L",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "121,7"
  },
  {
    codigo: "21527",
    descricao: "TANQUERAY GIN LONDON DRY GARRAFA VIDRO 750ML",
    fatorHecto: "0,0075",
    hectoUnid: "0,0075",
    precoUnid: "105,46"
  },
  {
    codigo: "21529",
    descricao: "ABSOLUT ORIGINAL GARRAFA VIDRO 1 L",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "88,2"
  },
  {
    codigo: "21632",
    descricao: "SPATEN N LN 355ML SIXPACK SH C/4",
    fatorHecto: "0,0852",
    hectoUnid: "0,00355",
    precoUnid: "4,99"
  },
  {
    codigo: "21658",
    descricao: "SPATEN N LT SLEEK 350ML CX CART C 12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,99"
  },
  {
    codigo: "21666",
    descricao: "RED BULL TROPICAL BR LATA 250ML FOUR PACK NPA",
    fatorHecto: "0,01",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "21668",
    descricao: "SPATEN N ONE WAY 600ML CX C/12 NP ARTE",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "4"
  },
  {
    codigo: "21781",
    descricao: "SMIRNOFF ICE GARRAFA VD 275ML CX C24",
    fatorHecto: "0,066",
    hectoUnid: "0,00275",
    precoUnid: "6,38"
  },
  {
    codigo: "21786",
    descricao: "MONTILLA CARTA BRANCA GARRAFA VIDRO 1 L",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "26,29"
  },
  {
    codigo: "21789",
    descricao: "ORLOFF GARRAFA VIDRO 1 L",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "27,3"
  },
  {
    codigo: "21791",
    descricao: "PIRASSUNUNGA 51 GARRAFA VIDRO 965ML",
    fatorHecto: "0,00965",
    hectoUnid: "0,00965",
    precoUnid: "10,05"
  },
  {
    codigo: "21886",
    descricao: "BEEFEATER LONDON DRY GARRAFA VIDRO 750ML",
    fatorHecto: "0,0075",
    hectoUnid: "0,0075",
    precoUnid: "108,5"
  },
  {
    codigo: "21955",
    descricao: "CHIVAS REGAL 12 ANOS GARRAFA VIDRO 1 L",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "133,88"
  },
  {
    codigo: "21968",
    descricao: "TRIDENT HORTELA ENVELOPE 8G CX C/21",
    fatorHecto: "0,00168",
    hectoUnid: "0,00008",
    precoUnid: "1,83"
  },
  {
    codigo: "21970",
    descricao: "TRIDENT MENTA ENVELOPE 8G CX C/21",
    fatorHecto: "0,00168",
    hectoUnid: "0,00008",
    precoUnid: "1,83"
  },
  {
    codigo: "21973",
    descricao: "TRIDENT MELANCIA ENVELOPE 8G CX C/21",
    fatorHecto: "0,00168",
    hectoUnid: "0,00008",
    precoUnid: "1,83"
  },
  {
    codigo: "21974",
    descricao: "TRIDENT TUTTI-FRUTTI ENVELOPE 8G CX C/21",
    fatorHecto: "0,00168",
    hectoUnid: "0,00008",
    precoUnid: "1,83"
  },
  {
    codigo: "22003",
    descricao: "HALLS CEREJA ENVELOPE 28G CX C/21",
    fatorHecto: "0,00588",
    hectoUnid: "0,00028",
    precoUnid: "1,11"
  },
  {
    codigo: "22005",
    descricao: "HALLS MENTA ENVELOPE 28G CX C/21",
    fatorHecto: "0,00588",
    hectoUnid: "0,00028",
    precoUnid: "1,11"
  },
  {
    codigo: "22009",
    descricao: "CHICLETE ADAMS HORTELA CAIXINHA 2,8G CX C/100",
    fatorHecto: "0,0028",
    hectoUnid: "0,000028",
    precoUnid: "0,28"
  },
  {
    codigo: "22106",
    descricao: "MINI OREO PCT 35G CX C/10",
    fatorHecto: "0,0035",
    hectoUnid: "0,00035",
    precoUnid: "2,63"
  },
  {
    codigo: "22177",
    descricao: "BUDWEISER ZERO LT SLEEK 350ML C 8 CX CARTAO",
    fatorHecto: "0,028",
    hectoUnid: "0,0035",
    precoUnid: "3,49"
  },
  {
    codigo: "22180",
    descricao: "BUDWEISER ZERO LONG NECK 330ML SIX-PACK SHRIN",
    fatorHecto: "0,0792",
    hectoUnid: "0,0033",
    precoUnid: "4,91"
  },
  {
    codigo: "22382",
    descricao: "PASSPORT SELECTION GARRAFA VIDRO 1 L",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "43,54"
  },
  {
    codigo: "22514",
    descricao: "BALLANTINES FINEST GARRAFA VIDRO 750ML",
    fatorHecto: "0,0075",
    hectoUnid: "0,0075",
    precoUnid: "63,84"
  },
  {
    codigo: "22563",
    descricao: "CHIVAS REGAL 12 ANOS GARRAFA VIDRO 750ML",
    fatorHecto: "0,0075",
    hectoUnid: "0,0075",
    precoUnid: "126,77"
  },
  {
    codigo: "22564",
    descricao: "ABSOLUT ORIGINAL GARRAFA VIDRO 750ML",
    fatorHecto: "0,0075",
    hectoUnid: "0,0075",
    precoUnid: "78,05"
  },
  {
    codigo: "22830",
    descricao: "MONTILLA CARTA OURO GARRAFA VIDRO 1 L",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "27,3"
  },
  {
    codigo: "23028",
    descricao: "BUCHANANS WHISKY DELUXE 12 ANOS GARRAFA VIDRO",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "221,17"
  },
  {
    codigo: "23029",
    descricao: "JOHNNIE WALKER BLACK LABEL GARRAFA VIDRO 1 L",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "205,94"
  },
  {
    codigo: "23184",
    descricao: "PITU AGUARDENTE LT 350ML CX C/12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "4,39"
  },
  {
    codigo: "23186",
    descricao: "SPATEN N 600ML",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "6,66"
  },
  {
    codigo: "23246",
    descricao: "PIRACANJUBA LEITE CONDENSADO TETRAPAK 395G CX",
    fatorHecto: "0,10665",
    hectoUnid: "0,00395",
    precoUnid: "6,12"
  },
  {
    codigo: "23256",
    descricao: "PIRACANJUBA CREME DE LEITE TETRAPAK 200G CX C",
    fatorHecto: "0,054",
    hectoUnid: "0,002",
    precoUnid: "3,98"
  },
  {
    codigo: "23269",
    descricao: "SKOL BEATS GT LONG NECK 269ML SIX-PACK SH C/4",
    fatorHecto: "0,06456",
    hectoUnid: "0,00269",
    precoUnid: "6,55"
  },
  {
    codigo: "23271",
    descricao: "SKOL BEATS SENSES LONG NECK 269ML SIX-PACK SH",
    fatorHecto: "0,06456",
    hectoUnid: "0,00269",
    precoUnid: "6,55"
  },
  {
    codigo: "23443",
    descricao: "PITU AGUARDENTE GARRAFA VIDRO 965ML",
    fatorHecto: "0,00965",
    hectoUnid: "0,00965",
    precoUnid: "10,05"
  },
  {
    codigo: "24306",
    descricao: "RED BULL MELANCIA LATA 250ML FOUR PACK NPAL",
    fatorHecto: "0,01",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "24409",
    descricao: "QUINTA DO MORGADO VINHO TINTO SUAVE GFA VD 75",
    fatorHecto: "0,0075",
    hectoUnid: "0,0075",
    precoUnid: "13,09"
  },
  {
    codigo: "24604",
    descricao: "MINALBA AGUA PREMIUM C/GAS GFA VDR 300ML CX/1",
    fatorHecto: "0,036",
    hectoUnid: "0,003",
    precoUnid: "4,83"
  },
  {
    codigo: "25151",
    descricao: "OLD PARR WHISKY GFA VDR 1L",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "144,03"
  },
  {
    codigo: "25174",
    descricao: "51 ICE BALADA GARRAFA VD 275ML CX C24",
    fatorHecto: "0,066",
    hectoUnid: "0,00275",
    precoUnid: "5,54"
  },
  {
    codigo: "25176",
    descricao: "51 ICE FRUIT MIX MORANGO + LARANJA GARRAFA VD",
    fatorHecto: "0,066",
    hectoUnid: "0,00275",
    precoUnid: "5,54"
  },
  {
    codigo: "25194",
    descricao: "CACHACA 51 LT 350ML CX C/12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "4,14"
  },
  {
    codigo: "25198",
    descricao: "CACHACA 51 LATA DE ALUMINIO 473ML CX12",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "5,24"
  },
  {
    codigo: "25700",
    descricao: "FUSION PET 2L SHRINK C/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "7,5"
  },
  {
    codigo: "25837",
    descricao: "SPATEN N LT 473ML CX CARTAO C/12",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "4,99"
  },
  {
    codigo: "26037",
    descricao: "MONTILLA CARTA CRISTAL GFA VDR 1L",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "27,3"
  },
  {
    codigo: "26462",
    descricao: "ORIGINAL LT 473ML CX CARTAO C/12",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "4,74"
  },
  {
    codigo: "26627",
    descricao: "PITU AGUARDENTE GARRAFA VD 600ML",
    fatorHecto: "0,006",
    hectoUnid: "0,006",
    precoUnid: "7,6"
  },
  {
    codigo: "26818",
    descricao: "PITU LIMAO LT 350ML CX C/12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "4,39"
  },
  {
    codigo: "26941",
    descricao: "PITU AGUARDENTE LATA DE ALUMINIO 473ML CX12",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "5,32"
  },
  {
    codigo: "27177",
    descricao: "HALLS MENTOL ENVELOPE 28G CX C/21",
    fatorHecto: "0,00588",
    hectoUnid: "0,00028",
    precoUnid: "1,11"
  },
  {
    codigo: "27866",
    descricao: "CORONA CERO SUNBREW N LONG NECK 330 ML SP BAS",
    fatorHecto: "0,0792",
    hectoUnid: "0,0033",
    precoUnid: "6,41"
  },
  {
    codigo: "28214",
    descricao: "MINALBA AGUA MINERAL S/GAS LAT 310ML FD 12",
    fatorHecto: "0,0372",
    hectoUnid: "0,0031",
    precoUnid: "4,24"
  },
  {
    codigo: "28216",
    descricao: "MINALBA AGUA MINERAL C/GAS LAT 310ML FD 12",
    fatorHecto: "0,0372",
    hectoUnid: "0,0031",
    precoUnid: "4,49"
  },
  {
    codigo: "28942",
    descricao: "YPE AGUA SANITARIA FRASCO PLAST 1L",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "2,94"
  },
  {
    codigo: "29010",
    descricao: "YPE AGUA SANITARIA GFA PLAST 2L CX 6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "5,57"
  },
  {
    codigo: "29040",
    descricao: "YPE ASSOLAN ESPONJA LA ACO PCTE 45G",
    fatorHecto: "0,00045",
    hectoUnid: "0,00045",
    precoUnid: "1,22"
  },
  {
    codigo: "29042",
    descricao: "YPE TIXAN LAVA ROUPAS PO PRIMAV CAIXA PAPEL C",
    fatorHecto: "0,008",
    hectoUnid: "0,008",
    precoUnid: "9,03"
  },
  {
    codigo: "29068",
    descricao: "YPE MULTIUSO CLASSICO FRASCO PLASTICO 500ML",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "5,08"
  },
  {
    codigo: "29170",
    descricao: "YPE LAVA LOUCAS LIQUIDO NEUTRO FRASCO PLASTIC",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "2,94"
  },
  {
    codigo: "29194",
    descricao: "YPE DESINFETANTE BAK LAVANDA FRASCO PLAS 500M",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "2,94"
  },
  {
    codigo: "29197",
    descricao: "TANG REFRESCO EM PO LIMAO PCT 18G DP C/18",
    fatorHecto: "0,00324",
    hectoUnid: "0,00018",
    precoUnid: "1,01"
  },
  {
    codigo: "29199",
    descricao: "TANG REFRESCO EM PO LARANJA PCT 18G DP C/18",
    fatorHecto: "0,00324",
    hectoUnid: "0,00018",
    precoUnid: "1,01"
  },
  {
    codigo: "29201",
    descricao: "TANG REFRESCO EM PO ABACAXI PCT 18G DP C/18",
    fatorHecto: "0,00324",
    hectoUnid: "0,00018",
    precoUnid: "1,01"
  },
  {
    codigo: "29207",
    descricao: "TANG REFRESCO EM PO MORANGO PCT 18G DP C/18",
    fatorHecto: "0,00324",
    hectoUnid: "0,00018",
    precoUnid: "1,01"
  },
  {
    codigo: "29209",
    descricao: "TANG REFRESCO EM PO MARACUJA PCT 18G DP C/18",
    fatorHecto: "0,00324",
    hectoUnid: "0,00018",
    precoUnid: "1,01"
  },
  {
    codigo: "29215",
    descricao: "TANG REFRESCO EM PO UVA PCT 18G DP C/18",
    fatorHecto: "0,00324",
    hectoUnid: "0,00018",
    precoUnid: "1,01"
  },
  {
    codigo: "29253",
    descricao: "ORIGINAL GFA VD 1L",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "7,16"
  },
  {
    codigo: "29323",
    descricao: "INDAIA BEB MISTA CITRUS LARANJA GFA PET 330ML",
    fatorHecto: "0,0396",
    hectoUnid: "0,0033",
    precoUnid: "1,77"
  },
  {
    codigo: "29580",
    descricao: "STELLA ARTOIS PURE GOLD LONG NECK 330ML SP SH",
    fatorHecto: "0,0792",
    hectoUnid: "0,0033",
    precoUnid: "5,83"
  },
  {
    codigo: "29654",
    descricao: "PASSPORT HONEY LICOR GARRAFA VIDRO 670ML",
    fatorHecto: "0,0067",
    hectoUnid: "0,0067",
    precoUnid: "40,5"
  },
  {
    codigo: "29845",
    descricao: "PEPSI BLACK PET 1 L SH C/12",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,16"
  },
  {
    codigo: "30045",
    descricao: "RED BULL BR LATA 473ML CX C 12",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "12,94"
  },
  {
    codigo: "30411",
    descricao: "YPE LAVA LOUCAS LIQ MACA FRASCO PLASTICO 500M",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "2,94"
  },
  {
    codigo: "30412",
    descricao: "YPE CLEAR LAVA LOUCAS FRASCO PLASTICO 500ML",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "2,94"
  },
  {
    codigo: "30413",
    descricao: "YPE COCO LAVA LOUCAS FRASCO PLASTICO 500ML",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "2,94"
  },
  {
    codigo: "30666",
    descricao: "YPE DESINFETANTE PINHO TRADICAO FRASCO PLASTI",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "3,97"
  },
  {
    codigo: "30928",
    descricao: "YPE TIXAN LAVA ROUPAS PO PRIMAV CAIXA PAPEL C",
    fatorHecto: "0,016",
    hectoUnid: "0,016",
    precoUnid: "16,14"
  },
  {
    codigo: "31064",
    descricao: "BUDWEISER LT 269ML SH C 15",
    fatorHecto: "0,04035",
    hectoUnid: "0,00269",
    precoUnid: "2,91"
  },
  {
    codigo: "31667",
    descricao: "YPE LAVA LOUCAS LIQUIDO NEUTRO FRASCO PLASTIC",
    fatorHecto: "0,12",
    hectoUnid: "0,005",
    precoUnid: "2,2"
  },
  {
    codigo: "31674",
    descricao: "YPE AMACIANTE INTENSO FRASCO PLASTICO 2 L CX6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "8,44"
  },
  {
    codigo: "31739",
    descricao: "YPE DESINFETANTE BAK EUCALIPTO FRASCO PLAST 5",
    fatorHecto: "0,06",
    hectoUnid: "0,005",
    precoUnid: "2,53"
  },
  {
    codigo: "31796",
    descricao: "YPE LAVA LOUCAS LIQUIDO NEUTRO FRASCO PL 5L",
    fatorHecto: "0,05",
    hectoUnid: "0,05",
    precoUnid: "20,2"
  },
  {
    codigo: "31799",
    descricao: "ATOL LAVA LOUCA LIQ NEUTRO FRASCO PLASTICO 50",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "1,93"
  },
  {
    codigo: "31972",
    descricao: "BLACK & WHITE WHISKY GFA VIDRO 700ML",
    fatorHecto: "0,007",
    hectoUnid: "0,007",
    precoUnid: "54,71"
  },
  {
    codigo: "32067",
    descricao: "GATORADE BERRY BLUE PET 500ML SIXPACK",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "4,79"
  },
  {
    codigo: "32349",
    descricao: "BEATS TROPICAL LT 269ML CX CARTAO C/8 NPAL",
    fatorHecto: "0,02152",
    hectoUnid: "0,00269",
    precoUnid: "5,35"
  },
  {
    codigo: "32500",
    descricao: "STELLA ARTOIS PURE GOLD LT SLEEK 350ML C 8 CX",
    fatorHecto: "0,028",
    hectoUnid: "0,0035",
    precoUnid: "4,74"
  },
  {
    codigo: "33641",
    descricao: "BALLANTINES 10 YEARS GARRAFA VIDRO 1 L",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "108,5"
  },
  {
    codigo: "33643",
    descricao: "YPE TIXAN LAVA ROUPAS PO MACIEZ CAIXA PAPEL C",
    fatorHecto: "0,008",
    hectoUnid: "0,008",
    precoUnid: "9,03"
  },
  {
    codigo: "33644",
    descricao: "YPE TIXAN LAVA ROUPAS PO MACIEZ CX PAPEL CART",
    fatorHecto: "0,016",
    hectoUnid: "0,016",
    precoUnid: "16,14"
  },
  {
    codigo: "33734",
    descricao: "BEATS RED MIX LT 269ML SH C/8",
    fatorHecto: "0,02152",
    hectoUnid: "0,00269",
    precoUnid: "5,35"
  },
  {
    codigo: "33818",
    descricao: "ORIGINAL LATA 350ML SHRINK C/12 MULTPACK",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "4,26"
  },
  {
    codigo: "33820",
    descricao: "BRAHMA CHOPP LATA 350ML SH C/12 NPAL MULTIPAC",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,63"
  },
  {
    codigo: "34027",
    descricao: "GUARANA CHP ANTARCTICA LATA 350ML SH C/12 NPA",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,79"
  },
  {
    codigo: "34233",
    descricao: "PITU AGUARDENTE MEL E LIMAO LT 350ML CX C/12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "4,39"
  },
  {
    codigo: "34263",
    descricao: "CORONA CERO SUNBREW N LT SLEEK 350ML C 8 CX C",
    fatorHecto: "0,028",
    hectoUnid: "0,0035",
    precoUnid: "4,99"
  },
  {
    codigo: "34296",
    descricao: "TRIDENT CANELA ENVELOPE 8G CX C/21",
    fatorHecto: "0,00168",
    hectoUnid: "0,00008",
    precoUnid: "1,83"
  },
  {
    codigo: "34298",
    descricao: "TRIDENT MORANGO ENVELOPE 8G CX C/21",
    fatorHecto: "0,00168",
    hectoUnid: "0,00008",
    precoUnid: "1,83"
  },
  {
    codigo: "34320",
    descricao: "GUARANA ANTARCTICA ZERO LATA 350ML SH C/12 NP",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,79"
  },
  {
    codigo: "34410",
    descricao: "HALLS UVA VERDE ENVELOPE 28G CX C/21",
    fatorHecto: "0,00588",
    hectoUnid: "0,00028",
    precoUnid: "1,11"
  },
  {
    codigo: "34420",
    descricao: "RED BULL SUMMER MARACUJA E MELAO LATA 250ML F",
    fatorHecto: "0,01",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "34429",
    descricao: "RED BULL SUGAR FREE AMORA LATA 250ML FOUR PAC",
    fatorHecto: "0,01",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "34432",
    descricao: "RED BULL TROPICAL BR LATA 473ML CX C 12",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "12,94"
  },
  {
    codigo: "34608",
    descricao: "SKOL LATA 350ML SH C/12 NPAL MULTIPACK",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,35"
  },
  {
    codigo: "34770",
    descricao: "RED BULL SUGAR FREE POMELO LATA 250ML FOUR PA",
    fatorHecto: "0,01",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "35331",
    descricao: "BUDWEISER GFA VD 1L",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "7,16"
  },
  {
    codigo: "35617",
    descricao: "BEATS GREEN MIX LT 269ML SH C/8",
    fatorHecto: "0,02152",
    hectoUnid: "0,00269",
    precoUnid: "5,35"
  },
]