import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { TitleScene } from './scenes/TitleScene';
import { WhatIsRemotion } from './scenes/WhatIsRemotion';
import { CoreConcepts } from './scenes/CoreConcepts';
import { FeatureShowcase } from './scenes/FeatureShowcase';
import { UseCases } from './scenes/UseCases';
import { GettingStarted } from './scenes/GettingStarted';
import { CallToAction } from './scenes/CallToAction';

export const RemotionTutorial: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0B0B0F' }}>
      <Series>
        <Series.Sequence durationInFrames={150}>
          <TitleScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={450}>
          <WhatIsRemotion />
        </Series.Sequence>

        <Series.Sequence durationInFrames={750}>
          <CoreConcepts />
        </Series.Sequence>

        <Series.Sequence durationInFrames={300}>
          <FeatureShowcase />
        </Series.Sequence>

        <Series.Sequence durationInFrames={600}>
          <UseCases />
        </Series.Sequence>

        <Series.Sequence durationInFrames={600}>
          <GettingStarted />
        </Series.Sequence>

        <Series.Sequence durationInFrames={150}>
          <CallToAction />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};