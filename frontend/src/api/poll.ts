'use server';

import { revalidateTag } from 'next/cache';
import { BASEURL } from '../components/constant';
import { PollBody } from '../components/polls/CreatePollModal';

export type Option = {
  _id: string;
  text: string;
  votes: number;
};

export type Comment = {
  _id?: string;
  text: string;
  createdAt: Date;
};

export type Reactions = {
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

type CreatePollResponse = {
  success: boolean;
  message: string;
  data: PollType;
};

type GetPollsResponse = {
  success: boolean;
  message: string;
  data: Partial<PollType>[];
};

type GetPollResponse = {
  success: boolean;
  message: string;
  data: PollType;
};

type PollVoteResponse = {
  success: boolean;
  message: string;
};

export const createPoll = async (pollBody: PollBody) => {
  const response = await fetch(`${BASEURL}/polls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pollBody),
  });
  const data = await response.json();
  return data as CreatePollResponse;
};

export const getPolls = async () => {
  const response = await fetch(`${BASEURL}/polls?select=expiresAt,isResultHide`, {
    next: {
      revalidate: 3600,
      tags: ['polls'],
    },
  });
  const data = await response.json();
  return data as GetPollsResponse;
};

export const getPollById = async (id: string) => {
  const response = await fetch(`${BASEURL}/polls/${id}`, {
    next: {
      revalidate: 3600,
      tags: ['poll'],
    },
  });
  const data = await response.json();
  return data as GetPollResponse;
};

export const pollReaction = async (id: string, reaction: 'like' | 'trending') => {
  const response = await fetch(`${BASEURL}/polls/${id}/reaction`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reaction }),
  });
  const data = await response.json();
  return data as GetPollResponse;
};

export const pollVote = async (id: string, optionText: string) => {
  const response = await fetch(`${BASEURL}/polls/${id}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ optionText }),
  });
  const data = await response.json();
  return data as PollVoteResponse;
};

export const pollComment = async (id: string, text: string) => {
  const response = await fetch(`${BASEURL}/polls/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  const data = await response.json();
  return data as GetPollResponse;
};

export const revalidatePolls = async () => {
  revalidateTag('polls');
};

export const revalidatePoll = async () => {
  revalidateTag('poll');
};
