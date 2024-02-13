interface ContractApiResponse {
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
export default ContractApiResponse;