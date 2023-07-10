import * as yup from 'yup';

export const erpValidationSchema = yup.object().shape({
  integration_settings: yup.string().required(),
  organization_id: yup.string().nullable(),
});
