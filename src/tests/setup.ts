import "vitest-dom/extend-expect";

beforeAll(() => {
  vi.mock("@/auth", () => ({
    auth: vi.fn(),
  }));
});
afterEach(() => {
  vi.restoreAllMocks();
});
afterAll(() => {
  vi.resetAllMocks();
});
// to add some prefernces if need
