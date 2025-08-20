import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const BASE = 'https://panda-market-api.vercel.app/products';

export default function useProducts({
    page = 1,
    pageSize = 10,
    order = 'latest',
    name = '',
}) {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cancelRef = useRef(null);
    const debounceRef = useRef(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            if (cancelRef.current) {
                cancelRef.current.cancel('canceled');
            }
            cancelRef.current = axios.CancelToken.source();
            setLoading(true);
            setError(null);

            const params = { page, pageSize, order };
            if (name) params.name = name;

            axios
                .get(BASE, { params, cancelToken: cancelRef.current.token })
                .then((res) => {
                    const body = res.data || {};
                    setData(body.list || []);
                    setTotalCount(body.totalCount || 0);
                })
                .catch((err) => {
                    if (!axios.isCancel(err)) setError(err);
                })
                .finally(() => setLoading(false));
        }, 250);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            if (cancelRef.current) cancelRef.current.cancel('canceled');
        };
    }, [page, pageSize, order, name]);

    return { data, totalCount, loading, error };
}
