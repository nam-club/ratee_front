import { Story } from "@storybook/vue3";
import Navbar from "../Navbar.vue";

export default {
    title: "components/Navbar",
    component: Navbar,
}

const Template: Story<typeof Navbar> = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Navbar },
    template: "<Navbar />",
});

export const NavbarControl = Template.bind({})
NavbarControl.args = {
  isVisibleTutorButton: true,
  colorMode: 'light',
}