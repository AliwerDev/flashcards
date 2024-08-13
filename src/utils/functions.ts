export const makeKeysArrayFromPathname = (pathname: string): string[] => {
  const path = pathname.split("/").slice(2);
  if (path.length === 1) path.push("");
  return path;
};
