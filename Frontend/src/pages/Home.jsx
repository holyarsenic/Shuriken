import Navbar from "../components/Navbar"
import { HiDotsHorizontal } from "react-icons/hi";


const Home = () => {

  const posts = [
  {
    id: 1,
    image: "https://picsum.photos/400/250",
    caption: "Desktop"
  },
  {
    id: 2,
    image: "https://picsum.photos/400/550",
    caption: "HEhe"
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
   {
    id: 5,
    image: "https://picsum.photos/400/500",
  },
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
   {
    id: 5,
    image: "https://picsum.photos/400/500",
  },
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
   {
    id: 5,
    image: "https://picsum.photos/400/500",
  }
  
];

  return (
    <>
      <Navbar/>
      <div className="h-full mt-22 ml-17 px-4 py-4">
        <div className="flex gap-3 text-xl ml-5">
          <h4 className="px-4 py-2 bg-[#111] text-white rounded-3xl">All</h4>
          <h4 className="px-4 py-2 bg-[#111] text-white rounded-3xl">Your Posts</h4>
        </div>

        <div className="h-full w-full columns-2 sm:columns-2 md:columns-3 lg:columns-5 xl:columns-6 gap-1 sm:gap-1 md:gap-2 lg:gap-4 xl:gap-4 pt-4 object-contain">
          {posts.map((post) => (
          <div key={post.id} className="mb-4 overflow-hidden rounded-xl">
            <img
              src={post.image}
              alt={post.caption}
              className="w-full mb-2 object-cover rounded-xl"
            />
            <div className="px-1 flex justify-between w-full">
              <p className="text-md font-medium">{post.caption}</p>
              <HiDotsHorizontal/>
            </div>
          </div>
        ))}

        </div>

        
      </div>
    </>
  )
}

export default Home
