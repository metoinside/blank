'use client'
import Link from "next/link";
import React from "react";

export default function Page() {
    const [ counter, setCount] = React.useState(0);

    function increase () {
        setCount(counter+1);
    }

    return (
    <div>
      <button onClick={increase}>Click Me! ({counter})</button>
      <h1>Hello, Next.js!</h1>
      <Link href="/about"><h4>About page</h4></Link>
    </div>
  );
}
