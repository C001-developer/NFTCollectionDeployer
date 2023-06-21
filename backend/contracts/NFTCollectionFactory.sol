// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTCollectionFactory {
    event CollectionCreated(address collection, string name, string symbol);

    function createCollection(
        string memory name,
        string memory symbol
    ) external {
        NFTCollection collection = new NFTCollection(name, symbol);
        emit CollectionCreated(address(collection), name, symbol);
    }
}

contract NFTCollection is ERC721 {
    uint256 private _tokenIDCounter;
    mapping(string => bool) private _tokenUriExists;
    mapping(uint256 => string) private _tokenURIs;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function mintToken(address recipient, string memory tokenUri) external {
        require(!_tokenUriExists[tokenUri], "Token URI already exists");
        
        unchecked {
            ++_tokenIDCounter;
        }

        uint256 tokenId = _tokenIDCounter;

        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenUri);
        
        emit TokenMinted(address(this), recipient, tokenId, tokenUri);
    }

    function _setTokenURI(uint256 tokenId, string memory tokenUri) internal {
        _tokenURIs[tokenId] = tokenUri;
        _tokenUriExists[tokenUri] = true;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    event TokenMinted(
        address indexed collection,
        address indexed recipient,
        uint256 tokenId,
        string tokenUri
    );
}
