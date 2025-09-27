import React from 'react';
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig, Series } from 'remotion';
import { theme } from '../styles/theme';

export const CoreConcepts: React.FC = () => {
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
        Core Concepts
      </h2>

      <ConceptCarousel />
    </AbsoluteFill>
  );
};

const ConceptCarousel: React.FC = () => {
  return (
    <div
      style={{
        height: 'calc(100% - 140px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Series>
          <Series.Sequence durationInFrames={150}>
            <CenteredConceptCard
              title="useCurrentFrame()"
              description="Get the current frame number"
              code={`const frame = useCurrentFrame();\n// frame: 0, 1, 2, 3...\n\n<div>Frame: {frame}</div>`}
              demo={<FrameCounterDemo />}
            />
          </Series.Sequence>

          <Series.Sequence durationInFrames={150}>
            <CenteredConceptCard
              title="interpolate()"
              description="Animate values over time"
              code={`const opacity = interpolate(\n  frame,\n  [0, 30],  // input range\n  [0, 1],   // output range\n);`}
              demo={<InterpolateDemo />}
            />
          </Series.Sequence>

          <Series.Sequence durationInFrames={150}>
            <CenteredConceptCard
              title="Sequence"
              description="Control timing of elements"
              code={`<Sequence from={30}>\n  <div>Appears at frame 30</div>\n</Sequence>`}
              demo={<SequenceDemo />}
            />
          </Series.Sequence>

          <Series.Sequence durationInFrames={150}>
            <CenteredConceptCard
              title="spring()"
              description="Physics-based animations"
              code={`const scale = spring({\n  fps,\n  frame,\n  config: { damping: 200 }\n});`}
              demo={<SpringDemo />}
            />
          </Series.Sequence>

          <Series.Sequence durationInFrames={150}>
            <CenteredConceptCard
              title="AbsoluteFill"
              description="Layer elements on top"
              code={`<AbsoluteFill>\n  <Background />\n  <Content />\n</AbsoluteFill>`}
              demo={<LayersDemo />}
            />
          </Series.Sequence>
        </Series>
      </div>
    </div>
  );
};

const CenteredConceptCard: React.FC<ConceptCardProps> = (props) => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ConceptCard {...props} />
    </div>
  );
};

interface ConceptCardProps {
  title: string;
  description: string;
  code: string;
  demo: React.ReactNode;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ title, description, code, demo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: {
      damping: theme.animation.spring.damping,
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        gap: 30,
        width: '70%',
        height: '100%',
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            padding: 30,
            height: '100%',
            border: `1px solid ${theme.colors.primary}20`,
          }}
        >
          <h3
            style={{
              fontSize: 36,
              fontFamily: theme.fonts.title,
              color: theme.colors.primary,
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: 20,
              fontFamily: theme.fonts.body,
              color: theme.colors.textSecondary,
              marginBottom: 30,
              lineHeight: 1.4,
            }}
          >
            {description}
          </p>
          <pre
            style={{
              backgroundColor: theme.colors.background,
              borderRadius: theme.borderRadius.md,
              padding: 20,
              fontFamily: theme.fonts.code,
              fontSize: 16,
              lineHeight: 1.6,
              overflow: 'hidden',
            }}
          >
            {code.split('\n').map((line, index) => (
              <div key={index}>
                <SyntaxHighlightedLine text={line} />
              </div>
            ))}
          </pre>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            padding: 30,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${theme.colors.secondary}20`,
          }}
        >
          {demo}
        </div>
      </div>
    </div>
  );
};

const FrameCounterDemo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontFamily: theme.fonts.title,
          fontWeight: 700,
          background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {Math.floor(frame)}
      </div>
      <div
        style={{
          fontSize: 24,
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.body,
          marginTop: 20,
        }}
      >
        Current Frame
      </div>
    </div>
  );
};

const InterpolateDemo: React.FC = () => {
  const frame = useCurrentFrame();

  const boxX = interpolate(frame % 60, [0, 30, 60], [-100, 100, -100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const boxRotation = interpolate(frame % 60, [0, 60], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: 100,
        height: 100,
        background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
        borderRadius: theme.borderRadius.lg,
        transform: `translateX(${boxX}px) rotate(${boxRotation}deg)`,
      }}
    />
  );
};

const SequenceDemo: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        width: '100%',
      }}
    >
      <Sequence from={0} durationInFrames={50} layout="none">
        <DemoBox text="First (frame 0)" color={theme.colors.primary} />
      </Sequence>
      <Sequence from={30} durationInFrames={50} layout="none">
        <DemoBox text="Second (frame 30)" color={theme.colors.secondary} />
      </Sequence>
      <Sequence from={60} durationInFrames={50} layout="none">
        <DemoBox text="Third (frame 60)" color={theme.colors.accent} />
      </Sequence>
    </div>
  );
};

const DemoBox: React.FC<{ text: string; color: string }> = ({ text, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: {
      damping: theme.animation.spring.damping,
    },
  });

  return (
    <div
      style={{
        backgroundColor: color,
        padding: 20,
        borderRadius: theme.borderRadius.md,
        color: theme.colors.text,
        fontFamily: theme.fonts.body,
        fontSize: 18,
        transform: `scale(${scale})`,
        textAlign: 'center',
      }}
    >
      {text}
    </div>
  );
};

const SpringDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bounce = spring({
    fps,
    frame: frame % 60,
    config: {
      damping: 10,
      mass: 1,
      stiffness: 100,
    },
  });

  return (
    <div
      style={{
        width: 120,
        height: 120,
        background: `linear-gradient(135deg, ${theme.colors.warning}, ${theme.colors.success})`,
        borderRadius: '50%',
        transform: `scale(${0.5 + bounce * 0.5})`,
      }}
    />
  );
};

const LayersDemo: React.FC = () => {
  const frame = useCurrentFrame();

  const layer1Opacity = interpolate(frame % 90, [0, 30], [0.3, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const layer2Opacity = interpolate(frame % 90, [30, 60], [0.3, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const layer3Opacity = interpolate(frame % 90, [60, 90], [0.3, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'relative', width: 200, height: 200 }}>
      <div
        style={{
          position: 'absolute',
          width: 140,
          height: 140,
          backgroundColor: theme.colors.primary,
          borderRadius: theme.borderRadius.lg,
          top: 0,
          left: 0,
          opacity: layer1Opacity,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 140,
          height: 140,
          backgroundColor: theme.colors.secondary,
          borderRadius: theme.borderRadius.lg,
          top: 30,
          left: 30,
          opacity: layer2Opacity,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 140,
          height: 140,
          backgroundColor: theme.colors.accent,
          borderRadius: theme.borderRadius.lg,
          top: 60,
          left: 60,
          opacity: layer3Opacity,
        }}
      />
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
    if (['import', 'export', 'const', 'from', 'return', 'style', 'Math', 'min', 'frame', 'spring', 'interpolate'].includes(part)) {
      color = colors.keyword;
    }
    // String literals (quoted) - check for content within quotes
    else if ((part.startsWith('"') && part.endsWith('"')) ||
             (part.startsWith("'") && part.endsWith("'"))) {
      color = colors.string;
    }
    // String content (words like "center" that appear between quotes)
    else if (['center', 'white', 'Hello', 'Remotion!', 'First', 'Second', 'Third', 'Background', 'Content'].includes(part)) {
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
    else if (['useCurrentFrame', 'interpolate', 'AbsoluteFill', 'Sequence'].includes(part)) {
      color = colors.function;
    }
    // Variables and properties
    else if (['opacity', 'hue', 'fontSize', 'color', 'textAlign', 'textShadow'].includes(part)) {
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