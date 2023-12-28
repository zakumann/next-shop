import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchJson } from "@/lib/api";

const USER__QUERY_KEY = 'user';

export default function useSignIn(){
    const queryClient = useQueryClient();
    const mutation = useMutation(({ email, password }) => 
        fetchJson('api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }));
    return {
        signIn: async (email, password) => {
            try{
                const user = await mutation.mutateAsync({ email, password });
                queryClient.setQueryData(USER__QUERY_KEY, user);
                return true;
            } catch (err){
                return false;
            }
        },
        signInError: mutation.isError,
        signInLoading: mutation.isLoading,
    }
}

export function useSignOut(){
    const queryClient = useQueryClient();
    const mutation = useMutation(() => fetchJson('/api/logout'));
    return async () => {
        await mutation.mutateAsync();
        queryClient.setQueryData(USER__QUERY_KEY, undefined);
    };
}

export function useUser(){
    const query = useQuery('user', async () => {
        try{
            return await fetchJson('/api/user');
        } catch (err){
            return undefined;
        }
    }, {
        catcheTime: Infinity,
        staleTime: 30000, //ms
    });
    return query.data;
}
