import "../styles/globals.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme",
    defaultValue: "default",
    toolbar: {
      icon: "lightning",
      items: ["default", "dark", "luxury", "cupcake"],
      showName: true,
    },
  },
};
