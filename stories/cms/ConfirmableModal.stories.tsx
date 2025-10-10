import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ConfirmableModal } from '@/components/ui/ConfirmableModal';

const DemoForm = () => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Título</label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Título" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Contenido</label>
        <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Contenido" />
      </div>
    </div>
  );
}

const meta: Meta<typeof ConfirmableModal> = {
  title: 'CreationEditionPostModalConfirmationDialog',
  component: ConfirmableModal,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
  }
};

export default meta;
type Story = StoryObj<typeof ConfirmableModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Editar Post',
    onClose: () => {},
  },
  name: 'Default',
  render: (args) => (
    <div style={{ width: '100vw', height: '100vh', background: '#F7F8FC', padding: 24 }}>
      <ConfirmableModal {...args}>
        <DemoForm />
      </ConfirmableModal>
    </div>
  ),
};
