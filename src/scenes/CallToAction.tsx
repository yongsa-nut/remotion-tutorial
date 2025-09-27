import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../styles/theme';

export const CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: {
      damping: theme.animation.spring.damping,
    },
  });

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg,
          ${theme.colors.background} 0%,
          ${theme.colors.surface} 100%
        )`,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          transform: `scale(${scale})`,
          opacity: fadeIn,
        }}
      >
        <Logo />

        <h2
          style={{
            fontSize: 80,
            fontFamily: theme.fonts.title,
            fontWeight: 900,
            background: `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 40,
            letterSpacing: -2,
          }}
        >
          Start Creating Today!
        </h2>

        <Resources />

        <div
          style={{
            marginTop: 60,
            fontSize: 24,
            fontFamily: theme.fonts.body,
            color: theme.colors.textSecondary,
            fontWeight: 300,
          }}
        >
          Built with ❤️ using Remotion
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotation = interpolate(frame, [0, 150], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    fps,
    frame: frame - 10,
    config: {
      damping: 10,
      mass: 0.5,
      stiffness: 100,
    },
  });

  return (
    <div
      style={{
        width: 120,
        height: 120,
        margin: '0 auto 40px',
        transform: `scale(${scale})`,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.colors.primary} />
            <stop offset="100%" stopColor={theme.colors.secondary} />
          </linearGradient>
        </defs>

        <g transform={`rotate(${rotation} 50 50)`}>
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="3"
            opacity="0.3"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="3"
            opacity="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="3"
            opacity="0.7"
          />
          <circle
            cx="50"
            cy="50"
            r="15"
            fill="url(#logoGradient)"
          />
        </g>

        <text
          x="50"
          y="55"
          textAnchor="middle"
          fill="white"
          fontSize="20"
          fontWeight="bold"
          fontFamily={theme.fonts.title}
        >
          R
        </text>
      </svg>
    </div>
  );
};

const Resources: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resources = [
    {
      title: 'Documentation',
      url: 'remotion.dev',
      icon: '📚',
      delay: 30,
    },
    {
      title: 'GitHub',
      url: 'github.com/remotion-dev',
      icon: '🐙',
      delay: 50,
    },
    {
      title: 'Discord',
      url: 'discord.gg/remotion',
      icon: '💬',
      delay: 70,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        gap: 40,
        justifyContent: 'center',
        marginTop: 40,
      }}
    >
      {resources.map((resource, index) => {
        const scale = spring({
          fps,
          frame: frame - resource.delay,
          config: {
            damping: theme.animation.spring.damping,
          },
        });

        const opacity = interpolate(
          frame,
          [resource.delay, resource.delay + 20],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        const hoverScale = interpolate(
          Math.sin((frame + index * 20) * 0.05),
          [-1, 1],
          [1, 1.05],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        return (
          <div
            key={index}
            style={{
              transform: `scale(${scale * hoverScale})`,
              opacity,
            }}
          >
            <ResourceCard {...resource} />
          </div>
        );
      })}
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  url: string;
  icon: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, url, icon }) => {
  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: '30px 40px',
        border: `2px solid ${theme.colors.primary}20`,
        minWidth: 200,
      }}
    >
      <div
        style={{
          fontSize: 48,
          marginBottom: 16,
          textAlign: 'center',
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontSize: 24,
          fontFamily: theme.fonts.title,
          color: theme.colors.text,
          marginBottom: 8,
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: 16,
          fontFamily: theme.fonts.code,
          color: theme.colors.primary,
          textAlign: 'center',
        }}
      >
        {url}
      </p>
    </div>
  );
};