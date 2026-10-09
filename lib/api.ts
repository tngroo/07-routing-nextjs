import { Note } from "@/types/note";
import axios from "axios";

interface FetchNotesParams{
query: string;
page: number;
tag?: string;
}

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
    
}


export const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
}
})

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const { query, page, tag } = params;

  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      search: query,
      page,
      perPage: 12,
      sortBy: "created",
      tag,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
}

export interface CreateNoteParams {
    title: string;
    content: string;
    tag: string
}

export async function createNote(params: CreateNoteParams): Promise<Note> {
  const { data } = await api.post<Note>("/notes", params, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return data;
}

export async function fetchNoteById (id: string): Promise<Note> {
  const {data} = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    }
  })
  return data
}