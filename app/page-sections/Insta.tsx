"use client"

import { ChevronLeft, ChevronRight } from 'lucide-react';
import data from '../../public/amplify_data/data.json';
import { useState } from 'react';

interface Post {
  id: string;
  type: string;
  url: string;
  images: string[];
  displayUrl: string;
  alt: string;
  likesCount: number;
  commentsCount: number;
  ownerUsername: string;
  ownerFullName: string;
}

export default function InstagramFeed() {
  const posts = data as Post[];
  const firstPost = posts[0];
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const [preloadedImages, setPreloadedImages] = useState<{ [key: string]: boolean }>({});

  // Preload images when hovering
  const preloadPostImages = (post: Post) => {
    post.images.forEach((imageSrc) => {
      const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(imageSrc)}`;
      if (!preloadedImages[proxyUrl]) {
        const img = new Image();
        img.src = proxyUrl;
        setPreloadedImages(prev => ({ ...prev, [proxyUrl]: true }));
      }
    });
  };

  const handlePrevImage = (e: React.MouseEvent, postId: string, imageCount: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [postId]: ((prev[postId] || 0) - 1 + imageCount) % imageCount
    }));
  };

  const handleNextImage = (e: React.MouseEvent, postId: string, imageCount: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [postId]: ((prev[postId] || 0) + 1) % imageCount
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-8 mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl font-bold">
              <img className='h-12' src={"./DNALogo-2.PNG"}/>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-light">{firstPost.ownerUsername}</h1>
              <a
                href="https://www.instagram.com/dnaautosource/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 px-6 py-1.5 rounded-lg font-semibold text-sm transition"
              >
                Follow
              </a>
            </div>
            
            <div className="flex gap-8 mb-4">
              <div>
                <span className="font-semibold">72</span> posts
              </div>
              <div>
                <span className="font-semibold">176</span> followers
              </div>
              <div>
                <span className="font-semibold">223</span> following
              </div>
            </div>
            
            <div>
              <p className="font-semibold">{firstPost.ownerFullName}</p>
              <p className="text-gray-400 text-sm">Automotive Service</p>
              <p className="mt-2">🔎 Automotive Sourcing Specialists</p>
              <p>🔩 PARTS | ACCESSORIES 🏁 | VEHICLES 🏎️</p>
              <p>📍Proudly Canadian 🇨🇦 Serving the World 🌍</p>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => {
              const currentIndex = currentImageIndex[post.id] || 0;
              const currentImage = post.images[currentIndex] || post.displayUrl;
              
              return (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square group cursor-pointer overflow-hidden"
                  onMouseEnter={() => {
                    setHoveredPostId(post.id);
                    preloadPostImages(post);
                  }}
                  onMouseLeave={() => setHoveredPostId(null)}
                >
                  <img
                    src={`https://images.weserv.nl/?url=${encodeURIComponent(currentImage)}`}
                    alt={post.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Image+Unavailable';
                    }}
                  />

                  {/* Navigation Arrows - Show on hover if multiple images */}
                  {hoveredPostId === post.id && post.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => handlePrevImage(e, post.id, post.images.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 transition z-10"
                      >
                        <ChevronLeft className="w-4 h-4 text-black" />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(e, post.id, post.images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 transition z-10"
                      >
                        <ChevronRight className="w-4 h-4 text-black" />
                      </button>
                      
                      {/* Dot indicators */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {post.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition ${
                              idx === currentIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}