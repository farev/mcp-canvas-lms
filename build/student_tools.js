// student_tools.ts - Student-focused tools for Canvas MCP Server
// Student-focused tools for the Canvas MCP Server
export const STUDENT_TOOLS = [
    {
        name: "canvas_get_assignments",
        description: "Get all assignments for a student in a course",
        inputSchema: {
            type: "object",
            properties: {
                course_id: { type: "number", description: "ID of the course" },
                include: {
                    type: "array",
                    items: { type: "string" },
                    description: "Additional information to include (e.g., submission, score_statistics, all_dates)"
                }
            },
            required: ["course_id"]
        }
    },
    {
        name: "canvas_get_assignment",
        description: "Get details of a specific assignment",
        inputSchema: {
            type: "object",
            properties: {
                course_id: { type: "number", description: "ID of the course" },
                assignment_id: { type: "number", description: "ID of the assignment" },
                include: {
                    type: "array",
                    items: { type: "string" },
                    description: "Additional information to include (e.g., submission, score_statistics, all_dates)"
                }
            },
            required: ["course_id", "assignment_id"]
        }
    },
    {
        name: "canvas_get_assignment_submissions",
        description: "Get a student's submissions for an assignment",
        inputSchema: {
            type: "object",
            properties: {
                course_id: { type: "number", description: "ID of the course" },
                assignment_id: { type: "number", description: "ID of the assignment" },
                user_id: { type: "number", description: "ID of the student (optional - current user if omitted)" }
            },
            required: ["course_id", "assignment_id"]
        }
    },
    {
        name: "canvas_get_course_syllabus",
        description: "Get the syllabus for a course",
        inputSchema: {
            type: "object",
            properties: {
                course_id: { type: "number", description: "ID of the course" }
            },
            required: ["course_id"]
        }
    },
    {
        name: "canvas_get_courses",
        description: "Get all courses the student is enrolled in",
        inputSchema: {
            type: "object",
            properties: {
                enrollment_state: {
                    type: "string",
                    description: "Filter by enrollment state (active, invited, completed, etc)"
                },
                enrollment_type: {
                    type: "string",
                    description: "Filter by enrollment type (student, teacher, etc)"
                },
                include: {
                    type: "array",
                    items: { type: "string" },
                    description: "Additional information to include (e.g., syllabus_body, term, total_students)"
                }
            }
        }
    },
    {
        name: "canvas_get_course_modules",
        description: "Get all modules for a course",
        inputSchema: {
            type: "object",
            properties: {
                course_id: { type: "number", description: "ID of the course" },
                include: {
                    type: "array",
                    items: { type: "string" },
                    description: "Additional information to include (e.g., items, content_details)"
                }
            },
            required: ["course_id"]
        }
    },
    {
        name: "canvas_get_module_items",
        description: "Get all items in a module",
        inputSchema: {
            type: "object",
            properties: {
                course_id: { type: "number", description: "ID of the course" },
                module_id: { type: "number", description: "ID of the module" },
                include: {
                    type: "array",
                    items: { type: "string" },
                    description: "Additional information to include (e.g., content_details)"
                }
            },
            required: ["course_id", "module_id"]
        }
    },
    {
        name: "canvas_get_grades",
        description: "Get all grades for a student in a course",
        inputSchema: {
            type: "object",
            properties: {
                course_id: { type: "number", description: "ID of the course" }
            },
            required: ["course_id"]
        }
    },
    {
        name: "canvas_get_course_announcements",
        description: "Get all announcements for a course",
        inputSchema: {
            type: "object",
            properties: {
                course_id: { type: "number", description: "ID of the course" },
                start_date: { type: "string", description: "Start date for announcements (ISO format)" },
                end_date: { type: "string", description: "End date for announcements (ISO format)" }
            },
            required: ["course_id"]
        }
    },
    {
        name: "canvas_get_calendar_events",
        description: "Get calendar events for a course",
        inputSchema: {
            type: "object",
            properties: {
                course_id: { type: "number", description: "ID of the course" },
                start_date: { type: "string", description: "Start date for events (ISO format)" },
                end_date: { type: "string", description: "End date for events (ISO format)" },
                type: {
                    type: "string",
                    description: "Type of events to include (assignment, event, etc)"
                }
            },
            required: ["course_id"]
        }
    }
];
