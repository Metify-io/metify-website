---
title: "50 Sites. One Orchestrator. How MOJO's Global Controller Turns Distributed Bare Metal into a Single Fleet"
date: "2026-05-19"
author: "Aaron Allred, VP of Technology"
excerpt: "The edge computing wave is pushing bare-metal infrastructure into retail stores, hospitals, bank branches, broadcast venues, and cell-site shelters. MOJO's Global Controller federates them all into one fleet."
image: "/images/screenshots/Hero-Image.png"
slug: "50-sites-one-orchestrator-mgc"
---

---

Managing one data center is hard. Managing 50 sites — each with their own network, their own hardware mix, their own local constraints — is a fundamentally different problem. And until MOJO, nobody had solved it for bare metal.
The edge computing wave is pushing bare-metal infrastructure out of centralized data centers and into distributed locations: retail stores, hospital and clinic networks, bank branches, broadcast venues, manufacturing floors, military forward operating bases, and the cell-site shelters that sit at the base of every tower in the carrier's footprint. Each site has its own hardware, its own network topology, its own local requirements. And each site needs the same lifecycle management as the central data center — discovery, provisioning, firmware compliance, health monitoring — but without a full ops team on site.
The market gap was glaring. Vendor-specific tools manage one site's hardware. Open-source provisioning engines handle OS deployment. But nobody offered multi-site federation for bare metal — centralized policy, distributed execution, site autonomy, and AI agents that reason across the entire topology.
The MOJO Global Controller (MGC) fills that gap.

## The Federation Problem

Distributed bare-metal management has three hard problems:
**Problem 1: Centralized visibility, distributed execution.** You need to see every server across every site from one interface. But you can't run every operation from the central site — latency, bandwidth, and reliability constraints mean that PXE boot, firmware updates, and DHCP must be local.
**Problem 2: Site autonomy.** When the WAN link between an edge site and the central controller goes down — and at edge sites, it will — local infrastructure can't stop working. Servers still need DHCP. Health monitoring can't pause. A firmware update in progress can't hang waiting for a heartbeat from headquarters.
**Problem 3: Policy consistency.** Every site should follow the same compliance baselines, health thresholds, and governance rules. But each site may have local variations — different hardware, different subnets, different OS requirements.

## How MGC Works

The architecture: one MOJO Global Controller (the MGC) federates multiple MOJO Edge Controllers (MECs). Each MEC is a full MOJO deployment — control plane, native DDI, AI agents, governance engine. The MGC adds a coordination layer on top.

### Heartbeat and State Sync

Every MEC sends periodic heartbeat messages to the MGC including site health summary, connectivity status, and policy version. The MGC maintains a real-time map of all federated sites. Missed heartbeats flag the site for attention — but don't cause panic, because the MEC is still operating autonomously.

### Policy Push

Compliance baselines, health thresholds, governance rules — all defined centrally and pushed to every MEC. When you define firmware baseline "Gold-2026" at the global controller, every edge site receives it and evaluates compliance locally.
Policy push is versioned. The MGC knows which version each site runs. Sites that were offline during a push reconcile when connectivity returns.

### Site Autonomy

Each MEC is a complete, independent MOJO deployment. If the WAN link goes down:

- DHCP continues serving leases (native DDI is local)
- Health monitoring continues (predictive health runs locally)
- Firmware compliance continues (baselines are local copies)
- AI agents continue reasoning about local infrastructure
- Governance continues (approval workflows run locally)

When connectivity returns, state reconciles automatically. No data loss. No operational gap.

## Customer Stories

### Retail: Dozens of Sites, Zero On-Site IT

A retail customer manages edge infrastructure across dozens of locations. Each location runs bare-metal servers for point-of-sale processing, inventory management, and IoT aggregation. There's no on-site IT staff — the infrastructure team manages everything from headquarters.
Before MOJO, firmware compliance was a manual, site-by-site process. A compliance audit meant individually checking each location's servers against the baseline. Remediation required scheduling maintenance windows per site and, in some cases, sending a technician.
With MGC: one firmware baseline defined centrally, pushed to all sites automatically. The compliance agent evaluates every server at every location continuously. When drift is detected, the agent generates a per-site remediation plan and routes it through governance. The ops team reviews and approves from headquarters. The agent handles the rest — including staggered rollouts that don't take all sites down simultaneously.
Their firmware compliance process went from a quarterly project to a continuous automated evaluation. Audit prep went from a multi-day spreadsheet exercise to a single query: "Show firmware compliance status across all sites."

### Media & Entertainment: Venue Infrastructure That Must Work

A media and entertainment customer deploys bare-metal infrastructure at event venues for broadcast, streaming, and production systems. Each venue is a temporary deployment with different hardware, different network configurations, and intense operational pressure during events.
MGC lets them define standard baselines and health policies centrally, then push them to each venue deployment. During events, when network bandwidth is consumed by broadcast traffic, each venue's MOJO deployment operates independently. The health agent monitors broadcast infrastructure locally, catching thermal and power anomalies in real time without depending on a WAN connection to headquarters.
Between events, venue deployments sync with the central controller. Health data, compliance status, and event logs consolidate into the fleet view. Equipment that needs attention before the next event gets flagged automatically.

### Financial Services: Distributed Compliance

A financial services customer operates infrastructure across multiple facilities with strict compliance requirements. Each facility has its own network segmentation, its own security posture, and its own local operational constraints — but firmware compliance and audit requirements are consistent across all sites.
MGC provides the centralized policy definition they need (one baseline, one set of governance rules) with the distributed execution their security posture requires (each facility operates independently, no cross-facility network dependencies). The compliance agent evaluates baselines per-facility and generates facility-specific remediation plans that account for local hardware variations.

### Healthcare: From Hospitals to Clinics

A healthcare customer operates infrastructure across a hospital system and an attached clinic network — mixing high-availability servers in central data centers with smaller appliances in clinic back rooms. The compliance bar is HIPAA-grade: authoritative records of every configuration change, defensible answers about what was running when.
MGC turns the entire footprint — central data center plus distributed clinic sites — into a single fleet view. The compliance agent enforces a unified firmware and configuration baseline across hospital and clinic hardware alike. When auditors arrive, the evidence is one export from the governance engine, not a multi-week reconciliation across vendor consoles and spreadsheets.

### Telecom: Cell-Site Shelters Across the Footprint

A telecom customer manages bare-metal compute at the base of every cell tower in a regional footprint — the BTS shelters and equipment cabinets where radio access network gear sits next to edge compute for latency-sensitive workloads. Truck rolls to these sites are slow and expensive. Local IT presence is zero.
MGC federates every cell-site shelter into the central NOC's view. The health agent monitors thermal and power conditions in real time at each shelter — important when the shelter is a small environmentally-controlled box with limited cooling headroom. Out-of-band recovery via Redfish and serial console means a hung server at the base of a tower 200 miles away can be cold-booted, reimaged, or rolled back without a technician dispatch.

## MOJO as the System of Record at Distributed Scale

Across all of these scenarios, MGC has become more than a federation engine. **It is the system of record for what is actually running in our customers' distributed footprints** — the canonical answer to "which servers exist, where are they, what state are they in, and who changed what last."
For a retailer with hundreds of store back-offices, that answer used to live in a spreadsheet. For a bank with a thousand branch and ATM sites, it lived in a CMDB that drifted from reality the moment it was published. For a telecom operator with tens of thousands of cell-site shelters, it didn't really live anywhere — each region kept its own informal records and the regional managers were the only humans who actually knew the truth.
MGC replaces all of that with a single authoritative inventory and lifecycle history, federated across every site:**📋 ONE FLEET, ONE TRUTH**  
  
For a customer with infrastructure across 50, 500, or 50,000 sites, MOJO is now the canonical source for:

- **What hardware exists** at every site — make, model, serial, firmware revision, BMC state
- **What state it's in** — health metrics, compliance posture, anomalies, recent changes
- **Who changed what** — every action, every approver, every timestamp, every rollback, immutably logged
- **How it compares** to the rest of the fleet — drift detection, baseline conformance, capacity trends

When the auditor asks, when the regulator asks, when the regional VP asks, when the on-call engineer at 2am asks — the answer comes from one place.This is the deeper value of MGC. Multi-site federation is the table-stakes capability. Becoming the system of record for distributed bare metal — across stores, clinics, branches, venues, and cell-site shelters — is the property that changes how customers operate.

## Cross-Site AI Operations

MGC's real power is that MOJO's AI agents can operate at the federation level:
**Fleet-wide compliance:** "Show firmware compliance across all 50 sites." The compliance agent queries each MEC and presents a unified view — which sites are compliant, which have drift, which need attention. One query, entire fleet.
**Orchestrated rollouts:** "Update firmware baseline to Gold-2026.1 across all West Coast sites." The orchestrator decomposes this into per-site plans, stages the rollout (limit blast radius — if the firmware is bad, don't update all sites simultaneously), and routes each site's plan through governance.
**Correlated health analysis:** If the health agent detects the same thermal anomaly at three sites on the same day, that's probably not three independent failures — it might be a firmware issue affecting a specific hardware model deployed at those sites. Cross-site correlation turns site-level observations into fleet-level intelligence.
**Capacity planning:** The capacity agent can analyze utilization across all sites and recommend rebalancing. Fleet-level optimization that's impossible with per-site tools.
Other tools manage a data center. MOJO's orchestrator manages a fleet — from one prompt, across every site.

---

*MOJO is the first AI-native bare-metal infrastructure platform built for the enterprise. To learn more about the MOJO Global Controller for distributed infrastructure, visit [metify.io](https://metify.io).*[Download Free Trial](/trial)
