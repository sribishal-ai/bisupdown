'use client';

import { useEffect } from 'react';
import { addRecentCheck } from '../../components/RecentChecks';

export default function SaveCheck({ url, isUp }) {
    useEffect(() => {
        addRecentCheck(url, isUp);
    }, [url, isUp]);

    return null;
}
