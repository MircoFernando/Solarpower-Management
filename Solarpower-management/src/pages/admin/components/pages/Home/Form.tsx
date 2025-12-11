"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useCreateSolarUnitMutation, useGetAllNewUsersQuery } from "../../../../../lib/redux/query"
import { Button } from "../../../../../components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../../components/ui/form"
import { Input } from "../../../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../components/ui/select"

const formSchema = z.object({
  serialNumber: z.string().min(2),
  capacity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0),
  installationDate: z.string(),
  status: z.enum(["active", "inactive", "maintenance"]),
  userId: z.string().min(1, { message: "User is required" }),
})

export function AddSolarUnit() {
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serialNumber: "",
      capacity: "",
      installationDate: "",
      status: "",
      userId: "",
    },
  })

  const [createSolarUnit, { isLoading: createLoading }] = useCreateSolarUnitMutation();
  
  // Fetch new users
  const { data, isLoading, isError, error } = useGetAllNewUsersQuery();

  const userDetails = data?.map((el) => ({
    id: el._id,
    name: el.userName,
    email: el.email,
    clerkUserId: el.clerkUserId,
  })) || []

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error fetching Users: {error.toString()}
        </div>
      </div>
    );
  }

  // Mutation HOOK (Top-level)
  

  async function onSubmit(values) {
    const payload = {
      serial_number: values.serialNumber,
      capacity: Number(values.capacity),
      installation_date: values.installationDate,
      status: values.status,
      userId: values.userId,
    }

    console.log("Backend Payload:", payload)

    try {
      const response = await createSolarUnit(payload).unwrap()
      console.log("Created new Solar Unit:", response)
    } catch (err) {
      console.error("Create solar unit error:", err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-xl">
      <Form {...form}>
        <div className="space-y-6">

          {/* Serial Number */}
          <FormField
            control={form.control}
            name="serialNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serial Number</FormLabel>
                <FormControl>
                  <Input placeholder="SN12345ABC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Capacity */}
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity (kW)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Installation Date */}
          <FormField
            control={form.control}
            name="installationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Installation Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Users */}
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select New User</FormLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {userDetails.length > 0 ? (
                      userDetails.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled>- No users available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="button" onClick={form.handleSubmit(onSubmit)} disabled={createLoading}>
              {createLoading ? "Adding..." : "Add Solar Unit"}
            </Button>
          </div>

        </div>
      </Form>
    </div>
  )
}

export default AddSolarUnit
