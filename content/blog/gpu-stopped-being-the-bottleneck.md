---
title: "The GPU Stopped Being the Bottleneck"
date: "2026-07-28"
author: "Aaron Allred, VP of Technology"
excerpt: "July's biggest AI infrastructure stories weren't about GPUs. They were about everything that keeps GPUs busy, and who is responsible for it."
image: "/images/blog/heroes/gpu-stopped-being-the-bottleneck.webp"
slug: "gpu-stopped-being-the-bottleneck"
---

*What July's infrastructure headlines tell us about keeping expensive AI clusters busy*

If you read the infrastructure press in July, you could be forgiven for thinking the GPU had quietly left the headlines. Data Center Knowledge's hardware roundup described an industry now investing across the whole stack: networking, memory, CPUs, orchestration software and chip design, all aimed at one thing, which is getting more work out of the accelerators already on the floor.

That is a real shift. For two years the question was "how many GPUs can we get?" In July, the question became "how busy can we keep the ones we have?"

## Five signals from July

**1. Networking became the utilization story.** At HPE Discover, HPE's networking chief argued that a congested or unreliable network can leave GPUs that cost hundreds of millions, or even billions, running at 75, 50 or even 25 percent of their capability. HPE's answer was a deeper push into AI networking, including new switches and automation aimed squarely at utilization.

**2. Memory joined GPUs and power as a chokepoint.** A cross-sector coalition of trade associations warned policymakers that AI buildouts are straining global memory supply.

**3. NVIDIA widened its footprint.** IDC data showed NVIDIA overtaking its rivals in data center Ethernet switching. Its roadmap update kept the Vera Rubin platform and Vera CPU on track, and introduced DSX OS to run AI factories.

**4. Utilization became a deal-level concern.** A $124 million QumulusAI deal was framed as a signal that simply adding hardware no longer guarantees returns. Keeping expensive clusters busy and economically efficient is now the priority.

**5. More silicon is entering the room.** Qualcomm landed a Meta CPU deal, and AWS launched Graviton5 instances to make the case that CPUs still matter in AI stacks. Fleets are getting more varied, not less.

**The pattern:** every one of these stories is about the same problem from a different angle. Capacity you have already paid for is not producing what it should.

## The layer that never makes a keynote slide

Each announcement above assumes a cluster that is racked, configured, imaged, firmware-matched and healthy. In practice, that is where utilization quietly leaks.

A node that never finished provisioning. A server imaged with the wrong build. A NIC whose firmware drifted away from what the fabric expects. A replacement machine that arrives and waits for someone to touch it. None of these show up on the capex slide. All of them show up as GPUs that were purchased and are not doing work.

Orchestration software, including NVIDIA's new DSX OS, lives above this layer and assumes it is in good shape. Someone still has to make it true, at every site and on every refresh cycle.

## Networking is part of the computer

HPE's argument at Discover is worth taking seriously beyond HPE: the network is part of the computer now. The fabric, whether it runs on Cisco, NVIDIA or Broadcom silicon, and the NICs from vendors like Broadcom and Chelsio, all carry firmware and configuration of their own.

If servers are managed in one tool, switches in another, and "what is supposed to be running where" lives in a spreadsheet, utilization problems become detective work. The teams that win treat the rack as one lifecycle with one record of truth.

## Where MOJO fits

MOJO is built for exactly this layer. It is a vendor-agnostic control plane for bare metal that uses open standards such as Redfish to discover, configure, provision, maintain and catalog a broad range of devices, with role-based access, monitoring and alerts built in. The goal is simple: make the state of the hardware known, intended and repeatable, so a node is either productive or visibly on its way to being productive.

Three things matter most for utilization:

- **A system of record for hardware.** What exists, where it is, what state it is in, and what state it should be in.
- **Repeatable provisioning.** Service catalog patterns mean a new or replaced node arrives at the same known-good state every time, without a person nursing it along.
- **Firmware as a managed lifecycle.** Push-button firmware upgrades turn drift from a surprise into a scheduled task.

And because MOJO is multi-vendor, it works whether your racks are Dell, HPE, Lenovo or Quanta. We have no stake in whose chip wins. Our stake is in whether the thing you bought is working.

## A proof point from the ballpark

Major League Baseball's MOJO deployment is a useful illustration of the same idea. MLB wanted to re-architect from VMs to containers across its ballparks in North America. Working with Google, MLB launched Anthos deployments on bare metal through MOJO's interface. According to the case study, MLB was able to "cut their deployment times in half," while removing unnecessary virtualization and legacy VM licenses.

The lesson is not about baseball. It is that when provisioning is repeatable and remote, you stop spending your best people on hardware babysitting.

## Four questions to ask about your own cluster

1. How long does a new or replaced node take to go from rack to productive, and who touches it?
2. Can you say, right now, which nodes are off their intended firmware and configuration?
3. Are your network and compute lifecycles tracked in the same place?
4. When utilization dips, how quickly can you tell whether it is a software problem or a hardware-state problem?

If those answers take a meeting to find, the bottleneck isn't the GPU.

**Want to see what a system of record for your hardware looks like?** Visit [metify.io](https://metify.io) or email [hello@metify.io](mailto:hello@metify.io).
