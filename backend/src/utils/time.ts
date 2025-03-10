export const utcISOTime = (expireAtHours: number): string => {
  const currentUtcTime = new Date(new Date().toUTCString());
  currentUtcTime.setUTCHours(currentUtcTime.getUTCHours() + expireAtHours);
  return currentUtcTime.toISOString();
};
