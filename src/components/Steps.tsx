import type { StepFormData } from "@/types";
import type { useForm } from "react-hook-form";
import FormField from "./FormField";
import { CardTitle } from "./ui/card";
import { Label } from "./ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface StepProps {
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  errors: Record<string, { message?: string }>;
  setValue?: ReturnType<typeof useForm<StepFormData>>["setValue"];
}

function PersonalInfoStep({ register, errors }: StepProps) {
  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">Personal Information</CardTitle>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="firstName"
          label="First Name"
          register={register}
          errors={errors}
        />
        <FormField
          id="lastName"
          label="Last Name"
          register={register}
          errors={errors}
        />
      </div>
      <FormField
        id="email"
        label="Email Address"
        register={register}
        errors={errors}
        type="email"
      />
      <FormField
        id="phone"
        label="Phone Number"
        register={register}
        errors={errors}
        type="tel"
      />
    </div>
  );
}

function ProfessionalInfoStep({ register, errors, setValue }: StepProps) {
  const [experience, setExperience] = useState("");

  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">Professional Information</CardTitle>
      <FormField
        id="company"
        label="Company"
        register={register}
        errors={errors}
      />
      <FormField
        id="position"
        label="Position"
        register={register}
        errors={errors}
      />
      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience</Label>
        <Select
          onValueChange={(value) => {
            setValue?.(
              "experience",
              value as Extract<
                StepFormData,
                { experience: string }
              >["experience"],
              { shouldValidate: true } // Trigger validation immediately
            );

            setExperience(value);
          }}
          value={experience}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select experience " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-2">0-2 years</SelectItem>
            <SelectItem value="3-5">3-5 years</SelectItem>
            <SelectItem value="6-10">6-10 years</SelectItem>
            <SelectItem value="10+">10+ years</SelectItem>
          </SelectContent>
        </Select>

        {errors.experience && (
          <p className="text-sm text-destructive">
            {errors.experience.message}
          </p>
        )}
      </div>

      <FormField
        id="industry"
        label="Industry"
        register={register}
        errors={errors}
      />
    </div>
  );
}

function BillingInfoStep({ register, errors }: StepProps) {
  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">Billing Information</CardTitle>

      <FormField
        id="cardNumber"
        label="Card Number"
        register={register}
        errors={errors}
        maxLength={16}
      />
      <FormField
        id="cardHolder"
        label="Card Holder"
        register={register}
        errors={errors}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="expiryDate"
          label="Expiry Date"
          register={register}
          errors={errors}
          maxLength={5}
        />
        <FormField
          id="cvv"
          label="CVV"
          register={register}
          errors={errors}
          maxLength={4}
        />
      </div>
    </div>
  );
}

export { BillingInfoStep, PersonalInfoStep, ProfessionalInfoStep };
