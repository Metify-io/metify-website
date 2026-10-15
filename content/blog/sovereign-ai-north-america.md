---
title: "Sovereign AI, North American Edition"
date: "2026-08-25"
author: "Aaron Allred, VP of Technology"
excerpt: "Sovereign AI has arrived in North America. Here is why control is an operations problem, and a practical test for sovereignty claims."
image: "/images/blog/heroes/sovereign-ai-north-america.webp"
slug: "sovereign-ai-north-america"
---

*Control is an operations problem, and most of the conversation is skipping that part*

Sovereignty has been a European and UK conversation for a while. This year it landed in North America, and the questions it raises are less about borders than about operations: who can run, patch, rebuild and audit the infrastructure your AI depends on, and who can't?

## What the UK and EU survey data says

A 2026 survey of 1,000 UK IT leaders, commissioned by UK sovereign cloud provider Civo, gives a clean picture of where the debate sits. Seventy-three percent now call data sovereignty a strategic priority, up from 61 percent a year earlier. Sixty-six percent would consider switching cloud providers to regain control.

The gap between intent and action is the more interesting finding. Actual migration to domestic alternatives has stalled at 15 percent, and 28 percent of organizations expect to deepen their reliance on US hyperscalers, up from 12 percent. Only 35 percent say they have full clarity on where their data is located and governed.

The report's own explanation is lock-in: organizations are not choosing to stay, they have lost the practical ability to leave. (As always with vendor-commissioned research, read the numbers as direction, not gospel. But the direction is consistent with what we hear from customers.)

## Why this is a North American story too

Sovereignty here doesn't look like a response to foreign law. It looks like three other things.

**Governments are naming it.** Canada launched its National AI Strategy on June 4, 2026, and treats sovereignty as more than data residency: it extends to control over the infrastructure, data, talent and governance systems behind AI. It commits to a public AI supercomputer by 2031. RBC's analysis adds that the US Trade Representative named Canada's sovereign computing initiative in a March 2026 trade report, a sign of how quickly infrastructure has become a policy topic. RBC is also careful to note that sovereignty should not mean isolation.

**Enterprises are voting with their budgets.** At Dell Technologies World in May, Dell said it had added 1,000 customers to its AI Factory with NVIDIA in one quarter, bringing the total to 5,000, with Eli Lilly, Honeywell and Samsung among those running AI on hardware they own and control rather than in the cloud.

**Vendors are defining it.** In a July episode of its Technically Speaking podcast, Red Hat's CTO and a field CTO described four pillars of sovereign capability: data, operational, technology and assurance sovereignty. They also made the case that open source licensing lets an organization keep using software, take over responsibility for it, or move providers if business terms change.

## Sovereignty washing, and a better test

Clara Chappaz, France's former digital minister, called it "sovereignty washing" when providers market sovereign clouds with little or no jurisdictional control behind them. The risk is real, because there is no universally accepted or legally enforceable definition of digital sovereignty.

So here is a practical test. Ignore the label and ask about operations:

- Can you discover and inventory every piece of hardware in your environment, without asking a vendor?
- Can you provision and rebuild it to a known state, on your own schedule?
- Can you control who touches it, and prove it afterward?
- Can you move to different hardware or a different software stack without starting over?

Those are Red Hat's "operational sovereignty" questions in plain language. Data residency answers where your data sits. Operational sovereignty answers whether you can actually run what you own.

## Sovereignty has a basement

There is a layer most sovereignty discussions never reach: the management plane under the operating system. Baseboard management controllers can power-cycle a server, update its firmware and change low-level configuration, even with no OS running.

August showed what happens when that layer is treated as an afterthought. At Black Hat, runZero's founder reported that more than 86,000 BMCs had management services exposed to the internet, and over half of them had at least one critical vulnerability. If your sovereign boundary stops at the OS, someone else can be standing in your basement.

## Where MOJO fits

MOJO is a vendor-agnostic control plane and system of record for bare-metal infrastructure. It is built on open standards such as Redfish, which matters for sovereignty in a specific way: the lack of standardized APIs is one of the main ways organizations end up locked to a single hardware vendor.

In operational terms, MOJO gives you the following:

- **A single inventory of what you own,** across vendors, as a system of record rather than a spreadsheet.
- **Repeatable provisioning and firmware lifecycle,** so rebuilding or refreshing hardware is your decision, not a dependency.
- **Role-based access and monitoring,** so control and accountability extend down to the hardware layer.
- **Hardware neutrality,** working across Dell, HPE, Lenovo, Quanta and others, so the "technology sovereignty" pillar isn't undone by a single-vendor tool.

Sovereignty isn't isolation, and it isn't a data center in the right country. It's the ability to run your own infrastructure, on your own terms, and prove it. That ability is built at the operations layer, one node at a time.

**Want to pressure-test your own sovereignty plan at the hardware layer?** Visit [metify.io](https://metify.io) or email [hello@metify.io](mailto:hello@metify.io).
