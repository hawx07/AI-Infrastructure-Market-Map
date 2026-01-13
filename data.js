// AI Infrastructure Market Map - Data Model
// Complete hierarchical data structure with company information

const marketMapData = {
    name: "AI Infrastructure Market Map",
    children: [
        {
            name: "Semiconductor manufacturing and packaging",
            children: [
                {
                    name: "Foundries and logic manufacturing",
                    children: [
                        { name: "Taiwan Semiconductor Manufacturing Company (TSMC)", ticker: "TSM", exchange: "NYSE" },
                        { name: "Samsung Electronics Co., Ltd.", ticker: "005930", exchange: "KRX" },
                        { name: "Intel Corporation", ticker: "INTC", exchange: "NASDAQ" },
                        { name: "GlobalFoundries Inc.", ticker: "GFS", exchange: "NASDAQ" },
                        { name: "United Microelectronics Corporation", ticker: "UMC", exchange: "NYSE" }
                    ]
                },
                {
                    name: "Lithography",
                    children: [
                        { name: "ASML Holding N.V.", ticker: "ASML", exchange: "NASDAQ" },
                        { name: "Nikon Corporation", ticker: "7731", exchange: "TSE" },
                        { name: "Canon Inc.", ticker: "7751", exchange: "TSE" }
                    ]
                },
                {
                    name: "Deposition, etch, and process equipment",
                    children: [
                        { name: "Applied Materials, Inc.", ticker: "AMAT", exchange: "NASDAQ" },
                        { name: "Lam Research Corporation", ticker: "LRCX", exchange: "NASDAQ" },
                        { name: "Tokyo Electron Limited", ticker: "8035", exchange: "TSE" },
                        { name: "ASM International N.V.", ticker: "ASMI", exchange: "EURONEXT" },
                        { name: "Kokusai Electric Corporation", ticker: "6525", exchange: "TSE" },
                        { name: "Axcelis Technologies, Inc.", ticker: "ACLS", exchange: "NASDAQ" }
                    ]
                },
                {
                    name: "Metrology and inspection",
                    children: [
                        { name: "KLA Corporation", ticker: "KLAC", exchange: "NASDAQ" },
                        { name: "Applied Materials, Inc. Process Diagnostics and Control", ticker: "AMAT", exchange: "NASDAQ" }
                    ]
                },
                {
                    name: "Wet benches, cleaning, coat/develop, track",
                    children: [
                        { name: "SCREEN Holdings Co., Ltd.", ticker: "7735", exchange: "TSE" }
                    ]
                },
                {
                    name: "Vacuum and abatement",
                    children: [
                        { name: "VAT Group AG", ticker: "VATN", exchange: "SIX" },
                        { name: "Atlas Copco AB", ticker: "ATCO-A", exchange: "STO" }
                    ]
                },
                {
                    name: "Semiconductor subsystems and consumables",
                    children: [
                        { name: "MKS Instruments, Inc.", ticker: "MKSI", exchange: "NASDAQ" },
                        { name: "Ichor Holdings, Ltd.", ticker: "ICHR", exchange: "NASDAQ" },
                        { name: "Ultra Clean Holdings, Inc.", ticker: "UCTT", exchange: "NASDAQ" }
                    ]
                },
                {
                    name: "Test and handling equipment",
                    children: [
                        { name: "Advantest Corporation", ticker: "6857", exchange: "TSE" },
                        { name: "Teradyne, Inc.", ticker: "TER", exchange: "NASDAQ" }
                    ]
                },
                {
                    name: "Photomasks and mask writing ecosystem",
                    children: [
                        { name: "Photronics, Inc.", ticker: "PLAB", exchange: "NASDAQ" },
                        { name: "Dai Nippon Printing Co., Ltd.", ticker: "7912", exchange: "TSE" },
                        { name: "Toppan Holdings Inc.", ticker: "7911", exchange: "TSE" }
                    ]
                },
                {
                    name: "Advanced packaging and OSAT",
                    children: [
                        { name: "Taiwan Semiconductor Manufacturing Company (TSMC) Advanced Packaging and CoWoS", ticker: "TSM", exchange: "NYSE" },
                        { name: "ASE Technology Holding Co., Ltd.", ticker: "ASX", exchange: "NYSE" },
                        { name: "Amkor Technology, Inc.", ticker: "AMKR", exchange: "NASDAQ" },
                        { name: "JCET Group Co., Ltd.", ticker: "600584", exchange: "SSE" }
                    ]
                },
                {
                    name: "Hybrid bonding equipment",
                    children: [
                        { name: "BE Semiconductor Industries N.V.", ticker: "BESI", exchange: "EURONEXT" },
                        { name: "Applied Materials, Inc. Hybrid bonding systems", ticker: "AMAT", exchange: "NASDAQ" }
                    ]
                },
                {
                    name: "HBM packaging enablement",
                    children: [
                        { name: "TOWA Corporation", ticker: "6315", exchange: "TSE" },
                        { name: "Resonac Holdings Corporation", ticker: "4004", exchange: "TSE" },
                        { name: "Henkel AG and Co. KGaA", ticker: "HEN3", exchange: "XETRA" }
                    ]
                },
                {
                    name: "Package substrates and interposers",
                    children: [
                        { name: "Ajinomoto Co., Inc.", ticker: "2802", exchange: "TSE" },
                        { name: "Ibiden Co., Ltd.", ticker: "4062", exchange: "TSE" },
                        { name: "Shinko Electric Industries Co., Ltd.", ticker: "6967", exchange: "TSE" },
                        { name: "Unimicron Technology Corp.", ticker: "3037", exchange: "TWSE" },
                        { name: "AT and S Austria Technologie and Systemtechnik AG", ticker: "ATS", exchange: "VIE" },
                        { name: "Samsung Electro-Mechanics Co., Ltd.", ticker: "009150", exchange: "KRX" }
                    ]
                },
                {
                    name: "Materials, chemicals, purity, contamination control",
                    children: [
                        { name: "Entegris, Inc.", ticker: "ENTG", exchange: "NASDAQ" },
                        { name: "Linde plc", ticker: "LIN", exchange: "NASDAQ" },
                        { name: "Air Liquide S.A.", ticker: "AI", exchange: "EPA" },
                        { name: "Shin-Etsu Chemical Co., Ltd.", ticker: "4063", exchange: "TSE" },
                        { name: "Tokyo Ohka Kogyo Co., Ltd.", ticker: "4186", exchange: "TSE" },
                        { name: "DuPont de Nemours, Inc.", ticker: "DD", exchange: "NYSE" }
                    ]
                },
                {
                    name: "Wafers, thinning, dicing, singulation",
                    children: [
                        { name: "SUMCO Corporation", ticker: "3436", exchange: "TSE" },
                        { name: "Siltronic AG", ticker: "WAF", exchange: "XETRA" },
                        { name: "DISCO Corporation", ticker: "6146", exchange: "TSE" }
                    ]
                }
            ]
        },
        {
            name: "Compute and servers",
            children: [
                {
                    name: "AI accelerators and GPUs",
                    children: [
                        { name: "NVIDIA Corporation", ticker: "NVDA", exchange: "NASDAQ" },
                        { name: "Advanced Micro Devices, Inc.", ticker: "AMD", exchange: "NASDAQ" }
                    ]
                },
                {
                    name: "AI servers and integrated systems",
                    children: [
                        { name: "Dell Technologies Inc.", ticker: "DELL", exchange: "NYSE" },
                        { name: "Hewlett Packard Enterprise Company", ticker: "HPE", exchange: "NYSE" },
                        { name: "Super Micro Computer, Inc.", ticker: "SMCI", exchange: "NASDAQ" },
                        { name: "Lenovo Group Limited", ticker: "0992", exchange: "HKEX" }
                    ]
                },
                {
                    name: "ODM and EMS rack manufacturing",
                    children: [
                        { name: "Celestica Inc.", ticker: "CLS", exchange: "NYSE" },
                        { name: "Jabil Inc.", ticker: "JBL", exchange: "NYSE" },
                        { name: "Hon Hai Precision Industry Co., Ltd. (Foxconn)", ticker: "2317", exchange: "TWSE" },
                        { name: "Quanta Computer Inc.", ticker: "2382", exchange: "TWSE" },
                        { name: "Wistron Corporation", ticker: "3231", exchange: "TWSE" },
                        { name: "Inventec Corporation", ticker: "2356", exchange: "TWSE" }
                    ]
                },
                {
                    name: "CPUs and platform ecosystems",
                    children: [
                        { name: "Intel Corporation Xeon CPUs", ticker: "INTC", exchange: "NASDAQ" },
                        { name: "Advanced Micro Devices, Inc. EPYC CPUs", ticker: "AMD", exchange: "NASDAQ" },
                        { name: "Arm Holdings plc", ticker: "ARM", exchange: "NASDAQ" }
                    ]
                },
                {
                    name: "DPUs, SmartNICs, NIC controllers",
                    children: [
                        { name: "NVIDIA Corporation BlueField DPUs", ticker: "NVDA", exchange: "NASDAQ" },
                        { name: "Broadcom Inc. NIC controllers and switch silicon", ticker: "AVGO", exchange: "NASDAQ" },
                        { name: "Marvell Technology, Inc.", ticker: "MRVL", exchange: "NASDAQ" }
                    ]
                }
            ]
        },
        {
            name: "Memory and storage",
            children: [
                {
                    name: "High Bandwidth Memory (HBM)",
                    children: [
                        { name: "SK hynix Inc.", ticker: "000660", exchange: "KRX" },
                        { name: "Micron Technology, Inc.", ticker: "MU", exchange: "NASDAQ" },
                        { name: "Samsung Electronics Co., Ltd.", ticker: "005930", exchange: "KRX" }
                    ]
                },
                {
                    name: "NAND flash and SSD supply chain",
                    children: [
                        { name: "Micron Technology, Inc.", ticker: "MU", exchange: "NASDAQ" },
                        { name: "Samsung Electronics Co., Ltd.", ticker: "005930", exchange: "KRX" },
                        { name: "Western Digital Corporation", ticker: "WDC", exchange: "NASDAQ" }
                    ]
                },
                {
                    name: "Enterprise storage platforms",
                    children: [
                        { name: "Pure Storage, Inc.", ticker: "PSTG", exchange: "NYSE" },
                        { name: "NetApp, Inc.", ticker: "NTAP", exchange: "NASDAQ" }
                    ]
                },
                {
                    name: "Flash controllers",
                    children: [
                        { name: "Phison Electronics Corporation", ticker: "8299", exchange: "TWSE" },
                        { name: "Silicon Motion Technology Corporation", ticker: "SIMO", exchange: "NASDAQ" }
                    ]
                },
                {
                    name: "HDD and nearline storage",
                    children: [
                        { name: "Seagate Technology Holdings plc", ticker: "STX", exchange: "NASDAQ" },
                        { name: "Western Digital Corporation", ticker: "WDC", exchange: "NASDAQ" }
                    ]
                }
            ]
        },
        {
            name: "Networking and interconnect",
            children: [
                {
                    name: "Ethernet switch ASICs",
                    children: [
                        { name: "Broadcom Inc. Tomahawk class switch silicon", ticker: "AVGO", exchange: "NASDAQ" },
                        { name: "Marvell Technology, Inc. switch silicon", ticker: "MRVL", exchange: "NASDAQ" }
                    ]
                },
                {
                    name: "Switch systems",
                    children: [
                        { name: "Arista Networks, Inc.", ticker: "ANET", exchange: "NYSE" },
                        { name: "Cisco Systems, Inc.", ticker: "CSCO", exchange: "NASDAQ" },
                        { name: "Juniper Networks, Inc.", ticker: "JNPR", exchange: "NYSE" }
                    ]
                },
                {
                    name: "Retimers, AEC, optical DSP, connectivity silicon",
                    children: [
                        { name: "Astera Labs, Inc.", ticker: "ALAB", exchange: "NASDAQ" },
                        { name: "Credo Technology Group Holding Ltd", ticker: "CRDO", exchange: "NASDAQ" },
                        { name: "Marvell Technology, Inc. optical DSP and interconnect", ticker: "MRVL", exchange: "NASDAQ" },
                        { name: "Broadcom Inc. connectivity", ticker: "AVGO", exchange: "NASDAQ" }
                    ]
                },
                {
                    name: "Optical modules and photonics",
                    children: [
                        { name: "Coherent Corp.", ticker: "COHR", exchange: "NYSE" },
                        { name: "Lumentum Holdings Inc.", ticker: "LITE", exchange: "NASDAQ" },
                        { name: "Fabrinet", ticker: "FN", exchange: "NYSE" }
                    ]
                },
                {
                    name: "Fiber, copper, connectors, cabling",
                    children: [
                        { name: "Corning Incorporated", ticker: "GLW", exchange: "NYSE" },
                        { name: "Amphenol Corporation", ticker: "APH", exchange: "NYSE" },
                        { name: "TE Connectivity Ltd.", ticker: "TEL", exchange: "NYSE" },
                        { name: "Prysmian S.p.A.", ticker: "PRY", exchange: "BIT" },
                        { name: "Nexans S.A.", ticker: "NEX", exchange: "EPA" }
                    ]
                }
            ]
        },
        {
            name: "Power, cooling, and facility infrastructure",
            children: [
                {
                    name: "Power distribution, UPS, power conditioning",
                    children: [
                        { name: "Vertiv Holdings Co.", ticker: "VRT", exchange: "NYSE" },
                        { name: "Eaton Corporation plc", ticker: "ETN", exchange: "NYSE" },
                        { name: "Schneider Electric SE", ticker: "SU", exchange: "EPA" },
                        { name: "ABB Ltd", ticker: "ABBN", exchange: "SIX" },
                        { name: "Siemens AG", ticker: "SIE", exchange: "XETRA" }
                    ]
                },
                {
                    name: "Grid equipment and generation buildout",
                    children: [
                        { name: "GE Vernova Inc.", ticker: "GEV", exchange: "NYSE" },
                        { name: "Siemens Energy AG", ticker: "ENR", exchange: "XETRA" }
                    ]
                },
                {
                    name: "Power semiconductors for PSUs, converters, data center electrification",
                    children: [
                        { name: "Infineon Technologies AG", ticker: "IFX", exchange: "XETRA" },
                        { name: "STMicroelectronics N.V.", ticker: "STM", exchange: "NYSE" },
                        { name: "onsemi", ticker: "ON", exchange: "NASDAQ" }
                    ]
                },
                {
                    name: "Racks, enclosures, electrical hardware",
                    children: [
                        { name: "nVent Electric plc", ticker: "NVT", exchange: "NYSE" },
                        { name: "Legrand S.A.", ticker: "LR", exchange: "EPA" }
                    ]
                },
                {
                    name: "Cooling and thermal management",
                    children: [
                        { name: "Vertiv Holdings Co.", ticker: "VRT", exchange: "NYSE" },
                        { name: "Trane Technologies plc", ticker: "TT", exchange: "NYSE" },
                        { name: "Johnson Controls International plc", ticker: "JCI", exchange: "NYSE" },
                        { name: "Carrier Global Corporation", ticker: "CARR", exchange: "NYSE" },
                        { name: "Modine Manufacturing Company", ticker: "MOD", exchange: "NYSE" }
                    ]
                },
                {
                    name: "Backup generation and engines",
                    children: [
                        { name: "Caterpillar Inc.", ticker: "CAT", exchange: "NYSE" },
                        { name: "Cummins Inc.", ticker: "CMI", exchange: "NYSE" }
                    ]
                }
            ]
        },
        {
            name: "Data center ownership and colocation",
            children: [
                {
                    name: "Colocation and interconnection",
                    children: [
                        { name: "Equinix, Inc.", ticker: "EQIX", exchange: "NASDAQ" },
                        { name: "Digital Realty Trust, Inc.", ticker: "DLR", exchange: "NYSE" },
                        { name: "Iron Mountain Incorporated", ticker: "IRM", exchange: "NYSE" }
                    ]
                }
            ]
        },
        {
            name: "Cloud and AI platforms",
            children: [
                {
                    name: "Hyperscalers",
                    children: [
                        { name: "Microsoft Corporation", ticker: "MSFT", exchange: "NASDAQ" },
                        { name: "Amazon.com, Inc.", ticker: "AMZN", exchange: "NASDAQ" },
                        { name: "Alphabet Inc.", ticker: "GOOGL", exchange: "NASDAQ" },
                        { name: "Oracle Corporation", ticker: "ORCL", exchange: "NYSE" },
                        { name: "Alibaba Group Holding Limited", ticker: "BABA", exchange: "NYSE" }
                    ]
                }
            ]
        },
        {
            name: "Software tooling for chips and operations",
            children: [
                {
                    name: "Electronic Design Automation (EDA) and simulation",
                    children: [
                        { name: "Synopsys, Inc.", ticker: "SNPS", exchange: "NASDAQ" },
                        { name: "Cadence Design Systems, Inc.", ticker: "CDNS", exchange: "NASDAQ" },
                        { name: "Siemens AG Digital Industries Software", ticker: "SIE", exchange: "XETRA" }
                    ]
                },
                {
                    name: "Infrastructure operations and observability",
                    children: [
                        { name: "Datadog, Inc.", ticker: "DDOG", exchange: "NASDAQ" },
                        { name: "ServiceNow, Inc.", ticker: "NOW", exchange: "NYSE" }
                    ]
                },
                {
                    name: "Accelerated computing software stacks",
                    children: [
                        { name: "NVIDIA Corporation CUDA and AI software stack", ticker: "NVDA", exchange: "NASDAQ" }
                    ]
                }
            ]
        }
    ]
};

// Category color mapping for visual hierarchy
const categoryColors = {
    "Semiconductor manufacturing and packaging": "#8B5CF6",
    "Compute and servers": "#06B6D4",
    "Memory and storage": "#10B981",
    "Networking and interconnect": "#F59E0B",
    "Power, cooling, and facility infrastructure": "#EF4444",
    "Data center ownership and colocation": "#EC4899",
    "Cloud and AI platforms": "#3B82F6",
    "Software tooling for chips and operations": "#84CC16"
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { marketMapData, categoryColors };
}
