"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea, Button } from "@/shared/ui";
import { successToast, errorToast } from "@/shared/lib/helpers/toast";
import {
  cooperationFormSchema,
  type CooperationFormValues,
} from "../model/cooperationFormSchema";
import styles from "./CooperationForm.module.css";

export const CooperationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CooperationFormValues>({
    resolver: zodResolver(cooperationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      messenger: "",
      message: "",
    },
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Mock API request with 1-second delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      successToast("Your message was sent successfully!");
      reset();
    } catch (error) {
      errorToast(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <div className={styles.grid}>
        <Input
          placeholder="Name*"
          error={errors.name?.message}
          disabled={isSubmitting}
          {...register("name")}
        />
        <Input
          type="email"
          placeholder="E-mail*"
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register("email")}
        />
        <Input
          type="tel"
          placeholder="Phone"
          error={errors.phone?.message}
          disabled={isSubmitting}
          {...register("phone")}
        />
        <Input
          placeholder="Messenger"
          error={errors.messenger?.message}
          disabled={isSubmitting}
          {...register("messenger")}
        />
        <Textarea
          placeholder="Message"
          wrapperClassName={styles.messageWrapper}
          error={errors.message?.message}
          disabled={isSubmitting}
          {...register("message")}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className={styles.submitBtn}
      >
        {isSubmitting ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
};

CooperationForm.displayName = "CooperationForm";
