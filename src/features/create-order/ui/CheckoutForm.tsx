"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui";
import {
  checkoutFormSchema,
  type CheckoutFormValues,
} from "../model/checkoutFormSchema";
import styles from "./CheckoutForm.module.css";

interface CheckoutFormProps {
  onSubmit: (values: CheckoutFormValues) => void;
  isSubmitting: boolean;
}

export const CheckoutForm = ({ onSubmit, isSubmitting }: CheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      country: "",
      city: "",
      street: "",
      postcode: "",
      packagingType: "",
      shippingOption: "",
    },
  });

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      noValidate
    >
      {/* 1. Personal Information */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Personal information</h2>
        <div className={styles.grid}>
          <Input
            label="First name"
            error={errors.firstName?.message}
            disabled={isSubmitting}
            {...register("firstName")}
          />
          <Input
            label="Last name"
            error={errors.lastName?.message}
            disabled={isSubmitting}
            {...register("lastName")}
          />
          <Input
            label="Phone"
            type="tel"
            error={errors.phone?.message}
            disabled={isSubmitting}
            {...register("phone")}
          />
          <Input
            label="E-mail"
            type="email"
            error={errors.email?.message}
            disabled={isSubmitting}
            {...register("email")}
          />
        </div>
      </section>

      {/* 2. Delivery Details */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Delivery details</h2>
        <div className={styles.grid}>
          <Input
            label="Country/ Region"
            error={errors.country?.message}
            disabled={isSubmitting}
            {...register("country")}
          />
          <Input
            label="Town/ City"
            error={errors.city?.message}
            disabled={isSubmitting}
            {...register("city")}
          />
          <Input
            label="Street"
            error={errors.street?.message}
            disabled={isSubmitting}
            {...register("street")}
          />
          <Input
            label="Postcode"
            error={errors.postcode?.message}
            disabled={isSubmitting}
            {...register("postcode")}
          />
          <Input
            label="Packaging type"
            error={errors.packagingType?.message}
            disabled={isSubmitting}
            {...register("packagingType")}
          />
          <Input
            label="Shipping option"
            error={errors.shippingOption?.message}
            disabled={isSubmitting}
            {...register("shippingOption")}
          />
        </div>
      </section>
    </form>
  );
};

CheckoutForm.displayName = "CheckoutForm";
export default CheckoutForm;
