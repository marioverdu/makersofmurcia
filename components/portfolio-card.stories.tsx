import type { Meta, StoryObj } from '@storybook/react';
import { PortfolioCard } from './portfolio-card';

const meta: Meta<typeof PortfolioCard> = {
  title: 'PortfolioCard',
  component: PortfolioCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
    imageUrl: {
      control: { type: 'text' },
    },
    link: {
      control: { type: 'text' },
    },
    date: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Proyecto Ejemplo',
    description: 'Descripción del proyecto',
    imageUrl: '/placeholder.svg',
    link: '/proyecto-ejemplo',
    date: '2024',
  },
};
