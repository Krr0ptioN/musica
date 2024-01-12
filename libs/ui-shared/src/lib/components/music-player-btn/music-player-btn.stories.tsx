import type { Meta, StoryObj } from '@storybook/react';
import { MusicPlayerBtn } from './music-player-btn';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MusicPlayerBtn> = {
  component: MusicPlayerBtn,
  title: 'Components/MusicPlayerBtn',
  argTypes: {
    handlerOnClick: { action: 'handlerOnClick executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof MusicPlayerBtn>;

export const Primary = {
  args: {
    title: '',
    className: '',
  },
};

export const Heading: Story = {
  args: {
    title: '',
    className: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MusicPlayerBtn!/gi)).toBeTruthy();
  },
};
