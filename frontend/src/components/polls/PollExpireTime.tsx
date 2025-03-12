'use client';
import { TypographySmall } from '../ui/typography';

type PollExpireTimeProps = {
  expiresAt: string;
  label?: string;
};

const PollExpireTime = ({ expiresAt, label = 'Expire At' }: PollExpireTimeProps) => {
  return (
    <TypographySmall>
      {label}: {new Date(expiresAt).toLocaleString()}
    </TypographySmall>
  );
};

export { PollExpireTime };
