import { RenderOptions, render } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { AuthProvider } from "./shared/utils/AuthProvider";

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider
      mockedSession={{
        access_token: "111",
        expires_in: 32131321,
        refresh_token: "222",
        token_type: "sss",
        user: {
          id: "1",
          app_metadata: {},
          aud: "",
          created_at: "1",
          user_metadata: {},
        },
      }}
    >
      {children}
    </AuthProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};
export * from "@testing-library/react";

export { customRender as render };
