'use client'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBox() {
    const [search, setSearch] = useState('')
    const [debounceSearch, setDebounceSearch] = useState('')
    const router = useRouter()

    // デバウンス
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearch(search)
        }, 500)
        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        if (debounceSearch.trim()) {
            router.push(`/?search=${debounceSearch.trim()}`)
        } else {
            router.push('/')
        }
    }, [debounceSearch, router])

    return (
        <>
            <Input
                placeholder="記事を検索..."
                className="w-[200px] lg:w-[300px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </>
    )
}
