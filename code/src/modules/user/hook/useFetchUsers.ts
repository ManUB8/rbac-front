import { useEffect, useState } from 'react'
import type { User } from '../interface/user.interface'
import { getUsers } from '../service/user.api'

export const useFetchUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            let g = await getUsers()
            console.log(g)

            setUsers(g)
        })().finally(() => setLoading(false))
    }, [])

    return { users, loading }
}
