
import React from "react";

export default function SlotSelector({ slot, setSlot }) {
  const options = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2" htmlFor="slot-select">
        Уровень слота
      </label>
      <select
        id="slot-select"
        value={slot}
        onChange={(e) => setSlot(Number(e.target.value))}
        className="w-full rounded-lg border p-2"
      >
        {options.map((lvl) => (
          <option key={lvl} value={lvl}>
            {lvl}
          </option>
        ))}
      </select>
    </div>
  );
}
