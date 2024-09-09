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
    <div className="flex flex-col sm:flex-row gap-3 h-80dvh w-full overflow-auto">
      <GraphQLForm formData={formData} />

      <div className="px-1 flex w-full sm:w-48p h-full flex-col gap-1">
        <div className="h-full sm:h-40p">
          <ResponseStatus
            formData={formData}
            response={requestResponse}
            type={RequestType.GraphQL}
          />
        </div>

        <div className="h-full sm:h-59p">
          <RequestDocumentation response={documentationResponse} />
        </div>
      </div>
    </div>
  );
}
