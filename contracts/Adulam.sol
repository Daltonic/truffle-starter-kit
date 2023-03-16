// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Adulam is ERC721Enumerable, Ownable {
    // Defining essential variables...
    using Strings for uint256;
    mapping(string => uint8) public existingURIs;
    uint256 public cost = 0.01 ether;
    uint256 public maxSupply = 100;
    uint256 public supply;
    string public baseURI;

    // Sales event structure
    event Sale(
        uint256 id,
        address indexed from,
        address indexed to,
        uint256 cost,
        string metadataURI,
        uint256 timestamp
    );

    // The sales object of an NFT
    struct SaleStruct {
        uint256 id;
        address from;
        address to;
        uint256 cost;
        string title;
        string description;
        uint256 timestamp;
    }
    SaleStruct[] minted;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    ) ERC721(_name, _symbol) {
        supply = totalSupply();
        baseURI = _baseURI;
    }

    function payToMint(
        string memory title,
        string memory description
        ) public payable {
        // Specifies criteria for minting NFTs
        require(supply <= maxSupply, "Sorry, all NFTs have been minted!");
        require(msg.value > 0 ether, "Ether too low for minting!");
        require(msg.sender != owner(), "This is not permitted!");

        // Defines critical math operations
        supply += 1;
        string memory URI = concat(Strings.toString(supply + 1));
        existingURIs[URI] = 1;
        sendMoneyTo(owner(), msg.value);

        // Saves minted NFT in an array
        minted.push(
            SaleStruct(
                supply,
                msg.sender,
                owner(),
                msg.value,
                title,
                description,
                block.timestamp
            )
        );

        // Logs out NFT sales information
        emit Sale(
            supply,
            msg.sender,
            owner(),
            msg.value,
            URI,
            block.timestamp);

        // Mint the NFT with the ERC721 safeMint method
        _safeMint(msg.sender, supply);
    }

    // returns all minted NFTs
    function getAllNFTs() public view returns (SaleStruct[] memory) {
        return minted;
    }

    function getAnNFTs(
        uint256 tokenId
        ) public view returns (SaleStruct memory) {
        return minted[tokenId - 1];
    }

    function concat(
        string memory str
        ) internal view returns (string memory) {
        return string(abi.encodePacked(baseURI, "", str));
    }

    function sendMoneyTo(address to, uint256 amount) internal {
        (bool success1, ) = payable(to).call{value: amount}("");
        require(success1);
    }
}