export const companyRelationships = [
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

export const sectorColors = {
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
