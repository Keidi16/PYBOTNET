export function getMineType(
  signature: string,
): 'image/jpeg' | 'image/png' | undefined {
  switch (signature) {
    case '89504E47':
      return 'image/png';
    case 'FFD8FFE0':
    case 'FFD8FFE1':
    case 'FFD8FFE2':
    case 'FFD8FFDB':
      return 'image/jpeg';
    default:
      return undefined;
  }
}
