import {
  DEFAULT_GRAPHQL_QUERY,
  DEFAULT_GRAPHQL_URL,
} from '@/consts/defaultFormData';
import { RequestType } from '@/enums/RequestType';
import { ApiResponse } from '@/models/ApiResponse';
import { GraphQLFormData } from '@/models/GraphQLFormData';
import { User } from 'firebase/auth';

export const GraphQLFormDataMock: GraphQLFormData = {
  url: DEFAULT_GRAPHQL_URL,
  sdl: `${DEFAULT_GRAPHQL_URL}?sdl`,
  query: DEFAULT_GRAPHQL_QUERY,
  headers: [{ key: 'id', value: '1' }],
  variables: [{ key: 'gender', value: 'male' }],
};

export const mockDocumentationResponse: ApiResponse = {
  data: {
    data: {
      __schema: 'schema info',
    },
  },
  id: '3wlql6lptzb',
  status: 200,
  error: null,
  time: 135,
};

export const mockEmptyDocumentationResponse: ApiResponse = {
  data: null,
  id: '3wlql6lptzb',
  status: 404,
  error: null,
  time: 135,
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

export const mockAuthContextValue = {
  isLoggedIn: true,
  loading: false,
  userName: 'User Name',
  user: mockUser,
};

export const mockUnAuthContextValue = {
  isLoggedIn: false,
  loading: false,
  userName: '',
  user: mockUser,
};

export const mockIsLoadingAuthContextValue = {
  isLoggedIn: false,
  loading: true,
  userName: '',
  user: mockUser,
};

export const mockGraphQLFormData: GraphQLFormData = {
  url: DEFAULT_GRAPHQL_URL,
  sdl: `${DEFAULT_GRAPHQL_URL}?sdl`,
  query: DEFAULT_GRAPHQL_QUERY,
  headers: [{ key: 'id', value: '1' }],
  variables: [{ key: 'gender', value: 'male' }],
};

export const mockGraphQLRequestHistoryRecord = {
  formData: {
    url: 'https://countries.trevorblades.com/graphql',
    variables: [],
    headers: [],
    sdl: 'https://countries.trevorblades.com/graphql?sdl',
    query:
      'query Query {\n  country(code: "BR") {\n    name\n    native\n    capital\n    emoji\n    currency\n    languages {\n      code\n      name\n    }\n  }\n}',
  },
  type: RequestType.GraphQL,
  date: '2024-09-09T10:01:14.785Z',
  id: 'q6syo6zrtgq',
  time: 30,
};

export const mockDeveloperData = {
  name: 'Developer Name',
  role: 'Frontend developer',
  info: `I am a frontend developer`,
  github: 'https://github.com/link',
  photo: 'https://avatars.githubusercontent.com/u/137721533?v=4',
  id: 'DeveloperName',
  contribution: 'contribution',
};

export const mockKeyValuePairs = { key: 'id', value: '1' };

export const mockTechnologyCard = {
  title: 'TechName',
  imgSrc: '/TechName.png',
  description: 'Tech description',
};
