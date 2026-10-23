import { test, expect } from '@playwright/test';

test.describe("API Tests", () => {

    test('GET all activities', async ({ request }) => {
        const response = await request.get('https://fakerestapi.azurewebsites.net/api/v1/Activities');
        console.log("response status:", await response.status());
        expect(response.status()).toBe(200); //200-299
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        console.log("Activity details:", responseBody);
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
    });

    test('GET activity by ID', async ({ request }) => {
        const response = await request.get('https://fakerestapi.azurewebsites.net/api/v1/Activities/1');
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log("Activity details by ID:", responseBody);
        expect(responseBody.id).toBe(1);
        expect(responseBody).toHaveProperty('title');
        expect(responseBody).toHaveProperty('dueDate');
        expect(responseBody).toHaveProperty('completed');
    });

    test('POST - Create activity', async ({ request }) => {

        //request body in object
        const newActivity = {

            "id": 121,
            "title": "activity 121",
            "dueDate": "2026-10-21T02:28:54.354Z",
            "completed": true
        };

        const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Activities',{
            data: newActivity,
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log("Activity craeted:", responseBody);

        expect(responseBody).toMatchObject(newActivity);
       
    });


});