import ContractApiResponse  from '@/types/apiInterfaces'; 
import supabase from '@/config/supabaseClient';

async function saveContractInfoToSupabase(data: ContractApiResponse): Promise<void> {
    
    const { error } = await supabase
    .from('tokenInfo')
    .insert([
      {
        address: data.address,
        // Set fields accordingly
        isAccount: data.isAccount,
        isERC20: data.isErcToken,
        isProxy: data.isProxy,
        name: data.tokenName,
        symbol: data.tokenSymbol,
        // other fields...
      },
    ]);

  if (error) {
    throw new Error('Failed to save contract info to Supabase');
  }
}
export default saveContractInfoToSupabase;
