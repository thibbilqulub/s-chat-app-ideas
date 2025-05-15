
export type IntelligenceType = 
  | "linguistic" 
  | "logical" 
  | "musical" 
  | "bodily" 
  | "spatial" 
  | "interpersonal" 
  | "intrapersonal" 
  | "naturalistic";

export type Question = {
  id: string;
  text: string;
  type: IntelligenceType;
};

export const intelligenceTypes: Record<IntelligenceType, string> = {
  linguistic: "Kecerdasan Linguistik",
  logical: "Kecerdasan Logis-Matematis",
  musical: "Kecerdasan Musikal",
  bodily: "Kecerdasan Kinestetik-Jasmani",
  spatial: "Kecerdasan Spasial",
  interpersonal: "Kecerdasan Interpersonal",
  intrapersonal: "Kecerdasan Intrapersonal",
  naturalistic: "Kecerdasan Naturalistik"
};

export const intelligenceDescriptions: Record<IntelligenceType, string> = {
  linguistic: "Kepekaan terhadap makna dan urutan kata. Kemampuan dalam membaca, menulis, bercerita, dan ekspresi verbal.",
  logical: "Kemampuan bekerja dengan angka, pola logis, dan penalaran. Kemampuan dalam pemecahan masalah, analisis, dan investigasi ilmiah.",
  musical: "Kepekaan terhadap nada, melodi, ritme, dan tonal. Kemampuan dalam pertunjukan musik, komposisi, dan apresiasi.",
  bodily: "Kemampuan mengontrol gerakan tubuh dan kemampuan menangani objek dengan terampil. Kemampuan dalam aktivitas fisik, kerajinan, dan koordinasi.",
  spatial: "Kemampuan untuk memahami dunia visual-spasial secara akurat. Kemampuan dalam visualisasi, desain artistik, dan penalaran spasial.",
  interpersonal: "Kemampuan untuk memahami dan berinteraksi secara efektif dengan orang lain. Kemampuan dalam komunikasi, empati, dan membangun hubungan.",
  intrapersonal: "Kapasitas untuk kesadaran diri dan pemahaman tentang perasaan sendiri. Kemampuan dalam refleksi, pengaturan diri, dan pertumbuhan pribadi.",
  naturalistic: "Kemampuan mengenali dan mengkategorikan tumbuhan, hewan, dan fenomena alam. Kemampuan dalam mengamati, memahami, dan mengorganisir pola di alam."
};

// Questions for the test - 5 questions per intelligence type
export const questions: Question[] = [
  // Linguistic Intelligence
  {
    id: "L1",
    text: "Saya senang membaca buku dan artikel di waktu luang",
    type: "linguistic"
  },
  {
    id: "L2",
    text: "Saya mudah menjelaskan ide-ide kompleks kepada orang lain",
    type: "linguistic"
  },
  {
    id: "L3",
    text: "Saya menikmati permainan kata seperti TTS atau Scrabble",
    type: "linguistic"
  },
  {
    id: "L4",
    text: "Saya pandai mengingat kutipan atau frasa",
    type: "linguistic"
  },
  {
    id: "L5",
    text: "Saya mengekspresikan diri dengan baik dalam tulisan",
    type: "linguistic"
  },
  
  // Logical-Mathematical Intelligence
  {
    id: "M1",
    text: "Saya dapat dengan mudah melakukan perhitungan di kepala",
    type: "logical"
  },
  {
    id: "M2",
    text: "Saya senang memecahkan teka-teki atau permainan asah otak",
    type: "logical"
  },
  {
    id: "M3",
    text: "Saya suka menganalisis masalah secara sistematis",
    type: "logical"
  },
  {
    id: "M4",
    text: "Saya pandai mengenali pola dan hubungan",
    type: "logical"
  },
  {
    id: "M5",
    text: "Saya sering bertanya tentang bagaimana sesuatu bekerja",
    type: "logical"
  },
  
  // Musical Intelligence
  {
    id: "Mu1",
    text: "Saya dapat dengan mudah mengenali instrumen musik yang berbeda dalam lagu",
    type: "musical"
  },
  {
    id: "Mu2",
    text: "Saya sering memiliki melodi atau lagu yang terus terngiang di kepala",
    type: "musical"
  },
  {
    id: "Mu3",
    text: "Saya bisa tahu ketika sebuah nada tidak sesuai",
    type: "musical"
  },
  {
    id: "Mu4",
    text: "Saya senang menciptakan atau mendengarkan musik",
    type: "musical"
  },
  {
    id: "Mu5",
    text: "Saya dapat dengan mudah mengingat melodi",
    type: "musical"
  },
  
  // Bodily-Kinesthetic Intelligence
  {
    id: "B1",
    text: "Saya menikmati aktivitas fisik dan olahraga",
    type: "bodily"
  },
  {
    id: "B2",
    text: "Saya pandai dalam kerajinan atau aktivitas yang memerlukan gerakan tangan yang presisi",
    type: "bodily"
  },
  {
    id: "B3",
    text: "Saya belajar lebih baik dengan melakukan sesuatu secara fisik daripada membaca tentangnya",
    type: "bodily"
  },
  {
    id: "B4",
    text: "Saya menggunakan bahasa tubuh dan gestur saat berkomunikasi",
    type: "bodily"
  },
  {
    id: "B5",
    text: "Saya memiliki koordinasi dan keseimbangan yang baik",
    type: "bodily"
  },
  
  // Spatial Intelligence
  {
    id: "S1",
    text: "Saya dapat dengan mudah memvisualisasikan objek dari perspektif yang berbeda",
    type: "spatial"
  },
  {
    id: "S2",
    text: "Saya memiliki arah yang baik",
    type: "spatial"
  },
  {
    id: "S3",
    text: "Saya menikmati seni visual, seperti melukis atau fotografi",
    type: "spatial"
  },
  {
    id: "S4",
    text: "Saya dapat dengan mudah membaca peta dan diagram",
    type: "spatial"
  },
  {
    id: "S5",
    text: "Saya memperhatikan detail visual yang mungkin tidak diperhatikan orang lain",
    type: "spatial"
  },
  
  // Interpersonal Intelligence
  {
    id: "I1",
    text: "Saya menikmati aktivitas sosial dan bertemu orang baru",
    type: "interpersonal"
  },
  {
    id: "I2",
    text: "Orang sering datang kepada saya untuk meminta saran",
    type: "interpersonal"
  },
  {
    id: "I3",
    text: "Saya bisa merasakan bagaimana perasaan orang lain",
    type: "interpersonal"
  },
  {
    id: "I4",
    text: "Saya pandai menyelesaikan konflik antara orang-orang",
    type: "interpersonal"
  },
  {
    id: "I5",
    text: "Saya lebih suka aktivitas berkelompok daripada melakukan sesuatu sendirian",
    type: "interpersonal"
  },
  
  // Intrapersonal Intelligence
  {
    id: "Ia1",
    text: "Saya sering merefleksikan pemikiran dan perasaan saya",
    type: "intrapersonal"
  },
  {
    id: "Ia2",
    text: "Saya memiliki pemahaman yang baik tentang kekuatan dan kelemahan saya",
    type: "intrapersonal"
  },
  {
    id: "Ia3",
    text: "Saya lebih suka bekerja secara mandiri",
    type: "intrapersonal"
  },
  {
    id: "Ia4",
    text: "Saya menetapkan tujuan dan merencanakan masa depan saya",
    type: "intrapersonal"
  },
  {
    id: "Ia5",
    text: "Saya nyaman dengan diri saya sendiri",
    type: "intrapersonal"
  },
  
  // Naturalistic Intelligence
  {
    id: "N1",
    text: "Saya menikmati aktivitas luar ruangan dan berada di alam",
    type: "naturalistic"
  },
  {
    id: "N2",
    text: "Saya dapat mengenali dan mengklasifikasikan berbagai jenis tumbuhan atau hewan",
    type: "naturalistic"
  },
  {
    id: "N3",
    text: "Saya tertarik pada isu-isu lingkungan",
    type: "naturalistic"
  },
  {
    id: "N4",
    text: "Saya memperhatikan pola dan perubahan di alam",
    type: "naturalistic"
  },
  {
    id: "N5",
    text: "Saya senang belajar tentang fenomena alam",
    type: "naturalistic"
  }
];
