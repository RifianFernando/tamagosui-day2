import {
    useCurrentAccount,
    useSuiClient,
    useSignAndExecuteTransaction,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { queryKeyOwnedPet } from './useQueryOwnedPet';
import { MODULE_NAME, PACKAGE_ID } from '@/constants/contract';

const mutationKeyCheatPet = ['mutate', 'cheat-pet'];

type UseMutateCheatPetParams = {
    petId: string;
};

export function useMutateCheatPet() {
    const currentAccount = useCurrentAccount();
    const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
    const suiClient = useSuiClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: mutationKeyCheatPet,
        mutationFn: async ({ petId }: UseMutateCheatPetParams) => {
            if (!currentAccount) throw new Error('No connected account');

            const tx = new Transaction();
            tx.moveCall({
                target: `${PACKAGE_ID}::${MODULE_NAME}::cheat`,
                arguments: [tx.object(petId)],
            });

            const result = await signAndExecute({ transaction: tx });
            const response = await suiClient.waitForTransaction({
                digest: result.digest,
                options: { showEvents: true, showEffects: true },
            });

            if (response?.effects?.status.status === 'failure')
                throw new Error(response.effects.status.error);

            return response;
        },
        onSuccess: (response) => {
            toast.success(`Pet cheated successfully! Tx: ${response.digest}`);
            queryClient.invalidateQueries({ queryKey: queryKeyOwnedPet() });
        },
        onError: (error) => {
            console.error('Error cheating the pet:', error);
            toast.error(`Error cheating the pet: ${error.message}`);
        },
    });
}
