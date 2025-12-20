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
    descricao: "sukita pet 1l caixa c/12",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,16"
  },
  {
    codigo: "371",
    descricao: "malzbier brahma long neck 355ml six-pack band",
    fatorHecto: "0,0852",
    hectoUnid: "0,00355",
    precoUnid: "4,83"
  },
  {
    codigo: "503",
    descricao: "sukita pet 2l caixa c/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "5,36"
  },
  {
    codigo: "504",
    descricao: "pepsi cola pet 2l caixa c/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "6,88"
  },
  {
    codigo: "982",
    descricao: "skol 600ml",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "5,41"
  },
  {
    codigo: "988",
    descricao: "brahma chopp 600ml",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "5,95"
  },
  {
    codigo: "1164",
    descricao: "sukita uva lata 350ml sh c/12 npal",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,41"
  },
  {
    codigo: "1166",
    descricao: "sukita uva pet 2l caixa c/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "5,36"
  },
  {
    codigo: "1388",
    descricao: "skol gfa vd 1l 2,99",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "6,24"
  },
  {
    codigo: "1695",
    descricao: "brahma chopp gfa vd 1l com ttc",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "6,58"
  },
  {
    codigo: "1743",
    descricao: "antarctica pilsen gfa vd 1l com ttc",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "6,03"
  },
  {
    codigo: "1745",
    descricao: "skol lt 269ml sh c15 npal",
    fatorHecto: "0,04035",
    hectoUnid: "0,00269",
    precoUnid: "2,58"
  },
  {
    codigo: "1898",
    descricao: "brahma chopp lt 269ml sh c15 npal",
    fatorHecto: "0,04035",
    hectoUnid: "0,00269",
    precoUnid: "2,66"
  },
  {
    codigo: "2006",
    descricao: "antarctica subzero 600ml",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "5,12"
  },
  {
    codigo: "2008",
    descricao: "antarctica subzero lata 350ml sh c/12 npal",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,97"
  },
  {
    codigo: "2319",
    descricao: "guarana chp antarctica pet 1l caixa c/12",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,32"
  },
  {
    codigo: "2320",
    descricao: "soda limonada antarctica pet 1l caixa c/12",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,16"
  },
  {
    codigo: "2349",
    descricao: "guarana chp antarctica pet 2l caixa c/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "7,12"
  },
  {
    codigo: "2350",
    descricao: "soda limonada antarctica pet 2l caixa c/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "6,88"
  },
  {
    codigo: "2353",
    descricao: "guarana chp antarctica diet pet 2l caixa c/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "7,12"
  },
  {
    codigo: "2538",
    descricao: "antarctica pilsen 600ml",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "5,12"
  },
  {
    codigo: "2546",
    descricao: "original 600ml",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "6,25"
  },
  {
    codigo: "2548",
    descricao: "budweiser 600ml",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "6,25"
  },
  {
    codigo: "3733",
    descricao: "bohemia nova embalagem 600ml",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "5,95"
  },
  {
    codigo: "4293",
    descricao: "pepsi black pet 200ml sh c/12",
    fatorHecto: "0,024",
    hectoUnid: "0,002",
    precoUnid: "1,52"
  },
  {
    codigo: "4409",
    descricao: "pepsi twist pet 2l shrink c/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "6,88"
  },
  {
    codigo: "7325",
    descricao: "pepsi cola pet 1l caixa c/12",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,16"
  },
  {
    codigo: "7945",
    descricao: "pepsi cola pet 2,5l caixa c/6",
    fatorHecto: "0,15",
    hectoUnid: "0,025",
    precoUnid: "7,92"
  },
  {
    codigo: "7947",
    descricao: "guarana chp antarctica pet 2,5l caixa c/6",
    fatorHecto: "0,15",
    hectoUnid: "0,025",
    precoUnid: "8"
  },
  {
    codigo: "7977",
    descricao: "gatorade uva pet 500ml sixpack",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "4,79"
  },
  {
    codigo: "7980",
    descricao: "gatorade tangerina pet 500ml sixpack",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "4,79"
  },
  {
    codigo: "7981",
    descricao: "gatorade laranja pet 500ml sixpack",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "4,79"
  },
  {
    codigo: "7982",
    descricao: "gatorade limao pet 500ml sixpack",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "4,79"
  },
  {
    codigo: "7983",
    descricao: "gatorade morango-maracuja pet 500ml sixpack",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "4,79"
  },
  {
    codigo: "8411",
    descricao: "guarana chp antarctica pet 1,5 shrink c/6",
    fatorHecto: "0,09",
    hectoUnid: "0,015",
    precoUnid: "5,6"
  },
  {
    codigo: "8753",
    descricao: "gatorade tropical pet 500ml sixpack",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "#N/D"
  },
  {
    codigo: "8791",
    descricao: "h2oh limao c/gas pet 500ml caixa c/12",
    fatorHecto: "0,06",
    hectoUnid: "0,005",
    precoUnid: "3,84"
  },
  {
    codigo: "8793",
    descricao: "h2oh limao c/gas pet 1,5l caixa c/6",
    fatorHecto: "0,09",
    hectoUnid: "0,015",
    precoUnid: "6,92"
  },
  {
    codigo: "9067",
    descricao: "antarctica pilsen lata 350ml sh c/12 npal",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,99"
  },
  {
    codigo: "9068",
    descricao: "skol lata 350ml sh c/12 npal",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,99"
  },
  {
    codigo: "9069",
    descricao: "brahma chopp lata 350ml sh c/12 npal",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,16"
  },
  {
    codigo: "9072",
    descricao: "bohemia nova embalagem lata 350ml sh c/12 npa",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,33"
  },
  {
    codigo: "9083",
    descricao: "skol lt 473ml sh c/12 npal",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "3,99"
  },
  {
    codigo: "9084",
    descricao: "guarana chp antarctica lata 350ml sh c/12 npa",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,57"
  },
  {
    codigo: "9085",
    descricao: "guarana chp antarctica diet lata 350ml sh c/1",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,57"
  },
  {
    codigo: "9087",
    descricao: "soda limonada antarctica lata 350ml sh c/12 n",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,41"
  },
  {
    codigo: "9089",
    descricao: "sukita lata 350ml sh c/12 npal",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,41"
  },
  {
    codigo: "9091",
    descricao: "tonica antarctica lata 350ml sh c/12 npal",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,65"
  },
  {
    codigo: "9093",
    descricao: "pepsi twist lata 350ml sh c/12 npal",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,41"
  },
  {
    codigo: "9096",
    descricao: "pepsi cola lata 350ml sh c/12 npal",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,41"
  },
  {
    codigo: "9274",
    descricao: "pepsi zero lata 350ml sh c/12 npal",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,41"
  },
  {
    codigo: "9276",
    descricao: "pepsi zero pet 2l caixa c/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "6,88"
  },
  {
    codigo: "9320",
    descricao: "brahma chopp lt 473ml sh c/12 npal",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "4,16"
  },
  {
    codigo: "9795",
    descricao: "guarana antarctica zero pet 1l caixa c/12",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,32"
  },
  {
    codigo: "10761",
    descricao: "agua min lev s/ gas copo 300ml caixa c/48",
    fatorHecto: "0,144",
    hectoUnid: "0,003",
    precoUnid: "0,62"
  },
  {
    codigo: "10763",
    descricao: "agua min lev s/ gas pet 500ml caixa c/12",
    fatorHecto: "0,06",
    hectoUnid: "0,005",
    precoUnid: "0,75"
  },
  {
    codigo: "10765",
    descricao: "agua min lev s/ gas pet 1500 cx06",
    fatorHecto: "0,09",
    hectoUnid: "0,015",
    precoUnid: "1,67"
  },
  {
    codigo: "12791",
    descricao: "agua min lev c/ gas pet 500ml caixa c/12",
    fatorHecto: "0,06",
    hectoUnid: "0,005",
    precoUnid: "1,58"
  },
  {
    codigo: "12948",
    descricao: "brahma chopp zero lata 350ml sh c/12 npal",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,16"
  },
  {
    codigo: "12951",
    descricao: "brahma chopp zero ln 355ml sixpack cx cart c/",
    fatorHecto: "0,0852",
    hectoUnid: "0,00355",
    precoUnid: "4,08"
  },
  {
    codigo: "13061",
    descricao: "h2oh limoneto pet 500ml shrink c/12 npal",
    fatorHecto: "0,06",
    hectoUnid: "0,005",
    precoUnid: "3,84"
  },
  {
    codigo: "13065",
    descricao: "h2oh limoneto pet 1,5 shrink c/06 npal",
    fatorHecto: "0,09",
    hectoUnid: "0,015",
    precoUnid: "6,92"
  },
  {
    codigo: "13196",
    descricao: "skol one way 300ml cx c/23",
    fatorHecto: "0,069",
    hectoUnid: "0,003",
    precoUnid: "3,3"
  },
  {
    codigo: "13201",
    descricao: "brahma chopp gfa vd 300ml cx c/23",
    fatorHecto: "0,069",
    hectoUnid: "0,003",
    precoUnid: "2,34"
  },
  {
    codigo: "13205",
    descricao: "skol gfa vd 300ml cx c/23",
    fatorHecto: "0,069",
    hectoUnid: "0,003",
    precoUnid: "2,34"
  },
  {
    codigo: "13566",
    descricao: "skol beats senses lt 269ml cx c/8 fridge pack",
    fatorHecto: "0,02152",
    hectoUnid: "0,00269",
    precoUnid: "5,35"
  },
  {
    codigo: "14135",
    descricao: "budweiser lata 473ml six-pack sh c/2 npal",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "4,66"
  },
  {
    codigo: "14844",
    descricao: "guarana chp antarctica lt 269ml sh c/15",
    fatorHecto: "0,04035",
    hectoUnid: "0,00269",
    precoUnid: "2,17"
  },
  {
    codigo: "17808",
    descricao: "budweiser ow 330ml cx c/24",
    fatorHecto: "0,0792",
    hectoUnid: "0,0033",
    precoUnid: "4,91"
  },
  {
    codigo: "18152",
    descricao: "guarana chp antarctica pet 200ml sh c/12",
    fatorHecto: "0,024",
    hectoUnid: "0,002",
    precoUnid: "1,6"
  },
  {
    codigo: "18266",
    descricao: "pepsi cola pet 200ml sh c/12",
    fatorHecto: "0,024",
    hectoUnid: "0,002",
    precoUnid: "1,52"
  },
  {
    codigo: "18267",
    descricao: "soda limonada antarctica pet 200ml sh c/12",
    fatorHecto: "0,024",
    hectoUnid: "0,002",
    precoUnid: "1,52"
  },
  {
    codigo: "18268",
    descricao: "sukita pet 200ml sh c/12",
    fatorHecto: "0,024",
    hectoUnid: "0,002",
    precoUnid: "1,52"
  },
  {
    codigo: "18780",
    descricao: "coronita extra n ow 210ml cx c/4 six pack",
    fatorHecto: "0,0504",
    hectoUnid: "0,0021",
    precoUnid: "4,99"
  },
  {
    codigo: "18807",
    descricao: "stella artois long neck 330ml six-pack shrink",
    fatorHecto: "0,0792",
    hectoUnid: "0,0033",
    precoUnid: "5,58"
  },
  {
    codigo: "18836",
    descricao: "corona extra n long neck 330ml cx c/24 npal",
    fatorHecto: "0,0792",
    hectoUnid: "0,0033",
    precoUnid: "6,41"
  },
  {
    codigo: "19164",
    descricao: "guarana chp antarctica pet 1l pack c/2 multpa",
    fatorHecto: "0,02",
    hectoUnid: "0,01",
    precoUnid: "5,4"
  },
  {
    codigo: "19225",
    descricao: "red bull br lata 250ml cx c 24 npal .",
    fatorHecto: "0,06",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "19227",
    descricao: "red bull br lata 355ml four pack .",
    fatorHecto: "0,0142",
    hectoUnid: "0,00355",
    precoUnid: "9,54"
  },
  {
    codigo: "19229",
    descricao: "red bull br lata 250ml six pack npal .",
    fatorHecto: "0,015",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "19231",
    descricao: "red bull sugar free br lata 250ml four pack n",
    fatorHecto: "0,01",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "19321",
    descricao: "guarana antarctica zero pet 200ml sh c/12",
    fatorHecto: "0,024",
    hectoUnid: "0,002",
    precoUnid: "1,6"
  },
  {
    codigo: "19668",
    descricao: "original lata 350ml sh c/12 npal",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,74"
  },
  {
    codigo: "19729",
    descricao: "stella artois lt sleek 350ml c 8 cx cartao",
    fatorHecto: "0,028",
    hectoUnid: "0,0035",
    precoUnid: "4,58"
  },
  {
    codigo: "20217",
    descricao: "original gfa vd 300ml cx c/23",
    fatorHecto: "0,069",
    hectoUnid: "0,003",
    precoUnid: "2,69"
  },
  {
    codigo: "20329",
    descricao: "brahma duplo malte 600ml",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "5,95"
  },
  {
    codigo: "20498",
    descricao: "brahma duplo malte lt sleek 350ml sh c 12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,49"
  },
  {
    codigo: "20530",
    descricao: "stella artois 600 ml",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "7,33"
  },
  {
    codigo: "20535",
    descricao: "stella artois one way 600ml cx c/12 npal",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "4,33"
  },
  {
    codigo: "20549",
    descricao: "brahma duplo malte gfa vd 300ml cx c/23",
    fatorHecto: "0,069",
    hectoUnid: "0,003",
    precoUnid: "2,6"
  },
  {
    codigo: "20651",
    descricao: "corona extra n lt sleek 350ml c 8 cx cartao",
    fatorHecto: "0,028",
    hectoUnid: "0,0035",
    precoUnid: "4,99"
  },
  {
    codigo: "21020",
    descricao: "budweiser lt sleek 350ml cx cart c 12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,49"
  },
  {
    codigo: "21119",
    descricao: "skol beats gt lt 269ml cx cartao c/8 npal",
    fatorHecto: "0,02152",
    hectoUnid: "0,00269",
    precoUnid: "5,35"
  },
  {
    codigo: "21526",
    descricao: "johnnie walker red label garrafa vidro 1 l",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "121,7"
  },
  {
    codigo: "21527",
    descricao: "tanqueray gin london dry garrafa vidro 750ml",
    fatorHecto: "0,0075",
    hectoUnid: "0,0075",
    precoUnid: "105,46"
  },
  {
    codigo: "21529",
    descricao: "absolut original garrafa vidro 1 l",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "88,2"
  },
  {
    codigo: "21632",
    descricao: "spaten n ln 355ml sixpack sh c/4",
    fatorHecto: "0,0852",
    hectoUnid: "0,00355",
    precoUnid: "4,99"
  },
  {
    codigo: "21658",
    descricao: "spaten n lt sleek 350ml cx cart c 12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,99"
  },
  {
    codigo: "21666",
    descricao: "red bull tropical br lata 250ml four pack npa",
    fatorHecto: "0,01",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "21668",
    descricao: "spaten n one way 600ml cx c/12 np arte",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "4"
  },
  {
    codigo: "21781",
    descricao: "smirnoff ice garrafa vd 275ml cx c24",
    fatorHecto: "0,066",
    hectoUnid: "0,00275",
    precoUnid: "6,38"
  },
  {
    codigo: "21786",
    descricao: "montilla carta branca garrafa vidro 1 l",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "26,29"
  },
  {
    codigo: "21789",
    descricao: "orloff garrafa vidro 1 l",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "27,3"
  },
  {
    codigo: "21791",
    descricao: "pirassununga 51 garrafa vidro 965ml",
    fatorHecto: "0,00965",
    hectoUnid: "0,00965",
    precoUnid: "10,05"
  },
  {
    codigo: "21886",
    descricao: "beefeater london dry garrafa vidro 750ml",
    fatorHecto: "0,0075",
    hectoUnid: "0,0075",
    precoUnid: "108,5"
  },
  {
    codigo: "21955",
    descricao: "chivas regal 12 anos garrafa vidro 1 l",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "133,88"
  },
  {
    codigo: "21968",
    descricao: "trident hortela envelope 8g cx c/21",
    fatorHecto: "0,00168",
    hectoUnid: "0,00008",
    precoUnid: "1,83"
  },
  {
    codigo: "21970",
    descricao: "trident menta envelope 8g cx c/21",
    fatorHecto: "0,00168",
    hectoUnid: "0,00008",
    precoUnid: "1,83"
  },
  {
    codigo: "21973",
    descricao: "trident melancia envelope 8g cx c/21",
    fatorHecto: "0,00168",
    hectoUnid: "0,00008",
    precoUnid: "1,83"
  },
  {
    codigo: "21974",
    descricao: "trident tutti-frutti envelope 8g cx c/21",
    fatorHecto: "0,00168",
    hectoUnid: "0,00008",
    precoUnid: "1,83"
  },
  {
    codigo: "22003",
    descricao: "halls cereja envelope 28g cx c/21",
    fatorHecto: "0,00588",
    hectoUnid: "0,00028",
    precoUnid: "1,11"
  },
  {
    codigo: "22005",
    descricao: "halls menta envelope 28g cx c/21",
    fatorHecto: "0,00588",
    hectoUnid: "0,00028",
    precoUnid: "1,11"
  },
  {
    codigo: "22009",
    descricao: "chiclete adams hortela caixinha 2,8g cx c/100",
    fatorHecto: "0,0028",
    hectoUnid: "0,000028",
    precoUnid: "0,28"
  },
  {
    codigo: "22106",
    descricao: "mini oreo pct 35g cx c/10",
    fatorHecto: "0,0035",
    hectoUnid: "0,00035",
    precoUnid: "2,63"
  },
  {
    codigo: "22177",
    descricao: "budweiser zero lt sleek 350ml c 8 cx cartao",
    fatorHecto: "0,028",
    hectoUnid: "0,0035",
    precoUnid: "3,49"
  },
  {
    codigo: "22180",
    descricao: "budweiser zero long neck 330ml six-pack shrin",
    fatorHecto: "0,0792",
    hectoUnid: "0,0033",
    precoUnid: "4,91"
  },
  {
    codigo: "22382",
    descricao: "passport selection garrafa vidro 1 l",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "43,54"
  },
  {
    codigo: "22514",
    descricao: "ballantines finest garrafa vidro 750ml",
    fatorHecto: "0,0075",
    hectoUnid: "0,0075",
    precoUnid: "63,84"
  },
  {
    codigo: "22563",
    descricao: "chivas regal 12 anos garrafa vidro 750ml",
    fatorHecto: "0,0075",
    hectoUnid: "0,0075",
    precoUnid: "126,77"
  },
  {
    codigo: "22564",
    descricao: "absolut original garrafa vidro 750ml",
    fatorHecto: "0,0075",
    hectoUnid: "0,0075",
    precoUnid: "78,05"
  },
  {
    codigo: "22830",
    descricao: "montilla carta ouro garrafa vidro 1 l",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "27,3"
  },
  {
    codigo: "23028",
    descricao: "buchanans whisky deluxe 12 anos garrafa vidro",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "221,17"
  },
  {
    codigo: "23029",
    descricao: "johnnie walker black label garrafa vidro 1 l",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "205,94"
  },
  {
    codigo: "23184",
    descricao: "pitu aguardente lt 350ml cx c/12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "4,39"
  },
  {
    codigo: "23186",
    descricao: "spaten n 600ml",
    fatorHecto: "0,144",
    hectoUnid: "0,006",
    precoUnid: "6,66"
  },
  {
    codigo: "23246",
    descricao: "piracanjuba leite condensado tetrapak 395g cx",
    fatorHecto: "0,10665",
    hectoUnid: "0,00395",
    precoUnid: "6,12"
  },
  {
    codigo: "23256",
    descricao: "piracanjuba creme de leite tetrapak 200g cx c",
    fatorHecto: "0,054",
    hectoUnid: "0,002",
    precoUnid: "3,98"
  },
  {
    codigo: "23269",
    descricao: "skol beats gt long neck 269ml six-pack sh c/4",
    fatorHecto: "0,06456",
    hectoUnid: "0,00269",
    precoUnid: "6,55"
  },
  {
    codigo: "23271",
    descricao: "skol beats senses long neck 269ml six-pack sh",
    fatorHecto: "0,06456",
    hectoUnid: "0,00269",
    precoUnid: "6,55"
  },
  {
    codigo: "23443",
    descricao: "pitu aguardente garrafa vidro 965ml",
    fatorHecto: "0,00965",
    hectoUnid: "0,00965",
    precoUnid: "10,05"
  },
  {
    codigo: "24306",
    descricao: "red bull melancia lata 250ml four pack npal",
    fatorHecto: "0,01",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "24409",
    descricao: "quinta do morgado vinho tinto suave gfa vd 75",
    fatorHecto: "0,0075",
    hectoUnid: "0,0075",
    precoUnid: "13,09"
  },
  {
    codigo: "24604",
    descricao: "minalba agua premium c/gas gfa vdr 300ml cx/1",
    fatorHecto: "0,036",
    hectoUnid: "0,003",
    precoUnid: "4,83"
  },
  {
    codigo: "25151",
    descricao: "old parr whisky gfa vdr 1l",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "144,03"
  },
  {
    codigo: "25174",
    descricao: "51 ice balada garrafa vd 275ml cx c24",
    fatorHecto: "0,066",
    hectoUnid: "0,00275",
    precoUnid: "5,54"
  },
  {
    codigo: "25176",
    descricao: "51 ice fruit mix morango + laranja garrafa vd",
    fatorHecto: "0,066",
    hectoUnid: "0,00275",
    precoUnid: "5,54"
  },
  {
    codigo: "25194",
    descricao: "cachaca 51 lt 350ml cx c/12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "4,14"
  },
  {
    codigo: "25198",
    descricao: "cachaca 51 lata de aluminio 473ml cx12",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "5,24"
  },
  {
    codigo: "25700",
    descricao: "fusion pet 2l shrink c/6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "7,5"
  },
  {
    codigo: "25837",
    descricao: "spaten n lt 473ml cx cartao c/12",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "4,99"
  },
  {
    codigo: "26037",
    descricao: "montilla carta cristal gfa vdr 1l",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "27,3"
  },
  {
    codigo: "26462",
    descricao: "original lt 473ml cx cartao c/12",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "4,74"
  },
  {
    codigo: "26627",
    descricao: "pitu aguardente garrafa vd 600ml",
    fatorHecto: "0,006",
    hectoUnid: "0,006",
    precoUnid: "7,6"
  },
  {
    codigo: "26818",
    descricao: "pitu limao lt 350ml cx c/12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "4,39"
  },
  {
    codigo: "26941",
    descricao: "pitu aguardente lata de aluminio 473ml cx12",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "5,32"
  },
  {
    codigo: "27177",
    descricao: "halls mentol envelope 28g cx c/21",
    fatorHecto: "0,00588",
    hectoUnid: "0,00028",
    precoUnid: "1,11"
  },
  {
    codigo: "27866",
    descricao: "corona cero sunbrew n long neck 330 ml sp bas",
    fatorHecto: "0,0792",
    hectoUnid: "0,0033",
    precoUnid: "6,41"
  },
  {
    codigo: "28214",
    descricao: "minalba agua mineral s/gas lat 310ml fd 12",
    fatorHecto: "0,0372",
    hectoUnid: "0,0031",
    precoUnid: "4,24"
  },
  {
    codigo: "28216",
    descricao: "minalba agua mineral c/gas lat 310ml fd 12",
    fatorHecto: "0,0372",
    hectoUnid: "0,0031",
    precoUnid: "4,49"
  },
  {
    codigo: "28942",
    descricao: "ype agua sanitaria frasco plast 1l",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "2,94"
  },
  {
    codigo: "29010",
    descricao: "ype agua sanitaria gfa plast 2l cx 6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "5,57"
  },
  {
    codigo: "29040",
    descricao: "ype assolan esponja la aco pcte 45g",
    fatorHecto: "0,00045",
    hectoUnid: "0,00045",
    precoUnid: "1,22"
  },
  {
    codigo: "29042",
    descricao: "ype tixan lava roupas po primav caixa papel c",
    fatorHecto: "0,008",
    hectoUnid: "0,008",
    precoUnid: "9,03"
  },
  {
    codigo: "29068",
    descricao: "ype multiuso classico frasco plastico 500ml",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "5,08"
  },
  {
    codigo: "29170",
    descricao: "ype lava loucas liquido neutro frasco plastic",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "2,94"
  },
  {
    codigo: "29194",
    descricao: "ype desinfetante bak lavanda frasco plas 500m",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "2,94"
  },
  {
    codigo: "29197",
    descricao: "tang refresco em po limao pct 18g dp c/18",
    fatorHecto: "0,00324",
    hectoUnid: "0,00018",
    precoUnid: "1,01"
  },
  {
    codigo: "29199",
    descricao: "tang refresco em po laranja pct 18g dp c/18",
    fatorHecto: "0,00324",
    hectoUnid: "0,00018",
    precoUnid: "1,01"
  },
  {
    codigo: "29201",
    descricao: "tang refresco em po abacaxi pct 18g dp c/18",
    fatorHecto: "0,00324",
    hectoUnid: "0,00018",
    precoUnid: "1,01"
  },
  {
    codigo: "29207",
    descricao: "tang refresco em po morango pct 18g dp c/18",
    fatorHecto: "0,00324",
    hectoUnid: "0,00018",
    precoUnid: "1,01"
  },
  {
    codigo: "29209",
    descricao: "tang refresco em po maracuja pct 18g dp c/18",
    fatorHecto: "0,00324",
    hectoUnid: "0,00018",
    precoUnid: "1,01"
  },
  {
    codigo: "29215",
    descricao: "tang refresco em po uva pct 18g dp c/18",
    fatorHecto: "0,00324",
    hectoUnid: "0,00018",
    precoUnid: "1,01"
  },
  {
    codigo: "29253",
    descricao: "original gfa vd 1l",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "7,16"
  },
  {
    codigo: "29323",
    descricao: "indaia beb mista citrus laranja gfa pet 330ml",
    fatorHecto: "0,0396",
    hectoUnid: "0,0033",
    precoUnid: "1,77"
  },
  {
    codigo: "29580",
    descricao: "stella artois pure gold long neck 330ml sp sh",
    fatorHecto: "0,0792",
    hectoUnid: "0,0033",
    precoUnid: "5,83"
  },
  {
    codigo: "29654",
    descricao: "passport honey licor garrafa vidro 670ml",
    fatorHecto: "0,0067",
    hectoUnid: "0,0067",
    precoUnid: "40,5"
  },
  {
    codigo: "29845",
    descricao: "pepsi black pet 1 l sh c/12",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "4,16"
  },
  {
    codigo: "30045",
    descricao: "red bull br lata 473ml cx c 12",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "12,94"
  },
  {
    codigo: "30411",
    descricao: "ype lava loucas liq maca frasco plastico 500m",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "2,94"
  },
  {
    codigo: "30412",
    descricao: "ype clear lava loucas frasco plastico 500ml",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "2,94"
  },
  {
    codigo: "30413",
    descricao: "ype coco lava loucas frasco plastico 500ml",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "2,94"
  },
  {
    codigo: "30666",
    descricao: "ype desinfetante pinho tradicao frasco plasti",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "3,97"
  },
  {
    codigo: "30928",
    descricao: "ype tixan lava roupas po primav caixa papel c",
    fatorHecto: "0,016",
    hectoUnid: "0,016",
    precoUnid: "16,14"
  },
  {
    codigo: "31064",
    descricao: "budweiser lt 269ml sh c 15",
    fatorHecto: "0,04035",
    hectoUnid: "0,00269",
    precoUnid: "2,91"
  },
  {
    codigo: "31667",
    descricao: "ype lava loucas liquido neutro frasco plastic",
    fatorHecto: "0,12",
    hectoUnid: "0,005",
    precoUnid: "2,2"
  },
  {
    codigo: "31674",
    descricao: "ype amaciante intenso frasco plastico 2 l cx6",
    fatorHecto: "0,12",
    hectoUnid: "0,02",
    precoUnid: "8,44"
  },
  {
    codigo: "31739",
    descricao: "ype desinfetante bak eucalipto frasco plast 5",
    fatorHecto: "0,06",
    hectoUnid: "0,005",
    precoUnid: "2,53"
  },
  {
    codigo: "31796",
    descricao: "ype lava loucas liquido neutro frasco pl 5l",
    fatorHecto: "0,05",
    hectoUnid: "0,05",
    precoUnid: "20,2"
  },
  {
    codigo: "31799",
    descricao: "atol lava louca liq neutro frasco plastico 50",
    fatorHecto: "0,005",
    hectoUnid: "0,005",
    precoUnid: "1,93"
  },
  {
    codigo: "31972",
    descricao: "black & white whisky gfa vidro 700ml",
    fatorHecto: "0,007",
    hectoUnid: "0,007",
    precoUnid: "54,71"
  },
  {
    codigo: "32067",
    descricao: "gatorade berry blue pet 500ml sixpack",
    fatorHecto: "0,03",
    hectoUnid: "0,005",
    precoUnid: "4,79"
  },
  {
    codigo: "32349",
    descricao: "beats tropical lt 269ml cx cartao c/8 npal",
    fatorHecto: "0,02152",
    hectoUnid: "0,00269",
    precoUnid: "5,35"
  },
  {
    codigo: "32500",
    descricao: "stella artois pure gold lt sleek 350ml c 8 cx",
    fatorHecto: "0,028",
    hectoUnid: "0,0035",
    precoUnid: "4,74"
  },
  {
    codigo: "33641",
    descricao: "ballantines 10 years garrafa vidro 1 l",
    fatorHecto: "0,01",
    hectoUnid: "0,01",
    precoUnid: "108,5"
  },
  {
    codigo: "33643",
    descricao: "ype tixan lava roupas po maciez caixa papel c",
    fatorHecto: "0,008",
    hectoUnid: "0,008",
    precoUnid: "9,03"
  },
  {
    codigo: "33644",
    descricao: "ype tixan lava roupas po maciez cx papel cart",
    fatorHecto: "0,016",
    hectoUnid: "0,016",
    precoUnid: "16,14"
  },
  {
    codigo: "33734",
    descricao: "beats red mix lt 269ml sh c/8",
    fatorHecto: "0,02152",
    hectoUnid: "0,00269",
    precoUnid: "5,35"
  },
  {
    codigo: "33818",
    descricao: "original lata 350ml shrink c/12 multpack",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "4,26"
  },
  {
    codigo: "33820",
    descricao: "brahma chopp lata 350ml sh c/12 npal multipac",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,63"
  },
  {
    codigo: "34027",
    descricao: "guarana chp antarctica lata 350ml sh c/12 npa",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,79"
  },
  {
    codigo: "34233",
    descricao: "pitu aguardente mel e limao lt 350ml cx c/12",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "4,39"
  },
  {
    codigo: "34263",
    descricao: "corona cero sunbrew n lt sleek 350ml c 8 cx c",
    fatorHecto: "0,028",
    hectoUnid: "0,0035",
    precoUnid: "4,99"
  },
  {
    codigo: "34296",
    descricao: "trident canela envelope 8g cx c/21",
    fatorHecto: "0,00168",
    hectoUnid: "0,00008",
    precoUnid: "1,83"
  },
  {
    codigo: "34298",
    descricao: "trident morango envelope 8g cx c/21",
    fatorHecto: "0,00168",
    hectoUnid: "0,00008",
    precoUnid: "1,83"
  },
  {
    codigo: "34320",
    descricao: "guarana antarctica zero lata 350ml sh c/12 np",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "2,79"
  },
  {
    codigo: "34410",
    descricao: "halls uva verde envelope 28g cx c/21",
    fatorHecto: "0,00588",
    hectoUnid: "0,00028",
    precoUnid: "1,11"
  },
  {
    codigo: "34420",
    descricao: "red bull summer maracuja e melao lata 250ml f",
    fatorHecto: "0,01",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "34429",
    descricao: "red bull sugar free amora lata 250ml four pac",
    fatorHecto: "0,01",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "34432",
    descricao: "red bull tropical br lata 473ml cx c 12",
    fatorHecto: "0,05676",
    hectoUnid: "0,00473",
    precoUnid: "12,94"
  },
  {
    codigo: "34608",
    descricao: "skol lata 350ml sh c/12 npal multipack",
    fatorHecto: "0,042",
    hectoUnid: "0,0035",
    precoUnid: "3,35"
  },
  {
    codigo: "34770",
    descricao: "red bull sugar free pomelo lata 250ml four pa",
    fatorHecto: "0,01",
    hectoUnid: "0,0025",
    precoUnid: "7,99"
  },
  {
    codigo: "35331",
    descricao: "budweiser gfa vd 1l",
    fatorHecto: "0,12",
    hectoUnid: "0,01",
    precoUnid: "7,16"
  },
  {
    codigo: "35617",
    descricao: "beats green mix lt 269ml sh c/8",
    fatorHecto: "0,02152",
    hectoUnid: "0,00269",
    precoUnid: "5,35"
  },
]