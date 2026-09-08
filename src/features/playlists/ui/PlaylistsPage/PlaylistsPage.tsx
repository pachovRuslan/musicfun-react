import { useFetchPlaylistsQuery } from "../../api/playlistApi";
import { CreatePlaylistForm } from "./CreatePlaylistForm/CreatePlaylistForm";
import s from "./PlaylistsPage.module.css";
import { useState, type ChangeEvent } from "react";
import { useDebounceValue } from "@/common/hooks/useDebounceValue";
import { Pagination } from "@/common/components/Pagination/Pagination";
import { Playlist } from "../Playlist/Playlist";

export const PlaylistsPage = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)
  const debounceSearch = useDebounceValue(search)
  const { data, isLoading } = useFetchPlaylistsQuery({
    search: debounceSearch, pageNumber: currentPage,
    pageSize
  },  {refetchOnFocus: true});
  const changePageSizeHandler = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }
  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    setCurrentPage(1)
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input
        type="search"
        placeholder={'Search playlist by title'}
        onChange={searchPlaylistHandler}
      />
      <Playlist isPlaylistsLoading={isLoading} playlists={data?.data || []} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  );
};
