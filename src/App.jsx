
import React, { useState } from "react";
import SlotSelector   from "./components/SlotSelector.jsx";
import DiceCalculator from "./components/DiceCalculator.jsx";
import TagTable       from "./components/TagTable.jsx";
import SummaryPanel   from "./components/SummaryPanel.jsx";

export default function App() {
  const [slot, setSlot] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);

  const addTag = (tag) => {
    setSelectedTags((prev) => [...prev, tag]);
  };

  const removeTag = (index) => {
    setSelectedTags((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-6 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <SlotSelector slot={slot} setSlot={setSlot} />
        <DiceCalculator slot={slot} addTag={addTag} />
        <TagTable addTag={addTag} />
      </div>
      <SummaryPanel
        slot={slot}
        selectedTags={selectedTags}
        removeTag={removeTag}
      />
    </div>
  );
}
