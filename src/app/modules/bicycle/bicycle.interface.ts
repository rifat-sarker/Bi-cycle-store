export type TBicycle = {
  name: string
  brand: string
  price: number
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric'
  description: string
  quantity: number
  inStock: boolean
}

export type TOrder = {
  email: string
  product: ObjectId
  quantity: number
  totalPrice: number
}
