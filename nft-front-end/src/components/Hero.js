import avatar from '../assets/owner.jpg';
import github from '../assets/github_icon.png';
import facebook from '../assets/facebook_icon.png';
import twitter from '../assets/twitter_icon.png';
import linkedIn from '../assets/linkedIn_icon.png';
import medium from '../assets/medium_icon.png';
import { useDispatch } from '../GlobalState';
import { useAdulam, BASE_URI } from '../Adulam';

const Hero = () => {
  const { maxSupply, nfts, connectedAccount, payForArt, dispatch } = useAdulam();
  const mint = async () => {
    dispatch({ type: 'SET_LOADING', payload: { show: true, msg: 'Retrieving IPFS data...' } });
    const nextTokenIndex = Number(nfts.length + 1)
    fetch(`https://cors-anywhere.herokuapp.com/${BASE_URI + nextTokenIndex}.json`)
    // , {
    //   mode: 'no-cors', // Add this line to disable CORS
    // })
    .then((data) => data.json())
    .then((res) => {
      dispatch({ type: 'SET_LOADING_MSG', payload: 'Initializing transaction...' });
      payForArt({ ...res, buyer: connectedAccount }).then((result) => {
        if (result) {
          dispatch({ type: 'SET_LOADING', payload: { show: false, msg: '' } });
          dispatch({ type: 'SET_ALERT', payload: { msg: 'Minting Successful...', color: 'green' } });
          window.location.reload();
        }
      });
    })
    .catch((error) => {
      dispatch({ type: 'SET_LOADING', payload: { show: false, msg: '' } });
      console.log('Mintingunsuccessful. Reason: ' + error);
    });
  };

  return (
    <div
      className="bg-[url('https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_960_720.png')]
        bg-no-repeat bg-cover"
    >
      <div className="flex flex-col justify-center items-center mx-auto py-10">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-5xl font-bold text-center">
            A.I Arts <br />
            <span className="text-gradient">NFTs</span> Collection
          </h1>
          <p className="text-white font-semibold text-sm mt-3">
            Mint and collect the hottest NFTs around.
          </p>
          <button
            className="shadow-xl shadow-black text-white
            bg-[#e32970] hover:bg-[#bd255f] p-2
            rounded-full cursor-pointer my-4"
            onClick={mint}
          >
            Mint Now
          </button>
          <a
            href="https://www.github.com/neverekt"
            className="flex flex-row justify-center space-x-2 items-center
            bg-[#000000ad] rounded-full my-4 pr-3 cursor-pointer"
          >
            <img
              className="w-11 h-11 object-contain rounded-full"
              src={avatar}
              alt="Adulam Logo"
            />
            <div className="flex flex-col font-semibold">
              <span className="text-white text-sm">{connectedAccount}</span>
              <span className="text-[#e32970] text-xs">Neverekt</span>
            </div>
          </a>
          <p className="text-white text-sm font-medium text-center">
            Coupled logic emerged in 2022. <br /> 
            Working along the interface of modern AI and the human experience <br /> 
            Custom language models, chatbots, text-to-image, blockchain and more
          </p>
          <ul className="flex flex-row justify-center space-x-2 items-center my-4">
            <a
              className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
              href="https://github.com/neverekt"
            >
              <img className="w-7 h-7" src={github} alt="Github" />
            </a>
            <a
              className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
              href="https://www.linkedin.com/in/drjet1"
            >
              <img className="w-7 h-7" src={linkedIn} alt="linkedIn" />
            </a>
            <a
              className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
              href="https://fb.com/synaptink"
            >
              <img className="w-7 h-7" src={facebook} alt="facebook" />
            </a>
            <a
              className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
              href="https://twitter.com/holdyourcoin"
            >
              <img className="w-7 h-7" src={twitter} alt="twitter" />
            </a>
            <a
              className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
              href="https://synaptink.medium.com/"
            >
              <img className="w-7 h-7" src={medium} alt="medium" />
            </a>
          </ul>
          <div
            className="shadow-xl shadow-black flex flex-row
            justify-center items-center w-10 h-10 rounded-full
          bg-white cursor-pointer p-3 ml-4 text-black 
            hover:bg-[#bd255f] hover:text-white transition-all
            duration-75 delay-100"
          >
            <span className="text-xs font-bold">
              {nfts.length}/{maxSupply}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero