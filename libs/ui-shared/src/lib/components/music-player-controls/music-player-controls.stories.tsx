import type { Meta, StoryObj } from '@storybook/react';
import { MusicPlayerControls } from './music-player-controls';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MusicPlayerControls> = {
  component: MusicPlayerControls,
  title: 'Components/MusicPlayerControls',
  argTypes: {
    musicPlayingToggle: { action: 'musicPlayingToggle executed!' },
    musicPlayingNext: { action: 'musicPlayingNext executed!' },
    musicPlayingPrev: { action: 'musicPlayingPrev executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof MusicPlayerControls>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
};
