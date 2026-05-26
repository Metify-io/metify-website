---
title: "Security Isn't a Feature — It's the Architecture"
date: "2026-06-02"
author: "Aaron Allred, VP of Technology"
excerpt: "How MOJO protects your bare-metal fleet from the outside in — six layers of security from perimeter hardening to MGC federation, all enforced architecturally. LDAP, RBAC, immutable audit trails, mTLS, and NIST 800-53 alignment."
image: "/images/blog/security-six-layers.svg"
slug: "security-deep-dive"
---

---

Most infrastructure management tools bolt security on after the fact. They start as operational dashboards — built for convenience, not containment — and then layer on authentication modules, audit logging, and access controls as customers start asking uncomfortable questions during procurement reviews.

MOJO was built differently. Security isn't a module we added. It's the architecture we started with.

When your platform manages the firmware, power state, BIOS configuration, and operating system lifecycle of every server in a fleet — when a single unauthorized action can brick a rack or expose a boot chain — "good enough" security isn't good enough. Every layer of MOJO, from external network access to internal operator actions to multi-site federation, was designed under the assumption that threats exist at every boundary.

This post walks through the full security architecture: how we protect against external penetration, how we contain internal threats, how we maintain an immutable system of record, and how our MOJO Global Controller (MGC) federation model extends these guarantees across distributed deployments — all while operating in environments where the network itself is the first line of defense.

**⚠️ WHY THIS MATTERS — THE THREAT IS THE MANAGEMENT PLANE ITSELF**  
  
The Baseboard Management Controller is the highest-value target in any data center: it can power-cycle, re-image, and re-flash firmware on a server *even when the host OS is off*. Security researchers have catalogued years of critical BMC vulnerabilities — Pantsdown, USBAnywhere, Cloudborne, IPMI session hijacking — and documented real ransomware campaigns (JungleSec, 2018) that pivoted directly through internet-exposed IPMI interfaces. In one 2023 scan, firmware security firm Binarly found **over 70,000 internet-exposed BMC web interfaces from a single vendor alone**. The management plane is not a side door. For an attacker, it *is* the building.

## The Numbers Behind the Architecture

Security architecture decisions aren't abstract. They map directly to how breaches actually happen. Here's the threat landscape MOJO was designed against:

22%of breaches start with stolen credentialsThe #1 initial access vector for the second year running — Verizon 2025 DBIR. This is why MOJO assumes credentials *will* be compromised and contains the blast radius.60%of breaches involve the human elementPhishing, social engineering, misuse — Verizon 2025 DBIR. MOJO's approval gates and 2FA enforcement exist precisely because operators are targets.70K+internet-exposed BMC interfaces (one vendor)Counted in a single 2023 scan by Binarly. MOJO's BMC proxy isolation means *zero* management interfaces need network exposure.1deployable binary — the entire control planeNo service mesh, no message broker, no SaaS dependency. Fewer services means fewer listening ports means fewer ways in.

## The Six Layers, At a Glance

MOJO's security model is defense-in-depth in the literal sense: an attacker doesn't face one wall, they face six — each one independently enforced, each one architectural rather than configurable.

![MOJO's six security layers](/images/blog/security-six-layers.svg)

## Layer 1: Perimeter — No Attack Surface to Exploit

Most bare-metal management platforms expose a web UI, an API, and often a handful of auxiliary services — each one a potential entry point. The conventional approach is to put these behind a firewall and hope the perimeter holds. MOJO reduces the attack surface instead of defending a large one.

### Single-Binary Deployment

MOJO's control plane compiles to a single deployable binary. There is no distributed service mesh, no external message broker, no runtime dependency on third-party SaaS. `docker compose up` gives you the complete platform — API, UI, event bus, database, and native DDI services — in a self-contained deployment with a minimal and auditable footprint.

Fewer services means fewer listening ports. Fewer ports means fewer entry points. Every conventional management tool we've evaluated requires a constellation of services — a web server, a database, a message queue, a license server, often a cloud-connected telemetry collector. Each one is an attack surface. MOJO eliminates most of them by bundling everything into a single control plane.

### TLS Everywhere, Including BMC Proxying

All external communication to MOJO is TLS-encrypted. No exceptions. The API, the UI, WebSocket connections for remote console sessions — every channel is encrypted in transit.

But MOJO goes further. When operators access BMC remote consoles (iLO, iDRAC, XCC, IPMI web interfaces), MOJO proxies those connections through a reverse proxy with SSL termination. The operator never connects directly to the BMC. The BMC never needs to be exposed on a routable network. MOJO generates per-session proxy configurations with unique ports, TLS certificates, and strict path-based routing — so even within the proxy, only the specific console endpoints are accessible. No wildcard proxying. No open relays.

The diagram below shows the difference. In the conventional model, every operator workstation needs a network path to every BMC. In the MOJO model, there is exactly one path — and the BMC network is isolated entirely.

![BMC network exposure: conventional model versus MOJO model](/images/blog/security-bmc-exposure.svg)

Other tools in this space typically require operators to connect directly to BMC web interfaces — meaning every BMC needs network accessibility from the operator's workstation. That's hundreds or thousands of management interfaces exposed on the network. MOJO eliminates this entirely. The BMCs talk to MOJO. Operators talk to MOJO. The BMC network can be fully isolated.

**💡 WHY BMC ISOLATION IS THE WHOLE BALLGAME**  
  
A BMC runs a stripped-down Linux with its own network stack — which is exactly why attackers prize it as a *beachhead* for lateral movement. The 2018 JungleSec ransomware campaign used exposed IPMI interfaces to reach the host OS via KVM, encrypt data, and pivot across the internal network. The 2019 Cloudborne vulnerability let an attacker overwrite BMC firmware to persist *even after a server was wiped and reassigned to a new tenant.* If your management tool requires direct BMC reachability from operator workstations, you have inherited every one of those attack paths. MOJO's proxy model removes them — there is simply no route to reach.

### Air-Gap-First: The Ultimate Perimeter

For our customers in financial services, defense, and regulated industries, the perimeter question is answered definitively: there is no internet connection.

MOJO operates at full functionality in air-gapped environments. No license server phone-home. No cloud inference endpoint. No telemetry exfiltration path. The platform was designed under the assumption that outbound connectivity doesn't exist — so there's nothing to firewall, nothing to intercept, nothing to exploit through an outbound channel.

OS images, firmware packages, and platform updates are prepared in connected environments, packaged into transportable bundles, and transferred to air-gapped sites via approved media. The bundle process is documented, repeatable, and fits within existing media transfer approval workflows — the same air-gap discipline customers already apply to their operational data.

## Layer 2: Identity — Know Every Human, Authenticate Every Session

A hardened perimeter means nothing if anyone who gets inside has unrestricted access. MOJO enforces strong identity at every layer.

### Active Directory / LDAP Integration

Enterprise environments don't manage users in application silos. They manage them in Active Directory. MOJO integrates natively with LDAP/AD, synchronizing group memberships bidirectionally.

When a user authenticates via LDAP, MOJO maps their AD group memberships to internal MOJO groups automatically. An AD group prefixed with `mojo_` maps directly to the corresponding MOJO group — so when your AD admin adds a user to `mojo_engineering`, that user automatically inherits the permissions assigned to the Engineering group in MOJO. When AD group membership changes, MOJO syncs the change. No manual user provisioning. No stale accounts.

Other platforms in this space often support LDAP as an authentication-only integration — the user can log in with their AD credentials, but group mappings and permissions still need to be managed manually inside the tool. MOJO treats AD as the authoritative source for both authentication *and* authorization grouping.

### TOTP Two-Factor Authentication

For environments where passwords alone aren't sufficient — and in regulated infrastructure, they never are — MOJO supports TOTP-based two-factor authentication. Operators enroll a TOTP device, and subsequent authentication requires both the password and a time-based code.

The 2FA enforcement is configurable at the platform level. When platform-wide 2FA is enabled, operators without an enrolled TOTP device are blocked from performing operations until they complete enrollment. The two-factor verification status travels with the operator's session — every action carries proof that the operator passed both authentication factors.

### Short-Lived, Signed Sessions

MOJO uses signed, self-contained session tokens. The token carries the user's identity, their two-factor verification status, and an expiration timestamp. There are no long-lived sessions. No session records sitting in a database waiting to be harvested if that database is ever compromised. The token is cryptographically signed and short-lived — and when it expires, it's gone.

## Layer 3: Authorization — Not Just Who You Are, But What You Can Touch

Authentication tells you who someone is. Authorization determines what they can do. Most infrastructure tools handle this with coarse-grained admin/operator/viewer roles. MOJO implements a full RBAC (Role-Based Access Control) system with fine-grained permission resolution.

### The Permission Model

Every permission in MOJO follows an `<object>.<action>` convention. Objects include servers, nodes, blueprints, resource pools, firmware, service catalogs, and requests. Actions include view, manage, create, delete, approve, reject, cancel, submit, and firmware\_update.

This creates a granular permission matrix. A user can have `server.view` without `server.manage`. They can have `request.create` (submit a provisioning request) without `request.approve` (authorize execution). A firmware operator can have `server.firmware_update` without `server.manage` — they can update firmware but not change server configurations.

| Role | server.view | server.manage | server.firmware\_update | request.create | request.approve |
| --- | --- | --- | --- | --- | --- |
| Viewer / Auditor | ✅ | — | — | — | — |
| Provisioning Operator | ✅ | ✅ | — | ✅ | — |
| Firmware Operator | ✅ | — | ✅ | ✅ | — |
| Change Approver | ✅ | — | — | — | ✅ |
| Fleet Administrator | ✅ | ✅ | ✅ | ✅ | ✅ |

The matrix above is illustrative — MOJO permissions are composable, so roles are defined by the customer, not hardcoded by the platform.

### Resource Pool Isolation

Permissions alone aren't sufficient for multi-tenant or segmented environments. A user might have `server.view` permission — but which servers?

MOJO solves this with resource pools. Every server belongs to a resource pool. Every resource pool belongs to a group. Users access servers exclusively through their group memberships. When an operator asks MOJO to show their servers, the platform returns only the servers that operator is authorized to see.

This isn't a filter painted on top of an unrestricted query. Authorization is resolved from the operator's permissions outward — there is no path in MOJO that hands back an unfiltered fleet-wide list. The RBAC boundary lives at the data layer, not the presentation layer.

Other tools commonly implement a "global view with per-user filters" model — the underlying data access is unrestricted, and visibility is controlled by UI-layer filtering. That means a single authorization bug exposes the entire fleet. MOJO's resource pool model means a flaw in one group's access path can only ever expose servers in that group's pools. The blast radius of any single authorization failure is contained by architecture, not by hope.

### Approval Gates on Destructive Operations

Not every operation should be self-service, even for authorized operators. Firmware flashing across a fleet, OS decommissioning, BIOS reconfiguration — these are destructive operations where the cost of an error is measured in hours of downtime or bricked hardware.

MOJO's request system enforces approval workflows on these operations. When an operator submits a firmware update request targeting 47 servers, that request enters a review queue. A designated approver — someone with the `request.approve` permission — reviews the scope, the target firmware version, the affected servers, and either approves or rejects the request.

The same model applies to AI-driven actions. When MOJO's compliance automation identifies firmware drift and recommends a remediation plan, that plan goes through the same approval pipeline as any human request. MOJO's AI can recommend, but it cannot execute destructive operations on its own. The governance layer enforces that separation — it isn't a UI checkbox that can be sidestepped.

**🤖 THE AI HAS NO SPECIAL PRIVILEGES**  
  
A recurring fear with AI-driven infrastructure is the autonomous agent that "goes rogue." MOJO's answer is structural: AI-driven compliance automation is subject to the *exact same* approval pipeline as a human operator. It can detect firmware drift and propose a remediation plan — but a destructive action still requires a human with `request.approve` to sign off. The AI recommends. A person authorizes. MOJO's governance layer enforces that split — it is not an optional setting and not something an operator can route around.

## Layer 4: Audit — The Immutable Record of Everything

Security without auditability is security you can't prove. For our customers in financial services and regulated industries, the audit trail isn't a nice-to-have — it's a compliance requirement.

### Hardware-Level Change Tracking

MOJO records every change to every BMC and hardware resource in an immutable audit history. Every server discovered, every firmware version change, every processor swap, every memory module replacement, every drive status change — captured as a timestamped JSON snapshot with the complete resource state at the time of change.

This isn't log-level event recording. Each audit record contains the full serialized state of the resource, enabling point-in-time reconstruction. You can answer "what was the firmware version on Server BM-0312 on March 15th at 2:47am?" by querying the audit history — not by hoping someone noted it in a change ticket.

The audit engine uses differential comparison — a new record is only written when the resource state has actually changed, preventing log bloat while maintaining completeness. Create, update, and delete operations are all captured, including the final state snapshot before deletion.

| Audit dimension | Conventional logging | MOJO immutable audit |
| --- | --- | --- |
| Record content | Event line ("firmware updated") | Full serialized resource state snapshot |
| Reconstruction | Inferred from log fragments | Exact point-in-time state, queryable |
| Write strategy | Every event (log bloat) | Differential — written only on real change |
| Mutability | Often editable / rotatable | Immutable history, deletes captured too |
| Credential trail | Rarely tracked | Chain of custody on every key deployed |

### Credential Vault Auditing

When MOJO provisions an operating system, the credential used — license key, activation key, registration code — is logged in a provisioning audit record. The record captures which credential was used, on which server, by which operator, from which source (registered credential, user-provided key, or system default), and a masked summary for traceability without exposing the full credential.

This is the chain of custody that auditors ask for: "Which license key was deployed to this server, when, and who authorized it?" MOJO answers that question from the audit trail, not from someone's memory.

### AI Copilot Audit Access

MOJO's AI copilot can query the audit history directly — but only for users with sufficient permissions. The audit trail is available to the copilot under the same RBAC rules as everywhere else, so an operator can ask "what changed on Server BM-0312 last week?" and get a structured answer sourced from the immutable audit record. The AI reads the same audit trail the compliance team reads — and is bound by the same access controls.

## Layer 5: MGC Federation — Security That Scales Across Sites

Single-site security is table stakes. The harder problem is maintaining security guarantees when you federate dozens of sites into a unified management plane. MOJO Global Controller (MGC) solves this without compromising site autonomy.

### Mutual TLS Federation Links

Every connection between MGC and an edge site coordinator uses mutual TLS (mTLS). Both sides present certificates. Both sides verify the other. A compromised network between sites cannot inject, intercept, or modify federation traffic — even if an attacker controls the transport layer.

MGC generates a private certificate authority, issues server and client certificates, and requires certificate verification on every federation connection. The CA, server cert, and client cert are all independently generated — no shared secrets that compromise all sites if one key is leaked.

### Encrypted Shared Secrets at Rest

Federation authentication tokens are stored encrypted in the database, with the encryption key derived from the platform secret — so even if an attacker gains read access to the MGC database, the federation tokens are useless to them. The tokens are decrypted only at the moment of use, never stored in plaintext, and never written to logs.

Each federation link has its own token with independent issuance and expiration timestamps. Token rotation doesn't require coordinated downtime — tokens are issued per-link, so rotating one site's credentials doesn't affect any other site.

### Heartbeat Monitoring and Automatic Degradation

MGC continuously monitors federation link health through bidirectional heartbeats. Each heartbeat is recorded — direction, result, latency, payload — creating an audit trail of federation connectivity.

When heartbeats fail, the system responds progressively: repeated failures move a link from healthy to degraded, and continued failure marks it unreachable. Each transition is recorded. When connectivity returns, the link automatically restores — but only if the maintenance state was set by federation itself, not by an operator. This prevents a security-relevant manual lockout from being automatically overridden by a network recovery.

### Site Autonomy First

Here's what makes MGC's security model fundamentally different from centralized management: the site always wins by default.

When MGC pushes a policy to an edge site and the policy conflicts with the site's local configuration, the system doesn't silently override the local settings. The autonomy engine evaluates the conflict, and unless a valid Site Autonomy Override exists — authorized by a named user, with an explicit type (security, compliance, emergency, or maintenance), an effective date, and an expiration — the system automatically reverts to site control.

Every conflict resolution decision is logged: what conflicted, what values differed, which rule was applied, who authorized any override, and the resolution time. This means a rogue central administrator cannot silently push configuration changes to edge sites. The autonomy engine enforces consent at the federation layer.

Overrides are time-bounded and type-classified. A security override doesn't grant blanket authority — it applies to specific policies and expires on a defined date. When the override expires, site autonomy automatically reasserts. No permanent exceptions. No forgotten overrides accumulating privilege.

**🔐 THE ROGUE-ADMIN PROBLEM, SOLVED STRUCTURALLY**  
  
Centralized management planes have a built-in single point of failure: whoever controls the center controls every site. MGC inverts that. A compromised or malicious central administrator *cannot* silently push changes to an edge site — any conflict reverts to local control unless a named human signed a time-bounded, type-classified override. Consent is enforced at the federation layer, every decision is logged, and overrides expire on their own. There are no permanent exceptions quietly accumulating privilege.

## Layer 6: NIST Alignment and Compliance Posture

MOJO's security architecture aligns with NIST 800-53 controls across multiple families:

| NIST 800-53 family | How MOJO enforces it architecturally |
| --- | --- |
| AC — Access Control | Fine-grained RBAC, resource pool isolation at the data layer, LDAP/AD integration, approval workflows on destructive operations |
| AU — Audit & Accountability | Immutable hardware change tracking, credential vault chain of custody, federation event and heartbeat logging |
| IA — Identification & Authentication | TOTP 2FA with platform-level enforcement, signed short-lived sessions, mTLS for every federation link |
| SC — System & Communications Protection | TLS everywhere, BMC reverse-proxy isolation, air-gap-first deployment, encrypted secrets at rest |
| CM — Configuration Management | Firmware baseline compliance, policy sync with conflict detection, site autonomy enforcement |

This isn't a checkbox exercise. These controls are architectural — they're enforced by the way the system is built, not by a policy document that operators are expected to follow. You can't bypass resource pool isolation by being clever with the API. You can't skip the approval workflow by taking a different route. You can't read federation tokens from the database even if you have SQL access.

## The Security Conversation Has Changed

The old question was: "Does your tool support LDAP?" Now it's: "If an attacker compromises an operator's credentials, what's the blast radius?"

It's a fair question — and the data says it's the right one. Credential abuse is the leading initial access vector in breaches, and the human element shows up in the majority of them. The honest planning assumption isn't *if* a credential leaks. It's *when*.

With MOJO, a stolen operator credential doesn't open the fleet. It runs into six independent walls — each one narrowing what the attacker can reach, do, or hide.

![The blast radius of one stolen operator credential under MOJO](/images/blog/security-blast-radius.svg)

Security isn't a feature you enable. It's the architecture you build. MOJO was built this way from day one.

---

*MOJO is the first AI-native bare-metal infrastructure platform built for the enterprise. To learn more about MOJO's security architecture, visit [metify.io](https://metify.io).***Sources for cited figures:** Breach statistics from the Verizon 2025 Data Breach Investigations Report (22,000+ incidents, 12,000+ confirmed breaches analyzed). BMC exposure figure from Binarly research (internet-exposed Supermicro IPMI web interfaces, October 2023). BMC attack history — JungleSec ransomware (2018), Cloudborne (Eclypsium, 2019), IPMI session hijacking (CERT/CC VU#163057) — as documented by Eclypsium, ColorTokens, and CERT/CC.[Download Free Trial](/trial)
