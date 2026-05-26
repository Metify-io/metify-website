---
title: "The VMware Exit Is Real — And the Next Platform Isn't Another Hypervisor"
date: "2025-04-22"
author: "Mike Wagner, CEO"
excerpt: "Broadcom's acquisition of VMware changed the economics of virtualization overnight. The real opportunity isn't picking a different hypervisor — it's rethinking the operational layer with AI-native infrastructure."
image: "/images/blog/vmware-exit-hero.svg"
slug: "vmware-exit-ai-native"
---

**📌 EDITOR'S NOTE — A LIVING POST**  
  
This piece was first published in April 2025, three months after the Broadcom acquisition started reshaping enterprise budgets in earnest. Because the VMware exodus is now the defining infrastructure story of the decade, we've kept this post live — and added a **quarterly tracker** below to log every major customer departure, court filing, and pricing shock. The post itself stays the same. The data underneath it keeps moving. Scroll to the [Quarterly Exodus Tracker](#quarterly-tracker) at the end for the running log.

---

Broadcom's acquisition of VMware changed the economics of virtualization overnight. License costs doubled, tripled, and in some documented cases increased by more than a thousand percent. Perpetual licenses disappeared. Bundling strategies forced customers into all-or-nothing commitments they never asked for. For thousands of enterprises, the math stopped working.

The result is the largest infrastructure re-evaluation in a decade. Gartner named the trend "devirtualization." ESG found that more than half of organizations have already repatriated virtualized workloads. The VMware exit is not a prediction. It is happening at scale, in public, in court filings, and on earnings calls.

But here's what nobody is talking about loud enough: the real loss isn't the hypervisor. It's the operational intelligence. And the real opportunity isn't picking a different hypervisor — it's rethinking what the operational layer should look like in an era where AI agents can reason about infrastructure the way a senior operator does, only faster and without going home at five.

## The Exodus, by the Numbers

AT&T Proposed Increase1,050%One-year renewal hike for 75,000 VMs across 8,600 servers (court filings, 2024)UK University12.5×Annual VMware support: £40,000 → £500,000 under new bundlesIndustry-Wide150–1,200%Reported price increase range across customer segments since acquisitionComputershare24,000VMs migrated to Nutanix. CIO says payback in "single-digit months"Nutanix-Reported Migrations~30,000VMware customers moved to Nutanix as of April 2026 (Nutanix CEO, .NEXT 2026)Pure Storage Survey60%Enterprises actively accelerating virtualization modernization through 2028The most public proxy is AT&T. In court filings unsealed in late 2024, AT&T executive Susan Johnson disclosed in writing that Broadcom had proposed a 1,050% one-year price increase for the carrier's VMware estate — 75,000 VMs across roughly 8,600 servers. AT&T's filing also revealed it was budgeting $40 million to $50 million for a full migration off VMware, calculating that the project would deliver "a very quick payback and strong IRR." Translation: it is cheaper to rip-and-replace a decade of VMware investment than to renew at Broadcom's terms.
AT&T is not alone. Computershare, which manages data for 40,000 companies and 75 million individual customers, announced it would migrate 24,000 VMs to Nutanix after receiving renewal terms representing a 10–15× price increase. Geico, Boyd Gaming, and John Deere have publicly committed to alternatives. Nutanix told investors it converted more than 2,700 VMware customers during its fiscal 2025 and another 640 in the first quarter of fiscal 2026 alone. By April 2026, Nutanix CEO Rajiv Ramaswami told the press the running total had hit roughly 30,000 customers.
The vendor backlash extends beyond customers. Ingram Micro, one of the world's largest IT distributors, terminated its entire business relationship with Broadcom. The German IT user association VOICE filed a formal complaint with the European Commission alleging anti-competitive behavior. These are not the actions of a market that is settling down.

## The Operational Layer Problem

VMware's real value was never virtualization itself. It was vCenter, vMotion, DRS — the management plane that let a small team run thousands of VMs without thinking about the physical hardware underneath. Strip away VMware and you don't just lose the hypervisor. You lose the operational brain.
We see this firsthand with our customers. A financial services firm we work with spent three months evaluating VMware alternatives. They quickly found replacement hypervisors. What they couldn't find was a replacement for the operational layer — the intelligence that kept their fleet running without constant human intervention.
A media and entertainment company managing broadcast infrastructure across multiple venues told us the same story: "We can move workloads off VMware. We can't move the Day 2 operations model off VMware."
The market responded with two options, both inadequate on their own:
**Option 1: Another hypervisor.** Same architecture, different licensing. You've solved the cost problem but inherited the same dependency — a vendor-controlled operational layer that you don't own.
**Option 2: A collection of CLI tools and scripts.** Automation without intelligence. Your team writes Ansible playbooks and Terraform configs, builds a monitoring stack, and becomes the operational layer themselves. It works until someone leaves and takes the tribal knowledge with them.
Neither option replaces what VMware actually provided: a platform that understood your infrastructure and could act on that understanding. The good news is that a third option has arrived — and it isn't a hypervisor at all.

## Kubernetes Is the New Operational Layer

The most consequential shift happening underneath the VMware exit is that **the operational layer is moving from hypervisors to Kubernetes** — even for workloads that still need to look and feel like VMs.
The technology making this possible is KubeVirt, a CNCF project that lets virtual machines run as first-class Kubernetes workloads. Red Hat ships it commercially as OpenShift Virtualization. KubeVirt now has more than 40 documented production adopters including NVIDIA GeForce NOW (cloud gaming with GPU passthrough), Cloudflare, Intel, ByteDance, and SiriusXM. A Spectro Cloud survey found 26% of Kubernetes adopters already use KubeVirt. A Portworx survey found 58% of organizations are planning to migrate some VMs to Kubernetes management.
This is the part of the story that gets buried in "VMware vs. Nutanix vs. Proxmox" comparisons. Those debates are framed as a like-for-like hypervisor swap. KubeVirt isn't a hypervisor swap. It's a reframing: VMs and containers become two shapes of the same underlying workload, scheduled by the same control plane, governed by the same RBAC, networked by the same CNI, and observable through the same pipeline.**💡 WHAT KUBEVIRT ACTUALLY CHANGES**  
  
With KubeVirt, a VM is a Kubernetes custom resource. You define it the same way you define a Deployment. You schedule it with the same scheduler. You back it with persistent volumes from the same CSI driver. You expose it through the same Ingress. You secure it through the same RBAC. **The operational model for VMs collapses into the operational model for containers** — which most of your team already runs.For enterprises that are already on a Kubernetes path, this is the cleanest VMware exit available. Red Hat's Migration Toolkit for Virtualization (MTV, upstream Forklift) discovers vSphere environments, maps networks and storage, and orchestrates the cutover. SiriusXM has publicly documented migrating critical VMs to OpenShift Virtualization with no service interruption. A large financial services institution disclosed migrating thousands of VMs onto the same platform as part of a private-cloud modernization.
The point isn't that every workload should be on KubeVirt tomorrow. The point is that **the operating system of the post-VMware data center is increasingly Kubernetes**, with VMs as one workload shape among several. Hypervisors are becoming an implementation detail. The control plane is the product.

## The Anti-Pattern That's Costing the Industry Billions

There's a related architectural mistake the VMware exit is forcing organizations to confront: running containers inside VMs that exist solely to host the container runtime.
This pattern is everywhere. A container is provisioned on Kubernetes. Kubernetes is running on worker nodes. Those worker nodes are VMs. Those VMs are running on ESXi. ESXi is running on a physical server. The physical server is the only thing actually doing work. Every layer above it exists because somebody, at some point, decided that virtualization was the answer to a question nobody is asking anymore.![Containers in VMs versus Kubernetes on bare metal — the stacked-abstraction tax](/images/blog/diagram-containers-in-vms.svg)The cost of this anti-pattern is staggering, and it compounds along several axes:

| Hidden Cost | Magnitude | Source |
| --- | --- | --- |
| Kubernetes on VMs vs. bare metal — total cost premium | **up to 30% higher** | Ericsson estimate |
| Bare-metal Kubernetes TCO reduction | **~18%** | Ericsson, replicated by Hivelocity benchmarks |
| High-concurrency throughput penalty under virtualization | **20–60% lower** | Multiple independent benchmarks |
| Network latency penalty under virtualization | **3× higher** | CenturyLink (now Lumen) benchmark |
| Annual cloud infrastructure waste from overprovisioning | **~$44.5 billion (2025 est.)** | Industry analyst projections cited by Hivelocity |
| Share of cloud spend wasted on overprovisioned VMs | **20–50%** | Multiple cloud-waste studies |

**⚠️ THE COMPOUNDING TAX**  
  
Take a 1,000-node Kubernetes fleet running on a VMware-based hypervisor layer. Conservatively assume 18% TCO inflation from the avoidable virtualization layer. On a $10M annual infrastructure spend, **that's $1.8M per year being spent on an architectural abstraction that delivers no business value** — separate from and on top of whatever Broadcom is now charging for the licensing. The container-in-VM tax is the line item nobody puts on the renewal slide.To be fair: there are still legitimate reasons to run VMs underneath Kubernetes — multi-tenant isolation in regulated environments, mixed-OS workloads, gradual migration. But "we did it this way in 2018" is not one of those reasons. And the right tool for the workloads that *do* need a VM is increasingly KubeVirt running directly on bare metal — not nested layers of yesterday's abstractions.

## What "AI-Native" Actually Means

When we say MOJO is the first AI-native infrastructure platform, we don't mean we added a chatbot to a dashboard. We mean the platform was architecturally designed with AI agents as the primary operational layer.
MOJO has three layers:

1. **A high-performance control plane** — compiled to a single binary, deployable anywhere including fully air-gapped environments. This layer handles hardware communication via Redfish and IPMI, event processing, DHCP, DNS, PXE boot, and the inventory database. It is the source of truth for every physical asset in your fleet.
2. **Specialist AI agents** — agents that reason about infrastructure using the ReAct pattern (Reason + Act). Each agent is a specialist: health monitoring, provisioning orchestration, firmware compliance, capacity planning. They observe the system through the control plane, reason about what they see, and take action — subject to governance.
3. **A governance engine** — every action an AI agent proposes flows through approval gates. Destructive operations require human sign-off. Every action is logged in an immutable audit trail. Kill switches on every agent. This isn't AI that runs unsupervised. It's AI that acts — but only with permission.

![The MOJO operational layer that replaces VMware for bare metal — AI agents, governance engine, control plane](/images/blog/diagram-mojo-layers.svg)This architecture is what replaces VMware's operational layer for bare metal. Not a dashboard. Not a CLI. An intelligent system that monitors, reasons, and acts — continuously, across every vendor in your rack, with VMs and containers as workload shapes scheduled on top.

## What This Looks Like in Practice

**A financial services customer** managing over 10,000 servers across Dell, HPE, and Lenovo hardware used to run three separate vendor management tools, a custom monitoring stack, and manual firmware compliance processes. After deploying MOJO, they have one inventory, one compliance system, one health monitoring agent, and one audit log — across all vendors. Their firmware compliance process went from a quarterly manual project to a continuous automated evaluation with one-click remediation.
**A retail customer** with edge infrastructure across dozens of locations needed to maintain consistent firmware baselines and health monitoring at every site — without on-site IT staff. MOJO's Global Controller federates their distributed sites into a single fleet view. The health agent monitors every server at every location. The compliance agent ensures firmware baselines are consistent coast to coast. When something needs attention at a site 500 miles away, the orchestrator agent handles it remotely.
**A media and entertainment customer** managing broadcast infrastructure for live events needed zero-downtime provisioning and rapid server turnaround between events. MOJO's orchestrator agent accepts natural-language instructions — "provision 20 servers with the broadcast baseline and event OS" — and decomposes them into multi-step execution plans with dependency tracking, parallel execution, and governance approval. What used to take a full day of operator time now takes one sentence and one approval click.

## MOJO Has Become the System of Record

The pattern across these customers is more than tool consolidation. Over the last year, MOJO has crossed a threshold that very few infrastructure platforms reach: **it has become the system of record for what is actually running** in our customers' environments.
For an enterprise running 10,000 servers across three OEMs, the question "what hardware do we have and what state is it in?" used to have several answers — none of them complete and none of them current. Three vendor inventories. A CMDB that nobody updates. A spreadsheet a former employee maintained. A monitoring system that knows which IPs respond but nothing about firmware, BIOS, or BMC state.
MOJO replaces that whole stack with a single canonical truth: every BMC discovered, every node inventoried, every firmware version tracked, every health metric baselined, every change logged in an immutable audit trail. When a regulator asks the bank what firmware was on a specific server on a specific date, the answer comes from MOJO. When a hospital's compliance team asks which servers are running unpatched BIOS revisions, the answer comes from MOJO. When the broadcast team asks which servers in the venue rack are healthy enough to run tonight's feed, the answer comes from MOJO.**📋 WHERE MOJO IS THE SYSTEM OF RECORD TODAY**  
  
Across our customer base, MOJO is the canonical inventory and operational state for the bare-metal infrastructure running in:

- **Enterprise data centers** — multi-OEM fleets at scale, replacing three or four vendor-specific consoles with one source of truth
- **Retail stores** — distributed edge infrastructure where each location's POS, inventory, and IoT systems need to be visible to a central team
- **Healthcare facilities** — clinical and back-office hardware where HIPAA evidence requires authoritative configuration and change records
- **Banks and financial services** — regulated environments where PCI DSS and SOX audits demand a single, defensible answer to "what was running, when"
- **Cell-site shelters and base stations** — telecom edge equipment where physical access is expensive and the central NOC needs canonical state for every site
This is the deeper claim underneath "AI-native infrastructure." The agents are powerful, but the agents are valuable *because* they reason against ground truth that MOJO holds for the entire fleet. Without the system-of-record property, AI agents are guessing at infrastructure state. With it, they're operating on canonical data — which is why their decisions are good enough to put through governance and execute.

## The VMware Replacement Test

When evaluating VMware replacements, ask one question: **does this platform replace the operational intelligence I'm losing, or does it just replace the hypervisor?**
VMware's vCenter told you which VMs were unhealthy. MOJO's health agent tells you which *servers* are unhealthy — and why. It runs continuous anomaly detection, monitoring temperature, power, fan speed, ECC memory errors, BMC response times, and firmware failure rates. It uses Z-score analysis on learned baselines — meaning it knows what "normal" looks like for your specific environment and flags deviations before they become incidents.
VMware's DRS automatically balanced workloads across hosts. MOJO's orchestrator agent accepts natural-language instructions and decomposes them into executable plans with dependency tracking and parallel execution. Discovery, IP allocation, DHCP reservation, DNS records, firmware compliance check, OS provisioning. All from one sentence.
VMware locked you into per-socket licensing for a single vendor's stack. MOJO manages Dell, HPE, Lenovo, Supermicro, Cisco, Intel, and NVIDIA hardware from a single platform. One inventory. One API. One audit log. No per-device licensing.

## The Post-VMware Architecture

The organizations that navigate the VMware exit successfully won't be the ones that find the cheapest hypervisor alternative. They'll be the ones that build a modern operational layer for bare metal — one that's smarter than what VMware offered for VMs, and that treats Kubernetes (with KubeVirt for the workloads that still need to look like VMs) as the new universal scheduler.
MOJO is that operational layer. Hardware-agnostic. AI-native. Governance-first. Deployable in a single \`docker compose up\` command with zero external dependencies — including in fully air-gapped environments where VMware's cloud-connected management plane was never an option anyway.
VMware gave you a GUI to manage VMs. MOJO gives you AI agents that manage bare metal — autonomously, safely, and across every vendor in your rack, with OpenShift Virtualization, KubeVirt, RHEL, or whatever workload shape you need running on top.
The VMware exit is real. The next platform isn't another hypervisor. It's AI-native. And it's here.

---

## 📊 Quarterly Exodus Tracker

*A running log of the major VMware departures, court filings, pricing events, and migration milestones that have shaped the post-Broadcom landscape since this post was first published. New entries added at the end of each quarter.***Q2 2026 — The 30,000 Milestone**
Apr – Jun 2026 (in progress)

- **April 2026 — Nutanix CEO Rajiv Ramaswami** publicly states at the .NEXT conference that "about 30,000 customers" have migrated from VMware to Nutanix, citing sustained negative sentiment toward Broadcom.
- **KubeVirt adoption hits 26% of Kubernetes operators** per Spectro Cloud survey, with Portworx survey finding 58% of organizations planning VM migration to Kubernetes.
- **OpenShift Virtualization customer disclosures expand**: SiriusXM has migrated production VMs with no service interruption; a large unnamed financial institution has moved thousands of VMs to the platform.
- *This section will continue to be updated monthly as new events emerge.*
**Q1 2026 — The Partner Channel Breaks**
Jan – Mar 2026

- **Ingram Micro terminates its business relationship with Broadcom entirely** — an extraordinary action for one of the world's largest IT distributors.
- **The German IT user association VOICE** files a formal complaint with the European Commission alleging anti-competitive behavior and market-power abuse.
- **Broadcom partner program restructuring** displaces additional channel and services roles, on top of ongoing engineering reductions inherited from the acquisition.
- **Broadcom's Q1 FY2026 results** (reported March 2026) show VMware revenue up 13% and software ARR up 19% — the financial engineering is working in the short term, even as the customer base contracts.
**Q4 2025 — The Numbers Get Public**
Oct – Dec 2025

- **Nutanix discloses 640 new VMware customer migrations in Q1 FY2026 alone**, on top of 2,700+ in the prior fiscal year. The complexity of those migrations causes Nutanix to revise its own revenue guidance downward — and the stock to drop 17% — even as it adds clients.
- **VMware VCF licensing changes (November 2025)** introduce a BYOL requirement for managed subscriptions, adding fresh complexity for partners already strained by the bundle consolidation.
- **Pure Storage research**: 60% of enterprises are actively accelerating their virtualization modernization strategies through 2028.
- **Proxmox VE evaluation activity** reported up 340% year-over-year by trade press, with XCP-ng growing 180%.
**Q3 2025 — Lawsuits and Public Defections**
Jul – Sep 2025

- **AT&T's lawsuit against Broadcom** continues through discovery, with court filings publicly confirming the proposed 1,050% one-year price increase on 75,000 VMs.
- **Geico, Boyd Gaming, and John Deere** go public with plans to adopt VMware alternatives.
- **"Hidden cost" coverage proliferates** in trade press as customers begin sharing renewal quotes — typical scenarios include €500,000 → €2,000,000 in year one with continued 10–20% annual escalation.
- **vSphere 7 reaches end of support** at the end of the quarter, removing the "wait and see" option for a large segment of the installed base.
**Q2 2025 — The Floodgates Open**
Apr – Jun 2025

- **Computershare commits** to migrating 24,000 VMs to Nutanix after disclosure of a 10–15× renewal increase. CIO publicly states payback in "single-digit months."
- **vSphere 7 end-of-support countdown** begins (target: October 2025), forcing thousands of organizations into either renewal at Broadcom's terms or accelerated migration.
- **Forrester** forecasts that up to 20% of VMware's enterprise customers will begin migration this year, accelerating into 2026.
- **Gartner** projects that by 2026, 50% of enterprises will initiate POCs for alternative distributed hybrid infrastructure products.

---

*MOJO is the first AI-native bare-metal infrastructure platform built for the enterprise. To learn more about how MOJO can replace your VMware operational layer — and run your KubeVirt or OpenShift Virtualization workloads on bare metal underneath it — visit [metify.io](https://metify.io).*
*Sources for this post and its quarterly tracker include court filings from AT&T v. Broadcom (NY State Supreme Court), Broadcom Q1 FY2026 earnings disclosures, Nutanix earnings calls and .NEXT 2026 press briefings, Red Hat OpenShift Virtualization customer disclosures, and research from Gartner, Forrester, ESG, Pure Storage, Portworx, Spectro Cloud, Ericsson, and Hivelocity. Specific customer figures (Computershare, AT&T, UK university support contracts) sourced from public reporting by The Register, Channel Futures, Ars Technica, TechTarget, CRN, SDxCentral, and Slashdot.*[Download Free Trial](/trial)
