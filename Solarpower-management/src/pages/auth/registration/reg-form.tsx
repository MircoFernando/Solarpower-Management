"use client";

import * as React from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Globe,
  Info,
  Clock,
  LandPlot,
  House,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MultiStepForm } from "./../../../components/multi-step-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";



import { useCreateRegisteredUserMutation } from "./../../../lib/redux/query.js";
import {useGetAllRegisteredUsersQuery } from "./../../../lib/redux/query.js";
import { useUser } from "@clerk/clerk-react";


// Form Schema with all validation
const formSchema = z.object({
  // Step 1 - Personal Info
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  // Step 2 - Registration Details
  country: z.string().min(1, { message: "Please select a country" }),
  timeline: z.string().min(1, { message: "Please select a Timeline" }),
  description: z.string().min(5, { message: "Please enter a description" }),
  // Step 3 - Address
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  postalCode: z.string().min(4, { message: "Postalcode is required" }),
  propertyType: z.string().min(1, { message: "Please select a PropertyType" }),
  roofType: z.string().min(1, { message: "Please select a RoofType" }),
  avgConsumption: z.coerce
    .number()
    .min(5, { message: "Please enter a number" }),
  systemType: z.string().min(1, { message: "Please select a SystemTType" }),
  budget: z.coerce.number().min(5, { message: "Please enter a number" }),
  financing: z.string().min(1, { message: "Please select a Choice" }),
});

const TooltipIcon = ({ text }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const VignettePurchaseFormDemo = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [createRegisteredUser, { isLoading: createLoading }] =
    useCreateRegisteredUserMutation();
  const totalSteps = 4;
  const { user } = useUser();
  const [isSubmitted, SetisSubmitted] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      country: "",
      address: "",
      city: "",
      postalCode: "",
      propertyType: "",
      timeline: "",
      roofType: "",
      avgConsumption: 0,
      systemType: "",
      budget: 0,
      financing: "",
    },
  });

  // countries.ts
  const countries = [
    { code: "af", name: "Afghanistan" },
    { code: "al", name: "Albania" },
    { code: "dz", name: "Algeria" },
    { code: "ar", name: "Argentina" },
    { code: "au", name: "Australia" },
    { code: "at", name: "Austria" },
    { code: "bd", name: "Bangladesh" },
    { code: "be", name: "Belgium" },
    { code: "br", name: "Brazil" },
    { code: "ca", name: "Canada" },
    { code: "cn", name: "China" },
    { code: "dk", name: "Denmark" },
    { code: "eg", name: "Egypt" },
    { code: "fi", name: "Finland" },
    { code: "fr", name: "France" },
    { code: "de", name: "Germany" },
    { code: "gr", name: "Greece" },
    { code: "in", name: "India" },
    { code: "id", name: "Indonesia" },
    { code: "ie", name: "Ireland" },
    { code: "il", name: "Israel" },
    { code: "it", name: "Italy" },
    { code: "jp", name: "Japan" },
    { code: "ke", name: "Kenya" },
    { code: "my", name: "Malaysia" },
    { code: "mx", name: "Mexico" },
    { code: "nl", name: "Netherlands" },
    { code: "nz", name: "New Zealand" },
    { code: "ng", name: "Nigeria" },
    { code: "no", name: "Norway" },
    { code: "pk", name: "Pakistan" },
    { code: "ph", name: "Philippines" },
    { code: "pl", name: "Poland" },
    { code: "pt", name: "Portugal" },
    { code: "ru", name: "Russia" },
    { code: "sa", name: "Saudi Arabia" },
    { code: "sg", name: "Singapore" },
    { code: "za", name: "South Africa" },
    { code: "kr", name: "South Korea" },
    { code: "es", name: "Spain" },
    { code: "lk", name: "Sri Lanka" },
    { code: "se", name: "Sweden" },
    { code: "ch", name: "Switzerland" },
    { code: "th", name: "Thailand" },
    { code: "tr", name: "Turkey" },
    { code: "ua", name: "Ukraine" },
    { code: "ae", name: "United Arab Emirates" },
    { code: "gb", name: "United Kingdom" },
    { code: "us", name: "United States" },
    { code: "vn", name: "Vietnam" },
    { code: "zw", name: "Zimbabwe" },
  ];

  // Get fields to validate for each step
  const getFieldsForStep = (step) => {
    switch (step) {
      case 1:
        return ["firstName", "lastName", "email", "phoneNumber"];

      case 2:
        return ["country", "timeline", "postalCode", "propertyType"];

      case 3:
        return ["address", "city", "roofType"];
      case 4:
        return [
          "avgConsumption",
          "systemType",
          "budget",
          "financing",
          "description",
        ];
      default:
        return [];
    }
  };

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate);

    if (!isValid) return;

    if (currentStep === totalSteps) {
      // Last step - submit form
      form.handleSubmit(onSubmit)();
    } else {
      // Not last step - go to next
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  async function onSubmit(values) {
    const payload = {
      userName: user?.firstName,
      clerkUserId: user?.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: values.address,
      city: values.city,
      country: values.country,
      postalCode: values.postalCode,
      propertyType: values.propertyType,
      roofType: values.roofType,
      avgConsumption: values.avgConsumption,
      systemType: values.systemType,
      timeline: values.timeline,
      budget: values.budget,
      financing: values.financing,
      description: values.description,
    };

    console.log("Backend Payload:", payload);

    try {
      const response = await createRegisteredUser(payload).unwrap();
      console.log("Created Registered User:", response);
      SetisSubmitted(true);
      // Redirect or show success message
    } catch (err) {
      console.error("Create user error:", err);
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <div className="flex items-center h-[80vh]">
      <Form {...form}>
        <MultiStepForm
          currentStep={currentStep}
          totalSteps={totalSteps}
          title="Solar Unit Registration"
          description="Complete all steps to register your solar unit."
          onBack={handleBack}
          onNext={handleNext}
          isSubmitted={isSubmitted}
          onClose={() => alert("Close button clicked!")}
          footerContent={
            <a
              href="#"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Need Help? <ArrowUpRight className="h-4 w-4" />
            </a>
          }
        >
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 2: Registration Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel>Country</FormLabel>
                        <TooltipIcon text="Select the country where your vehicle is registered." />
                      </div>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                            <SelectValue placeholder="Select a country..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel>Installation Timeline</FormLabel>
                        <TooltipIcon text="Select the timeline needed for your requirement." />
                      </div>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <SelectValue placeholder="Select a Timeline..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ASAP">ASAP</SelectItem>{" "}
                          <SelectItem value="1-3 months">1-3 months</SelectItem>{" "}
                          <SelectItem value="3-6 months">3-6 months</SelectItem>{" "}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel>PostalCode</FormLabel>
                        <TooltipIcon text="Enter your Postal code correctly for your region." />
                      </div>
                      <FormControl>
                        <Input placeholder="123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel>Property Type</FormLabel>
                        <TooltipIcon text="Select your specific property type." />
                      </div>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <LandPlot className="h-4 w-4 mr-2 text-muted-foreground" />
                            <SelectValue placeholder="Select a Property..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Residential">
                            Residential
                          </SelectItem>{" "}
                          <SelectItem value="Commercial">Commercial</SelectItem>{" "}
                          <SelectItem value="Industrial">Industrial</SelectItem>{" "}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 3: Address */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roofType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roof Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a roof..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Flat">Flat</SelectItem>
                          <SelectItem value="Sloped">Sloped</SelectItem>
                          <SelectItem value="Metal">Metal</SelectItem>
                          <SelectItem value="Tile">Tile</SelectItem>
                          <SelectItem value="Concrete">Concrete</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 4: Solar Requirements */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="avgConsumption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Your Current Energy Consumption (kWh)
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="systemType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>System Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select system type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Grid-tied">Grid-tied</SelectItem>
                          <SelectItem value="Off-grid">Off-grid</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Budget</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="financing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Financing Required?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel>Other Details</FormLabel>
                      <TooltipIcon text="Please enter any other additional details that are in your requirements." />
                    </div>
                    <FormControl>
                      <Input placeholder="Addidtional Info" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Please review all information before submitting.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </MultiStepForm>
      </Form>
    </div>
  );
};

export default VignettePurchaseFormDemo;
