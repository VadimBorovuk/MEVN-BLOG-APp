export const useTagColor = (tagName: string) => {
  if (!tagName) return null;

  let res;
  switch (tagName) {
    case 'sport':
      res = 'bg-blue-500';
      return res
    case 'education':
      res = 'bg-pink-500';
      return res
    case 'news':
      res = 'bg-red-500';
      return res
    default:
      res = 'bg-green-500';
  }
  return res;
}


