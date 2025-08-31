import type { Meta, StoryObj } from '@storybook/react';
import { PrimaryButton } from '../components/ui/primary-button';

const meta: Meta<typeof PrimaryButton> = {
  title: 'Components/PrimaryButton',
  component: PrimaryButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
    onClick: () => console.log('Small button clicked!'),
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
    onClick: () => console.log('Large button clicked!'),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Submit: Story = {
  args: {
    children: 'Submit Form',
    type: 'submit',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span>←</span> Volver Posts
      </>
    ),
    size: 'custom',
    className: 'h-9 text-base',
    onClick: () => console.log('Back button clicked!'),
  },
};

export const Loading: Story = {
  args: {
    children: 'Guardando...',
    disabled: true,
    size: 'md',
  },
};
