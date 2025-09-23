export const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'centro cultural':
      return 'green';
    case 'museo':
      return 'purple';
    case 'teatro':
      return 'red';
    case 'biblioteca':
      return 'green';
    case 'galería':
      return 'orange';
    default:
      return 'gray';
  }
};
