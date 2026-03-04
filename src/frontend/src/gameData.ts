export interface ImpactDelta {
  pollution: number;
  forest: number;
  happiness: number;
}

export interface Choice {
  en: string;
  np: string;
  impact: ImpactDelta;
}

export interface Scene {
  id: number;
  image: string;
  titleEn: string;
  titleNp: string;
  descEn: string;
  descNp: string;
  choices: [Choice, Choice, Choice];
}

export interface Metrics {
  pollution: number;
  forest: number;
  happiness: number;
}

export const INITIAL_METRICS: Metrics = {
  pollution: 50,
  forest: 50,
  happiness: 50,
};

export const SCENES: Scene[] = [
  {
    id: 1,
    image: "/assets/generated/scene-plastic.dim_800x400.jpg",
    titleEn: "Plastic Usage",
    titleNp: "प्लास्टिकको प्रयोग",
    descEn:
      "Nepal's rivers and streets are overflowing with plastic waste. As Climate Minister, you must decide Nepal's plastic policy. What will you do?",
    descNp:
      "नेपालका नदी र सडकहरू प्लास्टिक फोहोरले भरिएका छन्। जलवायु मन्त्रीको रूपमा, तपाईंले नेपालको प्लास्टिक नीति निर्धारण गर्नुपर्छ। तपाईं के गर्नुहुनेछ?",
    choices: [
      {
        en: "🚫 Ban plastic bags nationwide",
        np: "🚫 राष्ट्रव्यापी प्लास्टिक झोला प्रतिबन्ध लगाउनुहोस्",
        impact: { pollution: -15, forest: +5, happiness: +10 },
      },
      {
        en: "😐 Do nothing, maintain status quo",
        np: "😐 केही नगर्नुहोस्, यथास्थिति कायम राख्नुहोस्",
        impact: { pollution: +10, forest: 0, happiness: -5 },
      },
      {
        en: "🏭 Increase plastic production for economy",
        np: "🏭 अर्थव्यवस्थाको लागि प्लास्टिक उत्पादन बढाउनुहोस्",
        impact: { pollution: +20, forest: -5, happiness: -10 },
      },
    ],
  },
  {
    id: 2,
    image: "/assets/generated/scene-transport.dim_800x400.jpg",
    titleEn: "Transportation Policy",
    titleNp: "यातायात नीति",
    descEn:
      "Kathmandu Valley is choking under heavy traffic pollution. Vehicles fill the streets with toxic fumes. How will you transform Nepal's transportation system?",
    descNp:
      "काठमाडौं उपत्यका भारी यातायात प्रदूषणमा डुबेको छ। सवारीले सडकहरू विषाक्त धुवाँले भर्छन्। तपाईं नेपालको यातायात प्रणाली कसरी बदल्नुहुनेछ?",
    choices: [
      {
        en: "🚲 Promote cycling lanes across cities",
        np: "🚲 शहरहरूमा साइकल लेन प्रवर्द्धन गर्नुहोस्",
        impact: { pollution: -10, forest: 0, happiness: +15 },
      },
      {
        en: "⛽ Build more petrol stations",
        np: "⛽ थप पेट्रोल स्टेशनहरू निर्माण गर्नुहोस्",
        impact: { pollution: +15, forest: -5, happiness: -5 },
      },
      {
        en: "🚌 Promote electric bus network",
        np: "🚌 विद्युतीय बस नेटवर्क प्रवर्द्धन गर्नुहोस्",
        impact: { pollution: -12, forest: 0, happiness: +10 },
      },
    ],
  },
  {
    id: 3,
    image: "/assets/generated/scene-forest.dim_800x400.jpg",
    titleEn: "Forest Conservation",
    titleNp: "वन संरक्षण",
    descEn:
      "Nepal's precious forests are under threat from illegal logging and deforestation. These forests are home to snow leopards, red pandas, and countless species. What is your plan?",
    descNp:
      "नेपालका बहुमूल्य वनहरू अवैध काठ कटान र वन विनाशको खतरामा छन्। यी वनहरू हिउँ चितुवा, रेड पान्डा र अनगिन्ती प्रजातिहरूको घर हुन्। तपाईंको के योजना छ?",
    choices: [
      {
        en: "🌱 Launch nationwide tree planting campaign",
        np: "🌱 राष्ट्रव्यापी वृक्षारोपण अभियान सुरु गर्नुहोस्",
        impact: { pollution: -8, forest: +20, happiness: +10 },
      },
      {
        en: "🙈 Ignore ongoing deforestation",
        np: "🙈 चलिरहेको वन विनाश बेवास्ता गर्नुहोस्",
        impact: { pollution: +10, forest: -15, happiness: -10 },
      },
      {
        en: "🪵 Allow commercial logging for revenue",
        np: "🪵 राजस्वको लागि व्यावसायिक काठ कटान अनुमति दिनुहोस्",
        impact: { pollution: +5, forest: -25, happiness: -15 },
      },
    ],
  },
  {
    id: 4,
    image: "/assets/generated/scene-energy.dim_800x400.jpg",
    titleEn: "Energy Policy",
    titleNp: "ऊर्जा नीति",
    descEn:
      "Nepal needs more electricity to power its growing economy. But how you generate that power will determine the nation's environmental fate. Choose Nepal's energy future!",
    descNp:
      "नेपाललाई आफ्नो बढ्दो अर्थव्यवस्थालाई शक्ति दिन थप बिजुली चाहिन्छ। तर तपाईं त्यो शक्ति कसरी उत्पन्न गर्नुहुन्छ त्यसले राष्ट्रको वातावरणीय भाग्य निर्धारण गर्नेछ।",
    choices: [
      {
        en: "☀️ Invest in solar and wind energy",
        np: "☀️ सौर्य र वायु ऊर्जामा लगानी गर्नुहोस्",
        impact: { pollution: -20, forest: +5, happiness: +10 },
      },
      {
        en: "🏭 Build coal-fired power plants",
        np: "🏭 कोइला चल्ने बिजुलीघरहरू निर्माण गर्नुहोस्",
        impact: { pollution: +25, forest: -10, happiness: -5 },
      },
      {
        en: "💧 Expand hydropower projects",
        np: "💧 जलविद्युत आयोजनाहरू विस्तार गर्नुहोस्",
        impact: { pollution: -10, forest: -5, happiness: +15 },
      },
    ],
  },
  {
    id: 5,
    image: "/assets/generated/scene-water.dim_800x400.jpg",
    titleEn: "Water Management",
    titleNp: "जल व्यवस्थापन",
    descEn:
      "Nepal's sacred rivers — the Bagmati, Koshi, and Gandaki — are being polluted by industrial waste and sewage. Clean water is life. How will you protect it?",
    descNp:
      "नेपालका पवित्र नदीहरू — बागमती, कोशी र गण्डकी — औद्योगिक फोहोर र ढलबाट प्रदूषित भइरहेका छन्। स्वच्छ पानी जीवन हो। तपाईं यसलाई कसरी जोगाउनुहुनेछ?",
    choices: [
      {
        en: "🏞️ Clean rivers & enforce anti-dumping laws",
        np: "🏞️ नदी सफा गर्नुहोस् र फोहोर फ्याल्न नदिने नियम लागू गर्नुहोस्",
        impact: { pollution: -15, forest: +5, happiness: +20 },
      },
      {
        en: "🏗️ Allow industrial waste dumping",
        np: "🏗️ औद्योगिक फोहोर फ्याल्न अनुमति दिनुहोस्",
        impact: { pollution: +20, forest: -10, happiness: -15 },
      },
      {
        en: "🚰 Build modern water treatment plants",
        np: "🚰 आधुनिक जल शोधन संयन्त्र निर्माण गर्नुहोस्",
        impact: { pollution: -10, forest: 0, happiness: +15 },
      },
    ],
  },
  {
    id: 6,
    image: "/assets/generated/scene-urban.dim_800x400.jpg",
    titleEn: "Urban Development",
    titleNp: "सहरी विकास",
    descEn:
      "Nepal's cities are growing fast. The decisions you make now about urban development will define city life for the next generation. What kind of Nepal do you want to build?",
    descNp:
      "नेपालका शहरहरू द्रुत गतिले बढिरहेका छन्। सहरी विकासबारे अहिले लिने निर्णयहरूले अर्को पुस्ताको शहरी जीवन परिभाषित गर्नेछ।",
    choices: [
      {
        en: "🌳 Build green parks and walkways",
        np: "🌳 हरित पार्कहरू र पैदल मार्गहरू निर्माण गर्नुहोस्",
        impact: { pollution: -10, forest: +15, happiness: +20 },
      },
      {
        en: "🏢 Rapid concrete urbanization",
        np: "🏢 द्रुत सिमेन्ट सहरीकरण",
        impact: { pollution: +15, forest: -15, happiness: -10 },
      },
      {
        en: "🌆 Smart sustainable city planning",
        np: "🌆 स्मार्ट दिगो शहर योजना",
        impact: { pollution: -8, forest: +10, happiness: +15 },
      },
    ],
  },
];

export function clampMetric(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function applyImpact(metrics: Metrics, delta: ImpactDelta): Metrics {
  return {
    pollution: clampMetric(metrics.pollution + delta.pollution),
    forest: clampMetric(metrics.forest + delta.forest),
    happiness: clampMetric(metrics.happiness + delta.happiness),
  };
}

export function computeClimateScore(metrics: Metrics): number {
  return (
    (100 - metrics.pollution) * 0.34 +
    metrics.forest * 0.33 +
    metrics.happiness * 0.33
  );
}

export type Grade = "A" | "B" | "C" | "D" | "F";

export function getGrade(score: number): Grade {
  if (score >= 80) return "A";
  if (score >= 65) return "B";
  if (score >= 50) return "C";
  if (score >= 35) return "D";
  return "F";
}

export const GRADE_COLORS: Record<Grade, string> = {
  A: "text-forest",
  B: "text-green-600",
  C: "text-happiness",
  D: "text-orange-500",
  F: "text-pollution",
};
