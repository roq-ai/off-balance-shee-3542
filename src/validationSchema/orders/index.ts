import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  status: yup.string().required(),
  inventory_id: yup.string().nullable(),
  customer_id: yup.string().nullable(),
});
