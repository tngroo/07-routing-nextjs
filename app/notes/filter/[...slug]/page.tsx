import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type NoteProps = {
  params: Promise<{slug: string}>
}

export default async function NotesPage ({params}: NoteProps){
  
  const {slug} = await params;
  const tag = slug[0] ==="all" ? undefined : slug [0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""], 
    queryFn: () => fetchNotes({ page: 1, query: "" , }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag}/>
    </HydrationBoundary>
  );
}