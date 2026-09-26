"use client";
import { useState } from "react";
import Link from "next/link";

const input="w-full px-4 py-3 bg-white border border-forest/20 text-charcoal text-sm focus:outline-none focus:border-gold";
const label="block text-sm font-medium text-forest mb-1";
type PuppyData={id:string;name:string;sex:string;birthDate:string;color:string;price:number;status:string;litter:string;description:string;sire:string;dam:string;sireHD:string;sireED:string;damHD:string;damED:string;dna:string;images:string;deposit:number};

export function EditPuppyForm({puppy}:{puppy:PuppyData}) {
 const [saving,setSaving]=useState(false),[error,setError]=useState(""),[success,setSuccess]=useState("");
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();setSaving(true);setError("");setSuccess("");
  try{const payload=Object.fromEntries(new FormData(e.currentTarget).entries());
   const res=await fetch(`/api/admin/puppies/${puppy.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
   const data=await res.json();if(!res.ok)throw new Error(data.error||"Failed to update puppy");setSuccess("Puppy updated successfully.");
  }catch(err){setError(err instanceof Error?err.message:"Failed to update puppy")}finally{setSaving(false)}
 }
 return <form onSubmit={submit} className="space-y-4 bg-white border border-forest/10 p-6">
  <div className="grid md:grid-cols-2 gap-4">
   {([["name","Name *",puppy.name],["color","Color *",puppy.color],["sire","Sire (father) *",puppy.sire],["dam","Dam (mother) *",puppy.dam],["sireHD","Sire HD",puppy.sireHD],["sireED","Sire ED",puppy.sireED],["damHD","Dam HD",puppy.damHD],["damED","Dam ED",puppy.damED],["dna","DNA panel",puppy.dna],["litter","Litter",puppy.litter]] as string[][]).map(([name,title,value])=><div key={name} className={name==="dna"||name==="litter"?"md:col-span-2":""}><label className={label} htmlFor={name}>{title}</label><input id={name} name={name} defaultValue={value} className={input} required={title.includes("*")}/></div>)}
   <div><label className={label}>Sex *</label><select name="sex" defaultValue={puppy.sex} className={input}><option>Male</option><option>Female</option></select></div>
   <div><label className={label}>Status *</label><select name="status" defaultValue={puppy.status} className={input}><option>Available</option><option>Reserved</option><option>Sold</option></select></div>
   <div><label className={label}>Birth date *</label><input name="birthDate" type="date" defaultValue={puppy.birthDate} className={input} required/></div>
   <div><label className={label}>Price (USD) *</label><input name="price" type="number" defaultValue={puppy.price} className={input} required/></div>
   <div className="md:col-span-2"><label className={label}>Description *</label><textarea name="description" rows={5} defaultValue={puppy.description} className={input} required/></div>
   <div className="md:col-span-2"><label className={label}>Photo URLs *</label><textarea name="images" rows={5} defaultValue={puppy.images} className={input} required/><p className="text-xs text-charcoal/50 mt-1">One image URL per line.</p></div>
   <div><label className={label}>Deposit (USD)</label><input name="deposit" type="number" min="0" defaultValue={puppy.deposit} className={input}/></div>
  </div>
  {error&&<p className="text-sm text-red-600">{error}</p>}{success&&<p className="text-sm text-emerald-700">✓ {success}</p>}
  <button type="submit" disabled={saving} className="w-full px-8 py-4 bg-gold text-forest font-medium hover:bg-gold/90 disabled:opacity-50">{saving?"Saving...":"Save Changes"}</button>
  <Link href="/admin/puppies" className="block text-center text-sm text-charcoal/60 hover:text-gold">Cancel</Link>
 </form>;
}
