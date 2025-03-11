'use client';
import { TypographySmall } from '../ui/typography';

const PollExpireTime = ({ expiresAt }: { expiresAt: string }) => {
  return <TypographySmall>Expire At: {new Date(expiresAt).toLocaleString()}</TypographySmall>;
};

export { PollExpireTime };
