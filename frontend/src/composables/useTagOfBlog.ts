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
        url: '/newsBack.jpg'
      };
      return res
    case 'technology':
      res = {
        class: 'bg-yellow-500',
        url: '/techBack.jpg'
      };
      return res
    case 'lifestyle':
      res = {
        class: 'bg-amber-500',
        url: '/lifeBack.jpg'
      };
      return res
    case 'health':
      res = {
        class: 'bg-green-500',
        url: '/healthBack.jpg'
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


