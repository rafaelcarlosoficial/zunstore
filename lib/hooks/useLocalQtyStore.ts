'use client'
import { create } from 'zustand'

type LocalQtyStore = {
  localQty: number
  setLocalQty: (qty: number) => void
}

const useLocalQtyStore = create<LocalQtyStore>((set) => ({
  localQty: 1,
  setLocalQty: (qty) => set({ localQty: qty }),
}))

export default useLocalQtyStore
