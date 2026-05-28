---
title: "Kubernetes on Bare Metal: What Nobody Tells You About Day 2"
date: "2025-10-21"
author: "Aaron Allred, VP of Technology"
excerpt: "Everyone writes about deploying K8s on bare metal. Nobody writes about firmware updates under live clusters, node replacements, or distributed upgrades across 60 sites."
image: "/images/blog/heroes/containers-ship.jpg"
slug: "kubernetes-bare-metal-day-2"
---

Everyone writes about deploying Kubernetes on bare metal. The bootstrap process, the CNI choice, the storage layer. What nobody writes about is what happens six months later when you need to update firmware on nodes running production workloads, replace a failed server without disrupting the cluster, or roll out a BIOS change across 60 sites without on-site staff.

## Day 1 vs. Day 2

**Day 1** is provisioning: get bare metal servers into a state where Kubernetes can run. PXE boot, OS install, kubeadm init, join nodes. There are good tools and well-documented procedures for this.

**Day 2** is everything after: firmware maintenance under live clusters, node lifecycle management, hardware health monitoring that understands Kubernetes workload placement, distributed upgrades across sites, and bare-metal-level troubleshooting when pods fail for reasons Kubernetes can't explain.

Day 2 is where Kubernetes on bare metal gets hard. And it's where most teams are on their own.

## The Day 2 Challenges

### Firmware Updates Under Live Clusters

Firmware updates require a reboot. Rebooting a K8s node means draining workloads, waiting for pod migrations, applying the update, rebooting, and re-joining the cluster. At one node, it's manual but manageable. Across a fleet of clusters at 60+ sites — it's a project that takes weeks of careful coordination.

MOJO's compliance agent and orchestrator handle this: identify nodes needing firmware updates, coordinate with Kubernetes to drain gracefully, apply updates via Redfish, validate post-reboot health, and confirm the node has re-joined the cluster successfully. Across all sites. In parallel where safe, sequential where necessary.

### Node Replacement Without Disruption

A failed server in a K8s cluster needs replacement. The new server needs to be provisioned to the exact same specification — same OS, same K8s version, same kernel parameters, same storage configuration — and joined to the cluster seamlessly. With MOJO, the replacement workflow is automated: discover the new hardware, provision to the cluster's specification via templates, join to the cluster, validate workload scheduling resumes normally.

### Hardware Health Below the Kubernetes Layer

Kubernetes sees nodes as compute resources. It doesn't see inlet temperatures, fan speeds, ECC memory errors, or BMC health. When a pod crashes because the underlying server's memory is degrading, Kubernetes just reschedules — it doesn't know *why* the node became unhealthy.

MOJO's health agent monitors the bare-metal layer beneath Kubernetes. It catches hardware degradation before it affects workloads — and can proactively cordon a node showing signs of failure before pods are impacted.

### Distributed Clusters, No On-Site Staff

MLB runs Kubernetes clusters at 60+ ballparks — all provisioned and managed remotely from New Jersey. No on-site IT staff at venues. When a node fails, when firmware needs updating, when a cluster needs scaling — it's all done remotely through MOJO's out-of-band management.

This is the model for distributed K8s on bare metal: central orchestration, remote execution, autonomous health monitoring, and zero requirement for boots on the ground.

## MOJO + Kubernetes: The Complete Stack

MOJO handles the bare-metal lifecycle underneath Kubernetes:

- **Day 1** — discover hardware, provision OS, bootstrap K8s, join to cluster
- **Day 2** — firmware compliance, hardware health monitoring, node replacement, distributed upgrades
- **Day N** — decommissioning with chain of custody, secure wipe, cluster-aware node removal

Kubernetes manages the workloads. MOJO manages the metal. Together, they're the complete stack for bare-metal Kubernetes at scale.

---

MOJO Platform is the first AI-native bare-metal infrastructure platform built for the enterprise. To learn more about bare-metal Kubernetes lifecycle management, visit [metify.io](https://metify.io).
