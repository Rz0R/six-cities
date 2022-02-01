import { Comments } from '../types/comments';

export const comments: Comments = [
  {
    id: '1',
    user: {
      id: '15',
      isPro: false,
      name: 'Kendall',
      avatarUrl: 'https://8.react.pages.academy/static/avatar/6.jpg',
    },
    rating: 3,
    comment: 'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    date: '2021-12-30T15:51:12.099Z',
  },
  {
    id: '2',
    user: {
      id: '14',
      isPro: true,
      name: 'Corey',
      avatarUrl: 'https://8.react.pages.academy/static/avatar/5.jpg',
    },
    rating: 3,
    comment: 'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
    date: '2021-12-30T15:51:12.099Z',
  },
  {
    id: '3',
    user: {
      id: '15',
      isPro: false,
      name: 'Kendall',
      avatarUrl: 'https://8.react.pages.academy/static/avatar/6.jpg',
    },
    rating: 3,
    comment: 'The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.',
    date: '2021-12-30T15:51:12.099Z',
  },
];
