"use client";

import { useEffect, useState } from "react";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch("/api/exercises")
      .then((res) => res.json())
      .then((data) => setExercises(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Exercise Library</h1>

      {exercises.map((ex: any) => (
        <div key={ex.id} style={{ marginBottom: "30px" }}>
          <h3>{ex.name}</h3>

          {/* THIS SHOWS THE GIF */}
          <img src={ex.gifUrl} alt={ex.name} width={300} />

          <p><strong>Target:</strong> {ex.target}</p>
          <p><strong>Body Part:</strong> {ex.bodyPart}</p>
        </div>
      ))}
    </div>
  );
}