---
title: "When \"Cloud-Connected\" Isn't an Option: How MOJO Manages Bare Metal in Air-Gapped Environments"
date: "2025-03-04"
author: "Aaron Allred, VP of Technology"
excerpt: "MOJO was designed air-gap-first — single-binary deployment, native DDI, offline AI agents, and zero phone-home. Not air-gap-compatible. Air-gap-first."
image: "/images/screenshots/Hero-Image.png"
slug: "air-gap-first"
---

If your data center is air-gapped — and in defense, government, and regulated finance, it almost certainly is — most infrastructure management tools fail at the front door. MOJO was designed air-gap-first. Not air-gap-compatible. Not "works offline with reduced functionality." Air-gap-first.

## Air-Gap Is Not an Edge Case

The market assumption that management tools can phone home is so deeply embedded in modern infrastructure software that vendors treat offline operation as an afterthought. SaaS control planes require internet connectivity. Telemetry streaming requires network paths out. Cloud management platforms need the cloud.

For a significant portion of the enterprise market, air-gap isn't a nice-to-have. It's a legal requirement:

- **Defense and intelligence** — SIPR and JWICS networks are physically isolated. Any tool requiring cloud connectivity is automatically disqualified.
- **Government (FedRAMP High / IL5+)** — Federal systems processing classified data must operate within defined security boundaries.
- **Regulated finance** — PCI DSS and SOX compliance create strict network segmentation. Systems managing payment infrastructure cannot have outbound connections to vendor clouds.
- **Critical infrastructure** — NERC CIP protects the power grid. ICS/SCADA environments in energy, water, and manufacturing are isolated by design.

## What "Air-Gap-First" Means Architecturally

Most tools that claim "offline support" are cloud-first tools with a degraded offline mode. Features stop working. Updates can't be applied. AI capabilities disappear because they depend on cloud-hosted models. MOJO inverts this. The offline experience *is* the real product.

### Single-Binary Control Plane

MOJO's control plane compiles to a single binary with zero external runtime dependencies. No heavyweight runtime. No Kubernetes cluster required. No cloud connection for licensing validation. `docker compose up` gives you the complete platform: control plane, web UI, API, event bus, and native DDI services.

### Native DDI: The Air-Gap Enabler

In a connected environment, DHCP and DNS are typically managed by external infrastructure. In an air-gapped environment, you can't assume those services exist. MOJO bundles Kea DHCP and PowerDNS directly into the platform. When you provision a server, IP allocation, DHCP reservation, and DNS record creation happen automatically. No external DHCP server. No separate DDI platform. No manual IP spreadsheets.

### Offline OS and Firmware Bundles

MOJO supports offline bundle preparation. OS images (RHEL, Ubuntu, Windows) and firmware packages are prepared in a connected environment, packaged into transportable archives, and transferred to the air-gapped site via approved media — sneakernet, data diode, whatever your security protocol requires. Once on-site, bundles are loaded into MOJO and available for provisioning and firmware updates. No download-on-demand. No cloud image repositories. Everything is local.

### AI That Works Offline

This is where MOJO's architecture pays the biggest dividend. Most vendors' AI features depend on cloud-hosted language models. In an air-gapped environment, those features simply disappear.

MOJO's AI agents operate with self-hosted LLMs — Ollama, vLLM, or any OpenAI-compatible inference endpoint running on local hardware. The copilot, health agent anomaly detection, compliance agent firmware drift analysis — all run locally against local data using local compute.

The predictive health system doesn't need cloud connectivity at all — Z-score anomaly detection on learned baselines is a statistical computation running entirely within the platform. No API calls. No cloud inference. Your fleet health data never leaves your network.

### Governance Without Cloud Dependencies

The governance engine — approval gates, audit trails, kill switches on AI actions — operates entirely locally. In an air-gapped environment, you get the same governance guarantees as a cloud-connected deployment. AI agents still require approval for destructive actions. Every action is still logged. Kill switches still work. The security posture doesn't degrade in offline mode because it was never dependent on connectivity.

## How Our Customers Deploy Air-Gapped

The air-gap workflow is straightforward:

1. **Prepare bundles** in a connected environment — OS images, firmware packages, platform updates
2. **Transfer** via approved media to the air-gapped site
3. **Load** bundles into MOJO
4. **Operate** — discovery, provisioning, firmware compliance, health monitoring, AI-assisted operations — all local, all self-contained

No license server phone-home. No cloud dependency. No degraded feature set.

A retail customer with edge sites in restricted network environments uses the same workflow for PCI compliance — their in-store infrastructure is behind strict network segmentation. A media and entertainment customer deploys MOJO at event venues where network resources are consumed by the event itself. During events, MOJO operates independently. Between events, it syncs updates when connectivity is available.

## The Intelligence Stays Local

The fundamental promise of MOJO's air-gap-first design: the intelligence doesn't go away when the network does. Your health agent still monitors. Your compliance agent still evaluates baselines. Your orchestrator agent still decomposes complex operations into executable plans. Your governance engine still requires approval for destructive actions. Your audit trail still logs everything.

Other platforms need the cloud to be smart. MOJO's intelligence runs on your hardware, behind your firewall, with zero phone-home.

---

MOJO is the first AI-native bare-metal infrastructure platform built for the enterprise — including enterprises where "enterprise" means a SCIF. To learn more about air-gapped deployments with MOJO, visit [metify.io](https://metify.io).
