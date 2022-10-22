import React from 'react'
import { useSearchParams, useParams } from 'react-router-dom'

export default function Cart() {
    const [search, setSearch] = useSearchParams()

    const { id } = useParams()

    return (
        <div>
            Cart
            id: {id}
            Quantity: {search.get('qty')}
        </div>
    )
}
