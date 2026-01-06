import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import type { StepFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ProgressSteps from "./ProgressSteps";
import {
  BillingInfoStep,
  PersonalInfoStep,
  ProfessionalInfoStep,
} from "./Steps";
import { Button } from "./ui/button";

function MultiStepForm() {
  // Custom Hook
  const {
    currentStep, // which step we're on
    formData, //Accumulated data from all steps
    isFirstStep, // Boolean -- are we on step 0?
    isLastStep, // Boolean -- are we on the final step?
    isSubmitted, // Boolean -- has form been submittedd?
    steps, // Array of step metadata (for progress indicator)

    goToNextStep, // Function to advance
    goToPreviousStep, // Function to go back
    updateFormData, //Function to save step data
    submitForm, // Function to final submission
    resetForm, // Function to start over
    getCurrentStepSchema, // Function returning current Zod schema
  } = useMultiStepForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    reset,
  } = useForm<StepFormData>({
    resolver: zodResolver(getCurrentStepSchema()),
    mode: "onChange",
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [currentStep, formData, reset]);

  async function onNext(data: StepFormData) {
    // Manual validation check
    const isValid = await trigger();
    if (!isValid) return; // Stop if validation fails

    console.log(data, formData);
    const updatedData = { ...formData, ...data };
    updateFormData(updatedData);

    // Merge current step data with all previous data
    if (isLastStep) {
      try {
        submitForm(updatedData);
      } catch (error) {
        console.log("Submission failed:", error);
      }
    } else {
      goToNextStep();
    }
  }

  return (
    <div className="min-h-screen items-center justify-center flex bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <ProgressSteps currentStep={currentStep} steps={steps} />
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <PersonalInfoStep register={register} errors={errors} />
          )}
          {currentStep === 1 && (
            <ProfessionalInfoStep
              register={register}
              errors={errors}
              setValue={setValue} // Needed for select component
            />
          )}
          {currentStep === 2 && (
            <BillingInfoStep register={register} errors={errors} />
          )}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              disabled={isFirstStep}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button type="button" onClick={handleSubmit(onNext)}>
              {isLastStep ? "Submit" : "Next"}
              {!isLastStep && <ChevronRight className="w-4 h-4 mr-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MultiStepForm;
