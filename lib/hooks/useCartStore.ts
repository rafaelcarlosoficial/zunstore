import { create } from 'zustand'
import { round2 } from '../utils'
import { OrderItem } from '../models/OrderModel'
import { persist } from 'zustand/middleware'

type Cart = {
  items: OrderItem[]
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
}
export const cartStore = create<Cart>()(
  persist(() => initialState, {
    name: 'cartStore',
  })
)

export default function useCartStore() {
  const { items, itemsPrice, shippingPrice, taxPrice, totalPrice } = cartStore()
  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    // increase: (item: OrderItem) => {
    //   const exist = items.find((x) => x.slug === item.slug)
    //   const updatedCartItems = exist
    //     ? items.map((x) =>
    //         x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
    //       )
    //     : [...items, { ...item, qty: 1 }]
    //   const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    //     calcPrice(updatedCartItems)
    //   cartStore.setState({
    //     items: updatedCartItems,
    //     itemsPrice,
    //     shippingPrice,
    //     taxPrice,
    //     totalPrice,
    //   })
    // },
    increase: (item: OrderItem, qty: number = 1) => {
      const exist = items.find((x) => x.slug === item.slug)
      const updatedCartItems = exist
        ? items.map((x) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + qty } : x
          )
        : [...items, { ...item, qty }]

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems)

      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    },

    decrease: (item: OrderItem) => {
      //check if the elemment exist in the items array
      const exist = items.find((x) => x.slug === item.slug)
      //if is undefined ou null will return
      if (!exist) return

      const updatedCartItems =
        exist.qty === 1
          ? // It's actually taking all array elements that are different from x and making a new array
            items.filter((x: OrderItem) => x.slug !== item.slug)
          : //Probably the error is here, map is taking all the elements and subtracting everything

            // items.map((x) => (item.slug ? { ...exist, qty: exist.qty - 1 } : x))
            items.map((x) =>
              x.slug === item.slug ? { ...x, qty: x.qty - 1 } : x
            )

      //This one is made to calculate the price.. because its need to be updated.
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems)
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    },
  }
}

const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 100)
  const taxPrice = round2(Number(0.15 * itemsPrice))
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
  return { itemsPrice, shippingPrice, taxPrice, totalPrice }
}
