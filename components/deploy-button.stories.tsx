import type { Meta, StoryObj } from '@storybook/react';
import DeployButton from './deploy-button';

const meta: Meta<typeof DeployButton> = {
  title: 'Components/DeployButton',
  component: DeployButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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

export const WithCustomClass: Story = {
  args: {
    className: 'w-48 h-12 text-lg',
  },
};

export const WithCustomClickHandler: Story = {
  args: {
    onClick: async () => {
      console.log('Custom deploy handler called');
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('Deploy completed');
    },
  },
};

export const MultipleButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4">
        <DeployButton />
        <DeployButton className="w-48" />
      </div>
      <div className="flex gap-4">
        <DeployButton className="h-8 text-xs" />
        <DeployButton className="h-12 text-base" />
        <DeployButton className="h-16 text-lg" />
      </div>
    </div>
  ),
};

export const WithDifferentBackgrounds: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="bg-white p-4 rounded-lg">
        <DeployButton />
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <DeployButton />
      </div>
      <div className="bg-cyan-500 p-4 rounded-lg">
        <DeployButton />
      </div>
    </div>
  ),
};

// Story que muestra el comportamiento de estados
export const StateTransitions: Story = {
  render: () => {
    const handleDeploy = async () => {
      console.log('Starting deployment...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Deployment completed!');
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Deploy Button States</h3>
        <p className="text-sm text-gray-600">
          Click the button to see the state transitions: Initial → Loading → Deployed
        </p>
        <DeployButton onClick={handleDeploy} />
      </div>
    );
  },
};
