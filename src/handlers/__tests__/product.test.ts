import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    // expect(response.body.error).toHaveLengt h(4);

    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("data");
  });
});

describe("POST /api/products", () => {
  it("should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "mouse - testing",
      price: 50,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("errors");
  });
});
