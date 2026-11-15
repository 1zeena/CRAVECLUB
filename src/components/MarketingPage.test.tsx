import { afterEach, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MarketingPage } from "./MarketingPage";

afterEach(cleanup);

it("fills the box, combines repeated snacks, and updates quantities and subtotal", async () => {
  const user = userEvent.setup();
  render(<MarketingPage />);
  const box = screen.getByRole("complementary");
  const review = within(box).getByRole("button", {
    name: /review your box/i,
  }) as HTMLButtonElement;
  expect(review.disabled).toBe(true);
  const add = screen.getAllByRole("button", { name: /add to box/i });
  await user.click(add[0]);
  await user.click(add[0]);
  await user.click(add[2]);
  expect(within(box).getByText("3 snacks")).toBeTruthy();
  expect(within(box).getByText("LE 14.50")).toBeTruthy();
  expect(within(box).getAllByText("Cookie Bites")).toHaveLength(1);
  expect(review.disabled).toBe(false);
  await user.click(
    within(box).getByRole("button", {
      name: "Remove one Cookie Bites with Chocolate sauce",
    }),
  );
  expect(within(box).getByText("LE 10.00")).toBeTruthy();
  await user.click(
    within(box).getByRole("button", {
      name: "Remove one Cookie Bites with Chocolate sauce",
    }),
  );
  await user.click(
    within(box).getByRole("button", {
      name: "Remove one Japanese Long Fries with Hot sauce",
    }),
  );
  expect(within(box).getByText("0 snacks")).toBeTruthy();
  expect(within(box).getByText("LE 0.00")).toBeTruthy();
  expect(review.disabled).toBe(true);
});

it("keeps sauce variants separate and preserves existing choices when the picker changes", async () => {
  const user = userEvent.setup();
  render(<MarketingPage />);
  const box = screen.getByRole("complementary");
  const pickers = screen.getAllByRole("combobox");
  const add = screen.getAllByRole("button", { name: /add to box/i });
  await user.click(add[0]);
  await user.selectOptions(pickers[0], "Caramel");
  await user.click(add[0]);
  await user.click(add[0]);
  expect(within(box).getByText("Chocolate sauce")).toBeTruthy();
  expect(within(box).getByText("Caramel")).toBeTruthy();
  expect(within(box).getAllByText("Cookie Bites")).toHaveLength(2);
  expect(within(box).getByText("3 snacks")).toBeTruthy();
  expect(within(box).getByText("LE 13.50")).toBeTruthy();
  await user.selectOptions(pickers[2], "Mayo");
  await user.click(add[2]);
  await user.selectOptions(pickers[3], "Cheese sauce");
  await user.click(add[3]);
  expect(within(box).getByText("Mayo")).toBeTruthy();
  expect(within(box).getByText("Cheese sauce")).toBeTruthy();
  await user.click(
    within(box).getByRole("button", {
      name: "Remove one Cookie Bites with Caramel",
    }),
  );
  expect(within(box).getByText("4 snacks")).toBeTruthy();
  expect(within(box).getByText("LE 18.50")).toBeTruthy();
});
