import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    // Update the div wrapper in both files:
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] pt-20">
      <SignUp
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
