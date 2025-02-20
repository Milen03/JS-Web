import MovieListItem from "./MovieListItem.jsx";

export default function MovieList(props) {
    return (
        <>
            <h3>Movie List:</h3>
            <div>
                <MovieListItem movie={props.movies[0]} />
                <hr />
                <MovieListItem movie={props.movies[1]} />
                <hr />
                <MovieListItem movie={props.movies[2]} />
                <hr />
                <MovieListItem movie={props.movies[3]} />
                <hr />
                <MovieListItem movie={props.movies[4]} />
                <hr />
            </div>
        </>
    )
}