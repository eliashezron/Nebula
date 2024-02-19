import {ContractAddressApiResponse, ContractHashApiResponse}  from '@/types/apiInterfaces'; 
import supabase from '@/config/supabaseClient';
import { Database } from '@/types/supabase';

type TokenInfoRow = Database['public']['Tables']['tokenInfo']['Row'];

async function saveContractInfoToSupabase(data: ContractAddressApiResponse): Promise<void> {
    
    const { error } = await supabase
    .from('tokenInfo')
    .insert([
      {
        address: data.address,
        isAccount: data.isAccount,
        isERC20: data.isErcToken,
        isProxy: data.isProxy,
        name: data.tokenName,
        symbol: data.tokenSymbol,
        classHash: data.classHash,
        creationTimestamp: data.creationTimestamp,
      },
    ]);

  if (error) {
    throw new Error('Failed to save contract info to Supabase');
  }
}
async function saveContractCodeToSupabase(data: ContractHashApiResponse): Promise<void> {
  if (Object.keys(data.abi).length === 0) {
    console.error('No contract code to save');
    return; // Exit early if there is no code
  }
  console.log('this is tha data,abi',data.abi);
  const { data : existingData , error } = await supabase
  .from('tokenInfo')
  .select('classHash')
  .eq('classHash', data.hash)
  .single();
  if (error) {
    throw new Error('Failed to save contract code to Supabase');
  }
  if(existingData){
        // If the row exists, update the code column
        const { error: updateError } = await supabase
        .from('tokenInfo')
        .update({ code: data.abi }) // Assume 'data.code' contains the contract code
        .eq('classHash', data.hash)
  
      if (updateError) {
        console.error('Error updating contract code:', updateError);
        throw new Error('Failed to update contract code');
      }
    } else {
      // Optionally, handle the case where no matching classHash is found
      console.error('No token found with the given classHash');
    }
}
async function addressExists(address: string): Promise<boolean> {
  const { data, error, count  } = await supabase
    .from('tokenInfo') // Replace 'yourTableName' with the actual table name
    .select('views', { count: 'exact' })
    .eq('address', address)
    .single(); // Use .single() if you're expecting at most one row to match

  if (error) {
    console.error('Error checking address:', error.message);
    return false; // or handle the error as appropriate
  }

  if (count === 1) {
    const currentViews = data?.views || 0;
    const { error: updateError } = await supabase
      .from('tokenInfo') // Use the correct table name
      .update({ views: currentViews + 1 }) // Increment the views
      .eq('address', address);

    if (updateError) {
      console.error('Error updating views:', updateError.message);
    }
  }

  return !!data; // Returns true if the address exists, false otherwise
  
}

async function fetchTokenDetails(address: string): Promise<TokenInfoRow> {
  const { data, error } = await supabase
  .from('tokenInfo') // Use your table name here
  .select('*') // Selects all columns
  .eq('address', address)
  .single(); // Use .single() if the address is expected to be unique

if (error) {
  console.error('Error fetching token details:', error.message);
  throw new Error('Failed to fetch token details');
}

return data;  // This will be null if no token matches the ID
}

async function fetchTokensOrderedByViews(): Promise<TokenInfoRow[]> {
  const { data, error } = await supabase
    .from('tokenInfo') // Use the correct table name
    .select('*') // Select all fields or just the ones you need
    .order('views', { ascending: false }); // Order by views in descending order

  if (error) {
    console.error('Error fetching tokens:', error.message);
    throw new Error('Failed to fetch tokens');
  }

  return data || []; // Return the fetched data or an empty array if null
}

async function fetchTokensOrderedByMarketCap(): Promise<TokenInfoRow[]> {
  const { data, error } = await supabase
    .from('tokenInfo') // Use the correct table name
    .select('*') // Select all fields or just the ones you need
    .order('liquidity', { ascending: false }); // Order by views in descending order

  if (error) {
    console.error('Error fetching tokens:', error.message);
    throw new Error('Failed to fetch tokens');
  }

  return data || []; // Return the fetched data or an empty array if null
}

async function getNumberContractsScanned(): Promise<number> {
  const { count, error } = await supabase
    .from('tokenInfo') // Replace with your actual table name
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching count:', error.message);
    return Promise.reject(error);
  }

  return count || 0;
}

async function getTotalIssuesFound(): Promise<number> {
  const { data, error } = await supabase
    .from('tokenInfo') // Replace with your actual table name
    .select('highRisks, lowRisks');

  if (error) {
    console.error('Error fetching issues:', error.message);
    return Promise.reject(error);
  }
  const totalIssues = data?.reduce((total, token) => {
    // Directly add the values since they are already numbers
    const highRisks = token.highRisks ?? 0;
    const lowRisks = token.lowRisks ?? 0;
    return total + highRisks + lowRisks;
  }, 0) || 0; // Initialize the total as 0, and also default to 0 if data is null

  return totalIssues;
}

async function getCountOfRiskyTokens(): Promise<number> {
  const { data, error, count } = await supabase
    .from('tokenInfo') // Replace with your actual table name
    .select('isRisky', { count: 'exact' })
    .eq('isRisky', true);

  if (error) {
    console.error('Error fetching risky tokens count:', error.message);
    throw error; // Throw the error to be handled by the calling function
  }

  // The count is returned as part of the query when using { count: 'exact' }
  return count || 0;
}


export {saveContractInfoToSupabase, addressExists, fetchTokenDetails, fetchTokensOrderedByMarketCap, fetchTokensOrderedByViews, getNumberContractsScanned, getTotalIssuesFound, getCountOfRiskyTokens, saveContractCodeToSupabase};
