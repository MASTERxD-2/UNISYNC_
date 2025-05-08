import { NextResponse } from 'next/server';
import { fetchAvailabilitySlots } from '@/app/lib/data';

// Helper to merge busy slots and find free intervals
type BusySlot = { start_time: string | Date; end_time: string | Date };
function findCommonFreeSlots(
  busySlotsArr: BusySlot[][],
  rangeStart: string | Date,
  rangeEnd: string | Date
): { start: Date; end: Date }[] {
  // busySlotsArr: Array of arrays of { start_time, end_time }
  // 1. Merge all busy slots into one array
  const allBusy = busySlotsArr.flat().map((slot: BusySlot) => ({
    start: new Date(slot.start_time),
    end: new Date(slot.end_time)
  }));
  // 2. Sort by start time
  allBusy.sort((a, b) => a.start.getTime() - b.start.getTime());
  // 3. Merge overlapping busy intervals
  const merged: { start: Date; end: Date }[] = [];
  for (const slot of allBusy) {
    if (!merged.length || slot.start > merged[merged.length-1].end) {
      merged.push({ ...slot });
    } else {
      merged[merged.length-1].end = new Date(Math.max(merged[merged.length-1].end.getTime(), slot.end.getTime()));
    }
  }
  // 4. Find free slots between merged busy intervals
  const free: { start: Date; end: Date }[] = [];
  let lastEnd = new Date(rangeStart);
  for (const slot of merged) {
    if (slot.start > lastEnd) {
      free.push({ start: new Date(lastEnd), end: new Date(slot.start) });
    }
    lastEnd = new Date(Math.max(lastEnd.getTime(), slot.end.getTime()));
  }
  if (lastEnd < new Date(rangeEnd)) {
    free.push({ start: new Date(lastEnd), end: new Date(rangeEnd) });
  }
  return free;
}

export async function POST(req: Request) {
  const { facultyIds, dateRange } = await req.json();
  if (!facultyIds || !dateRange) {
    return NextResponse.json({ error: 'Missing facultyIds or dateRange' }, { status: 400 });
  }
  try {
    // Fetch busy slots for each faculty
    const busySlotsArr = await Promise.all(
      facultyIds.map((id: string) => fetchAvailabilitySlots(id))
    );
    // Find common free slots
    const freeSlots = findCommonFreeSlots(busySlotsArr, dateRange.start, dateRange.end);
    return NextResponse.json({ freeSlots });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate free slots' }, { status: 500 });
  }
}
