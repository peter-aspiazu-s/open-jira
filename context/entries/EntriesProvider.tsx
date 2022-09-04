import { FC, PropsWithChildren, useEffect, useReducer } from "react";

import { useSnackbar } from 'notistack';

import { EntriesContext, entriesReducer } from ".";
import { Entry } from "../../interfaces";
import {entriesApi} from '../../apis';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider:FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE )
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async( description: string ) => {

        // solo se uso para testear la funcionalidad del front hasta tener data en la db y traerla desde el back
        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     createdAt: Date.now(),
        //     status: "pending"
        // }

        const {data} = await entriesApi.post<Entry>('/entries', { description })
        
        dispatch({ type: '[Entry] Add-Entry', payload: data })
    }
    
    const updateEntry = async( {_id, description, status}: Entry, showSnackbar = false ) => {
        
        try {
            const {data} = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status })
            dispatch({ type: '[Entry] Entry-Updated', payload: data })

            if(showSnackbar){
                enqueueSnackbar('Actualización completa', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                })
            }
            
        } catch (error) {
            console.log({error})
        }
    }

    const deleteEntry = async( entry: Entry, showSnackbar = false ) => {
        
        try {
            const {data} = await entriesApi.delete<Entry>(`/entries/${ entry._id }`)
            dispatch({ type: '[Entry] Entry-Deleted', payload: data })

            if(showSnackbar){
                enqueueSnackbar('Eliminación completa', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                })
            }
            
        } catch (error) {
            console.log({error})
        }
    }

    const refreshEntries = async() => {
        const {data} = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entry] Refresh-Data', payload: data })
    }

    useEffect(() => {
        refreshEntries()
    }, [])


    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry,
            deleteEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )

}