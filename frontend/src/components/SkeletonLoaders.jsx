import React from 'react';

// Task Skeleton Component
export const TaskSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="flex items-center space-x-2">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
      <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);

// Bill Skeleton Component
export const BillSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-16"></div>
    </div>
    <div className="flex items-center justify-between">
      <div className="h-3 bg-gray-200 rounded w-24"></div>
      <div className="h-8 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);

// Dashboard Stats Skeleton
export const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-10 w-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

// Calendar Event Skeleton
export const EventSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-3 animate-pulse">
    <div className="flex items-start space-x-3">
      <div className="h-4 w-4 bg-gray-200 rounded mt-1"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

// Housemate Card Skeleton
export const HousemateSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
    <div className="flex items-center space-x-4">
      <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="h-8 bg-gray-200 rounded w-16"></div>
    </div>
  </div>
);

// Loading Spinner with message
export const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-4"></div>
    <p className="text-gray-600 text-sm">{message}</p>
  </div>
);

// Page Loading Skeleton
export const PageSkeleton = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-32"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto p-6">
        {children}
      </div>
    </div>
  </div>
);

export default {
  TaskSkeleton,
  BillSkeleton,
  StatsSkeleton,
  EventSkeleton,
  HousemateSkeleton,
  LoadingSpinner,
  PageSkeleton
};