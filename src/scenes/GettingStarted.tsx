import React from 'react';
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../styles/theme';

export const GettingStarted: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        padding: 80,
      }}
    >
      <h2
        style={{
          fontSize: 64,
          fontFamily: theme.fonts.title,
          color: theme.colors.text,
          marginBottom: 60,
          opacity: titleOpacity,
          fontWeight: 700,
        }}
      >
        Getting Started
      </h2>

      <div
        style={{
          display: 'flex',
          gap: 40,
          height: 'calc(100% - 140px)',
        }}
      >
        <div style={{ flex: 1 }}>
          <Sequence from={20} durationInFrames={580} layout="none">
            <Terminal />
          </Sequence>
        </div>

        <div style={{ flex: 1 }}>
          <Sequence from={40} durationInFrames={560} layout="none">
            <QuickStart />
          </Sequence>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Terminal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: {
      damping: theme.animation.spring.damping,
    },
  });

  const commands = [
    { text: '$ npm create video@latest my-video', delay: 0, typing: true },
    { text: '', delay: 60 },
    { text: '✨ Creating new Remotion project...', delay: 80, isOutput: true },
    { text: '📦 Installing dependencies...', delay: 100, isOutput: true },
    { text: '✅ Project created successfully!', delay: 120, isOutput: true },
    { text: '', delay: 140 },
    { text: '$ cd my-video', delay: 160, typing: true },
    { text: '$ npm run dev', delay: 200, typing: true },
    { text: '', delay: 240 },
    { text: '🚀 Starting development server...', delay: 260, isOutput: true },
    { text: '📺 Preview: http://localhost:3000', delay: 280, isOutput: true },
    { text: '✨ Ready for video creation!', delay: 300, isOutput: true },
  ];

  return (
    <div
      style={{
        backgroundColor: '#1E1E1E',
        borderRadius: theme.borderRadius.lg,
        padding: 30,
        height: '100%',
        transform: `scale(${scale})`,
        fontFamily: theme.fonts.code,
        fontSize: 18,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 20,
          gap: 8,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#FF5F57',
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#FFBD2E',
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#28CA42',
          }}
        />
        <span
          style={{
            marginLeft: 20,
            color: theme.colors.textSecondary,
            fontSize: 14,
          }}
        >
          Terminal
        </span>
      </div>

      <div style={{ lineHeight: 1.8 }}>
        {commands.map((cmd, index) => {
          const lineOpacity = interpolate(
            frame,
            [cmd.delay, cmd.delay + 10],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }
          );

          const text = cmd.typing ? (
            <TypewriterText text={cmd.text} startFrame={cmd.delay} />
          ) : (
            cmd.text
          );

          return (
            <div
              key={index}
              style={{
                opacity: lineOpacity,
                color: cmd.isOutput ? theme.colors.success : theme.colors.text,
                whiteSpace: 'pre',
              }}
            >
              {text || ' '}
            </div>
          );
        })}

        <Sequence from={320} durationInFrames={260} layout="none">
          <CursorBlink />
        </Sequence>
      </div>
    </div>
  );
};

const TypewriterText: React.FC<{ text: string; startFrame: number }> = ({ text, startFrame }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;
  const charsToShow = Math.floor(interpolate(
    relativeFrame,
    [0, 40],
    [0, text.length],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  ));

  return <>{text.slice(0, charsToShow)}</>;
};

const CursorBlink: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.floor(frame / 15) % 2;

  return (
    <span
      style={{
        color: theme.colors.text,
        opacity,
      }}
    >
      _
    </span>
  );
};

const QuickStart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    {
      number: '1',
      title: 'Create Project',
      description: 'Initialize a new Remotion project with templates',
      delay: 0,
    },
    {
      number: '2',
      title: 'Write Components',
      description: 'Build your video using React components',
      delay: 80,
    },
    {
      number: '3',
      title: 'Preview',
      description: 'See real-time preview in development',
      delay: 160,
    },
    {
      number: '4',
      title: 'Render',
      description: 'Export your video in various formats',
      delay: 240,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
        paddingTop: 40,
      }}
    >
      {steps.map((step, index) => {
        const scale = spring({
          fps,
          frame: frame - step.delay,
          config: {
            damping: theme.animation.spring.damping,
          },
        });

        const opacity = interpolate(
          frame,
          [step.delay, step.delay + 20],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        const lineProgress = interpolate(
          frame,
          [step.delay + 20, step.delay + 60],
          [0, 100],
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
                alignItems: 'center',
                gap: 24,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 28,
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                {step.number}
              </div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: 28,
                    fontFamily: theme.fonts.title,
                    color: theme.colors.text,
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 18,
                    fontFamily: theme.fonts.body,
                    color: theme.colors.textSecondary,
                    lineHeight: 1.4,
                  }}
                >
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div
                    style={{
                      height: 2,
                      backgroundColor: theme.colors.surface,
                      marginTop: 20,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${lineProgress}%`,
                        background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};