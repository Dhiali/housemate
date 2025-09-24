import { 
  Home, 
  CheckSquare, 
  FileText, 
  Calendar, 
  Users, 
  Settings,
  Plus,
  CalendarDays,
  CreditCard,
  Trash2,
  Brush,
  Wifi,
  Sparkles,
  Clock,
  CheckCircle,
  AlertTriangle,
  ShoppingBag,
  Cog,
  MoreHorizontal,
  Zap,
  Droplets,
  Wrench,
  Mail,
  Phone,
  Eye,
  EyeOff,
  MessageCircle,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Download,
  Upload,
  Key,
  Camera,
  MapPin,
  Smartphone,
  Monitor,
  Volume2,
  Lock,
  Database,
  HelpCircle
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Badge } from './components/ui/badge';
import { Switch } from './components/ui/switch';
import { Separator } from './components/ui/separator';
import { StatsCard } from './components/StatsCard';
import { TaskItem } from './components/TaskItem';
import { QuickAction } from './components/QuickAction';
import { ActivityItem } from './components/ActivityItem';
import { HousemateItem } from './components/HousemateItem';
import { HousemateCard } from './components/HousemateCard';
import { BillItem } from './components/BillItem';
import { SettingsContent } from './components/SettingsContent';

export default function App() {
  console.log("App component is rendering");
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [tasks, setTasks] = useState([
    {
      icon: <Sparkles size={16} className="text-purple-600" />,
      title: 'Clean Kitchen',
      description: 'Deep clean kitchen counters, sink, and appliances',
      assignedTo: 'Sarah M.',
  status: 'Pending',
  dueDate: 'Due Today',
  priority: 'HIGH PRIORITY',
      avatarInitials: 'SM'
    },
    {
      icon: <Trash2 size={16} className="text-gray-600" />,
      title: 'Take Out Trash',
      description: 'Empty all trash bins and take to curb',
      assignedTo: 'Mike R.',
  status: 'Pending',
  dueDate: 'Due Tomorrow',
  priority: 'MEDIUM PRIORITY',
      avatarInitials: 'MR'
    },
    {
      icon: <Brush size={16} className="text-blue-600" />,
      title: 'Vacuum Living Room',
      description: 'Vacuum carpet and clean under furniture',
      assignedTo: 'You',
  status: 'In Progress',
  dueDate: 'Due Dec 18',
  priority: 'LOW PRIORITY',
      avatarInitials: 'YO'
    },
    {
      icon: <Wifi size={16} className="text-blue-600" />,
      title: 'Pay Internet Bill',
      description: 'Monthly internet service payment due',
      assignedTo: 'Alex K.',
  status: 'Overdue',
      dueDate: 'Due Dec 20',
  priority: 'HIGH PRIORITY',
      avatarInitials: 'AK'
    },
    {
      icon: <Sparkles size={16} className="text-purple-600" />,
      title: 'Clean Bathroom',
      description: 'Clean toilet, shower, and mirror',
      assignedTo: 'Sarah M.',
  status: 'Pending',
  dueDate: 'Due Dec 22',
  priority: 'MEDIUM PRIORITY',
      avatarInitials: 'SM'
    }
  ]);
  
  const [bills, setBills] = useState([
    {
      id: 1,
      icon: <Zap size={20} className="text-yellow-600" />,
      title: 'Electricity Bill',
      description: 'Monthly electricity usage',
      amount: 180.50,
      perPerson: 45.13,
      paid: 0,
  status: 'Pending',
      dueDate: '2024-12-15',
      isOverdue: true
    },
    {
      id: 2,
      icon: <Wifi size={20} className="text-blue-600" />,
      title: 'Internet Bill',
      description: 'High-speed internet service',
      amount: 89.99,
      perPerson: 22.50,
      paid: 44.99,
  status: 'Partially Paid',
      dueDate: '2024-12-20',
      isOverdue: true
    },
    {
      id: 3,
      icon: <ShoppingBag size={20} className="text-green-600" />,
      title: 'Grocery Shopping',
      description: 'Weekly grocery run - Whole Foods',
      amount: 156.78,
      perPerson: 39.20,
      paid: 156.78,
  status: 'Overdue',
      dueDate: '2024-12-12',
      isOverdue: true
    },
    {
      id: 4,
      icon: <Droplets size={20} className="text-blue-500" />,
      title: 'Water Bill',
      description: 'Monthly water and sewage',
      amount: 67.25,
      perPerson: 16.81,
      paid: 67.25,
  status: 'Paid',
      dueDate: '2024-12-25',
      isOverdue: false
    },
    {
      id: 5,
      icon: <Sparkles size={20} className="text-purple-600" />,
      title: 'House Cleaning Service',
      description: 'Bi-weekly deep cleaning',
      amount: 120.00,
      perPerson: 30.00,
      paid: 0,
  status: 'Pending',
      dueDate: '2024-12-18',
      isOverdue: true
    }
  ]);
  
  const houseEvents = [
    {
      id: 1,
      title: 'House Meeting',
      description: 'Monthly house meeting to discuss bills and responsibilities',
      date: '2024-12-20',
      time: '19:00',
      type: 'meeting',
      attendees: ['Sarah M.', 'Mike R.', 'Alex K.', 'You'],
      color: 'purple'
    },
    {
      id: 2,
      title: 'Cleaning Schedule Rotation',
      description: 'Weekly deep cleaning rotation - Kitchen focus',
      date: '2024-12-22',
      time: '10:00',
      type: 'recurring',
      attendees: ['All'],
      color: 'purple'
    }
  ];
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    dueDate: '',
    assignedTo: '',
    createdBy: 'You',
    priority: 'MEDIUM PRIORITY'
  });
  
  const [isBillFormOpen, setIsBillFormOpen] = useState(false);
  const [billFormData, setBillFormData] = useState({
    category: '',
    title: '',
    description: '',
    amount: '',
    dueDate: '',
    createdBy: 'You',
    splitMethod: 'equal',
    customSplits: {}
  });
  
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [paymentFormData, setPaymentFormData] = useState({
    amount: '',
    paymentMethod: '',
    datePaid: new Date().toISOString().split('T')[0], // Today's date
    notes: ''
  });
  
  // Schedule page state
  const [scheduleView, setScheduleView] = useState('month');
  const [scheduleFilters, setScheduleFilters] = useState({
    tasks: true,
    bills: true,
    events: true
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'meeting',
    attendees: ['All']
  });
  
  // Housemates page state
  const [selectedHousemate, setSelectedHousemate] = useState(null);
  const [isHousemateDetailOpen, setIsHousemateDetailOpen] = useState(false);
  const [isInviteHousemateOpen, setIsInviteHousemateOpen] = useState(false);
  const [isManageRolesOpen, setIsManageRolesOpen] = useState(false);
  const [selectedActivityType, setSelectedActivityType] = useState(null);
  const [inviteFormData, setInviteFormData] = useState({
    name: '',
    email: '',
    role: 'standard',
    sendInviteEmail: true,
    personalMessage: ''
  });
  
  // Settings page state
  const [settingsTab, setSettingsTab] = useState('profile');
  const [profileSettings, setProfileSettings] = useState({
    name: 'You',
    email: 'your.email@email.com',
    phone: '+1 (555) 321-0987',
    bio: 'House co-admin. Manages the household dashboard and coordinates activities.',
    preferredContact: 'email',
    timezone: 'America/New_York',
    language: 'en'
  });
  
  const [householdSettings, setHouseholdSettings] = useState({
    houseName: 'Our Shared Home',
    address: '123 Main Street, Anytown, ST 12345',
    currency: 'USD',
    currencySymbol: '$',
    defaultSplitMethod: 'equal',
    taskAutoAssign: false,
    billReminderDays: 3
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    taskReminders: true,
    billReminders: true,
    houseEvents: true,
    newMemberJoined: true,
    taskCompleted: false,
    weeklyDigest: true
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    showContactInfo: true,
    showActivity: true,
    shareTaskHistory: true,
    shareBillHistory: true,
    allowDirectMessages: true,
    publicProfile: false
  });
  
  const [appSettings, setAppSettings] = useState({
    theme: 'light',
    compactMode: false,
    soundEnabled: true,
    animationsEnabled: true,
    autoSave: true,
    showTips: true
  });
  
  const sidebarItems = [
    { icon: <Home size={20} />, label: 'Dashboard', active: currentPage === 'Dashboard' },
    { icon: <CheckSquare size={20} />, label: 'Tasks', active: currentPage === 'Tasks' },
    { icon: <FileText size={20} />, label: 'Bills', active: currentPage === 'Bills' },
    { icon: <Calendar size={20} />, label: 'Schedule', active: currentPage === 'Schedule' },
    { icon: <Users size={20} />, label: 'Housemates', active: currentPage === 'Housemates' },
    { icon: <Settings size={20} />, label: 'Settings', active: currentPage === 'Settings' },
  ];

  const categories = [
    {
      id: 'cleaning',
      name: 'Cleaning',
      icon: <Trash2 size={20} className="text-blue-600" />,
      description: 'Household task'
    },
    {
      id: 'bills',
      name: 'Bills & Payments',
      icon: <CreditCard size={20} className="text-green-600" />,
      description: 'Household task'
    },
    {
      id: 'shopping',
      name: 'Shopping',
      icon: <ShoppingBag size={20} className="text-purple-600" />,
      description: 'Household task'
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      icon: <Cog size={20} className="text-orange-600" />,
      description: 'Household task'
    },
    {
      id: 'other',
      name: 'Other',
      icon: <MoreHorizontal size={20} className="text-gray-600" />,
      description: 'Household task'
    }
  ];

  const locations = ['Kitchen', 'Living Room', 'Bathroom', 'Bedroom', 'Office', 'Garage', 'Garden', 'Other'];
  const housemates = ['Sarah M.', 'Mike R.', 'Alex K.', 'You'];
  
  const housemateProfiles = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      initials: 'SM',
      email: 'sarah.mitchell@email.com',
      phone: '+1 (555) 123-4567',
      role: 'admin',
      avatarBg: 'bg-blue-500',
      lastActive: '2024-12-15T14:30:00Z',
      isOnline: true,
      joinedDate: '2024-01-15',
      tasksCompleted: 23,
      tasksAssigned: 5,
      totalBillsPaid: 1250.75,
      preferredContact: 'email',
      showContact: true,
      bio: 'House admin and organizer. Loves keeping everything tidy and on schedule.'
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      initials: 'MR',
      email: 'mike.rodriguez@email.com',
      phone: '+1 (555) 987-6543',
      role: 'standard',
      avatarBg: 'bg-orange-500',
      lastActive: '2024-12-14T09:15:00Z',
      isOnline: false,
      joinedDate: '2024-02-01',
      tasksCompleted: 18,
      tasksAssigned: 3,
      totalBillsPaid: 890.25,
      preferredContact: 'phone',
      showContact: true,
      bio: 'Great cook and always helps with grocery shopping. Works from home most days.'
    },
    {
      id: 3,
      name: 'Alex Kim',
      initials: 'AK',
      email: 'alex.kim@email.com',
      phone: '+1 (555) 456-7890',
      role: 'standard',
      avatarBg: 'bg-green-500',
      lastActive: '2024-12-13T18:45:00Z',
      isOnline: false,
      joinedDate: '2024-03-10',
      tasksCompleted: 15,
      tasksAssigned: 2,
      totalBillsPaid: 675.50,
      preferredContact: 'email',
      showContact: false,
      bio: 'Tech enthusiast who handles all our smart home setup and wifi issues.'
    },
    {
      id: 4,
      name: 'You',
      initials: 'YO',
      email: 'your.email@email.com',
      phone: '+1 (555) 321-0987',
      role: 'admin',
      avatarBg: 'bg-purple-500',
      lastActive: '2024-12-15T16:00:00Z',
      isOnline: true,
      joinedDate: '2024-01-01',
      tasksCompleted: 20,
      tasksAssigned: 4,
      totalBillsPaid: 1100.00,
      preferredContact: 'email',
      showContact: true,
      bio: 'House co-admin. Manages the household dashboard and coordinates activities.'
    }
  ];
  
  const paymentMethods = [
    { value: 'cash', label: 'Cash' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'mobile_payment', label: 'Mobile Payment' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'eft', label: 'EFT' },
    { value: 'other', label: 'Other' }
  ];
  
  const billCategories = [
    {
      id: 'utilities',
      name: 'Utilities',
      icon: <Zap size={20} className="text-yellow-600" />,
      description: 'Electricity, Water, Gas'
    },
    {
      id: 'internet',
      name: 'Internet & Phone',
      icon: <Wifi size={20} className="text-blue-600" />,
      description: 'Internet, Cable, Phone'
    },
    {
      id: 'groceries',
      name: 'Groceries & Food',
      icon: <ShoppingBag size={20} className="text-green-600" />,
      description: 'Grocery shopping, takeout'
    },
    {
      id: 'cleaning',
      name: 'Cleaning & Maintenance',
      icon: <Sparkles size={20} className="text-purple-600" />,
      description: 'Cleaning supplies, services'
    },
    {
      id: 'other',
      name: 'Other',
      icon: <MoreHorizontal size={20} className="text-gray-600" />,
      description: 'Miscellaneous expenses'
    }
  ];

  const handleSubmitTask = () => {
    if (!taskFormData.category || !taskFormData.title || !taskFormData.assignedTo) {
      return;
    }

    const categoryData = categories.find(cat => cat.id === taskFormData.category);
    const assignedPerson = housemates.find(person => person === taskFormData.assignedTo);
    
    const newTask = {
      icon: categoryData?.icon || <CheckSquare size={16} className="text-gray-600" />,
      title: taskFormData.title,
      description: taskFormData.description,
      assignedTo: taskFormData.assignedTo,
      status: 'Pending',
      dueDate: taskFormData.dueDate ? `Due ${new Date(taskFormData.dueDate).toLocaleDateString()}` : 'No due date',
  priority: taskFormData.priority,
      avatarInitials: assignedPerson === 'You' ? 'YO' : assignedPerson?.split(' ').map(n => n[0]).join('') || 'UN'
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    
    // Reset form
    setTaskFormData({
      category: '',
      title: '',
      description: '',
      location: '',
      dueDate: '',
      assignedTo: '',
      createdBy: 'You',
      priority: 'MEDIUM PRIORITY'
    });
    
    setIsTaskFormOpen(false);
  };

  const handleSubmitBill = () => {
    if (!billFormData.category || !billFormData.title || !billFormData.amount || !billFormData.dueDate) {
      return;
    }

    const categoryData = billCategories.find(cat => cat.id === billFormData.category);
    const amount = parseFloat(billFormData.amount);
    let perPerson = 0;
    
    if (billFormData.splitMethod === 'equal') {
      perPerson = amount / housemates.length;
    } else {
      // For custom split, we'll use equal for now but could be customized
      perPerson = amount / housemates.length;
    }

    const newBill = {
      id: bills.length + 1,
      icon: categoryData?.icon || <FileText size={20} className="text-gray-600" />,
      title: billFormData.title,
      description: billFormData.description || 'No description provided',
      amount: amount,
      perPerson: perPerson,
      paid: 0,
  status: 'Pending',
      dueDate: billFormData.dueDate,
      isOverdue: new Date(billFormData.dueDate) < new Date()
    };

    setBills(prevBills => [...prevBills, newBill]);
    
    // Reset form
    setBillFormData({
      category: '',
      title: '',
      description: '',
      amount: '',
      dueDate: '',
      createdBy: 'You',
      splitMethod: 'equal',
      customSplits: {}
    });
    
    setIsBillFormOpen(false);
  };

  const handleRecordPayment = (billId) => {
    const bill = bills.find(b => b.id === billId);
    if (bill) {
      setSelectedBillId(billId);
      setPaymentFormData({
        amount: (bill.amount - bill.paid).toFixed(2), // Default to remaining balance
        paymentMethod: '',
        datePaid: new Date().toISOString().split('T')[0],
        notes: ''
      });
      setIsPaymentFormOpen(true);
    }
  };

  const handleSubmitPayment = () => {
    if (!selectedBillId || !paymentFormData.amount || !paymentFormData.paymentMethod) {
      return;
    }

    const paymentAmount = parseFloat(paymentFormData.amount);
    
    setBills(prevBills => 
      prevBills.map(bill => {
        if (bill.id === selectedBillId) {
          const newPaidAmount = bill.paid + paymentAmount;
          const isFullyPaid = newPaidAmount >= bill.amount;
          
          return {
            ...bill,
            paid: Math.min(newPaidAmount, bill.amount), // Don't exceed total amount
       status: isFullyPaid ? 'Paid' :
         newPaidAmount > 0 ? 'Partially Paid' :
                   bill.status
          };
        }
        return bill;
      })
    );

    // Reset form
    setPaymentFormData({
      amount: '',
      paymentMethod: '',
      datePaid: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setSelectedBillId(null);
    setIsPaymentFormOpen(false);
  };

  // Helper functions for schedule
  const getAllScheduleItems = () => {
  const items = [];
    
    // Add tasks if filter is enabled
    if (scheduleFilters.tasks) {
      tasks.forEach(task => {
        if (task.dueDate !== 'No due date') {
          let dueDate = '';
          if (task.dueDate.includes('Today')) {
            dueDate = new Date().toISOString().split('T')[0];
          } else if (task.dueDate.includes('Tomorrow')) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dueDate = tomorrow.toISOString().split('T')[0];
          } else {
            // Extract date from "Due Dec 18" format
            const match = task.dueDate.match(/Due (\w+ \d+)/);
            if (match) {
              const currentYear = new Date().getFullYear();
              dueDate = new Date(`${match[1]} ${currentYear}`).toISOString().split('T')[0];
            }
          }
          
          if (dueDate) {
            items.push({
              id: `task-${items.length}`,
              title: task.title,
              description: task.description,
              date: dueDate,
              type: 'task',
              assignedTo: task.assignedTo,
              status: task.status,
              priority: task.priority,
              color: 'blue',
              icon: task.icon
            });
          }
        }
      });
    }
    
    // Add bills if filter is enabled
    if (scheduleFilters.bills) {
      bills.forEach(bill => {
        items.push({
          id: `bill-${bill.id}`,
          title: bill.title,
          description: bill.description,
          date: bill.dueDate,
          type: 'bill',
          amount: bill.amount,
          status: bill.status,
          isOverdue: bill.isOverdue,
          color: 'green',
          icon: bill.icon
        });
      });
    }
    
    // Add house events if filter is enabled
    if (scheduleFilters.events) {
      houseEvents.forEach(event => {
        items.push({
          id: `event-${event.id}`,
          title: event.title,
          description: event.description,
          date: event.date,
          time: event.time,
          type: 'event',
          attendees: event.attendees,
          color: 'purple',
          icon: <Calendar size={16} className="text-purple-600" />
        });
      });
    }
    
    return items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getItemsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return getAllScheduleItems().filter(item => item.date === dateStr);
  };

  const toggleFilter = (filterType) => {
    setScheduleFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventDetailOpen(true);
  };

  const handleAddEvent = () => {
    if (!eventFormData.title || !eventFormData.date) {
      return;
    }

    const newEvent = {
      id: houseEvents.length + 1,
      title: eventFormData.title,
      description: eventFormData.description,
      date: eventFormData.date,
      time: eventFormData.time,
  type: eventFormData.type,
      attendees: eventFormData.attendees,
      color: 'purple'
    };

    // In a real app, this would update the backend
    console.log('Adding new event:', newEvent);
    
    // Reset form
    setEventFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      type: 'meeting',
      attendees: ['All']
    });
    
    setIsAddEventOpen(false);
  };

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const isSameMonth = (date, referenceDate) => {
    return date.getMonth() === referenceDate.getMonth() && 
           date.getFullYear() === referenceDate.getFullYear();
  };

  // Helper functions for housemates
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

  const handleHousemateClick = (housemate) => {
    setSelectedHousemate(housemate);
    setSelectedActivityType(null); // Reset activity view when opening modal
    setIsHousemateDetailOpen(true);
  };

  const handleActivityClick = (activityType) => {
    setSelectedActivityType(selectedActivityType === activityType ? null : activityType);
  };

  const getHousemateCompletedTasks = (housemateName) => {
    // For demo purposes, we'll create some completed tasks
    // In a real app, you'd filter from a completed tasks array
    return [
      {
        id: 1,
        title: 'Clean Kitchen',
        description: 'Deep clean kitchen counters, sink, and appliances',
        completedDate: '2024-12-14',
        priority: 'HIGH PRIORITY'
      },
      {
        id: 2,
        title: 'Take Out Trash',
        description: 'Empty all trash bins and take to curb',
        completedDate: '2024-12-13',
        priority: 'MEDIUM PRIORITY'
      },
      {
        id: 3,
        title: 'Vacuum Living Room',
        description: 'Vacuum carpet and clean under furniture',
        completedDate: '2024-12-12',
        priority: 'LOW PRIORITY'
      }
    ].slice(0, housemateName === 'Sarah Mitchell' ? 3 : housemateName === 'Mike Rodriguez' ? 2 : 1);
  };

  const getHousematePendingTasks = (housemateName) => {
    return tasks.filter(task => task.assignedTo === housemateName || 
      (housemateName === 'You' && task.assignedTo === 'You'));
  };

  const getHousemateBillPayments = (housemateName) => {
    // For demo purposes, we'll create some bill payment records
    // In a real app, you'd have a payments history table
    const payments = [
      {
        id: 1,
        billTitle: 'Electricity Bill',
        amount: 45.13,
        paidDate: '2024-12-10',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: 2,
        billTitle: 'Internet Bill',
        amount: 22.50,
        paidDate: '2024-12-08',
        paymentMethod: 'Credit Card'
      },
      {
        id: 3,
        billTitle: 'Water Bill',
        amount: 16.81,
        paidDate: '2024-12-05',
        paymentMethod: 'Mobile Payment'
      },
      {
        id: 4,
        billTitle: 'Grocery Shopping',
        amount: 39.20,
        paidDate: '2024-12-03',
        paymentMethod: 'Cash'
      }
    ];

    // Return different amounts based on housemate
    if (housemateName === 'Sarah Mitchell') return payments;
    if (housemateName === 'Mike Rodriguez') return payments.slice(0, 3);
    if (housemateName === 'Alex Kim') return payments.slice(0, 2);
    return payments.slice(0, 3); // For "You"
  };

  const toggleContactVisibility = (housemateId) => {
    // This would typically update the backend, for now we'll just log
    console.log(`Toggling contact visibility for housemate ${housemateId}`);
  };

  const handleInviteHousemate = () => {
    if (!inviteFormData.name || !inviteFormData.email) {
      return;
    }

    // Generate initials from name
    const initials = inviteFormData.name
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);

    // Generate a random avatar background color
    const avatarColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-indigo-500'];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const newHousemate = {
      id: housemateProfiles.length + 1,
      name: inviteFormData.name,
      initials: initials,
      email: inviteFormData.email,
      phone: '', // Will be updated by the user later
  role: inviteFormData.role,
      avatarBg: randomColor,
      lastActive: new Date().toISOString(),
      isOnline: false,
      joinedDate: new Date().toISOString().split('T')[0],
      tasksCompleted: 0,
      tasksAssigned: 0,
      totalBillsPaid: 0,
      preferredContact: 'email',
      showContact: true,
      bio: 'New housemate - welcome to the household!'
    };

    // In a real app, this would send an invitation email and create the user
    console.log('Sending invitation to:', newHousemate);
    console.log('Personal message:', inviteFormData.personalMessage);
    console.log('Send email notification:', inviteFormData.sendInviteEmail);

    // Reset form
    setInviteFormData({
      name: '',
      email: '',
      role: 'standard',
      sendInviteEmail: true,
      personalMessage: ''
    });

    setIsInviteHousemateOpen(false);

    // Show success message (in a real app, you'd show a toast notification)
    alert(`Invitation sent to ${inviteFormData.name} (${inviteFormData.email})`);
  };

  const handleRoleChange = (housemateId, newRole) => {
    // In a real app, this would update the backend
    const housemate = housemateProfiles.find(h => h.id === housemateId);
    if (housemate) {
      console.log(`Changing ${housemate.name}'s role from ${housemate.role} to ${newRole}`);
      
      // Show confirmation (in a real app, you'd show a toast notification)
      alert(`${housemate.name}'s role has been updated to ${newRole.charAt(0).toUpperCase() + newRole.slice(1)}`);
    }
  };

  const getRolePermissions = (role) => {
    switch (role) {
      case 'admin':
        return [
          'Create and manage all tasks',
          'Create and manage all bills',
          'Invite new housemates',
          'Manage user roles and permissions',
          'Access all household settings',
          'View all member information',
          'Delete tasks and bills',
          'Export household data'
        ];
      case 'standard':
        return [
          'Create and manage own tasks',
          'Create and manage bills',
          'View all household information',
          'Record bill payments',
          'Update own profile',
          'Participate in events',
          'View other members (if allowed)'
        ];
      case 'read-only':
        return [
          'View tasks and bills',
          'View household schedule',
          'View own profile',
          'Receive notifications',
          'Participate in events (view only)'
        ];
      default:
        return [];
    }
  };

  const getRoleStats = () => {
    const stats = {
      admin: 0,
      standard: 0,
      'read-only': 0
    };

    housemateProfiles.forEach(housemate => {
      if (stats.hasOwnProperty(housemate.role)) {
        stats[housemate.role]++;
      }
    });

    return stats;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Home size={16} className="text-white" />
            </div>
            <span className="font-semibold text-gray-900">HouseMate</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4">
          <ul className="space-y-1">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentPage(item.label)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-purple-100 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{currentPage}</h1>
            <p className="text-gray-500 mt-1">
              {currentPage === 'Dashboard' && 'Overview of your household tasks and responsibilities'}
              {currentPage === 'Tasks' && 'Manage and track all household tasks'}
              {currentPage === 'Bills' && 'Track shared expenses and manage payments'}
              {currentPage === 'Schedule' && 'View and manage household schedules'}
              {currentPage === 'Housemates' && 'Manage your housemate information'}
              {currentPage === 'Settings' && 'Configure your household preferences'}
            </p>
          </div>
        </div>

        {/* Page Content */}
        {currentPage === 'Dashboard' && (
          <>
            {/* Stats Cards - Full Width */}
            <div className="p-8 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Total Tasks"
                  amount="12"
                  subtitle="This week"
                  icon={<CheckSquare size={20} />}
                  variant="default"
                />
                <StatsCard
                  title="Completed"
                  amount="8"
                  subtitle="67% completion rate"
                  icon={<CheckCircle size={20} />}
                  variant="success"
                />
                <StatsCard
                  title="Pending"
                  amount="3"
                  subtitle="3 tasks due today"
                  icon={<Clock size={20} />}
                  variant="warning"
                />
                <StatsCard
                  title="Overdue"
                  amount="1"
                  subtitle="1 task needs attention"
                  icon={<AlertTriangle size={20} />}
                  variant="danger"
                />
              </div>
            </div>

            {/* Task Creation Dialog for Dashboard */}
            <Dialog open={isTaskFormOpen} onOpenChange={setIsTaskFormOpen}>
              <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new household task and assign it to a housemate
                  </DialogDescription>
                </DialogHeader>
                
                <div className="flex-1 overflow-y-auto px-1">
                  <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="col-span-2">
                    <Label htmlFor="task-category" className="mb-3 block">Task Category</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setTaskFormData({...taskFormData, category: category.id})}
                          className={`p-4 border rounded-lg text-left transition-colors ${
                            taskFormData.category === category.id 
                              ? 'border-purple-500 bg-purple-50' 
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            {category.icon}
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <p className="text-sm text-gray-500">{category.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="task-title">Task Title</Label>
                    <Input
                      id="task-title"
                      value={taskFormData.title}
                      onChange={(e) => setTaskFormData({...taskFormData, title: e.target.value})}
                      placeholder="e.g., Clean Kitchen"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="task-assigned">Assigned To</Label>
                    <Select value={taskFormData.assignedTo} onValueChange={(value) => setTaskFormData({...taskFormData, assignedTo: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select housemate" />
                      </SelectTrigger>
                      <SelectContent>
                        {housemates.map((housemate) => (
                          <SelectItem key={housemate} value={housemate}>{housemate}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="task-description">Description</Label>
                    <Textarea
                      id="task-description"
                      value={taskFormData.description}
                      onChange={(e) => setTaskFormData({...taskFormData, description: e.target.value})}
                      placeholder="Describe what needs to be done..."
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="task-location">Location</Label>
                    <Select value={taskFormData.location} onValueChange={(value) => setTaskFormData({...taskFormData, location: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="task-due-date">Due Date</Label>
                    <Input
                      id="task-due-date"
                      type="date"
                      value={taskFormData.dueDate}
                      onChange={(e) => setTaskFormData({...taskFormData, dueDate: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="task-priority">Priority</Label>
                    <Select value={taskFormData.priority} onValueChange={(value) => setTaskFormData({...taskFormData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOW PRIORITY">Low Priority</SelectItem>
                        <SelectItem value="MEDIUM PRIORITY">Medium Priority</SelectItem>
                        <SelectItem value="HIGH PRIORITY">High Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <Button variant="outline" onClick={() => setIsTaskFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitTask} className="bg-purple-600 hover:bg-purple-700">
                    Create Task
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Bottom Section with Tasks and Right Sidebar */}
            <div className="flex flex-1">
              {/* Tasks Section */}
              <div className="flex-1 px-8 pb-8">
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <Tabs defaultValue="all" className="w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
                        <TabsList className="grid w-48 grid-cols-3">
                          <TabsTrigger value="all">All</TabsTrigger>
                          <TabsTrigger value="today">Today</TabsTrigger>
                          <TabsTrigger value="overdue">Overdue</TabsTrigger>
                        </TabsList>
                      </div>
                      
                      <TabsContent value="all" className="mt-6">
                        <div className="space-y-4">
                          {tasks.map((task, index) => (
                            <TaskItem key={index} {...task} />
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="today" className="mt-6">
                        <div className="space-y-4">
                          {tasks.filter(task => task.dueDate.includes('Today')).map((task, index) => (
                            <TaskItem key={index} {...task} />
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="overdue" className="mt-6">
                        <div className="space-y-4">
                          {tasks.filter(task => task.status === 'Overdue').map((task, index) => (
                            <TaskItem key={index} {...task} />
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                {/* Today's Schedule Overview */}
                <div className="bg-white rounded-lg border border-gray-200 mt-6">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
                      <button 
                        onClick={() => setCurrentPage('Schedule')}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        View Full Schedule
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {(() => {
                        const today = new Date().toISOString().split('T')[0];
                        const todayItems = getAllScheduleItems().filter(item => item.date === today);
                        
                        if (todayItems.length === 0) {
                          return (
                            <div className="text-center py-8 text-gray-500">
                              <Calendar size={32} className="mx-auto mb-3 text-gray-300" />
                              <p className="text-sm">No events scheduled for today</p>
                              <p className="text-xs text-gray-400 mt-1">Enjoy your free time!</p>
                            </div>
                          );
                        }
                        
                        return todayItems.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className={`w-3 h-3 rounded-full ${
                              item.type === 'task' ? 'bg-blue-500' :
                              item.type === 'bill' ? 'bg-green-500' : 'bg-purple-500'
                            }`}></div>
                            
                            <div className="flex items-center space-x-3 flex-1">
                              {item.icon}
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{item.title}</div>
                                <div className="text-sm text-gray-500">{item.description}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              {item.time && (
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                  <Clock size={14} />
                                  <span>{item.time}</span>
                                </div>
                              )}
                              
                              {item.assignedTo && (
                                <div className="text-sm text-gray-600">
                                  {item.assignedTo}
                                </div>
                              )}
                              
                              {item.amount && (
                                <div className="text-sm font-medium text-green-600">
                                  ${item.amount.toFixed(2)}
                                </div>
                              )}
                              
                              {item.type === 'task' && item.priority && (
                                <Badge variant={
                                  item.priority === 'HIGH PRIORITY' ? 'destructive' :
                                  item.priority === 'MEDIUM PRIORITY' ? 'default' :
                                  'secondary'
                                } className="text-xs">
                                  {item.priority.split(' ')[0]}
                                </Badge>
                              )}
                              
                              {item.type === 'bill' && item.status && (
                                <Badge variant={
                                  item.status === 'Paid' ? 'default' :
                                  item.status === 'Partially Paid' ? 'secondary' :
                                  item.isOverdue ? 'destructive' : 'outline'
                                } className="text-xs">
                                  {item.status}
                                </Badge>
                              )}
                              
                              {item.type === 'event' && item.attendees && (
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                  <Users size={14} />
                                  <span>{item.attendees.length === 1 && item.attendees[0] === 'All' ? 'All' : item.attendees.length}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="w-80 p-6 space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setIsTaskFormOpen(true)}
                      className="w-full text-left"
                    >
                      <QuickAction
                        icon={<Plus size={16} className="text-white" />}
                        title="Create New Task"
                        description="Add a new household task"
                        iconBg="bg-purple-500"
                      />
                    </button>
                    <button 
                      onClick={() => setCurrentPage('Schedule')}
                      className="w-full text-left"
                    >
                      <QuickAction
                        icon={<CalendarDays size={16} className="text-white" />}
                        title="View Schedule"
                        description="Check weekly cleaning schedule"
                        iconBg="bg-green-500"
                      />
                    </button>
                    <button 
                      onClick={() => setCurrentPage('Bills')}
                      className="w-full text-left"
                    >
                      <QuickAction
                        icon={<CreditCard size={16} className="text-white" />}
                        title="Manage Bills"
                        description="Track shared expenses"
                        iconBg="bg-orange-500"
                      />
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-1">
                    <ActivityItem
                      user="Sarah"
                      action="completed Kitchen Cleaning"
                      timeAgo="2 hours ago"
                      color="bg-green-500"
                    />
                    <ActivityItem
                      user="Mike"
                      action="started Bathroom Cleaning"
                      timeAgo="4 hours ago"
                      color="bg-yellow-500"
                    />
                    <ActivityItem
                      user="New task assigned:"
                      action="Vacuum Living Room"
                      timeAgo="1 day ago"
                      color="bg-blue-500"
                    />
                    <ActivityItem
                      user="Internet Bill"
                      action="is overdue"
                      timeAgo="2 days ago"
                      color="bg-red-500"
                    />
                  </div>
                </div>

                {/* Housemates */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Housemates</h3>
                  <div className="space-y-3">
                    <HousemateItem
                      name="Sarah M."
                      initials="SM"
                      tasks="3 tasks completed"
                      statusColor="bg-green-500"
                      avatarBg="bg-blue-500"
                    />
                    <HousemateItem
                      name="Mike R."
                      initials="MR"
                      tasks="2 tasks pending"
                      statusColor="bg-yellow-500"
                      avatarBg="bg-orange-500"
                    />
                    <HousemateItem
                      name="Alex K."
                      initials="AK"
                      tasks="1 task overdue"
                      statusColor="bg-red-500"
                      avatarBg="bg-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {currentPage === 'Tasks' && (
          <div className="flex-1 p-8">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">All Tasks</h2>
                  <Dialog open={isTaskFormOpen} onOpenChange={setIsTaskFormOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Plus size={16} className="mr-2" />
                        Create New Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                        <DialogDescription>
                          Add a new household task and assign it to a housemate
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="flex-1 overflow-y-auto px-1">
                        <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="col-span-2">
                          <Label htmlFor="task-category" className="mb-3 block">Task Category</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {categories.map((category) => (
                              <button
                                key={category.id}
                                onClick={() => setTaskFormData({...taskFormData, category: category.id})}
                                className={`p-4 border rounded-lg text-left transition-colors ${
                                  taskFormData.category === category.id 
                                    ? 'border-purple-500 bg-purple-50' 
                                    : 'border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                <div className="flex items-center space-x-3 mb-2">
                                  {category.icon}
                                  <span className="font-medium">{category.name}</span>
                                </div>
                                <p className="text-sm text-gray-500">{category.description}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="task-title">Task Title</Label>
                          <Input
                            id="task-title"
                            value={taskFormData.title}
                            onChange={(e) => setTaskFormData({...taskFormData, title: e.target.value})}
                            placeholder="e.g., Clean Kitchen"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="task-assigned">Assigned To</Label>
                          <Select value={taskFormData.assignedTo} onValueChange={(value) => setTaskFormData({...taskFormData, assignedTo: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select housemate" />
                            </SelectTrigger>
                            <SelectContent>
                              {housemates.map((housemate) => (
                                <SelectItem key={housemate} value={housemate}>{housemate}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="col-span-2">
                          <Label htmlFor="task-description">Description</Label>
                          <Textarea
                            id="task-description"
                            value={taskFormData.description}
                            onChange={(e) => setTaskFormData({...taskFormData, description: e.target.value})}
                            placeholder="Describe what needs to be done..."
                            rows={3}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="task-location">Location</Label>
                          <Select value={taskFormData.location} onValueChange={(value) => setTaskFormData({...taskFormData, location: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem key={location} value={location}>{location}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="task-due-date">Due Date</Label>
                          <Input
                            id="task-due-date"
                            type="date"
                            value={taskFormData.dueDate}
                            onChange={(e) => setTaskFormData({...taskFormData, dueDate: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="task-priority">Priority</Label>
                          <Select value={taskFormData.priority} onValueChange={(value) => setTaskFormData({...taskFormData, priority: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="LOW PRIORITY">Low Priority</SelectItem>
                              <SelectItem value="MEDIUM PRIORITY">Medium Priority</SelectItem>
                              <SelectItem value="HIGH PRIORITY">High Priority</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      </div>
                      
                      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button variant="outline" onClick={() => setIsTaskFormOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSubmitTask} className="bg-purple-600 hover:bg-purple-700">
                          Create Task
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-64 grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="overdue">Overdue</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-6">
                    <div className="space-y-4">
                      {tasks.map((task, index) => (
                        <TaskItem key={index} {...task} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="today" className="mt-6">
                    <div className="space-y-4">
                      {tasks.filter(task => task.dueDate.includes('Today')).map((task, index) => (
                        <TaskItem key={index} {...task} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="overdue" className="mt-6">
                    <div className="space-y-4">
                      {tasks.filter(task => task.status === 'Overdue').map((task, index) => (
                        <TaskItem key={index} {...task} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="past" className="mt-6">
                    <div className="space-y-4">
                      <div className="text-center py-8 text-gray-500">
                        <CheckCircle size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>No completed tasks yet</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'Bills' && (
          <div className="flex-1 p-8">
            <div className="space-y-6">
              {/* Header with Create Bill Button */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Bills & Payments</h2>
                  <p className="text-gray-500 mt-1">Track and manage shared household expenses</p>
                </div>
                <Dialog open={isBillFormOpen} onOpenChange={setIsBillFormOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus size={16} className="mr-2" />
                      Add New Bill
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
                    <DialogHeader>
                      <DialogTitle>Add New Bill</DialogTitle>
                      <DialogDescription>
                        Add a new shared expense to track among housemates
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex-1 overflow-y-auto px-1">
                      <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="col-span-2">
                        <Label className="mb-3 block">Bill Category</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {billCategories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => setBillFormData({...billFormData, category: category.id})}
                              className={`p-4 border rounded-lg text-left transition-colors ${
                                billFormData.category === category.id 
                                  ? 'border-purple-500 bg-purple-50' 
                                  : 'border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center space-x-3 mb-2">
                                {category.icon}
                                <span className="font-medium">{category.name}</span>
                              </div>
                              <p className="text-sm text-gray-500">{category.description}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="bill-title">Bill Title</Label>
                        <Input
                          id="bill-title"
                          value={billFormData.title}
                          onChange={(e) => setBillFormData({...billFormData, title: e.target.value})}
                          placeholder="e.g., Electricity Bill"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="bill-amount">Total Amount ($)</Label>
                        <Input
                          id="bill-amount"
                          type="number"
                          step="0.01"
                          value={billFormData.amount}
                          onChange={(e) => setBillFormData({...billFormData, amount: e.target.value})}
                          placeholder="0.00"
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor="bill-description">Description</Label>
                        <Textarea
                          id="bill-description"
                          value={billFormData.description}
                          onChange={(e) => setBillFormData({...billFormData, description: e.target.value})}
                          placeholder="Add bill details..."
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="bill-due-date">Due Date</Label>
                        <Input
                          id="bill-due-date"
                          type="date"
                          value={billFormData.dueDate}
                          onChange={(e) => setBillFormData({...billFormData, dueDate: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="split-method">Split Method</Label>
                        <Select value={billFormData.splitMethod} onValueChange={(value) => setBillFormData({...billFormData, splitMethod: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equal">Equal Split</SelectItem>
                            <SelectItem value="custom">Custom Split</SelectItem>
                          </SelectContent>
                        </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <Button variant="outline" onClick={() => setIsBillFormOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitBill} className="bg-purple-600 hover:bg-purple-700">
                        Add Bill
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Bills List */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6">
                  <div className="space-y-4">
                    {bills.map((bill) => (
                      <BillItem
                        key={bill.id}
                        {...bill}
                        onRecordPayment={() => handleRecordPayment(bill.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Recording Modal */}
              <Dialog open={isPaymentFormOpen} onOpenChange={setIsPaymentFormOpen}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Record Payment</DialogTitle>
                    <DialogDescription>
                      Record a payment for {bills.find(b => b.id === selectedBillId)?.title}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="payment-amount">Payment Amount ($)</Label>
                      <Input
                        id="payment-amount"
                        type="number"
                        step="0.01"
                        value={paymentFormData.amount}
                        onChange={(e) => setPaymentFormData({...paymentFormData, amount: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select value={paymentFormData.paymentMethod} onValueChange={(value) => setPaymentFormData({...paymentFormData, paymentMethod: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              {method.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="date-paid">Date Paid</Label>
                      <Input
                        id="date-paid"
                        type="date"
                        value={paymentFormData.datePaid}
                        onChange={(e) => setPaymentFormData({...paymentFormData, datePaid: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="payment-notes">Notes (Optional)</Label>
                      <Textarea
                        id="payment-notes"
                        value={paymentFormData.notes}
                        onChange={(e) => setPaymentFormData({...paymentFormData, notes: e.target.value})}
                        placeholder="Add any notes about this payment..."
                        rows={2}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setIsPaymentFormOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitPayment} className="bg-purple-600 hover:bg-purple-700">
                      Record Payment
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}

        {currentPage === 'Schedule' && (
          <div className="flex-1 flex">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 p-6">
              <div className="space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <Plus size={16} className="mr-2" />
                          Add Event
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add New Event</DialogTitle>
                          <DialogDescription>
                            Create a new household event or meeting
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4 py-4">
                          <div>
                            <Label htmlFor="event-title">Event Title</Label>
                            <Input
                              id="event-title"
                              value={eventFormData.title}
                              onChange={(e) => setEventFormData({...eventFormData, title: e.target.value})}
                              placeholder="e.g., House Meeting"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="event-description">Description</Label>
                            <Textarea
                              id="event-description"
                              value={eventFormData.description}
                              onChange={(e) => setEventFormData({...eventFormData, description: e.target.value})}
                              placeholder="Event details..."
                              rows={3}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="event-date">Date</Label>
                              <Input
                                id="event-date"
                                type="date"
                                value={eventFormData.date}
                                onChange={(e) => setEventFormData({...eventFormData, date: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="event-time">Time</Label>
                              <Input
                                id="event-time"
                                type="time"
                                value={eventFormData.time}
                                onChange={(e) => setEventFormData({...eventFormData, time: e.target.value})}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="event-type">Event Type</Label>
                            <Select value={eventFormData.type} onValueChange={(value) => setEventFormData({...eventFormData, type: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="meeting">House Meeting</SelectItem>
                                <SelectItem value="recurring">Recurring Task</SelectItem>
                                <SelectItem value="social">Social Event</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                          <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddEvent} className="bg-purple-600 hover:bg-purple-700">
                            Add Event
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsTaskFormOpen(true)}
                    >
                      <Plus size={16} className="mr-2" />
                      Add Task
                    </Button>
                  </div>
                </div>

                {/* Filters */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => toggleFilter('tasks')}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${
                        scheduleFilters.tasks ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Tasks</span>
                      </div>
                      <CheckSquare size={16} className={scheduleFilters.tasks ? 'text-blue-600' : 'text-gray-400'} />
                    </button>
                    
                    <button
                      onClick={() => toggleFilter('bills')}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${
                        scheduleFilters.bills ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Bills</span>
                      </div>
                      <CreditCard size={16} className={scheduleFilters.bills ? 'text-green-600' : 'text-gray-400'} />
                    </button>
                    
                    <button
                      onClick={() => toggleFilter('events')}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${
                        scheduleFilters.events ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span>Events</span>
                      </div>
                      <Calendar size={16} className={scheduleFilters.events ? 'text-purple-600' : 'text-gray-400'} />
                    </button>
                  </div>
                </div>

                {/* Legend */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Calendar Legend</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Task due dates</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Bill due dates</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Events & meetings</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Overdue items</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
              <div className="space-y-6">
                {/* Header with View Toggle */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {scheduleView === 'month' && selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      {scheduleView === 'week' && `Week of ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                      {scheduleView === 'list' && 'Upcoming Items'}
                    </h2>
                    <p className="text-gray-500 mt-1">
                      {scheduleView === 'month' && 'Monthly view of all household activities'}
                      {scheduleView === 'week' && 'Weekly view of household activities'}
                      {scheduleView === 'list' && 'All upcoming tasks, bills, and events'}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Navigation Arrows */}
                    {scheduleView !== 'list' && (
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const newDate = new Date(selectedDate);
                            if (scheduleView === 'month') {
                              newDate.setMonth(newDate.getMonth() - 1);
                            } else {
                              newDate.setDate(newDate.getDate() - 7);
                            }
                            setSelectedDate(newDate);
                          }}
                        >
                          ←
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedDate(new Date())}
                        >
                          Today
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const newDate = new Date(selectedDate);
                            if (scheduleView === 'month') {
                              newDate.setMonth(newDate.getMonth() + 1);
                            } else {
                              newDate.setDate(newDate.getDate() + 7);
                            }
                            setSelectedDate(newDate);
                          }}
                        >
                          →
                        </Button>
                      </div>
                    )}
                    
                    {/* View Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setScheduleView('month')}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          scheduleView === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        Month
                      </button>
                      <button
                        onClick={() => setScheduleView('week')}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          scheduleView === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        Week
                      </button>
                      <button
                        onClick={() => setScheduleView('list')}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          scheduleView === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        List
                      </button>
                    </div>
                  </div>
                </div>

                {/* Calendar Content */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {/* Month View */}
                  {scheduleView === 'month' && (
                    <div>
                      {/* Calendar Header */}
                      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <div key={day} className="p-4 text-center text-sm font-medium text-gray-700">
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7">
                        {getDaysInMonth(selectedDate).map((day, index) => {
                          if (!day) {
                            return <div key={index} className="h-32 border-r border-b border-gray-100"></div>;
                          }
                          
                          const dayItems = getItemsForDate(day);
                          const isCurrentMonth = isSameMonth(day, selectedDate);
                          
                          return (
                            <div
                              key={day.getTime()}
                              className={`h-32 border-r border-b border-gray-100 p-2 ${
                                isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                              } ${isToday(day) ? 'bg-blue-50' : ''}`}
                            >
                              <div className={`text-sm font-medium mb-2 ${
                                isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                              } ${isToday(day) ? 'text-blue-600' : ''}`}>
                                {day.getDate()}
                              </div>
                              
                              <div className="space-y-1">
                                {dayItems.slice(0, 3).map((item) => (
                                  <div
                                    key={item.id}
                                    className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${
                                      item.type === 'task' ? 'bg-blue-100 text-blue-700' :
                                      item.type === 'bill' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                                    } ${item.isOverdue ? 'bg-red-100 text-red-700' : ''}`}
                                    onClick={() => handleEventClick(item)}
                                    onMouseEnter={() => setHoveredItem(item)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    title={`${item.title} - ${item.description}`}
                                  >
                                    {item.title.length > 15 ? `${item.title.substring(0, 15)}...` : item.title}
                                  </div>
                                ))}
                                {dayItems.length > 3 && (
                                  <div className="text-xs text-gray-500 text-center">
                                    +{dayItems.length - 3} more
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Week View */}
                  {scheduleView === 'week' && (
                    <div>
                      {/* Week Header */}
                      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                        {getWeekDays(selectedDate).map((day) => (
                          <div key={day.getTime()} className="p-4 text-center">
                            <div className="text-sm font-medium text-gray-700">
                              {day.toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div className={`text-lg font-semibold mt-1 ${
                              isToday(day) ? 'text-blue-600' : 'text-gray-900'
                            }`}>
                              {day.getDate()}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Week Grid */}
                      <div className="grid grid-cols-7 min-h-96">
                        {getWeekDays(selectedDate).map((day) => {
                          const dayItems = getItemsForDate(day);
                          
                          return (
                            <div
                              key={day.getTime()}
                              className={`border-r border-gray-100 p-3 ${
                                isToday(day) ? 'bg-blue-50' : 'bg-white'
                              }`}
                            >
                              <div className="space-y-2">
                                {dayItems.map((item) => (
                                  <div
                                    key={item.id}
                                    className={`text-sm p-2 rounded cursor-pointer hover:opacity-80 transition-opacity ${
                                      item.type === 'task' ? 'bg-blue-100 text-blue-700' :
                                      item.type === 'bill' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                                    } ${item.isOverdue ? 'bg-red-100 text-red-700' : ''}`}
                                    onClick={() => handleEventClick(item)}
                                    onMouseEnter={() => setHoveredItem(item)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    title={`${item.title} - ${item.description}`}
                                  >
                                    <div className="font-medium">{item.title}</div>
                                    {item.time && (
                                      <div className="text-xs opacity-75">{item.time}</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* List View */}
                  {scheduleView === 'list' && (
                    <div className="p-6">
                      <div className="space-y-4">
                        {getAllScheduleItems().length === 0 ? (
                          <div className="text-center py-12 text-gray-500">
                            <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                            <h3 className="font-medium text-gray-900 mb-2">No scheduled items</h3>
                            <p className="text-gray-500">Add tasks, bills, or events to see them here</p>
                          </div>
                        ) : (
                          getAllScheduleItems().map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                              onClick={() => handleEventClick(item)}
                            >
                              <div className="flex items-center space-x-4">
                                <div className={`w-3 h-3 rounded-full ${
                                  item.type === 'task' ? 'bg-blue-500' :
                                  item.type === 'bill' ? 'bg-green-500' : 'bg-purple-500'
                                } ${item.isOverdue ? 'bg-red-500' : ''}`}></div>
                                <div className="flex items-center space-x-3">
                                  {item.icon}
                                  <div>
                                    <div className="font-medium text-gray-900">{item.title}</div>
                                    <div className="text-sm text-gray-500">{item.description}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  {new Date(item.date).toLocaleDateString()}
                                </div>
                                {item.time && (
                                  <div className="text-sm text-gray-500">{item.time}</div>
                                )}
                                {item.amount && (
                                  <div className="text-sm font-medium text-green-600">
                                    ${item.amount.toFixed(2)}
                                  </div>
                                )}
                                {item.assignedTo && (
                                  <div className="text-sm text-gray-600">{item.assignedTo}</div>
                                )}
                                {item.isOverdue && (
                                  <Badge variant="destructive" className="text-xs mt-1">
                                    Overdue
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Task Creation Dialog for Schedule Page */}
              <Dialog open={isTaskFormOpen} onOpenChange={setIsTaskFormOpen}>
                <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                      Add a new household task and assign it to a housemate
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="flex-1 overflow-y-auto px-1">
                    <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="col-span-2">
                      <Label htmlFor="task-category" className="mb-3 block">Task Category</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setTaskFormData({...taskFormData, category: category.id})}
                            className={`p-4 border rounded-lg text-left transition-colors ${
                              taskFormData.category === category.id 
                                ? 'border-purple-500 bg-purple-50' 
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              {category.icon}
                              <span className="font-medium">{category.name}</span>
                            </div>
                            <p className="text-sm text-gray-500">{category.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="task-title">Task Title</Label>
                      <Input
                        id="task-title"
                        value={taskFormData.title}
                        onChange={(e) => setTaskFormData({...taskFormData, title: e.target.value})}
                        placeholder="e.g., Clean Kitchen"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="task-assigned">Assigned To</Label>
                      <Select value={taskFormData.assignedTo} onValueChange={(value) => setTaskFormData({...taskFormData, assignedTo: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select housemate" />
                        </SelectTrigger>
                        <SelectContent>
                          {housemates.map((housemate) => (
                            <SelectItem key={housemate} value={housemate}>{housemate}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2">
                      <Label htmlFor="task-description">Description</Label>
                      <Textarea
                        id="task-description"
                        value={taskFormData.description}
                        onChange={(e) => setTaskFormData({...taskFormData, description: e.target.value})}
                        placeholder="Describe what needs to be done..."
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="task-location">Location</Label>
                      <Select value={taskFormData.location} onValueChange={(value) => setTaskFormData({...taskFormData, location: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="task-due-date">Due Date</Label>
                      <Input
                        id="task-due-date"
                        type="date"
                        value={taskFormData.dueDate}
                        onChange={(e) => setTaskFormData({...taskFormData, dueDate: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="task-priority">Priority</Label>
                      <Select value={taskFormData.priority} onValueChange={(value) => setTaskFormData({...taskFormData, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LOW PRIORITY">Low Priority</SelectItem>
                          <SelectItem value="MEDIUM PRIORITY">Medium Priority</SelectItem>
                          <SelectItem value="HIGH PRIORITY">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <Button variant="outline" onClick={() => setIsTaskFormOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitTask} className="bg-purple-600 hover:bg-purple-700">
                      Create Task
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Item Detail Modal */}
              <Dialog open={isEventDetailOpen} onOpenChange={setIsEventDetailOpen}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-3">
                      {selectedEvent?.icon}
                      <span>{selectedEvent?.title}</span>
                    </DialogTitle>
                    <DialogDescription>
                      {selectedEvent?.type === 'task' ? 'Task Details' :
                       selectedEvent?.type === 'bill' ? 'Bill Details' : 'Event Details'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  {selectedEvent && (
                    <div className="space-y-4 py-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-900">Description</Label>
                        <p className="text-sm text-gray-600 mt-1">{selectedEvent.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-900">Date</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {new Date(selectedEvent.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        {selectedEvent.time && (
                          <div>
                            <Label className="text-sm font-medium text-gray-900">Time</Label>
                            <div className="flex items-center space-x-2 mt-1">
                              <Clock size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600">{selectedEvent.time}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {selectedEvent.type === 'task' && (
                        <>
                          {selectedEvent.assignedTo && (
                            <div>
                              <Label className="text-sm font-medium text-gray-900">Assigned To</Label>
                              <p className="text-sm text-gray-600 mt-1">{selectedEvent.assignedTo}</p>
                            </div>
                          )}
                          {selectedEvent.priority && (
                            <div>
                              <Label className="text-sm font-medium text-gray-900">Priority</Label>
                              <div className="mt-1">
                                <Badge variant={
                                  selectedEvent.priority === 'HIGH PRIORITY' ? 'destructive' :
                                  selectedEvent.priority === 'MEDIUM PRIORITY' ? 'default' :
                                  'secondary'
                                }>
                                  {selectedEvent.priority}
                                </Badge>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      
                      {selectedEvent.type === 'bill' && (
                        <>
                          <div>
                            <Label className="text-sm font-medium text-gray-900">Amount</Label>
                            <p className="text-lg font-semibold text-green-600 mt-1">
                              ${selectedEvent.amount?.toFixed(2)}
                            </p>
                          </div>
                          {selectedEvent.status && (
                            <div>
                              <Label className="text-sm font-medium text-gray-900">Status</Label>
                              <div className="mt-1">
                                <Badge variant={
                                  selectedEvent.status === 'Paid' ? 'default' :
                                  selectedEvent.status === 'Partially Paid' ? 'secondary' :
                                  selectedEvent.isOverdue ? 'destructive' : 'outline'
                                }>
                                  {selectedEvent.status}
                                </Badge>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      
                      {selectedEvent.type === 'event' && selectedEvent.attendees && (
                        <div>
                          <Label className="text-sm font-medium text-gray-900">Attendees</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Users size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600">{selectedEvent.attendees.join(', ')}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-3">
                    {selectedEvent?.type === 'task' && (
                      <Button variant="outline" size="sm">
                        Mark Complete
                      </Button>
                    )}
                    {selectedEvent?.type === 'bill' && selectedEvent?.status !== 'Paid' && (
                      <Button variant="outline" size="sm">
                        Record Payment
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => setIsEventDetailOpen(false)}>
                      Close
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}

        {currentPage === 'Housemates' && (
          <div className="flex-1 p-8">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Housemates</h2>
                  <p className="text-gray-500 mt-1">Manage your household members and their information</p>
                </div>
                <div className="flex space-x-3">
                  <Dialog open={isInviteHousemateOpen} onOpenChange={setIsInviteHousemateOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Plus size={16} className="mr-2" />
                        Invite Housemate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Invite New Housemate</DialogTitle>
                        <DialogDescription>
                          Send an invitation to join your household
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="invite-name">Full Name</Label>
                          <Input
                            id="invite-name"
                            value={inviteFormData.name}
                            onChange={(e) => setInviteFormData({...inviteFormData, name: e.target.value})}
                            placeholder="e.g., John Smith"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="invite-email">Email Address</Label>
                          <Input
                            id="invite-email"
                            type="email"
                            value={inviteFormData.email}
                            onChange={(e) => setInviteFormData({...inviteFormData, email: e.target.value})}
                            placeholder="john.smith@email.com"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="invite-role">Role</Label>
                          <Select value={inviteFormData.role} onValueChange={(value) => setInviteFormData({...inviteFormData, role: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">
                                <div className="flex flex-col items-start">
                                  <span className="font-medium">Standard</span>
                                  <span className="text-xs text-gray-500">Can create tasks and bills</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="admin">
                                <div className="flex flex-col items-start">
                                  <span className="font-medium">Admin</span>
                                  <span className="text-xs text-gray-500">Full access to all features</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="read-only">
                                <div className="flex flex-col items-start">
                                  <span className="font-medium">Read-only</span>
                                  <span className="text-xs text-gray-500">View only access</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="invite-message">Personal Message (Optional)</Label>
                          <Textarea
                            id="invite-message"
                            value={inviteFormData.personalMessage}
                            onChange={(e) => setInviteFormData({...inviteFormData, personalMessage: e.target.value})}
                            placeholder="Add a personal welcome message..."
                            rows={3}
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="send-email"
                            checked={inviteFormData.sendInviteEmail}
                            onCheckedChange={(checked) => setInviteFormData({...inviteFormData, sendInviteEmail: checked})}
                          />
                          <Label htmlFor="send-email" className="text-sm">
                            Send invitation email immediately
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <Button variant="outline" onClick={() => setIsInviteHousemateOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleInviteHousemate} className="bg-purple-600 hover:bg-purple-700">
                          <Mail size={16} className="mr-2" />
                          Send Invitation
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={isManageRolesOpen} onOpenChange={setIsManageRolesOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Settings size={16} className="mr-2" />
                        Manage Roles
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Manage Household Roles</DialogTitle>
                        <DialogDescription>
                          View and modify housemate roles and permissions
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="flex-1 overflow-y-auto px-1">
                        <Tabs defaultValue="overview" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="overview">Role Overview</TabsTrigger>
                            <TabsTrigger value="members">Manage Members</TabsTrigger>
                            <TabsTrigger value="permissions">Permissions</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="overview" className="mt-6">
                            <div className="space-y-6">
                              {/* Role Statistics */}
                              <div>
                                <h3 className="font-semibold text-gray-900 mb-4">Role Distribution</h3>
                                <div className="grid grid-cols-3 gap-4">
                                  {Object.entries(getRoleStats()).map(([role, count]) => (
                                    <div key={role} className={`p-4 rounded-lg border ${
                                      role === 'admin' ? 'bg-purple-50 border-purple-200' :
                                      role === 'standard' ? 'bg-blue-50 border-blue-200' :
                                      'bg-gray-50 border-gray-200'
                                    }`}>
                                      <div className="text-center">
                                        <div className={`text-2xl font-semibold ${
                                          role === 'admin' ? 'text-purple-700' :
                                          role === 'standard' ? 'text-blue-700' :
                                          'text-gray-700'
                                        }`}>
                                          {count}
                                        </div>
                                        <div className={`text-sm font-medium ${
                                          role === 'admin' ? 'text-purple-600' :
                                          role === 'standard' ? 'text-blue-600' :
                                          'text-gray-600'
                                        }`}>
                                          {role === 'read-only' ? 'Read-only' : role.charAt(0).toUpperCase() + role.slice(1)}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Role Descriptions */}
                              <div>
                                <h3 className="font-semibold text-gray-900 mb-4">Role Descriptions</h3>
                                <div className="space-y-4">
                                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                    <div className="flex items-center space-x-3 mb-3">
                                      <Shield size={20} className="text-purple-600" />
                                      <div>
                                        <h4 className="font-medium text-purple-900">Administrator</h4>
                                        <p className="text-sm text-purple-700">Full access to all household management features</p>
                                      </div>
                                    </div>
                                    <div className="text-sm text-purple-600">
                                      Can manage all aspects of the household, invite members, and modify roles
                                    </div>
                                  </div>
                                  
                                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center space-x-3 mb-3">
                                      <Users size={20} className="text-blue-600" />
                                      <div>
                                        <h4 className="font-medium text-blue-900">Standard</h4>
                                        <p className="text-sm text-blue-700">Can create and manage tasks and bills</p>
                                      </div>
                                    </div>
                                    <div className="text-sm text-blue-600">
                                      Full participation in household activities with creation permissions
                                    </div>
                                  </div>
                                  
                                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-center space-x-3 mb-3">
                                      <Eye size={20} className="text-gray-600" />
                                      <div>
                                        <h4 className="font-medium text-gray-900">Read-only</h4>
                                        <p className="text-sm text-gray-700">View-only access to household information</p>
                                      </div>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      Can view tasks, bills, and schedules but cannot create or modify
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="members" className="mt-6">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-gray-900">Member Role Management</h3>
                                <div className="text-sm text-gray-500">
                                  {housemateProfiles.length} total members
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                {housemateProfiles.map((housemate) => (
                                  <div key={housemate.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                      <div className="relative">
                                        <div className={`w-10 h-10 ${housemate.avatarBg} rounded-full flex items-center justify-center`}>
                                          <span className="text-white font-medium text-sm">{housemate.initials}</span>
                                        </div>
                                        {housemate.isOnline && (
                                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                        )}
                                      </div>
                                      
                                      <div>
                                        <div className="font-medium text-gray-900">{housemate.name}</div>
                                        <div className="text-sm text-gray-500">{housemate.email}</div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                      <Badge 
                                        variant="outline" 
                                        className={getRoleColor(housemate.role)}
                                      >
                                        {housemate.role === 'read-only' ? 'Read-only' : housemate.role.charAt(0).toUpperCase() + housemate.role.slice(1)}
                                      </Badge>
                                      
                                      {housemate.name !== 'You' && (
                                        <Select 
                                          value={housemate.role} 
                                          onValueChange={(value) => handleRoleChange(housemate.id, value)}
                                        >
                                          <SelectTrigger className="w-32">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="standard">Standard</SelectItem>
                                            <SelectItem value="read-only">Read-only</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      )}
                                      
                                      {housemate.name === 'You' && (
                                        <div className="text-sm text-gray-500 px-3 py-1">
                                          Cannot modify own role
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="permissions" className="mt-6">
                            <div className="space-y-6">
                              <h3 className="font-semibold text-gray-900">Role Permissions Matrix</h3>
                              
                              <div className="space-y-6">
                                {['admin', 'standard', 'read-only'].map((role) => (
                                  <div key={role} className={`p-4 rounded-lg border ${
                                    role === 'admin' ? 'bg-purple-50 border-purple-200' :
                                    role === 'standard' ? 'bg-blue-50 border-blue-200' :
                                    'bg-gray-50 border-gray-200'
                                  }`}>
                                    <div className="flex items-center space-x-3 mb-4">
                                      {role === 'admin' && <Shield size={20} className="text-purple-600" />}
                                      {role === 'standard' && <Users size={20} className="text-blue-600" />}
                                      {role === 'read-only' && <Eye size={20} className="text-gray-600" />}
                                      <h4 className={`font-medium ${
                                        role === 'admin' ? 'text-purple-900' :
                                        role === 'standard' ? 'text-blue-900' :
                                        'text-gray-900'
                                      }`}>
                                        {role === 'read-only' ? 'Read-only' : role.charAt(0).toUpperCase() + role.slice(1)} Permissions
                                      </h4>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                      {getRolePermissions(role).map((permission, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                          <CheckCircle size={16} className={
                                            role === 'admin' ? 'text-purple-600' :
                                            role === 'standard' ? 'text-blue-600' :
                                            'text-gray-600'
                                          } />
                                          <span className={`text-sm ${
                                            role === 'admin' ? 'text-purple-700' :
                                            role === 'standard' ? 'text-blue-700' :
                                            'text-gray-700'
                                          }`}>
                                            {permission}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex items-start space-x-3">
                                  <AlertTriangle size={20} className="text-yellow-600 mt-0.5" />
                                  <div>
                                    <h4 className="font-medium text-yellow-900 mb-1">Important Notes</h4>
                                    <ul className="text-sm text-yellow-800 space-y-1">
                                      <li>• At least one administrator is required for the household</li>
                                      <li>• Role changes take effect immediately</li>
                                      <li>• Members will be notified of role changes via email</li>
                                      <li>• You cannot modify your own role - ask another admin</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                      
                      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button variant="outline" onClick={() => setIsManageRolesOpen(false)}>
                          Close
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {housemateProfiles.map((housemate) => (
                  <HousemateCard
                    key={housemate.id}
                    {...housemate}
                    onContactToggle={toggleContactVisibility}
                    onViewDetails={handleHousemateClick}
                  />
                ))}
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Role Permissions */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Role Permissions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div>
                      <div className="font-medium text-purple-900">Admin</div>
                      <div className="text-sm text-purple-700">Full access to all features</div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                      2 members
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <div className="font-medium text-blue-900">Standard</div>
                      <div className="text-sm text-blue-700">Can create tasks and bills</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      2 members
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <div className="font-medium text-gray-900">Read-only</div>
                      <div className="text-sm text-gray-700">View only access</div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                      0 members
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">SM</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Sarah completed "Clean Kitchen"</div>
                      <div className="text-xs text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">MR</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Mike paid Electricity Bill</div>
                      <div className="text-xs text-gray-500">1 day ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">AK</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Alex updated contact preferences</div>
                      <div className="text-xs text-gray-500">2 days ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">YO</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">You created new task "Vacuum Living Room"</div>
                      <div className="text-xs text-gray-500">3 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Housemate Detail Modal */}
            <Dialog open={isHousemateDetailOpen} onOpenChange={setIsHousemateDetailOpen}>
              <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-3">
                    {selectedHousemate && (
                      <>
                        <div className="relative">
                          <div className={`w-12 h-12 ${selectedHousemate.avatarBg} rounded-full flex items-center justify-center`}>
                            <span className="text-white font-medium">{selectedHousemate.initials}</span>
                          </div>
                          {selectedHousemate.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <span>{selectedHousemate.name}</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getRoleColor(selectedHousemate.role)}`}
                            >
                              {selectedHousemate.role.charAt(0).toUpperCase() + selectedHousemate.role.slice(1)}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {selectedHousemate.isOnline ? 'Online now' : `Last seen ${getTimeAgo(selectedHousemate.lastActive)}`}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </DialogTitle>
                  <DialogDescription>
                    Detailed profile and activity information
                  </DialogDescription>
                </DialogHeader>
                
                <div className="flex-1 overflow-y-auto px-1">
                  {selectedHousemate && (
                    <div className="space-y-6 py-4">
                    {/* Bio */}
                    <div>
                      <Label className="text-sm font-medium text-gray-900">About</Label>
                      <p className="text-sm text-gray-600 mt-1">{selectedHousemate.bio}</p>
                    </div>

                    {/* Stats Grid */}
                    <div>
                      <Label className="text-sm font-medium text-gray-900 mb-3 block">Activity Summary</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => handleActivityClick('completed')}
                          className={`text-center p-4 rounded-lg border transition-all hover:shadow-md ${
                            selectedActivityType === 'completed' 
                              ? 'bg-green-100 border-green-300 shadow-md' 
                              : 'bg-green-50 border-green-200 hover:bg-green-100'
                          }`}
                        >
                          <div className="text-2xl font-semibold text-green-700">{selectedHousemate.tasksCompleted}</div>
                          <div className="text-sm text-green-600">Tasks Completed</div>
                          <div className="text-xs text-green-500 mt-1">Click to view details</div>
                        </button>
                        <button
                          onClick={() => handleActivityClick('pending')}
                          className={`text-center p-4 rounded-lg border transition-all hover:shadow-md ${
                            selectedActivityType === 'pending' 
                              ? 'bg-yellow-100 border-yellow-300 shadow-md' 
                              : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                          }`}
                        >
                          <div className="text-2xl font-semibold text-yellow-700">{selectedHousemate.tasksAssigned}</div>
                          <div className="text-sm text-yellow-600">Tasks Pending</div>
                          <div className="text-xs text-yellow-500 mt-1">Click to view details</div>
                        </button>
                        <button
                          onClick={() => handleActivityClick('bills')}
                          className={`text-center p-4 rounded-lg border transition-all hover:shadow-md ${
                            selectedActivityType === 'bills' 
                              ? 'bg-blue-100 border-blue-300 shadow-md' 
                              : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                          }`}
                        >
                          <div className="text-2xl font-semibold text-blue-700">${selectedHousemate.totalBillsPaid.toFixed(0)}</div>
                          <div className="text-sm text-blue-600">Bills Contributed</div>
                          <div className="text-xs text-blue-500 mt-1">Click to view details</div>
                        </button>
                      </div>
                    </div>

                    {/* Activity Details */}
                    {selectedActivityType && (
                      <div className="border-t border-gray-200 pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <Label className="text-sm font-medium text-gray-900">
                            {selectedActivityType === 'completed' && 'Completed Tasks'}
                            {selectedActivityType === 'pending' && 'Pending Tasks'}
                            {selectedActivityType === 'bills' && 'Bill Payment History'}
                          </Label>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSelectedActivityType(null)}
                          >
                            ×
                          </Button>
                        </div>

                        <div className="max-h-80 overflow-y-auto space-y-3">
                          {selectedActivityType === 'completed' && (
                            <>
                              {getHousemateCompletedTasks(selectedHousemate.name).map((task) => (
                                <div key={task.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                                  <div className="flex items-center space-x-3">
                                    <CheckCircle size={16} className="text-green-600" />
                                    <div>
                                      <div className="font-medium text-green-900">{task.title}</div>
                                      <div className="text-sm text-green-700">{task.description}</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm text-green-600">
                                      {new Date(task.completedDate).toLocaleDateString()}
                                    </div>
                                    <Badge variant="outline" className="text-xs mt-1 border-green-300 text-green-700">
                                      {task.priority.split(' ')[0]}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                              {getHousemateCompletedTasks(selectedHousemate.name).length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                  <CheckCircle size={32} className="mx-auto mb-2 text-gray-300" />
                                  <p className="text-sm">No completed tasks yet</p>
                                </div>
                              )}
                            </>
                          )}

                          {selectedActivityType === 'pending' && (
                            <>
                              {getHousematePendingTasks(selectedHousemate.name).map((task, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                  <div className="flex items-center space-x-3">
                                    <Clock size={16} className="text-yellow-600" />
                                    <div>
                                      <div className="font-medium text-yellow-900">{task.title}</div>
                                      <div className="text-sm text-yellow-700">{task.description}</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm text-yellow-600">{task.dueDate}</div>
                                    <Badge variant="outline" className="text-xs mt-1 border-yellow-300 text-yellow-700">
                                      {task.priority.split(' ')[0]}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                              {getHousematePendingTasks(selectedHousemate.name).length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                  <Clock size={32} className="mx-auto mb-2 text-gray-300" />
                                  <p className="text-sm">No pending tasks</p>
                                </div>
                              )}
                            </>
                          )}

                          {selectedActivityType === 'bills' && (
                            <>
                              {getHousemateBillPayments(selectedHousemate.name).map((payment) => (
                                <div key={payment.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <div className="flex items-center space-x-3">
                                    <CreditCard size={16} className="text-blue-600" />
                                    <div>
                                      <div className="font-medium text-blue-900">{payment.billTitle}</div>
                                      <div className="text-sm text-blue-700">via {payment.paymentMethod}</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-blue-900">${payment.amount.toFixed(2)}</div>
                                    <div className="text-sm text-blue-600">
                                      {new Date(payment.paidDate).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {getHousemateBillPayments(selectedHousemate.name).length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                  <CreditCard size={32} className="mx-auto mb-2 text-gray-300" />
                                  <p className="text-sm">No bill payments yet</p>
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        {/* Summary for current view */}
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600">
                            {selectedActivityType === 'completed' && (
                              <>Showing {getHousemateCompletedTasks(selectedHousemate.name).length} completed tasks</>
                            )}
                            {selectedActivityType === 'pending' && (
                              <>Showing {getHousematePendingTasks(selectedHousemate.name).length} pending tasks</>
                            )}
                            {selectedActivityType === 'bills' && (
                              <>Total contributed: ${getHousemateBillPayments(selectedHousemate.name).reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)} across {getHousemateBillPayments(selectedHousemate.name).length} payments</>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact Information */}
                    <div>
                      <Label className="text-sm font-medium text-gray-900 mb-3 block">Contact Information</Label>
                      {selectedHousemate.showContact ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Mail size={16} className="text-gray-400" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">Email</div>
                                <div className="text-sm text-gray-600">{selectedHousemate.email}</div>
                              </div>
                            </div>
                            {selectedHousemate.preferredContact === 'email' && (
                              <Badge variant="secondary" className="text-xs">Preferred</Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Phone size={16} className="text-gray-400" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">Phone</div>
                                <div className="text-sm text-gray-600">{selectedHousemate.phone}</div>
                              </div>
                            </div>
                            {selectedHousemate.preferredContact === 'phone' && (
                              <Badge variant="secondary" className="text-xs">Preferred</Badge>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                          <EyeOff size={24} className="text-gray-400 mx-auto mb-2" />
                          <div className="text-sm text-gray-500">Contact information is private</div>
                        </div>
                      )}
                    </div>

                    {/* Member Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-900">Member Since</Label>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(selectedHousemate.joinedDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-900">Role</Label>
                        <div className="mt-1">
                          <Badge 
                            variant="outline" 
                            className={getRoleColor(selectedHousemate.role)}
                          >
                            {selectedHousemate.role.charAt(0).toUpperCase() + selectedHousemate.role.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  {selectedHousemate?.showContact && (
                    <Button variant="outline" size="sm">
                      <MessageCircle size={16} className="mr-2" />
                      Send Message
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setIsHousemateDetailOpen(false)}>
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {currentPage === 'Settings' && (
          <SettingsContent
            settingsTab={settingsTab}
            setSettingsTab={setSettingsTab}
            profileSettings={profileSettings}
            setProfileSettings={setProfileSettings}
            notificationSettings={notificationSettings}
            setNotificationSettings={setNotificationSettings}
            privacySettings={privacySettings}
            setPrivacySettings={setPrivacySettings}
            appSettings={appSettings}
            setAppSettings={setAppSettings}
          />
        )}

        {currentPage !== 'Dashboard' && currentPage !== 'Tasks' && currentPage !== 'Bills' && currentPage !== 'Schedule' && currentPage !== 'Housemates' && currentPage !== 'Settings' && (
          <div className="flex-1 p-8">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{currentPage}</h2>
              <p className="text-gray-500">This page is under construction.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
