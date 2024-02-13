import ContractApiResponse  from '@/types/apiInterfaces'; 
import supabase from '@/config/supabaseClient';
import { Database } from '@/types/supabase';

type TokenInfoRow = Database['public']['Tables']['tokenInfo']['Row'];

async function saveContractInfoToSupabase(data: ContractApiResponse): Promise<void> {
    
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
      },
    ]);

  if (error) {
    throw new Error('Failed to save contract info to Supabase');
  }
}
async function addressExists(address: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('tokenInfo') // Replace 'yourTableName' with the actual table name
    .select('address')
    .eq('address', address)
    .single(); // Use .single() if you're expecting at most one row to match

  if (error) {
    console.error('Error checking address:', error.message);
    return false; // or handle the error as appropriate
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
export {saveContractInfoToSupabase, addressExists, fetchTokenDetails};
