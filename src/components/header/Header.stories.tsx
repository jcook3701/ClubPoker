import React from "react";
import { Meta, StoryFn } from "@storybook/react/types-6-0";
import Header from "./Header";

export default {
  title: "Components/Header",
  component: Header,
} as Meta;

const Template: StoryFn = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};
