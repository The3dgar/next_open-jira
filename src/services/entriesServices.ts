import { Entry } from '@/interfaces';
import axios from 'axios';

const entriesApi = axios.create({
  baseURL: '/api',
});

export class EntriesServices {
  static getEntries = async () => {
    return entriesApi.get<Entry[]>('/entries');
  };

  static postEntry = async (description: string) => {
    return entriesApi.post<Entry>('/entries', { description });
  };

  static updateEntry = async ({ _id, description, status }: Entry) => {
    return entriesApi.put<Entry>('/entries/' + _id, { description, status });
  };

  static deleteEntry = async (_id: string) => {
    return entriesApi.delete<Entry>('/entries/' + _id);
  };
}
