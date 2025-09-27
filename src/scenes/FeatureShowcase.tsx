import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../styles/theme';

export const FeatureShowcase: React.FC = () => {
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
          fontSize: 48,
          fontFamily: theme.fonts.title,
          color: theme.colors.text,
          marginBottom: 60,
          opacity: titleOpacity,
          fontWeight: 700,
        }}
      >
        Features & Capabilities
      </h2>

      <FeatureGrid />
    </AbsoluteFill>
  );
};

const FeatureGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const features = [
    {
      title: 'Data Visualization',
      icon: '📊',
      description: 'Create animated charts and graphs',
      color: theme.colors.primary,
      delay: 20,
    },
    {
      title: 'Text Animations',
      icon: '✨',
      description: 'Dynamic typography and effects',
      color: theme.colors.secondary,
      delay: 50,
    },
    {
      title: 'Video Integration',
      icon: '🎬',
      description: 'Combine and edit video clips',
      color: theme.colors.accent,
      delay: 80,
    },
    {
      title: 'Audio Support',
      icon: '🎵',
      description: 'Sync audio with visuals',
      color: theme.colors.success,
      delay: 110,
    },
    {
      title: 'Image Sequences',
      icon: '🖼️',
      description: 'Animate images and GIFs',
      color: theme.colors.warning,
      delay: 140,
    },
    {
      title: 'Transitions',
      icon: '🔀',
      description: 'Smooth scene transitions',
      color: theme.colors.error,
      delay: 170,
    },
    {
      title: 'Custom Shaders',
      icon: '🎨',
      description: 'WebGL and canvas effects',
      color: theme.colors.primary,
      delay: 200,
    },
    {
      title: 'Server Rendering',
      icon: '☁️',
      description: 'Render videos in the cloud',
      color: theme.colors.secondary,
      delay: 230,
    },
    {
      title: 'Lambda Support',
      icon: '⚡',
      description: 'Serverless video rendering',
      color: theme.colors.accent,
      delay: 260,
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
        height: 'calc(100% - 140px)',
      }}
    >
      {features.map((feature, index) => {
        const scale = spring({
          fps,
          frame: frame - feature.delay,
          config: {
            damping: theme.animation.spring.damping,
          },
        });

        const opacity = interpolate(
          frame,
          [feature.delay, feature.delay + 20],
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
            <FeatureCard {...feature} />
          </div>
        );
      })}
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  icon: string;
  description: string;
  color: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  icon,
  description,
  color,
}) => {
  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: 20,
        height: '100%',
        border: `2px solid ${color}`,
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 180,
      }}
    >
      {/* Background glow effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at center, ${color}15 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          fontSize: 40,
          marginBottom: 12,
          position: 'relative',
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontSize: 18,
          fontFamily: theme.fonts.title,
          color: theme.colors.text,
          marginBottom: 8,
          fontWeight: 600,
          position: 'relative',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: 14,
          fontFamily: theme.fonts.body,
          color: theme.colors.textSecondary,
          lineHeight: 1.4,
          position: 'relative',
        }}
      >
        {description}
      </p>
    </div>
  );
};