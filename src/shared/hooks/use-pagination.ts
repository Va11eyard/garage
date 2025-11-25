'use client'

import { useState } from "react";

export function usePagination(initialPage=0,  initialSize=20) {
    const [page, setPage] = useState(initialPage);
    const [size, setSize] = useState(initialSize);

    const nextPage = () => setPage((p) => p + 1);
    const previousPage = () => setPage((p) => Math.max(0, p - 1));
    const goToPage = (newPage: number) => setPage(Math.max(0, newPage));

    return { page, setPage, size, setSize, previousPage, nextPage, goToPage };
}