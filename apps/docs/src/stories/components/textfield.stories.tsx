import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@suyank/ui/label";
import { TextField, type TextFieldInputProps } from "@suyank/ui/textfield";
import { Search } from "lucide-react";

const meta: Meta<TextFieldInputProps> = {
  title: "Components/TextField",
  component: TextField,
  args: {
    placeholder: "Type something",
    type: "text",
    disabled: false,
    "aria-invalid": false,
  },
  argTypes: {
    type: {
      control: {
        type: "select",
      },
      options: [
        "text",
        "email",
        "number",
        "password",
        "search",
        "tel",
        "url",
        "color",
      ] satisfies Required<TextFieldInputProps["type"]>[],
    },
  },
};

export default meta;

type Story = StoryObj<TextFieldInputProps>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithSlot: Story = {
  args: {
    placeholder: "Search",
  },
  render(props) {
    return (
      <TextField.Root>
        <TextField.Slot>
          <Search className="h-4 w-4" />
        </TextField.Slot>
        <TextField.Input {...props} />
      </TextField.Root>
    );
  },
};

export const WithLabel: Story = {
  args: {
    placeholder: "Search",
  },
  render(props) {
    return (
      <div className="space-y-2">
        <Label htmlFor="item">Search for a item</Label>
        <TextField.Root>
          <TextField.Slot>
            <Search className="h-4 w-4" />
          </TextField.Slot>
          <TextField.Input id="item" {...props} />
        </TextField.Root>
      </div>
    );
  },
};
