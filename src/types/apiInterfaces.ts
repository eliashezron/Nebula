interface ContractAddressApiResponse {
    address: string;
    blockNumber: number;
    isAccount: boolean;
    isErcToken: boolean;
    isProxy: boolean;
    type: number;
    creationTimestamp: number;
    verifiedTimestamp: number | null;
    classAlias: string | null;
    contractAlias: string | null;
    classHash: string;
    version: string;
    blockHash: string;
    nonce: number;
    tokenName: string;
    tokenSymbol: string;
}
interface ContractHashApiResponse{
    hash: string
    transactionHash: string
    type: number
    creationTimestamp: number
    verifiedTimestamp: number | null
    classAlias: string | null
    version: string
    byteCode: [string]
    abi: {
    }
    code: {
    }
    license: string
    contractsCount: string
    declaredBy: string
    isAccount: boolean
    }
export type {ContractAddressApiResponse, ContractHashApiResponse};