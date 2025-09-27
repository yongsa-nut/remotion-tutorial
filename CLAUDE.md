# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This is a remotion based video app that uses React to render videos.

Full remotion docs can be found here: https://www.remotion.dev/docs/. Consult these docs often if you're uncertain.

## Project Initialization

If this directory needs to be initialized as a Remotion project:
```bash
npm create video@latest
```

For existing projects, install dependencies:
```bash
npm install
```

## Development Commands

When working with a Remotion project, use these common commands:

- `npm run dev` - Start the development server with preview
- `npm run build` - Build the project for production
- `npm run render` - Render the video output
- `npm run preview` - Start preview server only
- `npm run upgrade` - Upgrade Remotion to latest version
- `npm run compositions` - List all available compositions

### Rendering Commands

- `npx remotion render src/index.ts MyComp out.mp4` - Render a specific composition to MP4
- `npx remotion still src/index.ts MyComp out.png --frame=10` - Export a single frame as an image
- `npx remotion render src/index.ts MyComp out.gif` - Render as GIF (requires @remotion/gif)

## Project Structure

A typical Remotion project structure:
```
src/
  Root.tsx          # Main composition registry
  MyComp.tsx        # Individual video components
  components/       # Reusable components
public/             # Static assets (images, audio, etc.)
package.json        # Dependencies and scripts
remotion.config.ts  # Remotion configuration
```


The Root file is usually named "src/Root.tsx" and looks like this:

```tsx
import {Composition} from 'remotion';
import {MyComp} from './MyComp';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComp}
				durationInFrames={120}
				width={1920}
				height={1080}
				fps={30}
				defaultProps={{}}
			/>
		</>
	);
};
```

A `<Composition>` defines a video that can be rendered. It consists of a React "component", an "id", a "durationInFrames", a "width", a "height" and a frame rate "fps".
The default frame rate should be 30.
The default height should be 1080 and the default width should be 1920.
The default "id" should be "MyComp".
The "defaultProps" must be in the shape of the React props the "component" expects.

Inside a React "component", one can use the "useCurrentFrame()" hook to get the current frame number.
Frame numbers start at 0.

```tsx
export const MyComp: React.FC = () => {
	const frame = useCurrentFrame();
	return <div>Frame {frame}</div>;
};
```

# Component Rules

Inside a component, regular HTML and SVG tags can be returned.
There are special tags for video and audio.
Those special tags accept regular CSS styles.

If a video is included in the component it should use the "<OffthreadVideo>" tag.

```tsx
import {OffthreadVideo} from 'remotion';

export const MyComp: React.FC = () => {
	return (
		<div>
			<OffthreadVideo
				src="https://remotion.dev/bbb.mp4"
				style={{width: '100%'}}
			/>
		</div>
	);
};
```

OffthreadVideo has a "startFrom" prop that trims the left side of a video by a number of frames.
OffthreadVideo has a "endAt" prop that limits how long a video is shown.
OffthreadVideo has a "volume" prop that sets the volume of the video. It accepts values between 0 and 1.

If an non-animated image is included In the component it should use the "<Img>" tag.

```tsx
import {Img} from 'remotion';

export const MyComp: React.FC = () => {
	return <Img src="https://remotion.dev/logo.png" style={{width: '100%'}} />;
};
```

If an animated GIF is included, the "@remotion/gif" package should be installed and the "<Gif>" tag should be used.

```tsx
import {Gif} from '@remotion/gif';

export const MyComp: React.FC = () => {
	return (
		<Gif
			src="https://media.giphy.com/media/l0MYd5y8e1t0m/giphy.gif"
			style={{width: '100%'}}
		/>
	);
};
```

If audio is included, the "<Audio>" tag should be used.

```tsx
import {Audio} from 'remotion';

export const MyComp: React.FC = () => {
	return <Audio src="https://remotion.dev/audio.mp3" />;
};
```

Asset sources can be specified as either a Remote URL or an asset that is referenced from the "public/" folder of the project.
If an asset is referenced from the "public/" folder, it should be specified using the "staticFile" API from Remotion

```tsx
import {Audio, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
	return <Audio src={staticFile('audio.mp3')} />;
};
```

Audio has a "startFrom" prop that trims the left side of a audio by a number of frames.
Audio has a "endAt" prop that limits how long a audio is shown.
Audio has a "volume" prop that sets the volume of the audio. It accepts values between 0 and 1.

If two elements should be rendered on top of each other, they should be layered using the "AbsoluteFill" component from "remotion".

```tsx
import {AbsoluteFill} from 'remotion';

export const MyComp: React.FC = () => {
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{background: 'blue'}}>
				<div>This is in the back</div>
			</AbsoluteFill>
			<AbsoluteFill style={{background: 'blue'}}>
				<div>This is in front</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
```

Any Element can be wrapped in a "Sequence" component from "remotion" to place the element later in the video.

```tsx
import {Sequence} from 'remotion';

export const MyComp: React.FC = () => {
	return (
		<Sequence from={10} durationInFrames={20}>
			<div>This only appears after 10 frames</div>
		</Sequence>
	);
};
```

A Sequence has a "from" prop that specifies the frame number where the element should appear.
The "from" prop can be negative, in which case the Sequence will start immediately but cut off the first "from" frames.

A Sequence has a "durationInFrames" prop that specifies how long the element should appear.

If a child component of Sequence calls "useCurrentFrame()", the enumeration starts from the first frame the Sequence appears and starts at 0.

```tsx
import {Sequence} from 'remotion';

export const Child: React.FC = () => {
	const frame = useCurrentFrame();

	return <div>At frame 10, this should be 0: {frame}</div>;
};

export const MyComp: React.FC = () => {
	return (
		<Sequence from={10} durationInFrames={20}>
			<Child />
		</Sequence>
	);
};
```

For displaying multiple elements after another, the "Series" component from "remotion" can be used.

```tsx
import {Series} from 'remotion';

export const MyComp: React.FC = () => {
	return (
		<Series>
			<Series.Sequence durationInFrames={20}>
				<div>This only appears immediately</div>
			</Series.Sequence>
			<Series.Sequence durationInFrames={30}>
				<div>This only appears after 20 frames</div>
			</Series.Sequence>
			<Series.Sequence durationInFrames={30} offset={-8}>
				<div>This only appears after 42 frames</div>
			</Series.Sequence>
		</Series>
	);
};
```

The "Series.Sequence" component works like "Sequence", but has no "from" prop.
Instead, it has a "offset" prop shifts the start by a number of frames.

## Important: Sequence Layout Behavior

**CRITICAL**: By default, `<Sequence>` components use absolute positioning (AbsoluteFill), which means they will overlay each other instead of respecting CSS layouts like flexbox or grid.

**Problem**: When using Sequence inside flexbox containers, components will overlap instead of displaying side by side.

**Solution**: Add `layout="none"` to Sequence components when you need them to respect CSS layout:

```tsx
// ❌ WRONG - Will cause overlapping in flexbox
<div style={{ display: 'flex' }}>
  <div style={{ flex: 1 }}>
    <Sequence from={0} durationInFrames={100}>
      <LeftComponent />
    </Sequence>
  </div>
  <div style={{ flex: 1 }}>
    <Sequence from={10} durationInFrames={90}>
      <RightComponent />
    </Sequence>
  </div>
</div>

// ✅ CORRECT - Will display side by side
<div style={{ display: 'flex' }}>
  <div style={{ flex: 1 }}>
    <Sequence from={0} durationInFrames={100} layout="none">
      <LeftComponent />
    </Sequence>
  </div>
  <div style={{ flex: 1 }}>
    <Sequence from={10} durationInFrames={90} layout="none">
      <RightComponent />
    </Sequence>
  </div>
</div>
```

Use `layout="none"` when:
- Sequence is inside flexbox or grid containers
- You need custom positioning/layout control
- Working with @remotion/three (required)

## Code Demonstrations and Syntax Highlighting

When creating educational videos about code, consider implementing live code demonstrations with syntax highlighting for better visual appeal and learning outcomes.

### Syntax Highlighting Best Practices

**Use VS Code Dark+ Theme Colors** for familiar, professional appearance:

```tsx
const colors = {
  keyword: '#569CD6',     // Blue - keywords (import, export, const)
  string: '#CE9178',      // Orange - strings and quotes
  function: '#DCDCAA',    // Yellow - function names
  variable: '#9CDCFE',    // Light blue - variables and properties
  number: '#B5CEA8',      // Green - numbers
  punctuation: '#D4D4D4', // Light gray - brackets, operators
  default: '#D4D4D4'      // Light gray - default text
};
```

**Implementation Pattern**:
```tsx
const SyntaxHighlightedLine: React.FC<{ text: string }> = ({ text }) => {
  // Split on punctuation while preserving delimiters
  const parts = text.split(/(\s+|[{}(),;:.`"'<>]|\${|\+|\-|\*|\/|=)/);

  return (
    <span>
      {parts.map((part, index) => (
        <span key={index} style={{ color: getTokenColor(part) }}>
          {part}
        </span>
      ))}
    </span>
  );
};
```

### Live Code + Output Demonstrations

**Best Practice**: Show code AND its rendered output side-by-side with synchronized animations.

**Pattern**:
```tsx
// Code editor shows:
const opacity = interpolate(frame, [0, 30], [0, 1]);

// Output panel demonstrates:
<div style={{ opacity: /* actual animated opacity */ }}>
  Live Result
</div>
```

**Benefits**:
- Viewers see exact correlation between code and visual output
- Demonstrates Remotion concepts in real-time
- More engaging than static code examples
- Perfect for educational content

**Timing**: Start output animation after code typing completes (~100 frames delay)

## Centering Content in Remotion

**CRITICAL**: Centering content in Remotion requires specific patterns, especially when working with Series and Sequence components that may not inherit layout properties from their parents.

### Simple Centering with AbsoluteFill

For basic centering without complex timing:

```tsx
import { AbsoluteFill } from 'remotion';

export const CenteredContent = () => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>This content is centered</div>
    </AbsoluteFill>
  );
};
```

### Centering with Title + Content Layout Pattern

**Best Practice**: Follow the proven pattern used in working scenes:

```tsx
export const MyScene = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        padding: 80, // Consistent padding
      }}
    >
      {/* Title with marginBottom */}
      <h2
        style={{
          fontSize: 48,
          fontFamily: theme.fonts.title,
          color: theme.colors.text,
          marginBottom: 60, // Space for content below
          fontWeight: 700,
        }}
      >
        Scene Title
      </h2>

      {/* Content carousel/container */}
      <ContentCarousel />
    </AbsoluteFill>
  );
};

const ContentCarousel = () => {
  return (
    <div
      style={{
        height: 'calc(100% - 140px)', // Account for title + margins
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
        {/* Your content here */}
      </div>
    </div>
  );
};
```

### Centering Series/Sequence Content

**Problem**: Series and Sequence components don't always inherit centering from parent containers.

**Solution**: Create a centering wrapper component:

```tsx
const CenteredWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      {children}
    </div>
  );
};

// Usage in Series
<Series>
  <Series.Sequence durationInFrames={150}>
    <CenteredWrapper>
      <MyComponent />
    </CenteredWrapper>
  </Series.Sequence>
</Series>
```

### Key Centering Principles

1. **Use viewport dimensions** (`100vw`, `100vh`) for full-screen centering
2. **Layer centering properties** - Apply centering at multiple levels if needed
3. **Account for titles/headers** - Use `calc(100% - Xpx)` for remaining space
4. **Test with Series/Sequence** - These components may require special handling
5. **Follow working patterns** - Reference scenes that already center properly

### Common Centering Mistakes

❌ **DON'T**: Rely only on parent container centering for Series content
❌ **DON'T**: Use absolute positioning when flexbox centering is needed
❌ **DON'T**: Forget to account for title/header space in height calculations

✅ **DO**: Use proven patterns from working scenes
✅ **DO**: Create wrapper components for complex centering scenarios
✅ **DO**: Test centering with actual Series/Sequence timing

For displaying multiple elements after another another and having a transition inbetween, the "TransitionSeries" component from "@remotion/transitions" can be used.

```tsx
import {
	linearTiming,
	springTiming,
	TransitionSeries,
} from '@remotion/transitions';

import {fade} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';

export const MyComp: React.FC = () => {
	return (
		<TransitionSeries>
			<TransitionSeries.Sequence durationInFrames={60}>
				<Fill color="blue" />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				timing={springTiming({config: {damping: 200}})}
				presentation={fade()}
			/>
			<TransitionSeries.Sequence durationInFrames={60}>
				<Fill color="black" />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				timing={linearTiming({durationInFrames: 30})}
				presentation={wipe()}
			/>
			<TransitionSeries.Sequence durationInFrames={60}>
				<Fill color="white" />
			</TransitionSeries.Sequence>
		</TransitionSeries>
	);
};
```

"TransitionSeries.Sequence" works like "Series.Sequence" but has no "offset" prop.
The order of tags is important, "TransitionSeries.Transition" must be inbetween "TransitionSeries.Sequence" tags.

Remotion needs all of the React code to be deterministic. Therefore, it is forbidden to use the Math.random() API.
If randomness is requested, the "random()" function from "remotion" should be used and a static seed should be passed to it.
The random function returns a number between 0 and 1.

```tsx twoslash
import {random} from 'remotion';

export const MyComp: React.FC = () => {
	return <div>Random number: {random('my-seed')}</div>;
};
```

Remotion includes an interpolate() helper that can animate values over time.

```tsx
import {interpolate} from 'remotion';

export const MyComp: React.FC = () => {
	const frame = useCurrentFrame();
	const value = interpolate(frame, [0, 100], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div>
			Frame {frame}: {value}
		</div>
	);
};
```

The "interpolate()" function accepts a number and two arrays of numbers.
The first argument is the value to animate.
The first array is the input range, the second array is the output range.
The fourth argument is optional but code should add "extrapolateLeft: 'clamp'" and "extrapolateRight: 'clamp'" by default.
The function returns a number between the first and second array.

If the "fps", "durationInFrames", "height" or "width" of the composition are required, the "useVideoConfig()" hook from "remotion" should be used.

```tsx
import {useVideoConfig} from 'remotion';

export const MyComp: React.FC = () => {
	const {fps, durationInFrames, height, width} = useVideoConfig();
	return (
		<div>
			fps: {fps}
			durationInFrames: {durationInFrames}
			height: {height}
			width: {width}
		</div>
	);
};
```

Remotion includes a "spring()" helper that can animate values over time.
Below is the suggested default usage.

```tsx
import {spring} from 'remotion';

export const MyComp: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const value = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});
	return (
		<div>
			Frame {frame}: {value}
		</div>
	);
};
```

## Making UI components

When making UI components remember that UI components in Remotion are fundamentally different from normal interactive React components:

### Remotion Components vs Interactive React Components

**Remotion Components:**
- Are rendered frame-by-frame to create videos
- Cannot have user interactions (no onClick, onHover, etc.)
- Cannot use hooks like useState for interactivity
- Must be deterministic - same input always produces same output
- Animations are driven by the current frame number
- No event handlers or user input handling
- Focus on visual presentation and animation

**Normal React Components:**
- Handle user interactions and events
- Use state management (useState, useReducer, etc.)
- Can fetch data asynchronously
- Respond to user input in real-time
- Have lifecycle methods and effects that run over time

### Key Differences in Implementation

1. **State Management**
   - Remotion: Use `useCurrentFrame()` to drive animations
   - Normal React: Use `useState()` for interactive state

2. **Animations**
   - Remotion: Use `interpolate()` or `spring()` based on frame number
   - Normal React: Use CSS transitions, animation libraries, or requestAnimationFrame

3. **User Input**
   - Remotion: No user input - all props must be passed at composition time
   - Normal React: Handle clicks, form inputs, gestures, etc.

4. **Effects**
   - Remotion: Avoid useEffect - calculations should be pure based on frame
   - Normal React: Use useEffect for side effects and subscriptions

### Example Comparison

**Button in Normal React:**
```tsx
const Button = () => {
  const [clicked, setClicked] = useState(false);
  
  return (
    <button 
      onClick={() => setClicked(true)}
      style={{ background: clicked ? 'blue' : 'gray' }}
    >
      Click me!
    </button>
  );
};
```

**Animated Button in Remotion:**
```tsx
import { useCurrentFrame, interpolate } from 'remotion';

const AnimatedButton = () => {
  const frame = useCurrentFrame();
  
  // Animate scale over 30 frames
  const scale = interpolate(frame, [0, 30], [1, 1.2], {
    extrapolateRight: 'clamp'
  });
  
  return (
    <div style={{
      transform: `scale(${scale})`,
      background: 'blue',
      padding: '10px 20px',
      display: 'inline-block'
    }}>
      Click me!
    </div>
  );
};
```

### Best Practices for Remotion Components

1. **Always use frame-based animations** - Never rely on time-based effects
2. **Keep components pure** - No side effects or external data fetching
3. **Use Remotion's hooks** - useCurrentFrame(), useVideoConfig(), etc.
4. **Leverage Sequences** - For timing different elements
5. **No interactive elements** - Remove all event handlers from UI components
6. **Deterministic rendering** - Ensure consistent output for video rendering

## Common Patterns

### Text Animations

```tsx
import { useCurrentFrame, interpolate } from 'remotion';

export const AnimatedText = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <h1 style={{
      opacity,
      fontSize: '48px',
      fontWeight: 'bold',
      textAlign: 'center'
    }}>
      Animated Title
    </h1>
  );
};
```

### Data Visualization

```tsx
import { useCurrentFrame, interpolate, useVideoConfig } from 'remotion';

export const BarChart = ({ data }: { data: number[] }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
      {data.map((value, i) => {
        const barHeight = interpolate(
          frame,
          [i * 5, i * 5 + 20],
          [0, value * (height / 100)],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={i}
            style={{
              width: width / data.length,
              height: barHeight,
              backgroundColor: `hsl(${i * 30}, 70%, 50%)`,
              marginRight: 2,
            }}
          />
        );
      })}
    </div>
  );
};
```

## TypeScript Configuration

For TypeScript projects, ensure your tsconfig.json includes:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "module": "esnext",
    "moduleResolution": "node"
  }
}
```

## Performance Tips

- Use `OffthreadVideo` instead of `Video` for better performance with large video files
- Pre-calculate complex animations outside of render when possible
- Use `useMemo` for expensive calculations that depend on frame
- Keep asset sizes optimized - compress videos and images before importing
- Use `measureSpring()` to pre-calculate spring animation values

## Troubleshooting

- **Chrome not found**: Install Chrome or set `PUPPETEER_EXECUTABLE_PATH` environment variable
- **Out of memory errors**: Increase Node memory with `NODE_OPTIONS=--max-old-space-size=8192`
- **Slow rendering**: Use `--concurrency` flag to control parallel rendering (e.g., `--concurrency=1` for low-memory systems)
- **Audio sync issues**: Ensure consistent frame rates and use `startFrom` prop to align audio
- Mention that we are on window too. things can be weird with terminal on window