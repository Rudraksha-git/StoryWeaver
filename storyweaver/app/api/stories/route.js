import { NextResponse } from "next/server";
import { db } from "@/libs/firebaseClient";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const {
      transcript,
      analysis,
      audioUrl,
      languageCode,
      languageName,
      region,
      speakerName,
    } = await req.json();

    if (!transcript || !analysis || !audioUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "stories"), {
      transcript,
      analysis,
      audioUrl,
      languageCode,
      languageName,
      region,
      speakerName,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
    });

  } catch (error) {
    console.error("Firestore save error:", error);
    return NextResponse.json(
      { error: "Failed to save story" },
      { status: 500 }
    );
  }
}
