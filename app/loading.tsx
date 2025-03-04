'use client'

import { HashLoader } from "react-spinners";

export default function Loading() {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-700"><HashLoader /></div>
      </div>
    );
  }
  