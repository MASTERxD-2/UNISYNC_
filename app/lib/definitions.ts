// This file contains type definitions for your database schema.
// It describes the shape of the data, and what data type each property should accept.

export type User = {
  user_id: string;
  name: string;
  email: string;
  role: string;
  institutional_id: string;
  department_id: string;
  profile_picture?: string;
  created_at: string;
  last_login: string;
};

export type Department = {
  department_id: string;
  name: string;
  abbreviation: string;
  faculty_incharge: string;
};

export type Event = {
  event_id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  created_by: string;
  location: string;
  visibility: 'public' | 'private'; // Adjust visibility type if needed
  event_type: string;
  is_recurring: boolean;
  recurrence_pattern?: string; // If recurring, a recurrence pattern might exist
  created_at: string;
};

export type EventAttendee = {
  event_id: string;
  user_id: string;
  status: 'accepted' | 'pending' | 'declined'; // Adjust based on your application
  is_organizer: boolean;
};

export type Permission = {
  permission_id: string;
  user_id: string;
  event_id: string;
  access_level: 'read' | 'write' | 'admin'; // Adjust access levels based on your application
};

export type Notification = {
  notification_id: string;
  user_id: string;
  type: string; // Can be 'email', 'push', or 'in-app'
  message: string;
  is_read: boolean;
  created_at: string;
};

export type Task = {
  task_id: string;
  user_id: string;
  title: string;
  description: string;
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  is_recurring: boolean;
  recurrence_pattern?: string;
  created_at: string;
};

export type AuditLog = {
  log_id: string;
  user_id: string;
  action: string; // Can be actions like 'create', 'update', 'delete', etc.
  target_id: string; // ID of the record being acted upon
  timestamp: string;
  ip_address: string;
};

export type RecurringEvent = {
  recurring_id: string;
  event_id: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // Number of intervals between events (e.g., every 2 days, 3 weeks, etc.)
  end_date: string;
};

export type CourseAssignment = {
  assignment_id: string;
  professor_id: string;
  course_code: string;
  course_title: string;
  semester: string;
};

export type AvailabilitySlot = {
  slot_id: string;
  faculty_id: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
};

export type SharedCalendar = {
  calendar_id: string;
  owner_id: string;
  shared_with_id: string;
  access_level: 'view' | 'edit'; // Adjust based on your application's needs
  created_at: string;
};
