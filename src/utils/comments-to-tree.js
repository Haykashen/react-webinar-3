/**
* Преобразование списка комментариев в иерархию
 * @param {Array} data
 * @returns
 */
export const commentsToTree = (data) => {
    const roots = [];
    const map = data.reduce((acc, item) => {
      acc[item._id] = { ...item, children: [] };
      return acc;
    }, {});
  
    data.forEach(item => {
      if (item.parent._type === 'comment') {
        const parent = map[item.parent._id];
        if (parent) {
          parent.children.push(map[item._id]);
        }
      } else {
        roots.push(map[item._id]);
      }
    });
    return roots;
  };