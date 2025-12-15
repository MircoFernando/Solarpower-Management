import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "./../../../../../components/ui/button.jsx";
import UserRow from "./users-row.jsx";
import { User } from "lucide-react";
import { useGetAllUsersQuery } from "./../../../../../lib/redux/query.js";
import { useGetAllNewUsersQuery } from "./../../../../../lib/redux/query.js";
import { useGetAllSolarUnitsQuery } from "../../../../../lib/redux/query";

const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewNewUsers, setViewNewUsers] = useState(false);

 //TODO : Use the registered user query to get the registered users and see new users filter users using status field, and when assigning users use rgusers when assigned change the status to accepted

  const { data, isLoading, isError, error } = useGetAllUsersQuery();
  const { data: SolarUnits, isLoading: isLoadingSolarUnits , isError: isErrorSolarUnits , error:errorSolarUnits } = useGetAllSolarUnitsQuery();

  const {
    data: newUser,
    isLoading: newUsersloading,
    isError: isErrorNewUsers,
    error: ErrorNewUsers,
  } = useGetAllNewUsersQuery();
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

  if (newUsersloading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isErrorNewUsers) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error fetching Users: {error.toString()}
        </div>
      </div>
    );
  }

  const userDetails = data.map((user) => {
  const matchedUnit = SolarUnits.find(
    (unit) => unit.userID === user._id
  );

  return {
    id: user._id,
    name: user.userName,
    email: user.email,
    serialNumber: matchedUnit ? matchedUnit.serial_number : "Not Assigned",
  };
});


  const newUsers =
    newUser?.map((el) => ({
      id: el._id,
      name: el.userName,
      email: el.email,
      clerkUserId: el.clerkUserId,
    })) || [];

  const { user } = useUser();
  console.log("Clerk User: ", user);

  // MOCK DATA - Replace with your actual data fetch

  // const filteredUsers = userDetails?.filter(user => {
  //   const matchesSearch = user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //                        user.email.toLowerCase().includes(searchQuery.toLowerCase());

  //   return matchesSearch;
  // });

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-dark mb-2">
          Users Management
        </h1>
        <p className="text-gray-600">Manage all users and their permissions</p>
      </div>

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

            <div className="flex gap-5">
              <Button onClick={() => setViewNewUsers(false)}>View All</Button>
              <Button onClick={() => setViewNewUsers(true)}>New Users</Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Serial Number
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            {viewNewUsers ? (
              <tbody className=" divide-y divide-gray-200 bg-red-200">
                {newUsers.length > 0 ? (
                  newUsers.map((user) => <UserRow key={user.id} user={user} />)
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No new users found
                    </td>
                  </tr>
                )}
              </tbody>
            ) : (
              <tbody className="bg-white divide-y divide-gray-200">
                {userDetails.length > 0 ? (
                  userDetails.map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing{" "}
              {viewNewUsers ? (
                <>
                  <span className="font-semibold">{newUsers.length}</span> new
                  users
                  <br/>
                  <span className="font-bold text-red-500">Assign Users to Solar Units</span>
                </>
              ) : (
                <>
                  <span className="font-semibold">{userDetails.length}</span>{" "}
                  users
                  
                </>
              )}
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
                Previous
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm font-medium">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
