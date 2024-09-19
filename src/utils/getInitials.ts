export const getInitials = (name: string) => {
  const names = name.split(" ");
  const firstInitial = names[0].charAt(0).toUpperCase();
  const lastInitial = names.length > 1 ? names[1].charAt(0).toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
};
