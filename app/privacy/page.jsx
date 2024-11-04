// app/privacy/page.jsx
export const metadata = {
  title: "Privacy Policy | TaskFlow",
  description: "TaskFlow privacy policy and data protection information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <header className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </header>

          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              This privacy policy describes how TaskFlow collects, uses, and
              protects your personal information when you use our service.
            </p>
          </section>

          {/* Information Collection */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Information We Collect
            </h2>
            <ul className="grid gap-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Account information (email, name) when you create an account
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Task and project data that you create while using the service
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Usage information to improve our service
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Technical data (browser type, device information)
              </li>
            </ul>
          </section>

          {/* Data Usage */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">
              How We Use Your Information
            </h2>
            <ul className="grid gap-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                To provide and maintain the TaskFlow service
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                To improve and personalize your experience
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                To send important notifications about the service
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                To protect against fraud and abuse
              </li>
            </ul>
          </section>

          {/* Security */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate security measures to protect your
              personal information. Your data is encrypted in transit and at
              rest, and we regularly review our security practices.
            </p>
          </section>

          {/* Rights */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Your Rights</h2>
            <p className="text-muted-foreground mb-3">You have the right to:</p>
            <ul className="grid gap-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Access your personal information
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Correct inaccurate data
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Request deletion of your data
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Export your data
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this privacy policy, please
              contact us at{" "}
              <a
                href="mailto:privacy@taskflow.com"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                privacy@taskflow.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
