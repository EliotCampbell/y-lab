export default function treeToComments(tree = [], callback, level = 0) {
  return tree.map(item => {
    const newItem = callback ? callback(item, level) : { ...item, level };
    if (item.children?.length) {
      newItem.children = treeToComments(item.children, callback, level + 1);
    }
    return newItem;
  });
}