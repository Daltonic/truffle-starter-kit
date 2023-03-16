import Web3 from 'web3'
import abi from './abis/Adulam.json'
import address from './abis/contractAddress.json'
import React, { useState, useEffect, useContext } from 'react';
import { setAlert, setLoadingMsg } from './store'
import { GlobalStateContext, GlobalDispatchContext, useGlobalState, actionTypes } from './GlobalState';
// import { useDispatch, useGlobalState, dispatchContext } from './GlobalState';
import Adulam from './abis/Adulam.json'

const { ethereum } = window
const contractAddress = address.address
const contractAbi = abi.abi
const opensea_uri = `https://testnets.opensea.io/assets/goerli/${contractAddress}/`
const BASE_URI = 'https://bafybeidfpvjszubegtoomoknmc7zcqnay7noteadbwxktw46guhdeqohrm.ipfs.infura-ipfs.io/'

function useAdulam() {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const connectedAccount = state.connectedAccount;
  const nfts = state.nfts;
  const contract = state.contract;
  // const [, dispatch] = useGlobalState();
  // const [connectedAccount, setConnectedAccount] = useGlobalState('connectedAccount');
  // const [nfts, setNfts] = useGlobalState('nfts');
  // const [contract, setContract] = useGlobalState('contract');

  useEffect(() => {
    loadWeb3();
  }, []);

const payForArt = async (art) => {
  try {
    const web3 = window.web3
    const buyer = art.buyer
    const title = art.title
    const description = art.description
    const cost = web3.utils.toWei('0.0001', 'ether')
    dispatch(setLoadingMsg('NFT minting in progress...'));

    await contract.methods
    .payToMint(title, description)
    .send({ from: buyer, value: cost })
    dispatch(setLoadingMsg('Minting successful...'));
    return true
  }
  catch (error) {
    dispatch(setAlert(error.message, 'red'));
  }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    dispatch({ type: actionTypes.SET_CONNECTED_ACCOUNT, payload: accounts[0] });
  } catch (error) {
    setAlert(JSON.stringify(error), 'red');
  }
}

const loadWeb3 = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    window.web3 = new Web3(ethereum);
    window.web3 = new Web3(window.web3.currentProvider);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    dispatch({ type: actionTypes.SET_CONNECTED_ACCOUNT, payload: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Adulam.networks[networkId]

    if (networkData) {
      const contract = new web3.eth.Contract(Adulam.abi, networkData.address)
      const nfts = await contract.methods.getAllNFTs().call();
      // console.log('Raw NFTs:', nfts);
      dispatch({ type: actionTypes.SET_NFTS, payload: structuredNfts(nfts) });
      dispatch({ type: actionTypes.SET_CONTRACT, payload: contract });
    } else {
      window.alert('Adulam contract not deployed to detected network.');
    }
  } catch (error) {
    alert('Please connect your metamask wallet!');
  }
}

const structuredNfts = (nfts) => {
  const web3 = window.web3;

  return nfts.map((nft) => ({
    id: nft.id,
    to: nft.to,
    from: nft.from,
    cost: web3.utils.fromWei(nft.cost),
    title: nft.title,
    description: nft.description,
    timestamp: nft.timestamp,
  }))
  .reverse();
}

return {
  dispatch,
  connectedAccount,
  nfts,
  contract,
  loadWeb3,
  connectWallet,
  payForArt
};
}

export { BASE_URI, useAdulam };