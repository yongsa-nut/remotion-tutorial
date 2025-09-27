import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../styles/theme';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated values
  const titleScale = spring({
    fps,
    frame,
    config: {
      damping: theme.animation.spring.damping,
    },
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleY = interpolate(frame, [15, 35], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const backgroundGradient = interpolate(frame, [0, 60], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg,
          ${theme.colors.background} 0%,
          ${theme.colors.surface} ${backgroundGradient}%
        )`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          transform: `scale(${titleScale})`,
        }}
      >
        <h1
          style={{
            fontSize: 120,
            fontFamily: theme.fonts.title,
            fontWeight: 900,
            background: `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: titleOpacity,
            marginBottom: 20,
            letterSpacing: -2,
          }}
        >
          What is Remotion?
        </h1>

        <p
          style={{
            fontSize: 36,
            fontFamily: theme.fonts.body,
            color: theme.colors.textSecondary,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            fontWeight: 300,
            letterSpacing: 1,
          }}
        >
          Create videos programmatically with React
        </p>
      </div>

      <AnimatedDots />
    </AbsoluteFill>
  );
};

const AnimatedDots: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 12,
      }}
    >
      {[0, 1, 2].map((i) => {
        const dotScale = spring({
          fps: 30,
          frame: frame - i * 5,
          config: {
            damping: 200,
          },
        });

        const dotOpacity = interpolate(
          frame,
          [i * 5, i * 5 + 10, 140, 150],
          [0, 1, 1, 0],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        return (
          <div
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: theme.colors.primary,
              opacity: dotOpacity,
              transform: `scale(${dotScale})`,
            }}
          />
        );
      })}
    </div>
  );
};