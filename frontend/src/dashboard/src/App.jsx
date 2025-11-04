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
  HelpCircle,
  UserPlus
} from 'lucide-react';
import './index.css';
import { useState, useEffect } from 'react';
import { getTasks, addTask, updateTask, getHouse, getHouseStatistics, getHousemates, getUserStatistics, getUserCompletedTasks, getUserPendingTasks, getUserContributedBills, getBills, addBill, updateBill, deleteBill, payBill, addEvent, getSchedule, checkScheduleTable } from '../../apiHelpers';
import { updateUserBio, updateUserPhone } from '../../apiHelpers';
import { Button } from './components/ui/button';
import { useSEO, SEO_CONFIG } from '../../hooks/useSEO.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Badge } from './components/ui/badge';
import { Switch } from './components/ui/switch';
import { Separator } from './components/ui/separator';
import OptimizedImage from '../../components/OptimizedImage.jsx';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { StatsCard } from './components/StatsCard';
import { TaskItem } from './components/TaskItem';
import { QuickAction } from './components/QuickAction';
import { ActivityItem } from './components/ActivityItem';
import { HousemateItem } from './components/HousemateItem';
import { HousemateCard } from './components/HousemateCard';
import { BillItem } from './components/BillItem';
import { SettingsContent } from './components/SettingsContent';
import { PaymentHistoryModal } from './components/PaymentHistoryModal';
import { useAuth } from '../../UserContext.jsx';
import ProtectedRoute from '../../components/ProtectedRoute';

function App() {
  console.log("🚀 NEW FIXED VERSION LOADED - NO MORE INITIALIZATION ERRORS! 🚀");
  console.log("App component is rendering - FIXED VERSION");
  
  // Get user data from auth context (this must be outside try block)
  const { user, isAdmin, isStandard, isReadOnly, permissions, getRoleDisplayName } = useAuth();
  
  // ALL React hooks must be at the top level - moved from inside try block
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [upcomingTasksView, setUpcomingTasksView] = useState('own');
  const [scheduleDataView, setScheduleDataView] = useState('own');
  const [tasksPageView, setTasksPageView] = useState('own');
  const [schedulePageView, setSchedulePageView] = useState('own');
  const [billsPageView, setBillsPageView] = useState('own');
  
  // Tasks state
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  
  // Dashboard statistics state
  const [dashboardStats, setDashboardStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    completionRate: 0
  });
  
  // House settings state
  const [householdSettings, setHouseholdSettings] = useState({
    houseName: '',
    avatar: '',
    address: '123 Maple Street, Downtown, City 12345',
    houseRules: 'Keep common areas clean\nNo shoes in bedrooms\nQuiet hours: 10 PM - 7 AM\nTake turns with dishes\nGuests must be approved by all housemates',
    currency: 'ZAR',
    currencySymbol: 'R',
    defaultSplitMethod: 'equal',
    taskAutoAssign: false,
    billReminderDays: 3
  });
  
  // Bills state
  const [bills, setBills] = useState([]);
  const [loadingBills, setLoadingBills] = useState(false);
  
  // Task form state
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: '',
    assignedTo: ''
  });
  
  // Bill form state  
  const [isBillFormOpen, setIsBillFormOpen] = useState(false);
  const [billFormData, setBillFormData] = useState({
    title: '',
    description: '',
    amount: '',
    category: '',
    dueDate: '',
    splitMethod: 'equal',
    assignedTo: []
  });
  
  // Payment state
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [selectedHousemates, setSelectedHousemates] = useState([]);
  const [isPaymentHistoryOpen, setIsPaymentHistoryOpen] = useState(false);
  const [selectedBillForHistory, setSelectedBillForHistory] = useState(null);
  const [paymentFormData, setPaymentFormData] = useState({
    amount: '',
    method: 'bank_transfer',
    note: '',
    receiptUrl: ''
  });
  
  // Calendar state
  const [calendarView, setCalendarView] = useState('month');
  const [scheduleView, setScheduleView] = useState('month');
  const [scheduleFilters, setScheduleFilters] = useState({
    showPersonal: true,
    showHousehold: true,
    showMaintenance: true
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [houseEvents, setHouseEvents] = useState([]);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    category: 'general',
    attendees: 'All'
  });
  
  // Housemates state
  const [selectedHousemate, setSelectedHousemate] = useState(null);
  const [isHousemateDetailOpen, setIsHousemateDetailOpen] = useState(false);
  const [isInviteHousemateOpen, setIsInviteHousemateOpen] = useState(false);
  const [isManageRolesOpen, setIsManageRolesOpen] = useState(false);
  const [selectedActivityType, setSelectedActivityType] = useState(null);
  const [housemateCompletedTasks, setHousemateCompletedTasks] = useState([]);
  const [housematePendingTasks, setHousematePendingTasks] = useState([]);
  const [housemateContributedBills, setHousemateContributedBills] = useState([]);
  const [loadingHousemateDetails, setLoadingHousemateDetails] = useState(false);
  const [housemates, setHousemates] = useState([]);
  const [loadingHousemates, setLoadingHousemates] = useState(false);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [inviteFormData, setInviteFormData] = useState({
    email: '',
    role: 'standard',
    message: ''
  });
  
  // Task Detail View state
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState(null); // 'total', 'completed', 'pending', 'overdue'
  const [filteredTasks, setFilteredTasks] = useState([]);
  
  // Settings state
  const [settingsTab, setSettingsTab] = useState('profile');
  const [profileSettings, setProfileSettings] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    bio: '',
    avatar: '',
    dateOfBirth: '',
    occupation: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    preferences: {
      language: 'en',
      timezone: 'Africa/Johannesburg',
      theme: 'light',
      currency: 'ZAR'
    },
    social: {
      instagram: '',
      twitter: '',
      linkedin: '',
      facebook: ''
    },
    interests: [],
    skills: [],
    availability: {
      monday: { morning: true, afternoon: true, evening: true },
      tuesday: { morning: true, afternoon: true, evening: true },
      wednesday: { morning: true, afternoon: true, evening: true },
      thursday: { morning: true, afternoon: true, evening: true },
      friday: { morning: true, afternoon: true, evening: true },
      saturday: { morning: true, afternoon: true, evening: true },
      sunday: { morning: true, afternoon: true, evening: true }
    }
  });
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    taskReminders: true,
    billReminders: true,
    eventReminders: true,
    housemateUpdates: true,
    systemUpdates: false
  });
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'housemates',
    showContactInfo: true,
    showActivity: true,
    allowInvitations: true,
    dataSharing: false
  });
  const [appSettings, setAppSettings] = useState({
    theme: 'light',
    compactMode: false,
    soundEnabled: true,
    animationsEnabled: true,
    autoSave: true,
    showTips: true
  });

  // Update view states based on user role after user data loads
  useEffect(() => {
    if (user && isAdmin) {
      setUpcomingTasksView('everyone');
      setScheduleDataView('everyone');
      setTasksPageView('everyone');
      setSchedulePageView('everyone');
      setBillsPageView('everyone');
    }
  }, [user, isAdmin]);

  // Early return if user data is not available
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading user data...</p>
        </div>
      </div>
    );
  }

  try {

  // SEO: Update page title and meta description based on current page
  const getSEOConfigForPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return SEO_CONFIG.home;
      case 'Bills':
        return SEO_CONFIG.bills;
      case 'Tasks':
        return SEO_CONFIG.tasks;
      case 'Calendar':
        return SEO_CONFIG.calendar;
      case 'Housemates':
        return SEO_CONFIG.housemates;
      case 'Settings':
        return SEO_CONFIG.settings;
      default:
        return SEO_CONFIG.home;
    }
  };

  const seoConfig = getSEOConfigForPage();
  useSEO(seoConfig.title, seoConfig.description, seoConfig.keywords, seoConfig.image, seoConfig.imageAlt);

  // Function to fetch tasks
  const fetchTasks = async () => {
    if (!user || !user.house_id) {
      return;
    }
    
    try {
      setLoadingTasks(true);
      // Use role-based task fetching - admins can view all tasks if they choose
      // Check both dashboard view and tasks page view for admin permissions
      const shouldViewAll = isAdmin && (
        (currentPage === 'Dashboard' && upcomingTasksView === 'everyone') ||
        (currentPage === 'Tasks' && tasksPageView === 'everyone')
      );
      const options = { viewAll: shouldViewAll };
      const res = await getTasks(options);
      console.log('Tasks API response:', res.data);
      
      // Map backend data to frontend format
      const mapped = res.data.map(task => {
        const categoryData = categories.find(cat => cat.id === task.category) || categories[categories.length - 1];
        return {
          ...task, // Keep original database values
          icon: categoryData.icon,
          avatarInitials: task.assigned_to_name ? 
            `${task.assigned_to_name[0]}${task.assigned_to_surname?.[0] || ''}`.toUpperCase() : 'UN',
          dueDate: task.due_date ? `Due ${new Date(task.due_date).toLocaleDateString()}` : 'No due date',
          assignedTo: task.assigned_to_name ? `${task.assigned_to_name} ${task.assigned_to_surname || ''}`.trim() : 'Unknown',
          priority: task.priority ? task.priority.toUpperCase() + ' PRIORITY' : 'MEDIUM PRIORITY',
          // Keep original status for filtering, add display status for UI
          originalStatus: task.status, // Keep original database status
          status: (() => {
            switch (task.status?.toLowerCase()) {
              case 'completed':
                return 'Completed';
              case 'in_progress':
              case 'in progress':
                return 'In Progress';
              case 'pending':
              case 'open':
                return 'Pending';
              case 'overdue':
                return 'Overdue';
              default:
                return 'Pending';
            }
          })(),
        };
      });
      setTasks(mapped);
      
      // Fetch real house statistics from backend instead of calculating from filtered task data
      await fetchHouseStatistics();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
      setDashboardStats({
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        overdueTasks: 0,
        completionRate: 0
      });
    } finally {
      setLoadingTasks(false);
    }
  };

  // Function to fetch events
  const fetchEvents = async () => {
    if (!user || !user.house_id) {
      return;
    }
    
    try {
      console.log('Fetching events for house_id:', user.house_id);
      
      // First check if schedule table exists
      try {
        const tableCheck = await checkScheduleTable();
        console.log('Schedule table check:', tableCheck.data);
        
        if (!tableCheck.data.exists) {
          console.warn('⚠️ Schedule table does not exist yet. Table creation may be in progress.');
          setHouseEvents([]);
          return;
        }
      } catch (tableCheckError) {
        console.error('Error checking schedule table:', tableCheckError);
      }
      
      // Determine which events to fetch based on role and current page view
      let viewParam = 'my'; // Default to user's own events
      
      if (currentPage === 'Schedule') {
        // On Schedule page, use the Schedule page view state
        viewParam = isAdmin && schedulePageView === 'everyone' ? 'all' : 'my';
      } else {
        // On Dashboard, show user's own events for widgets
        viewParam = 'my';
      }
      
      console.log('Fetching events with viewParam:', viewParam, 'for role:', user.role);
      const res = await getSchedule(user.house_id, viewParam);
      console.log('Events API response:', res.data);
      
      // Map backend schedule data to frontend event format
      const mappedEvents = res.data.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description || '',
        date: event.scheduled_date,
        time: event.scheduled_time || '',
        type: event.type || 'meeting',
        attendees: typeof event.attendees === 'string' ? event.attendees.split(',') : (event.attendees || ['All']),
        color: 'purple'
      }));
      
      setHouseEvents(mappedEvents);
      console.log('Events loaded successfully:', mappedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      
      // Provide specific handling for different error types
      if (error.response?.status === 500) {
        console.warn('⚠️ Schedule endpoint experiencing issues (500 error). Using empty schedule for now.');
        // Could show a user-friendly message here if needed
      } else if (error.response?.status === 503) {
        console.warn('⚠️ Schedule service temporarily unavailable (503 error).');
      } else {
        console.error('💥 Unexpected error fetching schedule:', error.message);
      }
      
      setHouseEvents([]);
    }
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      // Convert frontend status format to backend format
      const backendStatus = (() => {
        switch (newStatus) {
          case 'Completed':
            return 'completed';
          case 'In Progress':
            return 'in_progress';
          case 'Pending':
            return 'open';  // Backend uses 'open' for pending tasks
          case 'Overdue':
            return 'overdue';
          default:
            return 'open';
        }
      })();
      
      // Update task status in database
      await updateTask(taskId, { status: backendStatus });
      
      // Refresh tasks to get updated data (this will also recalculate stats)
      fetchTasks();
      
      // Refresh housemate statistics
      if (user?.house_id) {
        fetchHousemateStatistics(housemates);
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Task filtering helper functions
  const isToday = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    const taskDate = new Date(dateString);
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  };

  const isOverdue = (dateString, status) => {
    if (!dateString || status === 'completed' || status === 'Completed') return false;
    const now = new Date();
    const taskDate = new Date(dateString);
    
    // Calculate the difference in milliseconds
    const diffInMs = now.getTime() - taskDate.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    
    // Task is overdue if it's 24+ hours past due date
    return diffInHours >= 24;
  };

  const getOverdueDays = (dateString) => {
    if (!dateString) return 0;
    const now = new Date();
    const taskDate = new Date(dateString);
    
    const diffInMs = now.getTime() - taskDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffInDays);
  };

  const enhanceTaskWithOverdueInfo = (task) => {
    const enhanced = { ...task };
    
    // Update status based on task state
    if (task.status === 'Completed') {
      enhanced.status = 'Completed';
      enhanced.isOverdue = false;
      enhanced.overdueDays = 0;
    } else if (isOverdue(task.due_date, task.status)) {
      const overdueDays = getOverdueDays(task.due_date);
      enhanced.status = 'Overdue';
      enhanced.isOverdue = true;
      enhanced.overdueDays = overdueDays;
    } else {
      // Keep original status (Pending, In Progress, etc.)
      enhanced.isOverdue = false;
      enhanced.overdueDays = 0;
    }
    
    return enhanced;
  };

  const filterTasksByType = (filterType) => {
    const today = new Date();
    
    switch (filterType) {
      case 'all':
        return tasks.filter(task => task.status !== 'Completed');
      
      case 'today':
        return tasks.filter(task => 
          task.status !== 'Completed' && task.due_date && isToday(task.due_date)
        );
      
      case 'overdue':
        return tasks.filter(task => 
          task.status !== 'Completed' && task.due_date && isOverdue(task.due_date, task.status)
        );
      
      case 'past':
        return tasks.filter(task => task.status === 'Completed');
      
      default:
        return tasks;
    }
  };

  // Function to filter bills by type
  const filterBillsByType = (filterType) => {
    const today = new Date();
    
    switch (filterType) {
      case 'all':
        return bills;
      
      case 'overdue':
        return bills.filter(bill => bill.isOverdue);
      
      case 'in-progress':
        return bills.filter(bill => bill.status === 'Partially Paid' || bill.status === 'Pending');
      
      case 'past':
        return bills.filter(bill => bill.status === 'Paid');
      
      default:
        return bills;
    }
  };

  // Function to fetch statistics for housemates
  const fetchHousemateStatistics = async (housematesData) => {
    if (!housematesData || !Array.isArray(housematesData)) {
      console.log('No housemates data provided for statistics update');
      return;
    }
    
    try {
      const updatedHousemates = await Promise.all(
        housematesData.map(async (housemate) => {
          try {
            const statsResponse = await getUserStatistics(housemate.id);
            return {
              ...housemate,
              tasksCompleted: statsResponse.data.tasksCompleted,
              tasksAssigned: statsResponse.data.tasksPending, // Pending tasks are "assigned"
              totalBillsPaid: statsResponse.data.billsContributed
            };
          } catch (error) {
            console.error(`Error fetching statistics for ${housemate.name}:`, error);
            return housemate; // Return original data if stats fetch fails
          }
        })
      );
      
      setHousemates(updatedHousemates);
    } catch (error) {
      console.error('Error updating housemate statistics:', error);
    }
  };

  // Function to calculate dashboard statistics from tasks
  const calculateDashboardStats = (tasksData) => {
    if (!tasksData || !Array.isArray(tasksData)) {
      return {
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        overdueTasks: 0,
        completionRate: 0
      };
    }

    const now = new Date();
    const totalTasks = tasksData.length;
    const completedTasks = tasksData.filter(task => 
      (task.originalStatus?.toLowerCase() || task.status?.toLowerCase()) === 'completed'
    ).length;
    
    const pendingTasks = tasksData.filter(task => {
      const status = (task.originalStatus?.toLowerCase() || task.status?.toLowerCase());
      return status === 'pending' || status === 'open' || status === 'in_progress' || status === 'in progress';
    }).length;
    
    const overdueTasks = tasksData.filter(task => {
      const dbStatus = task.originalStatus?.toLowerCase() || task.status?.toLowerCase();
      // If already marked as overdue in DB, include it
      if (dbStatus === 'overdue') {
        return true;
      }
      // If not completed and past due date, it's overdue regardless of DB status
      if (dbStatus !== 'completed' && isOverdue(task.due_date, task.originalStatus || task.status)) {
        return true;
      }
      return false;
    }).length;
    
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      completionRate
    };
  };

  // Function to fetch house statistics from backend (alternative to frontend calculations)
  const fetchHouseStatistics = async () => {
    // Only fetch if user is logged in and has a house_id
    if (!user?.house_id) {
      console.log('No user or house_id available, skipping statistics fetch');
      return;
    }
    
    try {
      console.log('Fetching house statistics for house_id:', user.house_id);
      // Use authenticated API with the user's actual house
      const response = await getHouseStatistics(user.house_id);
      console.log('House statistics API response:', response);
      
      // The response structure is { data: { data: { tasks: {...}, bills: {...}, housemates: {...} } } }
      const statisticsData = response.data.data || response.data;
      const stats = statisticsData.tasks;
      
      if (stats) {
        setDashboardStats({
          totalTasks: stats.total || 0,
          completedTasks: stats.completed || 0,
          pendingTasks: stats.pending || 0,
          overdueTasks: stats.overdue || 0,
          completionRate: stats.completionRate || 0
        });
        
        console.log('Updated dashboard stats:', {
          totalTasks: stats.total || 0,
          completedTasks: stats.completed || 0,
          pendingTasks: stats.pending || 0,
          overdueTasks: stats.overdue || 0,
          completionRate: stats.completionRate || 0
        });
      } else {
        console.error('No task statistics found in response:', statisticsData);
      }
    } catch (error) {
      console.error('Error fetching house statistics:', error);
      // Fall back to frontend calculation if backend fails
      const stats = calculateDashboardStats(tasks);
      setDashboardStats(stats);
    }
  };

  // Fetch tasks, bills, and events when user has house_id
  useEffect(() => {
    fetchTasks(); // This will also fetch house statistics
    fetchBills();
    fetchEvents();
  }, [user?.house_id]);

  // Auto-assign tasks to current user for standard users
  useEffect(() => {
    if (isStandard && user && housemates.length > 0) {
      const currentUserName = `${user.name} ${user.surname || ''}`.trim();
      const userExists = housemates.find(hm => hm.name === currentUserName);
      if (userExists && taskFormData.assignedTo === '') {
        setTaskFormData(prev => ({
          ...prev,
          assignedTo: currentUserName
        }));
      }
    }
  }, [isStandard, user, housemates, taskFormData.assignedTo]);

  useEffect(() => {
    // Only fetch if user and user.house_id exist
    if (user && user.house_id) {
      getHouse(user.house_id)
        .then(res => {
          const house = res.data;
          setHouseholdSettings(prev => ({
            ...prev,
            houseName: house.name || '',
            avatar: house.avatar || '',
            address: house.address || '',
            houseRules: house.house_rules || '',
          }));
        })
        .catch(() => {
          // fallback to defaults if error
          setHouseholdSettings(prev => ({
            ...prev,
            houseName: '',
            avatar: '',
            address: '',
            houseRules: '',
          }));
        });
    }
  }, [user]);

  // Refetch bills when bills page view changes
  useEffect(() => {
    if (currentPage === 'Bills' && user?.house_id) {
      fetchBills();
    }
  }, [billsPageView, currentPage, user?.house_id]);

  // Refetch events when schedule page view changes
  useEffect(() => {
    if (currentPage === 'Schedule' && user?.house_id) {
      fetchEvents();
    }
  }, [schedulePageView, currentPage, user?.house_id]);

  // Auto-set payment form for standard users to themselves only
  useEffect(() => {
    if (isStandard && user && paymentFormData.payingFor === '') {
      setPaymentFormData(prev => ({
        ...prev,
        payingFor: user.id?.toString() || ''
      }));
    }
  }, [isStandard, user, paymentFormData.payingFor]);

  // Function to fetch recent activities
  const fetchRecentActivities = async (houseId) => {
    try {
      const { getRecentActivities } = await import('../../apiHelpers');
      const res = await getRecentActivities(houseId);
      return res.data;
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      return [];
    }
  };

  // Fetch housemates when user has house_id
  useEffect(() => {
    console.log('User object:', user);
    console.log('User house_id:', user?.house_id);
    if (user && user.house_id) {
      console.log('Fetching housemates for house_id:', user.house_id);
      setLoadingHousemates(true);
      getHousemates(user.house_id)
        .then(res => {
          console.log('Housemates API response:', res.data);
          const housematesData = res.data.map(housemate => ({
            id: housemate.id,
            name: `${housemate.name} ${housemate.surname || ''}`.trim(),
            initials: `${housemate.name?.[0] || ''}${housemate.surname?.[0] || ''}`.toUpperCase(),
            email: housemate.email,
            phone: housemate.phone || '',
            role: housemate.is_house_creator ? 'admin' : housemate.role, // House creators are always admin
            bio: housemate.bio || '',
            avatar: housemate.avatar,
            lastActive: housemate.last_login,
            isOnline: false, // We'd need to implement real-time status
            joinedDate: housemate.created_at,
            preferredContact: housemate.preferred_contact || 'email',
            showContact: housemate.show_contact_info !== undefined ? Boolean(housemate.show_contact_info) : true,
            isHouseCreator: Boolean(housemate.is_house_creator), // Mark the house creator
            // Statistics will be fetched separately
            tasksCompleted: 0,
            tasksAssigned: 0,
            totalBillsPaid: 0,
            avatarBg: `bg-${['blue', 'purple', 'green', 'orange', 'pink', 'indigo'][housemate.id % 6]}-500`
          }));
          setHousemates(housematesData);
          
          // Fetch statistics for each housemate
          fetchHousemateStatistics(housematesData);
        })
        .catch(error => {
          console.error('Error fetching housemates:', error);
          console.error('Full error:', error.response || error);
          setHousemates([]);
        })
        .finally(() => {
          setLoadingHousemates(false);
        });

      // Also fetch recent activities
      setLoadingActivities(true);
      fetchRecentActivities(user.house_id)
        .then(activities => {
          setRecentActivities(activities);
        })
        .catch(error => {
          console.error('Error fetching activities:', error);
          setRecentActivities([]);
        })
        .finally(() => {
          setLoadingActivities(false);
        });
    } else {
      setHousemates([]);
    }
  }, [user]);

  // Function to refresh housemates data
  const refreshHousemates = async () => {
    if (user && user.house_id) {
      try {
        setLoadingHousemates(true);
        const res = await getHousemates(user.house_id);
        const housematesData = res.data.map(housemate => ({
          id: housemate.id,
          name: `${housemate.name} ${housemate.surname || ''}`.trim(),
          initials: `${housemate.name?.[0] || ''}${housemate.surname?.[0] || ''}`.toUpperCase(),
          email: housemate.email,
          phone: housemate.phone || '',
          role: housemate.is_house_creator ? 'admin' : housemate.role, // House creators are always admin
          bio: housemate.bio || '',
          avatar: housemate.avatar,
          lastActive: housemate.last_login,
          isOnline: false, // We'd need to implement real-time status
          joinedDate: housemate.created_at,
          preferredContact: housemate.preferred_contact || 'email',
          showContact: true, // Default to true, could be a user setting
          isHouseCreator: Boolean(housemate.is_house_creator), // Mark the house creator
          // These would come from other API calls in a real app
          tasksCompleted: 0,
          tasksAssigned: 0,
          totalBillsPaid: 0,
          avatarBg: `bg-${['blue', 'purple', 'green', 'orange', 'pink', 'indigo'][housemate.id % 6]}-500`
        }));
        setHousemates(housematesData);
        
        // Fetch statistics for each housemate
        fetchHousemateStatistics(housematesData);
      } catch (error) {
        console.error('Error refreshing housemates:', error);
      } finally {
        setLoadingHousemates(false);
      }
    }
  };

  // Fetch bills from database
  const fetchBills = async () => {
    if (!user?.house_id) {
      console.log('No house_id available for fetching bills');
      return;
    }
    
    try {
      setLoadingBills(true);
      
      // Determine which bills to fetch based on role and current page view
      let viewParam = 'my'; // Default to user's own bills
      
      if (currentPage === 'Bills') {
        // On Bills page, use the Bills page view state
        viewParam = isAdmin && billsPageView === 'everyone' ? 'all' : 'my';
      } else {
        // On Dashboard, always show user's own bills for widgets
        viewParam = 'my';
      }
      
      console.log('Fetching bills with viewParam:', viewParam, 'for role:', user.role);
      const res = await getBills(user.house_id, viewParam);
      console.log('Bills API response:', res.data);
      
      // Extract the bills array from the response
      const billsData = res.data.data || res.data || [];
      console.log('Bills data array:', billsData);
      
      // Map backend data to frontend format
      console.log('About to map', billsData.length, 'bills');
      if (billsData.length === 0) {
        console.log('No bills found - setting empty array');
        setBills([]);
        setLoadingBills(false);
        return;
      }
      
      const mapped = billsData.map(bill => {
        // Find the category data, handle empty/null categories
        let categoryData;
        if (bill.category && bill.category !== '') {
          categoryData = billCategories.find(cat => cat.id === bill.category);
        }
        // Default to utilities if no category found
        if (!categoryData) {
          categoryData = billCategories.find(cat => cat.id === 'utilities') || billCategories[0];
        }
        
        // Calculate per person amount and payment tracking
        const totalShares = bill.total_shares || 0;
        const paidShares = bill.paid_shares || 0;
        const totalPaidAmount = parseFloat(bill.total_paid_amount) || 0;
        const billAmount = parseFloat(bill.amount) || 0;
        
        // Calculate per person amount
        let perPerson = 0;
        if (totalShares > 0 && billAmount > 0) {
          perPerson = billAmount / totalShares;
        } else if (totalShares === 0 && billAmount > 0) {
          // Personal bill (no shares)
          perPerson = billAmount;
        }
        
        // Determine status based on payment data and due dates
        let status = 'Pending';
        const dueDate = bill.due_date ? new Date(bill.due_date) : null;
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison
        
        if (totalShares > 0) {
          const paymentPercentage = billAmount > 0 ? totalPaidAmount / billAmount : 0;
          if (paymentPercentage >= 1.0) {
            status = 'Paid';
          } else if (paymentPercentage > 0) {
            status = 'Partially Paid';
          } else if (dueDate && dueDate < today) {
            status = 'Overdue';
          } else {
            status = 'Pending';
          }
        } else {
          // No shares means it's a personal bill
          if (dueDate && dueDate < today) {
            status = 'Overdue';
          } else {
            status = 'Pending';
          }
        }
        
        return {
          ...bill,
          icon: categoryData.icon,
          dueDate: bill.due_date ? new Date(bill.due_date).toLocaleDateString() : 'No due date',
          perPerson: Number(perPerson || 0).toFixed(2),
          paid: Number(totalPaidAmount || 0).toFixed(2),
          status: status,
          isOverdue: status === 'Overdue',
          paymentProgress: totalShares > 0 && billAmount > 0 ? Math.round((totalPaidAmount / billAmount) * 100) : 0,
          createdBy: bill.created_by_name ? `${bill.created_by_name} ${bill.created_by_surname || ''}`.trim() : 'Unknown',
          contributors: null // Will be implemented separately
        };
      });
      
      console.log('Mapped bills:', mapped);
      console.log('Setting bills state with', mapped.length, 'bills');
      setBills(mapped);
    } catch (error) {
      console.error('Error fetching bills:', error);
      setBills([]);
    } finally {
      setLoadingBills(false);
    }
  };

  // Handle bill form submission
  const handleSubmitBill = async () => {
    console.log('handleSubmitBill called with billFormData:', billFormData);
    console.log('selectedHousemates:', selectedHousemates);
    console.log('Current user:', user);

    // Role-based validation
    if (isReadOnly) {
      alert('You do not have permission to create bills.');
      return;
    }

    if (!billFormData.title || !billFormData.amount || !user?.id || !user?.house_id) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const billData = {
        title: billFormData.title,
        description: billFormData.description,
        amount: parseFloat(billFormData.amount),
        category: billFormData.category,
        split_method: billFormData.splitMethod,
        house_id: user.house_id,
        created_by: user.id,
        due_date: billFormData.dueDate || null,
        paid_by: null, // Always null as per your requirement - individual payments tracked in bill_share
        
        // Include bill sharing information
        bill_share: billFormData.splitMethod === 'equal' 
          ? housemates.map(housemate => ({
              user_id: housemate.id,
              share_amount: parseFloat(billFormData.amount) / housemates.length,
              is_settled: false
            }))
          : selectedHousemates.map(housemate => ({
              user_id: housemate.id, 
              share_amount: selectedHousemates.length > 0 
                ? parseFloat(billFormData.amount) / selectedHousemates.length 
                : parseFloat(billFormData.amount),
              is_settled: false
            }))
      };

      console.log('Creating bill with data:', billData);

      await addBill(billData);
      
      // Reset form and close modal
      setBillFormData({
        category: 'utilities', // Default to utilities category
        title: '',
        description: '',
        amount: '',
        dueDate: '',
        createdBy: 'You',
        splitMethod: 'equal',
        customSplits: {}
      });
      setSelectedHousemates([]);
      setIsBillFormOpen(false);
      
      // Refresh bills and statistics
      fetchBills();
      if (user?.house_id) {
        fetchHousemateStatistics(housemates);
      }
      
      console.log('Bill created successfully');
    } catch (error) {
      console.error('Error creating bill:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      
      let errorMessage = 'Error creating bill. Please try again.';
      
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 500:
            errorMessage = 'Server error occurred. Please check the bill data and try again.';
            break;
          case 400:
            errorMessage = 'Invalid bill data. Please check all fields and try again.';
            break;
          case 401:
            errorMessage = 'Authentication failed. Please sign in again.';
            break;
          case 403:
            errorMessage = 'You do not have permission to create bills.';
            break;
          default:
            errorMessage = `Server error (${status}). Please try again.`;
        }
      } else if (error.request) {
        errorMessage = 'Unable to connect to server. Please check your internet connection.';
      }
      
      alert(errorMessage);
    }
  };
  
  // Add task function (using state already declared at top level)
  
  // Add bill function (using state already declared at top level)
  
  // Payment functions (using state already declared at top level)
  
  // Event and calendar functions (using state already declared at top level)
  
  // Housemate functions (using state already declared at top level)
  
  // Settings functions (using state already declared at top level)

  // Load signed-in user's bio from DB (if available)
  useEffect(() => {
    if (user && user.id) {
      // getUser returns a promise
      import('../../apiHelpers').then(({ getUser }) => {
        getUser(user.id).then(res => {
          const dbUser = res.data;
          setProfileSettings(prev => ({
            ...prev,
            name: dbUser.name || '',
            email: dbUser.email || '',
            bio: dbUser.bio || '',
            phone: dbUser.phone || '',
            preferredContact: dbUser.preferred_contact || 'email',
            avatar: dbUser.avatar || null,
            id: dbUser.id // Ensure id is present for upload
          }));
          
          // Update privacy settings from database
          setPrivacySettings(prev => ({
            ...prev,
            showContactInfo: dbUser.show_contact_info !== undefined ? Boolean(dbUser.show_contact_info) : true
          }));
        });
      });
    }
  }, [user]);
  
  // householdSettings state is now declared above and fetched dynamically
  
  // Sidebar navigation setup
  
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
      id: 'bills_payments',
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

  const handleSubmitTask = async () => {
    console.log('handleSubmitTask called with taskFormData:', taskFormData);
    console.log('Available housemates:', housemates);
    console.log('Current user:', user);

    // Role-based assignment logic
    let finalAssignedTo = taskFormData.assignedTo;
    
    if (isStandard || isReadOnly) {
      // Standard and read-only users can only assign to themselves
      const currentUserName = `${user.name} ${user.surname || ''}`.trim();
      finalAssignedTo = currentUserName;
    }

    if (!taskFormData.category || !taskFormData.title || !finalAssignedTo) {
      alert('Please fill in all required fields: category, title, and assigned to.');
      return;
    }

    if (!user || !user.house_id) {
      alert('User information or house ID is missing.');
      return;
    }

    try {
      // Find the assigned housemate by name to get their ID
      const assignedHousemate = housemates.find(hm => hm.name === finalAssignedTo);
      console.log('Looking for housemate with name:', finalAssignedTo);
      console.log('Found assignedHousemate:', assignedHousemate);
      
      if (!assignedHousemate) {
        console.error('Housemate not found. Available housemates:', housemates.map(hm => hm.name));
        alert('Selected housemate not found.');
        return;
      }

      // Prepare task data for backend
      const taskData = {
        house_id: user.house_id,
        title: taskFormData.title,
        description: taskFormData.description || null,
        category: taskFormData.category,
        location: taskFormData.location || null,
        due_date: taskFormData.dueDate || null,
        priority: taskFormData.priority, // Already in correct format: 'low', 'medium', 'high'
        assigned_to: assignedHousemate.id,
        created_by: user.id
      };

      console.log('Creating task with data:', taskData);
      
      // Call API to create task
      const response = await addTask(taskData);
      console.log('Task created successfully:', response.data);

      // Refresh tasks list
      await fetchTasks();

      // Reset form
      setTaskFormData({
        category: '',
        title: '',
        description: '',
        location: '',
        dueDate: '',
        assignedTo: '',
        createdBy: 'You',
        priority: 'medium'
      });
      
      setIsTaskFormOpen(false);
      
      alert('Task created successfully!');
      
      // Refresh housemates data to update task counts
      refreshHousemates();
      
    } catch (error) {
      console.error('Error creating task:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      
      let errorMessage = 'Failed to create task. Please try again.';
      
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 500:
            errorMessage = 'Server error occurred. Please check the task data and try again.';
            break;
          case 400:
            errorMessage = 'Invalid task data. Please check all fields and try again.';
            break;
          case 401:
            errorMessage = 'Authentication failed. Please sign in again.';
            break;
          case 403:
            errorMessage = 'You do not have permission to create tasks.';
            break;
          default:
            errorMessage = `Server error (${status}). Please try again.`;
        }
      } else if (error.request) {
        errorMessage = 'Unable to connect to server. Please check your internet connection.';
      }
      
      alert(errorMessage);
    }
  };



  const handleRecordPayment = (billId) => {
    // Role-based access control for payment recording
    if (isReadOnly) {
      alert('You do not have permission to record payments.');
      return;
    }

    const bill = bills.find(b => b.id === billId);
    if (bill) {
      setSelectedBillId(billId);
      
      // Calculate default amount (per person share)
      const defaultAmount = bill.perPerson ? Number(bill.perPerson).toFixed(2) : '0.00';
      
      setPaymentFormData({
        amount: defaultAmount, // Default to per person amount
        paymentMethod: '',
        datePaid: new Date().toISOString().split('T')[0],
        notes: '',
        payingFor: user?.id?.toString() || '', // Default to current user
        paidBy: user?.id?.toString() || '' // Default to current user making payment
      });
      setIsPaymentFormOpen(true);
    }
  };

  const handleViewPayments = (billId) => {
    const bill = bills.find(b => b.id === billId);
    if (bill) {
      setSelectedBillForHistory(bill);
      setIsPaymentHistoryOpen(true);
    }
  };

  const handleSubmitPayment = async () => {
    // Role-based validation
    if (isReadOnly) {
      alert('You do not have permission to record payments.');
      return;
    }

    // Standard users can only pay for themselves
    if (isStandard && paymentFormData.payingFor !== user?.id?.toString()) {
      alert('You can only record payments for yourself.');
      return;
    }
    
    // Validation
    if (!selectedBillId) {
      alert('No bill selected');
      return;
    }
    
    if (!paymentFormData.payingFor) {
      alert('Please select who this payment is for');
      return;
    }
    
    if (!paymentFormData.paidBy) {
      alert('Please select who is making this payment');
      return;
    }
    
    if (!paymentFormData.amount || parseFloat(paymentFormData.amount) <= 0) {
      alert('Please enter a valid payment amount greater than 0');
      return;
    }
    
    if (!paymentFormData.paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsSubmittingPayment(true);

    try {
      console.log('Submitting payment with data:', {
        billId: selectedBillId,
        payingFor: paymentFormData.payingFor,
        paidBy: paymentFormData.paidBy,
        amount: paymentFormData.amount,
        method: paymentFormData.paymentMethod
      });

      const paymentData = {
        user_id: parseInt(paymentFormData.payingFor), // Who this payment is for
        paid_by_user_id: parseInt(paymentFormData.paidBy), // Who is making the payment
        amount_paid: parseFloat(paymentFormData.amount),
        payment_method: paymentFormData.paymentMethod,
        payment_notes: paymentFormData.notes || null
      };

      console.log('Sending payment data to API:', paymentData);
      const response = await payBill(selectedBillId, paymentData);
      console.log('Payment API response:', response);
      
      // Reset form and close modal
      setPaymentFormData({
        amount: '',
        paymentMethod: '',
        datePaid: new Date().toISOString().split('T')[0],
        notes: '',
        payingFor: '',
        paidBy: ''
      });
      setSelectedBillId(null);
      setIsPaymentFormOpen(false);
      
      // Refresh bills and statistics
      await fetchBills();
      if (user?.house_id) {
        fetchHousemateStatistics(housemates);
      }
      
      alert('Payment recorded successfully!');
      console.log('Payment recorded successfully');
    } catch (error) {
      console.error('Error recording payment:', error);
      console.error('Error details:', error.response?.data || error.message);
      alert(`Error recording payment: ${error.response?.data?.error || error.message || 'Unknown error'}. Please try again.`);
    } finally {
      setIsSubmittingPayment(false);
    }
  };

  // Helper functions for schedule
  const getAllScheduleItems = () => {
    const items = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Add tasks if filter is enabled
    if (scheduleFilters.tasks) {
      tasks.forEach(task => {
        let dueDate = '';
        let dueDateObj = null;
        
        // Parse task due date
        if (task.dueDate && task.dueDate !== 'No due date') {
          if (task.dueDate.includes('Today')) {
            dueDate = new Date().toISOString().split('T')[0];
            dueDateObj = new Date();
          } else if (task.dueDate.includes('Tomorrow')) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dueDate = tomorrow.toISOString().split('T')[0];
            dueDateObj = tomorrow;
          } else if (task.dueDate.includes('Yesterday')) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            dueDate = yesterday.toISOString().split('T')[0];
            dueDateObj = yesterday;
          } else {
            // Handle various date formats
            try {
              // Try parsing the due date directly
              if (task.dueDate.includes('/')) {
                // Format: MM/DD/YYYY or DD/MM/YYYY
                const dateParts = task.dueDate.replace('Due ', '').split('/');
                if (dateParts.length === 3) {
                  dueDateObj = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
                  dueDate = dueDateObj.toISOString().split('T')[0];
                }
              } else if (task.dueDate.includes('Due ')) {
                // Format: "Due Dec 18" or "Due December 18, 2024"
                const dateStr = task.dueDate.replace('Due ', '');
                const currentYear = new Date().getFullYear();
                
                // Add current year if not present
                const fullDateStr = dateStr.includes(currentYear.toString()) ? dateStr : `${dateStr} ${currentYear}`;
                dueDateObj = new Date(fullDateStr);
                
                if (!isNaN(dueDateObj.getTime())) {
                  dueDate = dueDateObj.toISOString().split('T')[0];
                }
              } else {
                // Try parsing as is
                dueDateObj = new Date(task.dueDate);
                if (!isNaN(dueDateObj.getTime())) {
                  dueDate = dueDateObj.toISOString().split('T')[0];
                }
              }
            } catch (error) {
              console.log('Error parsing task date:', task.dueDate, error);
            }
          }
        }
        
        if (dueDate && dueDateObj) {
          dueDateObj.setHours(0, 0, 0, 0);
          const isOverdue = dueDateObj < today && task.status !== 'completed';
          
          items.push({
            id: `task-${task.id || items.length}`,
            title: task.title,
            description: task.description || '',
            date: dueDate,
            type: 'task',
            assignedTo: task.assignedTo,
            status: task.status,
            priority: task.priority,
            color: isOverdue ? 'red' : 'blue', // Red for overdue, blue for upcoming
            icon: task.icon || <CheckSquare size={16} className={isOverdue ? "text-red-600" : "text-blue-600"} />,
            isOverdue: isOverdue,
            originalDueDate: task.dueDate
          });
        }
      });
    }
    
    // Add bills if filter is enabled
    if (scheduleFilters.bills) {
      bills.forEach(bill => {
        let dueDateObj = null;
        let billDate = '';
        
        // Parse bill due date
        if (bill.dueDate && bill.dueDate !== 'No due date') {
          try {
            if (typeof bill.dueDate === 'string') {
              // Handle various date formats
              if (bill.dueDate.includes('/')) {
                // MM/DD/YYYY format
                dueDateObj = new Date(bill.dueDate);
              } else if (bill.dueDate.includes('-')) {
                // YYYY-MM-DD format
                dueDateObj = new Date(bill.dueDate);
              } else {
                // Try parsing as is
                dueDateObj = new Date(bill.dueDate);
              }
            } else {
              dueDateObj = new Date(bill.dueDate);
            }
            
            if (!isNaN(dueDateObj.getTime())) {
              billDate = dueDateObj.toISOString().split('T')[0];
            }
          } catch (error) {
            console.log('Error parsing bill date:', bill.dueDate, error);
          }
        }
        
        if (billDate && dueDateObj) {
          dueDateObj.setHours(0, 0, 0, 0);
          const isOverdue = dueDateObj < today && bill.status !== 'paid' && bill.status !== 'Paid';
          
          items.push({
            id: `bill-${bill.id}`,
            title: bill.title,
            description: bill.description || '',
            date: billDate,
            type: 'bill',
            amount: bill.amount,
            status: bill.status,
            isOverdue: isOverdue,
            color: isOverdue ? 'red' : 'green', // Red for overdue, green for upcoming
            icon: bill.icon || <CreditCard size={16} className={isOverdue ? "text-red-600" : "text-green-600"} />,
            originalDueDate: bill.dueDate
          });
        }
      });
    }
    
    // Add house events if filter is enabled
    if (scheduleFilters.events) {
      houseEvents.forEach(event => {
        if (event.date) {
          items.push({
            id: `event-${event.id}`,
            title: event.title,
            description: event.description || '',
            date: event.date,
            time: event.time,
            type: 'event',
            attendees: event.attendees,
            color: 'purple',
            icon: <Calendar size={16} className="text-purple-600" />
          });
        }
      });
    }
    
    return items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getItemsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return getAllScheduleItems().filter(item => item.date === dateStr);
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
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    
    return weekDays;
  };

  const isSameMonth = (date1, date2) => {
    return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  };

  const isTodayCalendar = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
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

  const handleAddEvent = async () => {
    // Role-based validation
    if (isReadOnly) {
      alert('You do not have permission to create events.');
      return;
    }

    if (!eventFormData.title || !eventFormData.date) {
      console.error('Missing required fields: title and date');
      return;
    }

    if (!user?.house_id) {
      console.error('User house_id not found');
      return;
    }

    try {
      // Format the event data for the API
      const eventData = {
        house_id: user.house_id,
        title: eventFormData.title,
        description: eventFormData.description,
        scheduled_date: eventFormData.date,
        scheduled_time: eventFormData.time,
        type: eventFormData.type,
        attendees: eventFormData.attendees,
        recurrence: 'none', // For now, default to no recurrence
        created_by: user.id
      };

      console.log('Creating event:', eventData);
      
      // First, let's check the debug endpoint to see if the table is properly set up
      try {
        const debugResponse = await checkScheduleTable();
        console.log('Debug table check:', debugResponse.data);
        
        if (!debugResponse.data.exists) {
          alert('Schedule table is not properly set up. Please contact support.');
          return;
        }
      } catch (debugError) {
        console.warn('Could not check table status:', debugError);
      }
      
      // Call the API to create the event
      const response = await addEvent(eventData);
      console.log('Event created successfully:', response.data);

      // Create the new event object for local state
      const newEvent = {
        id: response.data.id,
        title: eventFormData.title,
        description: eventFormData.description,
        date: eventFormData.date,
        time: eventFormData.time,
        type: eventFormData.type,
        attendees: eventFormData.attendees,
        color: 'purple'
      };

      // Update the local state to include the new event
      setHouseEvents(prev => [...prev, newEvent]);
      
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
      console.log('Event added to calendar successfully');
      
    } catch (error) {
      console.error('Error creating event:', error);
      console.error('Full error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
      
      // Show user-friendly error message
      const errorMessage = error.response?.data?.error || error.message || 'Failed to create event';
      alert(`Error creating event: ${errorMessage}`);
    }
  };

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};  // Helper functions for housemates
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
    
    // Fetch detailed data for this housemate
    fetchHousemateDetails(housemate.id);
  };

  const handleActivityClick = (activityType) => {
    if (selectedActivityType === activityType) {
      setSelectedActivityType(null);
      return;
    }

    // Check if there are any items for this activity type
    let hasItems = false;
    if (activityType === 'completed') {
      hasItems = selectedHousemate.tasksCompleted > 0 && housemateCompletedTasks.length > 0;
    } else if (activityType === 'pending') {
      hasItems = selectedHousemate.tasksAssigned > 0 && housematePendingTasks.length > 0;
    } else if (activityType === 'bills') {
      hasItems = selectedHousemate.totalBillsPaid > 0 && housemateContributedBills.length > 0;
    }

    // Only set the activity type if there are items to show
    if (hasItems) {
      setSelectedActivityType(activityType);
    }
  };

  // Function to handle task card clicks for dashboard stats
  const handleTaskCardClick = (taskType) => {
    if (selectedTaskType === taskType && isTaskDetailOpen) {
      // If same card is clicked and detail view is open, close it
      setIsTaskDetailOpen(false);
      setSelectedTaskType(null);
      setFilteredTasks([]);
      return;
    }

    // Filter tasks based on the card clicked
    let filtered = [];
    const now = new Date();
    
    console.log('Filtering tasks for type:', taskType);
    console.log('Available tasks:', tasks.map(t => ({ id: t.id, title: t.title, originalStatus: t.originalStatus, status: t.status })));
    
    switch (taskType) {
      case 'total':
        filtered = tasks;
        break;
      case 'completed':
        // Use the original database status for filtering
        filtered = tasks.filter(task => task.originalStatus?.toLowerCase() === 'completed');
        break;
      case 'pending':
        // Check for all pending-type statuses in their original form
        filtered = tasks.filter(task => {
          const status = task.originalStatus?.toLowerCase();
          return status === 'pending' || status === 'open' || status === 'in_progress' || status === 'in progress';
        });
        break;
      case 'overdue':
        // Filter for overdue tasks - either those marked as overdue in DB OR those past due date
        filtered = tasks.filter(task => {
          const dbStatus = task.originalStatus?.toLowerCase();
          // If already marked as overdue in database, include it
          if (dbStatus === 'overdue') {
            return true;
          }
          // If not completed and past due date, it's overdue regardless of DB status
          if (dbStatus !== 'completed' && isOverdue(task.due_date, task.originalStatus)) {
            return true;
          }
          return false;
        });
        break;
      default:
        filtered = [];
    }
    
    console.log('Filtered tasks:', filtered.map(t => ({ id: t.id, title: t.title, originalStatus: t.originalStatus })));

    // Enhance filtered tasks with overdue information and proper formatting
    const enhancedTasks = filtered.map(task => enhanceTaskWithOverdueInfo(task));

    setSelectedTaskType(taskType);
    setFilteredTasks(enhancedTasks);
    setIsTaskDetailOpen(true);
  };

  // Function to close task detail view
  const closeTaskDetailView = () => {
    setIsTaskDetailOpen(false);
    setSelectedTaskType(null);
    setFilteredTasks([]);
  };

  // Function to fetch housemate's completed tasks
  const fetchHousemateCompletedTasks = async (housemateId) => {
    try {
      const response = await getUserCompletedTasks(housemateId);
      return response.data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completedDate: task.updated_at ? new Date(task.updated_at).toLocaleDateString() : 'Unknown',
        priority: task.priority ? task.priority.toUpperCase() + ' PRIORITY' : 'MEDIUM PRIORITY',
        category: task.category,
        location: task.location
      }));
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
      return [];
    }
  };

  // Function to fetch housemate's pending tasks
  const fetchHousematePendingTasks = async (housemateId) => {
    try {
      const response = await getUserPendingTasks(housemateId);
      return response.data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date',
        priority: task.priority ? task.priority.toUpperCase() + ' PRIORITY' : 'MEDIUM PRIORITY',
        status: task.status === 'in_progress' ? 'In Progress' : 'Pending',
        category: task.category,
        location: task.location,
        createdBy: task.created_by_name ? `${task.created_by_name} ${task.created_by_surname || ''}`.trim() : 'Unknown'
      }));
    } catch (error) {
      console.error('Error fetching pending tasks:', error);
      return [];
    }
  };

  // Wrapper functions for compatibility with existing UI code
  const getHousemateCompletedTasks = () => {
    return housemateCompletedTasks;
  };

  const getHousematePendingTasks = () => {
    return housematePendingTasks;
  };

  // Function to fetch housemate's contributed bills
  const fetchHousemateContributedBills = async (housemateId) => {
    try {
      const response = await getUserContributedBills(housemateId);
      return response.data.map(bill => ({
        id: bill.id,
        billTitle: bill.title,
        amount: parseFloat(bill.amount_paid),
        paidDate: bill.paid_date ? new Date(bill.paid_date).toLocaleDateString() : 'Unknown',
        paymentMethod: bill.payment_method || 'Unknown',
        totalAmount: parseFloat(bill.amount),
        description: bill.description
      }));
    } catch (error) {
      console.error('Error fetching contributed bills:', error);
      return [];
    }
  };

  // Wrapper function for compatibility with existing UI code
  const getHousemateBillPayments = () => {
    return housemateContributedBills;
  };

  // Function to fetch all housemate details when modal opens
  const fetchHousemateDetails = async (housemateId) => {
    setLoadingHousemateDetails(true);
    try {
      const [completedTasks, pendingTasks, contributedBills] = await Promise.all([
        fetchHousemateCompletedTasks(housemateId),
        fetchHousematePendingTasks(housemateId),
        fetchHousemateContributedBills(housemateId)
      ]);
      
      setHousemateCompletedTasks(completedTasks);
      setHousematePendingTasks(pendingTasks);
      setHousemateContributedBills(contributedBills);
    } catch (error) {
      console.error('Error fetching housemate details:', error);
    } finally {
      setLoadingHousemateDetails(false);
    }
  };

  const toggleContactVisibility = (housemateId) => {
    // This would typically update the backend, for now we'll just log
    console.log(`Toggling contact visibility for housemate ${housemateId}`);
  };

  const handleInviteHousemate = async () => {
    // Validation
    if (!inviteFormData.firstName || !inviteFormData.lastName || !inviteFormData.email) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!user || !user.house_id) {
      alert('Unable to determine house ID. Please try again.');
      return;
    }

    try {
      // Use the new invite API endpoint
      const { inviteUser } = await import('../../apiHelpers');
      
      const inviteData = {
        name: `${inviteFormData.firstName} ${inviteFormData.lastName}`,
        email: inviteFormData.email,
        role: inviteFormData.role,
        personalMessage: inviteFormData.personalMessage || 'Welcome to our household!'
      };

      console.log('Sending invitation:', inviteData);
      
      const response = await inviteUser(inviteData);

      // Reset form
      setInviteFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'standard',
        personalMessage: '',
        sendEmail: true
      });

      setIsInviteHousemateOpen(false);

      // Show success message with invite details
      alert(`Invitation sent successfully to ${inviteFormData.firstName} ${inviteFormData.lastName}!\n\nInvite Token: ${response.data.inviteToken}\n\nThe invitation will expire in 7 days.`);

    } catch (error) {
      console.error('Error sending invitation:', error);
      alert(`Error sending invitation: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleRoleChange = async (housemateId, newRole) => {
    try {
      // In a real app, this would update the backend
      const housemate = housemates.find(h => h.id === housemateId);
      if (!housemate) {
        alert('Housemate not found.');
        return;
      }

      // Prevent changing house creator's role
      if (housemate.isHouseCreator) {
        alert('Cannot change the role of the house creator. House creators must remain as Admin.');
        return;
      }

      // Prevent users from changing their own role
      if (housemate.id === user.id) {
        alert('You cannot change your own role.');
        return;
      }

      // Confirm the role change
      if (!confirm(`Are you sure you want to change ${housemate.name}'s role to ${newRole.charAt(0).toUpperCase() + newRole.slice(1)}?`)) {
        return;
      }

      // Use the new role update API
      const { updateUserRole } = await import('../../apiHelpers');
      
      console.log(`Updating role for housemate ${housemateId} to ${newRole}`);
      await updateUserRole(housemateId, newRole);

      // Update local state
      setHousemates(prev => prev.map(h => 
        h.id === housemateId ? { ...h, role: newRole } : h
      ));
      
      // Show confirmation
      alert(`${housemate.name}'s role has been successfully updated to ${newRole.charAt(0).toUpperCase() + newRole.slice(1)}`);

    } catch (error) {
      console.error('Error updating role:', error);
      alert(`Error updating role: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleRemoveUser = async (housemateId) => {
    try {
      const housemate = housemates.find(h => h.id === housemateId);
      if (!housemate) {
        alert('Housemate not found.');
        return;
      }

      // Prevent removing house creator
      if (housemate.isHouseCreator) {
        alert('Cannot remove the house creator.');
        return;
      }

      // Prevent users from removing themselves
      if (housemate.id === user.id) {
        alert('You cannot remove yourself.');
        return;
      }

      // Confirm the removal
      if (!confirm(`Are you sure you want to remove ${housemate.name} from the household? This action cannot be undone.`)) {
        return;
      }

      // Use the new remove user API
      const { removeUser } = await import('../../apiHelpers');
      
      console.log(`Removing housemate ${housemateId}`);
      await removeUser(housemateId);

      // Update local state
      setHousemates(prevHousemates =>
        prevHousemates.filter(h => h.id !== housemateId)
      );
      
      // Show confirmation
      alert(`${housemate.name} has been successfully removed from the household.`);

    } catch (error) {
      console.error('Error removing user:', error);
      alert(`Error removing user: ${error.response?.data?.error || error.message}`);
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

    housemates.forEach(housemate => {
      if (stats.hasOwnProperty(housemate.role)) {
        stats[housemate.role]++;
      }
    });

    return stats;
  };

  return (
    <div className="h-screen min-h-0 bg-gray-50 flex overflow-hidden" role="application" aria-label="HouseMate Dashboard Application">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen flex-none overflow-hidden" role="navigation" aria-label="Main navigation">
        <header className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center overflow-hidden">
              <OptimizedImage
                src="/housemate-logo.png"
                webpSrc="/housemate-logo.webp"
                alt="HouseMate Logo"
                className="w-12 h-12 object-contain"
                onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
              />
            </div>
            <span className="font-bold text-2xl text-gray-900">HouseMate</span>
          </div>
        </header>
        
        <nav className="flex-1 px-4" role="navigation" aria-label="Dashboard navigation">
          <ul className="space-y-1" role="list">
            {sidebarItems.map((item, index) => (
              <li key={index} role="listitem">
                <button
                  onClick={() => setCurrentPage(item.label)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-purple-100 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-current={item.active ? 'page' : undefined}
                  aria-label={`Navigate to ${item.label} page`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full min-h-0 overflow-y-auto" role="main" aria-label="Main content area">
        {/* Page Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between" role="banner">
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
          {/* House avatar and name on far right */}
          {currentPage === 'Dashboard' && (
            <div className="flex items-center space-x-3" role="complementary" aria-label="House information">
              <OptimizedImage
                src={householdSettings.avatar ? `data:image/png;base64,${householdSettings.avatar}` : "/housemate-logo.png"}
                webpSrc={householdSettings.avatar ? null : "/housemate-logo.webp"}
                alt="House Avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-500 shadow"
                style={{background: 'white'}}
                onError={e => { e.target.onerror = null; e.target.src = "/housemate-logo.png"; }}
              />
              <span className="font-semibold text-lg text-gray-900">{householdSettings.houseName}</span>
            </div>
          )}
        </header>

        {/* Page Content */}
        {currentPage === 'Dashboard' && (
          <>
            {/* House Information Section */}
            <section className="p-8 pb-4" role="region" aria-labelledby="house-info">
              <article className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 id="house-info" className="text-lg font-semibold text-gray-900 mb-4">House Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* House Address */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-gray-500" aria-hidden="true" />
                      <h4 className="font-medium text-gray-700">Address</h4>
                    </div>
                    <address className="text-gray-600 pl-6 not-italic">
                      {householdSettings.address || 'No address set'}
                    </address>
                  </div>
                  
                  {/* House Rules */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FileText size={16} className="text-gray-500" aria-hidden="true" />
                      <h4 className="font-medium text-gray-700">House Rules</h4>
                    </div>
                    <div className="text-gray-600 pl-6">
                      {householdSettings.houseRules ? (
                        <div className="whitespace-pre-wrap text-sm">
                          {householdSettings.houseRules}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">No house rules set</span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </section>

            {/* Dashboard Statistics Overview */}
            <section className="px-8 pb-4" role="region" aria-labelledby="dashboard-stats">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" role="group" aria-label="Dashboard statistics">
                <StatsCard
                  title="Total Tasks"
                  amount={dashboardStats.totalTasks.toString()}
                  subtitle={isAdmin ? "All household tasks" : "Your tasks"}
                  icon={<CheckSquare size={20} />}
                  variant="default"
                  onClick={() => handleTaskCardClick('total')}
                />
                <StatsCard
                  title="Completed"
                  amount={dashboardStats.completedTasks.toString()}
                  subtitle={`${dashboardStats.completionRate}% completion rate`}
                  icon={<CheckCircle size={20} />}
                  variant="success"
                  onClick={() => handleTaskCardClick('completed')}
                />
                <StatsCard
                  title="Pending"
                  amount={dashboardStats.pendingTasks.toString()}
                  subtitle={`${dashboardStats.pendingTasks} tasks in progress`}
                  icon={<Clock size={20} />}
                  variant="warning"
                  onClick={() => handleTaskCardClick('pending')}
                />
                <StatsCard
                  title="Overdue"
                  amount={dashboardStats.overdueTasks.toString()}
                  subtitle={dashboardStats.overdueTasks > 0 ? `${dashboardStats.overdueTasks} ${dashboardStats.overdueTasks === 1 ? 'task needs' : 'tasks need'} attention` : 'All tasks on time'}
                  icon={<AlertTriangle size={20} />}
                  variant="danger"
                  onClick={() => handleTaskCardClick('overdue')}
                />
              </div>
            </section>

            {/* Task Detail View - appears when a stats card is clicked */}
            {isTaskDetailOpen && (
              <section className="px-8 pb-6" role="region" aria-labelledby="task-detail-view">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {selectedTaskType} Tasks
                      </h3>
                      <p className="text-sm text-gray-600">
                        {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={closeTaskDetailView}
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Close task details</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                  
                  {/* Task List */}
                  <div className="p-4">
                    {filteredTasks.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-gray-500">
                          No {selectedTaskType} tasks found.
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredTasks.map((task) => (
                          <TaskItem
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            category={task.category}
                            priority={task.priority}
                            dueDate={task.due_date}
                            status={task.status}
                            assignedTo={task.assigned_to_name}
                            avatarInitials={task.assigned_to_name ? task.assigned_to_name.split(' ').map(n => n[0]).join('') : ''}
                            onStatusChange={(newStatus) => handleTaskStatusChange(task.id, newStatus)}
                            isOverdue={task.isOverdue}
                            overdueDays={task.overdueDays}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

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
                  {/* Assigned By (non-editable) */}
                  <div className="col-span-2">
                    <Label htmlFor="task-assigned-by">Assigned By</Label>
                    <Input
                      id="task-assigned-by"
                      value={taskFormData.createdBy}
                      disabled
                      className="bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  </div>
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
                          <SelectItem key={housemate.id} value={housemate.name}>{housemate.name}</SelectItem>
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
                        <SelectItem value="low">Low Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="high">High Priority</SelectItem>
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

            {/* Main Dashboard Content Area */}
            <div className="flex flex-1" role="region" aria-label="Dashboard main content">
              {/* Tasks Section */}
              <section className="flex-1 px-8 pb-8" role="region" aria-labelledby="upcoming-tasks">
                <article className="bg-white rounded-lg border border-gray-200">
                  <header className="p-6 border-b border-gray-200">
                    <Tabs defaultValue="all" className="w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h2 id="upcoming-tasks" className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
                        <div className="flex items-center space-x-4" role="toolbar" aria-label="Task filtering options">
                          {/* Admin-only dropdown for 'everyone'/'me' */}
                          {isAdmin && (
                            <Select value={upcomingTasksView}
                              onValueChange={(value) => {
                                setUpcomingTasksView(value);
                                // Refetch tasks when view changes
                                fetchTasks();
                              }}
                              aria-label="Filter tasks by person"
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="everyone">Everyone</SelectItem>
                                <SelectItem value="own">My Tasks</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                          <TabsList className="grid w-48 grid-cols-3" role="tablist" aria-label="Task status filter">
                            <TabsTrigger value="all" role="tab">All</TabsTrigger>
                            <TabsTrigger value="today" role="tab">Today</TabsTrigger>
                            <TabsTrigger value="overdue" role="tab">Overdue</TabsTrigger>
                          </TabsList>
                        </div>
                      </div>
                        {/* Helper to get filtered tasks based on dropdown and tab */}
                        {['all', 'today', 'overdue'].map(tab => (
                          <TabsContent key={tab} value={tab} className="mt-6">
                            <div className="space-y-4">
                              {(() => {
                                let filteredTasks = [];
                                if (upcomingTasksView === 'me') {
                                  filteredTasks = tasks.filter(task => task.assignedTo === 'You');
                                } else {
                                  filteredTasks = tasks;
                                }
                                if (tab === 'today') {
                                  filteredTasks = filteredTasks.filter(task => task.dueDate.includes('Today'));
                                } else if (tab === 'overdue') {
                                  filteredTasks = filteredTasks.filter(task => task.status === 'Overdue');
                                }
                                return filteredTasks.length > 0
                                  ? filteredTasks.map((task, index) => (
                                      <TaskItem
                                        key={index}
                                        {...task}
                                        onStatusChange={newStatus => {
                                          setTasks(prevTasks => {
                                            const updatedTasks = prevTasks.map((t, i) => {
                                              if (i === tasks.indexOf(task)) {
                                                let updatedStatus = newStatus;
                                                // If not completed and past due date, set overdue
                                                if (newStatus !== 'Completed') {
                                                  let dueDateObj = null;
                                                  if (t.dueDate.includes('Today')) {
                                                    dueDateObj = new Date();
                                                  } else if (t.dueDate.includes('Tomorrow')) {
                                                    dueDateObj = new Date();
                                                    dueDateObj.setDate(dueDateObj.getDate() + 1);
                                                  } else {
                                                    const match = t.dueDate.match(/Due (\w+ \d+)/);
                                                    if (match) {
                                                      const currentYear = new Date().getFullYear();
                                                      dueDateObj = new Date(`${match[1]} ${currentYear}`);
                                                    }
                                                  }
                                                  if (dueDateObj && dueDateObj < new Date() && newStatus !== 'Completed') {
                                                    updatedStatus = 'Overdue';
                                                  }
                                                }
                                                return { ...t, status: updatedStatus };
                                              }
                                              return t;
                                            });
                                            // Refresh housemates data after task status change
                                            refreshHousemates();
                                            return updatedTasks;
                                          });
                                        }}
                                      />
                                    ))
                                  : <div className="text-center text-gray-400 py-8">No tasks found.</div>;
                              })()}
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                  </header>
                </article>

                {/* Today's Schedule Overview */}
                <article className="bg-white rounded-lg border border-gray-200 mt-6">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
                      <div className="flex items-center space-x-3">
                        {/* Admin-only dropdown for schedule view */}
                        {isAdmin && (
                          <Select value={scheduleDataView}
                            onValueChange={setScheduleDataView}
                            aria-label="Filter schedule by person"
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="everyone">Everyone</SelectItem>
                              <SelectItem value="own">My Schedule</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                        <button 
                          onClick={() => setCurrentPage('Schedule')}
                          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                        >
                          View Full Schedule
                        </button>
                      </div>
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
                                  ${Number(item.amount || 0).toFixed(2)}
                                </div>
                              )}
                              {item.type === 'task' && item.priority && (
                                <Badge variant={
                                  item.priority === 'high' ? 'destructive' :
                                  item.priority === 'MEDIUM PRIORITY' ? 'default' :
                                  'secondary'
                                } className="text-xs">
                                  {item.priority.split(' ')[0]}
                                </Badge>
                              )}
                              {item.type === 'task' && (
                                <div className="w-24">
                                  <Select value={item.status}
                                    onValueChange={newStatus => {
                                      const updatedTasks = tasks.map(t => {
                                        if (t.title === item.title && t.assignedTo === item.assignedTo) {
                                          let updatedStatus = newStatus;
                                          // If not completed and past due date, set overdue
                                          if (newStatus !== 'Completed') {
                                            let dueDateObj = null;
                                            if (t.dueDate.includes('Today')) {
                                              dueDateObj = new Date();
                                            } else if (t.dueDate.includes('Tomorrow')) {
                                              dueDateObj = new Date();
                                              dueDateObj.setDate(dueDateObj.getDate() + 1);
                                            } else {
                                              const match = t.dueDate.match(/Due (\w+ \d+)/);
                                              if (match) {
                                                const currentYear = new Date().getFullYear();
                                                dueDateObj = new Date(`${match[1]} ${currentYear}`);
                                              }
                                            }
                                            if (dueDateObj && dueDateObj < new Date() && newStatus !== 'Completed') {
                                              updatedStatus = 'Overdue';
                                            }
                                          }
                                          return { ...t, status: updatedStatus };
                                        }
                                        return t;
                                      });
                                      setTasks(updatedTasks);
                                      // Refresh housemates data after task status change
                                      refreshHousemates();
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Pending">Open</SelectItem>
                                      <SelectItem value="In Progress">In Progress</SelectItem>
                                      <SelectItem value="Completed">Completed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
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
                </article>
              </section>

              {/* Dashboard Sidebar */}
              <aside className="w-80 p-6 space-y-6" role="complementary" aria-label="Dashboard sidebar">
                {/* Quick Actions Section */}
                <section className="bg-white rounded-lg border border-gray-200 p-6" role="region" aria-labelledby="quick-actions">
                  <h3 id="quick-actions" className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <nav className="space-y-3" role="navigation" aria-label="Quick action buttons">
                    <button 
                      onClick={() => setIsTaskFormOpen(true)}
                      className="w-full text-left"
                      aria-label="Create new task"
                      disabled={isReadOnly}
                    >
                      <QuickAction
                        icon={<Plus size={16} className="text-white" />}
                        title="Create New Task"
                        description={isReadOnly ? "Read-only access" : isAdmin ? "Add a new household task" : "Add a task for yourself"}
                        iconBg={isReadOnly ? "bg-gray-400" : "bg-purple-500"}
                      />
                    </button>
                    <button 
                      onClick={() => setCurrentPage('Schedule')}
                      className="w-full text-left"
                      aria-label="View schedule"
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
                      aria-label="Manage bills"
                    >
                      <QuickAction
                        icon={<CreditCard size={16} className="text-white" />}
                        title="Manage Bills"
                        description="Track shared expenses"
                        iconBg="bg-orange-500"
                      />
                    </button>
                    {/* Admin-only quick action */}
                    {isAdmin && (
                      <button 
                        onClick={() => setIsInviteHousemateOpen(true)}
                        className="w-full text-left"
                        aria-label="Invite new housemate"
                      >
                        <QuickAction
                          icon={<UserPlus size={16} className="text-white" />}
                          title="Invite New Housemate"
                          description="Send invitation to join house"
                          iconBg="bg-blue-500"
                        />
                      </button>
                    )}
                  </nav>
                </section>

                {/* Recent Activity Section */}
                <section className="bg-white rounded-lg border border-gray-200 p-6" role="region" aria-labelledby="recent-activity" aria-live="polite">
                  <h3 id="recent-activity" className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  {loadingActivities ? (
                    <div className="space-y-1" aria-label="Loading recent activities">
                      <div className="animate-pulse">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : recentActivities.length > 0 ? (
                    <div className="space-y-1" role="list" aria-label="Recent activities">
                      {recentActivities.map((activity) => (
                        <ActivityItem
                          key={activity.id}
                          user={activity.user.name}
                          action={activity.description.replace(activity.user.name, '').trim()}
                          timeAgo={activity.timeAgo}
                          color="bg-blue-500"
                          avatar={activity.user.avatar}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500" role="status">
                      <p>No recent activity yet</p>
                      <p className="text-sm mt-1">Activity will appear here as housemates join and interact</p>
                    </div>
                  )}
                </section>

                {/* Housemates Section */}
                <section className="bg-white rounded-lg border border-gray-200 p-6" role="region" aria-labelledby="housemates-overview">
                  <h3 id="housemates-overview" className="font-semibold text-gray-900 mb-4">Housemates</h3>
                  {loadingHousemates ? (
                    <div className="text-center py-4 text-gray-500" role="status" aria-live="polite">Loading housemates...</div>
                  ) : housemates.length > 0 ? (
                    <div className="space-y-3" role="list" aria-label="Housemates list">
                      {housemates.slice(0, 3).map((housemate) => (
                        <HousemateItem
                          key={housemate.id}
                          name={housemate.name}
                          initials={housemate.initials}
                          tasks={`${housemate.tasksCompleted} tasks completed`}
                          statusColor={housemate.tasksAssigned > 0 ? "bg-yellow-500" : "bg-green-500"}
                          avatarBg={housemate.avatarBg}
                        />
                      ))}
                      {housemates.length > 3 && (
                        <div className="text-center pt-2">
                          <button 
                            onClick={() => setCurrentPage('Housemates')}
                            className="text-sm text-blue-600 hover:text-blue-800"
                            aria-label={`View all ${housemates.length} housemates`}
                          >
                            View all {housemates.length} housemates →
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500" role="status">
                      <p>No housemates found</p>
                    </div>
                  )}
                </section>
              </aside>
            </div>
          </>
        )}

        {currentPage === 'Tasks' && (
          <section className="flex-1 p-8" role="region" aria-labelledby="tasks-page">
            <article className="bg-white rounded-lg border border-gray-200">
              <header className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-4">
                    <h2 id="tasks-page" className="text-xl font-semibold text-gray-900">
                      {isAdmin && tasksPageView === 'everyone' ? 'All Household Tasks' : 'My Tasks'}
                    </h2>
                    {/* Admin-only toggle for viewing all vs own tasks */}
                    {isAdmin && (
                      <Select value={tasksPageView}
                        onValueChange={(value) => {
                          setTasksPageView(value);
                          // Refetch tasks when view changes
                          fetchTasks();
                        }}
                        aria-label="Filter tasks by person"
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="everyone">Everyone's Tasks</SelectItem>
                          <SelectItem value="own">My Tasks Only</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  {/* Create task button - disabled for read-only users */}
                  <Dialog open={isTaskFormOpen} onOpenChange={setIsTaskFormOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700" 
                        aria-label="Create new task"
                        disabled={isReadOnly}
                      >
                        <Plus size={16} className="mr-2" aria-hidden="true" />
                        {isReadOnly ? 'Read-Only Mode' : 'Create New Task'}
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
                          <Label htmlFor="task-assigned">
                            Assigned To
                            {isStandard && <span className="text-xs text-gray-500 ml-1">(Self only)</span>}
                          </Label>
                          <Select 
                            value={taskFormData.assignedTo} 
                            onValueChange={(value) => setTaskFormData({...taskFormData, assignedTo: value})}
                            disabled={isReadOnly}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={isStandard ? "Assigning to yourself" : "Select housemate"} />
                            </SelectTrigger>
                            <SelectContent>
                              {isAdmin ? (
                                // Admins can assign to anyone
                                housemates.map((housemate) => (
                                  <SelectItem key={housemate.id} value={housemate.name}>{housemate.name}</SelectItem>
                                ))
                              ) : (
                                // Standard users can only assign to themselves
                                housemates
                                  .filter(hm => hm.id === user.id)
                                  .map((housemate) => (
                                    <SelectItem key={housemate.id} value={housemate.name}>{housemate.name}</SelectItem>
                                  ))
                              )}
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
                              <SelectItem value="low">Low Priority</SelectItem>
                              <SelectItem value="medium">Medium Priority</SelectItem>
                              <SelectItem value="high">High Priority</SelectItem>
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
                      {loadingTasks ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                          <p className="text-gray-500 mt-2">Loading tasks...</p>
                        </div>
                      ) : filterTasksByType('all').length > 0 ? (
                        filterTasksByType('all').map((task, index) => (
                          <TaskItem 
                            key={task.id || index} 
                            {...enhanceTaskWithOverdueInfo(task)} 
                            onStatusChange={(newStatus) => handleTaskStatusChange(task.id, newStatus)}
                          />
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <CheckSquare size={48} className="mx-auto mb-4 text-gray-300" />
                          <p>No active tasks</p>
                          <p className="text-sm mt-1">Create a new task to get started</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="today" className="mt-6">
                    <div className="space-y-4">
                      {loadingTasks ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                          <p className="text-gray-500 mt-2">Loading tasks...</p>
                        </div>
                      ) : filterTasksByType('today').length > 0 ? (
                        filterTasksByType('today').map((task, index) => (
                          <TaskItem 
                            key={task.id || index} 
                            {...enhanceTaskWithOverdueInfo(task)} 
                            onStatusChange={(newStatus) => handleTaskStatusChange(task.id, newStatus)}
                          />
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                          <p>No tasks due today</p>
                          <p className="text-sm mt-1">Great job staying on top of your tasks!</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="overdue" className="mt-6">
                    <div className="space-y-4">
                      {loadingTasks ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                          <p className="text-gray-500 mt-2">Loading tasks...</p>
                        </div>
                      ) : filterTasksByType('overdue').length > 0 ? (
                        filterTasksByType('overdue').map((task, index) => (
                          <TaskItem 
                            key={task.id || index} 
                            {...enhanceTaskWithOverdueInfo(task)} 
                            onStatusChange={(newStatus) => handleTaskStatusChange(task.id, newStatus)}
                          />
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <AlertTriangle size={48} className="mx-auto mb-4 text-gray-300" />
                          <p>No overdue tasks</p>
                          <p className="text-sm mt-1">Excellent! You're up to date</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="past" className="mt-6">
                    <div className="space-y-4">
                      {loadingTasks ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                          <p className="text-gray-500 mt-2">Loading tasks...</p>
                        </div>
                      ) : filterTasksByType('past').length > 0 ? (
                        filterTasksByType('past').map((task, index) => (
                          <TaskItem 
                            key={task.id || index} 
                            {...enhanceTaskWithOverdueInfo(task)} 
                            onStatusChange={(newStatus) => handleTaskStatusChange(task.id, newStatus)}
                          />
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <CheckCircle size={48} className="mx-auto mb-4 text-gray-300" />
                          <p>No completed tasks yet</p>
                          <p className="text-sm mt-1">Completed tasks will appear here</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </header>
            </article>
          </section>
        )}

        {currentPage === 'Bills' && (
          <section className="flex-1 p-8" role="region" aria-labelledby="bills-page">
            <div className="space-y-6">
              {/* Bills Page Header */}
              <header className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div>
                    <h1 id="bills-page" className="text-2xl font-bold text-gray-900">
                      {isAdmin && billsPageView === 'everyone' ? 'All Household Bills' : 'My Bills'}
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                      {isAdmin && billsPageView === 'everyone' 
                        ? 'Manage all bills for the household' 
                        : isReadOnly 
                        ? 'View your bills (read-only access)'
                        : 'Manage your bills and payments'
                      }
                    </p>
                  </div>
                  
                  {/* Admin View Toggle */}
                  {isAdmin && (
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
                      <Switch
                        id="bills-view-toggle"
                        checked={billsPageView === 'everyone'}
                        onCheckedChange={(checked) => {
                          setBillsPageView(checked ? 'everyone' : 'own');
                        }}
                        className="data-[state=checked]:bg-purple-600"
                      />
                      <Label htmlFor="bills-view-toggle" className="text-sm font-medium text-gray-700">
                        {billsPageView === 'everyone' ? "Everyone's Bills" : 'My Bills Only'}
                      </Label>
                    </div>
                  )}
                </div>
                
                <Dialog open={isBillFormOpen} onOpenChange={setIsBillFormOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700" 
                      aria-label="Add new bill"
                      disabled={isReadOnly}
                    >
                      <Plus size={16} className="mr-2" aria-hidden="true" />
                      {isReadOnly ? 'Read-Only Mode' : 'Add New Bill'}
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
                        <Label htmlFor="bill-amount">Total Amount (R)</Label>
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
                        
                        {/* Only show "Share Bill With" section when Custom Split is selected */}
                        {billFormData.splitMethod === 'custom' && (
                          <div className="col-span-2">
                            <Label className="mb-3 block">Share Bill With</Label>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                              {housemates.map((housemate) => (
                                <div key={housemate.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                                  <input
                                    type="checkbox"
                                    id={`housemate-${housemate.id}`}
                                    checked={selectedHousemates.some(h => h.id === housemate.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedHousemates(prev => [...prev, housemate]);
                                      } else {
                                        setSelectedHousemates(prev => prev.filter(h => h.id !== housemate.id));
                                      }
                                    }}
                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                  />
                                  <Avatar className="h-8 w-8">
                                    {housemate.avatar ? (
                                      <AvatarImage src={housemate.avatar} alt={`${housemate.first_name}'s profile`} />
                                    ) : null}
                                    <AvatarFallback className="text-xs">
                                      {housemate.avatarInitials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                      {housemate.first_name} {housemate.last_name}
                                    </p>
                                    <p className="text-xs text-gray-500">{housemate.email}</p>
                                  </div>
                                  {selectedHousemates.some(h => h.id === housemate.id) && (
                                    <div className="text-xs text-purple-600 font-medium">
                                      R{billFormData.amount && selectedHousemates.length > 0 ? 
                                        (parseFloat(billFormData.amount || 0) / selectedHousemates.length).toFixed(2) : 
                                        '0.00'}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            {selectedHousemates.length > 0 && (
                              <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm text-purple-800">
                                  <strong>Selected:</strong> {selectedHousemates.length} housemate{selectedHousemates.length !== 1 ? 's' : ''}
                                </p>
                                <p className="text-sm text-purple-600 mt-1">
                                  Each person owes: R{billFormData.amount ? 
                                    (parseFloat(billFormData.amount || 0) / selectedHousemates.length).toFixed(2) : 
                                    '0.00'}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
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
              </header>

              {/* Bills Filter Tabs */}
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-80 grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  {/* Bills List */}
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-6">
                      <div className="space-y-4">
                        {loadingBills ? (
                          <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                            <p className="text-gray-500 mt-2">Loading bills...</p>
                          </div>
                        ) : filterBillsByType('all').length > 0 ? (
                          filterBillsByType('all').map((bill) => (
                            <BillItem
                              key={bill.id}
                              {...bill}
                              onRecordPayment={() => handleRecordPayment(bill.id)}
                              onViewPayments={() => handleViewPayments(bill.id)}
                            />
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <CreditCard size={48} className="mx-auto mb-4 text-gray-300" />
                            <p>No bills yet</p>
                            <p className="text-sm mt-1">Create your first bill to get started</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="in-progress" className="mt-6">
                  {/* In Progress Bills List */}
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-6">
                      <div className="space-y-4">
                        {loadingBills ? (
                          <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                            <p className="text-gray-500 mt-2">Loading bills...</p>
                          </div>
                        ) : filterBillsByType('in-progress').length > 0 ? (
                          filterBillsByType('in-progress').map((bill) => (
                            <BillItem
                              key={bill.id}
                              {...bill}
                              onRecordPayment={() => handleRecordPayment(bill.id)}
                              onViewPayments={() => handleViewPayments(bill.id)}
                            />
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <CreditCard size={48} className="mx-auto mb-4 text-gray-300" />
                            <p>No bills in progress</p>
                            <p className="text-sm mt-1">Bills that are pending or partially paid will appear here</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="overdue" className="mt-6">
                  {/* Overdue Bills List */}
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-6">
                      <div className="space-y-4">
                        {loadingBills ? (
                          <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                            <p className="text-gray-500 mt-2">Loading bills...</p>
                          </div>
                        ) : filterBillsByType('overdue').length > 0 ? (
                          filterBillsByType('overdue').map((bill) => (
                            <BillItem
                              key={bill.id}
                              {...bill}
                              onRecordPayment={() => handleRecordPayment(bill.id)}
                              onViewPayments={() => handleViewPayments(bill.id)}
                            />
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <CreditCard size={48} className="mx-auto mb-4 text-gray-300" />
                            <p>No overdue bills</p>
                            <p className="text-sm mt-1">Great! All bills are up to date</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="past" className="mt-6">
                  {/* Past Bills List */}
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-6">
                      <div className="space-y-4">
                        {loadingBills ? (
                          <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                            <p className="text-gray-500 mt-2">Loading bills...</p>
                          </div>
                        ) : filterBillsByType('past').length > 0 ? (
                          filterBillsByType('past').map((bill) => (
                            <BillItem
                              key={bill.id}
                              {...bill}
                              onRecordPayment={() => handleRecordPayment(bill.id)}
                              onViewPayments={() => handleViewPayments(bill.id)}
                            />
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <CreditCard size={48} className="mx-auto mb-4 text-gray-300" />
                            <p>No paid bills yet</p>
                            <p className="text-sm mt-1">Paid bills will appear here</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

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
                      <Label htmlFor="paying-for">
                        Who is this payment for?
                        {isStandard && (
                          <span className="text-xs text-gray-500 ml-2">(Self only)</span>
                        )}
                      </Label>
                      <Select 
                        value={paymentFormData.payingFor} 
                        onValueChange={(value) => setPaymentFormData({...paymentFormData, payingFor: value})}
                        disabled={isStandard} // Standard users can only pay for themselves
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select person" />
                        </SelectTrigger>
                        <SelectContent>
                          {isStandard ? (
                            // Standard users see only themselves
                            <SelectItem value={user?.id?.toString() || ''}>
                              {user?.name} {user?.surname}
                            </SelectItem>
                          ) : (
                            // Admins see all housemates
                            housemates.map((mate) => (
                              <SelectItem key={mate.id} value={mate.id.toString()}>
                                {mate.name} {mate.surname}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {isStandard && (
                        <p className="text-xs text-gray-500 mt-1">
                          Standard users can only record payments for themselves
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="paid-by">Who is making this payment?</Label>
                      <Select value={paymentFormData.paidBy} onValueChange={(value) => setPaymentFormData({...paymentFormData, paidBy: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select person" />
                        </SelectTrigger>
                        <SelectContent>
                          {housemates.map((mate) => (
                            <SelectItem key={mate.id} value={mate.id.toString()}>
                              {mate.name} {mate.surname}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="payment-amount">Payment Amount (R)</Label>
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
                    <Button 
                      variant="outline" 
                      onClick={() => setIsPaymentFormOpen(false)}
                      disabled={isSubmittingPayment}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmitPayment} 
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={isSubmittingPayment}
                    >
                      {isSubmittingPayment ? 'Recording...' : 'Record Payment'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </section>
        )}

        {currentPage === 'Schedule' && (
          <div className="flex-1 flex" role="region" aria-labelledby="schedule-page">
            {/* Schedule Sidebar */}
            <aside className="w-80 bg-white border-r border-gray-200 p-6" role="complementary" aria-label="Schedule sidebar">
              <div className="space-y-6">
                {/* Schedule Quick Actions */}
                <section role="region" aria-labelledby="schedule-quick-actions">
                  <h3 id="schedule-quick-actions" className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <nav className="space-y-3" role="navigation" aria-label="Schedule quick actions">
                    <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          disabled={isReadOnly}
                        >
                          <Plus size={16} className="mr-2" />
                          {isReadOnly ? 'Read-Only Mode' : 'Add Event'}
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
                  </nav>
                </section>

                {/* Filters */}
                <section role="region" aria-labelledby="schedule-filters">
                  <h3 id="schedule-filters" className="font-semibold text-gray-900 mb-4">Filters</h3>
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
                </section>

                {/* Legend */}
                <section role="region" aria-labelledby="schedule-legend">
                  <h3 id="schedule-legend" className="font-semibold text-gray-900 mb-4">Calendar Legend</h3>
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
                </section>
              </div>
            </aside>

            {/* Schedule Main Content */}
            <section className="flex-1 p-8" role="region" aria-labelledby="schedule-main">
              <div className="space-y-6">
                {/* Schedule Header with View Toggle */}
                <header className="flex justify-between items-start">
                  <div>
                    <h2 id="schedule-main" className="text-xl font-semibold text-gray-900">
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
                </header>

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
                              } ${isTodayCalendar(day) ? 'bg-blue-50' : ''}`}
                            >
                              <div className={`text-sm font-medium mb-2 ${
                                isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                              } ${isTodayCalendar(day) ? 'text-blue-600' : ''}`}>
                                {day.getDate()}
                              </div>
                              
                              <div className="space-y-1">
                                {dayItems.slice(0, 3).map((item) => {
                                  // Color coding: Red for overdue, Blue for upcoming tasks, Green for upcoming bills
                                  let itemClasses = 'text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity ';
                                  
                                  if (item.color === 'red' || item.isOverdue) {
                                    itemClasses += 'bg-red-100 text-red-700 border border-red-200';
                                  } else if (item.type === 'task') {
                                    itemClasses += 'bg-blue-100 text-blue-700 border border-blue-200';
                                  } else if (item.type === 'bill') {
                                    itemClasses += 'bg-green-100 text-green-700 border border-green-200';
                                  } else if (item.type === 'event') {
                                    itemClasses += 'bg-purple-100 text-purple-700 border border-purple-200';
                                  }
                                  
                                  return (
                                    <div
                                      key={item.id}
                                      className={itemClasses}
                                      onClick={() => handleEventClick(item)}
                                      onMouseEnter={() => setHoveredItem(item)}
                                      onMouseLeave={() => setHoveredItem(null)}
                                      title={`${item.title} - ${item.description || ''} ${item.isOverdue ? '(OVERDUE)' : ''}`}
                                    >
                                      <div className="flex items-center space-x-1">
                                        {item.icon && <span className="inline-block">{item.icon}</span>}
                                        <span className="truncate">
                                          {item.title.length > 12 ? `${item.title.substring(0, 12)}...` : item.title}
                                        </span>
                                      </div>
                                      {item.amount && (
                                        <div className="text-xs opacity-75">
                                          R{Number(item.amount || 0).toFixed(0)}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                                {dayItems.length > 3 && (
                                  <div className="text-xs text-gray-500 text-center bg-gray-100 p-1 rounded">
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
                              isTodayCalendar(day) ? 'text-blue-600' : 'text-gray-900'
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
                                isTodayCalendar(day) ? 'bg-blue-50' : 'bg-white'
                              }`}
                            >
                              <div className="space-y-2">
                                {dayItems.map((item) => {
                                  // Color coding: Red for overdue, Blue for upcoming tasks, Green for upcoming bills
                                  let itemClasses = 'text-sm p-2 rounded cursor-pointer hover:opacity-80 transition-opacity ';
                                  
                                  if (item.color === 'red' || item.isOverdue) {
                                    itemClasses += 'bg-red-100 text-red-700 border border-red-200';
                                  } else if (item.type === 'task') {
                                    itemClasses += 'bg-blue-100 text-blue-700 border border-blue-200';
                                  } else if (item.type === 'bill') {
                                    itemClasses += 'bg-green-100 text-green-700 border border-green-200';
                                  } else if (item.type === 'event') {
                                    itemClasses += 'bg-purple-100 text-purple-700 border border-purple-200';
                                  }
                                  
                                  return (
                                    <div
                                      key={item.id}
                                      className={itemClasses}
                                      onClick={() => handleEventClick(item)}
                                      onMouseEnter={() => setHoveredItem(item)}
                                      onMouseLeave={() => setHoveredItem(null)}
                                      title={`${item.title} - ${item.description || ''} ${item.isOverdue ? '(OVERDUE)' : ''}`}
                                    >
                                      <div className="flex items-center space-x-2">
                                        {item.icon && <span className="inline-block">{item.icon}</span>}
                                        <div className="font-medium truncate">{item.title}</div>
                                      </div>
                                      {item.time && (
                                        <div className="text-xs opacity-75 mt-1">{item.time}</div>
                                      )}
                                      {item.amount && (
                                        <div className="text-xs opacity-75 mt-1">
                                          R{Number(item.amount || 0).toFixed(0)}
                                        </div>
                                      )}
                                      {item.isOverdue && (
                                        <div className="text-xs font-bold text-red-800 mt-1">OVERDUE</div>
                                      )}
                                    </div>
                                  );
                                })}
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
                          getAllScheduleItems().map((item) => {
                            // Color coding for the indicator dot
                            let indicatorColor = '';
                            if (item.color === 'red' || item.isOverdue) {
                              indicatorColor = 'bg-red-500';
                            } else if (item.type === 'task') {
                              indicatorColor = 'bg-blue-500';
                            } else if (item.type === 'bill') {
                              indicatorColor = 'bg-green-500';
                            } else if (item.type === 'event') {
                              indicatorColor = 'bg-purple-500';
                            }
                            
                            return (
                              <div
                                key={item.id}
                                className={`flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                                  item.isOverdue ? 'border-red-300 bg-red-50' : ''
                                }`}
                                onClick={() => handleEventClick(item)}
                              >
                                <div className="flex items-center space-x-4">
                                  <div className={`w-3 h-3 rounded-full ${indicatorColor}`}></div>
                                  <div className="flex items-center space-x-3">
                                    {item.icon}
                                    <div>
                                      <div className={`font-medium ${item.isOverdue ? 'text-red-900' : 'text-gray-900'}`}>
                                        {item.title}
                                        {item.isOverdue && <span className="ml-2 text-xs font-bold text-red-600">(OVERDUE)</span>}
                                      </div>
                                      <div className="text-sm text-gray-500">{item.description}</div>
                                      {item.originalDueDate && (
                                        <div className="text-xs text-gray-400 mt-1">
                                          Due: {item.originalDueDate}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className={`text-sm font-medium ${item.isOverdue ? 'text-red-700' : 'text-gray-900'}`}>
                                    {new Date(item.date).toLocaleDateString()}
                                  </div>
                                  {item.time && (
                                    <div className="text-sm text-gray-500">{item.time}</div>
                                  )}
                                  {item.amount && (
                                    <div className={`text-sm font-medium ${item.isOverdue ? 'text-red-600' : 'text-green-600'}`}>
                                      R{Number(item.amount || 0).toFixed(2)}
                                    </div>
                                  )}
                                  {item.assignedTo && (
                                    <div className="text-sm text-gray-600">{item.assignedTo}</div>
                                  )}
                                  {item.status && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      Status: {item.status}
                                    </div>
                                  )}
                                  {item.priority && (
                                    <div className={`text-xs mt-1 ${
                                      item.priority === 'high' ? 'text-red-600' :
                                      item.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                                    }`}>
                                      {item.priority} priority
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })
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
                            <SelectItem key={housemate.id} value={housemate.name}>{housemate.name}</SelectItem>
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
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
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
                                  selectedEvent.priority === 'high' ? 'destructive' :
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
                              ${Number(selectedEvent.amount || 0).toFixed(2)}
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
            </section>
          </div>
        )}

        {currentPage === 'Housemates' && (
          <section className="flex-1 p-8" role="region" aria-labelledby="housemates-page">
            <div className="space-y-6">
              {/* Housemates Page Header */}
              <header className="flex justify-between items-start">
                <div>
                  <h2 id="housemates-page" className="text-xl font-semibold text-gray-900">Housemates</h2>
                  <p className="text-gray-500 mt-1">
                    {isAdmin 
                      ? 'Manage your household members and their information'
                      : isReadOnly
                      ? 'View household members (read-only access)'
                      : 'View your household members'
                    }
                  </p>
                </div>
                
                {/* Admin-only controls */}
                {isAdmin ? (
                  <nav className="flex space-x-3" role="navigation" aria-label="Housemate management actions">
                    <Button variant="outline" onClick={() => setIsInviteHousemateOpen(true)} aria-label="Invite new housemate">
                      <Plus size={16} className="mr-2" aria-hidden="true" />
                      Invite Housemate
                    </Button>
                    
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
                                  {housemates.length} total members
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                {loadingHousemates ? (
                                  <div className="text-center py-4 text-gray-500">Loading members...</div>
                                ) : (
                                  housemates.map((housemate) => (
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
                                      
                                      {housemate.name !== 'You' && !housemate.isHouseCreator && (
                                        <div className="flex items-center space-x-2">
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
                                          
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRemoveUser(housemate.id)}
                                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                                          >
                                            <Trash2 size={14} />
                                          </Button>
                                        </div>
                                      )}
                                      
                                      {housemate.isHouseCreator && (
                                        <div className="text-sm text-gray-500 px-3 py-1">
                                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                            House Creator - Admin
                                          </Badge>
                                        </div>
                                      )}
                                      
                                      {housemate.name === 'You' && !housemate.isHouseCreator && (
                                        <div className="text-sm text-gray-500 px-3 py-1">
                                          Cannot modify own role
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  ))
                                )}
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
                </nav>
                ) : (
                  <div className="text-gray-500 text-sm">
                    {isReadOnly ? 'View-only access' : 'Limited access - contact admin for changes'}
                  </div>
                )}
              </header>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loadingHousemates ? (
                  <div className="col-span-full flex justify-center py-8">
                    <div className="text-gray-500">Loading housemates...</div>
                  </div>
                ) : housemates.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    <div className="text-gray-500">
                      No housemates found.
                      <br />
                      <small className="text-xs">
                        Debug: User ID: {user?.id}, House ID: {user?.house_id}, Housemates count: {housemates.length}
                      </small>
                    </div>
                  </div>
                ) : (
                  housemates.map((housemate) => (
                    <HousemateCard
                      key={housemate.id}
                      {...housemate}
                      onContactToggle={toggleContactVisibility}
                      onViewDetails={handleHousemateClick}
                    />
                  ))
                )}
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
                      {housemates.filter(h => h.role === 'admin').length} members
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <div className="font-medium text-blue-900">Standard</div>
                      <div className="text-sm text-blue-700">Can create tasks and bills</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      {housemates.filter(h => h.role === 'standard').length} members
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <div className="font-medium text-gray-900">Read-only</div>
                      <div className="text-sm text-gray-700">View only access</div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                      {housemates.filter(h => h.role === 'read-only').length} members
                    </Badge>
                  </div>
                  
                  {housemates.filter(h => h.isHouseCreator).length > 0 && (
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div>
                        <div className="font-medium text-yellow-900">House Creator</div>
                        <div className="text-sm text-yellow-700">Original house creator</div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                        {housemates.filter(h => h.isHouseCreator).length} member
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                {loadingActivities ? (
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentActivities.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                          {activity.user.avatar && activity.user.avatar.trim() !== '' ? (
                            <img 
                              src={activity.user.avatar}
                              alt={`${activity.user.name}'s profile`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white text-xs font-medium">
                              {activity.user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{activity.description}</div>
                          <div className="text-xs text-gray-500">{activity.timeAgo}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No recent activity yet</p>
                    <p className="text-sm mt-1">Activity will appear here as housemates join and interact</p>
                  </div>
                )}
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
                          {selectedHousemate.avatar && selectedHousemate.avatar.trim() !== '' ? (
                            <img 
                              src={selectedHousemate.avatar}
                              alt={`${selectedHousemate.name}'s profile`}
                              className="w-12 h-12 rounded-full object-cover border-2 border-white"
                              onError={(e) => {
                                console.log('Avatar failed to load for:', selectedHousemate.name, selectedHousemate.avatar);
                              }}
                            />
                          ) : (
                            <div className={`w-12 h-12 ${selectedHousemate.avatarBg} rounded-full flex items-center justify-center`}>
                              <span className="text-white font-medium">{selectedHousemate.initials}</span>
                            </div>
                          )}
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
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedHousemate.bio && selectedHousemate.bio.trim() ? 
                          selectedHousemate.bio : 
                          <span className="text-gray-400 italic">No bio available</span>
                        }
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div>
                      <Label className="text-sm font-medium text-gray-900 mb-3 block">Activity Summary</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => handleActivityClick('completed')}
                          disabled={selectedHousemate.tasksCompleted === 0}
                          className={`text-center p-4 rounded-lg border transition-all ${
                            selectedHousemate.tasksCompleted === 0 
                              ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                              : selectedActivityType === 'completed' 
                                ? 'bg-green-100 border-green-300 shadow-md hover:shadow-lg' 
                                : 'bg-green-50 border-green-200 hover:bg-green-100 hover:shadow-md cursor-pointer'
                          }`}
                        >
                          <div className="text-2xl font-semibold text-green-700">
                            {selectedHousemate.tasksCompleted > 0 ? 
                              selectedHousemate.tasksCompleted : 
                              <span className="text-gray-400 text-lg">N/A</span>
                            }
                          </div>
                          <div className="text-sm text-green-600">Tasks Completed</div>
                          {selectedHousemate.tasksCompleted > 0 ? (
                            <div className="text-xs text-green-500 mt-1">Click to view details</div>
                          ) : (
                            <div className="text-xs text-gray-400 mt-1">No tasks completed</div>
                          )}
                        </button>
                        <button
                          onClick={() => handleActivityClick('pending')}
                          disabled={selectedHousemate.tasksAssigned === 0}
                          className={`text-center p-4 rounded-lg border transition-all ${
                            selectedHousemate.tasksAssigned === 0 
                              ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                              : selectedActivityType === 'pending' 
                                ? 'bg-yellow-100 border-yellow-300 shadow-md hover:shadow-lg' 
                                : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100 hover:shadow-md cursor-pointer'
                          }`}
                        >
                          <div className="text-2xl font-semibold text-yellow-700">
                            {selectedHousemate.tasksAssigned > 0 ? 
                              selectedHousemate.tasksAssigned : 
                              <span className="text-gray-400 text-lg">N/A</span>
                            }
                          </div>
                          <div className="text-sm text-yellow-600">Tasks Pending</div>
                          {selectedHousemate.tasksAssigned > 0 ? (
                            <div className="text-xs text-yellow-500 mt-1">Click to view details</div>
                          ) : (
                            <div className="text-xs text-gray-400 mt-1">No pending tasks</div>
                          )}
                        </button>
                        <button
                          onClick={() => handleActivityClick('bills')}
                          disabled={selectedHousemate.totalBillsPaid === 0}
                          className={`text-center p-4 rounded-lg border transition-all ${
                            selectedHousemate.totalBillsPaid === 0 
                              ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                              : selectedActivityType === 'bills' 
                                ? 'bg-blue-100 border-blue-300 shadow-md hover:shadow-lg' 
                                : 'bg-blue-50 border-blue-200 hover:bg-blue-100 hover:shadow-md cursor-pointer'
                          }`}
                        >
                          <div className="text-2xl font-semibold text-blue-700">
                            {selectedHousemate.totalBillsPaid > 0 ? 
                              `R${Number(selectedHousemate.totalBillsPaid || 0).toFixed(0)}` : 
                              <span className="text-gray-400 text-lg">N/A</span>
                            }
                          </div>
                          <div className="text-sm text-blue-600">Bills Contributed</div>
                          {selectedHousemate.totalBillsPaid > 0 ? (
                            <div className="text-xs text-blue-500 mt-1">Click to view details</div>
                          ) : (
                            <div className="text-xs text-gray-400 mt-1">No contributions yet</div>
                          )}
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
                              {housemateCompletedTasks.map((task) => (
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
                              {housemateCompletedTasks.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                  <CheckCircle size={32} className="mx-auto mb-2 text-gray-300" />
                                  <p className="text-sm">No completed tasks yet</p>
                                </div>
                              )}
                            </>
                          )}

                          {selectedActivityType === 'pending' && (
                            <>
                              {housematePendingTasks.map((task, index) => (
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
                              {housematePendingTasks.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                  <Clock size={32} className="mx-auto mb-2 text-gray-300" />
                                  <p className="text-sm">No pending tasks</p>
                                </div>
                              )}
                            </>
                          )}

                          {selectedActivityType === 'bills' && (
                            <>
                              {housemateContributedBills.map((payment) => (
                                <div key={payment.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <div className="flex items-center space-x-3">
                                    <CreditCard size={16} className="text-blue-600" />
                                    <div>
                                      <div className="font-medium text-blue-900">{payment.billTitle}</div>
                                      <div className="text-sm text-blue-700">via {payment.paymentMethod}</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-blue-900">${Number(payment.amount || 0).toFixed(2)}</div>
                                    <div className="text-sm text-blue-600">
                                      {new Date(payment.paidDate).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {housemateContributedBills.length === 0 && (
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
                              <>Showing {housemateCompletedTasks.length} completed tasks</>
                            )}
                            {selectedActivityType === 'pending' && (
                              <>Showing {housematePendingTasks.length} pending tasks</>
                            )}
                            {selectedActivityType === 'bills' && (
                              <>Total contributed: ${housemateContributedBills.reduce((sum, payment) => sum + Number(payment.amount || 0), 0).toFixed(2)} across {housemateContributedBills.length} payments</>
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
                                <div className="text-sm text-gray-600">
                                  {selectedHousemate.phone && selectedHousemate.phone.trim() ? 
                                    selectedHousemate.phone : 
                                    <span className="text-gray-400 italic">Not provided</span>
                                  }
                                </div>
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
          </section>
        )}

        {currentPage === 'Settings' && (
          <SettingsContent
            settingsTab={settingsTab}
            setSettingsTab={setSettingsTab}
            profileSettings={profileSettings}
            setProfileSettings={setProfileSettings} // Synchronous for input
            notificationSettings={notificationSettings}
            setNotificationSettings={setNotificationSettings}
            privacySettings={privacySettings}
            setPrivacySettings={setPrivacySettings}
            appSettings={appSettings}
            setAppSettings={setAppSettings}
            userRole={user?.role || 'standard'}
            householdSettings={householdSettings}
            setHouseholdSettings={setHouseholdSettings}
            onSaveHouseholdSettings={async (newHouseholdSettings) => {
              // In a real app, this would update the backend
              console.log('Saving household settings:', newHouseholdSettings);
              // For now, just update local state
              setHouseholdSettings(newHouseholdSettings);
            }}
            onSaveProfile={async (newSettings) => {
              // Only update DB on Save
              if (user && user.id && typeof newSettings.name === 'string') {
                const { updateUserName } = await import('../../apiHelpers');
                await updateUserName(user.id, newSettings.name || '');
              }
              if (user && user.id && typeof newSettings.email === 'string') {
                const { updateUserEmail } = await import('../../apiHelpers');
                await updateUserEmail(user.id, newSettings.email || '');
              }
              if (user && user.id && typeof newSettings.bio === 'string') {
                await updateUserBio(user.id, newSettings.bio || '');
              }
              if (user && user.id && typeof newSettings.phone === 'string') {
                await updateUserPhone(user.id, newSettings.phone || '');
              }
              if (user && user.id && typeof newSettings.preferredContact === 'string') {
                const { updateUserPreferredContact } = await import('../../apiHelpers');
                await updateUserPreferredContact(user.id, newSettings.preferredContact);
              }
              // After saving, reload user profile from backend to ensure latest preferredContact
              if (user && user.id) {
                const { getUser } = await import('../../apiHelpers');
                const res = await getUser(user.id);
                const dbUser = res.data;
                setProfileSettings(prev => ({
                  ...prev,
                  name: dbUser.name || '',
                  email: dbUser.email || '',
                  bio: dbUser.bio || '',
                  phone: dbUser.phone || '',
                  preferredContact: dbUser.preferred_contact || 'email'
                }));
                
                // Refresh housemates data to show updated bio/phone in housemate cards
                await refreshHousemates();
              }
            }}
            onSavePrivacy={async (newPrivacySettings) => {
              if (user && user.id) {
                const { updateUserPrivacy } = await import('../../apiHelpers');
                await updateUserPrivacy(user.id, { show_contact_info: newPrivacySettings.showContactInfo });
                
                // Refresh housemates data to show updated privacy settings
                await refreshHousemates();
              }
            }}
          />
        )}

        {currentPage !== 'Dashboard' && currentPage !== 'Tasks' && currentPage !== 'Bills' && currentPage !== 'Schedule' && currentPage !== 'Housemates' && currentPage !== 'Settings' && (
          <section className="flex-1 p-8" role="region" aria-label="Page under construction">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{currentPage}</h2>
              <p className="text-gray-500">This page is under construction.</p>
            </div>
          </section>
        )}
        
        {/* Global Modals - Always Available */}
        <Dialog open={isInviteHousemateOpen} onOpenChange={setIsInviteHousemateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Housemate</DialogTitle>
            <DialogDescription>
              Create a new housemate account for your household
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invite-firstName">First Name</Label>
                <Input
                  id="invite-firstName"
                  value={inviteFormData.firstName}
                  onChange={(e) => setInviteFormData({...inviteFormData, firstName: e.target.value})}
                  placeholder="John"
                />
              </div>
              <div>
                <Label htmlFor="invite-lastName">Last Name</Label>
                <Input
                  id="invite-lastName"
                  value={inviteFormData.lastName}
                  onChange={(e) => setInviteFormData({...inviteFormData, lastName: e.target.value})}
                  placeholder="Smith"
                />
              </div>
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
              <Label htmlFor="invite-personalMessage">Personal Message (Optional)</Label>
              <textarea
                id="invite-personalMessage"
                className="w-full p-2 border border-gray-300 rounded-md resize-none"
                rows="3"
                value={inviteFormData.personalMessage}
                onChange={(e) => setInviteFormData({...inviteFormData, personalMessage: e.target.value})}
                placeholder="Add a personal welcome message..."
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
            
            {/* Send Email Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div className="flex items-start space-x-3">
                <Mail className="text-gray-600 mt-0.5" size={20} />
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-900">Send Email Automatically</Label>
                  <p className="text-xs text-gray-500 mt-1">
                    Automatically send welcome email with login credentials to the new housemate
                  </p>
                </div>
              </div>
              <Switch
                checked={inviteFormData.sendEmail}
                onCheckedChange={(checked) => setInviteFormData({...inviteFormData, sendEmail: checked})}
              />
            </div>

          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsInviteHousemateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteHousemate} className="bg-purple-600 hover:bg-purple-700">
              <Plus size={16} className="mr-2" />
              Create Housemate
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment History Modal */}
      <PaymentHistoryModal
        isOpen={isPaymentHistoryOpen}
        onClose={() => setIsPaymentHistoryOpen(false)}
        billId={selectedBillForHistory?.id}
        billTitle={selectedBillForHistory?.title}
      />
      </main>

    </div>
  );
  
  } catch (error) {
    console.error("Dashboard rendering error:", error);
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Dashboard Error</h2>
          <p className="text-gray-600 mb-4">There was an error loading the dashboard.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

// Wrap the entire app in a protected route
const ProtectedDashboardApp = () => {
  return (
    <ProtectedRoute>
      <App />
    </ProtectedRoute>
  );
};

export { ProtectedDashboardApp as default };
