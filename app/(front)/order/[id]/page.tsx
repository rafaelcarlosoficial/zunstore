import OrderDetails from './OrderDetails'

export async function generateMetadata(props: PageProps<'/order/[id]'>) {
  const params = await props.params
  return {
    title: `Order ${params.id}`,
  }
}

export default async function OrderDetailsPage(props: PageProps<'/order/[id]'>) {
  const params = await props.params
  return (
    <OrderDetails
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      orderId={params.id}
    />
  )
}

