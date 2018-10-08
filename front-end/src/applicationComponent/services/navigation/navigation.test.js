import * as navigation from "./navigationService";
import { axiosInstance } from "../../../sharedComponent/config";

const mockDirectionResponse = {
  status: "success",
  path: [
    ["22.372081", "114.107877"],
    ["22.326442", "114.167811"],
    ["22.284419", "114.159510"]
  ],
  total_distance: 20000,
  total_time: 1800
};

const mockTokenResponse = {
  token: "token"
};

describe("Test for navigation api", () => {
  it("Should test for getToken method", async () => {
    const post = jest.spyOn(axiosInstance, "post");

    post.mockImplementation(() => Promise.resolve({ data: mockTokenResponse }));

    const token = await navigation.getToken("from", "to");
    expect(token).toBeDefined();
    post.mockRestore();
  });

  it("Should test for fetchRoute method", async () => {
    const get = jest.spyOn(axiosInstance, "get");

    get.mockImplementation(() =>
      Promise.resolve({ data: mockDirectionResponse })
    );

    const result = await navigation.getRoute("token");
    expect(result).toBeDefined();
    expect(result.status).toEqual("success");
    get.mockRestore();
  });

  it("Should test for getDirectionService method", async () => {
    let get = jest.spyOn(axiosInstance, "get");
    let post = jest.spyOn(axiosInstance, "post");

    post.mockImplementation(() =>
      Promise.resolve({
        data: {
          token: "token"
        }
      })
    );

    get.mockImplementation(() =>
      Promise.resolve({
        data: mockDirectionResponse
      })
    );

    const result = await navigation.getDirectionService("from", "to");
    expect(result).toBeDefined();
    expect(result.status).toEqual("success");
  });
});
