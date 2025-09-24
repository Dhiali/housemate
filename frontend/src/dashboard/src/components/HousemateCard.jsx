import { ReactNode } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Mail, Phone, Eye, EyeOff, MessageCircle } from 'lucide-react';



export function HousemateCard({
  id,
  name,
  initials,
  email,
  phone,
  role,
  avatarBg,
  lastActive,
  isOnline,
  joinedDate,
  tasksCompleted,
  tasksAssigned,
  totalBillsPaid,
  preferredContact,
  showContact,
  bio,
  onContactToggle,
  onViewDetails
}) {
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'standard':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'read-only':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className={`w-12 h-12 ${avatarBg} rounded-full flex items-center justify-center`}>
              <span className="text-white font-medium">{initials}</span>
            </div>
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Badge 
                variant="outline" 
                className={`text-xs ${getRoleColor(role)}`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Badge>
              <span className="text-sm text-gray-500">
                {isOnline ? 'Online' : `Last seen ${getTimeAgo(lastActive)}`}
              </span>
            </div>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails?.({
            id, name, initials, email, phone, role, avatarBg, lastActive,
            isOnline, joinedDate, tasksCompleted, tasksAssigned, totalBillsPaid,
            preferredContact, showContact, bio
          })}
        >
          View Details
        </Button>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-600 mb-4">{bio}</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{tasksCompleted}</div>
          <div className="text-xs text-gray-500">Tasks Done</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{tasksAssigned}</div>
          <div className="text-xs text-gray-500">Pending</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">R{totalBillsPaid.toFixed(0)}</div>
          <div className="text-xs text-gray-500">Bills Paid</div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-900">Contact Information</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onContactToggle?.(id)}
            className="h-6 w-6 p-0"
          >
            {showContact ? (
              <Eye size={14} className="text-gray-500" />
            ) : (
              <EyeOff size={14} className="text-gray-500" />
            )}
          </Button>
        </div>
        
        {showContact ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Mail size={14} className="text-gray-400" />
              <span className="text-gray-600">{email}</span>
              {preferredContact === 'email' && (
                <Badge variant="secondary" className="text-xs">Preferred</Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone size={14} className="text-gray-400" />
              <span className="text-gray-600">{phone}</span>
              {preferredContact === 'phone' && (
                <Badge variant="secondary" className="text-xs">Preferred</Badge>
              )}
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">Contact info hidden</div>
        )}
      </div>

      {/* Member since */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Member since {formatDate(joinedDate)}
        </div>
      </div>
    </div>
  );
}
