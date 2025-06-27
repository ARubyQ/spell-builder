
import React from "react";
import { slotLimits } from "./data.js";

export default function SummaryPanel({ slot, selectedTags, removeTag }) {
  const totals = selectedTags.reduce(
    (acc, tag) => {
      acc[tag.pool] += tag.cost;
      return acc;
    },
    { off: 0, sup: 0, util: 0 }
  );

  const limits = slotLimits[slot];

  const poolRow = (label, pool) => {
    const over = totals[pool] > limits[pool];
    return (
      <tr className={over ? "bg-red-100" : ""}>
        <td className="px-4 py-2 font-medium">{label}</td>
        <td className="px-4 py-2 text-center">{totals[pool]}</td>
        <td className="px-4 py-2 text-center">/</td>
        <td className="px-4 py-2 text-center">{limits[pool]}</td>
      </tr>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Выбранные теги</h3>
      {selectedTags.length === 0 ? (
        <p className="text-sm text-slate-500">Пока ничего не выбрано.</p>
      ) : (
        <ul className="space-y-1 mb-4">
          {selectedTags.map((tag, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span>
                {tag.group} → <span className="font-medium">{tag.name}</span>{" "}
                ({tag.cost} ПП, {tag.pool.toUpperCase()})
              </span>
              <button
                onClick={() => removeTag(idx)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-lg font-semibold mb-2">Сводка кошельков</h3>
      <table className="min-w-full divide-y">
        <tbody>
          {poolRow("🟥 Off", "off")}
          {poolRow("🟩 Sup", "sup")}
          {poolRow("🟦 Util", "util")}
        </tbody>
      </table>
    </div>
  );
}
