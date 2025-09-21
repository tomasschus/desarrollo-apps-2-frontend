import { Box, Card, Text, VStack, HStack } from "@chakra-ui/react";
import type { PaymentData } from "../checkout.utils";
import { formatCardNumber } from "../checkout.utils";

interface PaymentFormProps {
  paymentData: PaymentData;
  onPaymentDataChange: (field: keyof PaymentData, value: string) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentData,
  onPaymentDataChange,
}) => {
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    onPaymentDataChange('cardNumber', formatted);
  };

  const inputStyle = {
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  };

  const selectStyle = {
    ...inputStyle,
  };

  return (
    <Card.Root borderRadius="2xl" overflow="hidden">
      <Card.Body p={6}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          💳 Información de Pago
        </Text>

        <VStack gap={4}>
          <Box w="full">
            <Text fontSize="sm" fontWeight="semibold" mb={2}>
              Número de Tarjeta
            </Text>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
              autoComplete="cc-number"
              style={{
                ...inputStyle,
                fontFamily: 'monospace',
                fontSize: '16px',
              }}
              onFocus={(e) => e.target.style.borderColor = '#04BF8A'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </Box>

          <Box w="full">
            <Text fontSize="sm" fontWeight="semibold" mb={2}>
              Nombre del Titular
            </Text>
            <input
              type="text"
              placeholder="Como aparece en la tarjeta"
              value={paymentData.cardholderName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onPaymentDataChange('cardholderName', e.target.value)}
              autoComplete="cc-name"
              style={{
                ...inputStyle,
                textTransform: 'uppercase',
              }}
              onFocus={(e) => e.target.style.borderColor = '#04BF8A'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </Box>

          <HStack gap={3}>
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="semibold" mb={2}>
                Mes
              </Text>
              <select
                value={paymentData.expiryMonth}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onPaymentDataChange('expiryMonth', e.target.value)}
                autoComplete="cc-exp-month"
                style={selectStyle}
                onFocus={(e) => e.target.style.borderColor = '#04BF8A'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              >
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = (i + 1).toString().padStart(2, '0');
                  return (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  );
                })}
              </select>
            </Box>

            <Box flex={1}>
              <Text fontSize="sm" fontWeight="semibold" mb={2}>
                Año
              </Text>
              <select
                value={paymentData.expiryYear}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onPaymentDataChange('expiryYear', e.target.value)}
                autoComplete="cc-exp-year"
                style={selectStyle}
                onFocus={(e) => e.target.style.borderColor = '#04BF8A'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              >
                <option value="">YY</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = (new Date().getFullYear() + i).toString().slice(-2);
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </Box>

            <Box flex={1}>
              <Text fontSize="sm" fontWeight="semibold" mb={2}>
                CVV
              </Text>
              <input
                type="password"
                placeholder="123"
                value={paymentData.cvv}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onPaymentDataChange('cvv', e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                maxLength={4}
                autoComplete="cc-csc"
                style={{
                  ...inputStyle,
                  fontFamily: 'monospace',
                }}
                onFocus={(e) => e.target.style.borderColor = '#04BF8A'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </Box>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};