export const makeKeysArrayFromPathname = (pathname: string): string[] => {
  const path = pathname.split("/").slice(2);
  if (path.length === 3) path[2] = path.slice(1).join("/");
  return path;
};
