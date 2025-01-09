import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Popup from "../popup/Popup";

export default {
  title: "Popup",
  component: Popup,
} as Meta;

const Template: Story = (args) => <Popup {...args} />;

export const Default = Template.bind({});
Default.args = {};
