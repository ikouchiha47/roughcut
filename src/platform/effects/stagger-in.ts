import { interpolate, spring } from 'remotion';
import { registerEffect, EffectOutput } from '../core/effect-registry';
import { Effect } from '../types';

type Params = Extract<Effect, { type: 'core:stagger-in' }>;

registerEffect('core:stagger-in', (localFrame, fps, params: Params): EffectOutput => {
  const delayFrames    = Math.round((params.delay ?? 0) * fps);
  const durationFrames = Math.round((params.duration ?? 0.3) * fps);
  const enter          = params.enter ?? 'fade';
  const adjusted       = localFrame - delayFrames;

  if (adjusted < 0) return { contentStyle: { opacity: 0 } };

  const progress = spring({
    frame: adjusted,
    fps,
    config: { damping: 18, stiffness: 280 },
    durationInFrames: durationFrames,
  });

  if (enter === 'fade') {
    const opacity = interpolate(progress, [0, 1], [0, 1]);
    return { contentStyle: { opacity } };
  }

  if (enter === 'scale') {
    const scale   = interpolate(progress, [0, 1], [0.4, 1]);
    const opacity = interpolate(progress, [0, 0.3, 1], [0, 1, 1]);
    return { contentStyle: { transform: `scale(${scale})`, opacity } };
  }

  if (enter === 'slide-up') {
    const ty      = interpolate(progress, [0, 1], [24, 0]);
    const opacity = interpolate(progress, [0, 0.3, 1], [0, 1, 1]);
    return { contentStyle: { transform: `translateY(${ty}px)`, opacity } };
  }

  if (enter === 'slide-down') {
    const ty      = interpolate(progress, [0, 1], [-24, 0]);
    const opacity = interpolate(progress, [0, 0.3, 1], [0, 1, 1]);
    return { contentStyle: { transform: `translateY(${ty}px)`, opacity } };
  }

  return {};
});
