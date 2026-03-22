export const metadata = {
  title: "Disclaimer | MuscleLogic Blog",
  description:
    "Read the disclaimer for MuscleLogic Blog regarding fitness advice, affiliate links, and liability limitations.",
};

export default function DisclaimerPage() {
  return (
      <main className="max-w-4xl mx-auto px-6 py-12 prose prose-neutral dark:prose-invert">
        <h1>Disclaimer</h1>
        <p><strong>Last Updated:</strong> March 2026</p>

        <h2>Fitness & Health Disclaimer</h2>
        <p>
          All content provided on this website is for informational purposes only and is not medical advice.
        </p>
        <p>
          Always consult a qualified healthcare professional before starting any fitness or nutrition program.
        </p>

        <h2>Affiliate Disclaimer</h2>
        <p>
          Some links on this site are affiliate links, meaning we may earn a commission at no extra cost to you.
        </p>

        <h2>Results Disclaimer</h2>
        <p>
          Results from fitness programs may vary. We do not guarantee specific outcomes.
        </p>

        <h2>Liability</h2>
        <p>
          We are not responsible for injuries, damages, or losses resulting from the use of our content.
        </p>
      </main>
  );
}