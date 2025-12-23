import { useState, useEffect } from "react";
import {
  Search,
  User,
  Clock,
  CheckCircle,
  Edit,
  Eye,
  X,
  AlertTriangle,
} from "lucide-react";
import { Button } from "./../../../../../components/ui/button.jsx";
import { useGetAllRegisteredUsersQuery } from "./../../../../../lib/redux/query.js";
import { useUpdateRegisteredUserMutation } from "./../../../../../lib/redux/query.js";

// --- Form Imports ---
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- Validation Schema (Mirrors User Form + Status) ---
const userSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  propertyType: z.string().min(1, "Select a property type"),
  roofType: z.string().min(1, "Select a roof type"),
  avgConsumption: z.coerce.number().min(5, "Enter valid consumption"),
  systemType: z.string().min(1, "Select a system type"),
  timeline: z.string().min(1, "Select a timeline"),
  budget: z.coerce.number().min(5, "Enter valid budget"),
  financing: z.string().optional(),
  status: z.enum(["pending", "approved"]), 
});

const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewSection, setViewSection] = useState("approved");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading, isError, error } = useGetAllRegisteredUsersQuery();
  const [updateUser, { isLoading: createUpdate }] = useUpdateRegisteredUserMutation();

  // --- Form Initialization ---
  const form = useForm({
  resolver: zodResolver(userSchema),
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
    propertyType: "",
    roofType: "",
    avgConsumption: 0,
    systemType: "",
    timeline: "",
    budget: 0,
    financing: "", 
    status: "pending",
  },
});

  // --- Populate Form when User Selected ---
  useEffect(() => {
  if (selectedUser) {
    form.reset({
      firstName: selectedUser.firstName || "",
      lastName: selectedUser.lastName || "",
      email: selectedUser.email || "",
      phoneNumber: selectedUser.phoneNumber || "",
      address: selectedUser.address || "",
      city: selectedUser.city || "",
      postalCode: selectedUser.postalCode || "",
      propertyType: selectedUser.propertyType || "",
      roofType: selectedUser.roofType || "",
      avgConsumption: selectedUser.avgConsumption || 0,
      systemType: selectedUser.systemType || "",
      timeline: selectedUser.timeline || "",
      budget: selectedUser.budget || 0,
      financing: selectedUser.financing || "", 
      status: selectedUser.status || "pending",
    });
  }
}, [selectedUser, form]);

  const onSubmit = async (values) => {
    console.log("Updated Values:", values);
    console.log("User ID:", selectedUser._id);

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: values.address,
      city: values.city,
      postalCode: values.postalCode,
      propertyType: values.propertyType,
      roofType: values.roofType,
      avgConsumption: values.avgConsumption,
      systemType: values.systemType,
      timeline: values.timeline,
      budget: values.budget,
      financing: values.financing || selectedUser.financing,
      status: values.status,
    };

    console.log("Payload to send:", payload);

    try {
      const user = await updateUser({
        id: selectedUser._id,
        body: payload,
      }).unwrap();

      console.log("Updated user successfully:", user);
      alert("✅ User updated successfully!");

      // Close modal and refresh
      setIsEditMode(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Update user error:", err);
      alert(
        `❌ Error: ${
          err?.data?.message || err.message || "Failed to update user"
        }`
      );
    }
  };

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

  // Filter Logic
  const acceptedUsers =
    data?.filter((user) => user.status === "approved") || [];
  const pendingUsers = data?.filter((user) => user.status === "pending") || [];
  const currentUsers =
    viewSection === "approved" ? acceptedUsers : pendingUsers;

  const filteredUsers = currentUsers.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsEditMode(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsEditMode(false);
    form.reset(); // Clear form
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-dark mb-2">
          Users Management
        </h1>
        <p className="text-gray-600">
          Manage all users and their solar unit installations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Users</p>
              <p className="text-3xl font-bold text-primary-dark mt-1">
                {acceptedUsers.length}
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl shadow-md border border-yellow-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-800 text-sm font-medium">
                Pending Users
              </p>
              <p className="text-3xl font-bold text-yellow-700 mt-1">
                {pendingUsers.length}
              </p>
            </div>
            <div className="bg-yellow-200 p-4 rounded-full">
              <Clock className="w-8 h-8 text-yellow-700" />
            </div>
          </div>
          <p className="text-xs text-yellow-700 mt-2">
            Awaiting solar unit installation
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setViewSection("approved")}
                className={
                  viewSection === "approved"
                    ? "bg-primary"
                    : "bg-gray-200 text-gray-700"
                }
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Active Users ({acceptedUsers.length})
              </Button>
              <Button
                onClick={() => setViewSection("pending")}
                className={
                  viewSection === "pending"
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-gray-200 text-gray-700"
                }
              >
                <Clock className="w-4 h-4 mr-2" />
                Pending ({pendingUsers.length})
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className={`border-b border-gray-200 ${
                viewSection === "pending" ? "bg-yellow-50" : "bg-gray-50"
              }`}
            >
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  SolarUnit SN
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y divide-gray-200 ${
                viewSection === "pending" ? "bg-yellow-50/30" : "bg-white"
              }`}
            >
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      viewSection === "pending"
                        ? "border-l-4 border-yellow-500"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            viewSection === "pending"
                              ? "bg-yellow-100"
                              : "bg-primary/10"
                          }`}
                        >
                          <User
                            className={`w-5 h-5 ${
                              viewSection === "pending"
                                ? "text-yellow-600"
                                : "text-primary"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                       {user._id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.phoneNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.city}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "approved"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {user.status === "approved" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          user.solarUnitSerialNo === "not assigned"
                            ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                            : "bg-green-100 text-green-700 border border-green-200"
                        }`}
                      >
                        {user.solarUnitSerialNo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No {viewSection === "pending" ? "pending" : "active"} users
                    found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className={`px-6 py-4 border-t border-gray-200 ${
            viewSection === "pending" ? "bg-yellow-50" : "bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold">{filteredUsers.length}</span> of{" "}
              <span className="font-semibold">{currentUsers.length}</span>{" "}
              {viewSection === "pending" ? "pending" : "active"} users
            </p>
            {viewSection === "pending" && (
              <p className="text-sm text-yellow-700 font-semibold">
                ⚠ These users are awaiting solar unit installation
              </p>
            )}
          </div>
        </div>
      </div>

      {/* User Detail/Edit Modal with Form Handling */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div
                  className={`p-6 border-b ${
                    selectedUser.status === "pending"
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {isEditMode ? "Edit User" : "User Details"}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {selectedUser.firstName} {selectedUser.lastName}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input disabled={!isEditMode} {...field} />
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
                              <Input disabled={!isEditMode} {...field} />
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
                              <Input disabled={!isEditMode} {...field} />
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
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input disabled={!isEditMode} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input disabled={!isEditMode} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input disabled={!isEditMode} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input disabled={!isEditMode} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Property Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Property & System Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="propertyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!isEditMode}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Residential">
                                  Residential
                                </SelectItem>
                                <SelectItem value="Commercial">
                                  Commercial
                                </SelectItem>
                                <SelectItem value="Industrial">
                                  Industrial
                                </SelectItem>
                              </SelectContent>
                            </Select>
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
                              defaultValue={field.value}
                              disabled={!isEditMode}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Flat">Flat</SelectItem>
                                <SelectItem value="Sloped">Sloped</SelectItem>
                                <SelectItem value="Metal">Metal</SelectItem>
                                <SelectItem value="Tile">Tile</SelectItem>
                                <SelectItem value="Concrete">
                                  Concrete
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="avgConsumption"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Avg Consumption (kWh)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                disabled={!isEditMode}
                                {...field}
                              />
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
                              defaultValue={field.value}
                              disabled={!isEditMode}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Grid-tied">
                                  Grid-tied
                                </SelectItem>
                                <SelectItem value="Off-grid">
                                  Off-grid
                                </SelectItem>
                                <SelectItem value="Hybrid">Hybrid</SelectItem>
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
                            <FormLabel>Timeline</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!isEditMode}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ASAP">ASAP</SelectItem>
                                <SelectItem value="1-3 months">
                                  1-3 months
                                </SelectItem>
                                <SelectItem value="3-6 months">
                                  3-6 months
                                </SelectItem>
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
                            <FormLabel>Budget</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                disabled={!isEditMode}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div
                    className={`p-4 rounded-lg ${
                      selectedUser.status === "pending"
                        ? "bg-yellow-50 border border-yellow-200"
                        : "bg-green-50 border border-green-200"
                    }`}
                  >
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={!isEditMode}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="approved">Accepted</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="financing"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Financing Option</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={!isEditMode}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select financing" />
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
                    {selectedUser.status === "pending" && (
                      <p className="text-sm text-yellow-700 mt-2">
                        ⚠ This user is awaiting solar unit installation
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t bg-gray-50 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  {isEditMode ? (
                    <button
                      type="submit"
                      disabled={
                        !form.formState.isValid || form.formState.isSubmitting
                      }
                      className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditMode(true)}
                      className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors"
                    >
                      Edit User
                    </button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
