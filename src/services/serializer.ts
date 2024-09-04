import { GraphQLFormData } from '@/models/FormInterfaces';
import { RestFormData } from '@/models/RestFormData';

export class SerializerService {
  public static serializeRest(formData: RestFormData): string {
    console.warn(formData);
    return `rest`;
  }

  public static serializeGraphQL(formData: GraphQLFormData): string {
    console.warn(formData);
    return `graphql`;
  }
}
