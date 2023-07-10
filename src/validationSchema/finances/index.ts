import * as yup from 'yup';

export const financeValidationSchema = yup.object().shape({
  financial_details: yup.string().required(),
  inventory_id: yup.string().nullable(),
});
