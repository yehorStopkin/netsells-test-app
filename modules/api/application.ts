import http from '@/modules/requests';

/**
 * Send application to the server. 
 * 
 * @param {FormData} request 
 * @returns {Promise<any>}
 */
export function sendApplication(request: FormData): Promise<any> {
    return http({
        url: 'https://recruitment-submissions.netsells.co.uk/api/vacancies/javascript-developer/submissions',
        method: 'POST',
        data: request,
    });
}
