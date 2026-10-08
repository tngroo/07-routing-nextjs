'use client'
import { useQuery, useQueryClient, useMutation, keepPreviousData } from "@tanstack/react-query";
import NoteList from '@/components/NoteList/NoteList'
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import { createNote, fetchNotes } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from './[id]/Notes.client.module.css'


export default function App(){

  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const queryClient = useQueryClient()
  const {data, isLoading, isError} = useQuery({
    queryKey: ["notes", page, search], 
    queryFn: ()=> fetchNotes({page, query: search}),
    placeholderData: keepPreviousData
  })
  const notes = data?.notes ?? [];
  const debouncedSearch = useDebouncedCallback((value) =>{
    setSearch(value);
    setPage(1)
  }, 300)

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['notes']})
    }
  })

  return (
  <div className={css.app}>
    <header className={css.toolbar}>
      <SearchBox
        value={inputValue}
        onSearch={(value) => {
          setInputValue(value);
          debouncedSearch(value);
          setPage(1);
        }}
      />

      <button
        className={css.button}
        onClick={() => setIsModalOpen(true)}
      >
        Create note +
      </button>
    </header>

    {isLoading && <p>Loading...</p>}

    {isError && <p>Error loading notes</p>}

    {!isLoading && !isError && (
      <>
        {notes.length > 0 ? (
          <NoteList
            notes={notes}/>
        ) : (
          <p>No notes found</p>
        )}

        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={data.totalPages}
            onChange={setPage}
          />
        )}
      </>
    )}

    {isModalOpen && (
      <Modal onClose={() => setIsModalOpen(false)}>
        <NoteForm
          onSubmit={(values) => {
            mutation.mutate(values, {
              onSuccess: () => {
                setIsModalOpen(false);
              },
            });
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    )}
  </div>
);}