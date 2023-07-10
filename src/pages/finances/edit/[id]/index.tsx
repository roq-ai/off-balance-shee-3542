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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getFinanceById, updateFinanceById } from 'apiSdk/finances';
import { Error } from 'components/error';
import { financeValidationSchema } from 'validationSchema/finances';
import { FinanceInterface } from 'interfaces/finance';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { InventoryInterface } from 'interfaces/inventory';
import { getInventories } from 'apiSdk/inventories';

function FinanceEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<FinanceInterface>(
    () => (id ? `/finances/${id}` : null),
    () => getFinanceById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FinanceInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFinanceById(id, values);
      mutate(updated);
      resetForm();
      router.push('/finances');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<FinanceInterface>({
    initialValues: data,
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
            Edit Finance
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="financial_details" mb="4" isInvalid={!!formik.errors?.financial_details}>
              <FormLabel>Financial Details</FormLabel>
              <Input
                type="text"
                name="financial_details"
                value={formik.values?.financial_details}
                onChange={formik.handleChange}
              />
              {formik.errors.financial_details && (
                <FormErrorMessage>{formik.errors?.financial_details}</FormErrorMessage>
              )}
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(FinanceEditPage);
