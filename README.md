# ⚠️ Warning

This library is not yet ready for production.

---


# effective-transporter

A utility library that provides **ready-to-use Transporter presets and registries** for safely transferring **non-POJO objects** between the server and client in **SvelteKit**, with a strong focus on **Effect / Effect-TS–style data structures**.

SvelteKit supports custom serialization via the `transport` hook in `hooks.server`, but in real-world applications—especially those built on Effect—you often need to transfer many kinds of *general, non-JSON-safe objects* across the network.

`effective-transporter` exists to **standardize and centralize that logic**.

---

## Motivation

In SvelteKit, only plain JSON-serializable values can be sent between the server and client by default.  
To transfer non-POJO values such as:

- `Map`, `Set`
- `Date`, `BigInt`, `URL`
- `Error` and custom error types
- Effect / Effect-TS ecosystem objects

you must explicitly register **Transporter handlers**.

This quickly becomes repetitive and error-prone in Effect-heavy codebases, where:
- many values are *structural but non-POJO*
- serialization rules must remain consistent across the app
- ad-hoc `transport` logic leads to fragmentation

`effective-transporter` solves this by providing:
- a **shared transporter registry**
- **predefined handlers** for common and Effect-related types
- a clean abstraction that plugs directly into SvelteKit
