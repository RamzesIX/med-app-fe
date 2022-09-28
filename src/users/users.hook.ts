import { IUser } from './users.types'
import { useEffect, useState } from 'react'
import { UsersService } from './users.service'

export interface IUsersHook {
    currentUser: IUser | null
}

export function useUsers(): IUsersHook {
    const [state, setState] = useState<IUser | null>(null)

    useEffect(() => {
        const sub = UsersService.currentUser$.subscribe((user) => {
            setState(user)
        })

        return () => sub.unsubscribe()
    }, [])

    return {
        currentUser: state,
    }
}
