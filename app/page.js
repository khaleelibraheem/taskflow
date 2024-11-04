"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import {
  CheckCircle,
  Sparkles,
  BarChart3,
  Clock,
  Smartphone,
  Shield,
  Check,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { ResponsiveMockup } from "@/components/ui/responsive-mockup";

export default function Home() {
  const { isSignedIn } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
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
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 pb-12 pt-24 bg-gradient-to-b from-background to-muted/20">
        <motion.div
          className="text-center space-y-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-6">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
              Welcome to TaskFlow
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
            Manage tasks with ease
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl font-medium leading-relaxed">
            A simple, free tool to organize your tasks and boost productivity
          </p>
          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {!isSignedIn ? (
              <>
                <Button asChild size="lg" className="rounded-lg font-medium">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="rounded-lg font-medium"
                >
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </>
            ) : (
              <Button asChild size="lg" className="rounded-lg font-medium">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* Responsive Mockup */}
        <motion.div
          className="w-full mt-16"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <ResponsiveMockup />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features to help you manage your tasks and projects
              effectively
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Add Why TaskFlow section after Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
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
                className="p-6 rounded-lg bg-card border"
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
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

      {/* How It Works Section with Screenshots */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
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
                variants={itemVariants}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
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
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
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
                variants={itemVariants}
                className="p-6 rounded-xl bg-card border"
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      {!isSignedIn && (
        <motion.section
          className="py-24 px-4 bg-muted/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Start organizing your tasks today
              </h2>
              <p className="text-lg text-muted-foreground">
                Simple, free, and designed to help you focus on what matters
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="rounded-lg font-medium">
                  <Link href="/sign-up">Get Started Free</Link>
                </Button>
              </motion.div>
              <span className="text-sm text-muted-foreground">
                No credit card required • Free forever
              </span>
            </div>
          </div>
        </motion.section>
      )}

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
