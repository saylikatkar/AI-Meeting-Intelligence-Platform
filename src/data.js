export const seedMeetings = [
  { id: 'MT-2048', title: 'Website Development — Sprint Planning', date: 'Today, 10:30 AM', duration: '48 min', status: 'Completed', attendees: 5, owner: 'You', summary: 'The team agreed to finalize the responsive dashboard this week, resolve two navigation issues, and review the upload flow before the next sprint.' },
  { id: 'MT-2047', title: 'Product Roadmap Review', date: 'Yesterday, 2:00 PM', duration: '36 min', status: 'Completed', attendees: 7, owner: 'You', summary: 'The group reviewed roadmap priorities, aligned on the onboarding improvements, and assigned follow-up research to the product team.' },
  { id: 'MT-2046', title: 'Design Handoff', date: 'Oct 11, 11:15 AM', duration: '22 min', status: 'Processing', attendees: 4, owner: 'You', summary: 'This meeting is still being processed. Its summary will appear when a real backend is connected.' },
  { id: 'MT-2045', title: 'Customer Feedback Roundup', date: 'Oct 10, 4:00 PM', duration: '51 min', status: 'Completed', attendees: 6, owner: 'You', summary: 'The team grouped feedback into usability, performance, and onboarding themes. The following action items are illustrative sample data.' },
  { id: 'MT-2044', title: 'Weekly Engineering Sync', date: 'Oct 9, 9:30 AM', duration: '29 min', status: 'Failed', attendees: 8, owner: 'You', summary: 'Sample failed record for demonstrating status and retry UI.' }
]

export const seedActions = [
  { id: 1, task: 'Finalize responsive dashboard layout', owner: 'Ayush Sharma', due: 'Oct 16, 2026', meeting: 'Website Development — Sprint Planning', status: 'In Progress' },
  { id: 2, task: 'Review upload validation states', owner: 'Elena Vance', due: 'Oct 17, 2026', meeting: 'Design Handoff', status: 'Pending' },
  { id: 3, task: 'Share sprint notes with stakeholders', owner: 'Rahul Mehta', due: 'Oct 15, 2026', meeting: 'Product Roadmap Review', status: 'Completed' }
]

export const sampleTeam = [
  { name: 'Ayush Sharma', email: 'ayush@example.com', role: 'Member', meetings: 12, status: 'Active' },
  { name: 'Elena Vance', email: 'elena@example.com', role: 'Manager', meetings: 28, status: 'Active' },
  { name: 'Rahul Mehta', email: 'rahul@example.com', role: 'Member', meetings: 9, status: 'Active' },
  { name: 'Marcus Reed', email: 'marcus@example.com', role: 'Admin', meetings: 34, status: 'Active' }
]
