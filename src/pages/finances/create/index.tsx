import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createFinance } from 'apiSdk/finances';
import { Error } from 'components/error';
import { financeValidationSchema } from 'validationSchema/finances';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { InventoryInterface } from 'interfaces/inventory';
import { getInventories } from 'apiSdk/inventories';
import { FinanceInterface } from 'interfaces/finance';

function FinanceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FinanceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFinance(values);
      resetForm();
      router.push('/finances');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FinanceInterface>({
    initialValues: {
      financial_details: '',
      inventory_id: (router.query.inventory_id as string) ?? null,
    },
    validationSchema: financeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Finance
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="financial_details" mb="4" isInvalid={!!formik.errors?.financial_details}>
            <FormLabel>Financial Details</FormLabel>
            <Input
              type="text"
              name="financial_details"
              value={formik.values?.financial_details}
              onChange={formik.handleChange}
            />
            {formik.errors.financial_details && <FormErrorMessage>{formik.errors?.financial_details}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<InventoryInterface>
            formik={formik}
            name={'inventory_id'}
            label={'Select Inventory'}
            placeholder={'Select Inventory'}
            fetcher={getInventories}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'finance',
    operation: AccessOperationEnum.CREATE,
  }),
)(FinanceCreatePage);
