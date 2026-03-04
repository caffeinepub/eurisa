export type Language = "en" | "np";

export interface Translations {
  // App
  appTitle: string;
  appSubtitle: string;
  appIntro: string;

  // Buttons
  startGame: string;
  howToPlay: string;
  nextScene: string;
  playAgain: string;
  learnMore: string;
  backHome: string;

  // Metrics
  pollution: string;
  forestHealth: string;
  happiness: string;

  // Navigation
  languageToggle: string;
  scene: string;
  of: string;

  // Instructions Page
  instructionsTitle: string;
  instructionsSubtitle: string;
  rule1Title: string;
  rule1Desc: string;
  rule2Title: string;
  rule2Desc: string;
  rule3Title: string;
  rule3Desc: string;
  rule4Title: string;
  rule4Desc: string;
  goalTitle: string;
  goalDesc: string;

  // Results Page
  resultsTitle: string;
  yourClimateScore: string;
  yourDecisions: string;
  decisionLabel: string;
  youChose: string;
  finalMetrics: string;
  lowerBetter: string;
  higherBetter: string;

  // Grades
  gradeA: string;
  gradeB: string;
  gradeC: string;
  gradeD: string;
  gradeF: string;

  // Tips Page
  tipsTitle: string;
  tipsSubtitle: string;
  tip1Title: string;
  tip1Body: string;
  tip2Title: string;
  tip2Body: string;
  tip3Title: string;
  tip3Body: string;
  tip4Title: string;
  tip4Body: string;
  tip5Title: string;
  tip5Body: string;
  tip6Title: string;
  tip6Body: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appTitle: "AI Climate Hero",
    appSubtitle: "Become the Climate Minister of Nepal",
    appIntro:
      "You are the Climate Minister of Nepal. Make 6 crucial decisions that will shape the future of Nepal's environment, forests, and people's happiness. Every choice matters!",

    startGame: "Start Game",
    howToPlay: "How to Play",
    nextScene: "Next",
    playAgain: "Play Again",
    learnMore: "Learn More",
    backHome: "Back to Home",

    pollution: "Pollution",
    forestHealth: "Forest Health",
    happiness: "Happiness",

    languageToggle: "नेपाली",
    scene: "Scene",
    of: "of",

    instructionsTitle: "How to Play",
    instructionsSubtitle: "Your mission as Climate Minister of Nepal",
    rule1Title: "🎯 Your Role",
    rule1Desc:
      "You are Nepal's Climate Minister. You have the power to shape environmental policy and directly impact the nation's future.",
    rule2Title: "⚖️ Make 6 Decisions",
    rule2Desc:
      "You will face 6 real-world climate challenges — from plastic pollution to urban development. Choose wisely!",
    rule3Title: "📊 Track Your Impact",
    rule3Desc:
      "Each decision changes three metrics: Pollution (lower is better), Forest Health (higher is better), and Happiness (higher is better).",
    rule4Title: "🏆 Earn Your Grade",
    rule4Desc:
      "After all decisions, you receive a Climate Score from F to A. Aim for an A to be Nepal's best Climate Minister!",
    goalTitle: "🌿 Your Goal",
    goalDesc:
      "Reduce pollution, protect the forests, and keep the people happy. Nepal's future is in your hands!",

    resultsTitle: "Nepal's Climate Report",
    yourClimateScore: "Your Climate Score",
    yourDecisions: "Your Decisions",
    decisionLabel: "Decision",
    youChose: "You chose",
    finalMetrics: "Final Environment Status",
    lowerBetter: "(lower is better)",
    higherBetter: "(higher is better)",

    gradeA: "Outstanding! Nepal is thriving under your leadership!",
    gradeB: "Great job! Nepal's future looks bright.",
    gradeC: "Decent effort, but there's room to improve.",
    gradeD: "Nepal needs better leadership. Try again!",
    gradeF: "Climate crisis! Nepal needs urgent action.",

    tipsTitle: "Be a Real Climate Hero",
    tipsSubtitle:
      "Learn how you can help protect Nepal's environment in real life",
    tip1Title: "♻️ Reduce Plastic Waste",
    tip1Body:
      "Nepal generates over 200,000 tonnes of waste annually. Use reusable bags, refuse single-use plastics, and recycle. Even small actions add up — if every student avoids one plastic bag per week, it prevents millions of bags from reaching our rivers.",
    tip2Title: "🌳 Plant & Protect Trees",
    tip2Body:
      "Nepal has lost over 25% of its forest cover in recent decades. Trees absorb CO₂, prevent landslides, and shelter wildlife. Join local tree-planting initiatives, support conservation groups, and never cut trees unnecessarily.",
    tip3Title: "☀️ Embrace Renewable Energy",
    tip3Body:
      "Nepal has enormous hydropower, solar, and wind potential. Advocate for clean energy in your community. At home, switch to LED bulbs, unplug devices when not in use, and reduce energy consumption wherever possible.",
    tip4Title: "🚴 Choose Green Transportation",
    tip4Body:
      "Vehicle emissions are a major source of air pollution in Kathmandu Valley. Walk or cycle for short trips, use public transport, and support electric vehicle policies. Even reducing one car trip per week makes a difference.",
    tip5Title: "💧 Protect Water Sources",
    tip5Body:
      "Nepal's rivers and lakes are under threat from industrial and agricultural runoff. Never dump waste near water bodies. Support clean-up campaigns and educate others about the importance of clean water for communities downstream.",
    tip6Title: "🏙️ Support Sustainable Cities",
    tip6Body:
      "Urban planning directly affects environmental quality. Support green infrastructure, parks, and walkable neighborhoods. Advocate for sustainable building practices and smart city initiatives in your local government.",
  },

  np: {
    appTitle: "AI जलवायु नायक",
    appSubtitle: "नेपालको जलवायु मन्त्री बन्नुहोस्",
    appIntro:
      "तपाईं नेपालको जलवायु मन्त्री हुनुहुन्छ। ६ महत्वपूर्ण निर्णयहरू लिनुहोस् जसले नेपालको वातावरण, वन र जनताको खुसीलाई आकार दिनेछ। हरेक छनोट महत्वपूर्ण छ!",

    startGame: "खेल सुरु गर्नुहोस्",
    howToPlay: "कसरी खेल्ने",
    nextScene: "अर्को",
    playAgain: "फेरि खेल्नुहोस्",
    learnMore: "थप जान्नुहोस्",
    backHome: "घर फर्किनुहोस्",

    pollution: "प्रदूषण",
    forestHealth: "वन स्वास्थ्य",
    happiness: "खुसी",

    languageToggle: "English",
    scene: "दृश्य",
    of: "मध्ये",

    instructionsTitle: "कसरी खेल्ने",
    instructionsSubtitle: "नेपालको जलवायु मन्त्रीको रूपमा तपाईंको मिसन",
    rule1Title: "🎯 तपाईंको भूमिका",
    rule1Desc:
      "तपाईं नेपालको जलवायु मन्त्री हुनुहुन्छ। तपाईंसँग वातावरण नीति बनाउने र देशको भविष्यलाई प्रत्यक्ष प्रभाव पार्ने शक्ति छ।",
    rule2Title: "⚖️ ६ निर्णयहरू लिनुहोस्",
    rule2Desc:
      "तपाईंले ६ वास्तविक जलवायु चुनौतीहरूको सामना गर्नुहुनेछ — प्लास्टिक प्रदूषणदेखि सहरी विकाससम्म। बुद्धिमानीपूर्वक छनोट गर्नुहोस्!",
    rule3Title: "📊 आफ्नो प्रभाव ट्र्याक गर्नुहोस्",
    rule3Desc:
      "प्रत्येक निर्णयले तीन मेट्रिकहरू परिवर्तन गर्दछ: प्रदूषण (कम राम्रो), वन स्वास्थ्य (बढी राम्रो), र खुसी (बढी राम्रो)।",
    rule4Title: "🏆 आफ्नो ग्रेड कमाउनुहोस्",
    rule4Desc:
      "सबै निर्णयहरूपछि, तपाईंले F देखि A सम्म जलवायु स्कोर पाउनुहुनेछ। नेपालको सर्वश्रेष्ठ जलवायु मन्त्री बन्न A को लक्ष्य राख्नुहोस्!",
    goalTitle: "🌿 तपाईंको लक्ष्य",
    goalDesc:
      "प्रदूषण घटाउनुहोस्, वनहरू जोगाउनुहोस्, र जनतालाई खुसी राख्नुहोस्। नेपालको भविष्य तपाईंको हातमा छ!",

    resultsTitle: "नेपालको जलवायु रिपोर्ट",
    yourClimateScore: "तपाईंको जलवायु स्कोर",
    yourDecisions: "तपाईंका निर्णयहरू",
    decisionLabel: "निर्णय",
    youChose: "तपाईंले छानेको",
    finalMetrics: "अन्तिम वातावरण स्थिति",
    lowerBetter: "(कम राम्रो)",
    higherBetter: "(बढी राम्रो)",

    gradeA: "अद्भुत! तपाईंको नेतृत्वमा नेपाल फस्टाइरहेको छ!",
    gradeB: "बढिया! नेपालको भविष्य उज्यालो देखिन्छ।",
    gradeC: "राम्रो प्रयास, तर सुधारको ठाउँ छ।",
    gradeD: "नेपाललाई राम्रो नेतृत्व चाहिन्छ। फेरि प्रयास गर्नुहोस्!",
    gradeF: "जलवायु संकट! नेपाललाई तत्काल कार्यवाही चाहिन्छ।",

    tipsTitle: "वास्तविक जलवायु नायक बन्नुहोस्",
    tipsSubtitle:
      "वास्तविक जीवनमा नेपालको वातावरण जोगाउन तपाईंले कसरी मद्दत गर्न सक्नुहुन्छ",
    tip1Title: "♻️ प्लास्टिक फोहोर घटाउनुहोस्",
    tip1Body:
      "नेपालले वार्षिक २ लाख टन भन्दा बढी फोहोर उत्पन्न गर्छ। पुन: प्रयोगयोग्य झोला प्रयोग गर्नुहोस्, एकल-प्रयोग प्लास्टिकलाई अस्वीकार गर्नुहोस् र पुनर्चक्रण गर्नुहोस्।",
    tip2Title: "🌳 रुख लगाउनुहोस् र जोगाउनुहोस्",
    tip2Body:
      "नेपालले हालका दशकहरूमा २५% भन्दा बढी वन आवरण गुमाएको छ। रुखहरूले CO₂ अवशोषण गर्छन्, पहिरो रोक्छन् र वन्यजन्तुलाई आश्रय दिन्छन्।",
    tip3Title: "☀️ नवीकरणीय ऊर्जा अँगाल्नुहोस्",
    tip3Body:
      "नेपालमा जलविद्युत, सौर्य र वायु ऊर्जाको ठूलो सम्भावना छ। घरमा LED बल्ब प्रयोग गर्नुहोस् र सकभर ऊर्जा खपत घटाउनुहोस्।",
    tip4Title: "🚴 हरित यातायात छान्नुहोस्",
    tip4Body:
      "काठमाडौं उपत्यकामा सवारी उत्सर्जन वायु प्रदूषणको प्रमुख स्रोत हो। छोटो यात्राको लागि हिँड्नुहोस् वा साइकल चलाउनुहोस्, सार्वजनिक यातायात प्रयोग गर्नुहोस्।",
    tip5Title: "💧 जलस्रोत जोगाउनुहोस्",
    tip5Body:
      "नेपालका नदी र तालहरू औद्योगिक र कृषि प्रवाहबाट खतरामा छन्। जलाधार नजिक कहिल्यै फोहोर नफ्याल्नुहोस्। सफाई अभियानहरूलाई समर्थन गर्नुहोस्।",
    tip6Title: "🏙️ दिगो शहरहरूलाई समर्थन गर्नुहोस्",
    tip6Body:
      "सहरी योजनाले वातावरणीय गुणस्तरलाई प्रत्यक्ष असर गर्छ। हरित पूर्वाधार, पार्क र हिँड्न योग्य छिमेकहरूलाई समर्थन गर्नुहोस्।",
  },
};

export const getTranslation = (lang: Language) => translations[lang];
