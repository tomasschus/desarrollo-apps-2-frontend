import { Text, VStack } from '@chakra-ui/react';

interface TruncatedTextProps {
  text: string;
  maxLength?: number;
}

export const TruncatedText = ({
  text,
  maxLength = 100,
}: TruncatedTextProps) => {
  const isTruncated = text.length > maxLength;
  const displayText = isTruncated ? text.substring(0, maxLength) + '...' : text;

  return (
    <VStack align="start" gap={1}>
      <Text color="gray.700" lineHeight="1.7" fontSize="md" fontWeight="medium">
        {displayText}
      </Text>
      {isTruncated && (
        <Text
          as="span"
          color="brand.500"
          fontSize="sm"
          fontWeight="semibold"
          cursor="pointer"
          _hover={{ textDecoration: 'underline', color: 'brand.600' }}
          transition="all 0.2s"
        >
          Ver más
        </Text>
      )}
    </VStack>
  );
};
