---
title: "Automatic Discovery of Servers, Storage, Sensors and More — The Foundation of the Automated Data Center"
date: "2025-02-04"
author: "Aaron Allred, VP of Technology"
excerpt: "Before you can manage a server, you have to know it exists. MOJO automatically discovers servers, storage, sensors and more — eliminating manual BMC registration and building real-time inventory automatically."
image: "/images/blog/heroes/server-blue-lights.jpg"
slug: "zero-touch-discovery"
---

Before you can manage a server, you have to know it exists. That sounds obvious — but in most enterprise data centers, the gap between "server racked and cabled" and "server visible in the management platform" is a manual, error-prone, multi-step process that breaks at scale.

## The Discovery Problem Nobody Talks About

A new server arrives at your data center. The hardware team racks it, cables it, powers it on. The BMC gets a DHCP address. Now what?

In most environments, someone manually registers that server's BMC IP in a management tool. They type in credentials. They classify it by vendor and model. They assign it to a group. They verify connectivity. For one server, it takes 10 minutes. For a rack of 40 servers arriving on a Tuesday morning, it's half a day of data entry.

And that's the happy path. In the real world:

- BMC IPs get fat-fingered into spreadsheets. A transposed digit means an invisible server.
- Servers get racked but never registered — they run for months before anyone notices they're unmanaged.
- Hardware refreshes create inventory chaos — old servers still listed, new servers not yet added.
- Multi-vendor environments require different registration procedures per vendor tool.

Discovery isn't glamorous. Nobody writes blog posts about it — until they realize that everything downstream depends on it. You can't monitor a server you don't know about. You can't patch firmware on a server that isn't in your inventory. You can't prove compliance for a server your platform hasn't discovered.

## What Zero Touch Discovery Actually Means

Zero touch discovery means: a server is racked, cabled, and powered on — and the management platform finds it, identifies it, inventories it, and makes it manageable. No manual registration. No data entry. No spreadsheets.

MOJO implements zero touch discovery through scan ranges — network subnets that MOJO continuously monitors for new Redfish-capable BMCs. When a new BMC appears:

- **Detection** — MOJO detects the new Redfish endpoint on the management network
- **Identification** — Queries the Redfish root to determine vendor (Dell, HPE, Lenovo, Supermicro, NVIDIA) and model
- **Fingerprinting** — Reads hardware details: serial number, service tag, CPU model, memory configuration, storage, NIC inventory, BMC firmware version
- **Classification** — Assigns to the appropriate resource pool based on vendor, model, or location
- **Baseline Check** — Immediately evaluates firmware against applicable compliance baselines

From power-on to fully inventoried and compliance-evaluated — without a human typing a single IP address.

## Why This Matters at Scale

At 50 servers, manual registration is tedious but survivable. At 500 servers across multiple sites, it becomes a full-time job. At 5,000+ servers with continuous hardware refreshes, it's impossible to maintain accurate inventory manually.

Our customers operate at these scales. A financial services customer with 10,000+ servers across multiple data centers told us their inventory was always 2-3 weeks out of date — new hardware would sit unmanaged while waiting for the operations team to work through the registration backlog. During a security incident, they couldn't confidently answer "how many servers do we have and what firmware are they running?" because the source of truth was a spreadsheet maintained by three different people.

With MOJO's zero touch discovery, their inventory is always current. New hardware is visible within minutes of being powered on. Decommissioned hardware disappears from the active inventory automatically. The platform is the source of truth — not a spreadsheet.

## Discovery as the Foundation

Everything MOJO does downstream depends on discovery:

- **Compliance** — can't evaluate firmware baselines on servers you haven't discovered
- **Health Monitoring** — can't detect anomalies on servers outside your inventory
- **Provisioning** — can't deploy an OS to a server that isn't registered
- **Audit** — can't prove chain of custody for hardware you never tracked
- **Security** — unmanaged servers are unpatched servers — the biggest attack surface in your data center

Zero touch discovery isn't a feature checkbox. It's the foundation that makes every other capability possible. Without accurate, real-time discovery, you're managing infrastructure with a blindfold on.

## Multi-Vendor, Multi-Site, One View

MOJO's discovery works across every major server vendor — Dell iDRAC, HPE iLO, Lenovo XCC, Supermicro BMC, NVIDIA BlueField DPUs. It doesn't matter what hardware your team bought or what mix of vendors exists across your sites. One scan range covers them all. One inventory contains them all. One compliance evaluation covers them all.

For organizations with distributed sites — retail edge locations, branch offices, ballparks, broadcast venues — MOJO's Global Controller federates discovery across all sites into a single fleet view. A server powered on at any site is visible centrally within minutes.

This is what modern data center operations looks like: rack it, cable it, power it on. Everything else is automatic.

---

MOJO Platform is the first AI-native bare-metal infrastructure platform built for the enterprise. To learn more about zero touch discovery and automated fleet management, visit [metify.io](https://metify.io).
