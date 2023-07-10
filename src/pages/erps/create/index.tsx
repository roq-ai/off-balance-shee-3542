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
import { createErp } from 'apiSdk/erps';
import { Error } from 'components/error';
import { erpValidationSchema } from 'validationSchema/erps';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { ErpInterface } from 'interfaces/erp';

function ErpCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ErpInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createErp(values);
      resetForm();
      router.push('/erps');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ErpInterface>({
    initialValues: {
      integration_settings: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: erpValidationSchema,
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
            Create Erp
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="integration_settings" mb="4" isInvalid={!!formik.errors?.integration_settings}>
            <FormLabel>Integration Settings</FormLabel>
            <Input
              type="text"
              name="integration_settings"
              value={formik.values?.integration_settings}
              onChange={formik.handleChange}
            />
            {formik.errors.integration_settings && (
              <FormErrorMessage>{formik.errors?.integration_settings}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
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
    entity: 'erp',
    operation: AccessOperationEnum.CREATE,
  }),
)(ErpCreatePage);
