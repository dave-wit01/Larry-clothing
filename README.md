# Larry Clothing

## Secure order deployment

Orders are created only by the `create-order` Supabase Edge Function. It looks up server-side prices by product ID, validates quantities and sizes, and limits each IP address to five attempts per 15 minutes.

1. Apply the migrations: `supabase db push`
2. Set deployment secrets. `ALLOWED_ORIGIN` accepts a comma-separated list, so include both your live site and local development while testing:
   `supabase secrets set ALLOWED_ORIGIN=http://localhost:5173,https://your-domain.com RATE_LIMIT_SALT=<a-long-random-secret>`
3. Deploy the function: `supabase functions deploy create-order`

Do not expose `SUPABASE_SERVICE_ROLE_KEY`; Supabase provides it only to the function runtime. Update `public.products` when prices or availability change.

## Customer contact settings

Copy `.env.example` to `.env.local` and set `VITE_WHATSAPP_NUMBER`. `VITE_CONTACT_EMAIL` is optional: leave it blank until you have a monitored customer-support inbox. The Help page will not display an email option when it is blank.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
