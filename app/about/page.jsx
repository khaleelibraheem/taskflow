// app/about/page.jsx
export const metadata = {
  title: "About | TaskFlow",
  description:
    "Learn more about TaskFlow, a simple and efficient task management application.",
};

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-20 lg:py-16">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <header className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              About TaskFlow
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              A simple and efficient task management solution for individuals
            </p>
          </header>

          {/* Introduction */}
          <section className="space-y-4">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              TaskFlow is a personal project built to help individuals manage
              their tasks and projects efficiently. It combines simplicity with
              powerful features to create an effective task management solution.
            </p>
          </section>

          {/* Mission */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To provide a simple yet powerful tool that helps people stay
              organized and productive. We believe that task management
              shouldn&apos;t be complicated, and that&apos;s why we&apos;ve
              created TaskFlow with a focus on user experience and essential
              features.
            </p>
          </section>

          {/* Features */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Key Features</h2>
            <ul className="grid gap-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Simple and intuitive task management
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Project organization and categorization
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Progress tracking and analytics
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Responsive design for all devices
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Dark mode support
              </li>
            </ul>
          </section>

          {/* Tech Stack */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Technology Stack
            </h2>
            <p className="text-muted-foreground mb-4">
              TaskFlow is built using modern web technologies including:
            </p>
            <ul className="grid gap-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Next.js for the frontend framework
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Tailwind CSS for styling
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Clerk for authentication
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Prisma as the ORM
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                PostgreSQL for the database
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
