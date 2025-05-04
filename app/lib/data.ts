import postgres from 'postgres';
import {
  User,
  Department,
  Event,
  EventAttendee,
  Permission,
  Notification,
  Task,
  AuditLog,
  RecurringEvent,
  CourseAssignment,
  AvailabilitySlot,
  SharedCalendar,
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchUsers() {
  try {
    const users = await sql<User[]>`SELECT * FROM users ORDER BY created_at DESC`;
    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchDepartments() {
  try {
    const departments = await sql<Department[]>`SELECT * FROM departments ORDER BY name ASC`;
    return departments;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch departments.');
  }
}

export async function fetchRecentEvents(limit = 10) {
  try {
    const events = await sql<Event[]>`
      SELECT * FROM events
      ORDER BY start_time DESC
      LIMIT ${limit}`;
    return events;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events.');
  }
}

export async function fetchEventAttendees(eventId: string) {
  try {
    const attendees = await sql<EventAttendee[]>`
      SELECT * FROM event_attendees WHERE event_id = ${eventId}`;
    return attendees;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch event attendees.');
  }
}

export async function fetchPermissionsByUser(userId: string) {
  try {
    const permissions = await sql<Permission[]>`
      SELECT * FROM permissions WHERE user_id = ${userId}`;
    return permissions;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch permissions.');
  }
}

export async function fetchNotifications(userId: string) {
  try {
    const notifications = await sql<Notification[]>`
      SELECT * FROM notifications WHERE user_id = ${userId} ORDER BY created_at DESC`;
    return notifications;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch notifications.');
  }
}

export async function fetchTasks(userId: string) {
  try {
    const tasks = await sql<Task[]>`
      SELECT * FROM tasks WHERE user_id = ${userId} ORDER BY due_date ASC`;
    return tasks;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

export async function fetchAuditLogs(userId: string) {
  try {
    const logs = await sql<AuditLog[]>`
      SELECT * FROM audit_logs WHERE user_id = ${userId} ORDER BY timestamp DESC`;
    return logs;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch audit logs.');
  }
}

export async function fetchRecurringEvents(eventId: string) {
  try {
    const recurrence = await sql<RecurringEvent[]>`
      SELECT * FROM recurring_events WHERE event_id = ${eventId}`;
    return recurrence;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recurring event details.');
  }
}

export async function fetchCourseAssignments(professorId: string) {
  try {
    const courses = await sql<CourseAssignment[]>`
      SELECT * FROM course_assignments WHERE professor_id = ${professorId}`;
    return courses;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch course assignments.');
  }
}

export async function fetchAvailabilitySlots(facultyId: string) {
  try {
    const slots = await sql<AvailabilitySlot[]>`
      SELECT * FROM availability_slots WHERE faculty_id = ${facultyId} ORDER BY start_time ASC`;
    return slots;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch availability slots.');
  }
}

export async function fetchSharedCalendars(userId: string) {
  try {
    const calendars = await sql<SharedCalendar[]>`
      SELECT * FROM shared_calendars WHERE owner_id = ${userId} OR shared_with_id = ${userId}`;
    return calendars;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch shared calendars.');
  }
}
