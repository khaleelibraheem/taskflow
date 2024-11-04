import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    return NextResponse.json({ status: "Database connection successful" });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        error: "Database connection failed",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
