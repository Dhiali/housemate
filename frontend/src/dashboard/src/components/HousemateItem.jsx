import { Avatar, AvatarFallback } from './ui/avatar';



export function HousemateItem({ name, initials, tasks, statusColor, avatarBg, avatar }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <div className="relative">
          {avatar ? (
            <img 
              src={avatar}
              alt={`${name}'s profile`}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <Avatar className={`h-8 w-8 ${avatarBg}`}>
              <AvatarFallback className="text-white text-xs font-medium">{initials}</AvatarFallback>
            </Avatar>
          )}
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${statusColor}`}></div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{tasks}</p>
        </div>
      </div>
    </div>
  );
}
