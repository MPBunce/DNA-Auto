"use client"

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PostMetadata {
  id: string;
  shortCode: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  timestamp: string;
  url: string;
  folder_path: string;
  downloaded_files: string[];
  video_file: string | null;
  hashtags: string[];
  mentions: string[];
  locationName?: string;
  ownerUsername: string;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Load the index.json file from public/posts
    fetch('/posts/index.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load posts:', err);
        setLoading(false);
      });
  }, []);

  const getImagePath = (post: PostMetadata, filename: string) => {
    return `/posts/${post.shortCode}/${filename}`;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>No posts found</p>
      </div>
    );
  }

  const firstPost = posts[0];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center gap-4 md:gap-8 mb-6 md:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <Image className='h-8 sm:h-10 md:h-12' src={"./DNALogo-2.PNG"} alt="DNA Auto Source Logo" width={48} height={48} />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
              <h1 className="text-lg sm:text-xl md:text-2xl font-light truncate">{firstPost.ownerUsername}</h1>
              <a
                href="https://www.instagram.com/dnaautosource/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 px-4 md:px-6 py-1 md:py-1.5 rounded-lg font-semibold text-xs md:text-sm transition flex-shrink-0"
              >
                Follow
              </a>
            </div>
            
            <div className="flex gap-4 md:gap-8 mb-3 md:mb-4 text-sm md:text-base">
              <div>
                <span className="font-semibold">{posts.length}</span> <span className="hidden xs:inline">posts</span>
              </div>
              <div>
                <span className="font-semibold">176</span> <span className="hidden xs:inline">followers</span>
              </div>
              <div>
                <span className="font-semibold">223</span> <span className="hidden xs:inline">following</span>
              </div>
            </div>
            
            <div className="text-sm md:text-base">
              <p className="font-semibold">DNA Auto Source Inc.</p>
              <p className="text-gray-400 text-xs md:text-sm">Automotive Service</p>
              <p className="mt-1 md:mt-2 text-xs md:text-base">🔎 Automotive Sourcing Specialists</p>
              <p className="text-xs md:text-base">🔩 PARTS | ACCESSORIES 🏁 | VEHICLES 🏎️</p>
              <p className="text-xs md:text-base">📍Proudly Canadian 🇨🇦 Serving the World 🌍</p>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="border-t border-gray-800 pt-6 md:pt-8">
          <div className="grid grid-cols-3 gap-0.5 sm:gap-1">
            {posts.map((post) => {
              const currentIndex = currentImageIndex[post.id] || 0;
              const currentImage = post.downloaded_files[currentIndex];
              
              return (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square group cursor-pointer overflow-hidden"
                  onMouseEnter={() => setHoveredPostId(post.id)}
                  onMouseLeave={() => setHoveredPostId(null)}
                  onTouchStart={() => setHoveredPostId(post.id)}
                >
                  <Image
                    src={getImagePath(post, currentImage)}
                    alt={post.caption.substring(0, 100)}
                    className="w-full h-full object-cover"
                    fill
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 33vw"
                  />

                  {/* Navigation Arrows - Show on hover/touch if multiple images */}
                  {hoveredPostId === post.id && post.downloaded_files.length > 1 && (
                    <>
                      <button
                        onClick={(e) => handlePrevImage(e, post.id, post.downloaded_files.length)}
                        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 sm:p-1.5 transition z-10"
                      >
                        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(e, post.id, post.downloaded_files.length)}
                        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 sm:p-1.5 transition z-10"
                      >
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                      </button>
                      
                      {/* Dot indicators */}
                      <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5 sm:gap-1 z-10">
                        {post.downloaded_files.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition ${
                              idx === currentIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Hover overlay with stats */}
                  {hoveredPostId === post.id && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 text-white text-sm sm:text-base">
                      <div className="flex items-center gap-1">
                        <span>❤️</span>
                        <span className="font-semibold">{post.likesCount >= 0 ? post.likesCount : 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>💬</span>
                        <span className="font-semibold">{post.commentsCount}</span>
                      </div>
                    </div>
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