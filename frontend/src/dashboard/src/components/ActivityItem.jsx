

export function ActivityItem({ user, action, timeAgo, color }) {
  return (
    <div className="flex items-start space-x-3 py-3">
      <div className={`w-2 h-2 rounded-full mt-2 ${color}`}></div>
      <div className="flex-1">
        <p className="text-sm text-gray-900">
          <span className="font-medium">{user}</span> {action}
        </p>
        <p className="text-xs text-gray-500">{timeAgo}</p>
      </div>
    </div>
  );
}
