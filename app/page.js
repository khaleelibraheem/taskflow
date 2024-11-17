"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  BarChart3,
  Clock,
  Smartphone,
  Shield,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { ResponsiveMockup } from "@/components/ui/responsive-mockup";
import { Navigation } from "@/components/shared/navigation";

export default function Home() {
  const { isSignedIn } = useAuth();

  const features = [
    {
      icon: CheckCircle,
      title: "Task Management",
      description:
        "Create, organize, and track your personal tasks with ease. Set priorities and deadlines effortlessly.",
    },
    {
      icon: Sparkles,
      title: "Smart Organization",
      description:
        "Keep your tasks organized with simple categories and priorities for better personal workflow.",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description:
        "Track your task completion and monitor your personal productivity.",
    },
    {
      icon: Clock,
      title: "Time Management",
      description:
        "Set deadlines for your tasks and stay on top of your schedule.",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description:
        "Access your tasks anywhere with our responsive design that works on all devices.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your data is protected with Clerk authentication and secure database storage.",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Modern Navbar */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center space-y-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-6">
              <span className="text-sm font-medium">Welcome to TaskFlow</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Manage tasks with unmatched simplicity
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple, free tool designed to help you organize tasks and boost
              productivity with a modern approach to personal task management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!isSignedIn ? (
                <>
                  <Button size="lg" className="w-full sm:w-auto" asChild>
                    <Link href="/sign-up">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                </>
              ) : (
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>

          {/* App Preview */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <ResponsiveMockup />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features to help you manage your tasks and projects
              effectively
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative p-6 rounded-2xl border bg-card hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium">Powerful Features</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mt-2">
              Everything you need to manage tasks effectively
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-8 rounded-xl bg-card border hover:border-primary/50 transition-colors">
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Smart Task Organization
                </h3>
                <p className="text-muted-foreground mb-4">
                  Keep track of your personal productivity with basic analytics.
                  Monitor progress and optimize your workflow.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Simple task categorization",
                    "Basic priority setting",
                    "Personal task organization",
                    "Easy task management",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="p-8 rounded-xl bg-card border hover:border-primary/50 transition-colors">
                <BarChart3 className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Detailed Analytics
                </h3>
                <p className="text-muted-foreground mb-4">
                  Get insights into your productivity with detailed analytics.
                  Track progress, identify bottlenecks, and optimize your
                  workflow.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Task completion tracking",
                    "Basic progress monitoring",
                    "Simple productivity insights",
                    "Personal dashboard view",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why TaskFlow Section */}
      <section className="py-24 bg-muted/10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium">
              Why Choose TaskFlow
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mt-2">
              Built different, built better
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Built for Simplicity",
                description:
                  "Clean, intuitive interface focused on personal task management.",
              },
              {
                title: "Privacy First",
                description:
                  "Your data is secured with Clerk authentication and protected storage.",
              },
              {
                title: "Always Improving",
                description:
                  "Regular updates and enhancements to make task management better.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              How TaskFlow works
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple steps to boost your productivity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Create Tasks",
                description: "Add your tasks and organize them into projects",
              },
              {
                step: "2",
                title: "Track Progress",
                description:
                  "Monitor task completion and track your productivity",
              },
              {
                step: "3",
                title: "Achieve Goals",
                description:
                  "Complete tasks efficiently and reach your objectives",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/10">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium">FAQ</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mt-2">
              Frequently asked questions
            </h2>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              {
                q: "Is TaskFlow free to use?",
                a: "Yes, TaskFlow is completely free to use. It's a personal project focused on providing simple and effective task management.",
              },
              {
                q: "Can I collaborate with my team?",
                a: "Currently, TaskFlow is designed for individual use. Each user has their own private workspace to manage personal tasks and projects.",
              },
              {
                q: "How secure is my data?",
                a: "Your data is protected using Clerk authentication and stored securely in our database. We use HTTPS encryption to ensure your information remains private.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modern CTA Section */}
      {!isSignedIn && (
        <motion.section
          className="py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <div className="relative z-10 bg-card border rounded-3xl p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Start organizing your tasks today
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Simple, free, and designed to help you focus on what matters
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" asChild>
                  <Link href="/sign-up">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <span className="text-sm text-muted-foreground">
                  No credit card required • Free forever
                </span>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Footer Section */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-sm text-muted-foreground">
            <p className="mt-1">
              Built by{" "}
              <a
                href="https://github.com/khaleelibraheem"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Khaleel Alhaji
              </a>
            </p>
          </div>
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <Link
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/help"
              className="hover:text-foreground transition-colors"
            >
              Help
            </Link>
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TaskFlow
          </div>
        </div>
      </footer>
    </div>
  );
}
