import { test, expect } from '@playwright/test';

test.describe("API Tests", () => {

    test('GET - all test tags', async ({ request }) => {
        const tagsResponse = await request.get('/api/tags');
        const tagsResponseJSON = await tagsResponse.json();

        expect(tagsResponse.status()).toEqual(200);
        expect(tagsResponseJSON.tags[0]).toEqual('Test');
        console.log(tagsResponseJSON);

    });

    // test('POST - capture the auth Token', async ({ request }) => {
    //     const tokenResponse = await request.post('/api/users/login',
    //         { data: { "user": { "email": "pentester@test.com", "password": "welcome123" } } }
    //     );
    //     const tokenResponseJSON = await tokenResponse.json();
    //     const authtoken = tokenResponseJSON.user.token;
    //     console.log(authtoken)
    // });

    test('POST - Create article', {tag: '@Regression'}, async ({ request }) => {

        const tokenResponse = await request.post('/api/users/login',
            { data: { "user": { "email": "pentester@test.com", "password": "welcome123" } } }
        );
        const tokenResponseJSON = await tokenResponse.json();
        const authtoken = tokenResponseJSON.user.token;
        console.log(authtoken)
        const finalToken = 'Token ' + authtoken

        const articleResponse = await request.post('/api/articles',
            {
                data: {
                    "article": {
                        "title": "AB testing - New",
                        "description": "one of the basic testing",
                        "body": "test body for AB testing",
                        "tagList": {}
                    }
                },
                headers: {
                    Authorization: finalToken
                }
            }
        );
        const articleResponseJSON = await articleResponse.json();
        console.log(articleResponseJSON)
        const articleSlug = articleResponseJSON.article.slug;
        console.log(`article slug: ${articleSlug}`)


       const updatearticleResponse = await request.put(`/api/articles/${articleSlug}`,
            {
                data: {
                    "article": {
                        "title": "AB testing - modified",
                        "description": "one of the basic testing",
                        "body": "test body for AB testing",
                        "tagList": {}
                    }
                },
                headers: {
                    Authorization: finalToken
                }
            }
        );
        const updatearticleResponseJSON = await updatearticleResponse.json();
        console.log(updatearticleResponseJSON)
        const updatearticleSlug = updatearticleResponseJSON.article.slug;
        console.log(`article slug: ${updatearticleSlug}`)


        const deleteArticleResponse = await request.delete(`/api/articles/${updatearticleSlug}`, {
            headers: {
                Authorization: finalToken
            }
        });
        expect(deleteArticleResponse.status()).toEqual(204);

        const getallArticleResponse = await request.get('/api/articles', {
            headers: {
                Authorization: finalToken
            }
        });

        const allarticleResponseJSON = await getallArticleResponse.json();
        console.log(allarticleResponseJSON)
        const firstArticleSlug = allarticleResponseJSON.articles[0].slug;
        console.log(`--------first article slug ${firstArticleSlug}------------`)


    });







});