import type { Meta, StoryObj } from '@storybook/react';
import { MusicPlayerCover } from './music-player-cover';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MusicPlayerCover> = {
  component: MusicPlayerCover,
  title: 'Components/MusicPlayerCover',
};
export default meta;
type Story = StoryObj<typeof MusicPlayerCover>;

export const Primary = {
  args: {
    alt: '',
  },
};

export const Heading: Story = {
  args: {
    alt: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MusicPlayerCover!/gi)).toBeTruthy();
  },
};
