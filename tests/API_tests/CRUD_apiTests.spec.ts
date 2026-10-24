import { test, expect } from '@playwright/test';

test.describe("API Tests", () => {

    test('GET - all test tags', {tag: '@api, @smoke'}, async ({ request }) => {
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

    test('POST - Create article', { tag: '@Regression , @api' }, async ({ request }) => {

        //Login and get the token
        const tokenResponse = await request.post('/api/users/login',
            { data: { "user": { "email": "pentester@test.com", "password": "welcome123" } } }
        );
        const tokenResponseJSON = await tokenResponse.json();
        const authtoken = tokenResponseJSON.user.token;
        console.log(authtoken)
        const finalToken = 'Token ' + authtoken
        //create article
        const articleResponse = await request.post('/api/articles',
            {
                data: {
                    "article": {
                        "title": "AB testing - new",
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
        console.log(`------article slug: ${articleSlug}-------------`)
        const NewarticleTitle = articleResponseJSON.article.title;
        console.log(`------New Post title: ${NewarticleTitle}-------------`);

        //update articles
        const updateArticleResponse = await request.put(`/api/articles/${articleSlug}`,
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

        const updateArticleResponseJSON = await updateArticleResponse.json();
        console.log(updateArticleResponseJSON);
        expect(updateArticleResponse.status()).toEqual(200);
        const updatedarticleTitle = updateArticleResponseJSON.article.title;
        console.log(`------Updated Post title: ${updatedarticleTitle}-------------`)
        expect(NewarticleTitle).not.toBe(updatedarticleTitle);

        const UpdatedarticleSlug = updateArticleResponseJSON.article.slug;
        console.log(`------updated article slug: ${UpdatedarticleSlug}-------------`)

        //delete article
        const DeleteArticleResponse = await request.delete(`/api/articles/${UpdatedarticleSlug}`,
            {
                headers: {
                    Authorization: finalToken
                }
            }
        );

        expect(DeleteArticleResponse.status()).toEqual(204);
    });

});