"use client";

export default function StartMCPButton() {
  const handleStart = async () => {
    const res = await fetch('/api/test');
    const data = await res.json();
    console.log(data);
  };

  return (
    <button
      onClick={handleStart}
      className="px-4 py-2 rounded bg-blue-500 text-white"
    >
      Start MCP
    </button>
  );
}
