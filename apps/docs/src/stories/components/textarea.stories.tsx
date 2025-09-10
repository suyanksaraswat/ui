import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@suyanksaraswat/ui/label";
import { Textarea, type TextareaProps } from "@suyanksaraswat/ui/textarea";

const meta: Meta<TextareaProps> = {
  title: "Components/Textarea",
  component: Textarea,
  args: {
    disabled: false,
    placeholder: "Type your message here.",
  },
};

export default meta;

type Story = StoryObj<TextareaProps>;

export const Default: Story = {};

export const WithLabel: Story = {
  render(props) {
    return (
      <div className="space-y-2">
        <Label htmlFor="message">Your message</Label>
        <Textarea
          {...props}
          placeholder="Type your message here."
          id="message"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
