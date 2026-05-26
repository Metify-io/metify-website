---
title: "How MLB Manages 60+ Major and Minor League Ballpark K8S Clusters from a Laptop in New Jersey"
date: "2024-03-11"
author: "Mike Wagner, CEO"
excerpt: "Statcast, Hawk-Eye, and 7.2 TB of data per game — all running on Kubernetes clusters provisioned remotely across 60+ ballparks. How MLB eliminated VMware and manages distributed bare metal infrastructure without on-site IT staff."
image: "/images/blog/Major-League-Baseball-Trusts-Mojo-Platform.jpg"
slug: "major-league-baseball-trusts-mojo-platform"
---

Every pitch tracked. Every swing measured. Every sprint timed to the hundredth of a second. The stats-heavy applications that millions of baseball fans consume in real time — Statcast, Hawk-Eye, broadcast overlays, and ballpark operations — all run on Kubernetes clusters sitting inside each of MLB's 60+ Major and Minor League ballparks. And every one of those clusters is provisioned, managed, and maintained remotely by a single team operating from New Jersey.

## The Scale of the Problem

MLB generates **7.2 TB of data per game** — tracking ball flight, player movement, bat speed, spin rate, and dozens of other metrics that power everything from the broadcast experience to front-office analytics. That data flows through on-premise Kubernetes clusters at each ballpark before being uploaded to GCP, Metify's technology partner for this solution.

Multiply that across 2,430 regular season Major League games plus thousands of Minor League contests, and the infrastructure requirements are staggering. Each ballpark needs a resilient, high-performance compute cluster capable of running latency-sensitive workloads — capture systems that cannot drop frames, tracking algorithms that must process in real time, and upload pipelines that move terabytes reliably over constrained ballpark networks.

The challenge: there are no full-time IT staff at these ballparks. No on-site server admins. No local ops team. Every cluster across 60+ venues must be provisioned, patched, recovered, and scaled remotely.

## From VMware to Bare Metal Kubernetes — A Deliberate Evolution

MLB's Advanced Media team (MLBAM) had been running a traditional VMware stack on physical servers at each ballpark. The infrastructure worked, but the team recognized a clear optimization opportunity: VMs were provisioned with 8 vCPUs and 32 GB of memory to run applications that only required a fraction of those resources (often as little as 500 millicores of CPU and 1 GB of memory). With only four servers per ballpark and limited data center space, every wasted resource mattered.

MLBAM knew they could do it better. Faster. Cheaper. More reliable. More secure. The plan had always been to run Kubernetes directly on bare metal — Anthos on bare metal was the target architecture from the start. By eliminating the virtualization layer, the team achieved:

- **Right-sized resources** — Pod-level allocation (cpu: 500m, memory: 1Gi) instead of VM-level over-provisioning, maximizing the four-server footprint at each venue
- **Simplified recovery** — In the VMware era, if a server went down, all VMs on it went down. With Kubernetes on bare metal, a failed node is replaced and the cluster auto-heals — critical in ballpark environments that aren't climate-controlled data centers
- **Eliminated the NAS** — Rook Ceph running within the cluster replaced physical NAS hardware, further reducing the data center footprint and cost
- **Massive time savings** — What previously took six hours per park to build from scratch now takes forty minutes, and multiple parks can be provisioned simultaneously

**The cost savings from removing VMware licensing alone more than paid for the entire Metify solution in year one.** Every subsequent year is pure operational savings — a compounding return that grows as the league expands to more venues.

## Remote Bare Metal Provisioning at Scale

Here's what makes this remarkable: a single operator in New Jersey can provision a brand-new ballpark cluster from scratch — bare metal to production-ready Kubernetes — without anyone touching the servers on site.

MOJO Platform handles the entire lifecycle remotely via out-of-band management:

- **Discovery** — MOJO discovers BMCs via Redfish across the ballpark network, fingerprints the hardware, and inventories every component
- **BIOS & Firmware** — Configures BIOS settings, flashes firmware to baseline, ensures every server is identical before OS deployment
- **OS Deployment** — PXE boots the servers and lays down the operating system via network — no USB drives, no site visits
- **K8S Bootstrap** — Once the OS is live, the cluster bootstraps itself into a production Kubernetes environment ready for workload deployment
- **Ongoing Management** — Firmware patches, security hotfixes, health monitoring, and recovery — all from the same single pane of glass

## The Apps That Run on These Clusters

The Kubernetes clusters at each ballpark power the stats-heavy applications that define the modern baseball experience:

- **Statcast** — Real-time tracking of every pitch, hit, and player movement. Exit velocity, launch angle, sprint speed — the numbers fans and analysts obsess over
- **Hawk-Eye** — Computer vision system that tracks ball flight for automated strike zones, replay reviews, and broadcast graphics
- **Broadcast Integration** — Real-time data overlays that power the statistics viewers see during live game broadcasts
- **Data Pipeline** — 7.2 TB per game captured, processed locally, and uploaded to GCP for league-wide analytics and historical archiving

These are not workloads that tolerate downtime. A dropped frame during a replay challenge or a missed pitch track during a broadcast is visible to millions of viewers in real time. The infrastructure must be bulletproof — and it must be managed without boots on the ground.

## Why This Matters

What MLB proved with MOJO is that remote bare metal provisioning isn't a compromise — it's a competitive advantage. By centralizing operations and eliminating the need for on-site IT staff at each venue, MLB achieved:

- **Consistency** — Every ballpark runs an identical, reproducible cluster configuration
- **Speed** — New ballpark clusters go from racked hardware to production workloads without a site visit
- **Resilience** — Hardware failures are detected and remediated remotely before they impact game operations
- **Cost Efficiency** — VMware removal paid for the MOJO solution in year one. No on-site IT staff needed at any venue.

The lesson extends far beyond baseball. Any organization managing distributed bare metal infrastructure — retail chains, hospital networks, broadcast facilities, bank branches — faces the same fundamental challenge: how do you maintain consistency, security, and performance across dozens or hundreds of remote sites without putting a server admin at each one?

MLB answered that question with MOJO. From a laptop in New Jersey, a small team manages the infrastructure that delivers America's pastime to millions of fans every night — and they've never had to board a plane to do it.

---

MOJO Platform is the first AI-native bare-metal infrastructure platform built for the enterprise. To learn more about remote bare metal provisioning for distributed Kubernetes clusters, visit [metify.io](https://metify.io).
