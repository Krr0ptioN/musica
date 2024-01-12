import type { Meta, StoryObj } from '@storybook/react';
import { MusicPlayerProgressBar } from './music-player-progress-bar';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MusicPlayerProgressBar> = {
  component: MusicPlayerProgressBar,
  title: 'MusicPlayerProgressBar',
  argTypes: {
    handlerMusicSeek: { action: 'handlerMusicSeek executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof MusicPlayerProgressBar>;

export const Primary = {
  args: {
    duration: '4:20',
  },
};

export const Heading: Story = {
  args: {
    duration: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to MusicPlayerProgressBar!/gi)
    ).toBeTruthy();
  },
};
