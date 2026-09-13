import { useFetchPlaylistsQuery } from "../../api/playlistApi";
import { CreatePlaylistForm } from "./CreatePlaylistForm/CreatePlaylistForm";
import s from "./PlaylistsPage.module.css";
import { useState, type ChangeEvent } from "react";
import { useDebounceValue } from "@/common/hooks/useDebounceValue";
import { Pagination } from "@/common/components/Pagination/Pagination";
import { Playlist } from "../Playlist/Playlist";
import { Skeleton, Modal, EmptyState } from "@/common/components";
import { Icon } from "@/common/components/Icon/Icon";

type SortBy = 'newest' | 'oldest' | 'top-rated';

const sortOptions: { value: SortBy; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'top-rated', label: 'Top-rated first' },
];

export const PlaylistsPage = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [createOpen, setCreateOpen] = useState(false);
  const debounceSearch = useDebounceValue(search);

  const sortParams =
    sortBy === 'newest'
      ? { sortBy: 'addedAt' as const, sortDirection: 'desc' as const }
      : sortBy === 'oldest'
        ? { sortBy: 'addedAt' as const, sortDirection: 'asc' as const }
        : { sortBy: 'likesCount' as const, sortDirection: 'desc' as const };

  const { data, isLoading } = useFetchPlaylistsQuery(
    {
      search: debounceSearch,
      pageNumber: currentPage,
      pageSize,
      ...sortParams,
    },
    { refetchOnFocus: true }
  );

  const changePageSizeHandler = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setCurrentPage(1);
  };

  return (
    <div className={s.container}>
      {/* ----- Header ----- */}
      <div className={s.header}>
        <div className={s.headerLeft}>
          <h1 className={s.title}>All Playlists</h1>
          <p className={s.subtitle}>
            {data?.meta.totalCount ?? 0} playlists available
          </p>
        </div>
        <button
          className={s.createBtn}
          onClick={() => setCreateOpen(true)}
          type="button"
        >
          <Icon name="plus-sm" size={16} />
          Create Playlist
        </button>
      </div>

      {/* ----- Toolbar ----- */}
      <div className={s.toolbar}>
        <div className={s.search}>
          <Icon name="search" size={16} className={s.searchIcon} />
          <input
            type="search"
            className={s.searchInput}
            placeholder="Search playlist by title"
            value={search}
            onChange={searchPlaylistHandler}
          />
        </div>

        <label className={s.sort}>
          <span className={s.sortLabel}>Sort By:</span>
          <div className={s.sortSelectWrap}>
            <select
              className={s.sortSelect}
              value={sortBy}
              onChange={e => {
                setSortBy(e.target.value as SortBy);
                setCurrentPage(1);
              }}
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <Icon name="chevron-down" size={14} className={s.sortChevron} />
          </div>
        </label>
      </div>

      {/* ----- Content ----- */}
      {isLoading ? (
        <div className={s.grid}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div className={s.skeletonCard} key={i}>
              <Skeleton height={160} radius={8} />
              <Skeleton height={16} width="70%" style={{ marginTop: 12 }} />
              <Skeleton height={12} width="50%" style={{ marginTop: 6 }} />
            </div>
          ))}
        </div>
      ) : (data?.data?.length ?? 0) === 0 ? (
        <EmptyState
          title="No playlists found"
          subtitle="Try adjusting your search, or be the first to create a playlist."
          icon="plus"
        />
      ) : (
        <>
          <Playlist
            isPlaylistsLoading={isLoading}
            playlists={data?.data || []}
          />
        </>
      )}

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />

      {/* ----- Create modal ----- */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)}>
        <CreatePlaylistForm onSuccess={() => setCreateOpen(false)} embedded />
      </Modal>
    </div>
  );
};