import { HttpStatusCode } from '@/enums/HttpStatusCode';

type StatusColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export const getStatusColor = (status: number | null): StatusColor => {
  if (!status) {
    return 'default';
  }

  if (status < HttpStatusCode.OK) {
    return 'primary';
  }

  if (status < HttpStatusCode.MultipleChoices) {
    return 'success';
  }

  if (status < HttpStatusCode.BadRequest) {
    return 'warning';
  }

  if (status < HttpStatusCode.InternalServerError) {
    return 'danger';
  }

  return 'secondary';
};
