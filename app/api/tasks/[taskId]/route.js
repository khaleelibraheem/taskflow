import { prisma } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
 try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { taskId } = params;
    const body = await req.json();

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task) {
      return new NextResponse(
        JSON.stringify({ message: "Task not found" }), 
        { status: 404 }
      );
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: body,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("[TASK_UPDATE]", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to update task" }), 
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { taskId } = params;

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task) {
      return new NextResponse("Not found", { status: 404 });
    }

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[TASK_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
