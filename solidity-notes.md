# Solidity notes

## Functions
- `external` means it can be called via other contracts and not internally. Can call internally with `this.` but high gas fees
- `internal` means can only be called internally and by children. 
- `public` means can be called internally and externally

- `payable` means you can send `{value:"100000..."}` to the function 
- `view` means will not alter the storage state in any way (read only)
- `pure` even more restrictive than `view`, won't even read the storage state

- `returns(uint)` to indicate returns uint. 
- `receive() external payable {}` is a special function that is called when make tx but does not specify fn name
- `constructor() {}` as constructor, nothing else

## Modifier
- can provide a paramater(s). 
- remember to use `_;` to run the function after modifier is used
- require statments in the form `require(some == thing, "error message");`

## Inheritance
- use `contract Husky is Dog {}`, where Dog is a smart contract
- `abstract contract Logger {}`, `function thing() public virtual returns(bytes32);`
- Interface name starts with I: `IFaucet.sol`, `interface IFaucet {...}`, only have external function declarations. Can only inherit from other interfaces, cannot have constructor or state variables. 
- 

## Mapping
- `mapping(uint256 => address) private funders`
- `funders[5] = msg.sender`