let app = require("../server")
let testServer = require("supertest")

describe("Test the root path", ()=> {

    test("should have access to partner data when loged ", async () => {
        let agent = testServer.agent(app);
        const response = await agent
        .post('/api/user/login')
        .send({ username: "Health For All", password: "healthforall"});
        expect(response.statusCode).toBe(200);

        const userResponse = await agent.get("/api/user");
        expect(userResponse.statusCode).toBe(200);
        console.log('here is the partner response', userResponse)
    });

    test("it should get all the transaction data for the partner", async () => {
        const response = await testServer(app).get("/api/partner/");
        expect(response.statusCode).toBe(403);
    });

    test("it should get all the info related to the partner", async () => {
        const response = await testServer(app).get("/api/partner/info");
        expect(response.statusCode).toBe(403);
    });

    test("it should get all the reports for the partner", async () => {
        const response = await testServer(app).get("/api/partner/reports");
        expect(response.statusCode).toBe(403);
    });

})