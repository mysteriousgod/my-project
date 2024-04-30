import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Tlli Wears: Elevate Your Style with Trendy Clothing',
  title: 'Tlli Wears: Elevate Your Style with Trendy Clothing',
  description: 'An open-source e-commerce store built with Payload and Next.js.',
  images: [
    {
      url: 'https://payloadcms.com/images/og-image.jpg',
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
