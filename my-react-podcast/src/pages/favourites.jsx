export default function Favorites() {
  const my_Favourites = JSON.parse(localStorage.getItem("favorites"));
  const time = JSON.parse(localStorage.getItem("time"));
  const hadleRemove = (id) => {
    const newFavourites = my_Favourites.filter((fav) => fav !== id);
    localStorage.setItem("favorites", JSON.stringify(newFavourites));
  };

  return (
    <div>
      {my_Favourites.map((id) => (
        <div className="card card-body d-flex  mb-3 p-3" key={id}>
          {my_Favourites}
          <button onClick={() => hadleRemove(id)} className="btn btn-danger">
            Remove From Favourites
          </button>
          <p>{time}</p>
        </div>
      ))}
    </div>
  );
}
