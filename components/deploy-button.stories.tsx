import type { Meta, StoryObj } from '@storybook/react';
import DeployButton from './deploy-button';

const meta: Meta<typeof DeployButton> = {
  title: 'DeployButton',
  component: DeployButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: {
      action: 'clicked',
    },
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
