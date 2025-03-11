'use server';

import { BASEURL } from '../components/constant';

type Option = {
  _id: string;
  text: string;
  votes: number;
};

type Comment = {
  text: string;
  createdAt: Date;
};

type Reactions = {
  like: number;
  trending: number;
};

export type PollType = {
  _id: string;
  question: string;
  options: Option[];
  isYesNo: boolean;
  expiresAt: string;
  isResultHide: boolean;
  isPrivate: boolean;
  reactions: Reactions;
  comments: Comment[];
  createdAt: Date;
};

type GetPollsResponse = {
  success: boolean;
  message: string;
  data: Partial<PollType>[];
};

export const getPolls = async () => {
  const response = await fetch(`${BASEURL}/polls?select=expiresAt`);
  const data = await response.json();
  return data as GetPollsResponse;
};
