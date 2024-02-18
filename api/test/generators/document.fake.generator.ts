import { faker } from '@faker-js/faker/locale/pt_BR';

const generateFakeCPF = ({
  withSeparators = false,
}: {
  withSeparators: boolean;
}) => {
  const cpfDigits = Array.from({ length: 9 }, () =>
    faker.number.int({ min: 0, max: 9 }),
  );

  const firstVerifierDigit = calculateVerifierDigit(cpfDigits);
  cpfDigits.push(firstVerifierDigit);

  const secondVerifierDigit = calculateVerifierDigit(cpfDigits);
  cpfDigits.push(secondVerifierDigit);

  if (withSeparators) {
    return `${cpfDigits.slice(0, 3).join('')}.${cpfDigits
      .slice(3, 6)
      .join('')}.${cpfDigits.slice(6, 9).join('')}-${cpfDigits
      .slice(9, 11)
      .join('')}`;
  }
  return cpfDigits.join('');
};

const calculateVerifierDigit = (cpfDigits: number[]) => {
  const sum = cpfDigits.reduce((acc, digit, index) => {
    const multiplier = cpfDigits.length + 1 - index;
    return acc + digit * multiplier;
  }, 0);

  const remainder = sum % 11;
  const verifierDigit = remainder < 2 ? 0 : 11 - remainder;

  return verifierDigit;
};

const generateFakeCNPJ = ({
  withSeparators = false,
}: {
  withSeparators: boolean;
}) => {
  const cnpjDigits = Array.from({ length: 12 }, () =>
    faker.number.int({ min: 0, max: 9 }),
  );

  const firstVerifierDigit = calculateCNPJVerifierDigit(cnpjDigits);
  cnpjDigits.push(firstVerifierDigit);

  const secondVerifierDigit = calculateCNPJVerifierDigit(cnpjDigits);
  cnpjDigits.push(secondVerifierDigit);

  const thirdVerifierDigit = calculateCNPJVerifierDigit(cnpjDigits);
  cnpjDigits.push(thirdVerifierDigit);

  if (withSeparators) {
    return `${cnpjDigits.slice(0, 2).join('')}.${cnpjDigits
      .slice(2, 5)
      .join('')}.${cnpjDigits.slice(5, 8).join('')}/${cnpjDigits
      .slice(8, 12)
      .join('')}-${cnpjDigits.slice(12, 14).join('')}`;
  }

  return cnpjDigits.join('');
};

const calculateCNPJVerifierDigit = (cnpjDigits: number[]) => {
  const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const sum = cnpjDigits.reduce((acc, digit, index) => {
    const multiplier = weights[index];
    return acc + digit * multiplier;
  }, 0);

  const remainder = sum % 11;
  const verifierDigit = remainder < 2 ? 0 : 11 - remainder;

  return verifierDigit;
};

const fakeDocument = {
  cpf: generateFakeCPF,
  cnpj: generateFakeCNPJ,
};

export default fakeDocument;
