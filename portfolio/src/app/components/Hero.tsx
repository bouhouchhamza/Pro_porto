'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">

        {/* LEFT CONTENT - نص أصغر */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full border border-purple-500/30 text-purple-300 text-xs">
            ✨ Welcome to My Portfolio
          </span>

          <h1 className="font-bold leading-tight mb-4">
            <span className="block text-white text-xl sm:text-xl lg:text-2xl">
              Get to Know Me:
            </span>

            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-xl sm:text-1xl lg:text-2xl">
              A Creator, Thinker &
            </span>

            <span className="block bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent text-xl sm:text-2xl lg:text-3xl">
              Builder
            </span>
          </h1>

          <p className="text-gray-300 max-w-lg mx-auto lg:mx-0 mb-8 text-sm sm:text-base">
            Passionate Full Stack Developer with 5+ years of experience crafting
            innovative web solutions. Specializing in modern technologies and
            user-centric design.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium text-sm hover:scale-105 transition"
            >
              View My Work
            </button>

            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-6 py-2.5 rounded-full border border-purple-500 text-purple-300 text-sm hover:bg-purple-500 hover:text-white transition"
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE - صورة متوسطة الحجم */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-60 lg:h-60 flex items-center justify-center">

            {/* حلقة خارجية بسيطة */}
            <div className="absolute inset-0 rounded-full border border-purple-400/30" />

            {/* توهج خفيف جداً */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-lg" />

            {/* صورة الملف الشخصي - حجم معقول */}
            <div className="relative w-4/5 h-4/5 rounded-full overflow-hidden border-2 border-purple-400/50 shadow-lg">
              <Image
                src="/074ead6d-61f3-416f-a7b5-7e92208fde79.png"
                alt="Profile"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 240px"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}