'use client'
import useLocalQtyStore from '@/lib/hooks/useLocalQtyStore'

export default function AddToCart() {
  const { localQty, setLocalQty } = useLocalQtyStore()

  const handleIncrease = () => {
    const newQty = localQty + 1
    setLocalQty(newQty)
  }

  const handleDecrease = () => {
    const newQty = localQty > 1 ? localQty - 1 : 1
    setLocalQty(newQty)
  }

  return (
    <div className="border-[2px] border-[#D9D9D9] rounded-4xl flex items-center justify-center gap-4 px-10 py-4">
      <button className="text-black cursor-pointer" onClick={handleDecrease}>
        -
      </button>
      <span className="px-2 text-black">{localQty}</span>
      <button className="text-black cursor-pointer" onClick={handleIncrease}>
        +
      </button>
    </div>
  )
}
