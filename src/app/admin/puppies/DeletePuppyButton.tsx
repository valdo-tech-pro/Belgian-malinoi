"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeletePuppyButton({ id, name }: { id:string; name:string }) {
  const router=useRouter(); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  async function remove() {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setBusy(true); setError("");
    try {
      const res=await fetch(`/api/admin/puppies/${id}`,{method:"DELETE"});
      const data=await res.json(); if(!res.ok) throw new Error(data.error || "Delete failed");
      router.refresh();
    } catch(err) { setError(err instanceof Error ? err.message : "Delete failed"); }
    finally { setBusy(false); }
  }
  return <span className="inline-flex items-center gap-2">
    <button type="button" onClick={remove} disabled={busy} className="text-red-600 hover:underline disabled:opacity-50">{busy ? "Deleting..." : "Delete"}</button>
    {error && <span className="text-xs text-red-600">{error}</span>}
  </span>;
}
