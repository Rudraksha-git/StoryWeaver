import { NextResponse } from "next/server";
import { SpeechClient } from "@google-cloud/speech";

const client = new SpeechClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("audio");
    const languageCode = formData.get("languageCode") || "hi-IN";


    if (!file) {
      return NextResponse.json(
        { error: "Audio file missing" },
        { status: 400 }
      );
    }

    // Convert audio → base64
    const arrayBuffer = await file.arrayBuffer();
    const audioBytes = Buffer.from(arrayBuffer).toString("base64");

    // Speech-to-Text request

    const [response] = await client.recognize({
    audio: { content: audioBytes },
    config: {
        encoding: "WEBM_OPUS",
        languageCode,
        enableAutomaticPunctuation: true,
    },
    });


    const transcript = response.results
      ?.map(r => r.alternatives?.[0]?.transcript || "")
      .join(" ")
      .trim();

    if (!transcript) {
      return NextResponse.json(
        { error: "No speech detected. Please speak clearly." },
        { status: 400 }
      );
    }

    return NextResponse.json({ transcript });

  } catch (error) {
    console.error("Speech-to-text error:", error);

    return NextResponse.json(
      { error: error.message || "Speech-to-text failed" },
      { status: 500 }
    );
  }
}
