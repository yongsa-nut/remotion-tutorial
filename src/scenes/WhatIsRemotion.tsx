import React from 'react';
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../styles/theme';

export const WhatIsRemotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        padding: 60,
      }}
    >
      <h2
        style={{
          fontSize: 48,
          fontFamily: theme.fonts.title,
          color: theme.colors.text,
          marginBottom: 40,
          opacity: titleOpacity,
          fontWeight: 700,
        }}
      >
        What is Remotion?
      </h2>

      <div
        style={{
          display: 'flex',
          gap: 60,
          height: 'calc(100% - 120px)',
        }}
      >
        <div style={{ flex: 1 }}>
          <Sequence from={20} durationInFrames={430} layout="none">
            <CodeEditorDemo />
          </Sequence>
        </div>

        <div style={{ flex: 1 }}>
          <Sequence from={30} durationInFrames={420} layout="none">
            <BulletPoints />
          </Sequence>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CodeEditorDemo: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const codeLines = [
    { text: 'import { useCurrentFrame, interpolate } from "remotion";', delay: 0 },
    { text: '', delay: 10 },
    { text: 'export const MyVideo = () => {', delay: 20 },
    { text: '  const frame = useCurrentFrame();', delay: 30 },
    { text: '  const opacity = interpolate(frame, [0, 30], [0, 1]);', delay: 40 },
    { text: '  const hue = (frame * 2) % 360;', delay: 50 },
    { text: '', delay: 60 },
    { text: '  return (', delay: 70 },
    { text: '    <div style={{', delay: 80 },
    { text: '      fontSize: 48 + Math.min(frame, 30),', delay: 90 },
    { text: '      opacity,', delay: 100 },
    { text: '      color: `hsl(${hue}, 70%, 80%)`,', delay: 110 },
    { text: '      textAlign: "center",', delay: 120 },
    { text: '      textShadow: `0 0 20px hsl(${hue}, 70%, 60%)`', delay: 130 },
    { text: '    }}>', delay: 140 },
    { text: '      Hello Remotion!', delay: 150 },
    { text: '    </div>', delay: 160 },
    { text: '  );', delay: 170 },
    { text: '};', delay: 180 },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Code Editor */}
      <div
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          padding: 24,
          flex: 3,
          opacity: fadeIn,
          border: `1px solid ${theme.colors.primary}20`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 16,
          gap: 8,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#FF5F57',
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#FFBD2E',
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#28CA42',
          }}
        />
        <span
          style={{
            marginLeft: 16,
            fontFamily: theme.fonts.code,
            fontSize: 12,
            color: theme.colors.textSecondary,
          }}
        >
          MyVideo.tsx
        </span>
      </div>

      <div
        style={{
          fontFamily: theme.fonts.code,
          fontSize: 20,
          lineHeight: 1.6,
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {codeLines.map((line, index) => {
          const lineOpacity = interpolate(
            frame,
            [line.delay, line.delay + 10],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }
          );

          return (
            <div
              key={index}
              style={{
                opacity: lineOpacity,
                whiteSpace: 'pre',
              }}
            >
              <SyntaxHighlightedLine text={line.text || ' '} />
            </div>
          );
        })}
      </div>
    </div>

    {/* Animated Output */}
    <div
      style={{
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.lg,
        padding: 24,
        flex: 2,
        border: `1px solid ${theme.colors.secondary}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CodeOutput />
    </div>
  </div>
  );
};

const CodeOutput: React.FC = () => {
  const frame = useCurrentFrame();

  // Start animation after code is mostly typed
  const startFrame = 100;
  const relativeFrame = Math.max(0, frame - startFrame);

  // Animate EXACTLY what the code shows
  const fontSize = 48 + Math.min(relativeFrame, 30); // Matches: fontSize: 48 + Math.min(frame, 30)
  const opacity = interpolate(relativeFrame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }); // Matches: interpolate(frame, [0, 30], [0, 1])
  const hue = (relativeFrame * 2) % 360; // Matches: const hue = (frame * 2) % 360;

  return (
    <div
      style={{
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {/* Output label */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 14,
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.body,
        }}
      >
        Output:
      </div>

      {/* Animated text that EXACTLY matches the code */}
      <div
        style={{
          fontSize: fontSize,
          opacity,
          color: `hsl(${hue}, 70%, 80%)`, // Matches the code exactly
          textAlign: "center", // Matches the code exactly
          textShadow: `0 0 20px hsl(${hue}, 70%, 60%)`, // Matches the code exactly
          fontFamily: theme.fonts.title, // Keep readable font
        }}
      >
        Hello Remotion!
      </div>

      {/* Frame counter to show the dynamic nature */}
      <div
        style={{
          marginTop: 20,
          fontSize: 16,
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.code,
          opacity: opacity * 0.8,
        }}
      >
        Frame: {Math.floor(relativeFrame)}
      </div>
    </div>
  );
};

const BulletPoints: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const points = [
    {
      title: 'Write videos in React',
      description: 'Use familiar React components and hooks',
      delay: 0,
    },
    {
      title: 'Programmatic generation',
      description: 'Generate videos dynamically with data',
      delay: 60,
    },
    {
      title: 'Frame-by-frame control',
      description: 'Precise animation timing and control',
      delay: 120,
    },
    {
      title: 'TypeScript support',
      description: 'Full type safety and IDE support',
      delay: 180,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        paddingTop: 20,
        height: '100%',
      }}
    >
      {points.map((point, index) => {
        const scale = spring({
          fps,
          frame: frame - point.delay,
          config: {
            damping: theme.animation.spring.damping,
          },
        });

        const opacity = interpolate(
          frame,
          [point.delay, point.delay + 20],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        return (
          <div
            key={index}
            style={{
              transform: `scale(${scale})`,
              opacity,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: theme.borderRadius.md,
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 35,
                }}
              >
                <span
                  style={{
                    color: theme.colors.text,
                    fontWeight: 700,
                    fontSize: 20,
                  }}
                >
                  ✓
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: 32,
                    fontFamily: theme.fonts.title,
                    color: theme.colors.text,
                    marginBottom: 10,
                    fontWeight: 600,
                  }}
                >
                  {point.title}
                </h3>
                <p
                  style={{
                    fontSize: 22,
                    fontFamily: theme.fonts.body,
                    color: theme.colors.textSecondary,
                    lineHeight: 1.4,
                  }}
                >
                  {point.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SyntaxHighlightedLine: React.FC<{ text: string }> = ({ text }) => {
  if (!text.trim()) return <span>{text}</span>;

  // VS Code Dark+ theme colors
  const colors = {
    keyword: '#569CD6',     // Blue - keywords like import, export, const, return
    string: '#CE9178',      // Orange - strings in quotes
    template: '#CE9178',    // Orange - template literals
    function: '#DCDCAA',    // Yellow - function names
    variable: '#9CDCFE',    // Light blue - variables
    number: '#B5CEA8',      // Green - numbers
    property: '#9CDCFE',    // Light blue - object properties
    operator: '#D4D4D4',    // Light gray - operators
    punctuation: '#D4D4D4', // Light gray - brackets, commas, etc
    comment: '#6A9955',     // Green - comments
    default: '#D4D4D4'      // Light gray - default text
  };

  // Enhanced word-by-word highlighting
  const parts = text.split(/(\s+|[{}(),;:.`"'<>]|\${|\+|\-|\*|\/|=)/).map((part, index, array) => {
    let color = colors.default;

    // Skip empty parts
    if (!part) return { text: part, color };

    // Keywords
    if (['import', 'export', 'const', 'from', 'return', 'style', 'Math', 'min'].includes(part)) {
      color = colors.keyword;
    }
    // String literals (quoted) - check for content within quotes
    else if ((part.startsWith('"') && part.endsWith('"')) ||
             (part.startsWith("'") && part.endsWith("'"))) {
      color = colors.string;
    }
    // String content (words like "remotion" that appear between quotes)
    else if (['remotion', 'center', 'white', 'Hello', 'Remotion!'].includes(part)) {
      color = colors.string;
    }
    // Template literals (backticks)
    else if (part.startsWith('`') && part.endsWith('`')) {
      color = colors.template;
    }
    // Template literal parts
    else if (part.includes('hsl') || part.includes('${') || part.includes('px')) {
      color = colors.template;
    }
    // Numbers
    else if (/^\d+$/.test(part)) {
      color = colors.number;
    }
    // Functions
    else if (['useCurrentFrame', 'interpolate'].includes(part)) {
      color = colors.function;
    }
    // Variables and properties
    else if (['frame', 'opacity', 'hue', 'fontSize', 'color', 'textAlign', 'textShadow'].includes(part)) {
      color = colors.variable;
    }
    // JSX/HTML elements
    else if (part === 'div') {
      color = colors.keyword;
    }
    // Quote marks (should be same color as strings)
    else if (['"', "'", '`'].includes(part)) {
      color = colors.string;
    }
    // Operators and punctuation
    else if (['+', '-', '*', '/', '=', '(', ')', '{', '}', '[', ']', ',', ';', ':', '.', '<', '>'].includes(part)) {
      color = colors.punctuation;
    }
    // Special operators
    else if (['%', '&&', '||'].includes(part)) {
      color = colors.operator;
    }

    return { text: part, color };
  }).filter(part => part.text !== ''); // Remove empty parts

  return (
    <span>
      {parts.map((part, index) => (
        <span key={index} style={{ color: part.color }}>
          {part.text}
        </span>
      ))}
    </span>
  );
};