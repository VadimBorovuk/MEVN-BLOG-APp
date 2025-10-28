export const useTagColor = (tagName: string) => {
  if (!tagName) return null;

  let res = {
    class: "",
    url: ""
  };

  switch (tagName) {
    case 'sport':
      res = {
        class: 'bg-blue-500',
        url: '/sportBack.jpg'
      };
      return res
    case 'education':
      res = {
        class: 'bg-pink-500',
        url: '/newsBack.png'
      };
      return res
    case 'food':
      res = {
        class: 'bg-purple-500',
        url: '/foodBack.jpg'
      };
      return res
    case 'news':
      res = {
        class: 'bg-blue-500',
        url: '/newsBack.png'
      };
      return res
    case 'technology':
      res = {
        class: 'bg-yellow-500',
        url: '/techBack.jpeg'
      };
      return res
    case 'lifestyle':
      res = {
        class: 'bg-amber-500',
        url: '/lifeBack.jpeg'
      };
      return res
    case 'health':
      res = {
        class: 'bg-green-500',
        url: '/healthBack.jpeg'
      };
      return res
    default:
      res = {
        class: 'bg-purple-500',
        url: '/newsBack.png'
      };
  }
  return res;
}


