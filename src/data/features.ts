export interface Feature {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: string;
  image: string;
}

export const features: Feature[] = [
  {
    id: 'discovery',
    title: 'OEM Agnostic Discovery',
    description:
      "MOJO's agentic core gives operators the flexibility to handle servers from any OEM. This eliminates the dependence on vendor-specific tools or navigating through multiple management suites.",
    details:
      'Importing Redfish, IPMI, vPro, AMD-PRO infrastructure has never been easier! Connect your power, plug in your network, scan for assets, authenticate, and start provisioning your favorite O/S footprints and stacks.',
    icon: 'search',
    image: '/images/screenshots/OEM-Agnostic-Discovery-ss.gif',
  },
  {
    id: 'bios',
    title: 'BIOS Configuration',
    description:
      "MOJO's ability to update BIOS settings as part of a provisioning workflow is a valuable feature for efficiently managing server configurations at scale.",
    details:
      'Update BIOS settings across multiple servers at once from the UI, CLI or through our API. Supports all major OEM platforms.',
    icon: 'chip',
    image: '/images/screenshots/Bios-Configuration-SS.jpg',
  },
  {
    id: 'firmware',
    title: 'Firmware Management',
    description:
      "MOJO's AI-powered firmware management provides a comprehensive solution for enterprises, offering capabilities for updating BIOS, BMC, and add-on card firmware.",
    details:
      'We support Dell, HPE, Supermicro, ASRock Rack and Open Compute OpenBMC platforms. MOJO also protects firmware in a secure object store with SHA-256 hash verification.',
    icon: 'download',
    image: '/images/screenshots/Fireware-Management-code.jpg',
  },
  {
    id: 'provisioning',
    title: 'Provisioning',
    description:
      "MOJO Platform's provisioning features provide a robust and user-friendly solution for server provisioning in data center or edge environments.",
    details:
      'Automatically provision all major operating systems including: Ubuntu, Debian, Red Hat Enterprise Linux, Arch Linux, SUSE, FreeBSD and Windows Server. Built-in DHCP/iPXE Server included.',
    icon: 'terminal',
    image: '/images/screenshots/Peek-2024-02-12-10-08.gif',
  },
  {
    id: 'rbac',
    title: 'RBAC & BMC Governance',
    description:
      'MOJO allows management of your hardware through role-based access controls. An approval hierarchy prevents destructive actions on a server from taking place without approval.',
    details:
      'Download compliance reports for your hardware that includes a full breakdown of actions taken over time. Assign specific policies like Superuser, read-only, provision only, and more.',
    icon: 'lock',
    image: '/images/screenshots/Mojo_Request_Approve.gif',
  },
];
