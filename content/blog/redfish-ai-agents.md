---
title: "Redfish Is the Universal Language of Hardware. MOJO's Agents Are the First to Actually Speak It."
date: "2025-04-08"
author: "Aaron Allred, VP of Technology"
excerpt: "Every vendor implements Redfish differently. MOJO's driver layer normalizes the chaos into a unified data model that AI agents can reason about across all vendors."
image: "/images/blog/heroes/network-cables.jpg"
slug: "redfish-ai-agents"
---

Redfish is in its ninth year. The DMTF's RESTful hardware management standard has become the universal language of server infrastructure — every major vendor ships it. It's mature, powerful, and ubiquitous. It's also a tower of Babel.

## The Interoperability Illusion

Not because the spec is bad — it's excellent. Because every vendor implements it differently. The spec defines a data model and an API structure. It does not — and cannot — enforce identical behavior across implementations. One vendor's iDRAC returns firmware inventory in one format. Another's iLO returns it differently. Within a single vendor, different generations of BMC firmware interpret the spec in different ways.

A financial services customer running Dell and HPE hardware in the same racks described their automation as "two parallel codebases that happen to target the same data model." Every Ansible playbook, every monitoring query, every compliance check had vendor-specific branches. Adding a third vendor would have tripled the maintenance burden.

The market gave enterprises two choices: vendor-specific management tools that only work with one manufacturer's hardware, or home-built automation that breaks every time a firmware update changes a Redfish response format. Neither choice scales. Neither choice is intelligent.

## The Vendor Normalization Layer

MOJO solves this at the driver level — and then lets AI agents operate on the normalized data. The control plane includes hardware drivers for every major vendor:

- **Dell** — iDRAC 9, 10, and their respective Redfish dialects
- **HPE** — iLO 5, 6 with HPE's OEM extensions
- **Lenovo** — XCC with Lenovo-specific attributes
- **Supermicro** — including model-specific variants with their own firmware update procedures
- **Intel** — vPro AMT for out-of-band management
- **NVIDIA** — BlueField DPU management via Redfish (SystemType="DPU")

Each driver absorbs vendor-specific quirks — response format differences, OEM extension handling, firmware update procedures, virtual media mounting variations, power action semantics — and presents a consistent internal API to everything above it.

This normalization isn't cosmetic. It's structural. MOJO's firmware baseline system defines compliance policies that span vendors: "all servers must run BIOS from 2024 or later, BMC firmware from the approved list, and storage controller firmware matching the baseline." One policy, all vendors, consistent results.

## What This Means for Our Customers

### Financial Services: One Fleet, Not Three

The customer who maintained "two parallel codebases" consolidated onto MOJO. Their firmware compliance process — previously a multi-week effort involving vendor-specific scripts and manual cross-referencing — became a single automated evaluation. One baseline. One compliance agent. One remediation workflow. When they added Lenovo servers, the operational overhead was zero — MOJO's Lenovo driver handled normalization automatically.

### Retail: Edge Sites with Mixed Hardware

A retail customer's edge infrastructure uses whatever hardware fits the site — sometimes Dell, sometimes Supermicro, sometimes repurposed workstations. Before MOJO, managing firmware across these heterogeneous environments was impossible at scale. With vendor normalization, the same firmware baseline applies to all sites regardless of hardware mix.

### Media & Entertainment: Redfish Data That Agents Understand

During live events, a media customer needs real-time health data from mixed-vendor broadcast infrastructure. Before MOJO, vendor-specific collectors broke every time a firmware update changed a Redfish response format. MOJO's health agent sees normalized data — it reasons about server health at fleet scale without caring which vendor's BMC produced the telemetry.

## Why AI Agents Need This Foundation

AI agents can't reason about data they can't understand. If every vendor's Redfish responses are structured differently, an agent would need vendor-specific logic for every operation — effectively rebuilding the Babel tower inside the AI layer.

MOJO's normalization layer means the health agent, compliance agent, and orchestrator agent operate on one consistent data model. They reason about "servers with firmware and health metrics" — not "Dell servers with iDRAC responses" versus "HPE servers with iLO responses." The intelligence is vendor-agnostic because the data is vendor-agnostic by the time it reaches the agents.

This is what it means to be Redfish-native: not just speaking Redfish to hardware, but normalizing the conversation so that intelligence can operate at fleet scale regardless of what's in the rack.

---

MOJO Platform is the first AI-native bare-metal infrastructure platform built for the enterprise. To learn more about multi-vendor fleet management, visit [metify.io](https://metify.io).
