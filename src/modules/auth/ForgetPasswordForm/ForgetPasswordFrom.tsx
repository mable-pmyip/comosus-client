import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { VStack, FormControl, Heading, Text } from '@chakra-ui/react';
import {
  ButtonGray,
  FormErrorMessage,
  FormSuccessMessage,
  InputOutline,
} from '@common/components';

type ForgetPasswordFormProps = {
  onSubmit: (values: ForgetPasswordFormTypes) => void;
  isLoading: boolean;
  isInvalid: boolean;
  successMessage: string;
};
export default function ForgetPasswordForm({
  onSubmit,
  isLoading,
  isInvalid,
  successMessage,
}: ForgetPasswordFormProps) {
  const { t } = useTranslation('auth');

  const formValues = {
    inputs: [
      {
        type: 'email',
        name: 'email',
        placeholder: t('forget-password.email.placeholder'),
      },
    ],
    defaultValues: {
      email: '',
    },
    schema: yup.object({
      email: yup.string().email().required(t('forget-password.email.schema')),
    }),
  };

  const { handleSubmit, control } = useForm<ForgetPasswordFormTypes>({
    defaultValues: formValues.defaultValues,
    resolver: yupResolver(formValues.schema),
    reValidateMode: 'onBlur',
  });

  return (
    <VStack flex={1} justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={isInvalid}>
          <Heading as="h1" size="lg" fontWeight="500" mb={1}>
            {t('forget-password.page-title')}
          </Heading>
          <Text mb={10}>{t('forget-password.page-subtitle')}</Text>
          <Text fontWeight="600" mb={2}>
            {t('forget-password.email.label')}
          </Text>
          <VStack align="stretch" gap="30px">
            {formValues.inputs.map(({ type, name, placeholder }, index) => (
              <InputOutline
                key={index}
                type={type}
                name={name}
                control={control}
                placeholder={placeholder}
              />
            ))}
            <FormErrorMessage error={t('forget-password.error')} />
            <FormSuccessMessage message={successMessage} />
            <ButtonGray type="submit" isLoading={isLoading}>
              {t('forget-password.button')}
            </ButtonGray>
          </VStack>
        </FormControl>
      </form>
    </VStack>
  );
}
