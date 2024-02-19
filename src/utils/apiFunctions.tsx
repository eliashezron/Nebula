import {ContractAddressApiResponse, ContractHashApiResponse}from "@/types/apiInterfaces";
async function fetchContractInfo(contractAddress : string) {
    const secretKey = process.env.NEXT_PUBLIC_VOYAGER_SECRET_KEY;
    if (!secretKey) {
      throw new Error('Missing env.NEXT_PUBLIC_VOYAGER_SECRET_KEY');
    }
    const response = await fetch(`https://api.voyager.online/beta/contracts/${contractAddress}`, {
      method: 'GET',
      headers: {
        "accept": "application/json",
        "x-api-key": secretKey,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch contract info');
    }
  
    return response.json() as Promise<ContractAddressApiResponse>;
}

async function fetchContractCode(classhash : string) {
  const secretKey = process.env.NEXT_PUBLIC_VOYAGER_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Missing env.NEXT_PUBLIC_VOYAGER_SECRET_KEY');
  }
  const response = await fetch(`https://api.voyager.online/beta/classes/${classhash}`, {
    method: 'GET',
    headers: {
      "accept": "application/json",
      "x-api-key": secretKey,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch contract info');
  }

  return response.json() as Promise<ContractHashApiResponse>;
}

export {fetchContractInfo, fetchContractCode};