// src/components/DiceCalculator.jsx
import React, { useState } from "react";
import { baseDicePrice, kmFactor, diceLimits } from "./data.js";

export default function DiceCalculator({ slot, addTag }) {
  const [polarity, setPolarity]   = useState("hurt");   // hurt | heal
  const [die, setDie]             = useState("d6");     // d6 | d8 (или temp)
  const [count, setCount]         = useState(1);
  const [scope, setScope]         = useState("single"); // single | few | aoe

  /* пересчёт стоимости */
  const price =
    count *
    (baseDicePrice[polarity][die] ?? 0) *
    kmFactor[polarity][scope];

  /* лимит по таблице 3.2 */
  const limit = diceLimits[slot][polarity];

  const overLimit = count > limit;

  const handleAdd = () => {
    if (overLimit) return alert(`Макс ${limit} дайсов для этого слота.`);
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

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Калькулятор дайсов</h3>

      {/* полярность */}
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
                // переключаем дефолтный дайс
                if (p === "hurt" && die === "temp") setDie("d6");
                if (p === "heal" && die === "d6") setDie("d8");
              }}
            />
            {p === "hurt" ? "Вредоносное" : "Лечение"}
          </label>
        ))}
      </div>

      {/* вид дайса */}
      <div className="mb-3">
        <select
          value={die}
          onChange={(e) => setDie(e.target.value)}
          className="border rounded-lg p-2 w-full"
        >
          {polarity === "hurt" && (
            <>
              <option value="d6">d6</option>
              <option value="d8">d8</option>
            </>
          )}
          {polarity === "heal" && (
            <>
              <option value="d8">d8 (heal)</option>
              <option value="temp">d6 (temp-HP)</option>
            </>
          )}
        </select>
      </div>

      {/* количество дайсов */}
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

      {/* охват / КМ */}
      <div className="mb-3">
        <select
          value={scope}
          onChange={(e) => setScope(e.target.value)}
          className="border rounded-lg p-2 w-full"
        >
          <option value="single">1 цель (КМ 1)</option>
          <option value="few">≤ 6 целей (КМ 1.5 / 2.5)</option>
          <option value="aoe">АОЕ (КМ 2 / 3)</option>
        </select>
      </div>

      {/* отображение цены */}
      <p className="mb-4">
        <span className="font-medium">Стоимость: </span>
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
        Добавить в список
      </button>
    </div>
  );
}
