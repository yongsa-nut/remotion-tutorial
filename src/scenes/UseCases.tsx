import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../styles/theme';

export const UseCases: React.FC = () => {
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
        Real-World Use Cases
      </h2>

      <UseCaseCarousel />
    </AbsoluteFill>
  );
};

const UseCaseCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const useCases = [
    {
      title: 'Social Media Content',
      description: 'Generate personalized videos for Instagram, TikTok, and YouTube',
      examples: ['Stories', 'Reels', 'Shorts'],
      gradient: `linear-gradient(135deg, #9945FF, #1E40AF)`,
    },
    {
      title: 'Product Demos',
      description: 'Create dynamic product showcases and feature walkthroughs',
      examples: ['App demos', 'Feature tours', 'Tutorials'],
      gradient: `linear-gradient(135deg, #1E40AF, ${theme.colors.warning})`,
    },
    {
      title: 'Educational Videos',
      description: 'Build engaging educational content with animations',
      examples: ['Courses', 'Explainers', 'Tutorials'],
      gradient: `linear-gradient(135deg, ${theme.colors.warning}, ${theme.colors.primary})`,
    },
    {
      title: 'Data Storytelling',
      description: 'Transform data into compelling visual narratives',
      examples: ['Reports', 'Analytics', 'Insights'],
      gradient: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
    },
    {
      title: 'Personalized Videos',
      description: 'Generate videos at scale with dynamic content',
      examples: ['Greetings', 'Certificates', 'Awards'],
      gradient: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.accent})`,
    },
  ];

  const currentIndex = Math.floor(frame / 120) % useCases.length;
  const currentCase = useCases[currentIndex];
  const progress = (frame % 120) / 120;

  return (
    <div
      style={{
        height: 'calc(100% - 140px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      <div style={{ flex: 1 }}>
        <UseCaseCard {...currentCase} progress={progress} />
      </div>

      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
        }}
      >
        {useCases.map((_, index) => {
          const isActive = index === currentIndex;
          const scale = spring({
            fps,
            frame: isActive ? frame : 0,
            config: {
              damping: theme.animation.spring.damping,
            },
          });

          return (
            <div
              key={index}
              style={{
                width: isActive ? 40 : 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
                transform: `scale(${isActive ? scale : 1})`,
                transition: 'all 0.3s ease',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

interface UseCaseCardProps {
  title: string;
  description: string;
  examples: string[];
  gradient: string;
  progress: number;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({
  title,
  description,
  examples,
  gradient,
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame: frame % 120,
    config: {
      damping: theme.animation.spring.damping,
    },
  });

  const contentOpacity = interpolate(
    frame % 120,
    [0, 20, 100, 120],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        background: gradient,
        borderRadius: theme.borderRadius.xl,
        padding: 60,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transform: `scale(${scale})`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            backgroundColor: 'white',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <div style={{ opacity: contentOpacity }}>
        <h3
          style={{
            fontSize: 72,
            fontFamily: theme.fonts.title,
            color: 'white',
            marginBottom: 24,
            fontWeight: 800,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: 28,
            fontFamily: theme.fonts.body,
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: 40,
            lineHeight: 1.4,
            maxWidth: '80%',
          }}
        >
          {description}
        </p>

        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          {examples.map((example, index) => {
            const exampleScale = spring({
              fps,
              frame: (frame % 120) - 30 - index * 10,
              config: {
                damping: theme.animation.spring.damping,
              },
            });

            return (
              <div
                key={index}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '12px 24px',
                  borderRadius: theme.borderRadius.lg,
                  fontSize: 20,
                  fontFamily: theme.fonts.body,
                  color: 'white',
                  transform: `scale(${exampleScale})`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {example}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};