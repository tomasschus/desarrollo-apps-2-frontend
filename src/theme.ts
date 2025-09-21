import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from '@chakra-ui/react';

const buttonRecipe = defineRecipe({
  base: {
    borderRadius: 'md',
    fontWeight: 'semibold',
  },
  variants: {
    variant: {
      solid: {
        bg: 'brand.500',
        color: 'white',
        _hover: { bg: 'brand.600' },
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'brand.500',
        color: 'brand.500',
        _hover: { bg: 'brand.50' },
      },
      ghost: {
        color: 'brand.500',
        _hover: { bg: 'brand.100' },
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
});

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e6f7f2' },
          100: { value: '#ccefe5' },
          200: { value: '#99dfcb' },
          300: { value: '#66cfb1' },
          400: { value: '#33bf97' },
          500: { value: '#04BF8A' },
          600: { value: '#03A64A' },
          700: { value: '#026B73' },
          800: { value: '#025940' },
          900: { value: '#024059' },
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
