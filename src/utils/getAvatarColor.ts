export const getAvatarColor = (name: string) => {
  const colors = [
    "#FFB6C1",
    "#FFCC99",
    "#99FF99",
    "#CCFFCC",
    "#CCCCFF",
    "#FF99CC",
  ];
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};
