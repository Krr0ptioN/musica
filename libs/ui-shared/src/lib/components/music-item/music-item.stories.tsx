import type { Meta, StoryObj } from '@storybook/react';
import { MusicItem } from './music-item';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MusicItem> = {
  component: MusicItem,
  title: 'MusicItem',
};
export default meta;
type Story = StoryObj<typeof MusicItem>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MusicItem!/gi)).toBeTruthy();
  },
};
