import type { Meta, StoryObj } from '@storybook/react';
import { MusicPlayerTitle } from './music-player-title';

const meta: Meta<typeof MusicPlayerTitle> = {
  component: MusicPlayerTitle,
  title: 'Components/MusicPlayerTitle',
};
export default meta;
type Story = StoryObj<typeof MusicPlayerTitle>;

export const Primary: Story = {
  args: {
    name: 'Music name',
    artists: ['Artist name'],
  },
};
