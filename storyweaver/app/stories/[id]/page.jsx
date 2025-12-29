"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play, Pause } from "lucide-react";

const mockStory = {
  id: "1",
  title: "The Origin of Rain",
  elderName: "Elder Awa",
  recordingDate: "2024",
  audioUrl: "/audio/placeholder.mp3",
  coverImage: "/images/indianElder.jpeg",
  transcript: `Before paths were drawn and before villages learned to stay in one place, there stood a tree at the center of the plain. It was not the tallest, nor the oldest, but it listened better than any living thing.

The elders said the tree had roots so deep they touched yesterday.

When people passed by, they would rest in its shade and speak without meaning to. They told the tree their worries, their hopes, and sometimes the names of those they had lost. The tree did not answer. It only listened. But it remembered every word.

During dry years, when the wind scraped the earth bare and children counted clouds that never arrived, the people noticed something strange. At dawn, droplets formed on the tree’s leaves—even when the sky was clear. They fell slowly, one by one, darkening the dust below.

An elder placed her palm against the trunk and felt a quiet warmth, like breath.

“These are not tears,” she said. “They are memories returning.”

That night, the villagers gathered. One by one, they spoke the names they feared would disappear: grandparents, travelers, children taken too soon. With each name, the tree’s branches stirred, though there was no wind.

By morning, clouds gathered—not heavy with storm, but full and patient. Rain followed, steady and kind. The ground softened. Seeds long buried woke and pushed upward.

From then on, when someone feared being forgotten, they would whisper their name to the tree. And when the land grew thirsty, the people returned—not to beg for rain, but to remember together.

This is why, even now, when rain falls without warning, some say it is not the sky that speaks—but the earth, finally answering back.`,
  aiContext:
    "The 'North' often symbolizes the ancestral spirit world in this region's folklore.",
};

export default function StoryPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformBars, setWaveformBars] = useState([]);

  useEffect(() => {
    setWaveformBars(
      Array.from({ length: 36 }, () => Math.random() * 60 + 20)
    );
  }, []);

  /* Optional: animate when playing */
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setWaveformBars(
        Array.from({ length: 36 }, () => Math.random() * 60 + 20)
      );
    }, 300);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-[#F6F3EE]">
      <div className="flex flex-col lg:flex-row">

        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-[420px] lg:h-screen lg:sticky lg:top-0 px-8 py-10 flex flex-col justify-between">

          <Link
            href="/archive"
            className="flex items-center gap-2 text-sm font-serif text-[#8B6F47]"
          >
            <ArrowLeft size={18} />
            Back to Archive
          </Link>

          <div className="flex flex-col items-center text-center gap-8">

            {/* Cover */}
            <div className="relative">
              <div className="absolute inset-0 rounded-[28px] bg-[#C26D48]/20 blur-3xl opacity-40" />
              <div className="relative w-[240px] aspect-[3/4] rounded-[28px] overflow-hidden shadow-xl">
                <Image
                  src={mockStory.coverImage}
                  alt={mockStory.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-serif font-semibold">
                {mockStory.title}
              </h1>
              <p className="text-xs tracking-widest uppercase text-[#C26D48]">
                {mockStory.elderName} · {mockStory.recordingDate}
              </p>
            </div>

            {/* Waveform */}
            <div className="flex items-end gap-1 h-10">
              {waveformBars.map((h, i) => (
                <div
                  key={i}
                  className={`w-[3px] rounded-full transition-all ${
                    isPlaying ? "bg-[#C26D48]" : "bg-[#C26D48]/40"
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            {/* Play Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-[#C26D48] text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
            >
              {isPlaying ? (
                <Pause size={26} fill="white" />
              ) : (
                <Play size={26} fill="white" className="ml-1" />
              )}
            </button>
          </div>

          <p className="text-[10px] tracking-[0.3em] text-center text-gray-300">
            ORAL HISTORY ARCHIVE
          </p>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1 bg-white px-6 sm:px-10 py-14">
          <div className="max-w-3xl mx-auto font-serif text-black leading-[1.9] space-y-8">
            {mockStory.transcript.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <aside className="mt-12 border-l-2 border-[#C26D48]/30 pl-6">
              <h4 className="text-[10px] tracking-widest uppercase text-[#C26D48] mb-2">
                Cultural Insight
              </h4>
              <p className="italic text-sm text-[#555]">
                {mockStory.aiContext}
              </p>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
