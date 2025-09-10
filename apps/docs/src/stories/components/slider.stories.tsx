import type { Meta, StoryObj } from "@storybook/react";
import { Slider, type SliderProps } from "@suyank/ui/slider";

const meta: Meta<SliderProps> = {
  title: "Components/Slider",
  component: Slider,
  args: {
    step: 1,
    max: 100,
    defaultValue: [0],
  },
};

export default meta;

type Story = StoryObj<SliderProps>;

export const Default: Story = {};
