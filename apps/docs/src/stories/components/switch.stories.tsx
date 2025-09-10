import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@suyanksaraswat/ui/label";
import { Switch, type SwitchProps } from "@suyanksaraswat/ui/switch";

const meta: Meta<SwitchProps> = {
  title: "Components/Switch",
  component: Switch,
  args: {
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<SwitchProps>;

export const Default: Story = {};

export const WithLabel: Story = {
  render(props) {
    return (
      <div className="flex items-center gap-2">
        <Switch {...props} id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
