// AI Infrastructure Market Map - Ultimate Market Inspection Tool
// Advanced force-directed bubble network with comprehensive market analysis

// ============================================
// Configuration
// ============================================
const config = {
    bubbleRadius: {
        min: 12,       // Minimum bubble size (orphan nodes)
        base: 16,      // Base size for 1-2 connections
        max: 40        // Maximum size for highly connected nodes
    },
    forceStrength: -400,
    animationDuration: 400,
    initialScale: 0.7,
    showOnlyCompanies: true,
    hideConnectionsDefault: true  // Only show connections on click
};

// Comprehensive company relationships with detailed explanations
// EVERY company has buy/sell relationships mapped
const companyRelationships = [
    // ===== FOUNDRIES (TSMC, Samsung, Intel, GlobalFoundries, UMC) =====
    // TSMC relationships
    { source: "NVIDIA Corporation", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Foundry", value: "100%", reason: "TSMC manufactures all NVIDIA GPUs on cutting-edge 4nm/5nm nodes", strength: 3, sector: "manufacturing" },
    { source: "Advanced Micro Devices, Inc.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Foundry", value: "100%", reason: "All AMD CPUs/GPUs manufactured by TSMC", strength: 3, sector: "manufacturing" },
    { source: "Broadcom Inc. NIC controllers and switch silicon", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Foundry", value: "Primary", reason: "TSMC manufactures Broadcom's advanced networking chips", strength: 3, sector: "manufacturing" },
    { source: "Marvell Technology, Inc.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Foundry", value: "Primary", reason: "TSMC produces Marvell's 5nm data infrastructure chips", strength: 2, sector: "manufacturing" },
    { source: "Arm Holdings plc", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Reference", value: "Partner", reason: "ARM designs reference RTL optimized for TSMC nodes", strength: 2, sector: "manufacturing" },

    // Samsung Foundry relationships
    { source: "Samsung Electronics Co., Ltd.", target: "NVIDIA Corporation", label: "Memory", value: "~20%", reason: "GDDR6X and HBM supply for consumer/gaming GPUs", strength: 2, sector: "memory" },
    { source: "Synopsys, Inc.", target: "Samsung Electronics Co., Ltd.", label: "PDK", value: "Partner", reason: "EDA tools certified for Samsung Foundry processes", strength: 2, sector: "software" },

    // Intel relationships  
    { source: "Intel Corporation", target: "ASML Holding N.V.", label: "EUV", value: "Customer", reason: "Intel buys EUV machines for Intel 4/3 process nodes", strength: 2, sector: "equipment" },
    { source: "Intel Corporation", target: "Applied Materials, Inc.", label: "Equipment", value: "Customer", reason: "Intel purchases deposition/etch equipment for fabs", strength: 2, sector: "equipment" },
    { source: "Dell Technologies Inc.", target: "Intel Corporation", label: "Xeon", value: "Supplier", reason: "Intel Xeon CPUs power Dell PowerEdge servers", strength: 2, sector: "compute" },
    { source: "Hewlett Packard Enterprise Company", target: "Intel Corporation", label: "Xeon", value: "Supplier", reason: "Intel processors in HPE ProLiant servers", strength: 2, sector: "compute" },

    // GlobalFoundries & UMC
    { source: "GlobalFoundries Inc.", target: "Marvell Technology, Inc.", label: "Foundry", value: "Secondary", reason: "GF makes some Marvell legacy node products", strength: 1, sector: "manufacturing" },
    { source: "United Microelectronics Corporation", target: "Broadcom Inc. NIC controllers and switch silicon", label: "Foundry", value: "Legacy", reason: "UMC produces older Broadcom chip designs", strength: 1, sector: "manufacturing" },

    // ===== LITHOGRAPHY (ASML, Nikon, Canon) =====
    { source: "ASML Holding N.V.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "EUV", value: "100%", reason: "Sole supplier of EUV lithography for sub-7nm nodes", strength: 3, sector: "equipment" },
    { source: "ASML Holding N.V.", target: "Samsung Electronics Co., Ltd.", label: "EUV", value: "100%", reason: "ASML provides all EUV systems to Samsung Foundry", strength: 3, sector: "equipment" },
    { source: "ASML Holding N.V.", target: "Intel Corporation", label: "EUV", value: "100%", reason: "Intel High-NA EUV customer for future nodes", strength: 3, sector: "equipment" },
    { source: "Nikon Corporation", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "DUV", value: "Secondary", reason: "Nikon i-line/DUV steppers for mature nodes", strength: 1, sector: "equipment" },
    { source: "Canon Inc.", target: "Samsung Electronics Co., Ltd.", label: "DUV", value: "Secondary", reason: "Canon lithography for legacy semiconductor processes", strength: 1, sector: "equipment" },

    // ===== EQUIPMENT (Applied Materials, Lam, TEL, KLA, etc.) =====
    { source: "Applied Materials, Inc.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Deposition", value: "~35%", reason: "CVD/PVD equipment for transistor fabrication", strength: 2, sector: "equipment" },
    { source: "Applied Materials, Inc.", target: "Samsung Electronics Co., Ltd.", label: "Equipment", value: "Major", reason: "Deposition and etch systems for Samsung fabs", strength: 2, sector: "equipment" },
    { source: "Applied Materials, Inc.", target: "SK hynix Inc.", label: "Equipment", value: "Major", reason: "Equipment for HBM memory production", strength: 2, sector: "equipment" },
    { source: "Lam Research Corporation", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Etch", value: "~40%", reason: "Plasma etch systems for pattern definition", strength: 2, sector: "equipment" },
    { source: "Lam Research Corporation", target: "Micron Technology, Inc.", label: "Etch", value: "Major", reason: "Etch equipment for DRAM/NAND production", strength: 2, sector: "equipment" },
    { source: "Lam Research Corporation", target: "SK hynix Inc.", label: "Etch", value: "Major", reason: "Etch systems for HBM manufacturing", strength: 2, sector: "equipment" },
    { source: "Tokyo Electron Limited", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Coater", value: "~35%", reason: "Photoresist coating and development equipment", strength: 2, sector: "equipment" },
    { source: "Tokyo Electron Limited", target: "Samsung Electronics Co., Ltd.", label: "Track", value: "Major", reason: "Coat/develop track systems for Samsung", strength: 2, sector: "equipment" },
    { source: "KLA Corporation", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Metrology", value: "~55%", reason: "Defect inspection and process control systems", strength: 2, sector: "equipment" },
    { source: "KLA Corporation", target: "Intel Corporation", label: "Inspection", value: "Major", reason: "Process control for Intel fabs", strength: 2, sector: "equipment" },
    { source: "ASM International N.V.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "ALD", value: "Leader", reason: "Atomic layer deposition for advanced nodes", strength: 2, sector: "equipment" },
    { source: "Axcelis Technologies, Inc.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Implant", value: "Supplier", reason: "Ion implantation systems", strength: 1, sector: "equipment" },
    { source: "SCREEN Holdings Co., Ltd.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Cleaning", value: "Major", reason: "Wet clean and processing equipment", strength: 2, sector: "equipment" },
    { source: "Kokusai Electric Corporation", target: "Samsung Electronics Co., Ltd.", label: "Furnace", value: "Major", reason: "Batch furnace systems for memory", strength: 1, sector: "equipment" },

    // ===== VACUUM & SUBSYSTEMS (VAT, Atlas Copco, MKS, Ichor, UCTT) =====
    { source: "VAT Group AG", target: "Applied Materials, Inc.", label: "Valves", value: "Primary", reason: "Vacuum valves for etch/deposition tools", strength: 2, sector: "equipment" },
    { source: "VAT Group AG", target: "Lam Research Corporation", label: "Valves", value: "Primary", reason: "High-purity vacuum components", strength: 2, sector: "equipment" },
    { source: "Atlas Copco AB", target: "Applied Materials, Inc.", label: "Vacuum", value: "Supplier", reason: "Vacuum pumps for semiconductor equipment", strength: 1, sector: "equipment" },
    { source: "MKS Instruments, Inc.", target: "Lam Research Corporation", label: "Subsystems", value: "Supplier", reason: "RF power, pressure control subsystems", strength: 2, sector: "equipment" },
    { source: "MKS Instruments, Inc.", target: "Applied Materials, Inc.", label: "Subsystems", value: "Supplier", reason: "Gas delivery and plasma power systems", strength: 2, sector: "equipment" },
    { source: "Ichor Holdings, Ltd.", target: "Lam Research Corporation", label: "Gas", value: "Supplier", reason: "Gas delivery systems and components", strength: 1, sector: "equipment" },
    { source: "Ultra Clean Holdings, Inc.", target: "Applied Materials, Inc.", label: "Parts", value: "Supplier", reason: "Precision cleaning and manufacturing services", strength: 1, sector: "equipment" },

    // ===== TEST EQUIPMENT (Advantest, Teradyne) =====
    { source: "Advantest Corporation", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Test", value: "Major", reason: "Wafer and chip testing equipment", strength: 2, sector: "equipment" },
    { source: "Advantest Corporation", target: "NVIDIA Corporation", label: "Test", value: "Supplier", reason: "GPU testing and characterization systems", strength: 2, sector: "equipment" },
    { source: "Teradyne, Inc.", target: "Advanced Micro Devices, Inc.", label: "Test", value: "Supplier", reason: "ATE systems for AMD chip testing", strength: 2, sector: "equipment" },
    { source: "Teradyne, Inc.", target: "Intel Corporation", label: "Test", value: "Supplier", reason: "Testing equipment for Intel products", strength: 2, sector: "equipment" },

    // ===== PHOTOMASKS (Photronics, DNP, Toppan) =====
    { source: "Photronics, Inc.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Masks", value: "Supplier", reason: "Photomasks for IC patterning", strength: 2, sector: "manufacturing" },
    { source: "Dai Nippon Printing Co., Ltd.", target: "Samsung Electronics Co., Ltd.", label: "Masks", value: "Supplier", reason: "Advanced photomasks for Samsung", strength: 1, sector: "manufacturing" },
    { source: "Toppan Holdings Inc.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Masks", value: "Supplier", reason: "EUV photomask production", strength: 2, sector: "manufacturing" },

    // ===== PACKAGING (ASE, Amkor, JCET, BESI) =====
    { source: "ASE Technology Holding Co., Ltd.", target: "NVIDIA Corporation", label: "OSAT", value: "Partner", reason: "Advanced packaging for GPU modules", strength: 2, sector: "manufacturing" },
    { source: "ASE Technology Holding Co., Ltd.", target: "Advanced Micro Devices, Inc.", label: "OSAT", value: "Partner", reason: "Backend packaging services for AMD", strength: 2, sector: "manufacturing" },
    { source: "Amkor Technology, Inc.", target: "NVIDIA Corporation", label: "Packaging", value: "Partner", reason: "2.5D/3D packaging capabilities", strength: 2, sector: "manufacturing" },
    { source: "Amkor Technology, Inc.", target: "Broadcom Inc. NIC controllers and switch silicon", label: "Packaging", value: "Supplier", reason: "Packaging for Broadcom networking chips", strength: 2, sector: "manufacturing" },
    { source: "JCET Group Co., Ltd.", target: "Marvell Technology, Inc.", label: "OSAT", value: "Supplier", reason: "Assembly and test services", strength: 1, sector: "manufacturing" },
    { source: "BE Semiconductor Industries N.V.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Hybrid", value: "Equipment", reason: "Hybrid bonding equipment for chiplets", strength: 2, sector: "equipment" },
    { source: "BE Semiconductor Industries N.V.", target: "ASE Technology Holding Co., Ltd.", label: "Bonders", value: "Equipment", reason: "Die bonding equipment for OSAT", strength: 2, sector: "equipment" },

    // ===== HBM PACKAGING (TOWA, Resonac, Henkel) =====
    { source: "TOWA Corporation", target: "SK hynix Inc.", label: "Molding", value: "Supplier", reason: "Compression molding for HBM stacks", strength: 2, sector: "equipment" },
    { source: "Resonac Holdings Corporation", target: "SK hynix Inc.", label: "Materials", value: "Supplier", reason: "Die attach films and packaging materials", strength: 2, sector: "materials" },
    { source: "Henkel AG and Co. KGaA", target: "ASE Technology Holding Co., Ltd.", label: "Adhesives", value: "Supplier", reason: "Thermal interface materials and adhesives", strength: 1, sector: "materials" },

    // ===== SUBSTRATES (Ajinomoto, Ibiden, Shinko, Unimicron, AT&S) =====
    { source: "Ajinomoto Co., Inc.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "ABF", value: "Critical", reason: "ABF substrate film - critical bottleneck supply", strength: 3, sector: "materials" },
    { source: "Ibiden Co., Ltd.", target: "NVIDIA Corporation", label: "Substrates", value: "Supplier", reason: "IC substrates for GPU packages", strength: 2, sector: "materials" },
    { source: "Ibiden Co., Ltd.", target: "Intel Corporation", label: "Substrates", value: "Supplier", reason: "CPU packaging substrates", strength: 2, sector: "materials" },
    { source: "Shinko Electric Industries Co., Ltd.", target: "Advanced Micro Devices, Inc.", label: "Substrates", value: "Supplier", reason: "FC-BGA substrates for AMD chips", strength: 2, sector: "materials" },
    { source: "Unimicron Technology Corp.", target: "NVIDIA Corporation", label: "PCB", value: "Supplier", reason: "High-layer PCB substrates", strength: 2, sector: "materials" },
    { source: "AT and S Austria Technologie and Systemtechnik AG", target: "Advanced Micro Devices, Inc.", label: "Substrates", value: "Supplier", reason: "Advanced IC substrates for AMD", strength: 2, sector: "materials" },
    { source: "Samsung Electro-Mechanics Co., Ltd.", target: "Samsung Electronics Co., Ltd.", label: "Substrates", value: "Captive", reason: "Internal substrate supply for Samsung", strength: 2, sector: "materials" },

    // ===== MATERIALS & CHEMICALS (Entegris, Linde, Air Liquide, Shin-Etsu, DuPont) =====
    { source: "Entegris, Inc.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Filtration", value: "Critical", reason: "Contamination control and materials delivery", strength: 3, sector: "materials" },
    { source: "Entegris, Inc.", target: "Samsung Electronics Co., Ltd.", label: "Materials", value: "Major", reason: "Advanced materials for memory fabs", strength: 2, sector: "materials" },
    { source: "Linde plc", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Gases", value: "Primary", reason: "Ultra-high purity gases for fab operations", strength: 2, sector: "materials" },
    { source: "Air Liquide S.A.", target: "Samsung Electronics Co., Ltd.", label: "Gases", value: "Primary", reason: "Process gases for memory manufacturing", strength: 2, sector: "materials" },
    { source: "Shin-Etsu Chemical Co., Ltd.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Wafers", value: "Primary", reason: "300mm silicon wafer supply", strength: 3, sector: "materials" },
    { source: "Tokyo Ohka Kogyo Co., Ltd.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Resist", value: "Supplier", reason: "Photoresist chemicals for lithography", strength: 2, sector: "materials" },
    { source: "DuPont de Nemours, Inc.", target: "Intel Corporation", label: "Materials", value: "Supplier", reason: "CMP pads, slurries, and specialty materials", strength: 2, sector: "materials" },

    // ===== WAFERS (SUMCO, Siltronic, DISCO) =====
    { source: "SUMCO Corporation", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Wafers", value: "Major", reason: "300mm silicon wafer supply", strength: 2, sector: "materials" },
    { source: "Siltronic AG", target: "Intel Corporation", label: "Wafers", value: "Supplier", reason: "High-purity silicon wafers", strength: 2, sector: "materials" },
    { source: "DISCO Corporation", target: "ASE Technology Holding Co., Ltd.", label: "Dicing", value: "Supplier", reason: "Wafer dicing and grinding equipment", strength: 2, sector: "equipment" },

    // ===== AI ACCELERATORS & GPUs (NVIDIA, AMD) =====
    { source: "NVIDIA Corporation", target: "SK hynix Inc.", label: "HBM3e", value: "~55%", reason: "Primary HBM3e supplier for H100/H200", strength: 3, sector: "memory" },
    { source: "NVIDIA Corporation", target: "Micron Technology, Inc.", label: "HBM3", value: "~25%", reason: "Secondary HBM supplier ramping HBM3e", strength: 2, sector: "memory" },
    { source: "NVIDIA Corporation", target: "Synopsys, Inc.", label: "EDA", value: "Primary", reason: "Chip design and verification tools", strength: 2, sector: "software" },
    { source: "NVIDIA Corporation", target: "Cadence Design Systems, Inc.", label: "EDA", value: "Secondary", reason: "IP and verification tools", strength: 2, sector: "software" },
    { source: "Advanced Micro Devices, Inc.", target: "SK hynix Inc.", label: "HBM3", value: "Primary", reason: "HBM for MI300X AI accelerators", strength: 2, sector: "memory" },
    { source: "Advanced Micro Devices, Inc.", target: "Cadence Design Systems, Inc.", label: "EDA", value: "Primary", reason: "Design verification and simulation", strength: 2, sector: "software" },

    // ===== SERVER OEMS (Dell, HPE, Supermicro, Lenovo) =====
    { source: "NVIDIA Corporation", target: "Super Micro Computer, Inc.", label: "GPUs", value: "#1 Partner", reason: "Largest NVIDIA AI server integrator", strength: 3, sector: "servers" },
    { source: "NVIDIA Corporation", target: "Dell Technologies Inc.", label: "GPUs", value: "Major", reason: "Enterprise AI server sales via PowerEdge", strength: 2, sector: "servers" },
    { source: "NVIDIA Corporation", target: "Hewlett Packard Enterprise Company", label: "GPUs", value: "Major", reason: "HPC and Cray supercomputer integration", strength: 2, sector: "servers" },
    { source: "NVIDIA Corporation", target: "Lenovo Group Limited", label: "GPUs", value: "Partner", reason: "ThinkSystem AI server integration", strength: 2, sector: "servers" },
    { source: "Super Micro Computer, Inc.", target: "Microsoft Corporation", label: "Servers", value: "Supplier", reason: "AI server infrastructure for Azure", strength: 2, sector: "servers" },
    { source: "Dell Technologies Inc.", target: "Amazon.com, Inc.", label: "Servers", value: "Supplier", reason: "Enterprise server deployments", strength: 2, sector: "servers" },

    // ===== ODM/EMS (Celestica, Jabil, Foxconn, Quanta, Wistron, Inventec) =====
    { source: "Hon Hai Precision Industry Co., Ltd. (Foxconn)", target: "NVIDIA Corporation", label: "Assembly", value: "Major", reason: "GPU and server manufacturing services", strength: 2, sector: "manufacturing" },
    { source: "Quanta Computer Inc.", target: "Microsoft Corporation", label: "ODM", value: "Major", reason: "Azure server ODM manufacturing", strength: 2, sector: "manufacturing" },
    { source: "Quanta Computer Inc.", target: "Alphabet Inc.", label: "ODM", value: "Major", reason: "Google server manufacturing", strength: 2, sector: "manufacturing" },
    { source: "Celestica Inc.", target: "NVIDIA Corporation", label: "EMS", value: "Partner", reason: "AI infrastructure manufacturing", strength: 2, sector: "manufacturing" },
    { source: "Jabil Inc.", target: "Cisco Systems, Inc.", label: "EMS", value: "Major", reason: "Network equipment manufacturing", strength: 2, sector: "manufacturing" },
    { source: "Wistron Corporation", target: "Dell Technologies Inc.", label: "ODM", value: "Partner", reason: "Server and PC manufacturing", strength: 1, sector: "manufacturing" },
    { source: "Inventec Corporation", target: "Hewlett Packard Enterprise Company", label: "ODM", value: "Partner", reason: "Server ODM services", strength: 1, sector: "manufacturing" },

    // ===== CPUs (Intel Xeon, AMD EPYC, ARM) =====
    { source: "Arm Holdings plc", target: "NVIDIA Corporation", label: "Grace", value: "License", reason: "CPU IP for Grace Hopper superchip", strength: 2, sector: "compute" },
    { source: "Arm Holdings plc", target: "Amazon.com, Inc.", label: "Graviton", value: "License", reason: "Custom cores for Graviton processors", strength: 2, sector: "compute" },
    { source: "Arm Holdings plc", target: "Alphabet Inc.", label: "Axion", value: "License", reason: "Arm-based custom silicon for GCP", strength: 2, sector: "compute" },
    { source: "Arm Holdings plc", target: "Microsoft Corporation", label: "Cobalt", value: "License", reason: "Arm IP for Azure custom chips", strength: 2, sector: "compute" },
    { source: "Arm Holdings plc", target: "Broadcom Inc. NIC controllers and switch silicon", label: "IP", value: "License", reason: "CPU cores for networking SoCs", strength: 2, sector: "compute" },

    // ===== MEMORY (SK hynix, Micron, Samsung, WDC, Seagate) =====
    { source: "SK hynix Inc.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "CoWoS", value: "Stacking", reason: "TSMC packages HBM memory stacks", strength: 3, sector: "manufacturing" },
    { source: "Micron Technology, Inc.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "CoWoS", value: "Partner", reason: "HBM integration partnership", strength: 2, sector: "manufacturing" },
    { source: "Micron Technology, Inc.", target: "Dell Technologies Inc.", label: "SSDs", value: "Supplier", reason: "Enterprise NVMe storage drives", strength: 1, sector: "memory" },
    { source: "Micron Technology, Inc.", target: "Super Micro Computer, Inc.", label: "DRAM", value: "Supplier", reason: "Server memory modules", strength: 1, sector: "memory" },
    { source: "Western Digital Corporation", target: "Dell Technologies Inc.", label: "HDDs", value: "Supplier", reason: "High-capacity enterprise storage", strength: 1, sector: "memory" },
    { source: "Western Digital Corporation", target: "Hewlett Packard Enterprise Company", label: "Storage", value: "Supplier", reason: "HDD and SSD supply", strength: 1, sector: "memory" },
    { source: "Seagate Technology Holdings plc", target: "Dell Technologies Inc.", label: "HDDs", value: "Supplier", reason: "Nearline HDD storage", strength: 1, sector: "memory" },
    { source: "Seagate Technology Holdings plc", target: "Amazon.com, Inc.", label: "HDDs", value: "Supplier", reason: "Hyperscale HDD supply", strength: 1, sector: "memory" },

    // ===== STORAGE PLATFORMS (Pure Storage, NetApp) =====
    { source: "Pure Storage, Inc.", target: "Microsoft Corporation", label: "Flash", value: "Partner", reason: "All-flash storage for Azure Stack", strength: 1, sector: "memory" },
    { source: "Pure Storage, Inc.", target: "Amazon.com, Inc.", label: "Storage", value: "Partner", reason: "Enterprise storage solutions", strength: 1, sector: "memory" },
    { source: "NetApp, Inc.", target: "Alphabet Inc.", label: "Storage", value: "Partner", reason: "Enterprise storage partnership", strength: 1, sector: "memory" },
    { source: "NetApp, Inc.", target: "Microsoft Corporation", label: "Azure", value: "Partner", reason: "Azure NetApp Files service", strength: 1, sector: "memory" },

    // ===== FLASH CONTROLLERS (Phison, Silicon Motion) =====
    { source: "Phison Electronics Corporation", target: "Western Digital Corporation", label: "Controller", value: "Supplier", reason: "SSD controller chips", strength: 2, sector: "compute" },
    { source: "Silicon Motion Technology Corporation", target: "Micron Technology, Inc.", label: "Controller", value: "Supplier", reason: "Flash memory controllers", strength: 2, sector: "compute" },

    // ===== NETWORKING (Broadcom, Marvell, Arista, Cisco, Juniper) =====
    { source: "Broadcom Inc. NIC controllers and switch silicon", target: "Arista Networks, Inc.", label: "ASICs", value: "Primary", reason: "Tomahawk switch ASICs power Arista", strength: 3, sector: "networking" },
    { source: "Broadcom Inc. NIC controllers and switch silicon", target: "Cisco Systems, Inc.", label: "ASICs", value: "Partner", reason: "Networking silicon for Cisco", strength: 2, sector: "networking" },
    { source: "Marvell Technology, Inc.", target: "Arista Networks, Inc.", label: "PHY", value: "Secondary", reason: "Physical layer connectivity chips", strength: 2, sector: "networking" },
    { source: "Marvell Technology, Inc.", target: "Cisco Systems, Inc.", label: "DSPs", value: "Supplier", reason: "Optical DSPs for Cisco equipment", strength: 2, sector: "networking" },
    { source: "Arista Networks, Inc.", target: "Microsoft Corporation", label: "Switches", value: "Supplier", reason: "Data center fabric for Azure", strength: 2, sector: "networking" },
    { source: "Arista Networks, Inc.", target: "Alphabet Inc.", label: "Switches", value: "Supplier", reason: "Google data center networking", strength: 2, sector: "networking" },
    { source: "Arista Networks, Inc.", target: "Amazon.com, Inc.", label: "Switches", value: "Supplier", reason: "AWS infrastructure networking", strength: 2, sector: "networking" },
    { source: "Cisco Systems, Inc.", target: "Microsoft Corporation", label: "Network", value: "Supplier", reason: "Enterprise networking equipment", strength: 2, sector: "networking" },
    { source: "Cisco Systems, Inc.", target: "Amazon.com, Inc.", label: "Network", value: "Supplier", reason: "Data center networking", strength: 2, sector: "networking" },
    { source: "Juniper Networks, Inc.", target: "Microsoft Corporation", label: "Routing", value: "Supplier", reason: "Core routing infrastructure", strength: 1, sector: "networking" },

    // ===== CONNECTIVITY SILICON (Astera Labs, Credo) =====
    { source: "Astera Labs, Inc.", target: "NVIDIA Corporation", label: "Retimers", value: "Supplier", reason: "PCIe/CXL retimers for AI servers", strength: 2, sector: "networking" },
    { source: "Astera Labs, Inc.", target: "Super Micro Computer, Inc.", label: "Retimers", value: "Supplier", reason: "Connectivity ICs for AI platforms", strength: 2, sector: "networking" },
    { source: "Credo Technology Group Holding Ltd", target: "Microsoft Corporation", label: "AEC", value: "Supplier", reason: "Active Ethernet cables for Azure", strength: 2, sector: "networking" },
    { source: "Credo Technology Group Holding Ltd", target: "Amazon.com, Inc.", label: "DSP", value: "Supplier", reason: "Line card DSPs for hyperscale", strength: 2, sector: "networking" },

    // ===== OPTICAL (Coherent, Lumentum, Fabrinet) =====
    { source: "Coherent Corp.", target: "Microsoft Corporation", label: "Optics", value: "Supplier", reason: "800G optical transceivers", strength: 2, sector: "networking" },
    { source: "Coherent Corp.", target: "Alphabet Inc.", label: "Optics", value: "Supplier", reason: "High-speed optical modules", strength: 2, sector: "networking" },
    { source: "Coherent Corp.", target: "Amazon.com, Inc.", label: "Optics", value: "Supplier", reason: "Data center optics", strength: 2, sector: "networking" },
    { source: "Lumentum Holdings Inc.", target: "Amazon.com, Inc.", label: "Lasers", value: "Supplier", reason: "Laser components for networking", strength: 2, sector: "networking" },
    { source: "Lumentum Holdings Inc.", target: "Cisco Systems, Inc.", label: "Optics", value: "Supplier", reason: "Optical components for Cisco", strength: 2, sector: "networking" },
    { source: "Fabrinet", target: "Coherent Corp.", label: "Mfg", value: "Partner", reason: "Contract manufacturing for optics", strength: 2, sector: "manufacturing" },
    { source: "Fabrinet", target: "Lumentum Holdings Inc.", label: "Mfg", value: "Partner", reason: "Optical component manufacturing", strength: 2, sector: "manufacturing" },

    // ===== CABLES & CONNECTORS (Corning, Amphenol, TE, Prysmian, Nexans) =====
    { source: "Corning Incorporated", target: "Equinix, Inc.", label: "Fiber", value: "Supplier", reason: "Optical fiber cabling", strength: 2, sector: "networking" },
    { source: "Corning Incorporated", target: "Microsoft Corporation", label: "Fiber", value: "Supplier", reason: "Subsea and terrestrial fiber", strength: 2, sector: "networking" },
    { source: "Corning Incorporated", target: "Alphabet Inc.", label: "Fiber", value: "Supplier", reason: "Data center fiber infrastructure", strength: 2, sector: "networking" },
    { source: "Amphenol Corporation", target: "Super Micro Computer, Inc.", label: "Cables", value: "Supplier", reason: "High-speed copper interconnects", strength: 1, sector: "networking" },
    { source: "Amphenol Corporation", target: "Dell Technologies Inc.", label: "Connectors", value: "Supplier", reason: "Server interconnect solutions", strength: 1, sector: "networking" },
    { source: "TE Connectivity Ltd.", target: "Dell Technologies Inc.", label: "Connectors", value: "Supplier", reason: "Server connectors and assemblies", strength: 1, sector: "networking" },
    { source: "TE Connectivity Ltd.", target: "Hewlett Packard Enterprise Company", label: "Cables", value: "Supplier", reason: "Data center cabling", strength: 1, sector: "networking" },
    { source: "Prysmian S.p.A.", target: "Microsoft Corporation", label: "Subsea", value: "Supplier", reason: "Submarine cable systems", strength: 1, sector: "networking" },
    { source: "Nexans S.A.", target: "Alphabet Inc.", label: "Cables", value: "Supplier", reason: "Subsea and land cables", strength: 1, sector: "networking" },

    // ===== POWER (Vertiv, Eaton, Schneider, ABB, Siemens) =====
    { source: "Vertiv Holdings Co.", target: "Equinix, Inc.", label: "Power/Cool", value: "Supplier", reason: "UPS and thermal management", strength: 2, sector: "infrastructure" },
    { source: "Vertiv Holdings Co.", target: "Digital Realty Trust, Inc.", label: "Cooling", value: "Supplier", reason: "Precision cooling systems", strength: 2, sector: "infrastructure" },
    { source: "Vertiv Holdings Co.", target: "Microsoft Corporation", label: "Power", value: "Supplier", reason: "Data center power infrastructure", strength: 2, sector: "infrastructure" },
    { source: "Eaton Corporation plc", target: "Equinix, Inc.", label: "PDU", value: "Supplier", reason: "Power distribution units", strength: 2, sector: "infrastructure" },
    { source: "Eaton Corporation plc", target: "Amazon.com, Inc.", label: "Power", value: "Supplier", reason: "Electrical systems for AWS", strength: 2, sector: "infrastructure" },
    { source: "Schneider Electric SE", target: "Microsoft Corporation", label: "Power", value: "Partner", reason: "Data center infrastructure", strength: 2, sector: "infrastructure" },
    { source: "Schneider Electric SE", target: "Alphabet Inc.", label: "Monitoring", value: "Supplier", reason: "DCIM and power monitoring", strength: 2, sector: "infrastructure" },
    { source: "ABB Ltd", target: "Equinix, Inc.", label: "Power", value: "Supplier", reason: "Power distribution equipment", strength: 1, sector: "infrastructure" },
    { source: "Siemens AG", target: "Microsoft Corporation", label: "Electrical", value: "Supplier", reason: "Building automation and power", strength: 1, sector: "infrastructure" },

    // ===== GRID & GENERATION (GE Vernova, Siemens Energy) =====
    { source: "GE Vernova Inc.", target: "Microsoft Corporation", label: "Grid", value: "Partner", reason: "Grid equipment for data centers", strength: 1, sector: "infrastructure" },
    { source: "GE Vernova Inc.", target: "Amazon.com, Inc.", label: "Generation", value: "Partner", reason: "Power generation for hyperscale", strength: 1, sector: "infrastructure" },
    { source: "Siemens Energy AG", target: "Alphabet Inc.", label: "Grid", value: "Supplier", reason: "Transmission and grid equipment", strength: 1, sector: "infrastructure" },

    // ===== POWER SEMICONDUCTORS (Infineon, STMicro, onsemi) =====
    { source: "Infineon Technologies AG", target: "Super Micro Computer, Inc.", label: "Power ICs", value: "Supplier", reason: "Power semiconductors for servers", strength: 2, sector: "compute" },
    { source: "Infineon Technologies AG", target: "Dell Technologies Inc.", label: "MOSFETs", value: "Supplier", reason: "Power management ICs", strength: 1, sector: "compute" },
    { source: "STMicroelectronics N.V.", target: "Hewlett Packard Enterprise Company", label: "Power", value: "Supplier", reason: "Power semiconductors", strength: 1, sector: "compute" },
    { source: "onsemi", target: "Super Micro Computer, Inc.", label: "Power", value: "Supplier", reason: "VRMs and power stages", strength: 1, sector: "compute" },

    // ===== RACKS & ENCLOSURES (nVent, Legrand) =====
    { source: "nVent Electric plc", target: "Equinix, Inc.", label: "Racks", value: "Supplier", reason: "Server racks and enclosures", strength: 1, sector: "infrastructure" },
    { source: "nVent Electric plc", target: "Microsoft Corporation", label: "Thermal", value: "Supplier", reason: "Thermal management solutions", strength: 1, sector: "infrastructure" },
    { source: "Legrand S.A.", target: "Digital Realty Trust, Inc.", label: "PDU", value: "Supplier", reason: "Power distribution products", strength: 1, sector: "infrastructure" },

    // ===== COOLING (Trane, Johnson Controls, Carrier, Modine) =====
    { source: "Trane Technologies plc", target: "Amazon.com, Inc.", label: "HVAC", value: "Supplier", reason: "Large-scale cooling systems", strength: 2, sector: "infrastructure" },
    { source: "Trane Technologies plc", target: "Microsoft Corporation", label: "Cooling", value: "Supplier", reason: "Data center HVAC", strength: 2, sector: "infrastructure" },
    { source: "Johnson Controls International plc", target: "Alphabet Inc.", label: "HVAC", value: "Supplier", reason: "Building automation and cooling", strength: 1, sector: "infrastructure" },
    { source: "Carrier Global Corporation", target: "Equinix, Inc.", label: "Cooling", value: "Supplier", reason: "HVAC systems", strength: 1, sector: "infrastructure" },
    { source: "Modine Manufacturing Company", target: "Microsoft Corporation", label: "Liquid", value: "Supplier", reason: "Liquid cooling for AI servers", strength: 2, sector: "infrastructure" },

    // ===== BACKUP POWER (Caterpillar, Cummins) =====
    { source: "Caterpillar Inc.", target: "Equinix, Inc.", label: "Generators", value: "Supplier", reason: "Backup diesel generators", strength: 1, sector: "infrastructure" },
    { source: "Caterpillar Inc.", target: "Digital Realty Trust, Inc.", label: "Generators", value: "Supplier", reason: "Emergency power generation", strength: 1, sector: "infrastructure" },
    { source: "Cummins Inc.", target: "Microsoft Corporation", label: "Generators", value: "Supplier", reason: "Backup power systems", strength: 1, sector: "infrastructure" },
    { source: "Cummins Inc.", target: "Amazon.com, Inc.", label: "Generators", value: "Supplier", reason: "Data center backup power", strength: 1, sector: "infrastructure" },

    // ===== DATA CENTERS (Equinix, Digital Realty, Iron Mountain) =====
    { source: "Equinix, Inc.", target: "Microsoft Corporation", label: "Colo", value: "Partner", reason: "Edge colocation for Azure", strength: 2, sector: "datacenter" },
    { source: "Equinix, Inc.", target: "Amazon.com, Inc.", label: "Colo", value: "Partner", reason: "AWS Direct Connect locations", strength: 2, sector: "datacenter" },
    { source: "Equinix, Inc.", target: "Alphabet Inc.", label: "Colo", value: "Partner", reason: "Google Cloud interconnection", strength: 2, sector: "datacenter" },
    { source: "Digital Realty Trust, Inc.", target: "Microsoft Corporation", label: "Lease", value: "Major", reason: "Large-scale DC capacity", strength: 2, sector: "datacenter" },
    { source: "Digital Realty Trust, Inc.", target: "Oracle Corporation", label: "Lease", value: "Partner", reason: "OCI infrastructure hosting", strength: 1, sector: "datacenter" },
    { source: "Iron Mountain Incorporated", target: "Amazon.com, Inc.", label: "Colo", value: "Partner", reason: "Data center and archival", strength: 1, sector: "datacenter" },

    // ===== HYPERSCALERS (Microsoft, Amazon, Google, Oracle, Alibaba) =====
    { source: "Microsoft Corporation", target: "NVIDIA Corporation", label: "AI Compute", value: "#1 Customer", reason: "Largest GPU buyer for Azure", strength: 3, sector: "cloud" },
    { source: "Amazon.com, Inc.", target: "NVIDIA Corporation", label: "AI Compute", value: "Top 3", reason: "GPUs for EC2/Bedrock", strength: 3, sector: "cloud" },
    { source: "Alphabet Inc.", target: "NVIDIA Corporation", label: "AI Compute", value: "Top 3", reason: "GPUs for Gemini training", strength: 3, sector: "cloud" },
    { source: "Oracle Corporation", target: "NVIDIA Corporation", label: "OCI GPU", value: "Growing", reason: "GPU cloud expansion", strength: 2, sector: "cloud" },
    { source: "Microsoft Corporation", target: "Advanced Micro Devices, Inc.", label: "MI300X", value: "Growing", reason: "AMD GPUs for Azure", strength: 2, sector: "cloud" },
    { source: "Alibaba Group Holding Limited", target: "NVIDIA Corporation", label: "AI", value: "Customer", reason: "GPU infrastructure for Alibaba Cloud", strength: 2, sector: "cloud" },

    // ===== SOFTWARE/EDA (Synopsys, Cadence, Siemens EDA) =====
    { source: "Synopsys, Inc.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "PDK", value: "Partner", reason: "Process Design Kits", strength: 2, sector: "software" },
    { source: "Synopsys, Inc.", target: "Intel Corporation", label: "EDA", value: "Partner", reason: "Design tools for Intel", strength: 2, sector: "software" },
    { source: "Cadence Design Systems, Inc.", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "PDK", value: "Partner", reason: "Verification tools certified", strength: 2, sector: "software" },
    { source: "Cadence Design Systems, Inc.", target: "Intel Corporation", label: "EDA", value: "Partner", reason: "Chip design tools", strength: 2, sector: "software" },

    // ===== MONITORING (Datadog, ServiceNow) =====
    { source: "Datadog, Inc.", target: "Microsoft Corporation", label: "Monitor", value: "Partner", reason: "Cloud observability platform", strength: 1, sector: "software" },
    { source: "Datadog, Inc.", target: "Amazon.com, Inc.", label: "APM", value: "Partner", reason: "Application monitoring on AWS", strength: 1, sector: "software" },
    { source: "Datadog, Inc.", target: "Alphabet Inc.", label: "Monitor", value: "Partner", reason: "GCP monitoring integration", strength: 1, sector: "software" },
    { source: "ServiceNow, Inc.", target: "Microsoft Corporation", label: "ITSM", value: "Partner", reason: "IT service management for Azure", strength: 1, sector: "software" },
    { source: "ServiceNow, Inc.", target: "Amazon.com, Inc.", label: "ITSM", value: "Partner", reason: "Enterprise workflow on AWS", strength: 1, sector: "software" },

    // ===== INTERNAL / PRODUCT LINE CONNECTIONS (Fixing Orphans) =====
    { source: "Intel Corporation Xeon CPUs", target: "Intel Corporation", label: "Mfg", value: "Internal", reason: "Intel Foundry manufactures Xeon CPUs", strength: 3, sector: "manufacturing" },
    { source: "Advanced Micro Devices, Inc. EPYC CPUs", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Foundry", value: "100%", reason: "TSMC manufactures EPYC server chips", strength: 3, sector: "manufacturing" },
    { source: "NVIDIA Corporation BlueField DPUs", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Foundry", value: "100%", reason: "TSMC manufactures BlueField chips", strength: 2, sector: "networking" },
    { source: "Broadcom Inc. Tomahawk class switch silicon", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Foundry", value: "Primary", reason: "TSMC N5/N3 nodes for Tomahawk 5", strength: 3, sector: "manufacturing" },
    { source: "Marvell Technology, Inc. switch silicon", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Foundry", value: "Primary", reason: "TSMC manufactures Marvell switch ASICs", strength: 2, sector: "manufacturing" },
    { source: "Marvell Technology, Inc. optical DSP and interconnect", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Foundry", value: "Primary", reason: "TSMC manufactures Inphi/Marvell DSPs", strength: 2, sector: "networking" },
    { source: "Broadcom Inc. connectivity", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Foundry", value: "Primary", reason: "Manufacturing for PCIe/SerDes chips", strength: 2, sector: "networking" },
    { source: "NVIDIA Corporation CUDA and AI software stack", target: "NVIDIA Corporation", label: "Platform", value: "Core", reason: "Software stack powering NVIDIA hardware", strength: 3, sector: "software" },
    { source: "Siemens AG Digital Industries Software", target: "Siemens AG", label: "Parent", value: "Owned", reason: "Software division of Siemens", strength: 2, sector: "software" },
    { source: "Applied Materials, Inc. Process Diagnostics and Control", target: "Applied Materials, Inc.", label: "Division", value: "Internal", reason: "PDC group within AMAT", strength: 2, sector: "equipment" },
    { source: "Applied Materials, Inc. Hybrid bonding systems", target: "Applied Materials, Inc.", label: "Division", value: "Internal", reason: "Hybrid bonding unit", strength: 2, sector: "equipment" },
    { source: "Taiwan Semiconductor Manufacturing Company (TSMC) Advanced Packaging and CoWoS", target: "Taiwan Semiconductor Manufacturing Company (TSMC)", label: "Division", value: "Internal", reason: "Packaging division of TSMC", strength: 3, sector: "manufacturing" }
];

// Sector colors for connection highlighting
const sectorColors = {
    manufacturing: "#8B5CF6",
    memory: "#06B6D4",
    servers: "#10B981",
    cloud: "#3B82F6",
    equipment: "#EC4899",
    networking: "#F59E0B",
    software: "#84CC16",
    datacenter: "#EF4444",
    infrastructure: "#F97316",
    compute: "#A855F7"
};

// ============================================
// State
// ============================================
let svg;
let g;
let zoom;
let simulation;
let nodes = [];
let links = [];
let nodeMap = new Map();
let currentWidth;
let currentHeight;
let selectedNode = null;
let nodeSelection = null;
let linkSelection = null;

// ============================================
// Initialize Application
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeVisualization();
    initializeLegend();
    initializeEventListeners();
    hideLoading();
});

// ============================================
// Bubble Network Initialization
// ============================================
function initializeVisualization() {
    const container = document.getElementById('tree-container');
    currentWidth = container.clientWidth;
    currentHeight = container.clientHeight;

    svg = d3.select('#tree-svg')
        .attr('width', currentWidth)
        .attr('height', currentHeight);

    const defs = svg.append('defs');

    // Glow filters
    const filter = defs.append('filter')
        .attr('id', 'glow')
        .attr('x', '-50%').attr('y', '-50%')
        .attr('width', '200%').attr('height', '200%');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const filterStrong = defs.append('filter')
        .attr('id', 'glowStrong')
        .attr('x', '-100%').attr('y', '-100%')
        .attr('width', '300%').attr('height', '300%');
    filterStrong.append('feGaussianBlur').attr('stdDeviation', '12').attr('result', 'coloredBlur');
    const feMergeStrong = filterStrong.append('feMerge');
    feMergeStrong.append('feMergeNode').attr('in', 'coloredBlur');
    feMergeStrong.append('feMergeNode').attr('in', 'SourceGraphic');

    // Sector-specific arrow markers - larger for visibility
    Object.entries(sectorColors).forEach(([sector, color]) => {
        defs.append('marker')
            .attr('id', `arrow-${sector}`)
            .attr('viewBox', '-0 -6 12 12')
            .attr('refX', 20)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 10)
            .attr('markerHeight', 10)
            .append('path')
            .attr('d', 'M 0,-5 L 10,0 L 0,5')
            .attr('fill', color);
    });

    // Category gradients
    Object.entries(categoryColors).forEach(([name, color]) => {
        const id = name.replace(/[^a-zA-Z]/g, '');
        const grad = defs.append('radialGradient')
            .attr('id', `gradient-${id}`)
            .attr('cx', '30%').attr('cy', '30%');
        grad.append('stop').attr('offset', '0%').attr('stop-color', lightenColor(color, 50));
        grad.append('stop').attr('offset', '100%').attr('stop-color', color);
    });

    g = svg.append('g').attr('class', 'network-group');

    zoom = d3.zoom()
        .scaleExtent([0.1, 5])
        .on('zoom', (event) => g.attr('transform', event.transform));

    svg.call(zoom);

    // Click on background to deselect
    svg.on('click', (event) => {
        if (event.target === svg.node()) {
            deselectNode();
        }
    });

    processData();
    createForceSimulation();
    render();

    setTimeout(centerView, 600);

    window.addEventListener('resize', handleResize);
}

function lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function processData() {
    nodes = [];
    links = [];
    nodeMap.clear();

    function processNode(data, parent = null, depth = 0, category = null) {
        const isCompany = !!data.ticker;
        const isCategory = depth === 1;
        const isSubcategory = depth === 2 && !data.ticker;

        // Only add companies to nodes (skip categories/subcategories for cleaner view)
        if (isCompany || !config.showOnlyCompanies) {
            const node = {
                id: data.name,
                name: data.name,
                ticker: data.ticker || null,
                exchange: data.exchange || null,
                depth: depth,
                category: category || data.name,
                parent: parent,
                isCategory: isCategory,
                isSubcategory: isSubcategory,
                isCompany: isCompany,
                radius: config.bubbleRadius.base, // Will be calculated after connections
                x: currentWidth / 2 + (Math.random() - 0.5) * 1200,  // Wider spread
                y: currentHeight / 2 + (Math.random() - 0.5) * 1200,
                connections: []
            };

            nodes.push(node);
            nodeMap.set(data.name, node);
        }

        // Skip hierarchy links when showing only companies
        if (parent && !config.showOnlyCompanies) {
            links.push({
                source: parent,
                target: data.name,
                isHierarchy: true,
                strength: 0.2
            });
        }

        if (data.children) {
            data.children.forEach(child => {
                processNode(child, data.name, depth + 1, depth === 0 ? child.name : category);
            });
        }
    }

    processNode(marketMapData);

    // Add relationship links with full details
    companyRelationships.forEach(rel => {
        if (nodeMap.has(rel.source) && nodeMap.has(rel.target)) {
            const link = {
                source: rel.source,
                target: rel.target,
                label: rel.label,
                value: rel.value,
                reason: rel.reason,
                sector: rel.sector,
                isRelationship: true,
                strength: rel.strength || 1
            };
            links.push(link);

            // Store connection reference in nodes
            const sourceNode = nodeMap.get(rel.source);
            const targetNode = nodeMap.get(rel.target);
            if (sourceNode) sourceNode.connections.push({ ...rel, direction: 'outgoing', node: rel.target });
            if (targetNode) targetNode.connections.push({ ...rel, direction: 'incoming', node: rel.source });
        }
    });
}

function createForceSimulation() {
    // Calculate connection counts and set bubble sizes
    const connectionCounts = new Map();
    links.filter(l => l.isRelationship).forEach(l => {
        const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
        const targetId = typeof l.target === 'object' ? l.target.id : l.target;
        connectionCounts.set(sourceId, (connectionCounts.get(sourceId) || 0) + 1);
        connectionCounts.set(targetId, (connectionCounts.get(targetId) || 0) + 1);
    });

    // Find max connections for scaling
    const maxConnections = Math.max(...connectionCounts.values(), 1);

    // Set radius based on connection count
    nodes.forEach(n => {
        const count = connectionCounts.get(n.id) || 0;
        n.connectionCount = count;
        n.isOrphan = count === 0;

        if (n.isOrphan) {
            n.radius = config.bubbleRadius.min;  // Tiny for orphans
        } else {
            // Scale from base to max based on connections
            const scale = Math.sqrt(count / maxConnections);  // Square root for gentler scaling
            n.radius = config.bubbleRadius.base + scale * (config.bubbleRadius.max - config.bubbleRadius.base);
        }
    });

    simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links.filter(l => l.isRelationship))
            .id(d => d.id)
            .distance(d => {
                // Longer links for highly connected nodes
                const sourceR = d.source.radius || 20;
                const targetR = d.target.radius || 20;
                return sourceR + targetR + 80;
            })
            .strength(0.2))
        .force('charge', d3.forceManyBody()
            .strength(d => d.isOrphan ? -30 : -(d.radius * 8)))  // Repulsion based on size
        .force('center', d3.forceCenter(currentWidth / 2, currentHeight / 2).strength(0.05))
        .force('collision', d3.forceCollide()
            .radius(d => d.radius + 25)  // Good spacing
            .strength(1))
        .force('x', d3.forceX(currentWidth / 2).strength(d => d.isOrphan ? 0.01 : 0.02))
        .force('y', d3.forceY(currentHeight / 2).strength(d => d.isOrphan ? 0.01 : 0.02))
        .alphaDecay(0.05)  // Faster stabilization (Performance Fix)
        .velocityDecay(0.4)
        .on('tick', ticked);
}

function render() {
    // Skip hierarchy links - only show relationship connections

    // Relationship Links - All curved
    linkSelection = g.selectAll('.relationship-link-group')
        .data(links.filter(l => l.isRelationship))
        .enter()
        .append('g')
        .attr('class', 'relationship-link-group');

    linkSelection.append('path')
        .attr('class', 'relationship-link')
        .attr('data-sector', d => d.sector)
        .attr('data-source', d => d.source)
        .attr('data-target', d => d.target)
        .attr('fill', 'none')
        .attr('stroke', d => sectorColors[d.sector] || '#EC4899')
        .attr('stroke-width', d => 0.8 + d.strength * 0.5)  // Thinner: 0.8px to 2.3px
        .attr('stroke-linecap', 'round')
        .attr('marker-end', d => `url(#arrow-${d.sector})`)
        .style('opacity', 0.25);  // Subtle but visible

    // Skip labels by default - too cluttered
    // Labels will only show on hover

    // Bubble Nodes
    nodeSelection = g.selectAll('.bubble')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', d => `bubble bubble-${d.isCompany ? 'company' : (d.isCategory ? 'category' : 'subcategory')}`)
        .attr('data-id', d => d.id)
        .style('cursor', 'pointer')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended))
        .on('click', handleNodeClick)
        .on('mouseover', handleNodeMouseOver)
        .on('mouseout', handleNodeMouseOut);

    nodeSelection.append('circle')
        .attr('r', d => d.radius)
        .attr('fill', d => {
            const catId = (d.category || '').replace(/[^a-zA-Z]/g, '');
            return `url(#gradient-${catId})`;
        })
        .attr('stroke', d => {
            return categoryColors[d.category] || '#fff';
        })
        .attr('stroke-width', d => d.isCategory ? 3 : (d.isCompany ? 1.5 : 2))
        .attr('stroke-opacity', 0.8)
        .attr('stroke-opacity', 0.8);
    // .style('filter', 'url(#glow)'); // PERFORMANCE FIX: Disabled passive glow

    // Ticker inside company bubbles
    nodeSelection.filter(d => d.isCompany && d.ticker)
        .append('text')
        .attr('class', 'ticker-text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('fill', 'white')
        .attr('font-size', d => d.ticker.length > 4 ? '7px' : '9px')
        .attr('font-weight', '800')
        .text(d => d.ticker.substring(0, 5));

    // Category/Subcategory labels below
    nodeSelection.filter(d => !d.isCompany)
        .append('text')
        .attr('class', 'label-text')
        .attr('text-anchor', 'middle')
        .attr('dy', d => d.radius + 16)
        .attr('fill', 'white')
        .attr('font-size', d => d.isCategory ? '13px' : '10px')
        .attr('font-weight', d => d.isCategory ? '800' : '600')
        .text(d => truncateText(d.name, d.isCategory ? 25 : 18));

    // Company name labels below
    nodeSelection.filter(d => d.isCompany)
        .append('text')
        .attr('class', 'company-label')
        .attr('text-anchor', 'middle')
        .attr('dy', d => d.radius + 12)
        .attr('fill', '#888')
        .attr('font-size', '7px')
        .text(d => truncateText(d.name, 15));
}

function ticked() {
    // PERFORMANCE FIX: Use cached selections to avoid expensive DOM queries
    if (!linkSelection || !nodeSelection) return;

    // Update relationship links as curves
    linkSelection.select('.relationship-link') // Need to select the path inside the group
        .attr('d', d => {
            const dx = d.target.x - d.source.x;
            const dy = d.target.y - d.source.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist === 0) return '';
            const curvature = Math.min(dist * 0.25, 50);  // Less curvature

            const midX = (d.source.x + d.target.x) / 2;
            const midY = (d.source.y + d.target.y) / 2;
            const normX = -dy / dist;
            const normY = dx / dist;
            const ctrlX = midX + normX * curvature;
            const ctrlY = midY + normY * curvature;

            return `M${d.source.x},${d.source.y} Q${ctrlX},${ctrlY} ${d.target.x},${d.target.y}`;
        });

    // Update bubbles
    nodeSelection
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
}

// ============================================
// Drag Handlers
// ============================================
function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// ============================================
// Selection & Highlighting
// ============================================
function handleNodeClick(event, d) {
    event.stopPropagation();
    selectNode(d);
}

function selectNode(d) {
    selectedNode = d;

    // Highlight this node
    g.selectAll('.bubble circle')
        .transition().duration(300)
        .style('opacity', n => {
            if (n.id === d.id) return 1;
            // Check if connected
            const isConnected = d.connections.some(c => c.node === n.id);
            return isConnected ? 0.9 : 0.2;
        })
        .attr('stroke-width', n => {
            if (n.id === d.id) return 6;
            const isConnected = d.connections.some(c => c.node === n.id);
            return isConnected ? 4 : 2;
        });

    // Highlight connected labels
    g.selectAll('.bubble .label-text, .bubble .company-label, .bubble .ticker-text')
        .transition().duration(300)
        .style('opacity', n => {
            if (n.id === d.id) return 1;
            const isConnected = d.connections.some(c => c.node === n.id);
            return isConnected ? 1 : 0.15;
        });

    // Highlight connected links
    g.selectAll('.relationship-link')
        .transition().duration(300)
        .style('opacity', function () {
            const source = d3.select(this).attr('data-source');
            const target = d3.select(this).attr('data-target');
            return (source === d.id || target === d.id) ? 1 : 0.08;
        })
        .attr('stroke-width', function () {
            const source = d3.select(this).attr('data-source');
            const target = d3.select(this).attr('data-target');
            return (source === d.id || target === d.id) ? 4 : 1;
        });

    // Highlight labels
    g.selectAll('.link-label-group')
        .transition().duration(300)
        .style('opacity', function () {
            const source = d3.select(this).attr('data-source');
            const target = d3.select(this).attr('data-target');
            return (source === d.id || target === d.id) ? 1 : 0.05;
        });

    // Dim hierarchy links
    g.selectAll('.hierarchy-link')
        .transition().duration(300)
        .style('opacity', 0.02);

    // Show info panel with connections
    showCompanyInfo(d);
}

function deselectNode() {
    selectedNode = null;

    // Reset all nodes
    g.selectAll('.bubble circle')
        .transition().duration(300)
        .style('opacity', 1)
        .attr('stroke-width', d => d.isCategory ? 4 : (d.isCompany ? 2.5 : 3));

    g.selectAll('.bubble .label-text, .bubble .company-label, .bubble .ticker-text')
        .transition().duration(300)
        .style('opacity', 1);

    g.selectAll('.relationship-link')
        .transition().duration(300)
        .style('opacity', 0.25)  // Return to subtle visibility
        .attr('stroke-width', function () {
            const link = d3.select(this).datum();
            return 0.8 + (link.strength || 1) * 0.5;
        });

    g.selectAll('.link-label-group')
        .transition().duration(300)
        .style('opacity', 1);

    g.selectAll('.hierarchy-link')
        .transition().duration(300)
        .style('opacity', 0.04);

    hideCompanyInfo();
}

function handleNodeMouseOver(event, d) {
    if (selectedNode) return; // Don't show tooltip when node is selected

    d3.select(event.currentTarget)
        .select('circle')
        .transition().duration(200)
        .attr('r', d.radius * 1.15)
        .style('filter', 'url(#glowStrong)');

    const tooltip = document.getElementById('tooltip');
    let content = `<strong>${d.name}</strong>`;
    if (d.ticker) {
        content += `<br><span class="tooltip-ticker">${d.ticker}</span> • ${d.exchange}`;
    }
    if (d.connections && d.connections.length > 0) {
        content += `<br><small style="color:#888">${d.connections.length} connections</small>`;
    }
    tooltip.innerHTML = content;
    tooltip.style.left = (event.pageX + 15) + 'px';
    tooltip.style.top = (event.pageY - 10) + 'px';
    tooltip.classList.add('visible');
}

function handleNodeMouseOut(event, d) {
    if (selectedNode) return;

    d3.select(event.currentTarget)
        .select('circle')
        .transition().duration(200)
        .attr('r', d.radius)
        .style('filter', d.isCategory ? 'url(#glow)' : 'none');

    document.getElementById('tooltip').classList.remove('visible');
}

// ============================================
// Company Info Panel with Connections
// ============================================
async function showCompanyInfo(d) {
    const panel = document.getElementById('info-panel');

    document.getElementById('company-name').textContent = d.name;

    if (d.ticker) {
        document.getElementById('company-ticker').textContent = d.ticker;
        document.getElementById('company-exchange').textContent = d.exchange;
        document.getElementById('ticker-badge').style.display = 'inline-flex';
        document.getElementById('stock-data').style.display = 'block';
        await fetchAndDisplayStockData(d.ticker, d.exchange);
    } else {
        document.getElementById('ticker-badge').style.display = 'none';
        document.getElementById('stock-data').style.display = 'none';
    }

    // Build category path
    document.getElementById('category-path').innerHTML =
        `<span class="path-item">${d.category}</span>`;

    // Build connections list
    const connectionsContainer = document.getElementById('connections-list') || createConnectionsContainer();
    connectionsContainer.innerHTML = '';

    if (d.connections && d.connections.length > 0) {
        const header = document.createElement('div');
        header.className = 'connections-header';
        header.innerHTML = `<strong>Market Connections</strong> <span class="connection-count">${d.connections.length}</span>`;
        connectionsContainer.appendChild(header);

        // Group by sector
        const bySector = {};
        d.connections.forEach(conn => {
            if (!bySector[conn.sector]) bySector[conn.sector] = [];
            bySector[conn.sector].push(conn);
        });

        Object.entries(bySector).forEach(([sector, conns]) => {
            const sectorDiv = document.createElement('div');
            sectorDiv.className = 'connection-sector';
            sectorDiv.innerHTML = `
                <div class="sector-header" style="color: ${sectorColors[sector]}">
                    <span class="sector-dot" style="background: ${sectorColors[sector]}"></span>
                    ${sector.charAt(0).toUpperCase() + sector.slice(1)}
                </div>
            `;

            conns.forEach(conn => {
                const connDiv = document.createElement('div');
                connDiv.className = 'connection-item';
                connDiv.innerHTML = `
                    <div class="connection-direction ${conn.direction}">
                        ${conn.direction === 'outgoing' ? '→' : '←'}
                    </div>
                    <div class="connection-details">
                        <div class="connection-company">${truncateText(conn.node, 25)}</div>
                        <div class="connection-label">${conn.label}: <span class="connection-value">${conn.value}</span></div>
                        <div class="connection-reason">${conn.reason}</div>
                    </div>
                `;
                connDiv.addEventListener('click', () => {
                    const targetNode = nodeMap.get(conn.node);
                    if (targetNode) {
                        zoomToNode(targetNode);
                        setTimeout(() => selectNode(targetNode), 400);
                    }
                });
                sectorDiv.appendChild(connDiv);
            });

            connectionsContainer.appendChild(sectorDiv);
        });
    } else {
        connectionsContainer.innerHTML = '<div class="no-connections">No direct market connections</div>';
    }

    // Update links
    if (d.ticker) {
        const yahooTicker = getYahooTicker(d.ticker, d.exchange);
        document.getElementById('yahoo-link').href = `https://finance.yahoo.com/quote/${yahooTicker}`;
        document.getElementById('google-link').href = `https://www.google.com/search?q=${encodeURIComponent(d.name + ' stock')}`;
        document.querySelector('.panel-actions').style.display = 'flex';
    } else {
        document.querySelector('.panel-actions').style.display = 'none';
    }

    panel.classList.add('active');
}

function createConnectionsContainer() {
    const container = document.createElement('div');
    container.id = 'connections-list';
    container.className = 'connections-list';

    // Insert before panel-actions
    const panelActions = document.querySelector('.panel-actions');
    panelActions.parentNode.insertBefore(container, panelActions);

    return container;
}

async function fetchAndDisplayStockData(ticker, exchange) {
    const stockData = document.getElementById('stock-data');
    stockData.style.opacity = '0.5';

    try {
        const data = await fetchStockData(ticker, exchange);

        document.getElementById('stock-price').textContent = formatPrice(data.price, data.currency);

        const changeEl = document.getElementById('stock-change');
        changeEl.textContent = formatChange(data.change, data.changePercent);
        changeEl.className = 'stock-change ' + (data.change >= 0 ? 'positive' : 'negative');

        document.getElementById('market-cap').textContent = formatMarketCap(data.marketCap);
        document.getElementById('volume').textContent = data.volume ? data.volume.toLocaleString() : 'N/A';
        document.getElementById('high-52w').textContent = data.high52Week ? formatPrice(data.high52Week, data.currency) : 'N/A';
        document.getElementById('low-52w').textContent = data.low52Week ? formatPrice(data.low52Week, data.currency) : 'N/A';

        const statusDot = document.querySelector('#data-status .status-dot');
        const statusText = document.querySelector('#data-status span:last-child');

        if (data.isLive) {
            statusDot.className = 'status-dot live';
            statusText.textContent = 'Live Data';
        } else {
            statusDot.className = 'status-dot cached';
            statusText.textContent = 'Simulated Data';
        }

    } catch (error) {
        console.error('Error fetching stock data:', error);
    }

    stockData.style.opacity = '1';
}

function hideCompanyInfo() {
    document.getElementById('info-panel').classList.remove('active');
}

// ============================================
// Helper Functions
// ============================================
function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function handleResize() {
    const container = document.getElementById('tree-container');
    currentWidth = container.clientWidth;
    currentHeight = container.clientHeight;

    svg.attr('width', currentWidth).attr('height', currentHeight);

    simulation
        .force('center', d3.forceCenter(currentWidth / 2, currentHeight / 2))
        .force('x', d3.forceX(currentWidth / 2).strength(0.015))
        .force('y', d3.forceY(currentHeight / 2).strength(0.015))
        .alpha(0.3).restart();
}

// ============================================
// Legend
// ============================================
function initializeLegend() {
    const legendItems = document.getElementById('legend-items');
    legendItems.innerHTML = '';

    // Add sector legend
    const sectorHeader = document.createElement('div');
    sectorHeader.className = 'legend-section-header';
    sectorHeader.textContent = 'Connection Types';
    legendItems.appendChild(sectorHeader);

    Object.entries(sectorColors).forEach(([sector, color]) => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `
            <span class="legend-dot" style="background: ${color}"></span>
            <span>${sector.charAt(0).toUpperCase() + sector.slice(1)}</span>
        `;
        item.addEventListener('click', () => highlightSector(sector));
        legendItems.appendChild(item);
    });
}

function highlightSector(sector) {
    // Highlight all links of this sector
    g.selectAll('.relationship-link')
        .transition().duration(300)
        .style('opacity', function () {
            return d3.select(this).attr('data-sector') === sector ? 1 : 0.1;
        })
        .attr('stroke-width', function () {
            return d3.select(this).attr('data-sector') === sector ? 5 : 1;
        });

    g.selectAll('.link-label-group')
        .transition().duration(300)
        .style('opacity', function () {
            return d3.select(this).attr('data-sector') === sector ? 1 : 0.1;
        });

    // Reset after 3 seconds
    setTimeout(() => {
        if (!selectedNode) {
            g.selectAll('.relationship-link')
                .transition().duration(300)
                .style('opacity', 0.6)
                .attr('stroke-width', d => d.strength * 2);
            g.selectAll('.link-label-group')
                .transition().duration(300)
                .style('opacity', 1);
        }
    }, 3000);
}

// ============================================
// Search
// ============================================
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();

            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }

            const results = nodes.filter(n =>
                n.name.toLowerCase().includes(query) ||
                (n.ticker && n.ticker.toLowerCase().includes(query))
            ).slice(0, 10);

            displaySearchResults(results);
        }, 300);
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length >= 2) {
            searchResults.classList.add('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
        }
    });
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item"><span class="name">No results found</span></div>';
        searchResults.classList.add('active');
        return;
    }

    searchResults.innerHTML = results.map(node => `
        <div class="search-result-item" data-node-id="${node.id}">
            <div class="name">${node.name}</div>
            <div class="category">${node.category}</div>
            ${node.ticker ? `<span class="ticker">${node.ticker}</span>` : ''}
            ${node.connections.length > 0 ? `<span class="connection-badge">${node.connections.length} links</span>` : ''}
        </div>
    `).join('');

    searchResults.classList.add('active');

    searchResults.querySelectorAll('.search-result-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            const node = results[index];
            zoomToNode(node);
            setTimeout(() => selectNode(node), 300);
            searchResults.classList.remove('active');
            document.getElementById('search-input').value = '';
        });
    });
}

function zoomToNode(node) {
    const transform = d3.zoomIdentity
        .translate(currentWidth / 2 - node.x, currentHeight / 2 - node.y)
        .scale(1.2);

    svg.transition()
        .duration(600)
        .call(zoom.transform, transform);
}

// ============================================
// View Controls
// ============================================
function centerView() {
    const transform = d3.zoomIdentity
        .translate(currentWidth / 4, currentHeight / 4)
        .scale(config.initialScale);

    svg.transition()
        .duration(600)
        .call(zoom.transform, transform);
}

function expandAll() {
    simulation.alpha(0.5).restart();
}

function collapseAll() {
    deselectNode();
    centerView();
}

function zoomIn() {
    svg.transition().duration(300).call(zoom.scaleBy, 1.4);
}

function zoomOut() {
    svg.transition().duration(300).call(zoom.scaleBy, 0.7);
}

// ============================================
// Event Listeners
// ============================================
function initializeEventListeners() {
    document.getElementById('close-panel').addEventListener('click', () => {
        deselectNode();
    });
    document.getElementById('overlay').addEventListener('click', () => {
        deselectNode();
    });

    document.getElementById('reset-view').addEventListener('click', centerView);
    document.getElementById('expand-all').addEventListener('click', expandAll);
    document.getElementById('collapse-all').addEventListener('click', collapseAll);
    document.getElementById('zoom-in').addEventListener('click', zoomIn);
    document.getElementById('zoom-out').addEventListener('click', zoomOut);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') deselectNode();
    });

    initializeSearch();
}

// ============================================
// Loading
// ============================================
function hideLoading() {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 800);
}
