import { NextResponse } from "next/server";
import { askGemini } from "@/libs/gemini";
import removeMd from "remove-markdown";

export async function POST(req) {
  try {
    // passed from the audio-to-speech converted
    const { transcript } = await req.json();

    // check if transcript is available
    if (!transcript) {
      return NextResponse.json(
        {
          error: "Transcript required",
        },
        { status: 400 }
      );
    }

    const aiResponse = await askGemini({ content: transcript });

    // format the output in correct json format

    const cleaned = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();


    let jsonResponse;

    try {
      jsonResponse = JSON.parse(cleaned);
    } 
    catch (err) {
      console.error("Invalid Gemini JSON:", cleaned);
      return NextResponse.json(
        { error: "AI response parsing failed" },
        { status: 500 }
      );
    }

    const culturalNotes = Array.isArray(jsonResponse.culturalNotes)
      ? jsonResponse.culturalNotes.map(note => removeMd(note))
      : [];

    const summary = removeMd(jsonResponse.summary || "");

    return NextResponse.json(
      {
        success: true,
        data: {
            title : jsonResponse.title,
            translatedText : jsonResponse.translatedText,
            culturalNotes,
            summary
        },
        message: "Transcript translated succesfully!!",
      },
      { status: 200 }
    );
  } catch (error) {

    return NextResponse.json(
      {
        message: "Error in transcript processing!",
        success: false,
      },
      { status: 500 }
    );
  }
}
