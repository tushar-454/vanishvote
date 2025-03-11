export const utcISOTime = (expireAtHours: number): string => {
  const currentUtcTime = new Date(new Date().toUTCString());
  currentUtcTime.setUTCHours(currentUtcTime.getUTCHours() + expireAtHours);
  return currentUtcTime.toISOString();
};

export const isPollExpired = (expireAt: string): boolean => {
  const currentUtcTime = new Date(new Date().toUTCString()).getTime();
  const pollExpireTime = new Date(expireAt).getTime();
  return currentUtcTime > pollExpireTime;
};
