"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ArchivePage() {
  const [selectedRegion, setSelectedRegion] = useState('Northeast India');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

  const regions = [
    'Northeast India',
    'North Pacific',
    'South Asia',
    'Middle East',
    'Central Asia',
    'East Africa'
  ];

  // Sample data for Top Rated Stories
  const topRatedStories = [
    {
      id: 1,
      imageSrc: 'https://via.placeholder.com/400x300/8B6F47/FFFFFF?text=Kurukshetra+Yuddha',
      title: 'Kurukshetra Yuddha',
      dialect: 'Sanskrit',
      region: 'South Asia',
      description: 'The epic battle of Mahabharata'
    },
    {
      id: 2,
      imageSrc: 'https://via.placeholder.com/400x300/8B6F47/FFFFFF?text=Battle+of+Legends',
      title: 'Battle of Legends',
      dialect: 'Hindi',
      region: 'South Asia',
      description: 'A legendary tale of valor and honor'
    }
  ];

  // Sample data for All Stories Library
  const allStories = [
    {
      id: 3,
      title: 'The Indian Elephant',
      description: 'Smart, scalable, intuitive, efficient, reliable, modern',
      isVerified: true
    },
    {
      id: 4,
      title: 'The Indian Elephant',
      description: 'Smart, scalable, intuitive, efficient, reliable, modern',
      isVerified: true
    },
    {
      id: 5,
      title: 'The Indian Elephant',
      description: 'Smart, scalable, intuitive, efficient, reliable, modern',
      isVerified: true
    },
    {
      id: 6,
      title: 'The Indian Elephant',
      description: 'Smart, scalable, intuitive, efficient, reliable, modern',
      isVerified: true
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar - Filter Archive */}
      <aside className="w-64 bg-[#F7F4EF] p-6 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-[#8B6F47] font-serif">
          Filter Archive
        </h2>
        
        {/* Region Filter */}
        <div className="flex flex-col gap-3">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
          >
            <h3 className="text-2xl font-bold text-[#8B6F47] font-serif">
              Region
            </h3>
            <ChevronDown 
              size={20} 
              className={`text-[#8B6F47] transition-transform ${isRegionDropdownOpen ? 'rotate-180' : ''}`}
            />
          </div>
          
          {/* Region Buttons */}
          <div className="flex flex-col gap-2">
            {regions.map((region) => (
              <Button
                key={region}
                text={region}
                onClick={() => setSelectedRegion(region)}
                variant="region"
                isSelected={selectedRegion === region}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 p-8 bg-white">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="border-b-2 border-[#8B6F47] mb-2"></div>
          <div className="flex items-center gap-3 pb-2 border-b-2 border-[#8B6F47]">
            <Search size={24} className="text-[#8B6F47]" />
            <input
              type="text"
              placeholder="Search for Harvest Songs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[#8B6F47] placeholder-[#8B6F47]/60 font-serif text-lg outline-none"
            />
          </div>
        </div>

        {/* Top Rated Stories Section */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-[#8B6F47] font-serif mb-6">
            Top Rated Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topRatedStories.map((story) => (
              <div key={story.id} className="flex flex-col">
                <div className="relative w-full h-64 mb-3 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={story.imageSrc}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#8B6F47] font-serif">
                  {story.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* All Stories Library Section */}
        <section>
          <h2 className="text-4xl font-bold text-[#8B6F47] font-serif mb-6">
            All Stories Library
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allStories.map((story) => (
              <div
                key={story.id}
                className="bg-[#E8DCC6] rounded-lg p-4 flex flex-col gap-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                {story.isVerified && (
                  <div className="bg-[#8B6F47] text-white text-xs font-bold px-3 py-1 rounded w-fit">
                    VERIFIED ELDER
                  </div>
                )}
                <h3 className="text-lg font-bold text-[#8B6F47] font-serif">
                  {story.title}
                </h3>
                <p className="text-sm text-[#8B6F47]">
                  {story.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

