/* Таблицы и константы для Spell-Builder */

export const slotLimits = {
  1: { off: 6,  sup: 4,  util: 4  },
  2: { off: 8,  sup: 6,  util: 4  },
  3: { off: 10, sup: 7,  util: 5  },
  4: { off: 12, sup: 8,  util: 6  },
  5: { off: 14, sup: 9,  util: 7  },
  6: { off: 16, sup: 10, util: 8  },
  7: { off: 18, sup: 11, util: 9  },
  8: { off: 20, sup: 12, util: 10 },
  9: { off: 22, sup: 13, util: 11 }
};

/* Полная таблица базовой цены одного дайса (§ 3.1) */
export const baseDicePrice = {
  // вредоносные эффекты
  hurt: {
    d4: 0.67,
    d6: 1,
    d8: 1.3,
    d10: 1.67,
    d12: 2
  },
  // лечение / врем. ХП
  heal: {
    d4: 0.8,
    d6: 1.2,
    d8: 1.5,
    d10: 1.8,
    d12: 2.2,
    temp: 1          // d6 temp-HP
  }
};

/* Коэффициенты мощности КМ — single / few(≤ 6) / aoe (§ 3.1) */
export const kmFactor = {
  hurt: { single: 1,   few: 1.5, aoe: 2   },
  heal: { single: 1.5, few: 2.5, aoe: 3   }
};

/* Лимит количества дайсов «до КМ» (§ 3.2) */
export const diceLimits = {
  1: { hurt: 4,  heal: 2  },
  2: { hurt: 6,  heal: 3  },
  3: { hurt: 8,  heal: 4  },
  4: { hurt: 10, heal: 5  },
  5: { hurt: 12, heal: 6  },
  6: { hurt: 14, heal: 7  },
  7: { hurt: 18, heal: 8  },
  8: { hurt: 19, heal: 9  },
  9: { hurt: 20, heal: 10 }
};

/* Базовые теги (без изменений) */
export const defaultTags = [
  // Парадигма
  { id: "damage", group: "Парадигма", name: "Урон", pool: "off", cost: 3 },
  { id: "heal",   group: "Парадигма", name: "Лечение", pool: "sup", cost: 3 },
  { id: "soft",   group: "Парадигма", name: "Soft-контроль", pool: "sup", cost: 2 },
  { id: "medium", group: "Парадигма", name: "Medium-контроль", pool: "off", cost: 4 },
  { id: "hard",   group: "Парадигма", name: "Hard-контроль", pool: "off", cost: 6 },

  // Доставка / цель
  { id: "single",  group: "Доставка / цель", name: "1 цель",          pool: "off", cost: 0 },
  { id: "sphere10",group: "Доставка / цель", name: "Сфера/куб 10 ft", pool: "off", cost: 1 },
  { id: "sphere20",group: "Доставка / цель", name: "Сфера/куб 20 ft", pool: "off", cost: 2 },
  { id: "wall",    group: "Доставка / цель", name: "Стена/поверхность",pool: "off", cost: 3 },
  { id: "mass6",   group: "Доставка / цель", name: "≤ 6 целей",       pool: "sup", cost: 2 },

  // Дистанция
  { id: "self",  group: "Дистанция", name: "Self/Touch",   pool: "util", cost: 0 },
  { id: "30ft",  group: "Дистанция", name: "30 ft / 60 ft",pool: "util", cost: 1 },
  { id: "120ft", group: "Дистанция", name: "120 ft / 150 ft",pool: "util", cost: 2 },

  // Длительность
  { id: "instant", group: "Длительность", name: "Мгновенно",              pool: "util", cost: 0 },
  { id: "conc1",   group: "Длительность", name: "Conc ≤ 1 мин",           pool: "util", cost: 1 },
  { id: "conc10",  group: "Длительность", name: "Conc ≤ 10 мин",          pool: "util", cost: 2 },
  { id: "conc1h",  group: "Длительность", name: "Conc ≤ 1 ч",             pool: "util", cost: 3 },
  { id: "dur1h",   group: "Длительность", name: "1 ч без Conc",           pool: "util", cost: 2 },

  // Издержки (скидки)
  { id: "concsave",group: "Издержки", name: "Концентрация скидка",        pool: "off",  cost: -2 },
  { id: "material",group: "Издержки", name: "Мат. компонент ≥ 100 gp",    pool: "util", cost: -1 }
];
