import Billboard from "@/components/Billboard"
import Navbar from "@/components/Navbar"
import MovieList from "@/components/MovieList"
import useCurrentUser from "@/hooks/useCurrentUser"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import useMovieList from "@/hooks/useMovieList"
import useFavorites from "@/hooks/useFavorites"
import InfoModal from "@/components/InfoModal"
import useInfoModal from "@/hooks/useInfoModal"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favoriteMovies = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal()
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={movies} title='Trending Now' />
        <MovieList data={favoriteMovies} title='My List' />
      </div>
    </>
  )
}
