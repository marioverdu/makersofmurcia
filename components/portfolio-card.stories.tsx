import type { Meta, StoryObj } from '@storybook/react';
import { PortfolioCard } from './portfolio-card';

const meta: Meta<typeof PortfolioCard> = {
  title: 'Components/PortfolioCard',
  component: PortfolioCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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

export const WithLongTitle: Story = {
  args: {
    title: 'Este es un título muy largo que debería truncarse correctamente',
    imageUrl: '/placeholder.svg',
    link: '/proyecto-largo',
    date: '2024',
  },
};

export const WithoutDate: Story = {
  args: {
    title: 'Proyecto Sin Fecha',
    imageUrl: '/placeholder.svg',
    link: '/proyecto-sin-fecha',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Proyecto con Descripción',
    description: 'Esta es una descripción detallada del proyecto que se muestra en el hover',
    imageUrl: '/placeholder.svg',
    link: '/proyecto-con-descripcion',
    date: '2024',
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <PortfolioCard
        title="Proyecto 1"
        imageUrl="/placeholder.svg"
        link="/proyecto-1"
        date="2024"
      />
      <PortfolioCard
        title="Proyecto 2"
        imageUrl="/placeholder.svg"
        link="/proyecto-2"
        date="2023"
      />
      <PortfolioCard
        title="Proyecto 3"
        imageUrl="/placeholder.svg"
        link="/proyecto-3"
        date="2022"
      />
    </div>
  ),
};
