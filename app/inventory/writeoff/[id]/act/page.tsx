'use client'

import { use } from 'react'
import { WriteOffAct } from '@/widgets/documents/WriteOffAct'

export default function WriteOffActPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <WriteOffAct id={id} />
}
