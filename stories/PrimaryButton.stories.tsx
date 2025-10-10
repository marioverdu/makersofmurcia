import type { Meta, StoryObj } from '@storybook/react';
import { PrimaryButton } from '../components/ui/primary-button';

const meta: Meta<typeof PrimaryButton> = {
  title: 'PrimaryButton',
  component: PrimaryButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'custom'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Primary Button',
    onClick: () => console.log('Button clicked!'),
  },
};
