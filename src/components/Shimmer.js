const Shimmer = () => {
  return (
    <div data-testid="shimmer">
      <div className="search-container p-5">
        <input
          type="text"
          className=" shadow w-72 outline outline-1 rounded focus:outline-blue-700 focus:outline-2 m-2 p-2"
          name=""
          id=""
          placeholder="Search"
        />
        <button className="search-btn p-2 m-2 bg-blue-300 rounded-md shadow hover:bg-blue-400">
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-center" data-testid="shimmer-card">
        {Array(10)
          .fill('')
          .map((e, index) => (
            <div
              key={index}
              className="h-80 w-56 p-2 m-2 shadow-md bg-purple-100 rounded-lg animate-pulse"
            ></div>
          ))}
      </div>
    </div>
  )
}

export default Shimmer;