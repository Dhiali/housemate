

export function ActivityItem({ user, action, timeAgo, color, avatar }) {
  return (
    <div className="flex items-start space-x-3 py-3">
      {avatar && avatar.trim() !== '' ? (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
          <img 
            src={avatar}
            alt={`${user}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className={`w-2 h-2 rounded-full mt-2 ${color}`}></div>
      )}
      <div className="flex-1">
        <p className="text-sm text-gray-900">
          <span className="font-medium">{user}</span> {action}
        </p>
        <p className="text-xs text-gray-500">{timeAgo}</p>
      </div>
    </div>
  );
}
