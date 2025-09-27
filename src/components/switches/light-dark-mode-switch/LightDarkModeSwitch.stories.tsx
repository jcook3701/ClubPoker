import React from "react";
import { Meta, StoryFn } from "@storybook/react/types-6-0";
import LightDarkModeSwitch from "./LightDarkModeSwitch";

export default {
  title: "Components/LightDarkModeSwitch",
  component: LightDarkModeSwitch,
} as Meta;

const Template: StoryFn = (args) => <LightDarkModeSwitch {...args} />;

export const Default = Template.bind({});
Default.args = {};
