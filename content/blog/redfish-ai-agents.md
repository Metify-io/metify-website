---
title: "Redfish: The Standard That Finally Made Hardware Manageable — and Why It Matters More Than Ever"
date: "2025-04-08"
author: "Aaron Allred, VP of Technology"
excerpt: "From IPMI's binary protocols to Redfish's RESTful API — the decade-long journey to a universal hardware management standard, and what it means for the future of data center operations."
image: "/images/blog/heroes/redfish-ai-agents.webp"
slug: "redfish-ai-agents"
---

If you manage physical servers at any scale, Redfish has probably already changed your life — even if you don't realize it yet. The DMTF's RESTful hardware management standard has quietly become the most important specification in modern data center operations. Understanding where it came from, why it exists, and where it's going is essential for anyone responsible for bare metal infrastructure.

## A Brief History of Redfish

### The IPMI Era (1998–2014)

For nearly two decades, the Intelligent Platform Management Interface (IPMI) was the only game in town for out-of-band server management. Published by Intel in September 1998, IPMI gave administrators a way to monitor and control servers independently of the operating system — power cycling, reading sensor data, accessing console output, all through a dedicated management controller embedded in the motherboard.

IPMI worked. But it was a product of its time. The protocol was binary and low-level, designed for an era when servers were individually managed and the idea of automating thousands of them was science fiction. IPMI's command structure was rigid, its data model was flat, and extending it required vendor-specific hacks. Security was an afterthought — IPMI 2.0's authentication had well-documented vulnerabilities that made security teams nervous. As data centers grew from dozens of servers to thousands, IPMI's limitations became increasingly painful.

### The Birth of Redfish (2014–2015)

By the early 2010s, the industry needed something fundamentally different. Hewlett-Packard (now HPE), Dell, and other major hardware vendors collaborated within the Distributed Management Task Force (DMTF) to create a modern replacement. Work began under the DMTF's Scalable Platforms Management Forum (SPMF) in 2014.

The result was Redfish — a RESTful API specification using JSON over HTTPS. Where IPMI was binary and opaque, Redfish was human-readable and web-native. Where IPMI required specialized tooling, Redfish could be explored with a browser or a simple `curl` command. The first specification (version 1.0) was published in August 2015, defining base models for systems, chassis, and managers.

The design philosophy was deliberate: leverage the same web technologies that had already transformed application development — REST, JSON, OData, HTTPS — and apply them to hardware management. This meant that the massive ecosystem of HTTP libraries, API testing tools, and web frameworks could immediately be used to manage physical servers.

### Rapid Evolution (2016–2020)

The specification expanded quickly. In 2016, the DMTF added models for BIOS configuration, disk drives, memory, storage volumes, network endpoints, fabric and switch management, PCIe devices, firmware inventory and update, multi-function NICs, and host interfaces. In 2017, composability and location models followed. SNIA extended Redfish with the Swordfish specification for network storage services.

Each update made Redfish capable of managing more of the hardware stack — moving from basic power-on/power-off operations toward comprehensive lifecycle management. But adoption during this period was uneven. Many organizations still relied on IPMI because their existing tooling worked, and early Redfish implementations were sometimes incomplete or inconsistent across vendors.

### The Acceleration (2020–Present)

The real inflection point came in the last four to five years. Several forces converged:

**Vendor maturity.** Dell's iDRAC, HPE's iLO, Lenovo's XCC, and Supermicro's BMC implementations all reached a level of Redfish completeness that made them genuinely useful for production automation — not just basic monitoring but full lifecycle operations including firmware updates, BIOS configuration, virtual media mounting, and certificate management.

**Motherboard ubiquity.** Today, virtually every enterprise motherboard ships with a BMC that speaks Redfish. It's no longer an optional feature or a premium add-on — it's standard equipment from every major manufacturer. The same way every server has an Ethernet port, every server now has a Redfish endpoint.

**Cloud-native expectations.** As organizations adopted infrastructure-as-code practices for cloud environments, they expected the same API-driven approach for physical hardware. Redfish delivered exactly that — a programmatic interface that could be integrated into CI/CD pipelines, configuration management tools, and orchestration platforms.

**Security requirements.** Unlike IPMI's known vulnerabilities, Redfish runs over HTTPS with modern authentication. As security audits became more rigorous, organizations had a compliance reason to migrate away from IPMI.

**Open source adoption.** OpenStack Ironic, Ansible's Redfish modules, OpenBMC, and other open source projects built first-class Redfish support, creating an ecosystem that validated the standard and lowered the barrier to adoption.

## Why Metify Bet on Redfish from Day One

Metify was founded on a conviction: that the Redfish specification, led by HPE, Dell, the DMTF, and others, would become ubiquitous. That bet has paid off. Every major motherboard manufacturer now builds system boards with BMCs ready for Redfish — the universal interface we anticipated is now reality.

This matters because Redfish transforms what's possible in hardware management. When every server in your fleet exposes a standardized, RESTful API — regardless of manufacturer — you can build intelligent automation that operates across your entire infrastructure. Discovery, provisioning, firmware management, health monitoring, compliance enforcement, and decommissioning can all be driven through a single, consistent interface.

But standardization doesn't mean uniformity. The Redfish specification defines a data model and API structure. It does not — and cannot — enforce identical behavior across implementations. Dell's iDRAC returns firmware inventory in one format. HPE's iLO returns it differently. Supermicro has model-specific variants with their own firmware update procedures. Lenovo's XCC has unique attributes. Even within a single vendor, different generations of BMC firmware interpret the spec in different ways.

## The Interoperability Challenge

This is the gap between "every server speaks Redfish" and "every server speaks Redfish the same way." For organizations running mixed-vendor fleets — which is most enterprises — this gap creates real operational friction:

- **Firmware management** requires vendor-specific logic for update procedures, reboot sequencing, and validation
- **Inventory collection** returns different data structures for the same conceptual information across vendors
- **Health monitoring** uses different sensor naming conventions, threshold formats, and alert mechanisms
- **BIOS configuration** exposes vendor-specific attribute names and value formats even for equivalent settings
- **Virtual media** mounting follows different workflows depending on the BMC implementation

The result is that teams building automation on top of Redfish often end up maintaining parallel codebases — one per vendor — that happen to target the same underlying standard. Adding a new vendor to the fleet means adding another branch to every automation workflow.

## What a Redfish-Native Platform Looks Like

Solving this requires a normalization layer — software that absorbs vendor-specific quirks and presents a unified data model to everything above it. A platform that is truly Redfish-native doesn't just speak Redfish to hardware. It understands the dialects.

This means maintaining hardware drivers for each vendor and generation:

- **Dell** — iDRAC 9, 10, and their respective Redfish dialects
- **HPE** — iLO 5, 6 with HPE's OEM extensions
- **Lenovo** — XCC with Lenovo-specific attributes
- **Supermicro** — including model-specific variants
- **Intel** — vPro AMT for out-of-band client and server management
- **NVIDIA** — BlueField DPU management via Redfish

Each driver handles the translation: response format differences, OEM extension parsing, firmware update procedures, virtual media mounting variations, and power action semantics. The platform above the driver layer operates on one consistent data model — "servers with firmware versions, health metrics, and configuration state" — regardless of what's generating the Redfish responses underneath.

This normalization is what makes fleet-scale operations possible. A single firmware compliance policy can span all vendors: "all servers must run BIOS from 2024 or later, BMC firmware from the approved list, and storage controller firmware matching the baseline." One policy definition, applied consistently across Dell, HPE, Lenovo, and Supermicro hardware.

## The Future of Redfish

The specification continues to evolve. The DMTF is adding models for composable infrastructure, data center infrastructure management (DCIM), and Ethernet switching. SNIA's Swordfish extension brings network storage under the same management umbrella. The Open Compute Project (OCP) is driving additional server and rack-level models.

As Redfish's scope expands, the value of building on top of it compounds. Every new capability the standard adds — whether it's thermal management, power capping, or license management — becomes accessible to any platform that has invested in a solid Redfish foundation.

The trajectory is clear: Redfish is not just a management protocol. It's the operating interface for physical infrastructure. Organizations that invest in understanding and leveraging it today are building the foundation for every automation capability that follows.

---

MOJO Platform is built Redfish-first — a vendor normalization layer that turns every manufacturer's implementation into a consistent, automatable fleet. To learn more, visit [metify.ai](https://metify.ai).
