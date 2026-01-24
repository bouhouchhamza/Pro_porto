'use client';

import { useState, useEffect, useRef } from 'react';

interface TypingCodeCardProps {
  code: string;
  className?: string;
}

export default function TypingCodeCard({ code, className = '' }: TypingCodeCardProps) {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.disconnect();
      }
    };
  }, [isVisible, hasAnimated]);

  // Syntax highlighting function
  const highlightSyntax = (text: string) => {
    return text
      .replace(/\b(const|let|var)\b/g, '<span style="color: #c678dd;">$1</span>')
      .replace(/\b(name|role|skills|experience|passion|expertise|projects|learning|contact)\b/g, '<span style="color: #e06c75;">$1</span>')
      .replace(/\b(Full Stack Developer|React|Node\.js|TypeScript|Next\.js|Three\.js|Frontend|Backend|Database|DevOps)\b/g, '<span style="color: #61afef;">$1</span>')
      .replace(/\b(5\+ years|Multiple production applications|Always exploring new technologies|Let\'s collaborate and bring your ideas to life!)\b/g, '<span style="color: #98c379;">$1</span>')
      .replace(/(["'])([^"']*?)\1/g, '<span style="color: #98c379;">$1$2$1</span>')
      .replace(/\d+/g, '<span style="color: #d19a66;">$&</span>')
      .replace(/[{}[\]]/g, '<span style="color: #abb2bf;">$&</span>');
  };

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    const fullCode = code;
    let currentIndex = 0;
    
    const typeCharacter = () => {
      if (currentIndex < fullCode.length) {
        const currentChar = fullCode[currentIndex];
        const nextChars = fullCode.substring(0, currentIndex + 1);
        
        // Add natural pauses
        let delay = 60 + Math.random() * 40; // Base typing speed
        
        if (currentChar === '{' || currentChar === '}') {
          delay = 300 + Math.random() * 200; // Pause for braces
        } else if (currentChar === ',') {
          delay = 150 + Math.random() * 100; // Pause for commas
        } else if (currentChar === '\n') {
          delay = 200 + Math.random() * 100; // Pause for line breaks
        }
        
        setDisplayedCode(highlightSyntax(nextChars));
        currentIndex++;
        
        setTimeout(typeCharacter, delay);
      } else {
        // Animation complete, keep cursor blinking
        setDisplayedCode(highlightSyntax(fullCode));
      }
    };

    typeCharacter();
  }, [isVisible, hasAnimated, code]);

  return (
    <div 
      ref={cardRef}
      className={`code-editor-card ${className}`}
      style={{
        background: 'rgba(30, 30, 46, 0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '8px',
        padding: '24px',
        fontFamily: '"Fira Code", "JetBrains Mono", Monaco, Menlo, "Courier New", monospace',
        fontSize: '14px',
        color: '#abb2bf',
        boxShadow: '0 16px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '320px'
      }}
    >
      {/* VS Code-style header */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '32px',
        background: 'rgba(30, 30, 46, 0.8)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '8px'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#ff5f56',
        }} />
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#ffbd2e',
        }} />
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#28ca42',
        }} />
        <div style={{
          marginLeft: 'auto',
          fontSize: '11px',
          color: '#8b92a7',
          fontFamily: 'system-ui, sans-serif'
        }}>
          JavaScript
        </div>
      </div>

      {/* Code content with proper spacing */}
      <div style={{
        marginTop: '40px',
        fontFamily: '"Fira Code", "JetBrains Mono", Monaco, Menlo, "Courier New", monospace',
        fontSize: '14px',
        lineHeight: '1.6',
        whiteSpace: 'pre',
        overflow: 'auto',
        position: 'relative'
      }}>
        <div 
          dangerouslySetInnerHTML={{ __html: displayedCode }}
          style={{
            color: '#abb2bf',
            minHeight: '240px'
          }}
        />
        {isVisible && hasAnimated && (
          <span 
            style={{
              display: 'inline-block',
              width: '2px',
              height: '20px',
              backgroundColor: '#61afef',
              animation: 'blink 1s infinite',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
              position: 'absolute'
            }}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
