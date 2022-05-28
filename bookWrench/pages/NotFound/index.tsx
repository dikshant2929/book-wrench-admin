'use strict';
import React, { useEffect } from 'react';

export default function NotFoundPage() {

    useEffect(() => {
        const header = document.getElementsByClassName("header")[0];
        header?.classList?.add("hidden")
    },[])
    return (
        <main className="gsc_container notFoundOut">
            <div className="gsc_row notFound">
                <h1>
                    <span>Oops!</span>
                    We can't seem to find the page you're looking for.
                </h1>
            </div>
        </main>
    );
}
