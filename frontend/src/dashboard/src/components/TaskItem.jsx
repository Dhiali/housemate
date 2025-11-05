import { ReactNode } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

export function TaskItem({
  id,
  icon,
  title,
  description,
  assignedTo,
  status,
  dueDate,
  priority,
  avatarInitials,
  avatar,
  onStatusChange,
  onDelete,
  isOverdue = false,
  overdueDays = 0,
  isAdmin = false,
  canEdit = true
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH PRIORITY':
        return 'bg-red-100 text-red-700';
      case 'MEDIUM PRIORITY':
        return 'bg-yellow-100 text-yellow-700';
      case 'LOW PRIORITY':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg mt-1">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 mb-3">{description}</p>
            <div className="flex items-center space-x-4 mb-2">
              <Badge 
                variant="outline" 
                className={`text-xs px-2 py-1 ${getStatusColor(status)}`}
              >
                {status}
              </Badge>
              {isOverdue ? (
                <span className="text-xs">
                  <span className="text-gray-500">{dueDate}</span>
                  {overdueDays > 0 && (
                    <span className="text-red-600 font-bold ml-1">
                      - {overdueDays} day{overdueDays !== 1 ? 's' : ''} overdue
                    </span>
                  )}
                </span>
              ) : (
                <span className="text-xs text-gray-500">{dueDate}</span>
              )}
              <Badge 
                className={`text-xs px-2 py-1 ${getPriorityColor(priority)}`}
              >
                {priority}
              </Badge>
            </div>
            <div className="text-xs text-gray-500">
              Assigned to <span className="font-medium text-gray-700">{assignedTo}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2 ml-4">
          <Avatar className="h-8 w-8">
            {avatar ? (
              <AvatarImage src={avatar} alt={`${assignedTo}'s profile`} />
            ) : null}
            <AvatarFallback className="text-xs">{avatarInitials}</AvatarFallback>
          </Avatar>
          <div className={`w-2 h-2 rounded-full ${
            priority === 'HIGH PRIORITY' ? 'bg-red-500' :
            priority === 'MEDIUM PRIORITY' ? 'bg-yellow-500' :
            'bg-green-500'
          }`}></div>
          
          {/* Admin Controls */}
          <div className="flex flex-col space-y-2">
            {/* Status dropdown - show for admins or if user can edit */}
            {(isAdmin || canEdit) && (
              <div className="w-24">
                <Select 
                  value={status} 
                  onValueChange={value => onStatusChange && onStatusChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {status === 'Overdue' ? (
                      // For overdue tasks, only allow completion
                      <SelectItem value="Completed">Completed</SelectItem>
                    ) : (
                      // For other tasks, show all options
                      <>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* Delete button - only for admins */}
            {isAdmin && onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(id)}
                className="w-24 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
