import React, { useState } from "react";
import {
  baseDicePrice,
  kmFactor,
  diceLimits
} from "./data.js";

export default function DiceCalculator({ slot, addTag }) {
  const [polarity, setPolarity] = useState("hurt");   // hurt | heal
  const [die, setDie]           = useState("d6");     // d4–d12 | temp
  const [count, setCount]       = useState(1);
  const [scope, setScope]       = useState("single"); // single | few | aoe

  /* ---- расчёт стоимости ---- */
  const price =
    count *
    (baseDicePrice[polarity][die] ?? 0) *
    kmFactor[polarity][scope];

  const limit     = diceLimits[slot][polarity];
  const overLimit = count > limit;

  const handleAdd = () => {
    if (overLimit) {
      alert(`Максимум ${limit} дайсов для этого слота.`);
      return;
    }
    const name =
      `${count}${die.toUpperCase()} ` +
      (polarity === "heal" ? "heal" : "damage");

    addTag({
      id: `dice-${Date.now()}`,
      group: "Масштаб",
      name,
      pool: polarity === "heal" ? "sup" : "off",
      cost: Math.round(price)
    });
  };

  /* ---- UI ---- */
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Калькулятор дайсов</h3>

      {/* Полярность */}
      <div className="flex gap-3 mb-3">
        {["hurt", "heal"].map((p) => (
          <label key={p} className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="polarity"
              value={p}
              checked={polarity === p}
              onChange={() => {
                setPolarity(p);
                /* корректируем дайс при смене полярности */
                if (
                  p === "heal" &&
                  !["d4", "d6", "d8", "d10", "d12", "temp"].includes(die)
                )
                  setDie("d8");
                if (p === "hurt" && die === "temp") setDie("d6");
              }}
            />
            {p === "hurt" ? "Вредоносное" : "Лечение"}
          </label>
        ))}
      </div>

      {/* Вид дайса */}
      <div className="mb-3">
        <select
          value={die}
          onChange={(e) => setDie(e.target.value)}
          className="border rounded-lg p-2 w-full"
        >
          {polarity === "hurt" && (
            <>
              <option value="d4">d4</option>
              <option value="d6">d6</option>
              <option value="d8">d8</option>
              <option value="d10">d10</option>
              <option value="d12">d12</option>
            </>
          )}
          {polarity === "heal" && (
            <>
              <option value="d4">d4 (heal)</option>
              <option value="d6">d6 (heal)</option>
              <option value="d8">d8 (heal)</option>
              <option value="d10">d10 (heal)</option>
              <option value="d12">d12 (heal)</option>
              <option value="temp">d6 (temp-HP)</option>
            </>
          )}
        </select>
      </div>

      {/* Количество дайсов */}
      <div className="mb-3">
        <input
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full border rounded-lg p-2"
        />
        {overLimit && (
          <p className="text-sm text-red-600">
            Лимит для {polarity === "heal" ? "лечения" : "урона"} — {limit}.
          </p>
        )}
      </div>

      {/* Охват / КМ */}
      <div className="mb-3">
        <select
          value={scope}
          onChange={(e) => setScope(e.target.value)}
          className="border rounded-lg p-2 w-full"
        >
          <option value="single">1&nbsp;цель (КМ 1)</option>
          <option value="few">≤ 6 целей (КМ 1.5 / 2.5)</option>
          <option value="aoe">АОЕ (КМ 2 / 3)</option>
        </select>
      </div>

      {/* Итоговая цена */}
      <p className="mb-4">
        <span className="font-medium">Стоимость:&nbsp;</span>
        {Math.round(price)} ПП →{" "}
        {polarity === "heal" ? "🟩 Sup" : "🟥 Off"}
      </p>

      <button
        onClick={handleAdd}
        disabled={overLimit}
        className={
          "px-4 py-2 rounded-lg text-white " +
          (overLimit
            ? "bg-slate-400 cursor-not-allowed"
            : "bg-slate-800 hover:bg-slate-700")
        }
      >
        Добавить
      </button>
    </div>
  );
}
