import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

const buttonRecipe = defineRecipe({
  base: {
    borderRadius: "md",
    fontWeight: "semibold",
  },
  variants: {
    variant: {
      solid: {
        bg: "brand.500",
        color: "white",
        _hover: { bg: "brand.600" },
      },
      outline: {
        borderWidth: "1px",
        borderColor: "brand.500",
        color: "brand.500",
        _hover: { bg: "brand.50" },
      },
      ghost: {
        color: "brand.500",
        _hover: { bg: "brand.100" },
      },
    },
  },
  defaultVariants: {
    variant: "solid",
  },
});

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#fff7ed" },
          100: { value: "#ffedd5" },
          200: { value: "#fed7aa" },
          300: { value: "#fdba74" },
          400: { value: "#fb923c" },
          500: { value: "#f97316" },
          600: { value: "#ea580c" },
          700: { value: "#c2410c" },
          800: { value: "#9a3412" },
          900: { value: "#7c2d12" },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
