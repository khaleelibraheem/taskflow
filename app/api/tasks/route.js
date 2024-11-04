import { prisma } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Starting POST request...");

    const { userId } = getAuth(req);
    console.log("Authenticated userId:", userId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    console.log("Received body:", body);

    const { title, description, priority } = body;
    const dueDate = body.dueDate ? new Date(body.dueDate) : null;

    // Create task with minimal required fields
    const task = await prisma.task.create({
      data: {
        title,
        userId,
        status: "TODO",
        description: description || "",
        priority: priority || "MEDIUM",
        dueDate,
      },
    });

    console.log("Task created successfully:", task);
    return NextResponse.json(task);
  } catch (error) {
    console.error("Error in POST /api/tasks:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Failed to create task",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function GET(req) {
  try {
    console.log("Starting GET request...");

    const { userId } = getAuth(req);
    console.log("Authenticated userId:", userId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
    include: {
      project: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

    console.log(`Found ${tasks.length} tasks`);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error in GET /api/tasks:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Failed to fetch tasks",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
