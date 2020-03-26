const portugalCovidNatinalData = [
  {
    updateDate: "24/03/2020",
    cases: {
      age: {
        headerAge: [
          "age0_9",
          "age10_19",
          "age20_29",
          "age30_39",
          "age40_49",
          "age50_59",
          "age60_69",
          "age70_79",
          "age80plus"
        ],
        male: [11, 30, 133, 188, 224, 208, 158, 108, 73],
        female: [13, 35, 145, 206, 224, 215, 190, 106, 95]
      }
    },
    inHospitaCases: 203,
    criticalCases: 48,
    sintomsDetected: {
      tosse: 70,
      febre: 58,
      dificuldadeRespiratoria: 24,
      cefaleia: 34,
      doresMusculares: 42,
      fraquezaGneralizada: 27,
      unidadeMedida: "percentagem",
      notas:
        "Só existe informação reportada relativa a sintomas em 46% dos casos confirmados."
    },
    confirmedCases: 2362,
    nonConfirmedCases: 11329,
    awaitingLabResult: 1783,
    recovered: 22,
    inSurveilanceByHealthAuthorities: 11842,
    totalSuspiciasCases: 15474,
    casesLocationRegion: {
      regionHeader: [
        "norte",
        "centro",
        "região de lisboa",
        "alentejo",
        "algarve"
      ],
      regionCases: [
        {
          region: "norte",
          cases: 1130,
          dead: 9,
          recovered: 3
        },
        { region: "centro", cases: 293, dead: 11, recovered: 8 },
        {
          region: "região de lisboa",
          cases: 852,
          dead: 8,
          recovered: 11
        },
        {
          region: "alentejo",
          cases: 6,
          dead: 0,
          recovered: 0
        },
        {
          region: "algarve",
          cases: 46,
          dead: 1,
          recovered: 0
        },
        { region: "açores", cases: 12, dead: 1, recovered: 0 },
        {
          region: "madeira",
          cases: 11,
          dead: 0,
          recovered: 0
        }
      ]
    },
    importedCases: [
      { country: "Alemanha e Áustria", cases: "1" },
      { country: "Alemanha", cases: "2" },
      { country: "Áustria", cases: "4" },
      { country: "Andorra", cases: "2" },
      { country: "Andorra", cases: "2" },
      { country: "Bélgica", cases: "1" },
      { country: "Brasil", cases: "5" },
      { country: "Dinamarca", cases: "1" },
      { country: "Egipto", cases: "1" },
      { country: "Emirados Árabes Unidos", cases: "3" },
      { country: "Espanha", cases: "44" },
      { country: "França", cases: "26" },
      { country: "Itália", cases: "20" },
      { country: "Índia", cases: "3" },
      { country: "Irão", cases: "1" },
      { country: "Países Baixos", cases: "6" },
      { country: "Reino Unido", cases: "11" },
      { country: "Suíça", cases: "11" }
    ],
    deaths: {
      age: {
        headerAge: [
          "age0_9",
          "age10_19",
          "age20_29",
          "age30_39",
          "age40_49",
          "age50_59",
          "age60_69",
          "age70_79",
          "age80plus"
        ],
        male: [0, 0, 0, 0, 1, 2, 0, 9, 6],
        female: [0, 0, 0, 0, 0, 0, 1, 5, 5]
      }
    }
  },
  {
    updateDate: "23/03/2020",
    cases: {
      age: {
        headerAge: [
          "age0_9",
          "age10_19",
          "age20_29",
          "age30_39",
          "age40_49",
          "age50_59",
          "age60_69",
          "age70_79",
          "age80plus"
        ],
        male: [7, 30, 100, 166, 178, 167, 167, 107, 58],
        female: [18, 36, 140, 181, 226, 194, 127, 73, 85]
      }
    },
    inHospitaCases: 201,
    criticalCases: 47,
    sintomsDetected: {
      tosse: 72,
      febre: 60,
      dificuldadeRespiratoria: 23,
      cefaleia: 24,
      doresMusculares: 42,
      fraquezaGneralizada: 28,
      unidadeMedida: "percentagem",
      notas:
        "Só existe informação reportada relativa a sintomas em 46% dos casos confirmados."
    },
    confirmedCases: 2060,
    nonConfirmedCases: 10212,
    awaitingLabResult: 1402,
    recovered: 14,
    inSurveilanceByHealthAuthorities: 11842,
    totalSuspiciasCases: 13674,
    casesLocationRegion: {
      regionHeader: [
        "norte",
        "centro",
        "região de lisboa",
        "alentejo",
        "algarve"
      ],
      regionCases: [
        {
          region: "norte",
          cases: 1007,
          dead: 9,
          recovered: 3
        },
        { region: "centro", cases: 238, dead: 5, recovered: 7 },
        {
          region: "região de lisboa",
          cases: 737,
          dead: 8,
          recovered: 4
        },
        {
          region: "alentejo",
          cases: 5,
          dead: 0,
          recovered: 0
        },
        {
          region: "algarve",
          cases: 42,
          dead: 1,
          recovered: 0
        },
        { region: "açores", cases: 11, dead: 0, recovered: 0 },
        {
          region: "madeira",
          cases: 9,
          dead: 0,
          recovered: 0
        }
      ]
    },
    importedCases: [
      { country: "Alemanha e Áustria", cases: "1" },
      { country: "Alemanha", cases: "2" },
      { country: "Áustria", cases: "4" },
      { country: "Andorra", cases: "2" },
      { country: "Andorra", cases: "2" },
      { country: "Bélgica", cases: "1" },
      { country: "Brasil", cases: "5" },
      { country: "Dinamarca", cases: "1" },
      { country: "Egipto", cases: "1" },
      { country: "Emirados Árabes Unidos", cases: "3" },
      { country: "Espanha", cases: "44" },
      { country: "França", cases: "26" },
      { country: "Itália", cases: "20" },
      { country: "Índia", cases: "3" },
      { country: "Irão", cases: "1" },
      { country: "Países Baixos", cases: "6" },
      { country: "Reino Unido", cases: "11" },
      { country: "Suíça", cases: "11" }
    ]
  }
];

export default portugalCovidNatinalData;
