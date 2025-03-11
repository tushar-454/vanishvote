import { Option } from '@/src/api/poll';
import { TypographyP, TypographySmall } from '../ui/typography';

type PollDetailsOptionProps = {
  option: Option;
  isResultHide: boolean;
  percentage: string;
  idx: number;
};
const PollDetailsOption = ({ option, isResultHide, percentage, idx }: PollDetailsOptionProps) => {
  return (
    <div>
      <TypographyP
        className={`relative mt-3 w-full rounded-md border border-gray-200 p-2 transition hover:bg-gray-100 ${isResultHide && 'cursor-pointer'}`}
      >
        {!isResultHide && (
          <span
            className={`absolute top-0 left-0 h-full rounded-md bg-black opacity-20`}
            style={{ width: `${percentage}%` }}
          ></span>
        )}
        <span className='flex items-center justify-between gap-5'>
          <span>
            {++idx}) {option.text}
          </span>
          {!isResultHide && <span>{percentage}%</span>}
        </span>
      </TypographyP>
      {!isResultHide && (
        <TypographySmall>
          {option.votes} vote{option.votes > 1 ? 's' : ''}
        </TypographySmall>
      )}
    </div>
  );
};

export { PollDetailsOption };
