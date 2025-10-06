import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import TimezoneSelect from "./TimezoneSelect";

export default {
  title: "Components/TimezoneSelect",
  component: TimezoneSelect,
} as Meta;

const Template: StoryFn = (args) => <TimezoneSelect {...args} />;

export const Default = Template.bind({});
Default.args = {};
