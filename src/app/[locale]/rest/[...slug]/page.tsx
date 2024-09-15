import { SerializerService } from '@/services/serializer';
import { ResponseStatus } from '@/app/[locale]/_components/ResponseStatus/ResponseStatus';
import { PageProps } from '@/models/PageProps';
import { RequestType } from '@/enums/RequestType';
import { RestFormData } from '@/models/RestFormData';
import RestForm from '@/app/[locale]/rest/components/RestForm';
import { ApiService } from '@/services/api';

export default async function RestResponsePage({
  params,
  searchParams,
}: PageProps) {
  const deserialized = SerializerService.deserialize<RestFormData>(
    RequestType.Rest,
    params.slug,
    searchParams,
  );

  if (!deserialized) {
    return <div>Invalid URL</div>;
  }

  const { formData, request } = deserialized;

  const response = await ApiService.fetch(formData.url, request);

  return (
    <div className="flex flex-col sm:flex-row gap-4 h-80dvh w-full overflow-auto">
      <RestForm formData={formData} />

      <div className="flex w-full sm:w-1/2">
        <ResponseStatus
          formData={formData}
          response={response}
          type={RequestType.Rest}
        />
      </div>
    </div>
  );
}
