import { prisma } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId } = params;
    const body = await req.json();

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: body,
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("[PROJECT_PATCH]", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId } = params;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[PROJECT_DELETE]", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
