export default function MovieListItem(props) {
    return (
        <>
            <article>
                <header>
                <h4>{props.movie.title}</h4>
                </header>
                <main>
                    <p>{props.movie.plot}</p>
                    <img src={props.movie.posterUrl} alt={props.movie.title} />
                </main>
                <footer>
                <p>Director: <strong>{props.movie.director}</strong>, year: {props.movie.year}</p>
            </footer>
            </article>
        </>
    )
}