"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Bookmark,
  Share2,
  Sparkles,
  Quote,
  Info,
} from "lucide-react";

const mockStory = {
  title: "The Origin of Rain",
  elderName: "Elder Awa",
  recordingDate: "2024",
  coverImage: "/images/indianElder.jpeg",
  transcript: `Long ago, before the mountains touched the sky, the world was silent. The elders say that the first sound was not a voice, but the wind weaving through the cedar trees, carrying secrets from the North.

In those days, the earth was parched and the rivers ran dry. The people waited, their hearts heavy with longing for the sky to open and bless the land with rain.

But the rain did not come from above. Instead, it came from the music. An old man, whose name has been forgotten by all but the oldest stories, sat beneath the great oak tree at the edge of the village. He had no words left to speak, for he had told every tale he knew. So he picked up his flute, carved from a branch that had once sheltered a family of birds, and began to play.`,
  aiContext:
    "The 'North' often symbolizes the ancestral spirit world in this region's folklore. Winds from that direction are believed to carry messages from departed elders. The flute, in many indigenous traditions, serves as a bridge between the human and spiritual realms.",
};

export default function StoryPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [heights, setHeights] = useState([]);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  /* Audio waveform animation */
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setHeights(Array.from({ length: 28 }, () => Math.random() * 50 + 20));
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  /* Mouse-based ambient parallax */
  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /* Scroll ambience */
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll",
        `${window.scrollY / 600}`
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [waveformBars, setWaveformBars] = useState([]);

  useEffect(() => {
    setWaveformBars(
      Array.from({ length: 36 }, () => Math.random() * 60 + 20)
    );
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#F5F2ED]">
      {/* Grain texture */}
      <div className="absolute inset-0 z-[60] pointer-events-none opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Interactive ambient light */}
      <div
        className="absolute w-[60%] h-[60%] rounded-full bg-[#C26D48]/10 blur-[160px] transition-all duration-700"
        style={{
          top: `${mouse.y - 30}%`,
          left: `${mouse.x - 30}%`,
        }}
      />
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full bg-[#8B6F47]/10 blur-[140px]" />

      {/* Scroll depth */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-[#C26D48]/5 pointer-events-none"
        style={{ opacity: "calc(var(--scroll) * 0.5)" }}
      />

      <div className="relative z-10 flex h-full">
        {/* LEFT SIDEBAR */}
        {/* --- LEFT SIDEBAR: STORY TOTEM --- */}
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
        <main className="flex-1 overflow-y-auto bg-white/40 scroll-smooth">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-20 py-16 sm:py-24">
            {/* Header */}
            <header className="mb-16 flex justify-between items-center border-b border-black/5 pb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl text-[#C26D48]">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-gray-400">
                    Oral Manuscript
                  </p>
                  <p className="text-sm italic text-gray-600">
                    Archived {mockStory.recordingDate}
                  </p>
                </div>
              </div>
              <Share2 className="text-gray-400" size={18} />
            </header>

            {/* Manuscript */}
            <article className="relative">
              <Quote className="absolute -left-10 -top-10 w-24 h-24 text-black/3" />
              <div className="font-serif text-[#333] text-base md:text-lg leading-[1.9] space-y-8">
                {mockStory.transcript.split("\n\n").map((p, i) => (
                  <p key={i} className="hover:text-[#1F1F1F] transition-colors">
                    <span className="first-letter:text-5xl md:first-letter:text-6xl first-letter:font-bold first-letter:text-[#C26D48] first-letter:mr-4 first-letter:float-left first-letter:mt-2">
                      {p.charAt(0)}
                    </span>
                    {p.slice(1)}
                  </p>
                ))}
              </div>
            </article>

            {/* AI Insight */}
            <section className="mt-24">
              <div className="relative bg-[#FDFCFB] p-10 rounded-[40px] border border-black/5">
                <Info className="absolute top-8 right-8 opacity-10" size={60} />
                <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#C26D48] mb-6">
                  AI Cultural Insight
                </h4>
                <p className="font-serif text-base md:text-lg italic text-[#555] max-w-2xl">
                  "{mockStory.aiContext}"
                </p>
              </div>
            </section>

            <footer className="mt-32 text-center text-[10px] tracking-[0.5em] text-gray-300 uppercase">
              Document End
            </footer>
          </div>
        </main>
      </div>

      {/* Mobile floating play button */}
      <div className="fixed bottom-6 right-6 lg:hidden z-50">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-14 h-14 rounded-full bg-[#C26D48] text-white shadow-2xl flex items-center justify-center"
        >
          {isPlaying ? <Pause /> : <Play className="ml-1" />}
        </button>
      </div>

      {/* Text selection */}
      <style jsx global>{`
        ::selection {
          background: rgba(194, 109, 72, 0.25);
        }
      `}</style>
    </div>
  );
}
