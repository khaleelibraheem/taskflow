import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    // Update the div wrapper in both files:
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] pt-20">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            footerActionLink: "text-primary hover:text-primary/90",
          },
        }}
      />
    </div>
  );
}
