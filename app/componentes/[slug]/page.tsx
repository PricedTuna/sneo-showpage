import { notFound } from 'next/navigation'
import { ComponentDemo } from '../../../components/ComponentDemo'
import { names } from '../../../components/componentNames'

export function generateStaticParams() { return names.map(name=>({slug:name.toLowerCase()})) }
export default async function Page({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params; const name=names.find(n=>n.toLowerCase()===slug)
 if(!name) notFound()
 return <ComponentDemo name={name}/>
}
