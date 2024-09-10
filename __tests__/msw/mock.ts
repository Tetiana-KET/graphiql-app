import {
  DEFAULT_GRAPHQL_QUERY,
  DEFAULT_GRAPHQL_URL,
} from '@/consts/DefaultFormData';
import { GraphQLFormData } from '@/models/GraphQLFormData';
import { User } from 'firebase/auth';

export const GraphQLFormDataMock: GraphQLFormData = {
  url: DEFAULT_GRAPHQL_URL,
  sdl: `${DEFAULT_GRAPHQL_URL}?sdl`,
  query: DEFAULT_GRAPHQL_QUERY,
  headers: [{ key: 'id', value: '1' }],
  variables: [{ key: 'gender', value: 'male' }],
};

export const mockUser: User = {
  uid: 'ow9uOwgrziNwvDrCTWuuOateqE13',
  email: 'example@gmail.com',
  emailVerified: true,
  displayName: 'User Name',
  isAnonymous: false,
  photoURL:
    'https://lh3.googleusercontent.com/a/ACg8ocJ6MJKu8AJT70amlz8Di8G3VGWHaw1OsSgknqNJSbTelzCuVlZy3Q=s96-c',
  providerData: [
    {
      providerId: 'google.com',
      uid: '112412140674744876468',
      displayName: 'User Name',
      email: 'example@gmail.com',
      phoneNumber: null,
      photoURL:
        'https://lh3.googleusercontent.com/a/ACg8ocJ6MJKu8AJT70amlz8Di8G3VGWHaw1OsSgknqNJSbTelzCuVlZy3Q=s96-c',
    },
  ],
  metadata: {},
  refreshToken: '',
  tenantId: null,
  delete: vi.fn(),
  getIdToken: vi.fn().mockResolvedValue(''),
  getIdTokenResult: vi.fn().mockResolvedValue({}),
  reload: vi.fn(),
  toJSON: vi.fn(),
  phoneNumber: null,
  providerId: '',
};
