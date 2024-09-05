import { SerializerService } from '@/services/serializer';
import { GraphQLForm } from '@/app/[locale]/graphql/[...slug]/GraphQLForm/GraphQLForm';
import { ResponseStatus } from '@/app/[locale]/_components/ResponseStatus/ResponseStatus';
import { PageProps } from '@/models/PageProps';
import { RequestType } from '@/enums/RequestType';
import { GraphQLFormData } from '@/models/GraphQLFormData';
import { ApiService } from '@/services/api';
import { RequestDocumentation } from '@/app/[locale]/graphql/[...slug]/GraphQLForm/components/RequestDocumentation/RequestDocumentation';
import { getIntrospectionQuery } from 'graphql/index';

export default async function GraphResponsePage({
  params,
  searchParams,
}: PageProps) {
  const deserialized = SerializerService.deserialize<GraphQLFormData>(
    RequestType.GraphQL,
    params.slug,
    searchParams,
  );

  if (!deserialized) {
    return <div>Invalid URL</div>;
  }

  const { formData, request } = deserialized;
  const requestResponse = await ApiService.fetch(formData.url, request);
  const documentationResponse = await ApiService.fetch(formData.sdl, {
    ...request,
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });

  return (
    <div className="flex gap-4 w-full h-full">
      <GraphQLForm formData={formData} />

      <div className="flex w-1/2 h-full flex-col gap-2">
        <div className="h-1/2">
          <ResponseStatus
            formData={formData}
            response={requestResponse}
            type={RequestType.GraphQL}
          />
        </div>

        <div className="h-1/2">
          <RequestDocumentation response={documentationResponse} />
        </div>
      </div>
    </div>
  );
}
