import Navbar from "../components/Navbar"


const Home = () => {

  const posts = [
  {
    id: 1,
    image: "https://picsum.photos/400/250",
  },
  {
    id: 2,
    image: "https://picsum.photos/400/550",
  },
  {
    id: 3,
    image: "https://picsum.photos/400/700",
  },
  {
    id: 4,
    image: "https://picsum.photos/400/350",
  },
  {
    id: 5,
    image: "https://picsum.photos/400/500",
  },
];

  return (
    <>
      <Navbar/>
      <div className="h-screen mt-22 ml-17 border-t-2 border-gray-300 px-9 py-4">
        <div className="flex gap-3 text-xl">
          <h4>All</h4>
          <h4>Your Posts</h4>
        </div>

        
      </div>
    </>
  )
}

export default Home
