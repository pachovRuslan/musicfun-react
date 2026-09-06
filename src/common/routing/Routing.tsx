
import { PlaylistsPage } from "@/features/playlists/ui/PlaylistsPage/PlaylistsPage"
import { ProfilePage } from "@/features/playlists/ui/ProfilePage/ProfilePage"
import { TracksPage } from "@/features/playlists/ui/TracksPage/TracksPage"
import { Route, Routes } from "react-router"
import { MainPage } from "@/app/ui/MainPage/MainPage"
import { PageNotFound } from "../components"
import { Path } from "./Path"



export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.Playlists} element={<PlaylistsPage />} />
    <Route path={Path.Tracks} element={<TracksPage />} />
    <Route path={Path.Profile} element={<ProfilePage />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
)