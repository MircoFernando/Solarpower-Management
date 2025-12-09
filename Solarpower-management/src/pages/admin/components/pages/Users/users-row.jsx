import { useState } from "react";
import { User, Mail, Shield, Calendar, MoreVertical, Edit, Trash2, Eye, Search } from "lucide-react";

const UserRow = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const getRoleBadge = (role) => {
  //   switch (role?.toLowerCase()) {
  //     case 'admin':
  //       return 'bg-primary-dark text-white';
  //     case 'moderator':
  //       return 'bg-primary text-white';
  //     case 'user':
  //       return 'bg-gray-200 text-gray-700';
  //     default:
  //       return 'bg-gray-200 text-gray-700';
  //   }
  // };

  return (
    <tr className="hover:bg-gray-50 transition-colors border-b border-gray-200">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{user.name}</p>
            {/* <p className="text-sm text-gray-500">{user.lastName || ''}</p> */}
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{user.email}</span>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          {user.createdAt}
        </div>
      </td>
      
      <td className="px-6 py-4 text-right relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
        
        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48 z-20">
              <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm text-gray-700">
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm text-gray-700">
                <Edit className="w-4 h-4" />
                Edit User
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm text-red-600">
                <Trash2 className="w-4 h-4" />
                Delete User
              </button>
            </div>
          </>
        )}
      </td>
    </tr>
  );
};

export default UserRow;