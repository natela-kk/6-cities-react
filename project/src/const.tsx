export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  Main  = '/',
  Error  = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES = [
  {location: {
    latitude: 48.8534,
    longitude:  2.3488,
    zoom: 13,
  },
  name: 'Paris',
  },
  {
    location: {
      latitude: 50.9433,
      longitude:  6.95,
      zoom: 13,
    },
    name: 'Cologne',
  },
  {
    location: {
      latitude: 50.8433,
      longitude:  4.3533,
      zoom: 13,
    },
    name: 'Brussels',
  },
  {
    location: {
      latitude: 52.374,
      longitude:  4.88969,
      zoom: 13,
    },
    name: 'Amsterdam',
  },
  {
    location: {
      latitude: 53.5531769,
      longitude: 9.9899464,
      zoom: 13,
    },
    name: 'Hamburg',
  },
  {
    location: {
      latitude: 51.2317,
      longitude: 6.77616,
      zoom: 13,
    },
    name: 'Dusseldorf',
  },
];


export const SORT_TYPE = {
  popular: 'Popular',
  priceAsc: 'Price: low to high',
  priceDes: 'Price: high to low',
  topRated: 'Top rated first',
};

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
}

export enum HttpCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export enum NameSpace {
  Sort = 'SORT',
  City = 'CITY',
  User = 'USER',
  Offers = 'OFFERS',
  Property = 'PROPERTY',
  Nearby = 'NEARBY',
  Comments = 'COMMENTS',
  Favorites = 'FAVORITES',
}
