import { NextResponse } from "next/server";
import { db } from "@/libs/firebaseClient";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";


 // saving stories
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
      title: analysis.title,
      translatedText: analysis.translatedText,
      culturalNotes: analysis.culturalNotes,
      summary: analysis.summary,
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

// fetching all stories
export async function GET() {
  try {
    const q = query(
      collection(db, "stories"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const stories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      stories,
    });
  } catch (error) {
    console.error("Fetch stories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}
