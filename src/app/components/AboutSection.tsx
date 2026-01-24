'use client';

import { useState, useEffect, useRef } from 'react';

interface TypingCodeEditorProps {
  code: string;
}

function TypingCodeEditor({ code }: TypingCodeEditorProps) {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Simple syntax highlighting
  const highlightSyntax = (text: string) => {
    return text
      .replace(/\b(const|let|var|function|return)\b/g, '<span class="syntax-keyword">$1</span>')
      .replace(/\b(name|role|location|focus|skills|interests|mindset|goal)\b/g, '<span class="syntax-property">$1</span>')
      .replace(/\b(Hamza Bouhouch|Web Developer|Morocco|HTML|CSS|JavaScript|PHP|MySQL|MVC Architecture|Creative UI|Performance|Clean code)\b/g, '<span class="syntax-string">$1</span>')
      .replace(/\b(Building modern, clean and interactive web experiences|Learn by building real projects|Become a strong full stack developer)\b/g, '<span class="syntax-string">$1</span>')
      .replace(/(["'])([^"']*?)\1/g, '<span class="syntax-string">$1$2$1</span>')
      .replace(/[{}[\];()]/g, '<span class="syntax-bracket">$&</span>');
  };

  // Direct typing function
  const startTyping = () => {
    setDisplayedCode('');
    setIsTyping(true);

    const fullCode = code;
    let currentIndex = 0;
    
    const typeNextCharacter = () => {
      if (currentIndex < fullCode.length) {
        const nextChars = fullCode.substring(0, currentIndex + 1);
        const currentChar = fullCode[currentIndex];
        
        // Natural typing speed with pauses
        let delay = 60 + Math.random() * 40;
        
        if (currentChar === '{' || currentChar === '}') {
          delay = 200 + Math.random() * 100;
        } else if (currentChar === ',') {
          delay = 100 + Math.random() * 50;
        } else if (currentChar === '\n') {
          delay = 150 + Math.random() * 50;
        } else if (currentChar === ';') {
          delay = 120 + Math.random() * 60;
        }
        
        setDisplayedCode(highlightSyntax(nextChars));
        currentIndex++;
        
        // Use requestIdleCallback for better performance
        requestIdleCallback(() => {
          setTimeout(typeNextCharacter, delay);
        });
      } else {
        setDisplayedCode(highlightSyntax(fullCode));
        setIsTyping(false);
      }
    };

    // Start typing in next idle period
    requestIdleCallback(typeNextCharacter);
  };

  // Start typing when component mounts with mobile optimization
  useEffect(() => {
    // Detect mobile and delay typing animation for better performance
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // On mobile, delay typing animation using requestIdleCallback
      requestIdleCallback(() => {
        setTimeout(startTyping, 1000); // Additional delay for mobile
      }, { timeout: 2000 });
    } else {
      // On desktop, start immediately
      startTyping();
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="code-editor">
      {/* Mac-style window controls */}
      <div className="editor-header">
        <div className="editor-dot red"></div>
        <div className="editor-dot yellow"></div>
        <div className="editor-dot green"></div>
        <div className="editor-label">JavaScript</div>
      </div>

      {/* Code content */}
      <div className="editor-content">
        <div 
          className="code-text"
          dangerouslySetInnerHTML={{ __html: displayedCode }}
        />
        {isTyping && <div className="cursor"></div>}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const developerCode = `const aboutMe = () => {
  return {
    name: "Hamza Bouhouch",
    role: "Web Developer",
    location: "Morocco",
    focus: "Building modern, clean and interactive web experiences",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "MySQL",
      "MVC Architecture"
    ],
    interests: [
      "Creative UI",
      "Performance",
      "Clean code"
    ],
    mindset: "Learn by building real projects",
    goal: "Become a strong full stack developer"
  };
};`;

  return (
    <section className="about-section py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Centered title with gradient */}
        <h2 className="about-title">
          About Me
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="about-text visible">
            <p className="text-lg leading-relaxed">
              I'm a passionate Full Stack Developer with over 5 years of experience in creating
              innovative web applications. My journey started with a curiosity about technology
              and has evolved into a career dedicated to building solutions that make a difference.
            </p>
            <p className="text-lg leading-relaxed">
              I specialize in modern web technologies, from responsive front-end designs to
              scalable back-end architectures. When I'm not coding, you can find me exploring
              new technologies, contributing to open-source projects, or sharing knowledge
              with the developer community.
            </p>
            <p className="text-lg leading-relaxed">
              Let's collaborate and bring your ideas to life!
            </p>
          </div>

          {/* Right: Code editor */}
          <div className="editor-wrapper visible">
            {/* SEO-friendly hidden content */}
            <div className="sr-only" aria-hidden="true">
              <pre>{developerCode}</pre>
            </div>
            {/* Visual typing animation */}
            <TypingCodeEditor code={developerCode} />
          </div>
        </div>
      </div>
    </section>
  );
}
