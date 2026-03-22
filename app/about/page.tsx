import Link from "next/link";

export const metadata = {
  title: "About EvidenceFit | Fitness & Nutrition Blog",
  description:
    "EvidenceFit is a fitness and nutrition blog focused on evidence-based training, workout plans, fat loss, and muscle building.",
  openGraph: {
    title: "About EvidenceFit",
    description:
      "A fitness and nutrition blog built on evidence-based training and practical strategies.",
    url: "https://musclelogic.blog/about",
    siteName: "EvidenceFit",
    type: "website",
  },
};

export default function AboutPage() {
  return (
      <main className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed">
          <div className="mb-10">
              <p className="text-sm text-gray-500">
                  Last updated: March 2026
              </p>
          </div>
        {/* Title */}
        <h1 className="text-4xl font-bold mb-8">About EvidenceFit</h1>

        {/* Intro */}
        <p className="mb-6 text-lg">
          EvidenceFit is a fitness and nutrition blog built around one idea:
          most people don’t fail because they lack motivation, they fail because
          they’re following the wrong information.
        </p>

        <p className="mb-6">
          This site focuses on evidence-based training, practical nutrition, and
          sustainable progress. The goal is not just to help you get results once,
          but to help you understand why those results happen so you can repeat
          them.
        </p>

        {/* Why this site exists */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Why This Site Exists
          </h2>
          <p className="mb-4">
            The fitness space is crowded, but not always helpful. Many people end
            up following overcomplicated workout plans, extreme diets, or advice
            that simply doesn’t work in real life.
          </p>
          <p>
            EvidenceFit was created as a clear, structured alternative, a place
            where information is tested in practice, supported by research, and
            explained without unnecessary complexity.
          </p>
        </section>

        {/* Approach */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Our Approach to Fitness
          </h2>

          <div className="space-y-4">
            <p>
              <strong>Clarity over complexity:</strong> If something can’t be
              explained simply, it’s not useful.
            </p>
            <p>
              <strong>Evidence over opinion:</strong> Training and nutrition
              strategies are based on established principles, not hype.
            </p>
            <p>
              <strong>Sustainability over intensity:</strong> The best program is
              the one you can follow consistently.
            </p>
          </div>
        </section>

        {/* What you'll find */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            What You’ll Find Here
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Workout plans for muscle building, fat loss, and strength</li>
            <li>Nutrition guides focused on calories, macros, and sustainability</li>
            <li>Practical strategies for consistency, recovery, and performance</li>
          </ul>

          <p className="mt-4">
            You can explore all content in the main page of our{" "}
            <Link href="/#posts" className="text-blue-600 underline">
              fitness blog
            </Link>.
          </p>
        </section>

        {/* Author */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            About the Author
          </h2>
          <p className="mb-4">
            EvidenceFit is built by a Business Informatics graduate with a focus
            on systems, data, and performance optimization.
          </p>
          <p>
            This background shapes how fitness is approached here — breaking down
            complex topics into structured systems, filtering out ineffective
            advice, and focusing on efficient, real-world results.
          </p>
        </section>

        {/* Trust */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Trust & Transparency
          </h2>
          <p className="mb-4">
            EvidenceFit does not promote shortcuts, unrealistic transformations,
            or misleading claims. The focus is always on accuracy, clarity, and
            long-term results.
          </p>
          <p>
            Content is updated as better information becomes available, with the
            goal of staying reliable and useful over time.
          </p>
        </section>

        {/* CTA */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Start Here
          </h2>
          <p>
            If you’re new, start with the{" "}
            <Link href="/posts/starting-fitness-or-first-time-in-gym-this-is-everything-you-need-to-know" className="text-blue-600 underline">
              Guide Here
            </Link>{" "}
            where you’ll find workout plans, nutrition guides, and practical
            strategies you can apply immediately.
          </p>
        </section>
      </main>
  );
}