import React from "react";
import { Meta, StoryFn } from "@storybook/react/types-6-0";
import Popup from "./Popup";

export default {
  title: "Popup",
  component: Popup,
} as Meta;

const Template: StoryFn = (args) => <Popup {...args} />;

export const Default = Template.bind({});
Default.args = {};
