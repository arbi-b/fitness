export async function GET() {
  const res = await fetch(
    "https://exercisedb.p.rapidapi.com/exercises",
    {
      headers: {
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI!,
      },
    }
  );

  const data = await res.json();

  return Response.json(data);
}