import type { Page } from '../payload-types'

export const staticCart: Page = {
  id: '',
  title: 'Cart',
  slug: 'cart',
  createdAt: '',
  updatedAt: '',
  _status: 'published',
  meta: {
    title: 'Cart',
    description:
      'Your cart will sync to your user profile so you can continue shopping from any device.',
  },
  hero: {
    type: 'lowImpact',
    links: [],
    media: '',
    richText: [
      {
        type: 'h1',
        children: [
          {
            text: 'Cart',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: ""
          },
          {
            type: 'link',
            linkType: 'custom',
            url: '/shop',
            children: [
              {
                text: 'shop now',
              },
            ],
          },
          {
            text: ' and click "seed your database". If you have already seeded your database, ',
          },
          {
            text: 'you may need to hard refresh this page to clear the cached request.',
            bold: true,
          },
        ],
      },
    ],
  },
  layout: [
    {
      richText: [
        {
          children: [
            {
              text: 'Create a cart page',
            },
          ],
          type: 'h4',
        },
        {
          children: [
            {
              text: 'cart is empty ',
            },
            {
              type: 'link',
              linkType: 'custom',
              url: '/shop',
              children: [
                {
                  text: 'go to the shop to buy',
                },
              ],
            },
            {
              text: '',
            },
          ],
        },
      ],
      links: [
        {
          link: {
            type: 'custom',
            url: '/shop',
            label: 'Go to shop',
            appearance: 'primary',
            reference: null,
          },
        },
      ],
      blockName: 'CTA',
      blockType: 'cta',
    },
  ],
}
