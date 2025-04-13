// client_extensions.ts - Additional client methods for student-focused tools
// Extend the CanvasClient class with student-focused methods
export function extendCanvasClient(client) {
    // Add method to get assignments with additional parameters
    client.getAssignmentsWithParams = async function (courseId, include) {
        const params = {};
        if (include && include.length > 0) {
            params.include = include.join(',');
        }
        const response = await this.client.get(`/courses/${courseId}/assignments`, { params });
        return response.data;
    };
    // Get assignment with additional parameters
    client.getAssignmentWithParams = async function (courseId, assignmentId, include) {
        const params = {};
        if (include && include.length > 0) {
            params.include = include.join(',');
        }
        const response = await this.client.get(`/courses/${courseId}/assignments/${assignmentId}`, { params });
        return response.data;
    };
    // Get a student's submissions for an assignment
    client.getStudentSubmission = async function (courseId, assignmentId, userId) {
        let url = `/courses/${courseId}/assignments/${assignmentId}/submissions`;
        // If userId is provided, get a specific student's submission
        if (userId) {
            url += `/${userId}`;
            const response = await this.client.get(url);
            return response.data;
        }
        // Otherwise, get the current user's submission
        else {
            url += `/self`;
            const response = await this.client.get(url);
            return response.data;
        }
    };
    // Get the syllabus for a course
    client.getCourseSyllabus = async function (courseId) {
        const response = await this.client.get(`/courses/${courseId}`, {
            params: {
                include: ['syllabus_body']
            }
        });
        return {
            course_id: response.data.id,
            course_name: response.data.name,
            syllabus_body: response.data.syllabus_body
        };
    };
    // Get all courses the student is enrolled in with parameters
    client.getCoursesWithParams = async function (enrollmentState, enrollmentType, include) {
        const params = {};
        if (enrollmentState) {
            params.enrollment_state = enrollmentState;
        }
        if (enrollmentType) {
            params.enrollment_type = enrollmentType;
        }
        if (include && include.length > 0) {
            params.include = include.join(',');
        }
        const response = await this.client.get('/courses', { params });
        return response.data;
    };
    // Get course modules with parameters
    client.getCourseModulesWithParams = async function (courseId, include) {
        const params = {};
        if (include && include.length > 0) {
            params.include = include.join(',');
        }
        const response = await this.client.get(`/courses/${courseId}/modules`, { params });
        return response.data;
    };
    // Get module items with parameters
    client.getModuleItemsWithParams = async function (courseId, moduleId, include) {
        const params = {};
        if (include && include.length > 0) {
            params.include = include.join(',');
        }
        const response = await this.client.get(`/courses/${courseId}/modules/${moduleId}/items`, { params });
        return response.data;
    };
    // Get grades for a course
    client.getCourseGradesForStudent = async function (courseId) {
        const response = await this.client.get(`/courses/${courseId}/assignments`);
        const assignments = response.data;
        const submissionsPromises = assignments.map((assignment) => this.client.get(`/courses/${courseId}/assignments/${assignment.id}/submissions/self`)
            .catch(() => ({ data: { score: null, grade: null } })));
        const submissions = await Promise.all(submissionsPromises);
        return assignments.map((assignment, index) => ({
            assignment_id: assignment.id,
            assignment_name: assignment.name,
            points_possible: assignment.points_possible,
            score: submissions[index].data.score,
            grade: submissions[index].data.grade
        }));
    };
    // Get course announcements
    client.getCourseAnnouncements = async function (courseId, startDate, endDate) {
        const params = {
            context_codes: [`course_${courseId}`]
        };
        if (startDate) {
            params.start_date = startDate;
        }
        if (endDate) {
            params.end_date = endDate;
        }
        const response = await this.client.get('/announcements', { params });
        return response.data;
    };
    // Get calendar events
    client.getCalendarEvents = async function (courseId, startDate, endDate, type) {
        const params = {
            context_codes: [`course_${courseId}`]
        };
        if (startDate) {
            params.start_date = startDate;
        }
        if (endDate) {
            params.end_date = endDate;
        }
        if (type) {
            params.type = type;
        }
        const response = await this.client.get('/calendar_events', { params });
        return response.data;
    };
}
