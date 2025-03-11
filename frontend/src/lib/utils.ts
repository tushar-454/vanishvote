import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BASEURL } from '../components/constant';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  return fetch(`${BASEURL}${path}`, options).then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  });
}
