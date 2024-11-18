// app/help/page.jsx
export const metadata = {
  title: "Help | TaskFlow",
  description:
    "Get help with using TaskFlow and find answers to common questions.",
};

export default function HelpPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-20 lg:py-16">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <header className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Help Center
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Find answers to common questions and learn how to use TaskFlow
            </p>
          </header>

          {/* Getting Started */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Getting Started
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Welcome to TaskFlow! Here&apos;s how to get started with managing
                your tasks:
              </p>
              <ol className="grid gap-3 pl-5 list-decimal">
                <li>Sign up for an account using your email</li>
                <li>Create your first project from the dashboard</li>
                <li>Add tasks to your project</li>
                <li>Organize tasks with tags and priorities</li>
              </ol>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-6">
              <div className="space-y-2">
                <h3 className="font-medium">How do I create a new task?</h3>
                <p className="text-muted-foreground">
                  Click the &quot;New Task&quot; button in the dashboard, fill in the task
                  details, and click &quot;Create Task&quot; to save it.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">
                  Can I organize tasks into projects?
                </h3>
                <p className="text-muted-foreground">
                  Yes! You can create projects and organize your tasks within
                  them. Each task can belong to one project.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">How do I track my progress?</h3>
                <p className="text-muted-foreground">
                  The dashboard shows your overall progress, and each project
                  has its own progress tracking. You can also view detailed
                  analytics in the Analytics section.
                </p>
              </div>
            </div>
          </section>

          {/* Support */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Contact Support
            </h2>
            <p className="text-muted-foreground">
              Need additional help? Contact us at{" "}
              <a
                href="mailto:support@taskflow.com"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                support@taskflow.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
