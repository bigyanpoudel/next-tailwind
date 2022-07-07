import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "../src/components/atom/Button/Button";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: "Button",
};

Primary.argTypes = {
  onClick: { action: "clicked" },
  btnType: {
    options: ["primary", "ghost", "secondary", "accent", "error", "success"],
    control: { type: "select", default: "primary" },
    description: "Button Types",
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Button Secondary",
  btnType: "secondary",
};

export const Large = Template.bind({});
Large.args = {
  children: "Button Large",
  btnType: "success",
};

export const Small = Template.bind({});
Small.args = {
  children: "Button",
  btnType: "error",
};
