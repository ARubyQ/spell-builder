
import React from "react";
import { defaultTags } from "./data.js";

export default function TagTable({ addTag }) {
  const groups = Array.from(
    defaultTags.reduce((set, tag) => set.add(tag.group), new Set())
  );

  return (
    <div className="overflow-x-auto">
      {groups.map((group) => (
        <div key={group} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{group}</h3>
          <table className="min-w-full bg-white shadow rounded-lg divide-y divide-slate-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm">Тег</th>
                <th className="px-4 py-2 text-sm">Пул</th>
                <th className="px-4 py-2 text-sm">Цена</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {defaultTags
                .filter((tag) => tag.group === group)
                .map((tag) => (
                  <tr key={tag.id}>
                    <td className="px-4 py-2 whitespace-nowrap">{tag.name}</td>
                    <td className="px-4 py-2 text-center uppercase">
                      {tag.pool}
                    </td>
                    <td className="px-4 py-2 text-center">{tag.cost}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => addTag(tag)}
                        className="rounded-lg bg-slate-800 text-white px-3 py-1 text-sm hover:bg-slate-700 active:translate-y-px"
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
