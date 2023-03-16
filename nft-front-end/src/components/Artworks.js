import ethlogo from '../assets/ethlogo.png'
import { useAdulam } from '../Adulam'
import { BASE_URI } from '../Adulam'

const Artworks = () => {
  const { nfts } = useAdulam();
  const truncate = (str, num = 20) => {
    if (str.length > num) {
      return str.slice(0, num) + "..."
    } else {
      return str
    }
  }

  return (
    <div className="bg-[#131835] py-10">
      <div className="w-4/5 mx-auto">
        <h4 className="text-gradient uppercase text-2xl">Artworks</h4>
        <div className="flex flex-wrap justify-start items-center mt-4">
          {Array.isArray(nfts) &&
          nfts.map((nft) => (
            <div
              key={nft.id}
              className={`relative shadow-xl shadow-black p-3
                bg-white rounded-lg item w-64 h-64 object-contain
                bg-[url(${BASE_URI + nft.id}.webp)]
                bg-no-repeat bg-cover overflow-hidden mr-2 mb-2 cursor-pointer
                transition-all duration-75 delay-100 hover:shadow-[#bd255f]`}
              style={{backgroundImage: `url(${BASE_URI + nft.id}.webp)`}}
            >
              <div
                className="absolute bottom-0 left-0 right-0
                  flex flex-row justify-between items-center
                  label-gradient p-2 w-full text-white text-sm"
              >
                <p>
                  {nft.id}# {truncate(nft.title)}
                </p>
                <div className="flex justify-center items-center space-x-2">
                  <img
                    className="w-5 cursor-pointer"
                    src={ethlogo}
                    alt="Adulam Logo"
                  />
                  {nft.cost}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-center items-center mx-auto mt-4">
          <button
            className="shadow-xl shadow-black text-white
            bg-[#e32970] hover:bg-[#bd255f] p-2
            rounded-full cursor-pointer my-4"
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  )
}

export default Artworks