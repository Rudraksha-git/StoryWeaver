import { NextResponse } from "next/server";
import { db } from "@/libs/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Story ID is required" },
        { status: 400 }
      );
    }

    const docRef = doc(db, "stories", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      story: {
        id: docSnap.id,
        ...docSnap.data(),
      },
    });
  } catch (error) {
    console.error("Fetch story by ID error:", error);
    return NextResponse.json(
      { error: "Failed to fetch story" },
      { status: 500 }
    );
  }
}
