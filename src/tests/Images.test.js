import { includes } from "lodash";

test("Should return an object of image", () => {
  fetch(" http://localhost:3000/", { method: "GET" })
    .then((response) => {
      const expected = {
        id: 2,
        name: "4K",
        url: "https://www.sony.com/image/bc6d25fa6371c2899ce704a2bed7614c?fmt=png-alpha&wid=720",
      };
      const result = includes(response.body.rows, expected);
      expect(result).toEqual(true);
    })
    .catch((error) => {
      throw error;
    });
});
