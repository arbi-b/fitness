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
        <div
            key={ex.id}
            style={{
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            maxWidth: "350px",
            }}
        >
          <h3>{ex.name}</h3>

          {/* THIS SHOWS THE GIF */}
          <img src={ex.gifUrl} alt={ex.name}  width={300}  loading="lazy" style={{ borderRadius: "10px", marginTop: "10px" }}/>

          <p><strong>Target:</strong> {ex.target}</p>
          <p><strong>Body Part:</strong> {ex.bodyPart}</p>
        </div>
      ))}
    </div>
  );
}