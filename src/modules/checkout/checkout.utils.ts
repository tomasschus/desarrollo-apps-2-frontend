export interface PaymentData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
}

export const formatCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(' ');
  } else {
    return v;
  }
};

export const isPaymentValid = (paymentData: PaymentData) => {
  return (
    paymentData.cardNumber.replace(/\s/g, '').length >= 13 &&
    paymentData.expiryMonth !== '' &&
    paymentData.expiryYear !== '' &&
    paymentData.cvv.length >= 3 &&
    paymentData.cardholderName.trim().length > 0
  );
};
